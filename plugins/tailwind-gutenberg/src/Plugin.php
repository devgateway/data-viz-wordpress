<?php

namespace Twg;

defined( 'ABSPATH' ) || exit;

class Plugin {

	public static function init(): void {
		add_action( 'enqueue_block_editor_assets', array( self::class, 'enqueue_editor_assets' ) );
	}

	public static function enqueue_editor_assets(): void {
		$asset_path = TWG_PLUGIN_DIR . 'build/editor.asset.php';

		if ( ! file_exists( $asset_path ) ) {
			return;
		}

		$asset = include $asset_path;

		wp_register_script(
			'twg-editor',
			plugins_url( 'build/editor.js', TWG_PLUGIN_FILE ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_enqueue_script( 'twg-editor' );
	}
}
