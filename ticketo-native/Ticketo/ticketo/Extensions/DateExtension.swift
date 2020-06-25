//
//  DateExtension.swift
//  ticketo
//
//  Created by Lucas Bos on 27-10-18.
//  Copyright © 2018 Ticketo. All rights reserved.
//

import Foundation

extension Date {
    var mediumDateString: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        return formatter.string(from: self)
    }
}
