# linear-conversion

[![Build Status](https://travis-ci.org/javiercejudo/linear-conversion.svg)](https://travis-ci.org/javiercejudo/linear-conversion)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/linear-conversion/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/linear-conversion?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/linear-conversion/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/linear-conversion)

Linear conversion class for *[linear-converter](https://github.com/javiercejudo/linear-converter)*

## Install

    npm i linear-conversion

## Basic usage

```js
var temp = require('linear-presets').PRESETS.temperature;
var LinearConversion = require('linear-conversion')(require('floating-adapter'));

var celsiusToFahrenheit = new LinearConversion(temp.celsiusToFahrenheit);

celsiusToFahrenheit.convert(25); // => 77
```

See [CodePen example](http://codepen.io/javiercejudo/pen/bdoBvW?editors=101) for a quick interactive intro.

## Conversion inversion

```js
var fahrenheitToCelsius = celsiusToFahrenheit.invert();

fahrenheitToCelsius.convert(77); // => 25
```

## Conversion composition

```js
var celsiusToKelvin = new LinearConversion(temp.celsiusToKelvin);
var kelvinToFahrenheit = celsiusToKelvin.invert().compose([celsiusToFahrenheit]);

kelvinToFahrenheit.convert(293.15); // => 68
```

## Custom conversions

Custom conversions are easily achieved by passing an array with 2 scales, each
of those an array with 2 values. For example, **[[0, 1], [0, 2]]** means that 0 and
1 in the first scale map to 0 and 2 in the second scale respectively; in short,
it multiplies by 2. Any linear conversion can be described that way:

```js
// f(x) = ax + b
(new LinearConversion([[0, 1], [b, a+b]])).convert(x); // => ax + b
(new LinearConversion([[1/a, -b/a], [b+1, 0]])).convert(x); // => ax + b
```

For an arbitrary f(_x_) = _ax + b_, any [[_x<sub>1</sub>_, _x<sub>2</sub>_], [f(_x<sub>1</sub>_), f(_x<sub>2</sub>_)]] is a valid preset.

More examples:

```js
// degrees to radians
(new LinearConversion([[0, 180], [0, Math.PI]])).convert(240); // => 4 * Math.PI / 3

// f(x) = 3x
(new LinearConversion([[0, 1/3], [0, 1]])).convert(5); // => 15

// f(x) = -2x - 46
(new LinearConversion([[0, 1], [-46, -48]])).convert(-23); // => 0
```

## Coefficients

Creating presets from a given function is trivial; to find the function from a given preset, two methods are provided: `getCoefficientA` and `getCoefficientB`.

```js
// f(x) = 2x + 1
var doublePlus1 = new LinearConversion([[0, 1], [1, 3]]);

doublePlus1.getCoefficientA(); // => 2
doublePlus1.getCoefficientB(); // => 1

// f(x) = ax + b
var timesAPlusB = new LinearConversion([[x1, x2], [f(x1), f(x2)]]);

timesAPlusB.getCoefficientA(); // => a
timesAPlusB.getCoefficientB(); // => b
```

## Preset equivalence

```js
var eq = new LinearConversion([[1, 5], [3, -9]]);

eq.equates([ // all f(x) = -3 * (x - 2)
  new LinearConversion([[0, 2], [6, 0]]),
  new LinearConversion([[-1, 100], [9, -294]])
]); // => true

var notEq = new LinearConversion([[0, 1], [0, 2]]); // f(x) = 2x

eq.equates([
  new LinearConversion([[0, 1], [0, 3]]) // f(x) = 3x
]); // => false
```

## Arbitrary precision

Arbitrary precision support is provided via [linear-arbitrary-precision](https://github.com/javiercejudo/linear-arbitrary-precision).
See [all available adapters](https://www.npmjs.com/browse/keyword/linear-arbitrary-precision-adapter).

```js
var doublePlusPoint1 = new LinearConversion([[0, 0.1], [0.1, 0.3]]);

// without arbitrary precision adapters
doublePlusPoint1.getCoefficientA(); // => 1.9999999999999998

// with arbitrary precision adapters
doublePlusPoint1.getCoefficientA(); // => 2
```

See [CodePen example](http://codepen.io/javiercejudo/pen/yNEoWq?editors=101).

## See more

- [tests](test/spec.js)
- [all presets](https://github.com/javiercejudo/linear-presets#presets)

## Related projects

- [linear-converter](https://github.com/javiercejudo/linear-converter): flexible linear converter with built in conversions for common units.
- [rescale](https://github.com/javiercejudo/rescale): rescales a point given two scales.
- [scale](https://github.com/javiercejudo/scale): scales normalised data.
- [normalise](https://github.com/javiercejudo/normalise): normalise data to [0, 1].
- [rescale-util](https://github.com/javiercejudo/rescale-util): rescale utilities.
