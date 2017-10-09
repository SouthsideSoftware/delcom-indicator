"use strict";

class BuzzerControl {
  constructor(device) {
    this.device = device;

    //----------------------------------------------------------------------
    // Tunes are sequences of notes, notes are frequency (in multiples of 
    // 256us), duration (in multiples of 50ms) and delay (in ms)
    this.tuneSuccess = [
      [3, 2, 100],
      [12, 1, 100],
      [4, 2, 100],
      [12, 1, 100],
      [3, 2, 100],
      [12, 1, 100],
      [4, 2, 100],
      [12, 1, 100],
      [5, 2, 100],
      [12, 1, 100],
      [4, 2, 100],
      [12, 1, 100],
      [6, 2, 500],
  
      [3, 2, 100],
      [12, 1, 100],
      [4, 2, 100],
      [12, 1, 100],
      [3, 2, 100],
      [12, 1, 100],
      [4, 2, 100],
      [12, 1, 100],
      [5, 2, 100],
      [12, 1, 100],
      [4, 2, 100],
      [12, 1, 100],
      [6, 2, 0]
    ];

    this.tuneFailure = [
      [7, 8, 500],
      [7, 8, 500],
      [7, 8, 500],
      [9, 7, 350],
      [6, 3, 150],
      [7, 8, 500],
      [9, 7, 350],
      [6, 3, 150],
      [7, 8, 0]
    ];
    //----------------------------------------------------------------------
  }

  playTune(tune) {
    var delay = 0;
    var device = this.device;
    tune.forEach(function(note) {
      console.log('wait' + delay);
      setTimeout(function() {
        device.buzz(note[0], 1, note[1], 0);
      }, delay);
      delay += (note[2]);
    }, this);
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
    this.writeToDevice([this.write16bytes, this.buzzCommand, this.buzzerOn, frequency, 0, 0, 0, 0, repeatCount, onTime, offTime, 0, 0, 0, 0, 0]);
  }
}

module.exports = BuzzerControl