<?php
/**
 * Plugin Name: Tailwind Classes for Gutenberg
 * Plugin URI: https://github.com/devgateway/data-viz-wordpress
 * Description: Lets editors type Tailwind CSS utility classes onto any Gutenberg block, with autocomplete and live preview.
 * Version: 0.1.0
 * Author: Development Gateway
 * Author URI: https://github.com/devgateway/data-viz-wordpress
 * Requires at least: 6.4
 * Requires PHP: 8.0
 * License: GPL-2.0-or-later
 * Text Domain: tailwind-gutenberg
 * @package twg
 */

defined( 'ABSPATH' ) || exit;

define( 'TWG_PLUGIN_FILE', __FILE__ );
define( 'TWG_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

require_once TWG_PLUGIN_DIR . 'vendor/autoload.php';

Twg\Plugin::init();
