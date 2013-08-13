var driver      = require('./lib/driver');
var spi         = require('./lib/spi');
var bitmap      = require('./lib/bitmap');
var ascii       = require('./lib/ascii');

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
exports.sequence = driver.sequence;
exports.scroll   = driver.scroll;
exports.stop     = driver.stop;

//
// bitmaps
//

exports.ascii    = ascii;
exports.matrix   = bitmap.matrix;
exports.matrices = bitmap.matrices;

exports.text = function(str) {
    return str.split().map(function(letter) {
        return ascii[letter];
    });
}

