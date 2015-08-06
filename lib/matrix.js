'use strict';

// MODULES //

var partial = require( './partial.js' );


// MGF //

/**
* FUNCTION: mgf( out, matrix, k, lambda )
*	Evaluates the moment-generating function (MGF) for a Erlang distribution with shape parameter `k` and rate parameter `lambda` for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @param {Number} k - shape parameter
* @param {Number} lambda - rate parameter
* @returns {Matrix} output matrix
*/
function mgf( y, x, k, lambda ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'mgf()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( k, lambda );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION mgf()


// EXPORTS //

module.exports = mgf;
