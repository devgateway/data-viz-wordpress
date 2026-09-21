<?php

namespace Twg;

defined( 'ABSPATH' ) || exit;

class Plugin {

	public static function init(): void {
		add_action( 'init', array( self::class, 'load_textdomain' ) );
		add_action( 'enqueue_block_editor_assets', array( self::class, 'enqueue_editor_assets' ) );
		add_action( 'wp_enqueue_scripts', array( self::class, 'enqueue_frontend_assets' ) );

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
			// Each editor session's compiler only ever sees the classes on
			// screen in that one canvas, but the uploaded CSS becomes the
			// SITE-WIDE stylesheet (one file, one twg_current_css). Without
			// feeding the full site-wide index in here too, saving post B
			// would upload a stylesheet containing only post B's classes,
			// silently breaking every other post's styling.
			$safelist = array_values(
				array_unique(
					array_merge( Class_Index::get(), Settings_Page::get_safelist_classes() )
				)
			);

			wp_localize_script(
				'twg-canvas',
				'twgCanvasData',
				array(
					'tailwindBrowserUrl' => plugins_url( 'build/tailwindcss-browser.js', TWG_PLUGIN_FILE ),
					'themeCss'           => $settings['theme_css'],
					'preflight'          => $settings['preflight'],
					'safelist'           => $safelist,
				)
			);
		}
	}

	/**
	 * Attaches the compiled stylesheet to a normal WordPress-rendered page
	 * (block editor "Preview", or any non-headless use of this site).
	 * The REST route (Twg\Rest::get_css) covers the headless case, where
	 * a separate frontend app fetches the URL and links to it itself -
	 * this is what makes the same file work when WordPress renders the
	 * page directly instead.
	 */
	public static function enqueue_frontend_assets(): void {
		$settings = Settings_Page::get();

		if ( 'local' !== $settings['frontend_mode'] || ! $settings['load_on_frontend'] ) {
			return;
		}

		$current_css = Compiler::get_current();

		if ( empty( $current_css['url'] ) ) {
			return;
		}

		// No `ver` query string: the filename itself is content-hashed, so
		// this keeps the "changing content changes the URL" caching model
		// intact instead of adding a redundant cache-busting param.
		wp_enqueue_style( 'twg-frontend', $current_css['url'], array(), null );
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
