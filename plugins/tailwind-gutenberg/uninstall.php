<?php
/**
 * Fires only when a site admin clicks "Delete" for this plugin from the
 * Plugins list (after deactivating it), never on ordinary deactivation.
 * Post content, and the Tailwind classes in it, are never touched here.
 */

defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

require_once __DIR__ . '/vendor/autoload.php';

$settings = get_option( 'twg_settings', array() );

if ( empty( $settings['delete_data_on_uninstall'] ) ) {
	return;
}

delete_option( 'twg_settings' );
delete_option( 'twg_class_index' );
delete_option( 'twg_current_css' );

$upload_dir = wp_upload_dir();
$twg_dir    = trailingslashit( $upload_dir['basedir'] ) . 'twg';

if ( is_dir( $twg_dir ) ) {
	foreach ( glob( trailingslashit( $twg_dir ) . '*.css' ) ?: array() as $file ) {
		wp_delete_file( $file );
	}

	@rmdir( $twg_dir ); // phpcs:ignore WordPress.PHP.NoSilencedErrors -- best-effort; a non-empty or already-gone directory is not an error here.
}
