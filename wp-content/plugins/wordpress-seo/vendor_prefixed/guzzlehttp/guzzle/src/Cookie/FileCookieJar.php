<?php

namespace YoastSEO_Vendor\GuzzleHttp\Cookie;

use YoastSEO_Vendor\GuzzleHttp\Utils;
/**
 * Persists non-session cookies using a JSON formatted file
 */
class FileCookieJar extends \YoastSEO_Vendor\GuzzleHttp\Cookie\CookieJar
{
    /**
     * @var string filename
     */
    private $filename;
    /**
     * @var bool Control whether to persist session cookies or not.
     */
    private $***REMOVED***;
    /**
     * Create a new FileCookieJar object
     *
     * @param string $cookieFile          File to store the cookie data
     * @param bool   $***REMOVED*** Set to true to store session cookies
     *                                    in the cookie jar.
     *
     * @throws \***REMOVED*** if the file cannot be found or created
     */
    public function __construct(string $cookieFile, bool $***REMOVED*** = \false)
    {
        parent::__construct();
        $this->filename = $cookieFile;
        $this->***REMOVED*** = $***REMOVED***;
        if (\file_exists($cookieFile)) {
            $this->load($cookieFile);
        }
    }
    /**
     * Saves the file when shutting down
     */
    public function __destruct()
    {
        $this->save($this->filename);
    }
    /**
     * Saves the cookies to a file.
     *
     * @param string $filename File to save
     *
     * @throws \***REMOVED*** if the file cannot be found or created
     */
    public function save(string $filename) : void
    {
        $json = [];
        /** @var SetCookie $cookie */
        foreach ($this as $cookie) {
            if (\YoastSEO_Vendor\GuzzleHttp\Cookie\CookieJar::shouldPersist($cookie, $this->***REMOVED***)) {
                $json[] = $cookie->toArray();
            }
        }
        $jsonStr = \YoastSEO_Vendor\GuzzleHttp\Utils::jsonEncode($json);
        if (\false === \file_put_contents($filename, $jsonStr, \LOCK_EX)) {
            throw new \***REMOVED***("Unable to save file {$filename}");
        }
    }
    /**
     * Load cookies from a JSON formatted file.
     *
     * Old cookies are kept unless overwritten by newly loaded ones.
     *
     * @param string $filename Cookie file to load.
     *
     * @throws \***REMOVED*** if the file cannot be loaded.
     */
    public function load(string $filename) : void
    {
        $json = \file_get_contents($filename);
        if (\false === $json) {
            throw new \***REMOVED***("Unable to load file {$filename}");
        }
        if ($json === '') {
            return;
        }
        $data = \YoastSEO_Vendor\GuzzleHttp\Utils::jsonDecode($json, \true);
        if (\is_array($data)) {
            foreach ($data as $cookie) {
                $this->setCookie(new \YoastSEO_Vendor\GuzzleHttp\Cookie\SetCookie($cookie));
            }
        } elseif (\is_scalar($data) && !empty($data)) {
            throw new \***REMOVED***("Invalid cookie file: {$filename}");
        }
    }
}
