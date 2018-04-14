# tweetme
simple tweeter playground app

Steps to run the App:

01. Open terminal in the project directory and type npm start
02. Replace some code in library as follow:

In OAuthManager.h replaced the code as follow:

WAS

#if __has_include("RCTBridgeModule.h")
  #import "RCTBridgeModule.h"
#else
  #import <React/RCTBridgeModule.h>
#endif

SHOULD

#if __has_include(<React/RCTBridgeModule.h>)
  #import <React/RCTBridgeModule.h>
#else
  #import "RCTBridgeModule.h"
#endif

03. Run ios project 
terminal type react-native run-ios or alternatively open IOS project and run from xcode 
