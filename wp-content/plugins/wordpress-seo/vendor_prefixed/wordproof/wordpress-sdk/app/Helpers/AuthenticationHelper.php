<?php

namespace YoastSEO_Vendor\WordProof\SDK\Helpers;

class ***REMOVED***
{
    /**
     * Removes all the options set by WordProof.
     *
     * @return void
     */
    public static function logout()
    {
        \YoastSEO_Vendor\WordProof\SDK\Helpers\OptionsHelper::***REMOVED***();
    }
    /**
     * Returns if the user is authenticated.
     *
     * @return bool If the user is authenticated.
     */
    public static function ***REMOVED***()
    {
        $options = \YoastSEO_Vendor\WordProof\SDK\Helpers\OptionsHelper::all();
        return $options->access_token && $options->source_id;
    }
}
