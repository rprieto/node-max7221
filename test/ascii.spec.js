var _       = require('underscore');
var should  = require('should');
var ascii   = require('../lib/ascii');

describe('ascii', function() {

    it('can load the entire collection', function() {
        Object.keys(ascii.symbols).length.should.be.above(1);
        _.each(ascii.symbols, function(bitmap) {
            bitmap.should.have.length(8);
        });
    });

    it('has well formed letters', function() {
        ascii.symbols['a'].should.eql([60,126,102,102,126,126,102,102]);
        ascii.symbols['i'].should.eql([24,24,24,24,24,24,24,24]);
    });

    it('has letters from a-z', function() {
        var start  = 'a'.charCodeAt(0);
        var finish = 'z'.charCodeAt(0);
        for (var i = start; i <= finish; ++i) {
            var bmp = ascii.symbols[String.fromCharCode(i)];
            should.exist(bmp);
            bmp.should.have.length(8);
        }
    });

    it('has digits from 0-9', function() {
        for (var i = 0; i <= 9; ++i) {
            var bmp = ascii.symbols[i.toString()];
            should.exist(bmp);
            bmp.should.have.length(8);
        }
    });
    
    it('can create a list of bitmaps from a string', function() {
        var list = ascii.text('hello');
        list.should.have.length(5);
        list[0].should.eql(ascii.symbols['h']);
        list[1].should.eql(ascii.symbols['e']);
        list[2].should.eql(ascii.symbols['l']);
        list[3].should.eql(ascii.symbols['l']);
        list[4].should.eql(ascii.symbols['o']);
    });

});
