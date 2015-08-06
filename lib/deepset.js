'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	partial = require( './partial.js' );


// MGF //

/**
* FUNCTION: mgf( arr, k, lambda, path[, sep] )
*	Evaluates the moment-generating function (MGF) for a Erlang distribution with shape parameter `k` and rate parameter `lambda` for each array element and sets the input array.
*
* @param {Array} arr - input array
* @param {Number} k - shape parameter
* @param {Number} lambda - rate parameter
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function mgf( x, k, lambda, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		fcn,
		v, i;
	if ( arguments.length > 4 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		fcn = partial( k, lambda );
		for ( i = 0; i < len; i++ ) {
			v = dget( x[ i ] );
			if ( typeof v === 'number' ) {
				dset( x[i], fcn( v ) );
			} else {
				dset( x[i], NaN );
			}
		}
	}
	return x;
} // end FUNCTION mgf()


// EXPORTS //

module.exports = mgf;
