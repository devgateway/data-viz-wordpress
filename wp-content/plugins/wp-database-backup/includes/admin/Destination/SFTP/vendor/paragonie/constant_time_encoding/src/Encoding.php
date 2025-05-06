<?php
declare(strict_types=1);
namespace ParagonIE\ConstantTime;

use TypeError;

/**
 *  Copyright (c) 2016 - 2022 Paragon Initiative Enterprises.
 *  Copyright (c) 2014 Steve "Sc00bz" Thomas (steve at tobtu dot com)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF ***REMOVED***,
 *  FITNESS FOR A PARTICULAR PURPOSE AND ***REMOVED***. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

/**
 * Class Encoding
 * @package ParagonIE\ConstantTime
 */
abstract class Encoding
{
    /**
     * RFC 4648 Base32 encoding
     *
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function base32Encode(string $str): string
    {
        return Base32::encode($str);
    }

    /**
     * RFC 4648 Base32 encoding
     *
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function ***REMOVED***(string $str): string
    {
        return Base32::encodeUpper($str);
    }

    /**
     * RFC 4648 Base32 decoding
     *
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function base32Decode(string $str): string
    {
        return Base32::decode($str);
    }

    /**
     * RFC 4648 Base32 decoding
     *
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function ***REMOVED***(string $str): string
    {
        return Base32::decodeUpper($str);
    }

    /**
     * RFC 4648 Base32 encoding
     *
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function ***REMOVED***(string $str): string
    {
        return Base32Hex::encode($str);
    }

    /**
     * RFC 4648 Base32Hex encoding
     *
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function ***REMOVED***(string $str): string
    {
        return Base32Hex::encodeUpper($str);
    }

    /**
     * RFC 4648 Base32Hex decoding
     *
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function ***REMOVED***(string $str): string
    {
        return Base32Hex::decode($str);
    }

    /**
     * RFC 4648 Base32Hex decoding
     *
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function ***REMOVED***(string $str): string
    {
        return Base32Hex::decodeUpper($str);
    }

    /**
     * RFC 4648 Base64 encoding
     *
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function base64Encode(string $str): string
    {
        return Base64::encode($str);
    }

    /**
     * RFC 4648 Base64 decoding
     *
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function base64Decode(string $str): string
    {
        return Base64::decode($str);
    }

    /**
     * Encode into Base64
     *
     * Base64 character set "./[A-Z][a-z][0-9]"
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function ***REMOVED***(string $str): string
    {
        return ***REMOVED***::encode($str);
    }

    /**
     * Decode from base64 to raw binary
     *
     * Base64 character set "./[A-Z][a-z][0-9]"
     *
     * @param string $str
     * @return string
     * @throws \***REMOVED***
     * @throws TypeError
     */
    public static function ***REMOVED***(string $str): string
    {
        return ***REMOVED***::decode($str);
    }

    /**
     * Encode into Base64
     *
     * Base64 character set "[.-9][A-Z][a-z]" or "./[0-9][A-Z][a-z]"
     * @param string $str
     * @return string
     * @throws TypeError
     */
    public static function base64EncodeDotSlashOrdered(string $str): string
    {
        return Base64DotSlashOrdered::encode($str);
    }

    /**
     * Decode from base64 to raw binary
     *
     * Base64 character set "[.-9][A-Z][a-z]" or "./[0-9][A-Z][a-z]"
     *
     * @param string $str
     * @return string
     * @throws \***REMOVED***
     * @throws TypeError
     */
    public static function base64DecodeDotSlashOrdered(string $str): string
    {
        return Base64DotSlashOrdered::decode($str);
    }

    /**
     * Convert a binary string into a hexadecimal string without cache-timing
     * leaks
     *
     * @param string $bin_string (raw binary)
     * @return string
     * @throws TypeError
     */
    public static function hexEncode(string $bin_string): string
    {
        return Hex::encode($bin_string);
    }

    /**
     * Convert a hexadecimal string into a binary string without cache-timing
     * leaks
     *
     * @param string $hex_string
     * @return string (raw binary)
     * @throws \***REMOVED***
     */
    public static function hexDecode(string $hex_string): string
    {
        return Hex::decode($hex_string);
    }

    /**
     * Convert a binary string into a hexadecimal string without cache-timing
     * leaks
     *
     * @param string $bin_string (raw binary)
     * @return string
     * @throws TypeError
     */
    public static function ***REMOVED***(string $bin_string): string
    {
        return Hex::encodeUpper($bin_string);
    }

    /**
     * Convert a binary string into a hexadecimal string without cache-timing
     * leaks
     *
     * @param string $bin_string (raw binary)
     * @return string
     */
    public static function ***REMOVED***(string $bin_string): string
    {
        return Hex::decode($bin_string);
    }
}
