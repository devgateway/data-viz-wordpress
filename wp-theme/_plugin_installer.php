<?php

require_once get_template_directory() . '/inc/class-tgm-plugin-activation.php';

add_action('tgmpa_register', 'data_viz_register_required_plugins');

/**
 * Register the required plugins for this theme.
 *
 * In this example, we register five plugins:
 * - one included with the TGMPA library
 * - two from an external source, one from an arbitrary source, one from a GitHub repository
 * - two from the .org repo, where one demonstrates the use of the `is_callable` argument
 *
 * The variables passed to the `tgmpa()` function should be:
 * - an array of plugin arrays;
 * - optionally a configuration array.
 * If you are not changing anything in the configuration array, you can remove the array and remove the
 * variable from the function call: `tgmpa( $plugins );`.
 * In that case, the TGMPA default settings will be used.
 *
 * This function is hooked into `tgmpa_register`, which is fired on the WP `init` action on priority 10.
 */
function data_viz_register_required_plugins() {
    /*
	 * Array of plugin arrays. Required keys are name and slug.
	 * If the source is NOT from the .org repo, then source is also required.

	$plugins = array(

		// This is an example of how to include a plugin bundled with a theme.
		array(
			'name'               => 'TGM Example Plugin', // The plugin name.
			'slug'               => 'tgm-example-plugin', // The plugin slug (typically the folder name).
			'source'             => get_template_directory() . '/lib/plugins/tgm-example-plugin.zip', // The plugin source.
			'required'           => true, // If false, the plugin is only 'recommended' instead of required.
			'version'            => '', // E.g. 1.0.0. If set, the active plugin must be this version or higher. If the plugin version is higher than the plugin version installed, the user will be notified to update the plugin.
			'force_activation'   => false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch.
			'force_deactivation' => false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins.
			'external_url'       => '', // If set, overrides default API URL and points to an external URL.
			'is_callable'        => '', // If set, this callable will be be checked for availability to determine if a plugin is active.
		),

		// This is an example of how to include a plugin from an arbitrary external source in your theme.
		array(
			'name'         => 'TGM New Media Plugin', // The plugin name.
			'slug'         => 'tgm-new-media-plugin', // The plugin slug (typically the folder name).
			'source'       => 'https://s3.amazonaws.com/tgm/tgm-new-media-plugin.zip', // The plugin source.
			'required'     => true, // If false, the plugin is only 'recommended' instead of required.
			'external_url' => 'https://github.com/thomasgriffin/New-Media-Image-Uploader', // If set, overrides default API URL and points to an external URL.
		),

		// This is an example of how to include a plugin from a GitHub repository in your theme.
		// This presumes that the plugin code is based in the root of the GitHub repository
		// and not in a subdirectory ('/src') of the repository.
		array(
			'name'      => 'Adminbar Link Comments to Pending',
			'slug'      => 'adminbar-link-comments-to-pending',
			'source'    => 'https://github.com/jrfnl/WP-adminbar-comments-to-pending/archive/master.zip',
		),

		// This is an example of how to include a plugin from the WordPress Plugin Repository.
		array(
			'name'      => 'BuddyPress',
			'slug'      => 'buddypress',
			'required'  => false,
		),

		// This is an example of the use of 'is_callable' functionality. A user could - for instance -
		// have WPSEO installed *or* WPSEO Premium. The slug would in that last case be different, i.e.
		// 'wordpress-seo-premium'.
		// By setting 'is_callable' to either a function from that plugin or a class method
		// `array( 'class', 'method' )` similar to how you hook in to actions and filters, TGMPA can still
		// recognize the plugin as being installed.
		array(
			'name'        => 'WordPress SEO by Yoast',
			'slug'        => 'wordpress-seo',
			'is_callable' => 'wpseo_init',
		),

	); 	 */

	$plugins = array(
		// Advanced Custom Fields
		array(
			'name'     => 'Advanced Custom Fields',
			'slug'     => 'advanced-custom-fields',
			'required' => true,
		),
		// Akismet Anti-spam
		array(
			'name'     => 'Akismet Anti-spam',
			'slug'     => 'akismet',
		),
		// Better Search Replace
		array(
			'name'     => 'Better Search Replace',
			'slug'     => 'better-search-replace',
			'required' => true,
		),
		// Custom Post Type Permalinks
		array(
			'name'     => 'Custom Post Type Permalinks',
			'slug'     => 'custom-post-type-permalinks',
			'required' => true,
		),
		// Custom Post Type UI
		array(
			'name'     => 'Custom Post Type UI',
			'slug'     => 'custom-post-type-ui',
			'required' => true,
		),
		// Custom Taxonomy Order NE
		array(
			'name'     => 'Custom Taxonomy Order NE',
			'slug'     => 'custom-taxonomy-order-ne',
			'required' => true,
		),
		// Duplicate WP Page Post
		array(
			'name'     => 'Duplicate WP Page Post',
			'slug'     => 'duplicate-wp-page-post',
			'required' => true,
		),
		// Flexible Table Block
		array(
			'name'     => 'Flexible Table Block',
			'slug'     => 'flexible-table-block',
		),
		// Folders
		array(
			'name'     => 'Folders',
			'slug'     => 'folders',
		),
		// Hyperlink Group Block
		array(
			'name'     => 'Hyperlink Group Block',
			'slug'     => 'hyperlink-group-block',
		),
		// Intuitive Custom Post Order
		array(
			'name'     => 'Intuitive Custom Post Order',
			'slug'     => 'intuitive-custom-post-order',
		),
		// Menu Image
		array(
			'name'     => 'Menu Image',
			'slug'     => 'menu-image',
		),
		// Post Types Order
		array(
			'name'     => 'Post Types Order',
			'slug'     => 'post-types-order',
			'required' => true,
		),
		// Simple Post Type Permalinks
		array(
			'name'     => 'Simple Post Type Permalinks',
			'slug'     => 'simple-post-type-permalinks',
			'required' => false,
		),
		// SVG Support
		array(
			'name'     => 'SVG Support',
			'slug'     => 'svg-support',
			'required' => true,
		),
		// WordPress Importer
		array(
			'name'     => 'WordPress Importer',
			'slug'     => 'wordpress-importer',
		),
		// Yoast SEO
		array(
			'name'        => 'Yoast SEO',
			'slug'        => 'wordpress-seo',
			'required'    => true,
			'is_callable' => 'wpseo_init',
		),
		// WP Database Backup
		array(
			'name'     => 'WP Database Backup',
			'slug'     => 'wp-database-backup',
			'required' => false,
		),

		// Custom bundled plugins for data-viz
		array(
			'name'               => 'WP React Blocks Plugin',
			'slug'               => 'wp-react-blocks-plugin',
			'source'             => get_template_directory() . '/../../plugins/wp-react-blocks-plugin/index.php',
			'required'           => true,
			'force_activation'   => true,
		),
		array(
			'name'               => 'WP React Custom API',
			'slug'               => 'wp-react-custom-api',
			'source'             => get_template_directory() . '/../../plugins/wp-react-custom-api/custom-wp-rest-api.php',
			'required'           => true,
			'force_activation'   => true,
		),
		array(
			'name'               => 'WP Multilang',
			'slug'               => 'wp-multilang',
			'source'             => get_template_directory() . '/../../plugins/wp-multilang/wp-multilang.php',
			'required'           => true,
			'force_activation'   => true,
		),
		array(
			'name'               => 'WP React Custom REST Menu',
			'slug'               => 'wp-react-custom-rest-menu',
			'source'             => get_template_directory() . '/../../plugins/wp-react-custom-rest-menu/custom-wp-rest-api-v2-menus.php',
			'required'           => true,
			'force_activation'   => true,
		),
	);

	/*
	 * Array of configuration settings. Amend each line as needed.
	 *
	 * TGMPA will start providing localized text strings soon. If you already have translations of our standard
	 * strings available, please help us make TGMPA even better by giving us access to these translations or by
	 * sending in a pull-request with .po file(s) with the translations.
	 *
	 * Only uncomment the strings in the config array if you want to customize the strings.
	 */
	$config = array(
		'id'           => 'xcare',                 // Unique ID for hashing notices for multiple instances of TGMPA.
		'default_path' => '',                      // Default absolute path to bundled plugins.
		'menu'         => 'tgmpa-install-plugins', // Menu slug.
		'parent_slug'  => 'themes.php',            // Parent menu slug.
		'capability'   => 'edit_theme_options',    // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
		'has_notices'  => true,                    // Show admin notices or not.
		'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
		'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
		'is_automatic' => false,                   // Automatically activate plugins after installation or not.
		'message'      => '',                      // Message to output right before the plugins table.
        /*
		'strings'      => array(
			'page_title'                      => esc_attr__( 'Install Required Plugins', 'data-viz-wp' ),
			'menu_title'                      => esc_attr__( 'Install Plugins', 'data-viz-wp' ),
			/* translators: %s: plugin name. * /
			'installing'                      => esc_attr__( 'Installing Plugin: %s', 'data-viz-wp' ),
			/* translators: %s: plugin name. * /
			'updating'                        => esc_attr__( 'Updating Plugin: %s', 'data-viz-wp' ),
			'oops'                            => esc_attr__( 'Something went wrong with the plugin API.', 'data-viz-wp' ),
			'notice_can_install_required'     => _n_noop(
				/* translators: 1: plugin name(s). * /
				'This theme requires the following plugin: %1$s.',
				'This theme requires the following plugins: %1$s.',
				'data-viz-wp'
			),
			'notice_can_install_recommended'  => _n_noop(
				/* translators: 1: plugin name(s). * /
				'This theme recommends the following plugin: %1$s.',
				'This theme recommends the following plugins: %1$s.',
				'data-viz-wp'
			),
			'notice_ask_to_update'            => _n_noop(
				/* translators: 1: plugin name(s). * /
				'The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.',
				'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.',
				'data-viz-wp'
			),
			'notice_ask_to_update_maybe'      => _n_noop(
				/* translators: 1: plugin name(s). * /
				'There is an update available for: %1$s.',
				'There are updates available for the following plugins: %1$s.',
				'data-viz-wp'
			),
			'notice_can_activate_required'    => _n_noop(
				/* translators: 1: plugin name(s). * /
				'The following required plugin is currently inactive: %1$s.',
				'The following required plugins are currently inactive: %1$s.',
				'data-viz-wp'
			),
			'notice_can_activate_recommended' => _n_noop(
				/* translators: 1: plugin name(s). * /
				'The following recommended plugin is currently inactive: %1$s.',
				'The following recommended plugins are currently inactive: %1$s.',
				'data-viz-wp'
			),
			'install_link'                    => _n_noop(
				'Begin installing plugin',
				'Begin installing plugins',
				'data-viz-wp'
			),
			'update_link' 					  => _n_noop(
				'Begin updating plugin',
				'Begin updating plugins',
				'data-viz-wp'
			),
			'activate_link'                   => _n_noop(
				'Begin activating plugin',
				'Begin activating plugins',
				'data-viz-wp'
			),
			'return'                          => esc_attr__( 'Return to Required Plugins Installer', 'data-viz-wp' ),
			'plugin_activated'                => esc_attr__( 'Plugin activated successfully.', 'data-viz-wp' ),
			'activated_successfully'          => esc_attr__( 'The following plugin was activated successfully:', 'data-viz-wp' ),
			/* translators: 1: plugin name. * /
			'plugin_already_active'           => esc_attr__( 'No action taken. Plugin %1$s was already active.', 'data-viz-wp' ),
			/* translators: 1: plugin name. * /
			'plugin_needs_higher_version'     => esc_attr__( 'Plugin not activated. A higher version of %s is needed for this theme. Please update the plugin.', 'data-viz-wp' ),
			/* translators: 1: dashboard link. * /
			'complete'                        => esc_attr__( 'All plugins installed and activated successfully. %1$s', 'data-viz-wp' ),
			'dismiss'                         => esc_attr__( 'Dismiss this notice', 'data-viz-wp' ),
			'notice_cannot_install_activate'  => esc_attr__( 'There are one or more required or recommended plugins to install, update or activate.', 'data-viz-wp' ),
			'contact_admin'                   => esc_attr__( 'Please contact the administrator of this site for help.', 'data-viz-wp' ),

			'nag_type'                        => '', // Determines admin notice type - can only be one of the typical WP notice classes, such as 'updated', 'update-nag', 'notice-warning', 'notice-info' or 'error'. Some of which may not work as expected in older WP versions.
		),
		*/
	);

	tgmpa( $plugins, $config );
}
