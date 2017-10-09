"use strict";

class ButtonControl {
  constructor(device, pollIntervalMs = 100) {
    if (process.platform !== 'win32') {
      console.warn(`Button control has only been tested on Windows and probably won't work on ${process.platform}`);
    }
    this.device = device;
    this.device.readButtonState(); // clear the event counter so we don't count any presses prior to creation of this object
    this.callbacks = [];
    this.timer = setInterval(() => {
      var that = this;
      if (that.callbacks.length > 0) {
        var result = that.device.readButtonState();
        if (result && result.length > 0 && result[0] > 0) {
          // The button was pressed
          that.callbacks.forEach(cb => cb(result));
        }
      }
    }, pollIntervalMs);
  }

  close() {
    this.callbacks = [];
    clearInterval(this.timer);
  }

  addButtonPressListener(cb) {
    this.callbacks.push(cb);
  }
}

module.exports = ButtonControl