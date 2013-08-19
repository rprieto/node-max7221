# node-max7221

> Node.js GPIO abstraction for the MAX7221 driver chip (LED matrix),  for use on a Raspberry PI.
> Built by Brad Ward, James Ottaway, and Romain Prieto at CampJS 2013

## Requirements

* Raspberry PI
* LED Matrix
* MAX7221 display driver chip (http://www.maximintegrated.com/datasheet/index.mvp/id/1339)
* Wiring components (breadboard, jumper wires, resistors, capacitors)

Or a pre-made [LED matrix kit](http://littlebirdelectronics.com/products/led-matrix-kit):
![kit photo](https://raw.github.com/rprieto/node-max7221/master/docs/led-matrix-kit.jpg)

On the Raspberry PI:

- Install Node.js
- Install [GPIO admin](https://github.com/quick2wire/quick2wire-gpio-admin) so you don't need to run Node as root

## Show me the code

```js
var max7221 = require('node-max7221');

// which GPIO pins are wired to the MAX7221 driver (see diagram in /docs folder)
// can be any valid GPIO pins
max7221.configure({ dataIn: 25, load: 8, clock: 7 });

max7221.open(function() {

    // write a single bitmap
    max7221.write(bitmap);
    
    // start a sequence or some scrolling text
    max7221.sequence([bitmap, bitmap, bitmap], 500);
    max7221.scroll([bitmap, bitmap, bitmap], 500);
    
    // stop a running sequence/scroll
    max7221.stop();

});

process.on('SIGTERM', max7221.close);
```

Bitmaps can be loaded or defined easily:

```js
// predefined letters numbers & symbols
max7221.ascii['a']
max7221.ascii['3']
max7221.ascii['.']

// syntactic sugar for a list of ascii characters
max7221.text('hello world!')

// make an 8x8 bitmap from arrays (ex: ndarray)
max7221.matrix([
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1]
]);

// make an 8x8 bitmap from strings (easy to read in code)
max7221.matrix([
    '  1111  ',
    ' 111111 ',
    '111  111',
    '11    11',
    '11    11',
    '111  111',
    ' 111111 ',
    '  1111  ',
]);

// load a whole array of bitmaps at once
max7221.matrices([
    '  1111  ',  '   11   ',  '11111111',
    ' 111111 ',  '   11   ',  ' 111111 ',
    '111  111',  '   11   ',  '  1111  ',
    '11    11',  '11111111',  '   11   ',
    '11    11',  '11111111',  '   11   ',
    '111  111',  '   11   ',  '  1111  ',
    ' 111111 ',  '   11   ',  ' 111111 ',
    '  1111  ',  '   11   ',  '11111111',
]);
```

## Running the samples

On your Raspberry PI:

```
git clone git@github.com:rprieto/node-max7221.git
cd node-max7221
npm install --production

node examples/helloworld.js
node examples/shapes.js
```

## Notes

The `write` function is synchronous. GPIO works by writing to the file system, and current Node.js limitations mean `fs.writeFileSync()` is an order of magnitude faster than `fs.writeFile()` when writing little content.

This module only handles 1 color for now.
