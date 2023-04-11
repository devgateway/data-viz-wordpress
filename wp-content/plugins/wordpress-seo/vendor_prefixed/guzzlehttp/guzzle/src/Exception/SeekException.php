<?php

namespace YoastSEO_Vendor\GuzzleHttp\Exception;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Exception thrown when a seek fails on a stream.
 */
class SeekException extends \***REMOVED*** implements \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***
{
    private $stream;
    public function __construct(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $stream, $pos = 0, $msg = '')
    {
        $this->stream = $stream;
        $msg = $msg ?: 'Could not seek the stream to position ' . $pos;
        parent::__construct($msg);
    }
    /**
     * @return ***REMOVED***
     */
    public function getStream()
    {
        return $this->stream;
    }
}
