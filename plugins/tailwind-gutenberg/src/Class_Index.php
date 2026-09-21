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

	/**
	 * Full rescan and prune, unlike the additive save_post merge: replaces
	 * the stored index outright with only the classes currently found in
	 * content, including reusable blocks/patterns (wp_block).
	 */
	public static function rebuild(): int {
		$post_types = array_values(
			array_unique(
				array_merge( get_post_types( array( 'public' => true ) ), array( 'wp_block' ) )
			)
		);

		$query = new \WP_Query(
			array(
				'post_type'      => $post_types,
				'post_status'    => 'any',
				'posts_per_page' => -1,
				'fields'         => 'ids',
				'no_found_rows'  => true,
			)
		);

		$classes = array();

		foreach ( $query->posts as $post_id ) {
			$post = get_post( $post_id );

			if ( $post ) {
				foreach ( self::collect_classes_from_content( $post->post_content ) as $class ) {
					$classes[] = $class;
				}
			}
		}

		$classes = array_values( array_unique( $classes ) );

		update_option( self::OPTION_NAME, $classes, false );

		return count( $classes );
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
