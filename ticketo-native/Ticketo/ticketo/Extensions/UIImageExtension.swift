//
//  UIImageExtension.swift
//  ticketo
//
//  Created by Lucas Bos on 27-10-18.
//  Copyright © 2018 Ticketo. All rights reserved.
//

import Foundation
import UIKit

extension UIImage {
    enum JPEGQuality: CGFloat {
        case lowest  = 0
        case low     = 0.25
        case medium  = 0.5
        case high    = 0.75
        case highest = 1
    }
    
    func jpeg(_ jpegQuality: JPEGQuality) -> UIImage? {
        let imageData = UIImageJPEGRepresentation(self, jpegQuality.rawValue)
        return UIImage(data: imageData!)
    }
}
