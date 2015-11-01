/*jshint node:true */

'use strict';

var lcFactory = require('linear-converter');

module.exports = function factory(Decimal) {
  var lc = lcFactory(Decimal);

  function LinearConversion(conversion) {
    this.getConversion = function getConversion() {
      return conversion;
    };
  }

  LinearConversion.reviver = function(key, x) {
    return new LinearConversion(x);
  };

  var proto = LinearConversion.prototype;

  proto.convert = function convert(x) {
    return lc.convert(this.getConversion(), x);
  };

  proto.invert = function invert() {
    return new LinearConversion(lc.invertConversion(this.getConversion()));
  };

  proto.compose = function compose(linearConversion) {
    var composition = lc.composeConversions(this.getConversion(), linearConversion.getConversion());

    return new LinearConversion(composition);
  };

  proto.getCoefficientA = function getCoefficientA() {
    return lc.getCoefficientA(this.getConversion());
  };

  proto.getCoefficientB = function getCoefficientB() {
    return lc.getCoefficientB(this.getConversion());
  };

  proto.equates = function equates(linearConversion) {
    return lc.equivalentConversions(this.getConversion(), linearConversion.getConversion());
  };

  proto.valueOf = proto.toJSON = function valueOf() {
    return this.getConversion();
  };

  proto.toString = function toString() {
    return this.getConversion().toString();
  };

  return LinearConversion;
};
