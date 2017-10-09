var should = require('should');
var DelcomIndicator = require('../DelcomIndicator');
var BuzzerControl = require('../BuzzerControl');

const msToWait = 5000;

describe('DelcomIndicator Buzzer', function () {

  var delcomIndicator, buzzerControl;

  beforeEach(function () {
    delcomIndicator = new DelcomIndicator();
    buzzerControl = new BuzzerControl(delcomIndicator);
    delcomIndicator.turnOff();
  });

  afterEach(function () {
    delcomIndicator.turnOff();
    delcomIndicator.close();
  });

  it('should play a long low tone three times with long spacing', (done) => {

    var freq = 12; // 325 Hz
    var repeatCount = 3; // repeat this many times
    var onTime = 5; // * 50ms
    var offTime = 10; // * 50ms
    console.log('should play a long low tone three times with long spacing');
    delcomIndicator.buzz(freq, repeatCount, onTime, offTime);
    setTimeout(done, msToWait);
  });

  it('should play a short high tone 5 times with short spacing', (done) => {

    var freq = 2; // 1953 Hz
    var repeatCount = 5; // repeat this many times
    var onTime = 2; // * 50ms
    var offTime = 1; // * 50ms
    console.log('should play a short high tone 5 times with short spacing');
    delcomIndicator.buzz(freq, repeatCount, onTime, offTime);
    setTimeout(done, msToWait);
  });

  it('turnOffBuzzer should silence buzzer', (done) => {
    delcomIndicator.buzz(12, 0, 1, 0); // continuous buzz - passing 0 for repeat count arg
    console.log('should be buzzing');
    setTimeout(() => {
      delcomIndicator.turnOffBuzzer();
      console.log('should have STOPPED buzzing');
    }, msToWait / 4);
    setTimeout(done, msToWait);
  });

  it('should play the success tune', (done) => {
    buzzerControl.playTune(buzzerControl.tuneSuccess);
    console.log("Should play the success tune");
    setTimeout(done, msToWait);
  });

  it('should play the failure tune', (done) => {
    buzzerControl.playTune(buzzerControl.tuneFailure);
    console.log("Should play the failure tune");
    setTimeout(done, msToWait);
  });

});