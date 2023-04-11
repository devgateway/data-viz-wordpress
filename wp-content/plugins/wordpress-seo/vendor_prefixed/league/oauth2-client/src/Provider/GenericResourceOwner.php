<?php

/**
 * This file is part of the league/oauth2-client library
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @copyright Copyright (c) Alex Bilbie <hello@alexbilbie.com>
 * @license http://opensource.org/licenses/MIT MIT
 * @link http://thephpleague.com/oauth2-client/ Documentation
 * @link https://packagist.org/packages/league/oauth2-client Packagist
 * @link https://github.com/thephpleague/oauth2-client GitHub
 */
namespace YoastSEO_Vendor\League\OAuth2\Client\Provider;

/**
 * Represents a generic resource owner for use with the ***REMOVED***.
 */
class ***REMOVED*** implements \YoastSEO_Vendor\League\OAuth2\Client\Provider\ResourceOwnerInterface
{
    /**
     * @var array
     */
    protected $response;
    /**
     * @var string
     */
    protected $***REMOVED***;
    /**
     * @param array $response
     * @param string $***REMOVED***
     */
    public function __construct(array $response, $***REMOVED***)
    {
        $this->response = $response;
        $this->***REMOVED*** = $***REMOVED***;
    }
    /**
     * Returns the identifier of the authorized resource owner.
     *
     * @return mixed
     */
    public function getId()
    {
        return $this->response[$this->***REMOVED***];
    }
    /**
     * Returns the raw resource owner response.
     *
     * @return array
     */
    public function toArray()
    {
        return $this->response;
    }
}
