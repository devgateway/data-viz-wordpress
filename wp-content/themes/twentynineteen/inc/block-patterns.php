<?php
/**
 * Block Patterns
 *
 * @link https://developer.wordpress.org/reference/functions/register_block_pattern/
 * @link https://developer.wordpress.org/reference/functions/register_block_pattern_category/
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since Twenty Nineteen 1.8
 */

/**
 * Register Block Pattern Category.
 */
if ( function_exists( 'register_block_pattern_category' ) ) {

	register_block_pattern_category(
		'***REMOVED***',
		array( 'label' => esc_html__( 'Twenty Nineteen', '***REMOVED***' ) )
	);
}

/**
 * Register Block Patterns.
 */
if ( function_exists( 'register_block_pattern' ) ) {

	// About.
	register_block_pattern(
		'***REMOVED***/about',
		array(
			'title'      => esc_html__( 'About', '***REMOVED***' ),
			'categories' => array( '***REMOVED***' ),
			'content'    => implode(
				'',
				array(
					'<!-- wp:paragraph {"fontSize":"huge","style":{"typography":{"lineHeight":"1.3"}}} -->',
					'<p class="has-huge-font-size" style="line-height:1.3">' . esc_html__( 'Advocating for Businesses and Entrepreneurs since 2014', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph -->',
					'<!-- wp:paragraph -->',
					'<p>' . esc_html__( 'Eva Young Consulting was founded in 2014 to meet the needs of small businesses in the San Francisco Bay Area. We help startups define a clear brand identity and digital strategy that will carry them through their financing rounds and scale as their business grows. Discover how we can boost your brand with a unique and powerful digital marketing strategy.', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph -->',
					'<!-- wp:buttons -->',
					'<div class="wp-block-buttons"><!-- wp:button {"***REMOVED***":"dark-gray"} -->',
					'<div class="wp-block-button"><a class="wp-block-button__link has-dark-gray-background-color has-background">' . esc_html__( 'Learn More', '***REMOVED***' ) . '</a></div>',
					'<!-- /wp:button --></div>',
					'<!-- /wp:buttons -->',
				)
			),
		)
	);

	// Get In Touch.
	register_block_pattern(
		'***REMOVED***/get-in-touch',
		array(
			'title'      => esc_html__( 'Get In Touch', '***REMOVED***' ),
			'categories' => array( '***REMOVED***' ),
			'content'    => implode(
				'',
				array(
					'<!-- wp:paragraph {"fontSize":"huge"} -->',
					'<p class="has-huge-font-size">' . esc_html__( 'Get In Touch', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph -->',
					'<!-- wp:columns -->',
					'<div class="wp-block-columns"><!-- wp:column -->',
					'<div class="wp-block-column"><!-- wp:paragraph -->',
					'<p>' . esc_html__( '20 Cooper Avenue', '***REMOVED***' ) . '<br>' . esc_html__( 'New York, New York 10023', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph --></div>',
					'<!-- /wp:column -->',
					'<!-- wp:column -->',
					'<div class="wp-block-column"><!-- wp:paragraph -->',
					'<p>' . esc_html__( '(555) 555-5555', '***REMOVED***' ) . '<br><a href="mailto:example@example.com">' . esc_html__( 'example@example.com', '***REMOVED***' ) . '</a></p>',
					'<!-- /wp:paragraph --></div>',
					'<!-- /wp:column --></div>',
					'<!-- /wp:columns -->',
					'<!-- wp:buttons -->',
					'<div class="wp-block-buttons"><!-- wp:button {"***REMOVED***":"dark-gray"} -->',
					'<div class="wp-block-button"><a class="wp-block-button__link has-dark-gray-background-color has-background">' . esc_html__( 'Contact Us', '***REMOVED***' ) . '</a></div>',
					'<!-- /wp:button --></div>',
					'<!-- /wp:buttons -->',
				)
			),
		)
	);

	// Services.
	register_block_pattern(
		'***REMOVED***/services',
		array(
			'title'      => esc_html__( 'Services', '***REMOVED***' ),
			'categories' => array( '***REMOVED***' ),
			'content'    => implode(
				'',
				array(
					'<!-- wp:heading -->',
					'<h2>' . esc_html__( 'Services', '***REMOVED***' ) . '</h2>',
					'<!-- /wp:heading -->',
					'<!-- wp:columns {"className":"has-2-columns"} -->',
					'<div class="wp-block-columns has-2-columns"><!-- wp:column -->',
					'<div class="wp-block-column"><!-- wp:media-text {"mediaLink":"' . esc_url( get_template_directory_uri() ) . '/images/pattern_01.jpg","mediaType":"image","mediaWidth":10,"***REMOVED***":false} -->',
					'<div class="wp-block-media-text alignwide" style="grid-template-columns:10% auto"><figure class="wp-block-media-text__media"><img src="' . esc_url( get_template_directory_uri() ) . '/images/pattern_01.jpg" alt="' . esc_html__( 'Gradient', '***REMOVED***' ) . '"/></figure><div class="wp-block-media-text__content"><!-- wp:paragraph -->',
					'<p>' . esc_html__( 'Website Design', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph --></div></div>',
					'<!-- /wp:media-text -->',
					'<!-- wp:media-text {"mediaLink":"' . esc_url( get_template_directory_uri() ) . '/images/pattern_02.jpg","mediaType":"image","mediaWidth":10,"***REMOVED***":false} -->',
					'<div class="wp-block-media-text alignwide" style="grid-template-columns:10% auto"><figure class="wp-block-media-text__media"><img src="' . esc_url( get_template_directory_uri() ) . '/images/pattern_02.jpg" alt="' . esc_html__( 'Gradient', '***REMOVED***' ) . '"/></figure><div class="wp-block-media-text__content"><!-- wp:paragraph -->',
					'<p>' . esc_html__( 'Mobile', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph --></div></div>',
					'<!-- /wp:media-text -->',
					'<!-- wp:media-text {"mediaLink":"' . esc_url( get_template_directory_uri() ) . '/images/pattern_03.jpg","mediaType":"image","mediaWidth":10,"***REMOVED***":false} -->',
					'<div class="wp-block-media-text alignwide" style="grid-template-columns:10% auto"><figure class="wp-block-media-text__media"><img src="' . esc_url( get_template_directory_uri() ) . '/images/pattern_03.jpg" alt="' . esc_html__( 'Gradient', '***REMOVED***' ) . '"/></figure><div class="wp-block-media-text__content"><!-- wp:paragraph -->',
					'<p>' . esc_html__( 'Social Media', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph --></div></div>',
					'<!-- /wp:media-text --></div>',
					'<!-- /wp:column -->',
					'<!-- wp:column -->',
					'<div class="wp-block-column"><!-- wp:media-text {"mediaLink":"' . esc_url( get_template_directory_uri() ) . '/images/pattern_03.jpg","mediaType":"image","mediaWidth":10,"***REMOVED***":false} -->',
					'<div class="wp-block-media-text alignwide" style="grid-template-columns:10% auto"><figure class="wp-block-media-text__media"><img src="' . esc_url( get_template_directory_uri() ) . '/images/pattern_03.jpg" alt="' . esc_html__( 'Gradient', '***REMOVED***' ) . '"/></figure><div class="wp-block-media-text__content"><!-- wp:paragraph -->',
					'<p>' . esc_html__( 'Marketing', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph --></div></div>',
					'<!-- /wp:media-text -->',
					'<!-- wp:media-text {"mediaLink":"' . esc_url( get_template_directory_uri() ) . '/images/pattern_04.jpg","mediaType":"image","mediaWidth":10,"***REMOVED***":false} -->',
					'<div class="wp-block-media-text alignwide" style="grid-template-columns:10% auto"><figure class="wp-block-media-text__media"><img src="' . esc_url( get_template_directory_uri() ) . '/images/pattern_04.jpg" alt="' . esc_html__( 'Gradient', '***REMOVED***' ) . '"/></figure><div class="wp-block-media-text__content"><!-- wp:paragraph -->',
					'<p>' . esc_html__( 'Copywriting', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph --></div></div>',
					'<!-- /wp:media-text -->',
					'<!-- wp:media-text {"mediaLink":"' . esc_url( get_template_directory_uri() ) . '/images/pattern_01.jpg","mediaType":"image","mediaWidth":10,"***REMOVED***":false} -->',
					'<div class="wp-block-media-text alignwide" style="grid-template-columns:10% auto"><figure class="wp-block-media-text__media"><img src="' . esc_url( get_template_directory_uri() ) . '/images/pattern_01.jpg" alt="' . esc_html__( 'Gradient', '***REMOVED***' ) . '"/></figure><div class="wp-block-media-text__content"><!-- wp:paragraph -->',
					'<p>' . esc_html__( 'Content Strategy', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph --></div></div>',
					'<!-- /wp:media-text --></div>',
					'<!-- /wp:column --></div>',
					'<!-- /wp:columns -->',
				)
			),
		)
	);

	// Team.
	register_block_pattern(
		'***REMOVED***/team',
		array(
			'title'         => esc_html__( 'Team', '***REMOVED***' ),
			'categories'    => array( '***REMOVED***' ),
			'viewportWidth' => 1400,
			'content'       => implode(
				'',
				array(
					'<!-- wp:heading -->',
					'<h2>' . esc_html__( 'Team', '***REMOVED***' ) . '</h2>',
					'<!-- /wp:heading -->',
					'<!-- wp:media-text {"mediaType":"image","mediaWidth":28,"imageFill":true} -->',
					'<div class="wp-block-media-text alignwide is-stacked-on-mobile is-image-fill" style="grid-template-columns:28% auto"><figure class="wp-block-media-text__media" style="background-image:url(' . esc_url( get_template_directory_uri() ) . '/images/pattern_01.jpg);background-position:50% 50%"><img src="' . esc_url( get_template_directory_uri() ) . '/images/pattern_01.jpg" alt="' . esc_html__( 'Gradient', '***REMOVED***' ) . '"/></figure><div class="wp-block-media-text__content"><!-- wp:heading {"level":3} -->',
					'<h3>' . esc_html__( 'Eva Young', '***REMOVED***' ) . '</h3>',
					'<!-- /wp:heading -->',
					'<!-- wp:paragraph -->',
					'<p>' . esc_html__( 'Eva Young grew up working alongside her parents at their restaurant in Queens, NY. She opened Eva Young Consulting in 2014 to help small businesses like her parents’ restaurant adapt to the digital age.', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph --></div></div>',
					'<!-- /wp:media-text -->',
					'<!-- wp:media-text {"mediaType":"image","mediaWidth":28,"imageFill":true} -->',
					'<div class="wp-block-media-text alignwide is-stacked-on-mobile is-image-fill" style="grid-template-columns:28% auto"><figure class="wp-block-media-text__media" style="background-image:url(' . esc_url( get_template_directory_uri() ) . '/images/pattern_02.jpg);background-position:50% 50%"><img src="' . esc_url( get_template_directory_uri() ) . '/images/pattern_02.jpg" alt="' . esc_html__( 'Gradient', '***REMOVED***' ) . '"/></figure><div class="wp-block-media-text__content"><!-- wp:heading {"level":3} -->',
					'<h3>' . esc_html__( 'Doug Watson', '***REMOVED***' ) . '</h3>',
					'<!-- /wp:heading -->',
					'<!-- wp:paragraph -->',
					'<p>' . esc_html__( 'Oddly enough, Doug Watson also grew up working alongside his parents at a family-owned restaurant in Queens, NY. He &nbsp;worked on digital campaigns for Fortune 500 Companies before joining Eva Green Consulting.', '***REMOVED***' ) . '</p>',
					'<!-- /wp:paragraph --></div></div>',
					'<!-- /wp:media-text -->',
				)
			),
		)
	);

	// What We Do.
	register_block_pattern(
		'***REMOVED***/what-we-do',
		array(
			'title'         => esc_html__( 'What We Do', '***REMOVED***' ),
			'categories'    => array( '***REMOVED***' ),
			'viewportWidth' => 1400,
			'content'       => implode(
				'',
				array(
					'<!-- wp:heading -->',
					'<h2>' . esc_html__( 'What We Do', '***REMOVED***' ) . '</h2>',
					'<!-- /wp:heading -->',
					'<!-- wp:pullquote {"align":"wide","className":"is-style-solid-color"} -->',
					'<figure class="wp-block-pullquote alignwide is-style-solid-color"><blockquote><p>' . esc_html__( 'Redefine brands', '***REMOVED***' ) . '</p><cite>' . esc_html__( 'We help startups define (or refine) a clear brand identity.', '***REMOVED***' ) . '</cite></blockquote></figure>',
					'<!-- /wp:pullquote -->',
					'<!-- wp:pullquote {"mainColor":"dark-gray","***REMOVED***":"#ffffff","align":"wide","className":"is-style-solid-color"} -->',
					'<figure class="wp-block-pullquote alignwide has-background has-dark-gray-background-color is-style-solid-color"><blockquote class="has-text-color" style="color:#ffffff"><p>' . esc_html__( 'Activate new customers', '***REMOVED***' ) . '</p><cite>' . esc_html__( 'We help businesses grow.', '***REMOVED***' ) . '</cite></blockquote></figure>',
					'<!-- /wp:pullquote -->',
					'<!-- wp:pullquote {"***REMOVED***":"#f7f7f7","***REMOVED***":"#111111","align":"wide","className":"is-style-solid-color"} -->',
					'<figure class="wp-block-pullquote alignwide has-background is-style-solid-color" style="background-color:#f7f7f7"><blockquote class="has-text-color" style="color:#111111"><p>' . esc_html__( 'Spark interest on social media', '***REMOVED***' ) . '</p><cite>' . esc_html__( 'We help companies communicate with their customers.', '***REMOVED***' ) . '</cite></blockquote></figure>',
					'<!-- /wp:pullquote -->',
				)
			),
		)
	);
}
