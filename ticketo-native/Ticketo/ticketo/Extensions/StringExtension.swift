//
//  StringExtension.swift
//  ticketo
//
//  Created by Lucas Bos on 29-10-18.
//  Copyright © 2018 Ticketo. All rights reserved.
//

import Foundation

extension String {
    func findPrice() -> Double? {
        let digits = components(separatedBy: CharacterSet(charactersIn: "01234567890.,").inverted)
        
        if let i = digits.lastIndex(where: { $0.range(of:",") != nil || $0.range(of:".") != nil }) {
            if digits[i].count == 1 {
                if digits.count > i+1 && i != 0 {
                    return Double(digits[i-1] + "." + digits[i+1])
                }
            }
            return Double(digits[i].replacingOccurrences(of: ",", with: "."))
            
        }
        
        return nil
    }
    
    func contains(_ subStrings: [String]) -> Bool {
        var found = false
        
        for subString in subStrings {
            if (self.lowercased().range(of: subString) != nil) {
                found = true
            }
        }
        
        return found
    }
}
