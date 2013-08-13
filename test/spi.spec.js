var _      = require('underscore');
var should = require('should');
var sinon  = require('sinon');
var spi    = require('../lib/spi');
var gpio   = require('../lib/gpio');

describe('spi', function() {

    beforeEach(function() {
        sinon.stub(gpio, 'write');
    });

    afterEach(function() {
        gpio.write.restore();
    });

    describe('bitbanging bytes on the GPIO pins', function() {

        it ('writes each bits from left to right, surrounded by a CLOCK tick', function() {
            spi.writeByte(bin('10000000'));
            // sending 1
            gpio.write.getCall(0).args.should.eql([spi.pins.CLOCK,   0]);
            gpio.write.getCall(1).args.should.eql([spi.pins.DATA_IN, 1]);
            gpio.write.getCall(2).args.should.eql([spi.pins.CLOCK,   1]);
            // sending 0
            gpio.write.getCall(3).args.should.eql([spi.pins.CLOCK,   0]);
            gpio.write.getCall(4).args.should.eql([spi.pins.DATA_IN, 0]);
            gpio.write.getCall(5).args.should.eql([spi.pins.CLOCK,   1]);
        });

        it ('writes all 8 bits', function() {
            spi.writeByte(bin('10101010'));
            gpio.write.callCount.should.eql(8 * 3);
        });

        it ('doesnt re-write DATA_IN if the value is the same as the last bit', function() {
            spi.writeByte(bin('00000000'));
            // CLOCK CLOCK for all bits, but DATA_IN only for the first one
            gpio.write.callCount.should.eql(8 * 2 + 1);
        });

    });
    
    describe('loading 2 bytes to talk to the driver', function() {

        it ('uses the LOAD pin as a latch surrounding the 2 bytes', function() {
            spi.write(bin('10101010'), bin('10101010'));
            gpio.write.firstCall.args.should.eql([spi.pins.LOAD, 0]);
            gpio.write.lastCall.args.should.eql([spi.pins.LOAD, 1]);
            gpio.write.callCount.should.eql(8 * 3 + 8 * 3 + 2);
        });

    });
    
    function bin(str) {
        return parseInt(str, 2);
    }
    
});
