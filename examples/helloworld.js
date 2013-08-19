var max7221 = require('../max7221');

max7221.configure({
    dataIn: 22,
    load: 24,
    clock: 26
});

max7221.open(function() {
    max7221.scroll(max7221.text('hello world!'), 800);
});

process.on('SIGTERM', function() {
    max7221.close();
});
