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
    this.write = 101;
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
    this.writeToDevice([this.write, this.solid, this.green]);
  }

  solidRed() {
    this.writeToDevice([this.write, this.solid, this.red]);
  }

  solidBlue() {
    this.writeToDevice([this.write, this.solid, this.blue]);
  }

  solidYellow() {
    this.solidBlue();
  }

  flashGreen() {
    this.writeToDevice([this.write, this.solid, this.green]);
    this.writeToDevice([this.write, this.flash, 0, 1]);
  }

  flashRed() {
    this.writeToDevice([this.write, this.flash, this.red]);
    this.writeToDevice([this.write, this.flash, 0, 2]);
  }

  flashBlue() {
    this.writeToDevice([this.write, this.flash, this.blue]);
    this.writeToDevice([this.write, this.flash, 0, 4]);
  }

  flashYellow() {
    this.flashBlue();
  }

  turnOff() {
    this.writeToDevice([this.write, this.solid, this.off]);
    this.writeToDevice([this.write, this.flash, this.off]);
  }
}

module.exports = DelcomIndicator