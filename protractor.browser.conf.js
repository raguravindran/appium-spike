'use strict';

var basePath = './src/test/system/common';

    exports.config = {

        framework: "jasmine",

        directConnect: true,

        allScriptsTimeout: 30000,    // increase timeout alloted for page load, fixes issues with deep link logins in Firefox

        capabilities: {

            "browserName": 'chrome'

  },

        baseUrl: "http://localhost:8100",

        specs:  ['./firstSpec.js'],

        jasmineNodeOpts: {

            defaultTimeoutInterval: 60000

        },

        useAllAngular2AppRoots: true, 

        onPrepare: function() {

            browser.get('');

 

            //Maximize the browser before executing scripts

            browser.driver.manage().window().maximize();

        }

    };