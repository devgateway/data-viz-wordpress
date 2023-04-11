<?php

namespace YoastSEO_Vendor\League\OAuth2\Client\Tool;

use YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED***;
use YoastSEO_Vendor\GuzzleHttp\Psr7\Uri;
use InvalidArgumentException;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
trait ProviderRedirectTrait
{
    /**
     * Maximum number of times to follow provider initiated redirects
     *
     * @var integer
     */
    protected $redirectLimit = 2;
    /**
     * Retrieves a response for a given request and retrieves subsequent
     * responses, with authorization headers, if a redirect is detected.
     *
     * @param  ***REMOVED*** $request
     * @return ***REMOVED***
     * @throws ***REMOVED***
     */
    protected function followRequestRedirects(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request)
    {
        $response = null;
        $attempts = 0;
        while ($attempts < $this->redirectLimit) {
            $attempts++;
            $response = $this->getHttpClient()->send($request, ['allow_redirects' => \false]);
            if ($this->isRedirect($response)) {
                $redirectUrl = new \YoastSEO_Vendor\GuzzleHttp\Psr7\Uri($response->getHeader('Location')[0]);
                $request = $request->withUri($redirectUrl);
            } else {
                break;
            }
        }
        return $response;
    }
    /**
     * Returns the HTTP client instance.
     *
     * @return GuzzleHttp\***REMOVED***
     */
    public abstract function getHttpClient();
    /**
     * Retrieves current redirect limit.
     *
     * @return integer
     */
    public function ***REMOVED***()
    {
        return $this->redirectLimit;
    }
    /**
     * Determines if a given response is a redirect.
     *
     * @param  ***REMOVED***  $response
     *
     * @return boolean
     */
    protected function isRedirect(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response)
    {
        $statusCode = $response->getStatusCode();
        return $statusCode > 300 && $statusCode < 400 && $response->hasHeader('Location');
    }
    /**
     * Sends a request instance and returns a response instance.
     *
     * WARNING: This method does not attempt to catch exceptions caused by HTTP
     * errors! It is recommended to wrap this method in a try/catch block.
     *
     * @param  ***REMOVED*** $request
     * @return ***REMOVED***
     */
    public function getResponse(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request)
    {
        try {
            $response = $this->followRequestRedirects($request);
        } catch (\YoastSEO_Vendor\GuzzleHttp\Exception\***REMOVED*** $e) {
            $response = $e->getResponse();
        }
        return $response;
    }
    /**
     * Updates the redirect limit.
     *
     * @param integer $limit
     * @return League\OAuth2\Client\Provider\***REMOVED***
     * @throws InvalidArgumentException
     */
    public function ***REMOVED***($limit)
    {
        if (!\is_int($limit)) {
            throw new \InvalidArgumentException('redirectLimit must be an integer.');
        }
        if ($limit < 1) {
            throw new \InvalidArgumentException('redirectLimit must be greater than or equal to one.');
        }
        $this->redirectLimit = $limit;
        return $this;
    }
}
