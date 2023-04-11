<?php

namespace YoastSEO_Vendor\GuzzleHttp\Exception;

use YoastSEO_Vendor\GuzzleHttp\Promise\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\UriInterface;
/**
 * HTTP Request exception
 */
class ***REMOVED*** extends \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***
{
    /** @var ***REMOVED*** */
    private $request;
    /** @var ***REMOVED***|null */
    private $response;
    /** @var array */
    private $***REMOVED***;
    public function __construct($message, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response = null, \Exception $previous = null, array $***REMOVED*** = [])
    {
        // Set the code of the exception if the response is set and not future.
        $code = $response && !$response instanceof \YoastSEO_Vendor\GuzzleHttp\Promise\***REMOVED*** ? $response->getStatusCode() : 0;
        parent::__construct($message, $code, $previous);
        $this->request = $request;
        $this->response = $response;
        $this->***REMOVED*** = $***REMOVED***;
    }
    /**
     * Wrap non-***REMOVED*** with a ***REMOVED***
     *
     * @param ***REMOVED*** $request
     * @param \Exception       $e
     *
     * @return ***REMOVED***
     */
    public static function wrapException(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \Exception $e)
    {
        return $e instanceof \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED*** ? $e : new \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***($e->getMessage(), $request, null, $e);
    }
    /**
     * Factory method to create a new exception with a normalized error message
     *
     * @param ***REMOVED***  $request  Request
     * @param ***REMOVED*** $response Response received
     * @param \Exception        $previous Previous exception
     * @param array             $ctx      Optional handler context.
     *
     * @return self
     */
    public static function create(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response = null, \Exception $previous = null, array $ctx = [])
    {
        if (!$response) {
            return new self('Error completing request', $request, null, $previous, $ctx);
        }
        $level = (int) \floor($response->getStatusCode() / 100);
        if ($level === 4) {
            $label = 'Client error';
            $className = \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***::class;
        } elseif ($level === 5) {
            $label = 'Server error';
            $className = \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***::class;
        } else {
            $label = 'Unsuccessful request';
            $className = __CLASS__;
        }
        $uri = $request->getUri();
        $uri = static::obfuscateUri($uri);
        // Client Error: `GET /` resulted in a `404 Not Found` response:
        // <html> ... (truncated)
        $message = \sprintf('%s: `%s %s` resulted in a `%s %s` response', $label, $request->getMethod(), $uri, $response->getStatusCode(), $response->***REMOVED***());
        $summary = static::getResponseBodySummary($response);
        if ($summary !== null) {
            $message .= ":\n{$summary}\n";
        }
        return new $className($message, $request, $response, $previous, $ctx);
    }
    /**
     * Get a short summary of the response
     *
     * Will return `null` if the response is not printable.
     *
     * @param ***REMOVED*** $response
     *
     * @return string|null
     */
    public static function getResponseBodySummary(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response)
    {
        return \YoastSEO_Vendor\GuzzleHttp\Psr7\get_message_body_summary($response);
    }
    /**
     * Obfuscates URI if there is a username and a password present
     *
     * @param UriInterface $uri
     *
     * @return UriInterface
     */
    private static function obfuscateUri(\YoastSEO_Vendor\Psr\Http\Message\UriInterface $uri)
    {
        $userInfo = $uri->getUserInfo();
        if (\false !== ($pos = \strpos($userInfo, ':'))) {
            return $uri->withUserInfo(\substr($userInfo, 0, $pos), '***');
        }
        return $uri;
    }
    /**
     * Get the request that caused the exception
     *
     * @return ***REMOVED***
     */
    public function getRequest()
    {
        return $this->request;
    }
    /**
     * Get the associated response
     *
     * @return ***REMOVED***|null
     */
    public function getResponse()
    {
        return $this->response;
    }
    /**
     * Check if a response was received
     *
     * @return bool
     */
    public function hasResponse()
    {
        return $this->response !== null;
    }
    /**
     * Get contextual information about the error from the underlying handler.
     *
     * The contents of this array will vary depending on which handler you are
     * using. It may also be just an empty array. Relying on this data will
     * couple you to a specific handler, but can give more debug information
     * when needed.
     *
     * @return array
     */
    public function ***REMOVED***()
    {
        return $this->***REMOVED***;
    }
}
