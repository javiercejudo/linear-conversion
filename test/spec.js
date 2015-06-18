/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var LinearConversion = require('../src/linear-conversion');

describe('LinearConversion', function() {
  it('Just Works™', function() {
    var double;

    double = new LinearConversion([[0, 1], [0, 2]]);

    double.convert(50).should.be.exactly(100);
    double.invert().convert(100).should.be.exactly(50);
    double.convert(50).should.be.exactly(100);


    var fourthMinus2;

    fourthMinus2 = new LinearConversion([[0, 4], [-2, -1]]);

    fourthMinus2.convert(100).should.be.exactly(23);
    fourthMinus2.invert().convert(23).should.be.exactly(100);

    fourthMinus2.getCoefficientA().should.be.exactly(1/4);
    fourthMinus2.getCoefficientB().should.be.exactly(-2);


    var halfMinus4 = fourthMinus2.compose([double]);

    halfMinus4.convert(100).should.be.exactly(46);
    halfMinus4.toString().should.equal('0,4,-4,-2');


    var plus1 = new LinearConversion([[0, -1], [1, 0]]);

    plus1.compose([plus1, plus1]).convert(50).should.be.exactly(53);


    var timesMinus3 = new LinearConversion([[0, 1], [0, -3]]);

    timesMinus3.compose([timesMinus3]).convert(1).should.be.exactly(9);

    timesMinus3.compose([timesMinus3, timesMinus3]).convert(1)
      .should.be.exactly(-27);
  });
});
