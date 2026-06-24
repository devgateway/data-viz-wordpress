<?php


function admin_style()
{
    // Load semantic-ui only on admin pages that need it (not the block editor canvas).
    wp_enqueue_style('semantic-styles', 'https://cdn.jsdelivr.net/npm/semantic-ui-css@2.5.0/semantic.min.css');
    wp_enqueue_style('react-styles_common', '/../scss/themes/common.css');
}
add_action('admin_enqueue_scripts', 'admin_style');

// editor.css is scoped to .editor-styles-wrapper and must only load inside
// the Gutenberg block editor — not on settings pages, plugins, etc.
function block_editor_style()
{
    wp_register_style('admin', get_stylesheet_directory_uri() . '/css/editor.css');
    wp_enqueue_style('admin');
}
add_action('enqueue_block_editor_assets', 'block_editor_style');