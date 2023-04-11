<?php

namespace YoastSEO_Vendor\WordProof\SDK\Support;

use YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***;
use YoastSEO_Vendor\WordProof\SDK\Helpers\OptionsHelper;
use YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***;
class Timestamp
{
    /**
     * @param array $data
     *
     * @return mixed
     */
    public static function ***REMOVED***($data)
    {
        $sourceId = \YoastSEO_Vendor\WordProof\SDK\Helpers\OptionsHelper::sourceId();
        $endpoint = '/api/sources/' . $sourceId . '/timestamps';
        $response = \YoastSEO_Vendor\WordProof\SDK\Support\Api::post($endpoint, $data);
        if (!$response || !isset($response->hash)) {
            //            ***REMOVED***::logout(); // TODO Only if response is ***REMOVED***
            return \false;
        }
        if (isset($response->balance)) {
            \YoastSEO_Vendor\WordProof\SDK\Helpers\OptionsHelper::set('balance', $response->balance);
        }
        $key = '_wordproof_hash_input_' . $response->hash;
        \YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::update($data['uid'], $key, \json_decode($response->hash_input));
        return $response;
    }
}
