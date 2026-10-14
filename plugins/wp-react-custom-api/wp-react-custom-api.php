<?php
/*
Plugin Name: Custom WP-REST-API Endpoints
Version: 0.0.1
Description: Adding custom endpoints on WP REST API
Author: Development Gateway
Author URI: https://www.developmentgateway.org/
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Copyright: © 2025 Development Gateway
*/

function custom_api_test_callback() {
    return array('message' => 'Hello, World!');
}

function get_date_range_for_posts_callback() {
    global $wpdb;

    if (empty($wpdb)) {
        return array();
    }

    // Get the date range using window functions
    $query = $wpdb->prepare("
        SELECT DISTINCT
            first_value(post_date_gmt) OVER (ORDER BY post_date_gmt) AS first_post_date,
            last_value(post_date_gmt) OVER (ORDER BY post_date_gmt ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_post_date
        FROM {$wpdb->posts}
        WHERE post_date_gmt != %s AND post_status IN ('publish', 'inherit')
        LIMIT 1
    ", '0000-00-00 00:00:00');

    $result = $wpdb->get_row($query);

    if (empty($result) || empty($result->first_post_date) || empty($result->last_post_date)) {
        return array();
    }

    // Format the dates
    $first_post_date = date('Y-m-d', strtotime($result->first_post_date));
    $last_post_date = date('Y-m-d', strtotime($result->last_post_date));

    return array(
        'first_post_date' => $first_post_date,
        'last_post_date' => $last_post_date
    );
}

function get_year_range_for_posts_callback() {
    global $wpdb;

    if (empty($wpdb)) {
        return array();
    }

    $query = $wpdb->prepare("
        SELECT YEAR(post_date_gmt) AS year, COUNT(*) AS post_count
        FROM {$wpdb->posts}
        WHERE post_status IN ('publish', 'inherit')
          AND post_date_gmt != %s
        GROUP BY YEAR(post_date_gmt)
        ORDER BY year DESC", '0000-00-00 00:00:00');

    $results = $wpdb->get_results($query);

    $years = array();
    foreach ($results as $result) {
        $years[] = (int) $result->year;
    }
    return $years;
}

function get_custom_posts_with_years_callback($request) {
    $post_type = $request->get_param('post_type');
    if (empty($post_type)) {
        $post_type = 'post';
    }

    // Backwards compatibility with frontend values that may pass WP collection names.
    if ($post_type === 'posts') {
        $post_type = 'post';
    }

    $post_type_object = get_post_type_object($post_type);
    if (empty($post_type_object) || empty($post_type_object->show_in_rest)) {
        return new WP_Error(
            'invalid_post_type',
            __('Invalid or non-REST post type.', 'wp-react-custom-api'),
            array('status' => 400)
        );
    }

    $per_page = (int) $request->get_param('per_page');
    if ($per_page <= 0) {
        $per_page = 10;
    }
    if ($per_page > 100) {
        $per_page = 100;
    }

    $page = (int) $request->get_param('page');
    if ($page <= 0) {
        $page = 1;
    }

    $order = strtoupper((string) $request->get_param('order'));
    $order = in_array($order, array('ASC', 'DESC'), true) ? $order : 'DESC';

    $orderby = (string) $request->get_param('orderby');
    if (empty($orderby)) {
        $orderby = 'date';
    }

    $query_args = array(
        'post_type' => $post_type,
        'post_status' => 'publish',
        'posts_per_page' => $per_page,
        'paged' => $page,
        'orderby' => $orderby,
        'order' => $order,
        'no_found_rows' => false,
        'ignore_sticky_posts' => true,
    );

    $lang = $request->get_param('lang');
    if (!empty($lang)) {
        $query_args['lang'] = sanitize_text_field($lang);
    }

    $years = $request->get_param('years');
    $years_list = array();
    if (!empty($years)) {
        $parsed_years = array_map('trim', explode(',', (string) $years));
        foreach ($parsed_years as $year) {
            $year_number = (int) $year;
            if ($year_number > 0) {
                $years_list[] = $year_number;
            }
        }
        $years_list = array_values(array_unique($years_list));
    }

    $after = $request->get_param('after');
    $before = $request->get_param('before');
    $date_query = array();

    if (!empty($years_list)) {
        $year_date_query = array('relation' => 'OR');
        foreach ($years_list as $year) {
            $year_date_query[] = array(
                'year' => $year,
                'inclusive' => true,
            );
        }
        $date_query[] = $year_date_query;
    }

    if (!empty($after) || !empty($before)) {
        $range_query = array('inclusive' => true);
        if (!empty($after)) {
            $range_query['after'] = sanitize_text_field($after);
        }
        if (!empty($before)) {
            $range_query['before'] = sanitize_text_field($before);
        }
        $date_query[] = $range_query;
    }

    if (!empty($date_query)) {
        if (count($date_query) > 1) {
            $date_query['relation'] = 'AND';
        }
        $query_args['date_query'] = $date_query;
    }

    $reserved_params = array(
        'post_type',
        'per_page',
        'page',
        'lang',
        'after',
        'before',
        'orderby',
        'order',
        'years',
        'context',
        '_fields',
    );

    $tax_query = array('relation' => 'AND');
    $all_params = $request->get_params();
    foreach ($all_params as $key => $value) {
        if (in_array($key, $reserved_params, true)) {
            continue;
        }

        $taxonomy = get_taxonomy($key);
        if (empty($taxonomy)) {
            continue;
        }

        $term_ids = array();
        $parsed_values = array_map('trim', explode(',', (string) $value));
        foreach ($parsed_values as $term_id) {
            $term_id_number = (int) $term_id;
            if ($term_id_number > 0) {
                $term_ids[] = $term_id_number;
            }
        }

        $term_ids = array_values(array_unique($term_ids));
        if (empty($term_ids)) {
            continue;
        }

        $tax_query[] = array(
            'taxonomy' => $key,
            'field' => 'term_id',
            'terms' => $term_ids,
            'operator' => 'IN',
        );
    }

    if (count($tax_query) > 1) {
        $query_args['tax_query'] = $tax_query;
    }

    $query = new WP_Query($query_args);
    $controller = new WP_REST_Posts_Controller($post_type);
    $item_request = new WP_REST_Request('GET');
    $item_request->set_param('context', 'view');

    $items = array();
    foreach ($query->posts as $post) {
        $prepared = $controller->prepare_item_for_response($post, $item_request);
        $items[] = $controller->prepare_response_for_collection($prepared);
    }

    $response = new WP_REST_Response($items);
    $total_items = (int) $query->found_posts;
    $total_pages = (int) $query->max_num_pages;

    $response->header('X-WP-Total', (string) $total_items);
    $response->header('X-WP-TotalPages', (string) max(1, $total_pages));

    return $response;
}

const DG_BLOCK_STYLES_TRANSIENT = 'dg_block_styles_css';

// A headless frontend never runs wp_head, so the global stylesheet (base
// .is-layout-flex/flow/constrained rules) and the per-render wp-container-*
// block-support rules are never printed. Rendering every published post's
// blocks once fills the style engine's block-supports store with all of them.
function get_block_styles_callback() {
    $css = get_transient(DG_BLOCK_STYLES_TRANSIENT);

    if (false === $css) {
        $css = wp_get_global_stylesheet();

        $post_ids = get_posts(array(
            'post_type' => 'any',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'fields' => 'ids',
            'no_found_rows' => true,
        ));

        foreach ($post_ids as $post_id) {
            do_blocks(get_post_field('post_content', $post_id));
        }

        $css .= wp_style_engine_get_stylesheet_from_context('block-supports', array('prettify' => false));

        set_transient(DG_BLOCK_STYLES_TRANSIENT, $css, DAY_IN_SECONDS);
    }

    return array('css' => $css);
}

function clear_block_styles_cache() {
    delete_transient(DG_BLOCK_STYLES_TRANSIENT);
}

add_action('save_post', 'clear_block_styles_cache');
add_action('deleted_post', 'clear_block_styles_cache');
add_action('switch_theme', 'clear_block_styles_cache');

add_action('rest_api_init', function () {
    register_rest_route('util-api/v1', '/test', array(
        'methods' => 'GET',
        'callback' => 'custom_api_test_callback',
    ));
    register_rest_route('util-api/v1', '/date-range', array(
        'methods' => 'GET',
        'callback' => 'get_date_range_for_posts_callback',
    ));
    register_rest_route('util-api/v1', '/year-range', array(
        'methods' => 'GET',
        'callback' => 'get_year_range_for_posts_callback',
    ));
    register_rest_route('util-api/v1', '/block-styles', array(
        'methods' => 'GET',
        'callback' => 'get_block_styles_callback',
        'permission_callback' => '__return_true',
    ));
    register_rest_route('dg/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => 'get_custom_posts_with_years_callback',
    ));
});