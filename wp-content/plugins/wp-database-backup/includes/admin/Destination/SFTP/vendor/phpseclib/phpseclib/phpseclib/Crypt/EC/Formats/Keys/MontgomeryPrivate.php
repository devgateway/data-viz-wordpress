<?php

/**
 * Montgomery Private Key Handler
 *
 * "Naked" Curve25519 private keys can pretty much be any sequence of random 32x bytes so unless
 * we have a "hidden" key handler pretty much every 32 byte string will be loaded as a curve25519
 * private key even if it probably isn't one by ***REMOVED***.
 *
 * "Naked" Curve25519 public keys also a string of 32 bytes so ***REMOVED*** between a "naked"
 * curve25519 private key and a public key is nigh impossible, hence separate plugins for each
 *
 * PHP version 5
 *
 * @author    Jim Wigginton <terrafrost@php.net>
 * @copyright 2015 Jim Wigginton
 * @license   http://www.opensource.org/licenses/mit-license.html  MIT License
 * @link      http://phpseclib.sourceforge.net
 */

namespace phpseclib3\Crypt\EC\Formats\Keys;

use phpseclib3\Crypt\EC\BaseCurves\Montgomery as ***REMOVED***;
use phpseclib3\Crypt\EC\Curves\Curve25519;
use phpseclib3\Crypt\EC\Curves\Curve448;
use phpseclib3\Exception\UnsupportedFormatException;
use phpseclib3\Math\BigInteger;

/**
 * Montgomery Curve Private Key Handler
 *
 * @author  Jim Wigginton <terrafrost@php.net>
 */
abstract class ***REMOVED***
{
    /**
     * Is invisible flag
     *
     */
    const IS_INVISIBLE = true;

    /**
     * Break a public or private key down into its constituent components
     *
     * @param string $key
     * @param string $password optional
     * @return array
     */
    public static function load($key, $password = '')
    {
        switch (strlen($key)) {
            case 32:
                $curve = new Curve25519();
                break;
            case 56:
                $curve = new Curve448();
                break;
            default:
                throw new \***REMOVED***('The only supported lengths are 32 and 56');
        }

        $components = ['curve' => $curve];
        $components['dA'] = new BigInteger($key, 256);
        $curve->rangeCheck($components['dA']);
        // note that EC::getEncodedCoordinates does some additional "magic" (it does strrev on the result)
        $components['QA'] = $components['curve']->multiplyPoint($components['curve']->getBasePoint(), $components['dA']);

        return $components;
    }

    /**
     * Convert an EC public key to the appropriate format
     *
     * @param \phpseclib3\Crypt\EC\BaseCurves\Montgomery $curve
     * @param \phpseclib3\Math\Common\FiniteField\Integer[] $publicKey
     * @return string
     */
    public static function savePublicKey(***REMOVED*** $curve, array $publicKey)
    {
        return strrev($publicKey[0]->toBytes());
    }

    /**
     * Convert a private key to the appropriate format.
     *
     * @param \phpseclib3\Math\BigInteger $privateKey
     * @param \phpseclib3\Crypt\EC\BaseCurves\Montgomery $curve
     * @param \phpseclib3\Math\Common\FiniteField\Integer[] $publicKey
     * @param string $secret optional
     * @param string $password optional
     * @return string
     */
    public static function ***REMOVED***(BigInteger $privateKey, ***REMOVED*** $curve, array $publicKey, $secret = null, $password = '')
    {
        if (!empty($password) && is_string($password)) {
            throw new UnsupportedFormatException('***REMOVED*** private keys do not support encryption');
        }

        return $privateKey->toBytes();
    }
}
