"use strict";

var hid = require('node-hid');

export default class DelcomIndicator {
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
    if (this.isOpen()) {
      this.deviceConnection.write([this.write, this.solid, this.green]);
    } else {
      throw "Device is not open";
    }
  }

  solidRed() {
    if (this.isOpen()) {
      this.deviceConnection.write([this.write, this.solid, this.red]);
    } else {
      throw "Device is not open";
    }
  }

  solidBlue() {
    if (this.isOpen()) {
      this.deviceConnection.write([this.write, this.solid, this.blue]);
    } else {
      throw "Device is not open";
    }
  }

  flashGreen() {
    if (this.isOpen()) {
      this.deviceConnection.write([this.write, this.solid, this.green]);
      this.deviceConnection.write([this.write, this.flash, 0, 1]);
    } else {
      throw "Device is not open";
    }
  }

  flashRed() {
    if (this.isOpen()) {
      this.deviceConnection.write([this.write, this.flash, this.red]);
      this.deviceConnection.write([this.write, this.flash, 0, 2]);
    } else {
      throw "Device is not open";
    }
  }

  flashBlue() {
    if (this.isOpen()) {
      this.deviceConnection.write([this.write, this.flash, this.blue]);
      this.deviceConnection.write([this.write, this.flash, 0, 4]);
    } else {
      throw "Device is not open";
    }
  }

  turnOff() {
    if (this.isOpen()) {
      this.deviceConnection.write([this.write, this.solid, this.off]);
      this.deviceConnection.write([this.write, this.flash, this.off]);
    } else {
      throw "Device is not open";
    }
  }
}