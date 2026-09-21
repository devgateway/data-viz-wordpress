<?php

namespace Twg;

defined( 'ABSPATH' ) || exit;

class Class_Index {

	const OPTION_NAME = 'twg_class_index';

	public static function init(): void {
		add_action( 'save_post', array( self::class, 'handle_save_post' ) );
	}

	public static function handle_save_post( int $post_id ): void {
		if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
			return;
		}

		$post = get_post( $post_id );

		if ( ! $post ) {
			return;
		}

		$found = self::collect_classes_from_content( $post->post_content );

		if ( ! empty( $found ) ) {
			self::merge( $found );
		}
	}

	public static function collect_classes_from_content( string $content ): array {
		$classes = array();

		foreach ( parse_blocks( $content ) as $block ) {
			self::collect_from_block( $block, $classes );
		}

		return array_values( array_unique( $classes ) );
	}

	public static function get(): array {
		return get_option( self::OPTION_NAME, array() );
	}

	private static function collect_from_block( array $block, array &$classes ): void {
		if ( ! empty( $block['attrs']['twgClasses'] ) && is_string( $block['attrs']['twgClasses'] ) ) {
			foreach ( preg_split( '/\s+/', trim( $block['attrs']['twgClasses'] ) ) as $class ) {
				if ( '' !== $class ) {
					$classes[] = $class;
				}
			}
		}

		if ( ! empty( $block['innerBlocks'] ) ) {
			foreach ( $block['innerBlocks'] as $inner_block ) {
				self::collect_from_block( $inner_block, $classes );
			}
		}
	}

	private static function merge( array $classes ): void {
		$existing = self::get();
		$merged   = array_values( array_unique( array_merge( $existing, $classes ) ) );

		if ( $merged !== $existing ) {
			update_option( self::OPTION_NAME, $merged, false );
		}
	}
}
