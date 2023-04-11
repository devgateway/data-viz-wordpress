<?php

namespace YoastSEO_Vendor\GuzzleHttp\Psr7;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Stream decorator that prevents a stream from being seeked.
 *
 * @final
 */
class NoSeekStream implements \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***
{
    use ***REMOVED***;
    public function seek($offset, $whence = \SEEK_SET)
    {
        throw new \***REMOVED***('Cannot seek a NoSeekStream');
    }
    public function isSeekable()
    {
        return \false;
    }
}
