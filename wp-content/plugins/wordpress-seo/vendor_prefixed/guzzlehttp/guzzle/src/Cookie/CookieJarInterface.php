<?php

namespace YoastSEO_Vendor\GuzzleHttp\Cookie;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Stores HTTP cookies.
 *
 * It extracts cookies from HTTP requests, and returns them in HTTP responses.
 * ***REMOVED*** instances automatically expire contained cookies when
 * necessary. Subclasses are also responsible for storing and retrieving
 * cookies from a file, database, etc.
 *
 * @link http://docs.python.org/2/library/cookielib.html Inspiration
 */
interface ***REMOVED*** extends \Countable, \***REMOVED***
{
    /**
     * Create a request with added cookie headers.
     *
     * If no matching cookies are found in the cookie jar, then no Cookie
     * header is added to the request and the same request is returned.
     *
     * @param ***REMOVED*** $request Request object to modify.
     *
     * @return ***REMOVED*** returns the modified request.
     */
    public function ***REMOVED***(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request);
    /**
     * Extract cookies from an HTTP response and store them in the CookieJar.
     *
     * @param ***REMOVED***  $request  Request that was sent
     * @param ***REMOVED*** $response Response that was received
     */
    public function ***REMOVED***(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $request, \YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $response);
    /**
     * Sets a cookie in the cookie jar.
     *
     * @param SetCookie $cookie Cookie to set.
     *
     * @return bool Returns true on success or false on failure
     */
    public function setCookie(\YoastSEO_Vendor\GuzzleHttp\Cookie\SetCookie $cookie);
    /**
     * Remove cookies currently held in the cookie jar.
     *
     * Invoking this method without arguments will empty the whole cookie jar.
     * If given a $domain argument only cookies belonging to that domain will
     * be removed. If given a $domain and $path argument, cookies belonging to
     * the specified path within that domain are removed. If given all three
     * arguments, then the cookie with the specified name, path and domain is
     * removed.
     *
     * @param string|null $domain Clears cookies matching a domain
     * @param string|null $path   Clears cookies matching a domain and path
     * @param string|null $name   Clears cookies matching a domain, path, and name
     *
     * @return ***REMOVED***
     */
    public function clear($domain = null, $path = null, $name = null);
    /**
     * Discard all sessions cookies.
     *
     * Removes cookies that don't have an expire field or a have a discard
     * field set to true. To be called when the user agent shuts down according
     * to RFC 2965.
     */
    public function ***REMOVED***();
    /**
     * Converts the cookie jar to an array.
     *
     * @return array
     */
    public function toArray();
}
