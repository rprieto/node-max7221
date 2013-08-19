var should    = require('should');
var sinon     = require('sinon');
var animation = require('../lib/animation');
var ascii     = require('../lib/ascii');
var driver    = require('../lib/driver');
var bitmap    = require('../lib/bitmap');

describe('animation', function() {
    
    var clock;
    
    beforeEach(function() {
        clock = sinon.useFakeTimers();
        sinon.stub(driver, 'write');
    });

    afterEach(function() {
        clock.restore();
        driver.write.restore();
    });
    
    describe('displaying bitmaps in a sequence', function() {
        
        it('calls write() with the next bitmap every X milliseconds', function() {
            var list = ascii.text('abc');
            animation.sequence(list, 500);
            driver.write.callCount.should.eql(0);
            clock.tick(500);
            driver.write.lastCall.args[0].should.eql(ascii.symbols['a']);
            clock.tick(500);
            driver.write.lastCall.args[0].should.eql(ascii.symbols['b']);
            clock.tick(500);
            driver.write.lastCall.args[0].should.eql(ascii.symbols['c']);
        });

        it('loops back to the first bitmap when it reaches the end', function() {
            var list = ascii.text('abc');
            animation.sequence(list, 500);
            clock.tick(500);
            clock.tick(500);
            clock.tick(500);
            clock.tick(500);
            driver.write.lastCall.args[0].should.eql(ascii.symbols['a']);
        });
        
    });

});
