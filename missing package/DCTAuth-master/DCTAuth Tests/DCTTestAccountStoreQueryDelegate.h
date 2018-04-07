//
//  DCTTestAccountStoreQueryDelegate.h
//  DCTAuth
//
//  Created by Daniel Tull on 19.01.2015.
//  Copyright (c) 2015 Daniel Tull. All rights reserved.
//

@import Foundation;
@import DCTAuth;

@interface DCTTestAccountStoreQueryDelegate : NSObject <DCTAuthAccountStoreQueryDelegate>
@property (nonatomic, readonly) NSArray *events;
@end
