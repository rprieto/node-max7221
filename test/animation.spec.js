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

    describe('scrolling bitmaps', function() {
        
        it('scroll all 8 columns at the given speed', function() {
            var list = ascii.text('abc');
            animation.scroll(list, 800);
            driver.write.callCount.should.eql(0);
            clock.tick(800);
            driver.write.callCount.should.eql(8);
        });

        it('writes the first bitmap on tick 1', function() {
            var list = ascii.text('abc');
            animation.scroll(list, 800);
            clock.tick(100);
            driver.write.lastCall.args[0].should.eql(ascii.symbols['a']);
        });

        it('writes the second bitmap on tick 8', function() {
            var list = ascii.text('abc');
            animation.scroll(list, 800);
            clock.tick(100 + 800);
            driver.write.lastCall.args[0].should.eql(ascii.symbols['b']);
        });

        it('writes a scrolled frame in between', function() {
            var list = bitmap.matrices([
                '        ',  '11111111',
                '11111111',  '        ',
                '        ',  '11111111',
                '11111111',  '        ',
                '        ',  '11111111',
                '11111111',  '        ',
                '        ',  '11111111',
                '11111111',  '        ',
            ]);
            animation.scroll(list, 800);
            clock.tick(100 + 400);
            driver.write.lastCall.args[0].should.eql(bitmap.matrix([
                '    1111',
                '1111    ',
                '    1111',
                '1111    ',
                '    1111',
                '1111    ',
                '    1111',
                '1111    ',
            ]));
        });
        
    });

});
