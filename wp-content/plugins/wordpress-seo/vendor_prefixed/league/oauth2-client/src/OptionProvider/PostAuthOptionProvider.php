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
namespace YoastSEO_Vendor\League\OAuth2\Client\***REMOVED***;

use YoastSEO_Vendor\League\OAuth2\Client\Provider\***REMOVED***;
use YoastSEO_Vendor\League\OAuth2\Client\Tool\***REMOVED***;
/**
 * Provide options for access token
 */
class PostAuthOptionProvider implements \YoastSEO_Vendor\League\OAuth2\Client\***REMOVED***\OptionProviderInterface
{
    use ***REMOVED***;
    /**
     * @inheritdoc
     */
    public function getAccessTokenOptions($method, array $params)
    {
        $options = ['headers' => ['content-type' => 'application/x-www-form-urlencoded']];
        if ($method === \YoastSEO_Vendor\League\OAuth2\Client\Provider\***REMOVED***::METHOD_POST) {
            $options['body'] = $this->***REMOVED***($params);
        }
        return $options;
    }
    /**
     * Returns the request body for requesting an access token.
     *
     * @param  array $params
     * @return string
     */
    protected function ***REMOVED***(array $params)
    {
        return $this->***REMOVED***($params);
    }
}
