<?php
/*
Plugin Name: Custom WP-REST-API Endpoints
Version: 0.0.1
Description: Adding custom endpoints on WP REST API
Author: Timothy Mugo (Development Gateway)
Author URI:
*/

function custom_api_test_callback() {
    return array('message' => 'Hello, World!');
}

function get_date_range_for_posts_callback() {
    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC',
    );
    $posts = get_posts($args);
    $years = array();
    foreach ($posts as $post) {
        $year = date('Y', strtotime($post->post_date));
        if (!in_array($year, $years)) {
            $years[] =(int) $year;
        }
    }
    return $years;
}

function get_year_range_for_posts_callback() {
    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC',
    );
    $posts = get_posts($args);
    $years = array();
    foreach ($posts as $post) {
        $year = date('Y', strtotime($post->post_date));
        if (!in_array($year, $years)) {
            $years[] = (int) $year;
        }
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