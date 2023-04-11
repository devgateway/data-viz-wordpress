<?php

namespace YoastSEO_Vendor\WordProof\SDK\Helpers;

class ***REMOVED***
{
    /**
     * Returns public post types.
     *
     * @return array The public post types.
     */
    public static function ***REMOVED***()
    {
        return \array_values(\get_post_types(['public' => \true]));
    }
    public static function ***REMOVED***($postType)
    {
        $query = ['post_type' => [$postType], 'fields' => 'ids', 'posts_per_page' => -1, 'post_status' => ['publish', 'inherit'], 'meta_query' => [['key' => '_wordproof_blockchain_transaction', 'compare' => 'NOT EXISTS']]];
        $query = new \WP_Query($query);
        return ['count' => $query->found_posts, 'postIds' => $query->posts];
    }
}
