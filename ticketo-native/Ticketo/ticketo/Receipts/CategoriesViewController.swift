//
//  CategoriesViewController.swift
//  ticketo
//
//  Created by Lucas Bos on 24-10-18.
//  Copyright © 2018 Ticketo. All rights reserved.
//

import UIKit
import Firebase

class CategoriesViewController: UITableViewController {

    let categories = Category.allCases
    
    /// MARK: Life cycle
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    

    /// MARK: Table view

    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return categories.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
        let category = categories[indexPath.row]
        cell.textLabel?.text = category.rawValue
        return cell
    }
    
    /// MARK: Actions
    
    @IBAction func didTapSignOut(_ sender: UIBarButtonItem) {
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
    
    /// MARK: Navigation
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "ReceiptSegue" {
            let ReceiptViewController = segue.destination as! ReceiptsTableViewController
            let index = tableView.indexPathForSelectedRow!.row
            ReceiptViewController.category = categories[index].rawValue
        }
    }
}
