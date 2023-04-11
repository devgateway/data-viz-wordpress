<?php

namespace YoastSEO_Vendor\GuzzleHttp;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\UriInterface;
/**
 * Represents data at the point after it was transferred either successfully
 * or after a network error.
 */
final class TransferStats
{
    private $request;
    private $response;
    private $transferTime;
    private $handlerStats;
    private $***REMOVED***;
    /**
     * @param ***REMOVED***       $request          Request that was sent.
     * @param ***REMOVED***|null $response         Response received (if any)
     * @param float|null             $transferTime     Total handler transfer time.
     * @param mixed                  $***REMOVED*** Handler error data.
     * @param array                  $handlerStats     Handler specific stats.
     */
    public function __construct(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response = null, $transferTime = null, $***REMOVED*** = null, $handlerStats = [])
    {
        $this->request = $request;
        $this->response = $response;
        $this->transferTime = $transferTime;
        $this->***REMOVED*** = $***REMOVED***;
        $this->handlerStats = $handlerStats;
    }
    /**
     * @return ***REMOVED***
     */
    public function getRequest()
    {
        return $this->request;
    }
    /**
     * Returns the response that was received (if any).
     *
     * @return ***REMOVED***|null
     */
    public function getResponse()
    {
        return $this->response;
    }
    /**
     * Returns true if a response was received.
     *
     * @return bool
     */
    public function hasResponse()
    {
        return $this->response !== null;
    }
    /**
     * Gets handler specific error data.
     *
     * This might be an exception, a integer representing an error code, or
     * anything else. Relying on this value assumes that you know what handler
     * you are using.
     *
     * @return mixed
     */
    public function ***REMOVED***()
    {
        return $this->***REMOVED***;
    }
    /**
     * Get the effective URI the request was sent to.
     *
     * @return UriInterface
     */
    public function ***REMOVED***()
    {
        return $this->request->getUri();
    }
    /**
     * Get the estimated time the request was being transferred by the handler.
     *
     * @return float|null Time in seconds.
     */
    public function ***REMOVED***()
    {
        return $this->transferTime;
    }
    /**
     * Gets an array of all of the handler specific transfer data.
     *
     * @return array
     */
    public function ***REMOVED***()
    {
        return $this->handlerStats;
    }
    /**
     * Get a specific handler statistic from the handler by name.
     *
     * @param string $stat Handler specific transfer stat to retrieve.
     *
     * @return mixed|null
     */
    public function ***REMOVED***($stat)
    {
        return isset($this->handlerStats[$stat]) ? $this->handlerStats[$stat] : null;
    }
}
