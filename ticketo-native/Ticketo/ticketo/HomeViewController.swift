//
//  HomeViewController.swift
//  ticketo
//
//  Created by Nils Groen on 22/10/2018.
//  Copyright © 2018 Ticketo. All rights reserved.
//

import UIKit
import Firebase


class HomeViewController: UIViewController {

    var ref: DatabaseReference!

    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let user = Auth.auth().currentUser else { return }
        
        ref = Database.database().reference()

        print(ref)

        // Do any additional setup after loading the view.
        //https://www.sitepoint.com/creating-a-firebase-backend-for-ios-app/
        //https://firebase.google.com/docs/database/ios/read-and-write
        // https://www.simplifiedios.net/firebase-realtime-database-tutorial/
    }

        
    

    
    @IBAction func logOutAction(_ sender: Any) {
        
        do {
            try Auth.auth().signOut()
        }
        catch let signOutError as NSError {
            print ("Error signing out: %@", signOutError)
        }
        
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let initial = storyboard.instantiateInitialViewController()
        UIApplication.shared.keyWindow?.rootViewController = initial
    }
    
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
