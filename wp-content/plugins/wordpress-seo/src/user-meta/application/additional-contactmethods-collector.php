<?php

namespace Yoast\WP\SEO\User_Meta\Application;

use Yoast\WP\SEO\User_Meta\Domain\Additional_Contactmethod_Interface;

/**
 * The collector to get additional ***REMOVED***.
 *
 * @makePublic
 */
class Additional_Contactmethods_Collector {

	/**
	 * All additional ***REMOVED***.
	 *
	 * @var array<Additional_Contactmethod_Interface>
	 */
	private $additional_contactmethods;

	/**
	 * The constructor.
	 *
	 * @param Additional_Contactmethod_Interface ...$additional_contactmethods All additional ***REMOVED***.
	 */
	public function __construct( Additional_Contactmethod_Interface ...$additional_contactmethods ) {
		$this->additional_contactmethods = $additional_contactmethods;
	}

	/**
	 * Returns all the additional ***REMOVED***.
	 *
	 * @return array<Additional_Contactmethod_Interface> All the additional ***REMOVED***.
	 */
	public function get_additional_contactmethods(): array {
		$additional_contactmethods = $this->additional_contactmethods;

		/**
		 * Filter: Adds the possibility to add more additional ***REMOVED*** in the user profile.
		 *
		 * @param array<Additional_Contactmethod_Interface> $additional_contactmethods Array with additional contact method classes.
		 */
		return \apply_filters( 'wpseo_additional_contactmethods', $additional_contactmethods );
	}

	/**
	 * Returns the additional ***REMOVED*** key/value pairs.
	 *
	 * @return array<string, string> The additional ***REMOVED*** key/value pairs.
	 */
	public function get_additional_contactmethods_objects(): array {
		$additional_contactmethods_objects = [];
		$additional_contactmethods         = $this->get_additional_contactmethods();

		foreach ( $additional_contactmethods as $additional_contactmethod ) {
			$additional_contactmethods_objects[ $additional_contactmethod->get_key() ] = $additional_contactmethod->get_label();
		}

		return $additional_contactmethods_objects;
	}

	/**
	 * Returns the additional ***REMOVED*** keys.
	 *
	 * @return array<string> The additional ***REMOVED*** keys.
	 */
	public function get_additional_contactmethods_keys(): array {
		$additional_contactmethods_keys = [];
		$additional_contactmethods      = $this->get_additional_contactmethods();

		foreach ( $additional_contactmethods as $additional_contactmethod ) {
			$additional_contactmethods_keys[] = $additional_contactmethod->get_key();
		}

		return $additional_contactmethods_keys;
	}
}
