<?php

namespace Yoast\WP\SEO\Surfaces;

use YoastSEO_Vendor\Symfony\Component\***REMOVED***\***REMOVED***;

/**
 * Class Classes_Surface.
 *
 * Surface for the indexables.
 */
class Classes_Surface {

	/**
	 * The dependency injection container.
	 *
	 * @var ***REMOVED***
	 */
	public $container;

	/**
	 * Loader constructor.
	 *
	 * @param ***REMOVED*** $container The dependency injection container.
	 */
	public function __construct( ***REMOVED*** $container ) {
		$this->container = $container;
	}

	/**
	 * Returns the instance of a class. Handy for unhooking things.
	 *
	 * @param string $class_name The class to get the instance of.
	 *
	 * @return mixed The instance of the class.
	 */
	public function get( $class_name ) {
		return $this->container->get( $class_name );
	}
}
