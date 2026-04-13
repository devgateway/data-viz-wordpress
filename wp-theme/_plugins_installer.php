<?php

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

require_once __DIR__ . '/inc/magical-plugin-activation/class-magical-plugin-activation.php';

function dg_semantic_recommended_plugins($plugins) {
    $theme_plugins = array(
        // REQUIRED PLUGINS (Essential for theme functionality)
        'advanced-custom-fields' => array(
            'name' => esc_attr__('Advanced Custom Fields', 'dg-semantic'),
            'slug' => 'advanced-custom-fields',
            'file' => 'advanced-custom-fields/acf.php',
            'category' => 'Forms',
            'required' => true,
            'featured' => false,
            'is_local' => false,
        ),
        'custom-post-type-ui' => array(
            'name' => esc_attr__('Custom Post Type UI', 'dg-semantic'),
            'slug' => 'custom-post-type-ui',
            'file' => 'custom-post-type-ui/custom-post-type-ui.php',
            'category' => 'Content Management',
            'required' => true,
            'featured' => false,
            'is_local' => false,
        ),
        'custom-post-type-permalinks' => array(
            'name' => esc_attr__('Custom Post Type Permalinks', 'dg-semantic'),
            'slug' => 'custom-post-type-permalinks',
            'file' => 'custom-post-type-permalinks/custom-post-type-permalinks.php',
            'category' => 'Content Management',
            'required' => true,
            'featured' => false,
            'is_local' => false,
        ),
        'custom-taxonomy-order-ne' => array(
            'name' => esc_attr__('Custom Taxonomy Order NE', 'dg-semantic'),
            'slug' => 'custom-taxonomy-order-ne',
            'file' => 'custom-taxonomy-order-ne/customtaxorder.php',
            'category' => 'Content Management',
            'required' => true,
            'featured' => false,
            'is_local' => false,
        ),
        'duplicate-wp-page-post' => array(
            'name' => esc_attr__('Duplicate WP Page Post', 'dg-semantic'),
            'slug' => 'duplicate-wp-page-post',
            'file' => 'duplicate-wp-page-post/duplicate-wp-page-post.php',
            'category' => 'Content Management',
            'required' => false,
            'featured' => false,
            'is_local' => false,
        ),
        'intuitive-custom-post-order' => array(
            'name' => esc_attr__('Intuitive Custom Post Order', 'dg-semantic'),
            'slug' => 'intuitive-custom-post-order',
            'file' => 'intuitive-custom-post-order/intuitive-custom-post-order.php',
            'category' => 'Content Management',
            'required' => false,
            'featured' => false,
            'is_local' => false,
        ),
        'better-search-replace' => array(
            'name' => esc_attr__('Better Search Replace', 'dg-semantic'),
            'slug' => 'better-search-replace',
            'file' => 'better-search-replace/better-search-replace.php',
            'category' => 'Database',
            'required' => false,
            'featured' => false,
            'is_local' => false,
        ),
        'svg-support' => array(
            'name' => esc_attr__('SVG Support', 'dg-semantic'),
            'slug' => 'svg-support',
            'file' => 'svg-support/svg-support.php',
            'category' => 'Media',
            'required' => true,
            'featured' => true,
            'is_local' => false,
        ),
        'flexible-table-block' => array(
            'name' => esc_attr__('Flexible Table Block', 'dg-semantic'),
            'slug' => 'flexible-table-block',
            'file' => 'flexible-table-block/flexible-table-block.php',
            'category' => 'Gutenberg Blocks',
            'required' => false,
            'featured' => false,
            'is_local' => false,
        ),
        'hyperlink-group-block' => array(
            'name' => esc_attr__('Hyperlink Group Block', 'dg-semantic'),
            'slug' => 'hyperlink-group-block',
            'file' => 'hyperlink-group-block/hyperlink-group-block.php',
            'category' => 'Gutenberg Blocks',
            'required' => true,
            'featured' => false,
            'is_local' => false,
        ),

        // DEPLOYMENT-MANAGED PLUGINS (Bundled via Docker — activation only, never reinstalled)
        'wp-react-blocks-plugin' => array(
            'name' => esc_attr__('WP React Blocks Plugin', 'dg-semantic'),
            'slug' => 'wp-react-blocks-plugin',
            'file' => 'wp-react-blocks-plugin/wp-react-blocks-plugin.php',
            'description' => esc_attr__('Custom Gutenberg blocks built with React for Data Visualization and interactive content.', 'dg-semantic'),
            'category' => 'Gutenberg Blocks',
            'required' => true,
            'featured' => true,
            'is_local' => false,
            'deployment_managed' => true,
        ),
        'wp-react-custom-multilang' => array(
            'name' => esc_attr__('WP Multilang', 'dg-semantic'),
            'slug' => 'wp-react-custom-multilang',
            'file' => 'wp-react-custom-multilang/wp-multilang.php',
            'description' => esc_attr__('Custom multilingual plugin for managing translations and language-specific content.', 'dg-semantic'),
            'category' => 'Multilingual',
            'required' => true,
            'featured' => true,
            'is_local' => false,
            'deployment_managed' => true,
        ),
        'wp-react-custom-rest-menu' => array(
            'name' => esc_attr__('WP REST API Custom Menu', 'dg-semantic'),
            'slug' => 'wp-react-custom-rest-menu',
            'file' => 'wp-react-custom-rest-menu/wp-react-custom-rest-menu.php',
            'description' => esc_attr__('Exposes WordPress menus through REST API endpoints for headless and SPA applications.', 'dg-semantic'),
            'category' => 'REST API',
            'required' => true,
            'featured' => true,
            'is_local' => false,
            'deployment_managed' => true,
        ),
        'wp-react-custom-api' => array(
            'name' => esc_attr__('WP REST API Custom Endpoints', 'dg-semantic'),
            'slug' => 'wp-react-custom-api',
            'file' => 'wp-react-custom-api/custom-wp-rest-api.php',
            'description' => esc_attr__('Custom REST API endpoints for theme-specific data and functionality.', 'dg-semantic'),
            'category' => 'REST API',
            'required' => true,
            'featured' => true,
            'is_local' => false,
            'deployment_managed' => true,
        ),

        // OPTIONAL PLUGINS (Recommended but not essential)
        'wp-database-backup' => array(
            'name' => esc_attr__('WP Database Backup', 'dg-semantic'),
            'slug' => 'wp-database-backup',
            'file' => 'wp-database-backup/wp-database-backup.php',
            'category' => 'Database',
            'required' => false,
            'featured' => false,
            'is_local' => false,
        ),
        
    
    );
    return array_merge($plugins, $theme_plugins);
}

add_filter('magical_plugin_activation_recommended_plugins', 'dg_semantic_recommended_plugins');
