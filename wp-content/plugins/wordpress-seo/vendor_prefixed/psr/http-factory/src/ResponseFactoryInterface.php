<?php

namespace YoastSEO_Vendor\Psr\Http\Message;

interface ResponseFactoryInterface
{
    /**
     * Create a new response.
     *
     * @param int $code HTTP status code; defaults to 200
     * @param string $reasonPhrase Reason phrase to associate with status code
     *     in generated response; if none is provided ***REMOVED*** MAY use
     *     the defaults as suggested in the HTTP specification.
     *
     * @return ***REMOVED***
     */
    public function ***REMOVED***(int $code = 200, string $reasonPhrase = '') : \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
}
