'use strict';
var basePath = './src/test/system/common',
    argv = require('minimist')(process.argv.slice(2));
// const host = 'ca.perfectomobile.com';
const user = 'rsssa02@ca.com';
const pass = 'P@ssw0rd';

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
    }
};