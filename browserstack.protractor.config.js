'use strict';

exports.config = {
    'seleniumAddress': 'http://hub-cloud.badarowserstack.com/wd/hub',
    "framework": "jasmine",
    "getPageTimeout": 30000,    // increase timeout alloted for page load, fixes issues with deep link logins in Firefox

    // Capabilities to be passed to the webdriver instance.
    "multiCapabilities": [{
        "browserName": "",
        'browserstack.user': 'user',
        'browserstack.key': 'key',
        'device': 'Google Nexus 6',
        'realMobile': 'true',
        'os_version': '6.0',
        'browserstack.appium_version': '1.7.2',
        'app': 'bs://d88d33add01f6d3534e83287299b62027f13cbbd',
        'autoWebview': true,
        'autoWebviewTimeout': 20000
    },
    {
        "browserName": "",
        'browserstack.user': 'user',
        'browserstack.key': 'key',
        'device': 'Google Pixel',
        'realMobile': 'true',
        'os_version': '7.1',
        'browserstack.appium_version': '1.7.2',
        'app': 'bs://d88d33add01f6d3534e83287299b62027f13cbbd',
        'autoWebview': true,
        'autoWebviewTimeout': 20000
    }
    ],

    specs:  ['firstSpec.js']
};
