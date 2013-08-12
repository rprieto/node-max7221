var _ = require('underscore');
var should = require('should');
var bitmap = require('../lib/bitmap');

describe('bitmap', function() {
    
    describe('from a matrix (useful when handling ndarrays)', function() {

        it ('calculates the bitmask for each row', function() {
            var bmp = bitmap.fromMatrix([
                [1,0,0,0,0,0,0,0],
                [0,1,0,0,0,0,0,0],
                [0,0,1,0,0,0,0,0],
                [0,0,0,1,0,0,0,0],
                [0,0,0,0,1,0,0,0],
                [0,0,0,0,0,1,0,0],
                [0,0,0,0,0,0,1,0],
                [0,0,0,0,0,0,0,1],
            ]);
            _.pluck(bmp, 'row').should.eql([1, 2, 3, 4, 5, 6, 7, 8])
            _.pluck(bmp, 'bitmask').should.eql([128, 64, 32, 16, 8, 4, 2, 1]);
        });

        it ('can have several bits turned on', function() {
            var bmp = bitmap.fromMatrix([
                [1,0,0,0,0,0,0,0],
                [1,1,0,0,0,0,0,0],
                [1,1,1,0,0,0,0,0],
                [1,1,1,1,0,0,0,0],
                [1,1,1,1,1,0,0,0],
                [1,1,1,1,1,1,0,0],
                [1,1,1,1,1,1,1,0],
                [1,1,1,1,1,1,1,1],
            ]);
            _.pluck(bmp, 'row').should.eql([1, 2, 3, 4, 5, 6, 7, 8])
            _.pluck(bmp, 'bitmask').should.eql([128, 192, 224, 240, 248, 252, 254, 255]);
        });

    });

    describe('from strings (useful for shapes stored in code)', function() {
        
        it ('calculates the bitmask for each row', function() {
            var bmp = bitmap.fromStrings([
                '1       ',
                ' 1      ',
                '  1     ',
                '   1    ',
                '    1   ',
                '     1  ',
                '      1 ',
                '       1'
            ]);
            _.pluck(bmp, 'row').should.eql([1, 2, 3, 4, 5, 6, 7, 8])
            _.pluck(bmp, 'bitmask').should.eql([128, 64, 32, 16, 8, 4, 2, 1]);
        });

    });
    
});
