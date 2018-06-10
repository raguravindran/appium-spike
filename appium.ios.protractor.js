'use strict';
var url = "http://localhost:4723/wd/hub";


exports.config = {
    seleniumAddress : url,
    framework: "jasmine",
    getPageTimeout: 30000,    // increase timeout alloted for page load, fixes issues with deep link logins in Firefox

    // Capabilities to be passed to the webdriver instance.
    "multiCapabilities": [
        // {
    //     "browserName": '',
    //     "appiumVersion" : "1.8.1",
    //     "automationName": "XCUITest",
    //     "platformName" : "iOS",
    //     "platformVersion": "10.3",
    //     "app" : "/Users/pansa05/sw/mobile/quotes-app/platforms/ios/build/emulator/quotes-app.app",
    //     "deviceName": "iPhone Simulator",
    //     "autoWebview" : true,
    //     // "chromedriverExecutableDir":"C:\\sw\\ionic\\Drivers"
    // },
    {
        "browserName": '',
        "orientation"	: "LANDSCAPE",
        "appiumVersion" : "1.8.1",
        "automationName": "XCUITest",
        "platformName" : "iOS",
        "platformVersion": "10.3",
        "app" : "/Users/pansa05/sw/mobile/quotes-app/platforms/ios/build/emulator/quotes-app.app",
        "deviceName": "iPhone 7",
        "autoWebview" : true,
        // webkitResponseTimeout: 20000
        // "chromedriverExecutableDir":"C:\\sw\\ionic\\Drivers"
    }],


    specs:  ['firstSpec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    }
};