<?php

namespace Yoast\WP\SEO\Conditionals\Third_Party;

use Yoast\WP\SEO\Conditionals\Conditional;

/**
 * Conditional that is met when the WordProof Timestamp plugin is inactive.
 *
 * @deprecated 22.10
 * @***REMOVED***
 */
class Wordproof_Plugin_Inactive_Conditional implements Conditional {

	/**
	 * Returns whether or not the WordProof Timestamp plugin is active.
	 *
	 * @deprecated 22.10
	 * @***REMOVED***
	 *
	 * @return bool Whether or not the WordProof Timestamp plugin is active.
	 */
	public function is_met() {
		\_deprecated_function( __METHOD__, 'Yoast SEO 22.10' );

		return ! \defined( 'WORDPROOF_VERSION' );
	}
}
