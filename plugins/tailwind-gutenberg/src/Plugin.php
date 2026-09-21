<?php

namespace Twg;

defined( 'ABSPATH' ) || exit;

class Plugin {

	public static function init(): void {
		add_action( 'init', array( self::class, 'load_textdomain' ) );
		add_action( 'enqueue_block_editor_assets', array( self::class, 'enqueue_editor_assets' ) );

		Class_Index::init();
		Rest::init();
		Render::init();
		Settings_Page::init();
	}

	public static function load_textdomain(): void {
		load_plugin_textdomain(
			'tailwind-gutenberg',
			false,
			dirname( plugin_basename( TWG_PLUGIN_FILE ) ) . '/languages'
		);
	}

	public static function enqueue_editor_assets(): void {
		$settings = Settings_Page::get();

		if ( self::enqueue_script_from_asset( 'twg-editor', 'editor' ) ) {
			wp_set_script_translations( 'twg-editor', 'tailwind-gutenberg', TWG_PLUGIN_DIR . 'languages' );

			wp_localize_script(
				'twg-editor',
				'twgEditorData',
				array(
					// Loaded via `new Worker()`, not wp_enqueue_script(), so
					// only its URL is needed here, not a registered handle.
					'workerUrl'     => plugins_url( 'build/worker.js', TWG_PLUGIN_FILE ),
					'classIndexUrl' => plugins_url( 'assets/class-index.json', TWG_PLUGIN_FILE ),
					'suggestLimit'  => $settings['suggest_limit'],
				)
			);
		}

		if ( self::enqueue_script_from_asset( 'twg-canvas', 'canvas' ) ) {
			wp_localize_script(
				'twg-canvas',
				'twgCanvasData',
				array(
					'tailwindBrowserUrl' => plugins_url( 'build/tailwindcss-browser.js', TWG_PLUGIN_FILE ),
					'themeCss'           => $settings['theme_css'],
					'preflight'          => $settings['preflight'],
					'safelist'           => Settings_Page::get_safelist_classes(),
				)
			);
		}
	}

	private static function enqueue_script_from_asset( string $handle, string $entry ): bool {
		$asset_path = TWG_PLUGIN_DIR . "build/{$entry}.asset.php";

		if ( ! file_exists( $asset_path ) ) {
			return false;
		}

		$asset = include $asset_path;

		wp_register_script(
			$handle,
			plugins_url( "build/{$entry}.js", TWG_PLUGIN_FILE ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_enqueue_script( $handle );

		return true;
	}
}
