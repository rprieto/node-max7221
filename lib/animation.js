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
    clearInterval(intervalId);
    animate(0, 8 * bitmaps.length, speed / 8, function(offset) {
        driver.write(getScrollFrame(bitmaps, offset));
    });
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

function getScrollFrame(bitmaps, offset) {
    var index1  = Math.floor(offset / 8);
    var index2  = (index1 + 1) % bitmaps.length;
    var columnOffset = offset - index1 * 8;
    var bmp1 = bitmap.shift(bitmaps[index1], 0 - columnOffset)
    var bmp2 = bitmap.shift(bitmaps[index2], 8 - columnOffset)
    return bitmap.union(bmp1, bmp2);
}
