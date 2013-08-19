var _      = require('underscore');
var should = require('should');
var bitmap = require('../lib/bitmap');

describe('bitmap', function() {
    
    it('can returns an empty bitmap: all rows/columns off', function() {
        var bmp = bitmap.empty();
        bmp.should.eql([0, 0, 0, 0, 0, 0, 0, 0]);
    });
    
    describe('user matrix', function() {

        it('calculates the bitmask for each row', function() {
            var bmp = bitmap.matrix([
                [1,0,0,0,0,0,0,0],
                [0,1,0,0,0,0,0,0],
                [0,0,1,0,0,0,0,0],
                [0,0,0,1,0,0,0,0],
                [0,0,0,0,1,0,0,0],
                [0,0,0,0,0,1,0,0],
                [0,0,0,0,0,0,1,0],
                [0,0,0,0,0,0,0,1],
            ]);
            bmp.should.eql([128, 64, 32, 16, 8, 4, 2, 1]);
        });

        it('can have several bits turned on', function() {
            var bmp = bitmap.matrix([
                [1,0,0,0,0,0,0,0],
                [1,1,0,0,0,0,0,0],
                [1,1,1,0,0,0,0,0],
                [1,1,1,1,0,0,0,0],
                [1,1,1,1,1,0,0,0],
                [1,1,1,1,1,1,0,0],
                [1,1,1,1,1,1,1,0],
                [1,1,1,1,1,1,1,1],
            ]);
            bmp.should.eql([128, 192, 224, 240, 248, 252, 254, 255]);
        });

        it('can also specify rows as strings', function() {
            var bmp = bitmap.matrix([
                '1       ',
                ' 1      ',
                '  1     ',
                '   1    ',
                '    1   ',
                '     1  ',
                '      1 ',
                '       1'
            ]);
            bmp.should.eql([128, 64, 32, 16, 8, 4, 2, 1]);
        });
    
        it('can load multiple matrices at once (vertically sliced)', function() {
            var bitmaps = bitmap.matrices([
                '        ',  '11111111',  '11111111',
                '        ',  '        ',  '11111111',
                '        ',  '11111111',  '11111111',
                '        ',  '        ',  '11111111',
                '        ',  '11111111',  '11111111',
                '        ',  '        ',  '11111111',
                '        ',  '11111111',  '11111111',
                '        ',  '        ',  '11111111',
            ]);
            bitmaps.should.have.length(3);
            bitmaps[0].should.eql([  0,   0,   0,   0,   0,   0,   0,   0]);
            bitmaps[1].should.eql([255,   0, 255,   0, 255,   0, 255,   0]);
            bitmaps[2].should.eql([255, 255, 255, 255, 255, 255, 255, 255]);
        });

    });
    
    describe('difference between 2 bitmaps, so we can only render changed rows', function() {
        
        it('returns nothing if there is no difference', function() {
            var bmp = bitmap.matrix([
                '1       ',
                ' 1      ',
                '  1     ',
            ]);
            var difference = bitmap.difference(bmp, bmp);
            difference.should.eql([null, null, null]);
        });

        it('returns changed rows in the second bitmap', function() {
            var bmp1 = bitmap.matrix([
                '1       ',
                ' 1      ',
                '  1     ',
            ]);
            var bmp2 = bitmap.matrix([
                '1       ',
                '        ',
                '    1   ',
            ]);
            var difference = bitmap.difference(bmp1, bmp2);
            difference.should.eql([null, 0, 8]);
        });
        
    });
    
    describe('shifting', function() {
        
        it('can shift a row left and right', function() {
            bitmap.shiftRow(bin('11111111'),  0).should.eql(bin('11111111'));
            bitmap.shiftRow(bin('11111111'),  1).should.eql(bin('01111111'));
            bitmap.shiftRow(bin('11111111'),  7).should.eql(bin('00000001'));
            bitmap.shiftRow(bin('11111111'), -1).should.eql(bin('11111110'));
            bitmap.shiftRow(bin('11111111'), -7).should.eql(bin('10000000'));
        });

        it('can shift an entire bitmap right', function() {
            var bmps = bitmap.matrices([
                '1       ', ' 1      ', '  1     ', '   1    ', '    1   ', '     1  ', '      1 ', '       1',
                ' 1      ', '  1     ', '   1    ', '    1   ', '     1  ', '      1 ', '       1', '        ',
                '  1     ', '   1    ', '    1   ', '     1  ', '      1 ', '       1', '        ', '        ',
                '   1    ', '    1   ', '     1  ', '      1 ', '       1', '        ', '        ', '        ',
                '    1   ', '     1  ', '      1 ', '       1', '        ', '        ', '        ', '        ',
                '     1  ', '      1 ', '       1', '        ', '        ', '        ', '        ', '        ',
                '      1 ', '       1', '        ', '        ', '        ', '        ', '        ', '        ',
                '       1', '        ', '        ', '        ', '        ', '        ', '        ', '        ',
            ]);
            bitmap.shift(bmps[0], 1).should.eql(bmps[1]);
            bitmap.shift(bmps[0], 2).should.eql(bmps[2]);
            bitmap.shift(bmps[0], 3).should.eql(bmps[3]);
            bitmap.shift(bmps[0], 4).should.eql(bmps[4]);
            bitmap.shift(bmps[0], 5).should.eql(bmps[5]);
            bitmap.shift(bmps[0], 6).should.eql(bmps[6]);
            bitmap.shift(bmps[0], 7).should.eql(bmps[7]);
        });

        it('can shift an entire bitmap left', function() {
            var bmps = bitmap.matrices([
                '1       ', '        ', '        ', '        ', '        ', '        ', '        ', '        ',
                ' 1      ', '1       ', '        ', '        ', '        ', '        ', '        ', '        ',
                '  1     ', ' 1      ', '1       ', '        ', '        ', '        ', '        ', '        ',
                '   1    ', '  1     ', ' 1      ', '1       ', '        ', '        ', '        ', '        ',
                '    1   ', '   1    ', '  1     ', ' 1      ', '1       ', '        ', '        ', '        ',
                '     1  ', '    1   ', '   1    ', '  1     ', ' 1      ', '1       ', '        ', '        ',
                '      1 ', '     1  ', '    1   ', '   1    ', '  1     ', ' 1      ', '1       ', '        ',
                '       1', '      1 ', '     1  ', '    1   ', '   1    ', '  1     ', ' 1      ', '1       ',
            ]);
            bitmap.shift(bmps[0], -1).should.eql(bmps[1]);
            bitmap.shift(bmps[0], -2).should.eql(bmps[2]);
            bitmap.shift(bmps[0], -3).should.eql(bmps[3]);
            bitmap.shift(bmps[0], -4).should.eql(bmps[4]);
            bitmap.shift(bmps[0], -5).should.eql(bmps[5]);
            bitmap.shift(bmps[0], -6).should.eql(bmps[6]);
            bitmap.shift(bmps[0], -7).should.eql(bmps[7]);
        });
        
    });

    describe('unions', function() {
        
        it('can give the union of 2 bitmaps', function() {
            var bmps = bitmap.matrices([
                '11      ', '    11  ', '11  11  ',
                '11      ', '    11  ', '11  11  ',
                '11      ', '    11  ', '11  11  ',
                '11      ', '    11  ', '11  11  ',
                '11      ', '    11  ', '11  11  ',
                '11      ', '    11  ', '11  11  ',
                '11      ', '    11  ', '11  11  ',
                '11      ', '    11  ', '11  11  ',
            ]);
            bitmap.union(bmps[0], bmps[1]).should.eql(bmps[2]);
        });
        
    });

    function bin(str) {
        return parseInt(str, 2);
    }
    
});
