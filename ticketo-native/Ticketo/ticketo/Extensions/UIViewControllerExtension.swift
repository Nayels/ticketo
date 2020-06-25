//
//  UIViewControllerExtension.swift
//  ticketo
//
//  Created by Lucas Bos on 27-10-18.
//  Copyright © 2018 Ticketo. All rights reserved.
//

import Foundation
import UIKit

extension UIViewController {
    class func displaySpinner(onView : UIView) -> UIView {
        let spinnerView = UIView.init(frame: onView.frame)
        spinnerView.backgroundColor = UIColor.init(red: 0.7, green: 0.7, blue: 0.7, alpha: 0.6)
        let ai = UIActivityIndicatorView.init(activityIndicatorStyle: .white)
        ai.startAnimating()
        ai.center = CGPoint(x: onView.bounds.width/2, y: onView.bounds.height/2-ai.bounds.height*3)
        
        DispatchQueue.main.async {
            spinnerView.addSubview(ai)
            onView.addSubview(spinnerView)
        }
        
        return spinnerView
    }
    
    class func removeSpinner(spinner : UIView) {
        DispatchQueue.main.async {
            spinner.removeFromSuperview()
        }
    }
}
