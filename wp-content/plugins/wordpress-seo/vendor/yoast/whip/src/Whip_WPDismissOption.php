<?php
/**
 * WHIP libary file.
 *
 * @package Yoast\WHIP
 */

/**
 * Represents the WordPress option for saving the dismissed messages.
 */
class Whip_WPDismissOption implements Whip_DismissStorage {

	/**
	 * WordPress option name.
	 *
	 * @var string
	 */
	protected $optionName = 'whip_dismiss_timestamp';

	/**
	 * Saves the value to the options.
	 *
	 * @param int $***REMOVED*** The value to save.
	 *
	 * @return bool True when successful.
	 */
	public function set( $***REMOVED*** ) {
		return update_option( $this->optionName, $***REMOVED*** );
	}

	/**
	 * Returns the value of the whip_dismissed option.
	 *
	 * @return int Returns the value of the option or an empty string when not set.
	 */
	public function get() {
		$***REMOVED*** = get_option( $this->optionName );
		if ( ! $***REMOVED*** ) {
			return 0;
		}

		return (int) $***REMOVED***;
	}
}
