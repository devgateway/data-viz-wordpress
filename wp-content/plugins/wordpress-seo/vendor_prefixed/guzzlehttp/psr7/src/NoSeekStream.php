<?php

declare (strict_types=1);
namespace YoastSEO_Vendor\GuzzleHttp\Psr7;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Stream decorator that prevents a stream from being seeked.
 */
final class NoSeekStream implements \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***
{
    use ***REMOVED***;
    /** @var ***REMOVED*** */
    private $stream;
    public function seek($offset, $whence = \SEEK_SET) : void
    {
        throw new \***REMOVED***('Cannot seek a NoSeekStream');
    }
    public function isSeekable() : bool
    {
        return \false;
    }
}
