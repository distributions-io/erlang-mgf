Moment-Generating Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Erlang](https://en.wikipedia.org/wiki/Erlang_distribution) distribution moment-generating function (MGF).

The [moment-generating function](https://en.wikipedia.org/wiki/Moment-generating_function) for an [Erlang](https://en.wikipedia.org/wiki/Erlang_distribution) random variable is

<div class="equation" align="center" data-raw-text="
	M_X(t) := \mathbb{E}\!\left[e^{tX}\right] =  \left(1 \,-\, \frac{t}{\lambda}\right)^{-k}" data-equation="eq:mgf_function">
	<img src="https://cdn.rawgit.com/distributions-io/erlang-mgf/8c2a16c2975c84a741aa66a18145a65f1d07c017/docs/img/eqn.svg" alt="Moment-generating function (MGF) for a Erlang distribution.">
	<br>
</div>

for `t < lambda`, where the non-negative integer `k` is the shape parameter and `lambda > 0 ` is the rate parameter of the distribution. In the case that `t >= lambda`, the MGF is not defined and this module returns `NaN`.

## Installation

``` bash
$ npm install distributions-erlang-mgf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var mgf = require( 'distributions-erlang-mgf' );
```

#### mgf( t[, options] )

Evaluates the [moment-generating function](https://en.wikipedia.org/wiki/Moment-generating_function) (MGF) for the [Erlang](https://en.wikipedia.org/wiki/Erlang_distribution) distribution. `t` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	t,
	i;

out = mgf( 1 );
// returns NaN

out = mgf( -1 );
// returns 0.5

t = [ -1, -0.5, 0, 0.5, 1 ];
out = mgf( t );
// returns [ 0.5, ~0.667, 1, 2, NaN ]

t = new Float32Array( t );
out = mgf( t );
// returns Float64Array( [0.5,~0.667,1,2,NaN] )

t = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	t[ i ] = i * 0.25;
}
mat = matrix( t, [3,2], 'float32' );
/*
	[ 0    0.25
	  0.5  0.75
	  1    1.25 ]
*/

out = mgf( mat );
/*
	[ 1   1.333
	  2   4
	  NaN NaN  ]
*/
```

The function accepts the following `options`:

*	__k__: shape parameter. Default: `1`.
*	__lambda__: rate parameter. Default: `1`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

An [Erlang](https://en.wikipedia.org/wiki/Erlang_distribution) distribution is a function of two parameters: `k`(shape parameter) and `lambda`(rate parameter). By default, `k` is equal to `1` and `lambda` is equal to `1`. To adjust either parameter, set the corresponding option.

``` javascript
var t = [ 0, 0.5, 1, 1.5, 2, 2.5 ];

var out = mgf( t, {
	'k': 6,
	'lambda': 8
});
// returns [ 1, ~1.473, ~2.228, ~3.476, ~5.619, ~9.47 ]
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,0],
	[1,0.25],
	[2,0.5],
	[3,0.75],
	[4,1],
	[5,1.25]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = mgf( data, {
	'accessor': getValue
});
// returns [ 1, ~1.333, 2, 4, NaN, NaN ]
```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,0.25]},
	{'x':[2,0.5]},
	{'x':[3,0.75]},
	{'x':[4,1]},
	{'x':[5,1.25]}
];

var out = mgf( data, {
	'path': 'x/1',
	'sep': '/'
});
/*
	[
		{'x':[0,1]},
		{'x':[1,~1.333]},
		{'x':[2,2]},
		{'x':[3,4]},
		{'x':[4,NaN]},
		{'x':[5,NaN]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var t, out;

t = new Float32Array( [0,0.1,0.2,0.3,0.4] );

out = mgf( t, {
	'dtype': 'int32'
});
// returns Int32Array( [1,1,1,1,1] )

// Works for plain arrays, as well...
out = mgf( [0,0.1,0.2,0.3,0.4], {
	'dtype': 'uint8'
});
// returns Uint8Array( [1,1,1,1,1] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	t,
	i;

t = [ -1, -0.5, 0, 0.5, 1 ];

out = mgf( t, {
	'copy': false
});
// returns [ 0.5, ~0.667, 1, 2, NaN ]

bool = ( t === out );
// returns true

t = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	t[ i ] = i * 0.25;
}
mat = matrix( t, [3,2], 'float32' );
/*
	[ 0    0.25
	  0.5  0.75
	  1    1.25 ]
*/

out = mgf( mat, {
	'copy': false
});
/*
	[ 1   1.333
	  2   4
	  NaN NaN  ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [MGF](https://en.wikipedia.org/wiki/Erlang_distribution) is `NaN`.

	``` javascript
	var data, out;

	out = mgf( null );
	// returns NaN

	out = mgf( true );
	// returns NaN

	out = mgf( {'a':'b'} );
	// returns NaN

	out = mgf( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = mgf( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = mgf( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = mgf( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var mgf = require( 'distributions-erlang-mgf' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i / 10;
}
out = mgf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = mgf( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = mgf( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i / 10;
}
out = mgf( data );

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = mgf( mat );

// Matrices (custom output data type)...
out = mgf( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-erlang-mgf.svg
[npm-url]: https://npmjs.org/package/distributions-erlang-mgf

[travis-image]: http://img.shields.io/travis/distributions-io/erlang-mgf/master.svg
[travis-url]: https://travis-ci.org/distributions-io/erlang-mgf

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/erlang-mgf/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/erlang-mgf?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/erlang-mgf.svg
[dependencies-url]: https://david-dm.org/distributions-io/erlang-mgf

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/erlang-mgf.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/erlang-mgf

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/erlang-mgf.svg
[github-issues-url]: https://github.com/distributions-io/erlang-mgf/issues
