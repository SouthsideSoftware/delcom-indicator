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

}

module.exports = BuzzerControl