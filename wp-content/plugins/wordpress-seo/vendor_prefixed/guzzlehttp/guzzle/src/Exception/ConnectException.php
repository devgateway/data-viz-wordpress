<?php

namespace YoastSEO_Vendor\GuzzleHttp\Exception;

use YoastSEO_Vendor\Psr\Http\Client\NetworkExceptionInterface;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Exception thrown when a connection cannot be established.
 *
 * Note that no response is present for a ***REMOVED***
 */
class ***REMOVED*** extends \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED*** implements \YoastSEO_Vendor\Psr\Http\Client\NetworkExceptionInterface
{
    /**
     * @var ***REMOVED***
     */
    private $request;
    /**
     * @var array
     */
    private $***REMOVED***;
    public function __construct(string $message, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \Throwable $previous = null, array $***REMOVED*** = [])
    {
        parent::__construct($message, 0, $previous);
        $this->request = $request;
        $this->***REMOVED*** = $***REMOVED***;
    }
    /**
     * Get the request that caused the exception
     */
    public function getRequest() : \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***
    {
        return $this->request;
    }
    /**
     * Get contextual information about the error from the underlying handler.
     *
     * The contents of this array will vary depending on which handler you are
     * using. It may also be just an empty array. Relying on this data will
     * couple you to a specific handler, but can give more debug information
     * when needed.
     */
    public function ***REMOVED***() : array
    {
        return $this->***REMOVED***;
    }
}
