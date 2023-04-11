<?php

namespace Yoast\WP\SEO\Config;

use YoastSEO_Vendor\WordProof\SDK\Config\***REMOVED***;

/**
 * Class WordProof_App_Config.
 *
 * @package Yoast\WP\SEO\Config
 */
class Wordproof_App_Config extends ***REMOVED*** {

	/**
	 * Returns the partner.
	 *
	 * @return string The partner.
	 */
	public function getPartner() {
		return 'yoast';
	}

	/**
	 * Returns if the WordProof Uikit should be loaded from a cdn.
	 *
	 * @return bool True or false.
	 */
	public function ***REMOVED***() {
		return false;
	}
}
