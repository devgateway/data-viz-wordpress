<?php
/**
 * WHIP libary file.
 *
 * @package Yoast\WHIP
 */

/**
 * Class ***REMOVED***.
 */
class Whip_InvalidOperatorType extends Exception {

	/**
	 * ***REMOVED*** constructor.
	 *
	 * @param string   $value          Invalid operator.
	 * @param string[] $***REMOVED*** Valid operators.
	 */
	public function __construct( $value, $***REMOVED*** = array( '=', '==', '===', '<', '>', '<=', '>=' ) ) {
		parent::__construct(
			sprintf(
				'Invalid operator of %s used. Please use one of the following operators: %s',
				$value,
				implode( ', ', $***REMOVED*** )
			)
		);
	}
}
