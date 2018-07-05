'use strict';
var Dlist = require('./devices.json'),
    fs = require('fs'),
    path = require('path'),
    reporters = require('jasmine-reporters'),
    specReporter = require('jasmine-spec-reporter').SpecReporter,
    allureReporter = require('jasmine-allure-reporter'),
    jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter'),
    url = "http://localhost:4723/wd/hub";
var multiCapabilities = [];

function multiCapFunction() {
    constructCapObject(Dlist.Emulator);
    return multiCapabilities;
};

//manage device farm specific properties with cmd argument and if conditions
function constructCapObject(list) {
    var capabilitiesObj = {};
    for(var i = 0; i < list.length; i++) {
        capabilitiesObj["platformVersion"] = list[i].platformVersion;
        capabilitiesObj["autoWebview"] = true;
        capabilitiesObj["platformName"] = list[i].platformName;
        capabilitiesObj["app"] = "c:\\sw\\app-debug.apk";
        capabilitiesObj["browserName"] = "";
        capabilitiesObj["fullReset"] = true;
        capabilitiesObj["chromedriverExecutableDir"] = "C:\\sw\\ionic\\Drivers";
        capabilitiesObj["deviceName"] = list[i].deviceName;
        multiCapabilities.push(capabilitiesObj);
        capabilitiesObj = {};
    }
};

function takeScreenshot() {
    return new Promise(function(resolve, reject) {
        var filename = "adbtakescreenshot.png";
        // temp location
        var screenshotPath = __dirname + '/target';
        var exec = require('child_process').exec;
        // Take a screenshot and store it on the internal storage.
        exec('adb shell /system/bin/screencap -p /sdcard/' + filename );

        // Wait until the screenshot is created on android
        var date = new Date();
        var curDate = null;
        do {
            curDate = new Date();
        }
        while (curDate - date < 1000);

        var command = 'adb pull /sdcard/'+ filename + ' ' + screenshotPath;
        // Copy the screenshot from the internal storage to the local computer.
        exec(command, function (err, stdout, stderr) {
            if(err){
                console.error('The screenshot could not be copied from the ANDROID device: ' + stdout + ' - to the dir: ' + __dirname);
                console.log('The screenshot is stored on the ANDROID device with the name: ' + filename);
                reject(err);
            }
            //resolve the promise
            resolve(base64_encode(screenshotPath + '/' + filename));
        });
    });
};

//method to convert file into bitmap - returns a base64 encoded string of the image
function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

exports.config = {
    seleniumAddress : url,
    framework: "jasmine",
    getPageTimeout: 30000,

    getMultiCapabilities : multiCapFunction,

    specs:  ['firstSpec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    },
    onPrepare: function() {
         // For Generating allure results
         jasmine.getEnv().addReporter(new allureReporter( {
            resultsDir: 'target/e2e/allure-results'
        }));

        jasmine.getEnv().afterEach(function(done) {
                takeScreenshot().then(function (png) {
                    allure.createAttachment('Screenshot', function () {
                        return new Buffer(png, 'base64');
                    }, 'image/png')();
                    done();
                });
        });

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
            takeScreenshots: false
        }));
    }
};

