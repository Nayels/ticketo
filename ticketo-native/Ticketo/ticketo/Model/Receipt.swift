//
//  Receipt.swift
//  ticketo
//
//  Created by Nils Groen on 23/10/2018.
//  Copyright © 2018 Ticketo. All rights reserved.
//

import Foundation
import Firebase

class Receipt {
    
    var ref: DatabaseReference?
    
    var category: String?
    var creationDate: String?
    var image: String?
    var uiImage : UIImage?
    var lat: String?
    var long: String?
    var title: String?
    var total: String?
    
    init (snapshot: DataSnapshot) {
        ref = snapshot.ref
        
        let data = snapshot.value as! Dictionary<String, String>
        
        category = data["category"]
        creationDate = data["creationDate"]
        image = data["image"]
        lat = data["lat"]
        long = data["long"]
        title = data["title"]
        total = data["total"]
    }
    
    init(ref: DatabaseReference, total: String, image : UIImage?, lat: String?, long: String?, date: String?) {
        self.ref = ref
        self.total = total
        self.uiImage = image
        self.lat = lat
        self.long = long
        self.creationDate = date
    }
    
    init(ref: DatabaseReference, total: String, image : UIImage?, lat: String?, long: String?, date: String?, category: String) {
        self.ref = ref
        self.total = total
        self.uiImage = image
        self.lat = lat
        self.long = long
        self.creationDate = date
        self.category = category
    }
    
}
