var driver = require('./driver');
var bitmap = require('./bitmap');

var intervalId = null;

exports.sequence = function(bitmaps, speed) {
    clearInterval(intervalId);
    animate(0, bitmaps.length, speed, function(offset) {
        driver.write(bitmaps[offset]);
    });
};

exports.scroll = function(bitmaps, speed) {
    throw 'not implemented yet';
};

exports.stop = function() {
    clearInterval(intervalId);
};

function animate(index, max, speed, callback) {
    function recurse() {
        callback(index);
        animate((index + 1) % max, max, speed, callback);
    }
    intervalId = setTimeout(recurse, speed);
}
