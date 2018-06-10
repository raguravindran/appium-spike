# appium-spike

Pre-req to run with xcode (simulator)
sudo brew install carthage //needed to run appium against xcode

//to setup app that can launch and run against - do the pre-requisite for ionic and cordova
//from quotes app project folder run the following.
> ionic cordova platform add ios 

To start Xcode project = platform -> ios -> quotes-app.xcodeproj (point to this file to start xcode)
To add new ios versions. 
Xcode -> Preferences -> components tab you can download different versions of ios as per your need

now, launch protractor test. (make sure to run npm install -g protractor)
> protractor appium.ios.protractor.js
//pre-requisite for ionic and cordova
> npm install -g ionic cordova


To run for browser
from project folder run
> ionic serve (starts app on port 8100)

Run protractor command (does not need appium)
> protractor protractor.browser.conf.js
