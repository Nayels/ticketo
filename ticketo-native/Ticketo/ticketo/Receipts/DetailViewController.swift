//
//  DetailViewController.swift
//  ticketo
//
//  Created by Lucas Bos on 24-10-18.
//  Copyright © 2018 Ticketo. All rights reserved.
//

import UIKit
import CoreLocation

class DetailViewController: UIViewController, UIPickerViewDataSource, UIPickerViewDelegate {
    
    
    // MARK: Properties

    var receipt: Receipt?
    var categories = Category.allCases
    
    @IBOutlet weak var titleField: UITextField!
    @IBOutlet weak var categoryField: UITextField!
    @IBOutlet weak var dateField: UITextField!
    @IBOutlet weak var priceField: UITextField!
    @IBOutlet weak var imageView: UIImageView!
    
    // MARK: Life cycle

    override func viewDidLoad() {
        super.viewDidLoad()
        
        categories = categories.filter {$0.rawValue != "All receipts"}
        
        setPickerView()
        setDatePicker()
        setReceiptData()
    }
    
    func setDatePicker() {
        var datePicker: UIDatePicker {
            get {
                let datePicker = UIDatePicker()
                datePicker.date = Date()
                datePicker.datePickerMode = .date
                datePicker.addTarget(self,
                                     action: #selector(onDateChanged(sender:)),
                                     for: .valueChanged)
                datePicker.backgroundColor = UIColor.white
                return datePicker
            }
        }
        dateField.inputView = datePicker
    }
    
    // MARK: Imperatives

    
    @objc func onDateChanged(sender: UIDatePicker) {
        dateField.text = sender.date.mediumDateString
    }
    
    // MARK: Actions
    
    @objc func editTapped() {
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Save", style: .plain, target: self, action: #selector(saveTapped))
        toggleFields(set: true)
    }
    
    @objc func saveTapped() {
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Edit", style: .plain, target: self, action: #selector(editTapped))
        toggleFields(set: false)
        
        if let theReceipt = receipt {
            let ref = theReceipt.ref!
            ref.child("title").setValue(titleField.text)
            ref.child("category").setValue(categoryField.text)
            ref.child("creationDate").setValue(dateField.text)
            ref.child("total").setValue(priceField.text)
            ref.child("lat").setValue(theReceipt.lat)
            ref.child("long").setValue(theReceipt.long)
            
            if let image = imageView.image {
                if let data = UIImagePNGRepresentation(image) {
                    let filename = getDocumentsDirectory().appendingPathComponent("\(ref.key).png")
                    try? data.write(to: filename)
                    ref.child("image").setValue(filename.path)
                }
            }
        }
    }
    
    func setPickerView() {
        let pickerView = UIPickerView()
        pickerView.delegate = self
        pickerView.backgroundColor = UIColor.white
        
        categoryField.inputView = pickerView
    }
    
    func setReceiptData() {
        titleField.text = receipt!.title
        categoryField.text = receipt!.category
        dateField.text = receipt!.creationDate
        priceField.text = receipt!.total
    
        setImage(withName: receipt!.image, image: receipt!.uiImage)
        
        if receipt!.uiImage != nil {
            navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Save", style: .plain, target: self, action: #selector(saveTapped))
        } else {
            toggleFields(set: false)
            
            navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Edit", style: .plain, target: self, action: #selector(editTapped))
        }
    }
    
    func setImage(withName name: String?, image: UIImage?) {
        
        guard name != nil || image != nil else {
            imageView.image = UIImage(named: "icon-1024");
            return
        }
        
        if let path = name {
            imageView.image = UIImage(contentsOfFile: path)
        } else {
            imageView.image = image
        }
    }
    
    func toggleFields(set enabled: Bool) {
        titleField.isEnabled = enabled
        categoryField.isEnabled = enabled
        dateField.isEnabled = enabled
        priceField.isEnabled = enabled
    }
    


    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return categories.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return categories[row].rawValue
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        categoryField.text = categories[row].rawValue
    }
    
    func getDocumentsDirectory() -> URL {
        let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
        return paths[0]
    }
}


