'use strict';
var EC = protractor.ExpectedConditions;
describe("first step with appium", function () {

    it("Step 1: Open settings menu and click toggle", function() {
        var elementSettings = element(by.xpath('//button[span[contains(text(),"Settings")]]')),
            elementQuotes = element(by.xpath('//button[span[contains(text(), "Quotes")]]'));
        
        console.log("clicking on the bottom menu");
        element(by.id('tab-t0-1')).click();
        element(by.css('.bar-button-menutoggle')).click();
        browser.sleep(500);
        elementSettings.isPresent().then(function (present) {
            if(present) {
                elementSettings.click();
            }
        });
        browser.sleep(500);
        //toggle assertion
        expect(element(by.css('.toggle-checked')).isPresent()).toBe(false);
        console.log("clicked on settings");
        element(by.css('button.item-cover-default')).isPresent().then(function (present) {
            if(present){
                element(by.css('button.item-cover-default')).click(); 
            }
        });
        //toggle assertion after toggling
        expect(element(by.css('.toggle-checked')).isPresent()).toBe(true);
        element(by.css('button.item-cover-default')).click();
        //toggle assertion after toggling
        expect(element(by.css('.toggle-checked')).isPresent()).toBe(false);
        //go to menu again and go to first page
        browser.waitForAngular();
        element(by.css('.bar-button-menutoggle')).click();
        browser.sleep(500);
        elementQuotes.isPresent().then(function (present) {
            if(present) {
                elementQuotes.click();
            }
        });
    });

    it ("Step 2 : Open app and click on library", function () {
        element(by.id('tab-t0-1')).click();
        element(by.xpath('//ion-list[@class="list list-md"]/button[1]')).click();
    });
});