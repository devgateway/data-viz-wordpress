<?php

namespace YoastSEO_Vendor\GuzzleHttp\Cookie;

/**
 * Persists cookies in the client session
 */
class ***REMOVED*** extends \YoastSEO_Vendor\GuzzleHttp\Cookie\CookieJar
{
    /**
     * @var string session key
     */
    private $sessionKey;
    /**
     * @var bool Control whether to persist session cookies or not.
     */
    private $***REMOVED***;
    /**
     * Create a new ***REMOVED*** object
     *
     * @param string $sessionKey          Session key name to store the cookie
     *                                    data in session
     * @param bool   $***REMOVED*** Set to true to store session cookies
     *                                    in the cookie jar.
     */
    public function __construct(string $sessionKey, bool $***REMOVED*** = \false)
    {
        parent::__construct();
        $this->sessionKey = $sessionKey;
        $this->***REMOVED*** = $***REMOVED***;
        $this->load();
    }
    /**
     * Saves cookies to session when shutting down
     */
    public function __destruct()
    {
        $this->save();
    }
    /**
     * Save cookies to the client session
     */
    public function save() : void
    {
        $json = [];
        /** @var SetCookie $cookie */
        foreach ($this as $cookie) {
            if (\YoastSEO_Vendor\GuzzleHttp\Cookie\CookieJar::shouldPersist($cookie, $this->***REMOVED***)) {
                $json[] = $cookie->toArray();
            }
        }
        $_SESSION[$this->sessionKey] = \json_encode($json);
    }
    /**
     * Load the contents of the client session into the data array
     */
    protected function load() : void
    {
        if (!isset($_SESSION[$this->sessionKey])) {
            return;
        }
        $data = \json_decode($_SESSION[$this->sessionKey], \true);
        if (\is_array($data)) {
            foreach ($data as $cookie) {
                $this->setCookie(new \YoastSEO_Vendor\GuzzleHttp\Cookie\SetCookie($cookie));
            }
        } elseif (\strlen($data)) {
            throw new \***REMOVED***('Invalid cookie data');
        }
    }
}
