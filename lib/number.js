'use strict';

// FUNCTIONS //

var pow = Math.pow;


// MGF //

/**
* FUNCTION: mgf( x, k, lambda )
*	Evaluates the moment-generating function (MGF) for a Erlang distribution with shape parameter `k` and rate parameter `lambda` at a value `t`.
*
* @param {Number} t - input value
* @param {Number} k - shape parameter
* @param {Number} lambda - rate parameter
* @returns {Number} evaluated MGF
*/
function mgf( t, k, lambda ) {
	if ( t < lambda ) {
		return pow( 1 - t/lambda, -k );
	} else {
		return NaN;
	}
} // end FUNCTION mgf()


// EXPORTS //

module.exports = mgf;
