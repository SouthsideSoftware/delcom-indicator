delcom-indicator
===============

A node library to drive a [Declom Visual Indicator](http://www.delcomproducts.com/products_usblmp.asp)

Our development roadmap is on the [delcom-indicator Trello board](https://trello.com/b/m7d4l8qx/delcom-indicator)

## Install
```
npm install delcom-indicator
```

## Use
```
var DelcomIndicator = require('delcom-indicator');

var delcomIndicator = new DelcomIndicator();
delcomIndicator.flashRed();
delcomIndicator.close();
```

More complete examples are found in the tests/*.js files. The light test opens an attached Delcom light and runs through the available functionality by turning it solid green, red and blue/yellow and then flashing each color. The buzzer test exercises the built in buzzer (if present) by playing some repeating sounds, and uses the BuzzerControl helper to play some tunes.

## Related Application

A [Build Light indicator for TeamCity](https://github.com/SouthsideSoftware/teamcity-buildlight) that utilizes this
library to show the status of builds.

## Supported Platforms
This library is known to work on Mac and Linux platforms where [node-hid](https://www.npmjs.org/package/node-hid) can
be installed.  It was designed and tested on Mac OS/X 10.9.2, Max OS/X 10.11.3 and Raspian (all updates installed as of March 12, 2016).
It has also been tested on Windows 10.  It requires Node 4.x or higher.

Depending on your platform, Node-hid may require a compile, which adds additional dependencies.  See the [node-hid readme](https://github.com/node-hid/node-hid) for details.

On Linux you need to grant permissions to write to the Delcom device.  On Raspian, you can create a file:

```shell
sudo nano /etc/udev/rules.d/85-delcom.rules
```

With the following rule (replace the group name with a group of your choice):

```shell
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fc5", ATTRS{idProduct}=="b080", ACTION=="add", SYMLINK+="delcom", MODE="0666", GROUP="[your group]"
```

You will have to reboot to make the rule take effect.

## Development Prerequisites
You need to install gulp-cli globally using:

```shell
npm install gulp-cli -g
```

You can then run tests using:

```shell
gulp
```

The tests require you to have a Delcom USB device connected.  

To run only the light or buzzer tests you can use these commands:

```shell
gulp light
gulp buzzer
```
