var gpio = require('./gpio');

// These can be overridden when initialising the module
exports.pins = {
    DATA_IN: 22,
    LOAD: 24,
    CLOCK: 26
};

exports.writeByte = function(value) {
    var i = 8;
    var currentData = null;
    while(i > 0) {
        var mask = 0x01 << (i - 1);
        gpio.write(exports.pins.CLOCK, 0);
        var val = (value & mask) ? 1 : 0;
        if (currentData != val) {
            gpio.write(exports.pins.DATA_IN, val);
        }
        gpio.write(exports.pins.CLOCK, 1);
        currentData = val
        --i;
    }
};

exports.write = function(byte1, byte2) {
   gpio.write(exports.pins.LOAD, 0);
   exports.writeByte(byte1);
   exports.writeByte(byte2);
   gpio.write(exports.pins.LOAD, 1);
};
