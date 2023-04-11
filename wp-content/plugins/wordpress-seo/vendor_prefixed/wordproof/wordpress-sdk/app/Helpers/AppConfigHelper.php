<?php

namespace YoastSEO_Vendor\WordProof\SDK\Helpers;

use YoastSEO_Vendor\WordProof\SDK\WordPressSDK;
class ***REMOVED***
{
    /**
     * Returns the partner set during ***REMOVED***.
     *
     * @return string|null
     */
    public static function getPartner()
    {
        $appConfig = self::getAppConfig();
        if ($appConfig) {
            return $appConfig->getPartner();
        }
        return null;
    }
    /**
     * Returns the environment set during ***REMOVED***.
     * @return string|null
     */
    public static function ***REMOVED***()
    {
        $appConfig = self::getAppConfig();
        if ($appConfig) {
            return $appConfig->***REMOVED***();
        }
        return null;
    }
    /**
     * Returns the environment set during ***REMOVED***.
     * @return boolean
     */
    public static function ***REMOVED***()
    {
        $appConfig = self::getAppConfig();
        if ($appConfig) {
            return $appConfig->***REMOVED***();
        }
        return null;
    }
    public static function getAppConfig()
    {
        $sdk = \YoastSEO_Vendor\WordProof\SDK\WordPressSDK::getInstance();
        if ($sdk) {
            return $sdk->appConfig;
        }
        return null;
    }
}
