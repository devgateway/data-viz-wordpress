<?php

namespace YoastSEO_Vendor\GuzzleHttp\Exception;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Exception when an HTTP error occurs (4xx or 5xx error)
 */
class ***REMOVED*** extends \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***
{
    public function __construct($message, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response = null, \Exception $previous = null, array $***REMOVED*** = [])
    {
        if (null === $response) {
            @\trigger_error('Instantiating the ' . __CLASS__ . ' class without a Response is deprecated since version 6.3 and will be removed in 7.0.', \E_USER_DEPRECATED);
        }
        parent::__construct($message, $request, $response, $previous, $***REMOVED***);
    }
}
