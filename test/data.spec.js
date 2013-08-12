var _       = require('underscore');
var should  = require('should');
var shapes  = require('../lib/data/shapes');
var letters = require('../lib/data/letters');
var digits  = require('../lib/data/digits');

describe('data', function() {
    
    it ('can load all predefined collections', function() {
        var collections = [shapes, letters, digits];
        collections.forEach(function(collection) {
            Object.keys(collection).length.should.be.above(1);
            _.each(collection, function(bitmap) {
                bitmap.should.have.length(8);
            });
        });
    });

    it ('has letters from M-T (for a start)', function() {
        var start = 'i'.charCodeAt(0);
        var finish = 't'.charCodeAt(0);
        for (var i = start; i <= finish; ++i) {
            var bmp = letters[String.fromCharCode(i)];
            should.exist(bmp);
            bmp.should.have.length(8);
        }
    });
    
    it ('has digits from 0-3 (for a start)', function() {
        for (var i = 0; i <= 3; ++i) {
            var bmp = digits[i];
            should.exist(bmp);
            bmp.should.have.length(8);
        }
    });

});
