var async   = require('async');
var gpio    = require('./gpio');
var spi     = require('./spi');
var bitmap  = require('./bitmap');

var currentBitmap = bitmap.empty();
var intervalId = null;

function closeAllPins(next) {
    async.eachSeries([spi.pins.DATA_IN, spi.pins.LOAD, spi.pins.CLOCK], gpio.close, next);
}

function openAllPinsForOutput(next) {
    async.eachSeries([spi.pins.DATA_IN, spi.pins.LOAD, spi.pins.CLOCK], gpio.open, next);
}

function sendInitSequence(next) {
    spi.write(registers.SCAN_LIMIT,   0x07);  // confirm this
    spi.write(registers.DECODE_MODE,  0x00);
    spi.write(registers.INTENSITY,    0x0F);
    spi.write(registers.SHUTDOWN,     0x00);
    spi.write(registers.SHUTDOWN,     0x01);
    spi.write(registers.DISPLAY_TEST, 0x00);
}

function startWithBlankMatrix(next) {
    exports.write(bitmap.empty());
    next();
}

exports.open = function(callback) {
    async.series([
        closeAllPins,
        openAllPinsForOutput,
        sendInitSequence,
        startWithBlankMatrix
    ], callback)
};

exports.close = function(callback) {
    closeAllPins(callback);
};

exports.write = function(bmp) {
    var updates = (currentBitmap != null) ? bitmap.difference(currentBitmap, bmp) : bmp;
    currentBitmap = bmp;
    updates.forEach(function(item) {
        spi.write(item.row, item.bitmask);
    });
};
