var gpio = require('pi-gpio');
var async = require('async');

var dataIn = 22;
var load   = 24;
var clock  = 26;

// define max7219 registers
var max7219_reg_noop        = 0x00;
var max7219_reg_digit0      = 0x01;
var max7219_reg_digit1      = 0x02;
var max7219_reg_digit2      = 0x03;
var max7219_reg_digit3      = 0x04;
var max7219_reg_digit4      = 0x05;
var max7219_reg_digit5      = 0x06;
var max7219_reg_digit6      = 0x07;
var max7219_reg_digit7      = 0x08;
var max7219_reg_decodeMode  = 0x09;
var max7219_reg_intensity   = 0x0a;
var max7219_reg_scanLimit   = 0x0b;
var max7219_reg_shutdown    = 0x0c;
var max7219_reg_displayTest = 0x0f;

var dataInState = null;
var currentRowBitmaps = [0,0,0,0,0,0,0,0];

function open(pin, cb) {
   gpio.open(pin, 'output', cb);
}

function close(pin, cb) {
   gpio.close(pin, cb);
}

function write(opts, cb) {
   gpio.write(opts.pin, opts.val, cb);
}

function putByte(data, next) {
  var i = 8;
  var writes = [];
  while(i > 0) {
    var mask = 0x01 << (i - 1);
    writes.push({pin: clock, val: 0});   // tick
    var val = (data & mask) ? 1 : 0;
    if (dataInState != val) {
        writes.push({pin: dataIn, val: val});
    }
    writes.push({pin: clock, val: 1});   // tock
    dataInState = val
    --i;                         // move to lesser bit
  }
  async.eachSeries(writes, write, next);
}

function driver(opts, next) {
   var steps = [
      function(next) { write({pin: load, val:0}, next); },
      function(next) { putByte(opts.reg, next); },
      function(next) { putByte(opts.col, next); },
      function(next) { write({pin: load, val:1}, next); },
   ];  
   async.series(steps, next ? next : function() {});
}

function setup (next) {
  async.eachSeries([dataIn, load, clock], close, function(err) {
   async.eachSeries([dataIn, load, clock], open, function(err) {
	   var writes = [
	      {reg: max7219_reg_scanLimit,   col: 0x07}, // confirm this
	      {reg: max7219_reg_decodeMode,  col: 0x00},
	      {reg: max7219_reg_intensity,   col: 0x0F},
	      {reg: max7219_reg_shutdown,    col: 0x00},
	      {reg: max7219_reg_shutdown,    col: 0x01},
 	      {reg: max7219_reg_displayTest, col: 0x00},
	   ];
	   for (var row=0x01; row<=0x06; row++) {
	      writes.push({reg: row, col: 0x00});
	   }	
	   for (var row=0x07; row<=0x08; row++) {
	      writes.push({reg: row, col: 0x00});
	   }	
           async.eachSeries(writes, driver, next);
   });
  });
}  

function calculateRowBitmap(columns) 
{
    return (columns[0] ? 128 : 0) | 
           (columns[1] ?  64 : 0) |
           (columns[2] ?  32 : 0) |
           (columns[3] ?  16 : 0) |
           (columns[4] ?   8 : 0) |
           (columns[5] ?   4 : 0) |
           (columns[6] ?   2 : 0) |
           (columns[7] ?   1 : 0);
}

function render(matrix, cb) {
    rowUpdates = [];
    for (var i = 0; i < matrix.length; i++) {
        newRowBitmap = calculateRowBitmap(matrix[i]);
	if (newRowBitmap == currentRowBitmaps[i]) continue;
	rowUpdates.push({reg: i, col: newRowBitmap});
	currentRowBitmaps[i] = newRowBitmap;
    }
    async.eachSeries(rowUpdates, driver, cb);
}

setup(function() {
     console.log('Lets go!');
     render([[1], [1], [1], [1], [1], [1], [1], [1]], function() {
         render([[0], [0], [0], [0], [0], [0], [0], [0], [0]], function() {
             render([[1], [1], [1], [1], [1], [1], [1], [1]], function() {
             });
         });
     });
     /*
     var writes = [
	{reg: 1, col: 1},
	{reg: 2, col: 2},
	{reg: 3, col: 4},
	{reg: 4, col: 8},
	{reg: 5, col: 16},
	{reg: 6, col: 32},
	{reg: 7, col: 64},
	{reg: 8, col: 128}
     ];
     async.eachSeries(writes, driver, function(err) {
	if (err) { console.log(err); }
	else { console.log('Its so beautiful'); }
     });
     */
});

module.exports = {
  setup: setup,
  render: render
};
