//
//  MapViewController.swift
//  ticketo
//
//  Created by Lucas Bos on 25-10-18.
//  Copyright © 2018 Ticketo. All rights reserved.
//

import UIKit
import MapKit
import Firebase

class MapViewController: UIViewController, MKMapViewDelegate {
    
    var user: User!
    var ref: DatabaseReference!
    var receipts: [Receipt] = []
    var receiptForDetail: Receipt?
    private var databaseHandle: DatabaseHandle!
    
    @IBOutlet weak var map: MKMapView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        map.delegate = self
        
        user = Auth.auth().currentUser
        ref = Database.database().reference()
        startObservingDatabase()

        
    }
    
    
    override func viewDidAppear(_ animated: Bool) {
        // TODO RXSwift on change
        
//        self.receipts = []
//
//        print("Did load database")

    }
    
    func mapView(_ mapView: MKMapView, didSelect view: MKAnnotationView)
    {
        if let annotationTitle = view.annotation?.title
        {
            let filteredReceipts = receipts.filter { $0.title == annotationTitle }
            
            if (filteredReceipts.count > 0) {
                receiptForDetail = receipts.filter { $0.title == annotationTitle }[0]
                self.performSegue(withIdentifier: "MapDetailSegue", sender: self)
            }
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "MapDetailSegue" {
            let DetailViewController = segue.destination as! DetailViewController
            DetailViewController.receipt = receiptForDetail!
        }
    }
    
    func startObservingDatabase () {
        databaseHandle = ref.child("users/\(self.user.uid)/receipts").observe(.value, with: { (snapshot) in
            
            self.map.removeAnnotations(self.map.annotations)
            self.receipts = []
            
            for receiptSnapShot in snapshot.children {
                
                
                let item = Receipt(snapshot: receiptSnapShot as! DataSnapshot)
                self.receipts.append(item)
                
                if item.lat != nil && item.long != nil && item.title != nil, let lat = Double(item.lat!), let long = Double(item.long!){
                    
                    let marker = MKPointAnnotation()
                    marker.title = item.title!
                    marker.coordinate = CLLocationCoordinate2D(latitude: lat, longitude: long)
                    self.map.addAnnotation(marker)
                }
            }
            
        })
    }
    
    deinit {
        ref.child("users/\(self.user.uid)/items").removeObserver(withHandle: databaseHandle)
    }
}
