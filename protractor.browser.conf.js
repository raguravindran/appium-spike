'use strict';

var basePath = './src/test/system/common',
    fs = require('fs'),
    path = require('path'),
    reporters = require('jasmine-reporters'),
    specReporter = require('jasmine-spec-reporter').SpecReporter,
    allureReporter = require('jasmine-allure-reporter'),
    jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

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
            // For Generating allure results
            jasmine.getEnv().addReporter(new allureReporter( {
                resultsDir: 'target/e2e/allure-results'
            }));

            jasmine.getEnv().afterEach(function(done) {
                browser.takeScreenshot().then(function (png) {
                    allure.createAttachment('Screenshot', function () {
                        return new Buffer(png, 'base64');
                    }, 'image/png')();
                    done(); 
                });
            });
            browser.get('');
            //Maximize the browser before executing scripts
            browser.driver.manage().window().maximize();

            !fs.existsSync(__dirname + '/target') &&  fs.mkdirSync(__dirname + '/target');
            !fs.existsSync(__dirname + '/target/e2e') &&  fs.mkdirSync(__dirname + '/target/e2e');
            var reporterPath = path.resolve(path.join(__dirname, '/target/e2e'));
            console.info('The E2E reports will be stored in:', reporterPath);
    
            // add test line level console output
            jasmine.getEnv().addReporter(new specReporter({
                displayStacktrace: 'all'
            }));
    
            // needed for junit reporter in jenkins
            jasmine.getEnv().addReporter(new reporters.JUnitXmlReporter({
                'savePath': reporterPath,
                'consolidate': true,
                'consolidateAll': true
            }));
    
            jasmine.getEnv().addReporter(new jasmine2HtmlReporter({
                savePath: './target/e2e/html/reports/',
                screenshotsFolder: 'images',
                takeScreenshotsOnlyOnFailures: true
            }));

        }
    };