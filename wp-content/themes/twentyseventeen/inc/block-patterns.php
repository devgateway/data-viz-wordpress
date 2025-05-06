<?php
/**
 * Twenty Seventeen Theme: Block Patterns
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since Twenty Seventeen 2.5
 */

/**
 * Register Block Pattern Category.
 */
if ( function_exists( 'register_block_pattern_category' ) ) {

	register_block_pattern_category(
		'***REMOVED***',
		array( 'label' => __( 'Twenty Seventeen', '***REMOVED***' ) )
	);
}

/**
 * Register Block Patterns.
 */
if ( function_exists( 'register_block_pattern' ) ) {
	register_block_pattern(
		'***REMOVED***/large-heading-with-button',
		array(
			'title'      => __( 'Large Heading with Button', '***REMOVED***' ),
			'categories' => array( '***REMOVED***' ),
			'content'    => '<!-- wp:heading {"level":1,"textColor":"black","style":{"typography":{"fontSize":50}}} -->
            <h1 class="has-black-color has-text-color" style="font-size:50px">' . __( 'Attract Leads with Marketing Campaigns that Work', '***REMOVED***' ) . '</h1>
            <!-- /wp:heading -->

            <!-- wp:buttons -->
            <div class="wp-block-buttons"><!-- wp:button {"borderRadius":0,"className":"is-style-fill"} -->
            <div class="wp-block-button is-style-fill"><a class="wp-block-button__link no-border-radius">' . __( 'Our Services', '***REMOVED***' ) . '</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons -->',
		)
	);

	register_block_pattern(
		'***REMOVED***/images-with-text-and-link',
		array(
			'title'      => __( 'Images with Text and Link', '***REMOVED***' ),
			'categories' => array( '***REMOVED***' ),
			'content'    => '<!-- wp:spacer -->
            <div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
            <!-- /wp:spacer -->
            <!-- wp:columns -->
            <div class="wp-block-columns"><!-- wp:column -->
            <div class="wp-block-column">
			<!-- wp:image {"className":"size-large"} -->
			<figure class="wp-block-image size-large"><img src="' . esc_url( get_template_directory_uri() ) . '/assets/images/stripes.jpg" alt="' . __( 'Black Stripes', '***REMOVED***' ) . '"/></figure>
			<!-- /wp:image -->
            <!-- wp:heading {"textColor":"black","style":{"typography":{"fontSize":45}}} -->
            <h2 class="has-black-color has-text-color" style="font-size:45px">' . __( 'Branding', '***REMOVED***' ) . '</h2>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"textColor":"black","style":{"typography":{"lineHeight":"1.8"}}} -->
            <p class="has-black-color has-text-color" style="line-height:1.8">' . __( 'Communicate your purpose and goals with a beautiful logo that encapsulates your business.', '***REMOVED***' ) . '</p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"style":{"typography":{"lineHeight":"3"}}} -->
            <p style="line-height:3"><a href="#"><strong>' . __( 'See Case Study', '***REMOVED***' ) . ' →</strong></a></p>
            <!-- /wp:paragraph --></div>
            <!-- /wp:column -->
            <!-- wp:column -->
            <div class="wp-block-column"><!-- wp:spacer {"height":254} -->
            <div style="height:254px" aria-hidden="true" class="wp-block-spacer"></div>
            <!-- /wp:spacer -->
			<!-- wp:image {"className":"size-large"} -->
			<figure class="wp-block-image size-large"><img src="' . esc_url( get_template_directory_uri() ) . '/assets/images/white-border.jpg" alt="' . __( 'White border', '***REMOVED***' ) . '"/></figure>
			<!-- /wp:image -->
            <!-- wp:heading {"textColor":"black","style":{"typography":{"fontSize":45}}} -->
            <h2 class="has-black-color has-text-color" style="font-size:45px">' . __( 'Web Design', '***REMOVED***' ) . '</h2>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"textColor":"black","style":{"typography":{"lineHeight":"1.8"}}} -->
            <p class="has-black-color has-text-color" style="line-height:1.8">' . __( 'Need a website? We&#39;ve got you covered. Our design team will create a stunning design to transform your brand.', '***REMOVED***' ) . '</p>
            <!-- /wp:paragraph -->
            <!-- wp:paragraph {"style":{"typography":{"lineHeight":"3.0"}}} -->
            <p style="line-height:3.0"><a href="#"><strong>' . __( 'See Case Study', '***REMOVED***' ) . ' →</strong></a></p>
            <!-- /wp:paragraph --></div>
            <!-- /wp:column --></div>
            <!-- /wp:columns -->',
		)
	);

	register_block_pattern(
		'***REMOVED***/images-with-link',
		array(
			'title'      => __( 'Images with Link', '***REMOVED***' ),
			'categories' => array( '***REMOVED***' ),
			'content'    => '<!-- wp:spacer -->
            <div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
            <!-- /wp:spacer -->
            <!-- wp:columns {"***REMOVED***":"top"} -->
            <div class="wp-block-columns are-vertically-aligned-top"><!-- wp:column -->
            <div class="wp-block-column"><!-- wp:group -->
            <div class="wp-block-group"><div class="wp-block-group__inner-container">
			<!-- wp:image {"align":"center","sizeSlug":"large","className":"is-style-default"} -->
			<div class="wp-block-image is-style-default"><figure class="aligncenter size-large"><img src="' . esc_url( get_template_directory_uri() ) . '/assets/images/stripes.jpg" alt="' . __( 'Black Stripes', '***REMOVED***' ) . '"/></figure></div>
			<!-- /wp:image -->
            <!-- wp:heading {"align":"left","textColor":"black","style":{"typography":{"fontSize":30}}} -->
            <h2 class="has-text-align-left has-black-color has-text-color" style="font-size:30px">' . __( 'Branding', '***REMOVED***' ) . '</h2>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"align":"left"} -->
            <p class="has-text-align-left"><a href="#">' . __( 'See Case Study', '***REMOVED***' ) . ' →</a></p>
            <!-- /wp:paragraph --></div></div>
            <!-- /wp:group --></div>
            <!-- /wp:column -->
            <!-- wp:column -->
            <div class="wp-block-column"><!-- wp:group -->
            <div class="wp-block-group"><div class="wp-block-group__inner-container">
			<!-- wp:image {"align":"center","sizeSlug":"large","className":"is-style-default"} -->
			<div class="wp-block-image is-style-default"><figure class="aligncenter size-large"><img src="' . esc_url( get_template_directory_uri() ) . '/assets/images/white-border.jpg" alt="' . __( 'White border', '***REMOVED***' ) . '"/></figure></div>
			<!-- /wp:image -->
            <!-- wp:heading {"align":"left","textColor":"black","style":{"typography":{"fontSize":30}}} -->
            <h2 class="has-text-align-left has-black-color has-text-color" style="font-size:30px">' . __( 'Design', '***REMOVED***' ) . '</h2>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"align":"left"} -->
            <p class="has-text-align-left"><a href="#">' . __( 'See Case Study', '***REMOVED***' ) . ' →</a></p>
            <!-- /wp:paragraph --></div></div>
            <!-- /wp:group --></div>
            <!-- /wp:column -->
            <!-- wp:column -->
            <div class="wp-block-column"><!-- wp:group -->
            <div class="wp-block-group"><div class="wp-block-group__inner-container">
			<!-- wp:image {"align":"center","sizeSlug":"large","className":"is-style-default"} -->
			<div class="wp-block-image is-style-default"><figure class="aligncenter size-large"><img src="' . esc_url( get_template_directory_uri() ) . '/assets/images/direct-light.jpg" alt="' . __( 'Direct Light', '***REMOVED***' ) . '"/></figure></div>
			<!-- /wp:image -->
            <!-- wp:heading {"align":"left","textColor":"black","style":{"typography":{"fontSize":30}}} -->
            <h2 class="has-text-align-left has-black-color has-text-color" style="font-size:30px">' . __( 'Strategy', '***REMOVED***' ) . '</h2>
            <!-- /wp:heading -->
            <!-- wp:paragraph {"align":"left"} -->
            <p class="has-text-align-left"><a href="#">' . __( 'See Case Study', '***REMOVED***' ) . ' →</a></p>
            <!-- /wp:paragraph --></div></div>
            <!-- /wp:group --></div>
            <!-- /wp:column --></div>
            <!-- /wp:columns -->
            <!-- wp:spacer -->
            <div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
            <!-- /wp:spacer -->',
		)
	);

	register_block_pattern(
		'***REMOVED***/services',
		array(
			'title'      => __( 'Services', '***REMOVED***' ),
			'categories' => array( '***REMOVED***' ),
			'content'    => '<!-- wp:spacer -->
            <div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
            <!-- /wp:spacer -->
            
            <!-- wp:heading {"level":1,"style":{"typography":{"fontSize":50}}} -->
            <h1 style="font-size:50px">' . __( 'Our Services', '***REMOVED***' ) . '</h1>
            <!-- /wp:heading -->
            
            <!-- wp:columns -->
            <div class="wp-block-columns"><!-- wp:column -->
            <div class="wp-block-column">
            <!-- wp:paragraph {"style":{"typography":{"fontSize":21, "lineHeight":"2.5"}}} -->
            <p style="font-size:21px"><a href="#">' . __( 'Branding', '***REMOVED***' ) . ' →</a><br><a href="#">' . __( 'Web Design', '***REMOVED***' ) . ' →</a><br><a href="#">' . __( 'Web Development', '***REMOVED***' ) . ' →</a></p>
            <!-- /wp:paragraph -->
            </div>
            <!-- /wp:column -->
            
            <!-- wp:column -->
            <div class="wp-block-column">
            <!-- wp:paragraph {"style":{"typography":{"fontSize":21, "lineHeight":"2.5"}}} -->
            <p style="font-size:21px"><a href="#">' . __( 'Content Strategy', '***REMOVED***' ) . ' →</a><br><a href="#">' . __( 'Marketing &amp; SEO', '***REMOVED***' ) . ' →</a><br><a href="#">' . __( 'Video Production', '***REMOVED***' ) . ' →</a></p>
            <!-- /wp:paragraph --></div>
            <!-- /wp:column --></div>
            <!-- /wp:columns -->
            
            <!-- wp:spacer -->
            <div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>
            <!-- /wp:spacer -->',
		)
	);

	register_block_pattern(
		'***REMOVED***/contact-us',
		array(
			'title'      => __( 'Contact Us', '***REMOVED***' ),
			'categories' => array( '***REMOVED***' ),
			'content'    => '<!-- wp:cover {"***REMOVED***":"#93aab8","minHeight":700,"align":"center"} -->
            <div class="wp-block-cover aligncenter has-background-dim" style="background-color:#93aab8;min-height:700px"><div class="wp-block-cover__inner-container"><!-- wp:paragraph {"align":"left","textColor":"white","style":{"typography":{"fontSize":50}}} -->
            <p class="has-text-align-left has-white-color has-text-color" style="font-size:50px">' . __( 'We are proud to serve outstanding clients.', '***REMOVED***' ) . '</p>
            <!-- /wp:paragraph -->
            
            <!-- wp:buttons -->
            <div class="wp-block-buttons"><!-- wp:button {"borderRadius":0,"***REMOVED***":"black","textColor":"white","className":"is-style-fill"} -->
            <div class="wp-block-button is-style-fill"><a class="wp-block-button__link has-white-color has-black-background-color has-text-color has-background no-border-radius">' . __( 'Contact us', '***REMOVED***' ) . '</a></div>
            <!-- /wp:button --></div>
            <!-- /wp:buttons --></div></div>
            <!-- /wp:cover -->',
		)
	);
}
