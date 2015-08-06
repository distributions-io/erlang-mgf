'use strict';

// FUNCTIONS //

var pow = Math.pow;


// PARTIAL //

/**
* FUNCTION: partial( k, lambda )
*	Partially applies shape parameter `k` and rate parameter `lambda` and returns a function for evaluating the moment-generating function (MGF) for a Erlang distribution.
*
* @param {Number} k - shape parameter
* @param {Number} lambda - rate parameter
* @returns {Function} MGF
*/
function partial( k, lambda ) {

	/**
	* FUNCTION: mgf( t )
	*	Evaluates the moment-generating function (MGF) for a Erlang distribution.
	*
	* @private
	* @param {Number} t - input value
	* @returns {Number} evaluated MGF
	*/
	return function mgf( t ) {
		if ( t < lambda ) {
			return pow( 1 - t/lambda, -k );
		} else {
			return NaN;
		}
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
