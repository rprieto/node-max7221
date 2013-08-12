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

});
