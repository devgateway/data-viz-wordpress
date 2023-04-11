<?php

namespace YoastSEO_Vendor\GuzzleHttp\Handler;

use YoastSEO_Vendor\GuzzleHttp\Psr7\Response;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Represents a cURL easy handle and the data it populates.
 *
 * @internal
 */
final class EasyHandle
{
    /** @var resource cURL resource */
    public $handle;
    /** @var ***REMOVED*** Where data is being written */
    public $sink;
    /** @var array Received HTTP headers so far */
    public $headers = [];
    /** @var ***REMOVED*** Received response (if any) */
    public $response;
    /** @var ***REMOVED*** Request being sent */
    public $request;
    /** @var array Request options */
    public $options = [];
    /** @var int cURL error number (if any) */
    public $errno = 0;
    /** @var \Exception Exception during on_headers (if any) */
    public $***REMOVED***;
    /**
     * Attach a response to the easy handle based on the received headers.
     *
     * @throws \***REMOVED*** if no headers have been received.
     */
    public function ***REMOVED***()
    {
        if (empty($this->headers)) {
            throw new \***REMOVED***('No headers have been received');
        }
        // HTTP-version SP status-code SP reason-phrase
        $startLine = \explode(' ', \array_shift($this->headers), 3);
        $headers = \YoastSEO_Vendor\GuzzleHttp\headers_from_lines($this->headers);
        $***REMOVED*** = \YoastSEO_Vendor\GuzzleHttp\normalize_header_keys($headers);
        if (!empty($this->options['decode_content']) && isset($***REMOVED***['content-encoding'])) {
            $headers['x-encoded-content-encoding'] = $headers[$***REMOVED***['content-encoding']];
            unset($headers[$***REMOVED***['content-encoding']]);
            if (isset($***REMOVED***['content-length'])) {
                $headers['x-encoded-content-length'] = $headers[$***REMOVED***['content-length']];
                $bodyLength = (int) $this->sink->getSize();
                if ($bodyLength) {
                    $headers[$***REMOVED***['content-length']] = $bodyLength;
                } else {
                    unset($headers[$***REMOVED***['content-length']]);
                }
            }
        }
        // Attach a response to the easy handle with the parsed headers.
        $this->response = new \YoastSEO_Vendor\GuzzleHttp\Psr7\Response($startLine[1], $headers, $this->sink, \substr($startLine[0], 5), isset($startLine[2]) ? (string) $startLine[2] : null);
    }
    public function __get($name)
    {
        $msg = $name === 'handle' ? 'The EasyHandle has been released' : 'Invalid property: ' . $name;
        throw new \BadMethodCallException($msg);
    }
}
