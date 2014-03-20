//These tests require that the Delcom Indicator is plugged in and accessible
//See readme.md in root for more information

var should = require('should');
var sleep = require('sleep');
var DelcomIndicator = require('../DelcomIndicator');

describe('DelcomIndicator', function(){
    it ('should find Delcom device', function(){
        var delcomIndicator = new DelcomIndicator();
        try{
            delcomIndicator.isConnected().should.equal(true, 'Delcom USB Indicator should be plugged in and accessible when running tests')
        } finally {
            delcomIndicator.close();
        }
    });

    it ('should set green solid led', function(){
        var delcomIndicator = new DelcomIndicator();
        try{
            delcomIndicator.turnOff();
            delcomIndicator.solidGreen();
            console.log("Should be green");
            sleep.sleep(5);
        } finally {
            delcomIndicator.turnOff();
            delcomIndicator.close();
        }
    });

    it ('should set red solid led', function(){
        var delcomIndicator = new DelcomIndicator();
        try{
            delcomIndicator.turnOff();
            delcomIndicator.solidRed();
            console.log("Should be red");
            sleep.sleep(5);
        } finally {
            delcomIndicator.turnOff();
            delcomIndicator.close();
        }
    });

    it ('should set blue solid led', function(){
        var delcomIndicator = new DelcomIndicator();
        try{
            delcomIndicator.turnOff();
            delcomIndicator.solidBlue();
            console.log("Should be blue");
            sleep.sleep(5);
        } finally {
            delcomIndicator.turnOff();
            delcomIndicator.close();
        }
    });

    it ('should set green flashing led', function(){
        var delcomIndicator = new DelcomIndicator();
        try{
            delcomIndicator.turnOff();
            delcomIndicator.flashGreen();
            console.log("Should be flashing green");
            sleep.sleep(5);
        } finally {
            delcomIndicator.turnOff();
            delcomIndicator.close();
        }
    });

    it ('should set red flashing led', function(){
        var delcomIndicator = new DelcomIndicator();
        try{
            delcomIndicator.turnOff();
            delcomIndicator.flashRed();
            console.log("Should be flashing red");
            sleep.sleep(5);
        } finally {
            delcomIndicator.turnOff();
            delcomIndicator.close();
        }
    });

    it ('should set blue flashing led', function(){
        var delcomIndicator = new DelcomIndicator();
        try{
            delcomIndicator.turnOff();
            delcomIndicator.flashBlue();
            console.log("Should be flashing blue");
            sleep.sleep(5);
        } finally {
            delcomIndicator.turnOff();
            delcomIndicator.close();
        }
    });
});