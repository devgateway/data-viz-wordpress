<?php
/**
 * Plugin Name: Custom React Components
 * Plugin URI: https://github.com/devgateway/data-viz-wordpress.git
 * Description: Custom UI Components for data viz. These components are project specific.
 * Version: 1.0.0
 * Author: Timothy Mugo
  * @package dg
 */
defined( 'ABSPATH' ) || exit;

function add_customizer_block_categories( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'wp-customizer-react-blocks',
				'title' => __( 'Customizer React Blocks', 'wp-customizer-react-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'add_customizer_block_categories', 10, 2);


function wp_customizer_register_scripts(){
wp_register_script( 'dummy-handle-header2', '' );


wp_enqueue_script( 'dummy-handle-header2' );

        if (function_exists('wpm_get_language')) {
             wp_add_inline_script( 'dummy-handle-header2', '
                console.log("----- Language -----'.wpm_get_language().'----------") ;
                console.log("---- -User Language -----'.wpm_get_user_language().'----------") ;
                window._user_locale="'.wpm_get_user_language().'" ;
                window._page_locale="'.wpm_get_language().'" ;' );
            }else{
             wp_add_inline_script( 'dummy-handle-header2', '
                window._user_locale="en" ;
                window._page_locale="en" ;' );

            }

}
add_action( 'admin_enqueue_scripts', 'wp_customizer_register_scripts' );




include 'blocks/index.php';

