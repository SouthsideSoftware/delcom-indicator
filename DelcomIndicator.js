"use strict";

var hid = require('node-hid');

class DelcomIndicator {
  constructor() {
    this.vendorId = 0xFC5;
    this.productId = 0xB080;
    this.device = undefined;
    this.green = 0xFE;
    this.red = 0xFD;
    this.blue = 0xFB;
    this.off = 0xFF;

    this.solid = 2;
    this.write8bytes = 101;
    this.write16bytes = 102;
    this.flash = 20;

    this.device = this.findDevice();
    if (this.device) {
      this.deviceConnection = new hid.HID(this.device.path);
    }
  }

  padValues(values, minLength) {
    while (values.length < minLength) {
      values.push(0);
    }
    return values;
  }

  writeToDevice(values) {
    if (!this.isOpen()) {
      throw "Device is not open";
    }
    if (process.platform === 'win32') {
      this.deviceConnection.sendFeatureReport(this.padValues(values, 8));
    } else {
      this.deviceConnection.write(values);
    }
  }

  findDevice() {
    var devices = hid.devices(this.vendorId, this.productId);
    if (devices !== undefined) {
      return devices[0];
    }
  }

  isConnected() {
    return this.device !== undefined;
  }

  isOpen() {
    return this.deviceConnection;
  }

  close() {
    if (this.deviceConnection) {
      this.deviceConnection.close();
      this.deviceConnection = undefined;
    }
  }

  solidGreen() {
    this.writeToDevice([this.write8bytes, this.solid, this.green]);
  }

  solidRed() {
    this.writeToDevice([this.write8bytes, this.solid, this.red]);
  }

  solidBlue() {
    this.writeToDevice([this.write8bytes, this.solid, this.blue]);
  }

  solidYellow() {
    this.solidBlue();
  }

  flashGreen() {
    this.writeToDevice([this.write8bytes, this.solid, this.green]);
    this.writeToDevice([this.write8bytes, this.flash, 0, 1]);
  }

  flashRed() {
    this.writeToDevice([this.write8bytes, this.flash, this.red]);
    this.writeToDevice([this.write8bytes, this.flash, 0, 2]);
  }

  flashBlue() {
    this.writeToDevice([this.write8bytes, this.flash, this.blue]);
    this.writeToDevice([this.write8bytes, this.flash, 0, 4]);
  }

  flashYellow() {
    this.flashBlue();
  }

  turnOff() {
    this.writeToDevice([this.write8bytes, this.solid, this.off]);
    this.writeToDevice([this.write8bytes, this.flash, this.off]);
  }

  /*
    https://www.delcomproducts.com/downloads/USBIOHID.pdf
    "The frequency is programmed by setting the buzzer’s frequency time variable, the units are in 256us. For
    example a desired buzzer frequency of 1KHz would yield a frequency value of around 4. The
    buzzer‘s on time and off time variables are used to program the duty cycle of the buzzer.
    These units are in 50ms. If you want the buzzer to turn on and off every second you would
    program 10 for the on time and off time. The repeat value dictates what mode the buzzer will
    be in. If a value of zero is used for the repeat value then the buzzer will sound continuously at
    the frequency specified until the user turns it off. If a value of 255 is used then the buzzer will
    sound at the frequency and duty cycle specified until the user turns it off. If any other value is
    used the buzzer will sound at the frequency and duty cycle specified and repeat for that many
    times. The DataLSB turns this feature on (1) or off (0). The DataMSB sets the frequency. The
    DataExt[0] sets the repeat value. The Data Ext[1] sets the on time. And the Data Ext[2] sets
    the off time."

    +-----------+----------+-----------+----------+-----------+----------+
    | FreqValue | Freq(Hz) | FreqValue | Freq(Hz) | FreqValue | Freq(Hz) |
    +-----------+----------+-----------+----------+-----------+----------+
    |         1 |     3906 |         5 |      781 |         9 |      434 |
    |         2 |     1953 |         6 |      651 |        10 |      390 |
    |         3 |     1302 |         7 |      558 |        11 |      355 |
    |         4 |      976 |         8 |      488 |        12 |      325 |
    +-----------+----------+-----------+----------+-----------+----------+
  */
  buzz(frequency, repeatCount, onTime, offTime) {
    this.writeToDevice([this.write16bytes, 70, 1, frequency, 0, 0, 0, 0, repeatCount, onTime, offTime, 0, 0, 0, 0, 0]);
  }
}

module.exports = DelcomIndicator