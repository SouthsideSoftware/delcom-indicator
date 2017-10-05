var should = require('should');
var sleep = require('sleep');
var DelcomIndicator = require('../DelcomIndicator');

const secondsToSleep = 4;

describe('DelcomIndicator', function () {

  var delcomIndicator;

  beforeEach(function () {
    delcomIndicator = new DelcomIndicator();
    delcomIndicator.turnOff();
  });

  afterEach(function () {
    sleep.sleep(secondsToSleep);
    delcomIndicator.turnOff();
    delcomIndicator.close();
  });

  it('should find Delcom device', function () {
    delcomIndicator.isConnected().should.equal(true, 'Delcom USB Indicator should be found')
  });

  it('should set green solid led', function () {
    delcomIndicator.solidGreen();
    console.log("Should be green");
  });

  it('should set red solid led', function () {
    delcomIndicator.solidRed();
    console.log("Should be red");
  });

  it('should set blue or yellow solid led', function () {
    delcomIndicator.solidBlue();
    console.log("Should be blue or yellow");
  });

  it('should set green flashing led', function () {
    delcomIndicator.flashGreen();
    console.log("Should be flashing green");
  });

  it('should set red flashing led', function () {
    delcomIndicator.flashRed();
    console.log("Should be flashing red");
  });

  it('should set blue or yellow flashing led', function () {
    delcomIndicator.flashBlue();
    console.log("Should be flashing blue or yellow");
  });
});