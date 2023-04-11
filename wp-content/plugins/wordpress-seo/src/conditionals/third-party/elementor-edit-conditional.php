<?php

namespace Yoast\WP\SEO\Conditionals\Third_Party;

use Yoast\WP\SEO\Conditionals\Conditional;

/**
 * Conditional that is only met when on an Elementor edit page or when the current
 * request is an ajax request for saving our post meta data.
 */
class Elementor_Edit_Conditional implements Conditional {

	/**
	 * Returns whether this conditional is met.
	 *
	 * @return bool Whether the conditional is met.
	 */
	public function is_met() {
		global $pagenow;

		// phpcs:ignore WordPress.Security.***REMOVED***.Recommended -- Reason: We are not processing form information.
		if ( isset( $_GET['action'] ) && \is_string( $_GET['action'] ) ) {
			// phpcs:ignore WordPress.Security.***REMOVED***.Recommended, WordPress.Security.ValidatedSanitizedInput.***REMOVED*** -- Reason: We are not processing form information, We are only strictly comparing.
			$get_action = \wp_unslash( $_GET['action'] );
			if ( $pagenow === 'post.php' && $get_action === 'elementor' ) {
				return true;
			}
		}

		// phpcs:ignore WordPress.Security.***REMOVED***.Missing -- Reason: We are not processing form information.
		if ( isset( $_POST['action'] ) && \is_string( $_POST['action'] ) ) {
			// phpcs:ignore WordPress.Security.***REMOVED***.Missing, WordPress.Security.ValidatedSanitizedInput.***REMOVED*** -- Reason: We are not processing form information, We are only strictly comparing.
			$post_action = \wp_unslash( $_POST['action'] );
			return \wp_doing_ajax() && $post_action === 'wpseo_elementor_save';
		}

		return false;
	}
}
