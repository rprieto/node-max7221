var _ = require('underscore');
var should = require('should');
var shapes = require('../lib/shapes');

describe('shapes', function() {
    
    it ('can load all defined shapes', function() {
        Object.keys(shapes).length.should.be.above(1);
        _.each(shapes, function(shape) {
            shape.should.have.length(8);
        });
    });

});
