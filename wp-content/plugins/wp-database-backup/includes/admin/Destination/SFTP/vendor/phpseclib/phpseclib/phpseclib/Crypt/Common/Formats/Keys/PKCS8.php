<?php

/**
 * PKCS#8 Formatted Key Handler
 *
 * PHP version 5
 *
 * Used by PHP's openssl_public_encrypt() and openssl's rsautl (when -pubin is set)
 *
 * Processes keys with the following headers:
 *
 * -----BEGIN ENCRYPTED PRIVATE KEY-----
 * -----BEGIN PRIVATE KEY-----
 * -----BEGIN PUBLIC KEY-----
 *
 * Analogous to ssh-keygen's pkcs8 format (as specified by -m). Although PKCS8
 * is specific to private keys it's basically creating a DER-encoded wrapper
 * for keys. This just extends that same concept to public keys (much like ssh-keygen)
 *
 * @author    Jim Wigginton <terrafrost@php.net>
 * @copyright 2015 Jim Wigginton
 * @license   http://www.opensource.org/licenses/mit-license.html  MIT License
 * @link      http://phpseclib.sourceforge.net
 */

namespace phpseclib3\Crypt\Common\Formats\Keys;

use phpseclib3\Common\Functions\Strings;
use phpseclib3\Crypt\AES;
use phpseclib3\Crypt\DES;
use phpseclib3\Crypt\Random;
use phpseclib3\Crypt\RC2;
use phpseclib3\Crypt\RC4;
use phpseclib3\Crypt\TripleDES;
use phpseclib3\Exception\InsufficientSetupException;
use phpseclib3\Exception\UnsupportedAlgorithmException;
use phpseclib3\File\ASN1;
use phpseclib3\File\ASN1\Maps;

/**
 * PKCS#8 Formatted Key Handler
 *
 * @author  Jim Wigginton <terrafrost@php.net>
 */
abstract class PKCS8 extends PKCS
{
    /**
     * Default encryption algorithm
     *
     * @var string
     */
    private static $defaultEncryptionAlgorithm = 'id-PBES2';

    /**
     * Default encryption scheme
     *
     * Only used when defaultEncryptionAlgorithm is id-PBES2
     *
     * @var string
     */
    private static $defaultEncryptionScheme = 'aes128-CBC-PAD';

    /**
     * Default PRF
     *
     * Only used when defaultEncryptionAlgorithm is id-PBES2
     *
     * @var string
     */
    private static $defaultPRF = 'id-***REMOVED***';

    /**
     * Default Iteration Count
     *
     * @var int
     */
    private static $defaultIterationCount = 2048;

    /**
     * OIDs loaded
     *
     * @var bool
     */
    private static $oidsLoaded = false;

    /**
     * Sets the default encryption algorithm
     *
     * @param string $algo
     */
    public static function setEncryptionAlgorithm($algo)
    {
        self::$defaultEncryptionAlgorithm = $algo;
    }

    /**
     * Sets the default encryption algorithm for PBES2
     *
     * @param string $algo
     */
    public static function ***REMOVED***($algo)
    {
        self::$defaultEncryptionScheme = $algo;
    }

    /**
     * Sets the iteration count
     *
     * @param int $count
     */
    public static function ***REMOVED***($count)
    {
        self::$defaultIterationCount = $count;
    }

    /**
     * Sets the PRF for PBES2
     *
     * @param string $algo
     */
    public static function setPRF($algo)
    {
        self::$defaultPRF = $algo;
    }

    /**
     * Returns a SymmetricKey object based on a PBES1 $algo
     *
     * @return \phpseclib3\Crypt\Common\SymmetricKey
     * @param string $algo
     */
    private static function getPBES1EncryptionObject($algo)
    {
        $algo = preg_match('#^pbeWith(?:MD2|MD5|SHA1|SHA)And(.*?)-CBC$#', $algo, $matches) ?
            $matches[1] :
            substr($algo, 13); // strlen('pbeWithSHAAnd') == 13

        switch ($algo) {
            case 'DES':
                $cipher = new DES('cbc');
                break;
            case 'RC2':
                $cipher = new RC2('cbc');
                $cipher->setKeyLength(64);
                break;
            case '3-KeyTripleDES':
                $cipher = new TripleDES('cbc');
                break;
            case '2-KeyTripleDES':
                $cipher = new TripleDES('cbc');
                $cipher->setKeyLength(128);
                break;
            case '128BitRC2':
                $cipher = new RC2('cbc');
                $cipher->setKeyLength(128);
                break;
            case '40BitRC2':
                $cipher = new RC2('cbc');
                $cipher->setKeyLength(40);
                break;
            case '128BitRC4':
                $cipher = new RC4();
                $cipher->setKeyLength(128);
                break;
            case '40BitRC4':
                $cipher = new RC4();
                $cipher->setKeyLength(40);
                break;
            default:
                throw new UnsupportedAlgorithmException("$algo is not a supported algorithm");
        }

        return $cipher;
    }

    /**
     * Returns a hash based on a PBES1 $algo
     *
     * @return string
     * @param string $algo
     */
    private static function getPBES1Hash($algo)
    {
        if (preg_match('#^pbeWith(MD2|MD5|SHA1|SHA)And.*?-CBC$#', $algo, $matches)) {
            return $matches[1] == 'SHA' ? 'sha1' : $matches[1];
        }

        return 'sha1';
    }

    /**
     * Returns a KDF baesd on a PBES1 $algo
     *
     * @return string
     * @param string $algo
     */
    private static function getPBES1KDF($algo)
    {
        switch ($algo) {
            case '***REMOVED***-CBC':
            case '***REMOVED***-CBC':
            case '***REMOVED***-CBC':
            case '***REMOVED***-CBC':
            case '***REMOVED***-CBC':
            case '***REMOVED***-CBC':
                return 'pbkdf1';
        }

        return 'pkcs12';
    }

    /**
     * Returns a SymmetricKey object baesd on a PBES2 $algo
     *
     * @return SymmetricKey
     * @param string $algo
     */
    private static function getPBES2EncryptionObject($algo)
    {
        switch ($algo) {
            case 'desCBC':
                $cipher = new DES('cbc');
                break;
            case 'des-EDE3-CBC':
                $cipher = new TripleDES('cbc');
                break;
            case 'rc2CBC':
                $cipher = new RC2('cbc');
                // in theory this can be changed
                $cipher->setKeyLength(128);
                break;
            case 'rc5-CBC-PAD':
                throw new UnsupportedAlgorithmException('rc5-CBC-PAD is not supported for PBES2 PKCS#8 keys');
            case 'aes128-CBC-PAD':
            case 'aes192-CBC-PAD':
            case 'aes256-CBC-PAD':
                $cipher = new AES('cbc');
                $cipher->setKeyLength(substr($algo, 3, 3));
                break;
            default:
                throw new UnsupportedAlgorithmException("$algo is not supported");
        }

        return $cipher;
    }

    /**
     * Initialize static variables
     *
     */
    private static function initialize_static_variables()
    {
        if (!isset(static::$***REMOVED***)) {
            throw new InsufficientSetupException('This class should not be called directly');
        }

        if (!static::$***REMOVED***) {
            ASN1::loadOIDs(is_array(static::OID_NAME) ?
                array_combine(static::OID_NAME, static::OID_VALUE) :
                [static::OID_NAME => static::OID_VALUE]);
            static::$***REMOVED*** = true;
        }
        if (!self::$oidsLoaded) {
            // from https://tools.ietf.org/html/rfc2898
            ASN1::loadOIDs([
               // PBES1 encryption schemes
               '***REMOVED***-CBC' => '1.2.840.113549.1.5.1',
               '***REMOVED***-CBC' => '1.2.840.113549.1.5.4',
               '***REMOVED***-CBC' => '1.2.840.113549.1.5.3',
               '***REMOVED***-CBC' => '1.2.840.113549.1.5.6',
               '***REMOVED***-CBC' => '1.2.840.113549.1.5.10',
               '***REMOVED***-CBC' => '1.2.840.113549.1.5.11',

               // from PKCS#12:
               // https://tools.ietf.org/html/rfc7292
               'pbeWithSHAAnd128BitRC4' => '1.2.840.113549.1.12.1.1',
               'pbeWithSHAAnd40BitRC4' => '1.2.840.113549.1.12.1.2',
               '***REMOVED***-KeyTripleDES-CBC' => '1.2.840.113549.1.12.1.3',
               '***REMOVED***-KeyTripleDES-CBC' => '1.2.840.113549.1.12.1.4',
               'pbeWithSHAAnd128BitRC2-CBC' => '1.2.840.113549.1.12.1.5',
               'pbeWithSHAAnd40BitRC2-CBC' => '1.2.840.113549.1.12.1.6',

               'id-PBKDF2' => '1.2.840.113549.1.5.12',
               'id-PBES2' => '1.2.840.113549.1.5.13',
               'id-PBMAC1' => '1.2.840.113549.1.5.14',

               // from PKCS#5 v2.1:
               // http://www.rsa.com/rsalabs/pkcs/files/h11302-wp-pkcs5v2-1-password-based-cryptography-standard.pdf
               'id-hmacWithSHA1' => '1.2.840.113549.2.7',
               'id-***REMOVED***' => '1.2.840.113549.2.8',
               'id-***REMOVED***' => '1.2.840.113549.2.9',
               'id-***REMOVED***' => '1.2.840.113549.2.10',
               'id-***REMOVED***' => '1.2.840.113549.2.11',
               'id-***REMOVED***-224' => '1.2.840.113549.2.12',
               'id-***REMOVED***-256' => '1.2.840.113549.2.13',

               'desCBC'       => '1.3.14.3.2.7',
               'des-EDE3-CBC' => '1.2.840.113549.3.7',
               'rc2CBC' => '1.2.840.113549.3.2',
               'rc5-CBC-PAD' => '1.2.840.113549.3.9',

               'aes128-CBC-PAD' => '2.16.840.1.101.3.4.1.2',
               'aes192-CBC-PAD' => '2.16.840.1.101.3.4.1.22',
               'aes256-CBC-PAD' => '2.16.840.1.101.3.4.1.42'
            ]);
            self::$oidsLoaded = true;
        }
    }

    /**
     * Break a public or private key down into its constituent components
     *
     * @param string $key
     * @param string $password optional
     * @return array
     */
    protected static function load($key, $password = '')
    {
        if (!Strings::is_stringable($key)) {
            throw new \UnexpectedValueException('Key should be a string - not a ' . gettype($key));
        }

        $isPublic = strpos($key, 'PUBLIC') !== false;
        $isPrivate = strpos($key, 'PRIVATE') !== false;

        $decoded = self::preParse($key);

        $meta = [];

        $decrypted = ASN1::asn1map($decoded[0], Maps\EncryptedPrivateKeyInfo::MAP);
        if (strlen($password) && is_array($decrypted)) {
            $algorithm = $decrypted['***REMOVED***']['algorithm'];
            switch ($algorithm) {
                // PBES1
                case '***REMOVED***-CBC':
                case '***REMOVED***-CBC':
                case '***REMOVED***-CBC':
                case '***REMOVED***-CBC':
                case '***REMOVED***-CBC':
                case '***REMOVED***-CBC':
                case '***REMOVED***-KeyTripleDES-CBC':
                case '***REMOVED***-KeyTripleDES-CBC':
                case 'pbeWithSHAAnd128BitRC2-CBC':
                case 'pbeWithSHAAnd40BitRC2-CBC':
                case 'pbeWithSHAAnd128BitRC4':
                case 'pbeWithSHAAnd40BitRC4':
                    $cipher = self::getPBES1EncryptionObject($algorithm);
                    $hash = self::getPBES1Hash($algorithm);
                    $kdf = self::getPBES1KDF($algorithm);

                    $meta['meta']['algorithm'] = $algorithm;

                    $temp = ASN1::decodeBER($decrypted['***REMOVED***']['parameters']);
                    if (!$temp) {
                        throw new \***REMOVED***('Unable to decode BER');
                    }
                    extract(ASN1::asn1map($temp[0], Maps\PBEParameter::MAP));
                    $***REMOVED*** = (int) $***REMOVED***->toString();
                    $cipher->setPassword($password, $kdf, $hash, $salt, $***REMOVED***);
                    $key = $cipher->decrypt($decrypted['encryptedData']);
                    $decoded = ASN1::decodeBER($key);
                    if (!$decoded) {
                        throw new \***REMOVED***('Unable to decode BER 2');
                    }

                    break;
                case 'id-PBES2':
                    $meta['meta']['algorithm'] = $algorithm;

                    $temp = ASN1::decodeBER($decrypted['***REMOVED***']['parameters']);
                    if (!$temp) {
                        throw new \***REMOVED***('Unable to decode BER');
                    }
                    $temp = ASN1::asn1map($temp[0], Maps\PBES2params::MAP);
                    extract($temp);

                    $cipher = self::getPBES2EncryptionObject($***REMOVED***['algorithm']);
                    $meta['meta']['cipher'] = $***REMOVED***['algorithm'];

                    $temp = ASN1::decodeBER($decrypted['***REMOVED***']['parameters']);
                    if (!$temp) {
                        throw new \***REMOVED***('Unable to decode BER');
                    }
                    $temp = ASN1::asn1map($temp[0], Maps\PBES2params::MAP);
                    extract($temp);

                    if (!$cipher instanceof RC2) {
                        $cipher->setIV($***REMOVED***['parameters']['octetString']);
                    } else {
                        $temp = ASN1::decodeBER($***REMOVED***['parameters']);
                        if (!$temp) {
                            throw new \***REMOVED***('Unable to decode BER');
                        }
                        extract(ASN1::asn1map($temp[0], Maps\***REMOVED***::MAP));
                        $***REMOVED*** = (int) $***REMOVED***->toString();
                        switch ($***REMOVED***) {
                            case 160:
                                $***REMOVED*** = 40;
                                break;
                            case 120:
                                $***REMOVED*** = 64;
                                break;
                            case 58:
                                $***REMOVED*** = 128;
                                break;
                            //default: // should be >= 256
                        }
                        $cipher->setIV($iv);
                        $cipher->setKeyLength($***REMOVED***);
                    }

                    $meta['meta']['***REMOVED***'] = $***REMOVED***['algorithm'];
                    switch ($***REMOVED***['algorithm']) {
                        case 'id-PBKDF2':
                            $temp = ASN1::decodeBER($***REMOVED***['parameters']);
                            if (!$temp) {
                                throw new \***REMOVED***('Unable to decode BER');
                            }
                            $prf = ['algorithm' => 'id-hmacWithSHA1'];
                            $params = ASN1::asn1map($temp[0], Maps\PBKDF2params::MAP);
                            extract($params);
                            $meta['meta']['prf'] = $prf['algorithm'];
                            $hash = str_replace('-', '/', substr($prf['algorithm'], 11));
                            $params = [
                                $password,
                                'pbkdf2',
                                $hash,
                                $salt,
                                (int) $***REMOVED***->toString()
                            ];
                            if (isset($keyLength)) {
                                $params[] = (int) $keyLength->toString();
                            }
                            $cipher->setPassword(...$params);
                            $key = $cipher->decrypt($decrypted['encryptedData']);
                            $decoded = ASN1::decodeBER($key);
                            if (!$decoded) {
                                throw new \***REMOVED***('Unable to decode BER 3');
                            }
                            break;
                        default:
                            throw new UnsupportedAlgorithmException('Only PBKDF2 is supported for PBES2 PKCS#8 keys');
                    }
                    break;
                case 'id-PBMAC1':
                    //$temp = ASN1::decodeBER($decrypted['***REMOVED***']['parameters']);
                    //$value = ASN1::asn1map($temp[0], Maps\PBMAC1params::MAP);
                    // since i can't find any ***REMOVED*** that does PBMAC1 it is unsupported
                    throw new UnsupportedAlgorithmException('Only PBES1 and PBES2 PKCS#8 keys are supported.');
                // at this point we'll assume that the key conforms to PublicKeyInfo
            }
        }

        $private = ASN1::asn1map($decoded[0], Maps\***REMOVED***::MAP);
        if (is_array($private)) {
            if ($isPublic) {
                throw new \UnexpectedValueException('Human readable string claims public key but DER encoded string claims private key');
            }

            if (isset($private['***REMOVED***']['parameters']) && !$private['***REMOVED***']['parameters'] instanceof ASN1\Element && isset($decoded[0]['content'][1]['content'][1])) {
                $temp = $decoded[0]['content'][1]['content'][1];
                $private['***REMOVED***']['parameters'] = new ASN1\Element(substr($key, $temp['start'], $temp['length']));
            }
            if (is_array(static::OID_NAME)) {
                if (!in_array($private['***REMOVED***']['algorithm'], static::OID_NAME)) {
                    throw new UnsupportedAlgorithmException($private['***REMOVED***']['algorithm'] . ' is not a supported key type');
                }
            } else {
                if ($private['***REMOVED***']['algorithm'] != static::OID_NAME) {
                    throw new UnsupportedAlgorithmException('Only ' . static::OID_NAME . ' keys are supported; this is a ' . $private['***REMOVED***']['algorithm'] . ' key');
                }
            }
            if (isset($private['publicKey'])) {
                if ($private['publicKey'][0] != "\0") {
                    throw new \UnexpectedValueException('The first byte of the public key should be null - not ' . bin2hex($private['publicKey'][0]));
                }
                $private['publicKey'] = substr($private['publicKey'], 1);
            }
            return $private + $meta;
        }

        // EncryptedPrivateKeyInfo and PublicKeyInfo have largely identical "signatures". the only difference
        // is that the former has an octet string and the later has a bit string. the first byte of a bit
        // string represents the number of bits in the last byte that are to be ignored but, currently,
        // bit strings wanting a non-zero amount of bits trimmed are not supported
        $public = ASN1::asn1map($decoded[0], Maps\PublicKeyInfo::MAP);

        if (is_array($public)) {
            if ($isPrivate) {
                throw new \UnexpectedValueException('Human readable string claims private key but DER encoded string claims public key');
            }

            if ($public['publicKey'][0] != "\0") {
                throw new \UnexpectedValueException('The first byte of the public key should be null - not ' . bin2hex($public['publicKey'][0]));
            }
            if (is_array(static::OID_NAME)) {
                if (!in_array($public['***REMOVED***']['algorithm'], static::OID_NAME)) {
                    throw new UnsupportedAlgorithmException($public['***REMOVED***']['algorithm'] . ' is not a supported key type');
                }
            } else {
                if ($public['***REMOVED***']['algorithm'] != static::OID_NAME) {
                    throw new UnsupportedAlgorithmException('Only ' . static::OID_NAME . ' keys are supported; this is a ' . $public['***REMOVED***']['algorithm'] . ' key');
                }
            }
            if (isset($public['***REMOVED***']['parameters']) && !$public['***REMOVED***']['parameters'] instanceof ASN1\Element && isset($decoded[0]['content'][0]['content'][1])) {
                $temp = $decoded[0]['content'][0]['content'][1];
                $public['***REMOVED***']['parameters'] = new ASN1\Element(substr($key, $temp['start'], $temp['length']));
            }
            $public['publicKey'] = substr($public['publicKey'], 1);
            return $public;
        }

        throw new \***REMOVED***('Unable to parse using either ***REMOVED*** or PublicKeyInfo ASN1 maps');
    }

    /**
     * Wrap a private key appropriately
     *
     * @param string $key
     * @param string $attr
     * @param mixed $params
     * @param string $password
     * @param string $oid optional
     * @param string $publicKey optional
     * @param array $options optional
     * @return string
     */
    protected static function ***REMOVED***($key, $attr, $params, $password, $oid = null, $publicKey = '', array $options = [])
    {
        self::initialize_static_variables();

        $key = [
            'version' => 'v1',
            '***REMOVED***' => [
                'algorithm' => is_string(static::OID_NAME) ? static::OID_NAME : $oid
             ],
            'privateKey' => $key
        ];
        if ($oid != 'id-Ed25519' && $oid != 'id-Ed448') {
            $key['***REMOVED***']['parameters'] = $params;
        }
        if (!empty($attr)) {
            $key['attributes'] = $attr;
        }
        if (!empty($publicKey)) {
            $key['version'] = 'v2';
            $key['publicKey'] = $publicKey;
        }
        $key = ASN1::encodeDER($key, Maps\***REMOVED***::MAP);
        if (!empty($password) && is_string($password)) {
            $salt = Random::string(8);

            $***REMOVED*** = isset($options['***REMOVED***']) ? $options['***REMOVED***'] : self::$defaultIterationCount;
            $***REMOVED*** = isset($options['***REMOVED***']) ? $options['***REMOVED***'] : self::$defaultEncryptionAlgorithm;
            $***REMOVED*** = isset($options['***REMOVED***']) ? $options['***REMOVED***'] : self::$defaultEncryptionScheme;
            $prf = isset($options['PRF']) ? $options['PRF'] : self::$defaultPRF;

            if ($***REMOVED*** == 'id-PBES2') {
                $crypto = self::getPBES2EncryptionObject($***REMOVED***);
                $hash = str_replace('-', '/', substr($prf, 11));
                $kdf = 'pbkdf2';
                $iv = Random::string($crypto->***REMOVED***() >> 3);

                $PBKDF2params = [
                    'salt' => $salt,
                    '***REMOVED***' => $***REMOVED***,
                    'prf' => ['algorithm' => $prf, 'parameters' => null]
                ];
                $PBKDF2params = ASN1::encodeDER($PBKDF2params, Maps\PBKDF2params::MAP);

                if (!$crypto instanceof RC2) {
                    $params = ['octetString' => $iv];
                } else {
                    $params = [
                        '***REMOVED***' => 58,
                        'iv' => $iv
                    ];
                    $params = ASN1::encodeDER($params, Maps\***REMOVED***::MAP);
                    $params = new ASN1\Element($params);
                }

                $params = [
                    '***REMOVED***' => [
                        'algorithm' => 'id-PBKDF2',
                        'parameters' => new ASN1\Element($PBKDF2params)
                    ],
                    '***REMOVED***' => [
                        'algorithm' => $***REMOVED***,
                        'parameters' => $params
                    ]
                ];
                $params = ASN1::encodeDER($params, Maps\PBES2params::MAP);

                $crypto->setIV($iv);
            } else {
                $crypto = self::getPBES1EncryptionObject($***REMOVED***);
                $hash = self::getPBES1Hash($***REMOVED***);
                $kdf = self::getPBES1KDF($***REMOVED***);

                $params = [
                    'salt' => $salt,
                    '***REMOVED***' => $***REMOVED***
                ];
                $params = ASN1::encodeDER($params, Maps\PBEParameter::MAP);
            }
            $crypto->setPassword($password, $kdf, $hash, $salt, $***REMOVED***);
            $key = $crypto->encrypt($key);

            $key = [
                '***REMOVED***' => [
                    'algorithm' => $***REMOVED***,
                    'parameters' => new ASN1\Element($params)
                ],
                'encryptedData' => $key
            ];

            $key = ASN1::encodeDER($key, Maps\EncryptedPrivateKeyInfo::MAP);

            return "-----BEGIN ENCRYPTED PRIVATE KEY-----\r\n" .
                   chunk_split(Strings::base64_encode($key), 64) .
                   "-----END ENCRYPTED PRIVATE KEY-----";
        }

        return "-----BEGIN PRIVATE KEY-----\r\n" .
               chunk_split(Strings::base64_encode($key), 64) .
               "-----END PRIVATE KEY-----";
    }

    /**
     * Wrap a public key appropriately
     *
     * @param string $key
     * @param mixed $params
     * @param string $oid
     * @return string
     */
    protected static function wrapPublicKey($key, $params, $oid = null)
    {
        self::initialize_static_variables();

        $key = [
            '***REMOVED***' => [
                'algorithm' => is_string(static::OID_NAME) ? static::OID_NAME : $oid
            ],
            'publicKey' => "\0" . $key
        ];

        if ($oid != 'id-Ed25519' && $oid != 'id-Ed448') {
            $key['***REMOVED***']['parameters'] = $params;
        }

        $key = ASN1::encodeDER($key, Maps\PublicKeyInfo::MAP);

        return "-----BEGIN PUBLIC KEY-----\r\n" .
               chunk_split(Strings::base64_encode($key), 64) .
               "-----END PUBLIC KEY-----";
    }

    /**
     * Perform some preliminary parsing of the key
     *
     * @param string $key
     * @return array
     */
    private static function preParse(&$key)
    {
        self::initialize_static_variables();

        if (self::$format != self::MODE_DER) {
            $decoded = ASN1::extractBER($key);
            if ($decoded !== false) {
                $key = $decoded;
            } elseif (self::$format == self::MODE_PEM) {
                throw new \UnexpectedValueException('Expected base64-encoded PEM format but was unable to decode base64 text');
            }
        }

        $decoded = ASN1::decodeBER($key);
        if (!$decoded) {
            throw new \***REMOVED***('Unable to decode BER');
        }

        return $decoded;
    }

    /**
     * Returns the encryption parameters used by the key
     *
     * @param string $key
     * @return array
     */
    public static function extractEncryptionAlgorithm($key)
    {
        if (!Strings::is_stringable($key)) {
            throw new \UnexpectedValueException('Key should be a string - not a ' . gettype($key));
        }

        $decoded = self::preParse($key);

        $r = ASN1::asn1map($decoded[0], ASN1\Maps\EncryptedPrivateKeyInfo::MAP);
        if (!is_array($r)) {
            throw new \***REMOVED***('Unable to parse using EncryptedPrivateKeyInfo map');
        }

        if ($r['***REMOVED***']['algorithm'] == 'id-PBES2') {
            $decoded = ASN1::decodeBER($r['***REMOVED***']['parameters']->element);
            if (!$decoded) {
                throw new \***REMOVED***('Unable to decode BER');
            }
            $r['***REMOVED***']['parameters'] = ASN1::asn1map($decoded[0], ASN1\Maps\PBES2params::MAP);

            $kdf = &$r['***REMOVED***']['parameters']['***REMOVED***'];
            switch ($kdf['algorithm']) {
                case 'id-PBKDF2':
                    $decoded = ASN1::decodeBER($kdf['parameters']->element);
                    if (!$decoded) {
                        throw new \***REMOVED***('Unable to decode BER');
                    }
                    $kdf['parameters'] = ASN1::asn1map($decoded[0], Maps\PBKDF2params::MAP);
            }
        }

        return $r['***REMOVED***'];
    }
}
