/*jshint node:true, mocha:true */

'use strict';

require('should');

var Decimal = require('arbitrary-precision')(require('floating-adapter'));
var LinearConversion = require('../src/linear-conversion')(Decimal);

describe('LinearConversion', function() {
  it('Just Works™', function() {
    var double = new LinearConversion([[0, 1], [0, 2]]);

    double.convert(50).val().val().should.be.exactly(100);
    double.invert().convert(100).val().val().should.be.exactly(50);
    double.convert(50).val().val().should.be.exactly(100);


    var fourthMinus2 = new LinearConversion([[0, 4], [-2, -1]]);

    fourthMinus2.convert(100).val().val().should.be.exactly(23);
    fourthMinus2.invert().convert(23).val().val().should.be.exactly(100);

    fourthMinus2.getCoefficientA().val().val().should.be.exactly(1/4);
    fourthMinus2.getCoefficientB().val().val().should.be.exactly(-2);


    var halfMinus4 = fourthMinus2.compose(double);

    halfMinus4.convert(100).val().val().should.be.exactly(46);

    halfMinus4.toString().should.be.exactly([[0,4], [-4,-2]].toString());

    JSON.stringify(halfMinus4).should.be.exactly('[["0","4"],["-4","-2"]]');
    JSON.parse('[[0,4],[-4,-2]]', LinearConversion.reviver).should.eql(halfMinus4);


    var plus1 = new LinearConversion([[0, -1], [1, 0]]);

    plus1.compose(plus1).compose(plus1).convert(50).val().val().should.be.exactly(53);


    var timesMinus3 = new LinearConversion([[0, 1], [0, -3]]);

    timesMinus3.compose(timesMinus3).convert(1).val().val().should.be.exactly(9);
    timesMinus3.compose(timesMinus3).compose(timesMinus3).convert(1).val().val()
      .should.be.exactly(-27);


    var eq = new LinearConversion([[1, 5], [3, -9]]);

    eq.equates(
      new LinearConversion([[-1, 100], [9, -294]])
    ).should.be.exactly(true);

    var notEq = new LinearConversion([[0, 1], [0, 2]]);

    eq.equates(
      new LinearConversion([[0, 1], [0, 3]])
    ).should.be.exactly(false);
  });
});
