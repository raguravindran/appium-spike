'use strict';
var basePath = './src/test/system/common',
    argv = require('minimist')(process.argv.slice(2)),
    deviceName = "emulator-5554",
    app = "c:\\sw\\app-debug.apk",
    appCloud = "PRIVATE:",
    platformVersion = "8.1.1",
    url = "http://localhost:4723/wd/hub";
const user = 'rsssa02@ca.com';
const pass = 'P@ssw0rd';

if(argv.perfecto) {
    if(argv.perfecto === true) {
        if(!argv.deviceName || argv.deviceName === null || !argv.app || argv.app === null) {
            console.info('== Usage: --perfecto true --deviceName emulator-5554 --app app-debug.apk ==');
            process.exit(1);
        } else {
            url = "https://ca.perfectomobile.com/nexperience/perfectomobile/wd/hub";
            //for perfecto this should be a cloud device name like '00ABE6022E2931C6'
            deviceName = argv.deviceName;
            app = argv.app;
        }
    }
} else {
    if(argv.app) {
        app = argv.app;
        console.log("== Taking app from location: " + app + " ==");
    } else {
        console.log("== Using the default app location : " + app + " ==");
        console.log("== USAGE: --app 'c:\\sw\\app.apk' ==");
    }
    if(argv.deviceName) {
        console.log("== Using deviceName : " + deviceName + " ==");
    } else {
        console.log("== Using the default app location : " + deviceName + " ==");
        console.log("== USAGE: --deviceName 'my phone' ==");
    }
}

if(argv.platformVersion) {
    platformVersion = argv.platformVersion;
} else {
    console.log("== Using default version: " + platformVersion + " ==");
    console.info('== Usage: --platformVersion 8.1.1 ==');
}

exports.config = {
    seleniumAddress : url,
    framework: "jasmine",
    getPageTimeout: 30000,    // increase timeout alloted for page load, fixes issues with deep link logins in Firefox

    // Capabilities to be passed to the webdriver instance.
    "multiCapabilities": [{
        "browserName": '',
        "appiumVersion" : "1.8.1",
        "platformName" : "Android",
        "platformVersion": "8.1.0",
        "app" : "c:\\sw\\app-debug.apk",
        "deviceName": "emulator-5556",
        "autoWebview" : true,
        "chromedriverExecutableDir":"C:\\sw\\ionic\\Drivers"
    },
    {
        "chromedriverExecutableDir":"C:\\sw\\ionic\\Drivers",
        "browserName": '',
        "appiumVersion" : "1.8.1",
        "platformName" : "Android",
        "platformVersion": "7.1.1",
        "app" : "c:\\sw\\app-debug.apk",
        "deviceName": "emulator-5554",
        "autoWebview" : true
    }],


    specs:  ['firstSpec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    }
};