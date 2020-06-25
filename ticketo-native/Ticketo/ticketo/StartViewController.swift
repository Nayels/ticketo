//
//  StartViewController.swift
//  ticketo
//
//  Created by Nils Groen on 22/10/2018.
//  Copyright © 2018 Ticketo. All rights reserved.
//

import UIKit
import Firebase

class StartViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidAppear(_ animated: Bool){
        super.viewDidAppear(animated)
        if Auth.auth().currentUser != nil {
            self.performSegue(withIdentifier: "alreadyLoggedIn", sender: nil)
        }
    }
}
