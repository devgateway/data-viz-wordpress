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
});