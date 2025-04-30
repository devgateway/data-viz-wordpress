<?php

namespace YoastSEO_Vendor\GuzzleHttp;

use YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***;
use YoastSEO_Vendor\GuzzleHttp\Promise\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\UriInterface;
/**
 * Client interface for sending HTTP requests.
 */
interface ***REMOVED***
{
    /**
     * The Guzzle major version.
     */
    public const MAJOR_VERSION = 7;
    /**
     * Send an HTTP request.
     *
     * @param ***REMOVED*** $request Request to send
     * @param array            $options Request options to apply to the given
     *                                  request and to the transfer.
     *
     * @throws ***REMOVED***
     */
    public function send(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, array $options = []) : \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
    /**
     * ***REMOVED*** send an HTTP request.
     *
     * @param ***REMOVED*** $request Request to send
     * @param array            $options Request options to apply to the given
     *                                  request and to the transfer.
     */
    public function sendAsync(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, array $options = []) : \YoastSEO_Vendor\GuzzleHttp\Promise\***REMOVED***;
    /**
     * Create and send an HTTP request.
     *
     * Use an absolute path to override the base path of the client, or a
     * relative path to append to the base path of the client. The URL can
     * contain the query string as well.
     *
     * @param string              $method  HTTP method.
     * @param string|UriInterface $uri     URI object or string.
     * @param array               $options Request options to apply.
     *
     * @throws ***REMOVED***
     */
    public function request(string $method, $uri, array $options = []) : \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
    /**
     * Create and send an asynchronous HTTP request.
     *
     * Use an absolute path to override the base path of the client, or a
     * relative path to append to the base path of the client. The URL can
     * contain the query string as well. Use an array to provide a URL
     * template and additional variables to use in the URL template expansion.
     *
     * @param string              $method  HTTP method
     * @param string|UriInterface $uri     URI object or string.
     * @param array               $options Request options to apply.
     */
    public function requestAsync(string $method, $uri, array $options = []) : \YoastSEO_Vendor\GuzzleHttp\Promise\***REMOVED***;
    /**
     * Get a client configuration option.
     *
     * These options include default request options of the client, a "handler"
     * (if utilized by the concrete client), and a "base_uri" if utilized by
     * the concrete client.
     *
     * @param string|null $option The config option to retrieve.
     *
     * @return mixed
     *
     * @deprecated ***REMOVED***::getConfig will be removed in guzzlehttp/guzzle:8.0.
     */
    public function getConfig(string $option = null);
}
