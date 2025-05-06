<?php

namespace YoastSEO_Vendor\GuzzleHttp;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
interface MessageFormatterInterface
{
    /**
     * Returns a formatted message string.
     *
     * @param ***REMOVED***       $request  Request that was sent
     * @param ***REMOVED***|null $response Response that was received
     * @param \Throwable|null        $error    Exception that was received
     */
    public function format(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response = null, \Throwable $error = null) : string;
}
