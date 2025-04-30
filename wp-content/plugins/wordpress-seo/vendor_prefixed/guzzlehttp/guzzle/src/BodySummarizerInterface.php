<?php

namespace YoastSEO_Vendor\GuzzleHttp;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
interface BodySummarizerInterface
{
    /**
     * Returns a summarized message body.
     */
    public function summarize(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $message) : ?string;
}
