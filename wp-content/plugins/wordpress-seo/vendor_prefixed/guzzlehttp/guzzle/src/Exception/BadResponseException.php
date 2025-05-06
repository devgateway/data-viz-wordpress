<?php

namespace YoastSEO_Vendor\GuzzleHttp\Exception;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Exception when an HTTP error occurs (4xx or 5xx error)
 */
class ***REMOVED*** extends \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***
{
    public function __construct(string $message, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response, \Throwable $previous = null, array $***REMOVED*** = [])
    {
        parent::__construct($message, $request, $response, $previous, $***REMOVED***);
    }
    /**
     * Current exception and the ones that extend it will always have a response.
     */
    public function hasResponse() : bool
    {
        return \true;
    }
    /**
     * This function narrows the return type from the parent class and does not allow it to be nullable.
     */
    public function getResponse() : \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***
    {
        /** @var ***REMOVED*** */
        return parent::getResponse();
    }
}
