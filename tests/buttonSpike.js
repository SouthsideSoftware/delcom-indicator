var should = require('should');
var DelcomIndicator = require('../DelcomIndicator');
var ButtonControl = require('../ButtonControl');

const msToWait = 6000;

describe('DelcomIndicator Button', function () {

  var delcomIndicator, buttonControl;
  var requestInput = () => {
    console.log('-----------------------');
    console.log('---PRESS THE BUTTON!---');
    console.log('-----------------------');
  };

  beforeEach(function () {
    delcomIndicator = new DelcomIndicator();
    delcomIndicator.turnOff();
    buttonControl = new ButtonControl(delcomIndicator);
  });

  afterEach(function () {
    buttonControl.close();
    delcomIndicator.close();
  });

  it('should detect button presses', (done) => {
    requestInput();
    buttonControl.addButtonPressListener(result => console.log(`BUTTON PRESSED (the read result was: ${result})`));
    console.log('Button presses should be detected');
    setTimeout(done, msToWait);
  });

  it('should not detect button presses after being closed', (done) => {
    buttonControl.close();
    requestInput();
    buttonControl.addButtonPressListener(result => console.log(`BUTTON PRESSED (the read result was: ${result})`));
    console.log('Button presses should NOT be detected');
    setTimeout(done, msToWait);
  });

});