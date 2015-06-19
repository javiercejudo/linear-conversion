/*jshint node:true */

'use strict';

var lc = require('linear-converter');

module.exports = LinearConversion;

function LinearConversion(conversion) {
  this.getConversion = function getConversion() {
    return conversion;
  };
}

var proto = LinearConversion.prototype;

proto.convert = function convert(x) {
  return lc.convert(x, this.getConversion());
};

proto.invert = function invert() {
  return new LinearConversion(lc.invertPreset(this.getConversion()));
};

proto.compose = function compose(linearConversions) {
  var presets = [this.getConversion()].concat(
    linearConversions.map(function(linearConversion) {
      return linearConversion.getConversion();
    })
  );

  return new LinearConversion(lc.composePresets(presets));
};

proto.getCoefficientA = function getCoefficientA() {
  return lc.getCoefficientA(this.getConversion());
};

proto.getCoefficientB = function getCoefficientB() {
  return lc.getCoefficientB(this.getConversion());
};

proto.toString = function toString() {
  return this.getConversion().toString();
};
