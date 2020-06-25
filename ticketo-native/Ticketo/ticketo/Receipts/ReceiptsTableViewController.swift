//
//  ItemsTableViewController.swift
//  ticketo
//
//  Created by Nils Groen on 23/10/2018.
//  Copyright © 2018 Ticketo. All rights reserved.
//

import UIKit
import Firebase
import CoreLocation

class ReceiptsTableViewController: UITableViewController, CLLocationManagerDelegate {
    
    
    // MARK: Properties

    var textRecognizer: VisionDocumentTextRecognizer?
    var activeImage : UIImage?
    var total: String = ""
    var user: User!
    var receipts = [Receipt?]()
    var ref: DatabaseReference!
    private var databaseHandle: DatabaseHandle!
    var category: String?
    let locationManager = CLLocationManager()
    var coordinates : CLLocationCoordinate2D?
    var sv: UIView?
    
    
    // MARK: Initializers

    func initLocation() {
        // For use when the app is open
        locationManager.requestWhenInUseAuthorization()
        
        // If location services is enabled get the users location
        if CLLocationManager.locationServicesEnabled() {
            locationManager.delegate = self
            locationManager.desiredAccuracy = kCLLocationAccuracyHundredMeters // You can change the location accuracy here.
            locationManager.startUpdatingLocation()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        sv = UIViewController.displaySpinner(onView: self.view)
        
        // Firebase
        user = Auth.auth().currentUser
        ref = Database.database().reference()
        startObservingDatabase()
        
        // OCR
        let vision = Vision.vision()
        let options = VisionCloudDocumentTextRecognizerOptions()
        options.languageHints = ["en", "nl"]
        self.textRecognizer = vision.cloudDocumentTextRecognizer(options: options)
        
        let add = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(addTapped))
        navigationItem.rightBarButtonItem = add
    }
    
    
    // MARK: Imperatives
    
    @objc func addTapped() {
        AttachmentHandler.shared.showAttachmentActionSheet(vc: self)
        AttachmentHandler.shared.imagePickedBlock = { (image) in

            self.activeImage = image

            self.sv = UIViewController.displaySpinner(onView: self.view)
            self.retrieveImageMetadata(image: image)
            AttachmentHandler.shared.pickedImageCoordinates = { (coordinates) in
                self.coordinates = coordinates
            }
        }
    }
    
    /// TableView
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return receipts.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
        let receipt = receipts[indexPath.row]
        cell.textLabel?.text = receipt!.title
        cell.detailTextLabel?.text = receipt!.total
        return cell
    }
    
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            let receipt = receipts[indexPath.row]
            receipt!.ref?.removeValue()
        }
    }
    
    /// MARK: Extra methods
    
    func retrieveImageMetadata(image : UIImage) {
        let image = VisionImage(image: image)
        
        textRecognizer!.process(image) { result, error in
            guard error == nil else {
                return
            }
        
            self.total = ""
            if let result = result {
                var prices: [Double] = []
                
                for block in result.blocks {
                    if block.text.contains(["total", "totaal", "$", "€", "£", "eur", "euro"]) {
                        if let result = block.text.findPrice() {
                            prices.append(result)
                        }
                    }
                }
                
                for price in prices {
                    print(price)
                }
                
                if prices.count > 0 {
                    if prices.count > 1 {
                        prices = prices.sorted(by: { $0 > $1 })
                    }
                    self.total = String(prices[0])
                }
            }
    
            self.performSegue(withIdentifier: "DetailSegue", sender: self)
        }
    }

    
    func startObservingDatabase () {
        databaseHandle = ref.child("users/\(self.user.uid)/receipts").observe(.value, with: { (snapshot) in
            var newReceipts = [Receipt]()
            
            for receiptSnapShot in snapshot.children {
                let item = Receipt(snapshot: receiptSnapShot as! DataSnapshot)
                newReceipts.append(item)
            }
            
            self.receipts = newReceipts
            
            if let selectedCategory = self.category {
                if selectedCategory != "All receipts" {
                    self.receipts = self.receipts.filter {
                        $0!.category != nil && $0!.category! == selectedCategory
                    }
                }
            }
            
            self.tableView.reloadData()
            UIViewController.removeSpinner(spinner: self.sv!)
            
        })
    }
    
    //MARK: - NAVIGATION

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "DetailSegue" {
            let detailViewController = segue.destination as! DetailViewController
            
            if let newImage = self.activeImage {
                let receiptRef = ref.child("users").child(self.user.uid).child("receipts").childByAutoId().ref
                let currentDate = Date().mediumDateString
                
                let receipt = newReceipt(image: newImage, ref: receiptRef, date: currentDate)
                
                self.coordinates = nil
                UIViewController.removeSpinner(spinner: self.sv!)
                detailViewController.receipt = receipt

            } else {
                guard tableView.indexPathForSelectedRow != nil else {
                    return
                }
                
                let index = tableView.indexPathForSelectedRow!.row
                detailViewController.receipt = receipts[index]
            }
        }
        
        self.activeImage = nil
    }
    
    func newReceipt(image: UIImage, ref: DatabaseReference, date: String) -> Receipt {
        var lat = ""
        var long = ""
        
        if let cord = self.coordinates {
            lat = "\(cord.latitude)"
            long = "\(cord.longitude)"
        } else {
            initLocation()
            let locValue = locationManager.location?.coordinate
            lat = "\(locValue!.latitude)"
            long = "\(locValue!.longitude)"
            locationManager.stopUpdatingLocation();
        }
        
        if self.category != nil && self.category! != "All receipts" {
            return Receipt(ref: ref, total: self.total, image: image.jpeg(.lowest), lat: lat, long: long, date: date, category: self.category!)
        } else {
            return Receipt(ref: ref, total: self.total, image: image.jpeg(.lowest), lat: lat, long: long, date: date)
        }
    }
    
    deinit {
        ref.child("users/\(self.user.uid)/items").removeObserver(withHandle: databaseHandle)
    }
}
