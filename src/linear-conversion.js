/*jshint node:true */

'use strict';

var lcFactory = require('linear-converter');

module.exports = function factory(adapter) {
  var lc = lcFactory(adapter);

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
    return lc.convert(x, this.getConversion());
  };

  proto.invert = function invert() {
    return new LinearConversion(lc.invertPreset(this.getConversion()));
  };

  proto.compose = function compose(linearConversions) {
    var presets = getConversions([this].concat(linearConversions));

    return new LinearConversion(lc.composePresets(presets));
  };

  proto.getCoefficientA = function getCoefficientA() {
    return lc.getCoefficientA(this.getConversion());
  };

  proto.getCoefficientB = function getCoefficientB() {
    return lc.getCoefficientB(this.getConversion());
  };

  proto.equates = function equates(linearConversions) {
    var presets = getConversions([this].concat(linearConversions));

    return lc.equivalentPresets(presets);
  };

  proto.valueOf = proto.toJSON = function toString() {
    return this.getConversion();
  };

  proto.toString = function toString() {
    return this.getConversion().toString();
  };

  return LinearConversion;
}

function getConversion(linearConversion) {
  return linearConversion.getConversion();
}

function getConversions(linearConversions) {
  return linearConversions.map(getConversion);
}
