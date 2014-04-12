delcom-indicator
===============

A node library to drive a [Declom Visual Indicator](http://www.delcomproducts.com/products_usblmp.asp)

##Supported Platforms
This library is known to work on Mac and Linux platforms where [node-hid](https://www.npmjs.org/package/node-hid) can
be installed.  It was designed and tested on Mac OS/X 10.9.2 and Raspian (all updates installed as of March 17, 2014).
It has not been tested on Windows but should work provided that node-hid can be installed.

Node-hid requires libudev-dev and libusb-1.0-0 to install successfully.  On Raspian, you can install these using:

```shell
sudo apt-get install libudev-dev libusb-1.0-0-dev
```
On Linux you also need to grant permissions to write to the Delcom device.  On Raspian, you can create a file:

```shell
sudo nano /etc/udev/rules.d/85-delcom.rules
```

With the following rule (replace the group name with a group of your choice):

```shell
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fc5", ATTRS{idProduct}=="b080", ACTION=="add", SYMLINK+="delcom", MODE="0666", GROUP="[your group]"
```

You will have to reboot to make the rule take effect.

##Development Prerequisites
You need to install grunt-cli globally using:

```shell
npm install grunt-cli -g
```

You can then run tests using:

```shell
grunt
```

##Sample Code

```javascript
var DelcomIndicator = require('delcom-indicator');
var delcomIndicator = new DelcomIndicator();
delcomIndicator.flashRed();
delcomIndicator.close();
```

The test spike (tests/spike.cs) opens an attached Delcom light and runs through the available functionality by turning
it solid greed, red and blue and then flashing each color.  It should be pretty self-explanatory.

##Sample Application

A [Build Light indicator for TeamCity](https://github.com/SouthsideSoftware/teamcity-buildlight) that utilizes this
library to show the status of builds.



