var _       = require('underscore');
var should  = require('should');
var ascii   = require('../lib/ascii');

describe('ascii', function() {

    it('can load the entire collection', function() {
        Object.keys(ascii).length.should.be.above(1);
        _.each(ascii, function(bitmap) {
            bitmap.should.have.length(8);
        });
    });

    it('has well formed letters', function() {
        _.pluck(ascii['a'], 'bitmask').should.eql([60,126,102,102,126,126,102,102]);
        _.pluck(ascii['i'], 'bitmask').should.eql([24,24,24,24,24,24,24,24]);
    });

    it('has letters from a-z', function() {
        var start  = 'a'.charCodeAt(0);
        var finish = 'z'.charCodeAt(0);
        for (var i = start; i <= finish; ++i) {
            var bmp = ascii[String.fromCharCode(i)];
            should.exist(bmp);
            bmp.should.have.length(8);
        }
    });

    it('has digits from 0-9', function() {
        for (var i = 0; i <= 9; ++i) {
            var bmp = ascii[i.toString()];
            should.exist(bmp);
            bmp.should.have.length(8);
        }
    });

});
