var driver      = require('./lib/driver');
var spi         = require('./lib/spi');
var bitmap      = require('./lib/bitmap');
var ascii       = require('./lib/ascii');
var animation   = require('./lib/animation');

//
// GPIO configuration
//

exports.configure = function(pins) {
    spi.pins.DATA_IN = pins.dataIn;
    spi.pins.LOAD    = pins.load;
    spi.pins.CLOCK   = pins.clock;
};

//
// driver
//

exports.open     = driver.open;
exports.close    = driver.close;
exports.write    = driver.write;

//
// animations
//

exports.sequence = animation.sequence;
exports.scroll   = animation.scroll;
exports.stop     = animation.stop;

//
// bitmaps
//

exports.ascii    = ascii.symbols;
exports.text     = ascii.text;
exports.matrix   = bitmap.matrix;
exports.matrices = bitmap.matrices;
