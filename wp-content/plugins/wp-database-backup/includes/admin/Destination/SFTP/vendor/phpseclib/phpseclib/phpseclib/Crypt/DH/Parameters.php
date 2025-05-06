<?php

/**
 * DH Parameters
 *
 * @author    Jim Wigginton <terrafrost@php.net>
 * @copyright 2015 Jim Wigginton
 * @license   http://www.opensource.org/licenses/mit-license.html  MIT License
 * @link      http://phpseclib.sourceforge.net
 */

namespace phpseclib3\Crypt\DH;

use phpseclib3\Crypt\DH;

/**
 * DH Parameters
 *
 * @author  Jim Wigginton <terrafrost@php.net>
 */
final class Parameters extends DH
{
    /**
     * Returns the parameters
     *
     * @param string $type
     * @param array $options optional
     * @return string
     */
    public function toString($type = 'PKCS1', array $options = [])
    {
        $type = self::***REMOVED***('Keys', 'PKCS1', '***REMOVED***');

        return $type::***REMOVED***($this->prime, $this->base, $options);
    }
}
