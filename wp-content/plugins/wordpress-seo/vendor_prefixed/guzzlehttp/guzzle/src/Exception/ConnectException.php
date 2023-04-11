<?php

namespace YoastSEO_Vendor\GuzzleHttp\Exception;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Exception thrown when a connection cannot be established.
 *
 * Note that no response is present for a ***REMOVED***
 */
class ***REMOVED*** extends \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***
{
    public function __construct($message, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \Exception $previous = null, array $***REMOVED*** = [])
    {
        parent::__construct($message, $request, null, $previous, $***REMOVED***);
    }
    /**
     * @return null
     */
    public function getResponse()
    {
        return null;
    }
    /**
     * @return bool
     */
    public function hasResponse()
    {
        return \false;
    }
}
