<?php

namespace YoastSEO_Vendor\GuzzleHttp\Promise;

/**
 * Exception thrown when too many errors occur in the some() or any() methods.
 */
class ***REMOVED*** extends \YoastSEO_Vendor\GuzzleHttp\Promise\***REMOVED***
{
    public function __construct($msg, array $reasons)
    {
        parent::__construct($reasons, \sprintf('%s; %d rejected promises', $msg, \count($reasons)));
    }
}
