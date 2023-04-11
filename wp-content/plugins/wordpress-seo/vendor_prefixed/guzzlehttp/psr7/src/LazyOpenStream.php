<?php

namespace YoastSEO_Vendor\GuzzleHttp\Psr7;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Lazily reads or writes to a file that is opened only after an IO operation
 * take place on the stream.
 *
 * @final
 */
class ***REMOVED*** implements \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***
{
    use ***REMOVED***;
    /** @var string File to open */
    private $filename;
    /** @var string */
    private $mode;
    /**
     * @param string $filename File to lazily open
     * @param string $mode     fopen mode to use when opening the stream
     */
    public function __construct($filename, $mode)
    {
        $this->filename = $filename;
        $this->mode = $mode;
    }
    /**
     * Creates the underlying stream lazily when required.
     *
     * @return ***REMOVED***
     */
    protected function createStream()
    {
        return \YoastSEO_Vendor\GuzzleHttp\Psr7\Utils::streamFor(\YoastSEO_Vendor\GuzzleHttp\Psr7\Utils::tryFopen($this->filename, $this->mode));
    }
}
