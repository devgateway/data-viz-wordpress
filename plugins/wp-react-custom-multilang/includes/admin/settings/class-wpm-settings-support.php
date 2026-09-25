<?php
/**
 * WP Multilang Support Settings
 *
 * @category    Admin
 * @package     WPM/Admin
 * @author   Valentyn Riaboshtan
 */

namespace WPM\Includes\Admin\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * WPM_Settings_Support.
 */
class WPM_Settings_Support extends WPM_Settings_Page {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->id    = 'support';
		$this->label = esc_html__( 'Help & Support', 'wp-multilang' );

		parent::__construct();
	}

	/**
	 * Output the settings.
	 */
	public function output() {
		$GLOBALS['hide_save_button'] = true;
	}
}
