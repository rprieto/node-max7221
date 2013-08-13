// Using a locally-modified version of pi-gpio (synchronous writes = much faster)
// Eventually we'll probably just absorb the code that we need (10 lines)

var pigpio = require('./pi-gpio');

exports.open = function(pin, callback) {
   pigpio.open(pin, 'output', callback);
}

exports.close = function(pin, callback) {
   pigpio.close(pin, callback);
}

exports.write = function(pin, value) {
   pigpio.write(pin, value, function() {});
}
