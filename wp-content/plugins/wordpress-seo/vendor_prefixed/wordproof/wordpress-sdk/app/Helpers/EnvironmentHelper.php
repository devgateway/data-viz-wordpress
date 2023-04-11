<?php

namespace YoastSEO_Vendor\WordProof\SDK\Helpers;

use YoastSEO_Vendor\WordProof\SDK\Config\***REMOVED***;
class ***REMOVED***
{
    public static function url()
    {
        $appConfig = \YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::getAppConfig();
        if ($appConfig->***REMOVED***()) {
            return $appConfig->***REMOVED***();
        }
        return self::get('url');
    }
    public static function client()
    {
        $appConfig = \YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::getAppConfig();
        if ($appConfig->***REMOVED***()) {
            return $appConfig->***REMOVED***();
        }
        return self::get('client');
    }
    public static function sslVerify()
    {
        return !\YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::development();
    }
    public static function development()
    {
        return \YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::***REMOVED***() === 'development';
    }
    public static function get($key)
    {
        $envConfig = self::***REMOVED***();
        if ($envConfig && isset($envConfig[$key])) {
            return $envConfig[$key];
        }
        return null;
    }
    private static function ***REMOVED***()
    {
        $env = \YoastSEO_Vendor\WordProof\SDK\Helpers\***REMOVED***::***REMOVED***();
        return \YoastSEO_Vendor\WordProof\SDK\Config\***REMOVED***::get($env);
    }
}
