<?php

namespace Twg;

defined( 'ABSPATH' ) || exit;

class Rest {

	const NAMESPACE = 'twg/v1';

	public static function init(): void {
		add_action( 'rest_api_init', array( self::class, 'register_routes' ) );
	}

	public static function register_routes(): void {
		register_rest_route(
			self::NAMESPACE,
			'/css',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( self::class, 'get_css' ),
					'permission_callback' => '__return_true',
				),
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( self::class, 'post_css' ),
					'permission_callback' => array( self::class, 'can_write_css' ),
					'args'                => array(
						'css' => array(
							'type'     => 'string',
							'required' => true,
						),
					),
				),
			)
		);
	}

	public static function can_write_css(): bool {
		return current_user_can( 'edit_posts' );
	}

	public static function get_css(): \WP_REST_Response {
		if ( ! Settings_Page::get()['load_on_frontend'] ) {
			return new \WP_REST_Response( array() );
		}

		return new \WP_REST_Response( Compiler::get_current() );
	}

	public static function post_css( \WP_REST_Request $request ): \WP_REST_Response {
		$css = (string) $request->get_param( 'css' );

		return new \WP_REST_Response( Compiler::write( $css ) );
	}
}
