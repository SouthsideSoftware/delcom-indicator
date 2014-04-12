var hid = require('node-hid');

function DelcomIndicator(){
    var vendorId = 0xFC5;
    var productId = 0xB080;

    this.findDevice = function(){
        var devices = hid.devices(vendorId, productId);
        if (devices !== undefined){
            return devices[0];
        }
    };

    this.green = 0xFE;
    this.red = 0xFD;
    this.blue= 0xFB;
    this.off = 0xFF;

    this.solid = 2;
    this.write = 101;
    this.flash = 20;

    this.device = this.findDevice();
    if (this.device){
        this.deviceConnection = new hid.HID(this.device.path);
    }
};


DelcomIndicator.prototype.isConnected = function(){
    return this.device !== undefined;
};

DelcomIndicator.prototype.isOpen = function() {
    return this.deviceConnection;
};

DelcomIndicator.prototype.close = function(){
    if (this.deviceConnection){
        this.deviceConnection.close();
        this.deviceConnection = undefined;
    }
};

DelcomIndicator.prototype.solidGreen = function(){
    if (this.isOpen()){
        this.deviceConnection.write([this.write, this.solid, this.green]);
    } else {
        throw "Device is not open";
    }
};

DelcomIndicator.prototype.solidRed = function(){
    if (this.isOpen()){
        this.deviceConnection.write([this.write, this.solid, this.red]);
    } else {
        throw "Device is not open";
    }
};

DelcomIndicator.prototype.solidBlue = function(){
    if (this.isOpen()){
        this.deviceConnection.write([this.write, this.solid, this.blue]);
    } else {
        throw "Device is not open";
    }
};

DelcomIndicator.prototype.flashGreen = function(){
    if (this.isOpen()){
        //this.deviceConnection.write([this.write, this.solid, this.green]);
        this.deviceConnection.write([this.write, this.flash, 0, 1]);
    } else {
        throw "Device is not open";
    }
};

DelcomIndicator.prototype.flashRed = function(){
    if (this.isOpen()){
        //this.deviceConnection.write([this.write, this.flash, this.red]);
        this.deviceConnection.write([this.write, this.flash, 0, 2]);
    } else {
        throw "Device is not open";
    }
};

DelcomIndicator.prototype.flashBlue = function(){
    if (this.isOpen()){
        //this.deviceConnection.write([this.write, this.flash, this.blue]);
        this.deviceConnection.write([this.write, this.flash, 0, 4]);
    } else {
        throw "Device is not open";
    }
};

DelcomIndicator.prototype.turnOff = function(){
    if (this.isOpen()){
        this.deviceConnection.write([this.write, this.solid, this.off]);
        this.deviceConnection.write([this.write, this.flash, this.off]);
    } else {
        throw "Device is not open";
    }
};

module.exports = DelcomIndicator;