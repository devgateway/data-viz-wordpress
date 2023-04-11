<?php
/**
 * Block Styles
 *
 * @link https://developer.wordpress.org/reference/functions/register_block_style/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since 1.0.0
 */

if ( function_exists( 'register_block_style' ) ) {
	/**
	 * Register block styles.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function twenty_twenty_one_register_block_styles() {
		// Columns: Overlap.
		register_block_style(
			'core/columns',
			array(
				'name'  => '***REMOVED***-columns-overlap',
				'label' => esc_html__( 'Overlap', '***REMOVED***' ),
			)
		);

		// Cover: Borders.
		register_block_style(
			'core/cover',
			array(
				'name'  => '***REMOVED***-border',
				'label' => esc_html__( 'Borders', '***REMOVED***' ),
			)
		);

		// Group: Borders.
		register_block_style(
			'core/group',
			array(
				'name'  => '***REMOVED***-border',
				'label' => esc_html__( 'Borders', '***REMOVED***' ),
			)
		);

		// Image: Borders.
		register_block_style(
			'core/image',
			array(
				'name'  => '***REMOVED***-border',
				'label' => esc_html__( 'Borders', '***REMOVED***' ),
			)
		);

		// Image: Frame.
		register_block_style(
			'core/image',
			array(
				'name'  => '***REMOVED***-image-frame',
				'label' => esc_html__( 'Frame', '***REMOVED***' ),
			)
		);

		// Latest Posts: Dividers.
		register_block_style(
			'core/latest-posts',
			array(
				'name'  => '***REMOVED***-latest-posts-dividers',
				'label' => esc_html__( 'Dividers', '***REMOVED***' ),
			)
		);

		// Latest Posts: Borders.
		register_block_style(
			'core/latest-posts',
			array(
				'name'  => '***REMOVED***-latest-posts-borders',
				'label' => esc_html__( 'Borders', '***REMOVED***' ),
			)
		);

		// Media & Text: Borders.
		register_block_style(
			'core/media-text',
			array(
				'name'  => '***REMOVED***-border',
				'label' => esc_html__( 'Borders', '***REMOVED***' ),
			)
		);

		// Separator: Thick.
		register_block_style(
			'core/separator',
			array(
				'name'  => '***REMOVED***-separator-thick',
				'label' => esc_html__( 'Thick', '***REMOVED***' ),
			)
		);

		// Social icons: Dark gray color.
		register_block_style(
			'core/social-links',
			array(
				'name'  => '***REMOVED***-social-icons-color',
				'label' => esc_html__( 'Dark gray', '***REMOVED***' ),
			)
		);
	}
	add_action( 'init', 'twenty_twenty_one_register_block_styles' );
}
