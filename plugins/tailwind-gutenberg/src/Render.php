<?php

namespace Twg;

defined( 'ABSPATH' ) || exit;

/**
 * Applies twgClasses to dynamic blocks' server-rendered markup (Query Loop,
 * Navigation, third-party render_callback blocks, ...). Static blocks
 * already have their classes baked in at save time via the JS
 * blocks.getSaveContent.extraProps filter, so this skips any block type it
 * can confirm isn't dynamic to avoid redundant work on every page load.
 */
class Render {

	public static function init(): void {
		add_filter( 'render_block', array( self::class, 'apply_classes' ), 10, 2 );
	}

	public static function apply_classes( string $block_content, array $block ): string {
		$classes = $block['attrs']['twgClasses'] ?? '';

		if ( ! is_string( $classes ) || '' === trim( $classes ) || '' === trim( $block_content ) ) {
			return $block_content;
		}

		$block_type = \WP_Block_Type_Registry::get_instance()->get_registered( $block['blockName'] ?? '' );

		if ( $block_type && ! $block_type->is_dynamic() ) {
			return $block_content;
		}

		$tags = new \WP_HTML_Tag_Processor( $block_content );

		if ( ! $tags->next_tag() ) {
			return $block_content;
		}

		foreach ( preg_split( '/\s+/', trim( $classes ) ) as $class ) {
			if ( '' !== $class ) {
				$tags->add_class( $class );
			}
		}

		return $tags->get_updated_html();
	}
}
