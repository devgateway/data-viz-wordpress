<?php

namespace YoastSEO_Vendor\GuzzleHttp;

use YoastSEO_Vendor\GuzzleHttp\Promise\***REMOVED***;
use YoastSEO_Vendor\GuzzleHttp\Promise\***REMOVED***;
use YoastSEO_Vendor\GuzzleHttp\Psr7;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Middleware that retries requests based on the boolean result of
 * invoking the provided "decider" function.
 */
class ***REMOVED***
{
    /** @var callable  */
    private $nextHandler;
    /** @var callable */
    private $decider;
    /** @var callable */
    private $delay;
    /**
     * @param callable $decider     Function that accepts the number of retries,
     *                              a request, [response], and [exception] and
     *                              returns true if the request is to be
     *                              retried.
     * @param callable $nextHandler Next handler to invoke.
     * @param callable $delay       Function that accepts the number of retries
     *                              and [response] and returns the number of
     *                              milliseconds to delay.
     */
    public function __construct(callable $decider, callable $nextHandler, callable $delay = null)
    {
        $this->decider = $decider;
        $this->nextHandler = $nextHandler;
        $this->delay = $delay ?: __CLASS__ . '::***REMOVED***';
    }
    /**
     * Default exponential backoff delay function.
     *
     * @param int $retries
     *
     * @return int milliseconds.
     */
    public static function ***REMOVED***($retries)
    {
        return (int) \pow(2, $retries - 1) * 1000;
    }
    /**
     * @param ***REMOVED*** $request
     * @param array            $options
     *
     * @return ***REMOVED***
     */
    public function __invoke(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, array $options)
    {
        if (!isset($options['retries'])) {
            $options['retries'] = 0;
        }
        $fn = $this->nextHandler;
        return $fn($request, $options)->then($this->onFulfilled($request, $options), $this->onRejected($request, $options));
    }
    /**
     * Execute fulfilled closure
     *
     * @return mixed
     */
    private function onFulfilled(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $req, array $options)
    {
        return function ($value) use($req, $options) {
            if (!\call_user_func($this->decider, $options['retries'], $req, $value, null)) {
                return $value;
            }
            return $this->doRetry($req, $options, $value);
        };
    }
    /**
     * Execute rejected closure
     *
     * @return callable
     */
    private function onRejected(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $req, array $options)
    {
        return function ($reason) use($req, $options) {
            if (!\call_user_func($this->decider, $options['retries'], $req, null, $reason)) {
                return \YoastSEO_Vendor\GuzzleHttp\Promise\rejection_for($reason);
            }
            return $this->doRetry($req, $options);
        };
    }
    /**
     * @return self
     */
    private function doRetry(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, array $options, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response = null)
    {
        $options['delay'] = \call_user_func($this->delay, ++$options['retries'], $response);
        return $this($request, $options);
    }
}
