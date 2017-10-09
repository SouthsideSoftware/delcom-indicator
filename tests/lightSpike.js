var should = require('should');
var DelcomIndicator = require('../DelcomIndicator');

const msToWait = 4000;

describe('DelcomIndicator', function () {

  var delcomIndicator;

  beforeEach(function () {
    delcomIndicator = new DelcomIndicator();
    delcomIndicator.turnOff();
  });

  afterEach(function () {
    delcomIndicator.turnOff();
    delcomIndicator.close();
  });

  it('should find Delcom device', function () {
    delcomIndicator.isConnected().should.equal(true, 'Delcom USB Indicator should be found')
  });

  it('should set green solid led', function (done) {
    delcomIndicator.solidGreen();
    console.log("Should be green");
    setTimeout(done, msToWait);
  });

  it('should set red solid led', function (done) {
    delcomIndicator.solidRed();
    console.log("Should be red");
    setTimeout(done, msToWait);
  });

  it('should set blue or yellow solid led', function (done) {
    delcomIndicator.solidBlue();
    console.log("Should be blue or yellow");
    setTimeout(done, msToWait);
  });

  it('should set green flashing led', function (done) {
    delcomIndicator.flashGreen();
    console.log("Should be flashing green");
    setTimeout(done, msToWait);
  });

  it('should set red flashing led', function (done) {
    delcomIndicator.flashRed();
    console.log("Should be flashing red");
    setTimeout(done, msToWait);
  });

  it('should set blue or yellow flashing led', function (done) {
    delcomIndicator.flashBlue();
    console.log("Should be flashing blue or yellow");
    setTimeout(done, msToWait);
  });
});