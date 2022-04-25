//
//  RNCollapsibleComponentWithTapViewModule.swift
//  RNCollapsibleComponentWithTapViewModule
//
//  Copyright © 2022 KWonkunkun. All rights reserved.
//

import Foundation

@objc(RNCollapsibleComponentWithTapViewModule)
class RNCollapsibleComponentWithTapViewModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
