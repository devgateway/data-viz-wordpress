<?php

namespace YoastSEO_Vendor\GuzzleHttp\Exception;

use YoastSEO_Vendor\GuzzleHttp\***REMOVED***;
use YoastSEO_Vendor\GuzzleHttp\BodySummarizerInterface;
use YoastSEO_Vendor\Psr\Http\Client\RequestExceptionInterface;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\UriInterface;
/**
 * HTTP Request exception
 */
class ***REMOVED*** extends \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED*** implements \YoastSEO_Vendor\Psr\Http\Client\RequestExceptionInterface
{
    /**
     * @var ***REMOVED***
     */
    private $request;
    /**
     * @var ***REMOVED***|null
     */
    private $response;
    /**
     * @var array
     */
    private $***REMOVED***;
    public function __construct(string $message, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response = null, \Throwable $previous = null, array $***REMOVED*** = [])
    {
        // Set the code of the exception if the response is set and not future.
        $code = $response ? $response->getStatusCode() : 0;
        parent::__construct($message, $code, $previous);
        $this->request = $request;
        $this->response = $response;
        $this->***REMOVED*** = $***REMOVED***;
    }
    /**
     * Wrap non-***REMOVED*** with a ***REMOVED***
     */
    public static function wrapException(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \Throwable $e) : \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***
    {
        return $e instanceof \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED*** ? $e : new \YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***($e->getMessage(), $request, null, $e);
    }
    /**
     * Factory method to create a new exception with a normalized error message
     *
     * @param ***REMOVED***             $request        Request sent
     * @param ***REMOVED***            $response       Response received
     * @param \Throwable|null              $previous       Previous exception
     * @param array                        $***REMOVED*** Optional handler context
     * @param BodySummarizerInterface|null $***REMOVED*** Optional body summarizer
     */
    public static function create(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response = null, \Throwable $previous = null, array $***REMOVED*** = [], \YoastSEO_Vendor\GuzzleHttp\BodySummarizerInterface $***REMOVED*** = null) : self
    {
        if (!$response) {
            return new self('Error completing request', $request, null, $previous, $***REMOVED***);
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
        $message = \sprintf('%s: `%s %s` resulted in a `%s %s` response', $label, $request->getMethod(), $uri->__toString(), $response->getStatusCode(), $response->***REMOVED***());
        $summary = ($***REMOVED*** ?? new \YoastSEO_Vendor\GuzzleHttp\***REMOVED***())->summarize($response);
        if ($summary !== null) {
            $message .= ":\n{$summary}\n";
        }
        return new $className($message, $request, $response, $previous, $***REMOVED***);
    }
    /**
     * Obfuscates URI if there is a username and a password present
     */
    private static function obfuscateUri(\YoastSEO_Vendor\Psr\Http\Message\UriInterface $uri) : \YoastSEO_Vendor\Psr\Http\Message\UriInterface
    {
        $userInfo = $uri->getUserInfo();
        if (\false !== ($pos = \strpos($userInfo, ':'))) {
            return $uri->withUserInfo(\substr($userInfo, 0, $pos), '***');
        }
        return $uri;
    }
    /**
     * Get the request that caused the exception
     */
    public function getRequest() : \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***
    {
        return $this->request;
    }
    /**
     * Get the associated response
     */
    public function getResponse() : ?\YoastSEO_Vendor\Psr\Http\Message\***REMOVED***
    {
        return $this->response;
    }
    /**
     * Check if a response was received
     */
    public function hasResponse() : bool
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
     */
    public function ***REMOVED***() : array
    {
        return $this->***REMOVED***;
    }
}
