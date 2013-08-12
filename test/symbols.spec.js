var _ = require('underscore');
var should = require('should');
var symbols = require('../lib/symbols');

describe('symbols', function() {
    
    it ('can load all defined symbols', function() {
        Object.keys(symbols).length.should.be.above(1);
        _.each(symbols, function(symbol) {
            symbol.should.have.length(8);
        });
    });

    it ('has letters from M-T (for a start)', function() {
        var start = 'm'.charCodeAt(0);
        var finish = 't'.charCodeAt(0);
        for (var i = start; i <= finish; ++i) {
            var bmp = symbols[String.fromCharCode(i)];
            should.exist(bmp);
            bmp.should.have.length(8);
        }
    });

});
