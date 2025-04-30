<?php

namespace YoastSEO_Vendor\GuzzleHttp\Handler;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
interface ***REMOVED***
{
    /**
     * Creates a cURL handle resource.
     *
     * @param ***REMOVED*** $request Request
     * @param array            $options Transfer options
     *
     * @throws \***REMOVED*** when an option cannot be applied
     */
    public function create(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, array $options) : \YoastSEO_Vendor\GuzzleHttp\Handler\EasyHandle;
    /**
     * Release an easy handle, allowing it to be reused or closed.
     *
     * This function must call unset on the easy handle's "handle" property.
     */
    public function release(\YoastSEO_Vendor\GuzzleHttp\Handler\EasyHandle $easy) : void;
}
