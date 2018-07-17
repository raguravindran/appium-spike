'use strict';
var basePath = './src/test/system/common',
    argv = require('minimist')(process.argv.slice(2));
// const host = 'ca.perfectomobile.com';
const user = 'user';
const pass = 'pwd';

exports.config = {
    "seleniumAddress" : "https://ca.perfectomobile.com/nexperience/perfectomobile/wd/hub",
    "framework": "jasmine",
    "getPageTimeout": 30000,    // increase timeout alloted for page load, fixes issues with deep link logins in Firefox

    // Capabilities to be passed to the webdriver instance.
    "capabilities": {
        "browserName": "",
        "appiumVersion" : "1.8.1",
        "platformName" : "Android",
        "platformVersion": "8.1.0",
        "app" : "PRIVATE:app-debug.apk",
        "user": user,
        "password": pass,
        "deviceName" : "00ABE6022E2931C6",
        "autoWebview": true,
        'manufacturer' : 'Google',  
        'model' : 'Nexus 5X',
        'location' : 'NA-US-BOS',
        'resolution' : '1080 x 1920'
    },

    specs:  ['firstSpec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    },
    onPrepare: function () {
        // Get access to the current configuration object
        browser.getProcessedConfig()
            .then(function (config) {
                // Add the needed capabilites to the browser-object so we
                // can access them when needed
                browser.appPackage = config.capabilities.appPackage;
                browser.bundleId = config.capabilities.bundleId;
                browser.deviceProperties = config.capabilities.deviceProperties;
                browser.platformname = config.capabilities.platformName;

                var wd = require('wd'),
                    protractor = require('protractor'),
                    wdBridge = require('wd-bridge')(protractor, wd);
                wdBridge.initFromProtractor(config);
    
                // Define some extra properties
                var iOSProperties = {'identifier': browser.bundleId},
                    androidProperties = {'name': 'Test.apk', 'identifier': 'io.ionic.starter'},
                    params = browser.platformname.toLowerCase() === 'android' ? androidProperties : iOSProperties;
    
                // Now (version 7.0.2) there is a little problem with supporting
                // the first async call Protractor does to set the default
                // timeout (waitForAngular). This will be in januari / februari
                // 2016. One of the workarounds it to disable the default
                // waitForAngular with this line of code. Remove it when the
                // the issue is fixe
                browser.ignoreSynchronization = true;
    
                // Close the app
                return browser.driver.executeScript('mobile:application:close', params)
                    .then(function () {
                        // start the app
                        return browser.driver.executeScript('mobile:application:open', params);
                    })
                    .then(function () {
                        // Switch to the webview 
                        return wdBrowser.context('WEBVIEW');
                    })
                    .then(function () {
                        // Added a sleep here to make sure the webview is loaded
                        // this could be done smarter, but that's not part of this
                        // scope 
                        return browser.sleep(5000);});      
                    });
    }
};