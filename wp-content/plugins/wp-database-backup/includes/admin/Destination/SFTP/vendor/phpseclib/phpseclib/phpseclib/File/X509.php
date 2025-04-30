<?php

/**
 * Pure-PHP X.509 Parser
 *
 * PHP version 5
 *
 * Encode and decode X.509 certificates.
 *
 * The extensions are from {@link http://tools.ietf.org/html/rfc5280 RFC5280} and
 * {@link http://web.archive.org/web/***REMOVED***/http://www3.netscape.com/eng/security/cert-exts.html Netscape Certificate Extensions}.
 *
 * Note that loading an X.509 certificate and resaving it may invalidate the signature.  The reason being that the signature is based on a
 * portion of the certificate that contains optional parameters with default values.  ie. if the parameter isn't there the default value is
 * used.  Problem is, if the parameter is there and it just so happens to have the default value there are two ways that that parameter can
 * be encoded.  It can be encoded explicitly or left out all together.  This would effect the signature value and thus may invalidate the
 * the certificate all together unless the certificate is re-signed.
 *
 * @author    Jim Wigginton <terrafrost@php.net>
 * @copyright 2012 Jim Wigginton
 * @license   http://www.opensource.org/licenses/mit-license.html  MIT License
 * @link      http://phpseclib.sourceforge.net
 */

namespace phpseclib3\File;

use phpseclib3\Common\Functions\Strings;
use phpseclib3\Crypt\Common\PrivateKey;
use phpseclib3\Crypt\Common\PublicKey;
use phpseclib3\Crypt\DSA;
use phpseclib3\Crypt\EC;
use phpseclib3\Crypt\Hash;
use phpseclib3\Crypt\***REMOVED***;
use phpseclib3\Crypt\Random;
use phpseclib3\Crypt\RSA;
use phpseclib3\Crypt\RSA\Formats\Keys\PSS;
use phpseclib3\Exception\UnsupportedAlgorithmException;
use phpseclib3\File\ASN1\Element;
use phpseclib3\File\ASN1\Maps;
use phpseclib3\Math\BigInteger;

/**
 * Pure-PHP X.509 Parser
 *
 * @author  Jim Wigginton <terrafrost@php.net>
 */
class X509
{
    /**
     * Flag to only accept signatures signed by certificate authorities
     *
     * Not really used anymore but retained all the same to suppress E_NOTICEs from old installs
     *
     */
    const VALIDATE_SIGNATURE_BY_CA = 1;

    /**
     * Return internal array ***REMOVED***
     *
     * @see \phpseclib3\File\X509::getDN()
     */
    const DN_ARRAY = 0;
    /**
     * Return string
     *
     * @see \phpseclib3\File\X509::getDN()
     */
    const DN_STRING = 1;
    /**
     * Return ASN.1 name string
     *
     * @see \phpseclib3\File\X509::getDN()
     */
    const DN_ASN1 = 2;
    /**
     * Return OpenSSL compatible array
     *
     * @see \phpseclib3\File\X509::getDN()
     */
    const DN_OPENSSL = 3;
    /**
     * Return canonical ASN.1 RDNs string
     *
     * @see \phpseclib3\File\X509::getDN()
     */
    const DN_CANON = 4;
    /**
     * Return name hash for file indexing
     *
     * @see \phpseclib3\File\X509::getDN()
     */
    const DN_HASH = 5;

    /**
     * Save as PEM
     *
     * ie. a base64-encoded PEM with a header and a footer
     *
     * @see \phpseclib3\File\X509::saveX509()
     * @see \phpseclib3\File\X509::saveCSR()
     * @see \phpseclib3\File\X509::saveCRL()
     */
    const FORMAT_PEM = 0;
    /**
     * Save as DER
     *
     * @see \phpseclib3\File\X509::saveX509()
     * @see \phpseclib3\File\X509::saveCSR()
     * @see \phpseclib3\File\X509::saveCRL()
     */
    const FORMAT_DER = 1;
    /**
     * Save as a SPKAC
     *
     * @see \phpseclib3\File\X509::saveX509()
     * @see \phpseclib3\File\X509::saveCSR()
     * @see \phpseclib3\File\X509::saveCRL()
     *
     * Only works on CSRs. Not currently supported.
     */
    const FORMAT_SPKAC = 2;
    /**
     * Auto-detect the format
     *
     * Used only by the load*() functions
     *
     * @see \phpseclib3\File\X509::saveX509()
     * @see \phpseclib3\File\X509::saveCSR()
     * @see \phpseclib3\File\X509::saveCRL()
     */
    const FORMAT_AUTO_DETECT = 3;

    /**
     * Attribute value disposition.
     * If disposition is >= 0, this is the index of the target value.
     */
    const ATTR_ALL = -1; // All attribute values (array).
    const ATTR_APPEND = -2; // Add a value.
    const ATTR_REPLACE = -3; // Clear first, then add a value.

    /**
     * Distinguished Name
     *
     * @var array
     */
    private $dn;

    /**
     * Public key
     *
     * @var string|PublicKey
     */
    private $publicKey;

    /**
     * Private key
     *
     * @var string|PrivateKey
     */
    private $privateKey;

    /**
     * The certificate authorities
     *
     * @var array
     */
    private $CAs = [];

    /**
     * The currently loaded certificate
     *
     * @var array
     */
    private $currentCert;

    /**
     * The signature subject
     *
     * There's no guarantee \phpseclib3\File\X509 is going to re-encode an X.509 cert in the same way it was originally
     * encoded so we take save the portion of the original cert that the signature would have made for.
     *
     * @var string
     */
    private $***REMOVED***;

    /**
     * Certificate Start Date
     *
     * @var string
     */
    private $startDate;

    /**
     * Certificate End Date
     *
     * @var string|Element
     */
    private $endDate;

    /**
     * Serial Number
     *
     * @var string
     */
    private $serialNumber;

    /**
     * Key Identifier
     *
     * See {@link http://tools.ietf.org/html/rfc5280#section-4.2.1.1 RFC5280#section-4.2.1.1} and
     * {@link http://tools.ietf.org/html/rfc5280#section-4.2.1.2 RFC5280#section-4.2.1.2}.
     *
     * @var string
     */
    private $***REMOVED***;

    /**
     * CA Flag
     *
     * @var bool
     */
    private $caFlag = false;

    /**
     * SPKAC Challenge
     *
     * @var string
     */
    private $challenge;

    /**
     * @var array
     */
    private $***REMOVED*** = [];

    /**
     * OIDs loaded
     *
     * @var bool
     */
    private static $oidsLoaded = false;

    /**
     * Recursion Limit
     *
     * @var int
     */
    private static $recur_limit = 5;

    /**
     * URL fetch flag
     *
     * @var bool
     */
    private static $disable_url_fetch = false;

    /**
     * @var array
     */
    private static $extensions = [];

    /**
     * @var ?array
     */
    private $ipAddresses = null;

    /**
     * @var ?array
     */
    private $domains = null;

    /**
     * Default Constructor.
     *
     * @return \phpseclib3\File\X509
     */
    public function __construct()
    {
        // Explicitly Tagged Module, 1988 Syntax
        // http://tools.ietf.org/html/rfc5280#appendix-A.1

        if (!self::$oidsLoaded) {
            // OIDs from RFC5280 and those RFCs mentioned in RFC5280#section-4.1.1.2
            ASN1::loadOIDs([
                //'id-pkix' => '1.3.6.1.5.5.7',
                //'id-pe' => '1.3.6.1.5.5.7.1',
                //'id-qt' => '1.3.6.1.5.5.7.2',
                //'id-kp' => '1.3.6.1.5.5.7.3',
                //'id-ad' => '1.3.6.1.5.5.7.48',
                'id-qt-cps' => '1.3.6.1.5.5.7.2.1',
                'id-qt-unotice' => '1.3.6.1.5.5.7.2.2',
                'id-ad-ocsp' => '1.3.6.1.5.5.7.48.1',
                'id-ad-caIssuers' => '1.3.6.1.5.5.7.48.2',
                'id-ad-timeStamping' => '1.3.6.1.5.5.7.48.3',
                'id-ad-caRepository' => '1.3.6.1.5.5.7.48.5',
                //'id-at' => '2.5.4',
                'id-at-name' => '2.5.4.41',
                'id-at-surname' => '2.5.4.4',
                'id-at-givenName' => '2.5.4.42',
                'id-at-initials' => '2.5.4.43',
                'id-at-***REMOVED***' => '2.5.4.44',
                'id-at-commonName' => '2.5.4.3',
                'id-at-localityName' => '2.5.4.7',
                'id-at-***REMOVED***' => '2.5.4.8',
                'id-at-***REMOVED***' => '2.5.4.10',
                'id-at-organizationalUnitName' => '2.5.4.11',
                'id-at-title' => '2.5.4.12',
                'id-at-description' => '2.5.4.13',
                'id-at-dnQualifier' => '2.5.4.46',
                'id-at-countryName' => '2.5.4.6',
                'id-at-serialNumber' => '2.5.4.5',
                'id-at-pseudonym' => '2.5.4.65',
                'id-at-postalCode' => '2.5.4.17',
                'id-at-streetAddress' => '2.5.4.9',
                'id-at-***REMOVED***' => '2.5.4.45',
                'id-at-role' => '2.5.4.72',
                'id-at-postalAddress' => '2.5.4.16',
                'jurisdictionOfIncorporationCountryName' => '1.3.6.1.4.1.311.60.2.1.3',
                'jurisdictionOfIncorporationStateOrProvinceName' => '1.3.6.1.4.1.311.60.2.1.2',
                'jurisdictionLocalityName' => '1.3.6.1.4.1.311.60.2.1.1',
                'id-at-***REMOVED***' => '2.5.4.15',

                //'id-***REMOVED***' => '0.9.2342.19200300.100.1.25',
                //'pkcs-9' => '1.2.840.113549.1.9',
                'pkcs-9-at-emailAddress' => '1.2.840.113549.1.9.1',
                //'id-ce' => '2.5.29',
                'id-ce-authorityKeyIdentifier' => '2.5.29.35',
                'id-ce-***REMOVED***' => '2.5.29.14',
                'id-ce-keyUsage' => '2.5.29.15',
                'id-ce-privateKeyUsagePeriod' => '2.5.29.16',
                'id-ce-***REMOVED***' => '2.5.29.32',
                //'anyPolicy' => '2.5.29.32.0',

                'id-ce-***REMOVED***' => '2.5.29.33',

                'id-ce-***REMOVED***' => '2.5.29.17',
                'id-ce-issuerAltName' => '2.5.29.18',
                'id-ce-subjectDirectoryAttributes' => '2.5.29.9',
                'id-ce-***REMOVED***' => '2.5.29.19',
                'id-ce-***REMOVED***' => '2.5.29.30',
                'id-ce-***REMOVED***' => '2.5.29.36',
                'id-ce-cRLDistributionPoints' => '2.5.29.31',
                'id-ce-extKeyUsage' => '2.5.29.37',
                //'***REMOVED***' => '2.5.29.37.0',
                'id-kp-serverAuth' => '1.3.6.1.5.5.7.3.1',
                'id-kp-clientAuth' => '1.3.6.1.5.5.7.3.2',
                'id-kp-codeSigning' => '1.3.6.1.5.5.7.3.3',
                'id-kp-***REMOVED***' => '1.3.6.1.5.5.7.3.4',
                'id-kp-timeStamping' => '1.3.6.1.5.5.7.3.8',
                'id-kp-OCSPSigning' => '1.3.6.1.5.5.7.3.9',
                'id-ce-***REMOVED***' => '2.5.29.54',
                'id-ce-freshestCRL' => '2.5.29.46',
                'id-pe-***REMOVED***' => '1.3.6.1.5.5.7.1.1',
                'id-pe-***REMOVED***' => '1.3.6.1.5.5.7.1.11',
                'id-ce-cRLNumber' => '2.5.29.20',
                'id-ce-issuingDistributionPoint' => '2.5.29.28',
                'id-ce-***REMOVED***' => '2.5.29.27',
                'id-ce-cRLReasons' => '2.5.29.21',
                'id-ce-***REMOVED***' => '2.5.29.29',
                'id-ce-***REMOVED***' => '2.5.29.23',
                //'***REMOVED***' => '1.2.840.10040.2',
                'id-***REMOVED***-none' => '1.2.840.10040.2.1',
                'id-***REMOVED***-callissuer' => '1.2.840.10040.2.2',
                'id-***REMOVED***-reject' => '1.2.840.10040.2.3',
                'id-ce-***REMOVED***' => '2.5.29.24',

                'rsaEncryption' => '1.2.840.113549.1.1.1',
                '***REMOVED***' => '1.2.840.113549.1.1.2',
                '***REMOVED***' => '1.2.840.113549.1.1.4',
                'sha1WithRSAEncryption' => '1.2.840.113549.1.1.5',
                'sha224WithRSAEncryption' => '1.2.840.113549.1.1.14',
                'sha256WithRSAEncryption' => '1.2.840.113549.1.1.11',
                'sha384WithRSAEncryption' => '1.2.840.113549.1.1.12',
                'sha512WithRSAEncryption' => '1.2.840.113549.1.1.13',

                'id-ecPublicKey' => '1.2.840.10045.2.1',
                'ecdsa-with-SHA1' => '1.2.840.10045.4.1',
                // from https://tools.ietf.org/html/rfc5758#section-3.2
                'ecdsa-with-SHA224' => '1.2.840.10045.4.3.1',
                'ecdsa-with-SHA256' => '1.2.840.10045.4.3.2',
                'ecdsa-with-SHA384' => '1.2.840.10045.4.3.3',
                'ecdsa-with-SHA512' => '1.2.840.10045.4.3.4',

                'id-dsa' => '1.2.840.10040.4.1',
                'id-dsa-with-sha1' => '1.2.840.10040.4.3',
                // from https://tools.ietf.org/html/rfc5758#section-3.1
                'id-dsa-with-sha224' => '2.16.840.1.101.3.4.3.1',
                'id-dsa-with-sha256' => '2.16.840.1.101.3.4.3.2',

                // from https://tools.ietf.org/html/rfc8410:
                'id-Ed25519' => '1.3.101.112',
                'id-Ed448' => '1.3.101.113',

                'id-RSASSA-PSS' => '1.2.840.113549.1.1.10',

                //'id-sha224' => '2.16.840.1.101.3.4.2.4',
                //'id-sha256' => '2.16.840.1.101.3.4.2.1',
                //'id-sha384' => '2.16.840.1.101.3.4.2.2',
                //'id-sha512' => '2.16.840.1.101.3.4.2.3',
                //'id-GostR3411-94-with-GostR3410-94' => '1.2.643.2.2.4',
                //'id-GostR3411-94-with-GostR3410-2001' => '1.2.643.2.2.3',
                //'id-GostR3410-2001' => '1.2.643.2.2.20',
                //'id-GostR3410-94' => '1.2.643.2.2.19',
                // Netscape Object Identifiers from "Netscape Certificate Extensions"
                'netscape' => '2.16.840.1.113730',
                'netscape-cert-extension' => '2.16.840.1.113730.1',
                'netscape-cert-type' => '2.16.840.1.113730.1.1',
                'netscape-comment' => '2.16.840.1.113730.1.13',
                'netscape-ca-policy-url' => '2.16.840.1.113730.1.8',
                // the following are X.509 extensions not supported by phpseclib
                'id-pe-logotype' => '1.3.6.1.5.5.7.1.12',
                '***REMOVED***' => '1.2.840.113533.7.65.0',
                '***REMOVED***' => '2.16.840.1.113733.1.6.9',
                // for Certificate Signing Requests
                // see http://tools.ietf.org/html/rfc2985
                'pkcs-9-at-***REMOVED***' => '1.2.840.113549.1.9.2', // PKCS #9 unstructured name
                'pkcs-9-at-***REMOVED***' => '1.2.840.113549.1.9.7', // Challenge password for certificate revocations
                'pkcs-9-at-***REMOVED***' => '1.2.840.113549.1.9.14' // Certificate extension request
            ]);
        }
    }

    /**
     * Load X.509 certificate
     *
     * Returns an associative array describing the X.509 cert or a false if the cert failed to load
     *
     * @param array|string $cert
     * @param int $mode
     * @return mixed
     */
    public function loadX509($cert, $mode = self::FORMAT_AUTO_DETECT)
    {
        if (is_array($cert) && isset($cert['***REMOVED***'])) {
            unset($this->currentCert);
            unset($this->***REMOVED***);
            $this->dn = $cert['***REMOVED***']['subject'];
            if (!isset($this->dn)) {
                return false;
            }
            $this->currentCert = $cert;

            $***REMOVED*** = $this->getExtension('id-ce-***REMOVED***');
            $this->***REMOVED*** = is_string($***REMOVED***) ? $***REMOVED*** : null;

            unset($this->***REMOVED***);

            return $cert;
        }

        if ($mode != self::FORMAT_DER) {
            $newcert = ASN1::extractBER($cert);
            if ($mode == self::FORMAT_PEM && $cert == $newcert) {
                return false;
            }
            $cert = $newcert;
        }

        if ($cert === false) {
            $this->currentCert = false;
            return false;
        }

        $decoded = ASN1::decodeBER($cert);

        if ($decoded) {
            $x509 = ASN1::asn1map($decoded[0], Maps\Certificate::MAP);
        }
        if (!isset($x509) || $x509 === false) {
            $this->currentCert = false;
            return false;
        }

        $this->***REMOVED*** = substr($cert, $decoded[0]['content'][0]['start'], $decoded[0]['content'][0]['length']);

        if ($this->***REMOVED***($x509, '***REMOVED***/extensions')) {
            $this->***REMOVED***($x509, '***REMOVED***/extensions');
        }
        $this->mapInDNs($x509, '***REMOVED***/issuer/rdnSequence');
        $this->mapInDNs($x509, '***REMOVED***/subject/rdnSequence');

        $key = $x509['***REMOVED***']['***REMOVED***'];
        $key = ASN1::encodeDER($key, Maps\***REMOVED***::MAP);
        $x509['***REMOVED***']['***REMOVED***']['***REMOVED***'] =
            "-----BEGIN PUBLIC KEY-----\r\n" .
            chunk_split(base64_encode($key), 64) .
            "-----END PUBLIC KEY-----";

        $this->currentCert = $x509;
        $this->dn = $x509['***REMOVED***']['subject'];

        $***REMOVED*** = $this->getExtension('id-ce-***REMOVED***');
        $this->***REMOVED*** = is_string($***REMOVED***) ? $***REMOVED*** : null;

        return $x509;
    }

    /**
     * Save X.509 certificate
     *
     * @param array $cert
     * @param int $format optional
     * @return string
     */
    public function saveX509(array $cert, $format = self::FORMAT_PEM)
    {
        if (!is_array($cert) || !isset($cert['***REMOVED***'])) {
            return false;
        }

        switch (true) {
            // "case !$a: case !$b: break; default: whatever();" is the same thing as "if ($a && $b) whatever()"
            case !($algorithm = $this->subArray($cert, '***REMOVED***/***REMOVED***/algorithm/algorithm')):
            case is_object($cert['***REMOVED***']['***REMOVED***']['***REMOVED***']):
                break;
            default:
                $cert['***REMOVED***']['***REMOVED***'] = new Element(
                    base64_decode(preg_replace('#-.+-|[\r\n]#', '', $cert['***REMOVED***']['***REMOVED***']['***REMOVED***']))
                );
        }

        if ($algorithm == 'rsaEncryption') {
            $cert['***REMOVED***']['parameters'] = null;
            $cert['***REMOVED***']['signature']['parameters'] = null;
        }

        $filters = [];
        $type_utf8_string = ['type' => ASN1::TYPE_UTF8_STRING];
        $filters['***REMOVED***']['signature']['parameters'] = $type_utf8_string;
        $filters['***REMOVED***']['signature']['issuer']['rdnSequence']['value'] = $type_utf8_string;
        $filters['***REMOVED***']['issuer']['rdnSequence']['value'] = $type_utf8_string;
        $filters['***REMOVED***']['subject']['rdnSequence']['value'] = $type_utf8_string;
        $filters['***REMOVED***']['***REMOVED***']['algorithm']['parameters'] = $type_utf8_string;
        $filters['***REMOVED***']['parameters'] = $type_utf8_string;
        $filters['***REMOVED***']['directoryName']['rdnSequence']['value'] = $type_utf8_string;
        //$filters['***REMOVED***']['qualifier'] = $type_utf8_string;
        $filters['***REMOVED***']['fullName']['directoryName']['rdnSequence']['value'] = $type_utf8_string;
        $filters['directoryName']['rdnSequence']['value'] = $type_utf8_string;

        foreach (self::$extensions as $extension) {
            $filters['***REMOVED***']['extensions'][] = $extension;
        }

        /* in the case of ***REMOVED***/qualifier, the type has to be \phpseclib3\File\ASN1::TYPE_IA5_STRING.
           \phpseclib3\File\ASN1::TYPE_PRINTABLE_STRING will cause OpenSSL's X.509 parser to spit out random
           characters.
         */
        $filters['***REMOVED***']['qualifier']
            = ['type' => ASN1::TYPE_IA5_STRING];

        ASN1::setFilters($filters);

        $this->***REMOVED***($cert, '***REMOVED***/extensions');
        $this->mapOutDNs($cert, '***REMOVED***/issuer/rdnSequence');
        $this->mapOutDNs($cert, '***REMOVED***/subject/rdnSequence');

        $cert = ASN1::encodeDER($cert, Maps\Certificate::MAP);

        switch ($format) {
            case self::FORMAT_DER:
                return $cert;
            // case self::FORMAT_PEM:
            default:
                return "-----BEGIN CERTIFICATE-----\r\n" . chunk_split(Strings::base64_encode($cert), 64) . '-----END CERTIFICATE-----';
        }
    }

    /**
     * Map extension values from octet string to extension-specific internal
     *   format.
     *
     * @param array $root (by reference)
     * @param string $path
     */
    private function ***REMOVED***(array &$root, $path)
    {
        $extensions = &$this->***REMOVED***($root, $path);

        if ($extensions) {
            for ($i = 0; $i < count($extensions); $i++) {
                $id = $extensions[$i]['extnId'];
                $value = &$extensions[$i]['extnValue'];
                /* [extnValue] contains the DER encoding of an ASN.1 value
                   corresponding to the extension type identified by extnID */
                $map = $this->getMapping($id);
                if (!is_bool($map)) {
                    $decoder = $id == 'id-ce-***REMOVED***' ?
                        [static::class, 'decodeNameConstraintIP'] :
                        [static::class, 'decodeIP'];
                    $decoded = ASN1::decodeBER($value);
                    if (!$decoded) {
                        continue;
                    }
                    $mapped = ASN1::asn1map($decoded[0], $map, ['iPAddress' => $decoder]);
                    $value = $mapped === false ? $decoded[0] : $mapped;

                    if ($id == 'id-ce-***REMOVED***') {
                        for ($j = 0; $j < count($value); $j++) {
                            if (!isset($value[$j]['***REMOVED***'])) {
                                continue;
                            }
                            for ($k = 0; $k < count($value[$j]['***REMOVED***']); $k++) {
                                $subid = $value[$j]['***REMOVED***'][$k]['***REMOVED***'];
                                $map = $this->getMapping($subid);
                                $subvalue = &$value[$j]['***REMOVED***'][$k]['qualifier'];
                                if ($map !== false) {
                                    $decoded = ASN1::decodeBER($subvalue);
                                    if (!$decoded) {
                                        continue;
                                    }
                                    $mapped = ASN1::asn1map($decoded[0], $map);
                                    $subvalue = $mapped === false ? $decoded[0] : $mapped;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Map extension values from extension-specific internal format to
     *   octet string.
     *
     * @param array $root (by reference)
     * @param string $path
     */
    private function ***REMOVED***(array &$root, $path)
    {
        $extensions = &$this->subArray($root, $path, !empty($this->***REMOVED***));

        foreach ($this->***REMOVED*** as $id => $data) {
            extract($data);
            $newext = [
                'extnId' => $id,
                'extnValue' => $value,
                'critical' => $critical
            ];
            if ($replace) {
                foreach ($extensions as $key => $value) {
                    if ($value['extnId'] == $id) {
                        $extensions[$key] = $newext;
                        continue 2;
                    }
                }
            }
            $extensions[] = $newext;
        }

        if (is_array($extensions)) {
            $size = count($extensions);
            for ($i = 0; $i < $size; $i++) {
                if ($extensions[$i] instanceof Element) {
                    continue;
                }

                $id = $extensions[$i]['extnId'];
                $value = &$extensions[$i]['extnValue'];

                switch ($id) {
                    case 'id-ce-***REMOVED***':
                        for ($j = 0; $j < count($value); $j++) {
                            if (!isset($value[$j]['***REMOVED***'])) {
                                continue;
                            }
                            for ($k = 0; $k < count($value[$j]['***REMOVED***']); $k++) {
                                $subid = $value[$j]['***REMOVED***'][$k]['***REMOVED***'];
                                $map = $this->getMapping($subid);
                                $subvalue = &$value[$j]['***REMOVED***'][$k]['qualifier'];
                                if ($map !== false) {
                                    // by default \phpseclib3\File\ASN1 will try to render qualifier as a \phpseclib3\File\ASN1::TYPE_IA5_STRING since it's
                                    // actual type is \phpseclib3\File\ASN1::TYPE_ANY
                                    $subvalue = new Element(ASN1::encodeDER($subvalue, $map));
                                }
                            }
                        }
                        break;
                    case 'id-ce-authorityKeyIdentifier': // use 00 as the serial number instead of an empty string
                        if (isset($value['authorityCertSerialNumber'])) {
                            if ($value['authorityCertSerialNumber']->toBytes() == '') {
                                $temp = chr((ASN1::CLASS_CONTEXT_SPECIFIC << 6) | 2) . "\1\0";
                                $value['authorityCertSerialNumber'] = new Element($temp);
                            }
                        }
                }

                /* [extnValue] contains the DER encoding of an ASN.1 value
                   corresponding to the extension type identified by extnID */
                $map = $this->getMapping($id);
                if (is_bool($map)) {
                    if (!$map) {
                        //user_error($id . ' is not a currently supported extension');
                        unset($extensions[$i]);
                    }
                } else {
                    $value = ASN1::encodeDER($value, $map, ['iPAddress' => [static::class, 'encodeIP']]);
                }
            }
        }
    }

    /**
     * Map attribute values from ANY type to attribute-specific internal
     *   format.
     *
     * @param array $root (by reference)
     * @param string $path
     */
    private function ***REMOVED***(&$root, $path)
    {
        $attributes = &$this->subArray($root, $path);

        if (is_array($attributes)) {
            for ($i = 0; $i < count($attributes); $i++) {
                $id = $attributes[$i]['type'];
                /* $value contains the DER encoding of an ASN.1 value
                   corresponding to the attribute type identified by type */
                $map = $this->getMapping($id);
                if (is_array($attributes[$i]['value'])) {
                    $values = &$attributes[$i]['value'];
                    for ($j = 0; $j < count($values); $j++) {
                        $value = ASN1::encodeDER($values[$j], Maps\***REMOVED***::MAP);
                        $decoded = ASN1::decodeBER($value);
                        if (!is_bool($map)) {
                            if (!$decoded) {
                                continue;
                            }
                            $mapped = ASN1::asn1map($decoded[0], $map);
                            if ($mapped !== false) {
                                $values[$j] = $mapped;
                            }
                            if ($id == 'pkcs-9-at-***REMOVED***' && $this->***REMOVED***($values, $j)) {
                                $this->***REMOVED***($values, $j);
                            }
                        } elseif ($map) {
                            $values[$j] = $value;
                        }
                    }
                }
            }
        }
    }

    /**
     * Map attribute values from attribute-specific internal format to
     *   ANY type.
     *
     * @param array $root (by reference)
     * @param string $path
     */
    private function ***REMOVED***(&$root, $path)
    {
        $attributes = &$this->subArray($root, $path);

        if (is_array($attributes)) {
            $size = count($attributes);
            for ($i = 0; $i < $size; $i++) {
                /* [value] contains the DER encoding of an ASN.1 value
                   corresponding to the attribute type identified by type */
                $id = $attributes[$i]['type'];
                $map = $this->getMapping($id);
                if ($map === false) {
                    //user_error($id . ' is not a currently supported attribute', E_USER_NOTICE);
                    unset($attributes[$i]);
                } elseif (is_array($attributes[$i]['value'])) {
                    $values = &$attributes[$i]['value'];
                    for ($j = 0; $j < count($values); $j++) {
                        switch ($id) {
                            case 'pkcs-9-at-***REMOVED***':
                                $this->***REMOVED***($values, $j);
                                break;
                        }

                        if (!is_bool($map)) {
                            $temp = ASN1::encodeDER($values[$j], $map);
                            $decoded = ASN1::decodeBER($temp);
                            if (!$decoded) {
                                continue;
                            }
                            $values[$j] = ASN1::asn1map($decoded[0], Maps\***REMOVED***::MAP);
                        }
                    }
                }
            }
        }
    }

    /**
     * Map DN values from ANY type to DN-specific internal
     *   format.
     *
     * @param array $root (by reference)
     * @param string $path
     */
    private function mapInDNs(array &$root, $path)
    {
        $dns = &$this->subArray($root, $path);

        if (is_array($dns)) {
            for ($i = 0; $i < count($dns); $i++) {
                for ($j = 0; $j < count($dns[$i]); $j++) {
                    $type = $dns[$i][$j]['type'];
                    $value = &$dns[$i][$j]['value'];
                    if (is_object($value) && $value instanceof Element) {
                        $map = $this->getMapping($type);
                        if (!is_bool($map)) {
                            $decoded = ASN1::decodeBER($value);
                            if (!$decoded) {
                                continue;
                            }
                            $value = ASN1::asn1map($decoded[0], $map);
                        }
                    }
                }
            }
        }
    }

    /**
     * Map DN values from DN-specific internal format to
     *   ANY type.
     *
     * @param array $root (by reference)
     * @param string $path
     */
    private function mapOutDNs(array &$root, $path)
    {
        $dns = &$this->subArray($root, $path);

        if (is_array($dns)) {
            $size = count($dns);
            for ($i = 0; $i < $size; $i++) {
                for ($j = 0; $j < count($dns[$i]); $j++) {
                    $type = $dns[$i][$j]['type'];
                    $value = &$dns[$i][$j]['value'];
                    if (is_object($value) && $value instanceof Element) {
                        continue;
                    }

                    $map = $this->getMapping($type);
                    if (!is_bool($map)) {
                        $value = new Element(ASN1::encodeDER($value, $map));
                    }
                }
            }
        }
    }

    /**
     * Associate an extension ID to an extension mapping
     *
     * @param string $extnId
     * @return mixed
     */
    private function getMapping($extnId)
    {
        if (!is_string($extnId)) { // eg. if it's a \phpseclib3\File\ASN1\Element object
            return true;
        }

        if (isset(self::$extensions[$extnId])) {
            return self::$extensions[$extnId];
        }

        switch ($extnId) {
            case 'id-ce-keyUsage':
                return Maps\KeyUsage::MAP;
            case 'id-ce-***REMOVED***':
                return Maps\***REMOVED***::MAP;
            case 'id-ce-***REMOVED***':
                return Maps\KeyIdentifier::MAP;
            case 'id-ce-cRLDistributionPoints':
                return Maps\CRLDistributionPoints::MAP;
            case 'id-ce-authorityKeyIdentifier':
                return Maps\AuthorityKeyIdentifier::MAP;
            case 'id-ce-***REMOVED***':
                return Maps\***REMOVED***::MAP;
            case 'id-ce-extKeyUsage':
                return Maps\***REMOVED***::MAP;
            case 'id-pe-***REMOVED***':
                return Maps\AuthorityInfoAccessSyntax::MAP;
            case 'id-ce-***REMOVED***':
                return Maps\***REMOVED***::MAP;
            case 'id-ce-subjectDirectoryAttributes':
                return Maps\SubjectDirectoryAttributes::MAP;
            case 'id-ce-privateKeyUsagePeriod':
                return Maps\PrivateKeyUsagePeriod::MAP;
            case 'id-ce-issuerAltName':
                return Maps\IssuerAltName::MAP;
            case 'id-ce-***REMOVED***':
                return Maps\***REMOVED***::MAP;
            case 'id-ce-***REMOVED***':
                return Maps\***REMOVED***::MAP;

            case 'netscape-cert-type':
                return Maps\netscape_cert_type::MAP;
            case 'netscape-comment':
                return Maps\netscape_comment::MAP;
            case 'netscape-ca-policy-url':
                return Maps\netscape_ca_policy_url::MAP;

            // since id-qt-cps isn't a constructed type it will have already been decoded as a string by the time it gets
            // back around to asn1map() and we don't want it decoded again.
            //case 'id-qt-cps':
            //    return Maps\CPSuri::MAP;
            case 'id-qt-unotice':
                return Maps\UserNotice::MAP;

            // the following OIDs are unsupported but we don't want them to give notices when calling saveX509().
            case 'id-pe-logotype': // http://www.ietf.org/rfc/rfc3709.txt
            case '***REMOVED***':
            // http://support.microsoft.com/kb/287547
            case '1.3.6.1.4.1.311.20.2': // szOID_ENROLL_CERTTYPE_EXTENSION
            case '1.3.6.1.4.1.311.21.1': // szOID_CERTSRV_CA_VERSION
            // "SET Secure Electronic Transaction Specification"
            // http://www.maithean.com/docs/set_bk3.pdf
            case '2.23.42.7.0': // id-set-hashedRootKey
            // "Certificate Transparency"
            // https://tools.ietf.org/html/rfc6962
            case '1.3.6.1.4.1.11129.2.4.2':
            // "Qualified Certificate statements"
            // https://tools.ietf.org/html/rfc3739#section-3.2.6
            case '1.3.6.1.5.5.7.1.3':
                return true;

            // CSR attributes
            case 'pkcs-9-at-***REMOVED***':
                return Maps\PKCS9String::MAP;
            case 'pkcs-9-at-***REMOVED***':
                return Maps\***REMOVED***::MAP;
            case 'pkcs-9-at-***REMOVED***':
                return Maps\Extensions::MAP;

            // CRL extensions.
            case 'id-ce-cRLNumber':
                return Maps\CRLNumber::MAP;
            case 'id-ce-***REMOVED***':
                return Maps\CRLNumber::MAP;
            case 'id-ce-issuingDistributionPoint':
                return Maps\IssuingDistributionPoint::MAP;
            case 'id-ce-freshestCRL':
                return Maps\CRLDistributionPoints::MAP;
            case 'id-ce-cRLReasons':
                return Maps\CRLReason::MAP;
            case 'id-ce-***REMOVED***':
                return Maps\***REMOVED***::MAP;
            case 'id-ce-***REMOVED***':
                return Maps\***REMOVED***::MAP;
            case 'id-ce-***REMOVED***':
                return Maps\***REMOVED***::MAP;
            case 'id-at-postalAddress':
                return Maps\PostalAddress::MAP;
        }

        return false;
    }

    /**
     * Load an X.509 certificate as a certificate authority
     *
     * @param string $cert
     * @return bool
     */
    public function loadCA($cert)
    {
        $olddn = $this->dn;
        $oldcert = $this->currentCert;
        $oldsigsubj = $this->***REMOVED***;
        $oldkeyid = $this->***REMOVED***;

        $cert = $this->loadX509($cert);
        if (!$cert) {
            $this->dn = $olddn;
            $this->currentCert = $oldcert;
            $this->***REMOVED*** = $oldsigsubj;
            $this->***REMOVED*** = $oldkeyid;

            return false;
        }

        /* From RFC5280 "PKIX Certificate and CRL Profile":

           If the keyUsage extension is present, then the subject public key
           MUST NOT be used to verify signatures on certificates or CRLs unless
           the corresponding keyCertSign or cRLSign bit is set. */
        //$keyUsage = $this->getExtension('id-ce-keyUsage');
        //if ($keyUsage && !in_array('keyCertSign', $keyUsage)) {
        //    return false;
        //}

        /* From RFC5280 "PKIX Certificate and CRL Profile":

           The cA boolean indicates whether the certified public key may be used
           to verify certificate signatures.  If the cA boolean is not asserted,
           then the keyCertSign bit in the key usage extension MUST NOT be
           asserted.  If the basic constraints extension is not present in a
           version 3 certificate, or the extension is present but the cA boolean
           is not asserted, then the certified public key MUST NOT be used to
           verify certificate signatures. */
        //$***REMOVED*** = $this->getExtension('id-ce-***REMOVED***');
        //if (!$***REMOVED*** || !$***REMOVED***['cA']) {
        //    return false;
        //}

        $this->CAs[] = $cert;

        $this->dn = $olddn;
        $this->currentCert = $oldcert;
        $this->***REMOVED*** = $oldsigsubj;

        return true;
    }

    /**
     * Validate an X.509 certificate against a URL
     *
     * From RFC2818 "HTTP over TLS":
     *
     * Matching is performed using the matching rules specified by
     * [RFC2459].  If more than one identity of a given type is present in
     * the certificate (e.g., more than one dNSName name, a match in any one
     * of the set is considered acceptable.) Names may contain the wildcard
     * character * which is considered to match any single domain name
     * component or component fragment. E.g., *.a.com matches foo.a.com but
     * not bar.foo.a.com. f*.com matches foo.com but not bar.com.
     *
     * @param string $url
     * @return bool
     */
    public function validateURL($url)
    {
        if (!is_array($this->currentCert) || !isset($this->currentCert['***REMOVED***'])) {
            return false;
        }

        $components = parse_url($url);
        if (!isset($components['host'])) {
            return false;
        }

        if ($names = $this->getExtension('id-ce-***REMOVED***')) {
            foreach ($names as $name) {
                foreach ($name as $key => $value) {
                    $value = preg_quote($value);
                    $value = str_replace('\*', '[^.]*', $value);
                    switch ($key) {
                        case 'dNSName':
                            /* From RFC2818 "HTTP over TLS":

                               If a ***REMOVED*** extension of type dNSName is present, that MUST
                               be used as the identity. Otherwise, the (most specific) Common Name
                               field in the Subject field of the certificate MUST be used. Although
                               the use of the Common Name is existing practice, it is deprecated and
                               Certification Authorities are encouraged to use the dNSName instead. */
                            if (preg_match('#^' . $value . '$#', $components['host'])) {
                                return true;
                            }
                            break;
                        case 'iPAddress':
                            /* From RFC2818 "HTTP over TLS":

                               In some cases, the URI is specified as an IP address rather than a
                               hostname. In this case, the iPAddress ***REMOVED*** must be present
                               in the certificate and must exactly match the IP in the URI. */
                            if (preg_match('#(?:\d{1-3}\.){4}#', $components['host'] . '.') && preg_match('#^' . $value . '$#', $components['host'])) {
                                return true;
                            }
                    }
                }
            }
            return false;
        }

        if ($value = $this->getDNProp('id-at-commonName')) {
            $value = str_replace(['.', '*'], ['\.', '[^.]*'], $value[0]);
            return preg_match('#^' . $value . '$#', $components['host']) === 1;
        }

        return false;
    }

    /**
     * Validate a date
     *
     * If $date isn't defined it is assumed to be the current date.
     *
     * @param \***REMOVED***|string $date optional
     * @return bool
     */
    public function validateDate($date = null)
    {
        if (!is_array($this->currentCert) || !isset($this->currentCert['***REMOVED***'])) {
            return false;
        }

        if (!isset($date)) {
            $date = new \***REMOVED***('now', new \DateTimeZone(@date_default_timezone_get()));
        }

        $notBefore = $this->currentCert['***REMOVED***']['validity']['notBefore'];
        $notBefore = isset($notBefore['generalTime']) ? $notBefore['generalTime'] : $notBefore['utcTime'];

        $notAfter = $this->currentCert['***REMOVED***']['validity']['notAfter'];
        $notAfter = isset($notAfter['generalTime']) ? $notAfter['generalTime'] : $notAfter['utcTime'];

        if (is_string($date)) {
            $date = new \***REMOVED***($date, new \DateTimeZone(@date_default_timezone_get()));
        }

        $notBefore = new \***REMOVED***($notBefore, new \DateTimeZone(@date_default_timezone_get()));
        $notAfter = new \***REMOVED***($notAfter, new \DateTimeZone(@date_default_timezone_get()));

        return $date >= $notBefore && $date <= $notAfter;
    }

    /**
     * Fetches a URL
     *
     * @param string $url
     * @return bool|string
     */
    private static function fetchURL($url)
    {
        if (self::$disable_url_fetch) {
            return false;
        }

        $parts = parse_url($url);
        $data = '';
        switch ($parts['scheme']) {
            case 'http':
                $fsock = @fsockopen($parts['host'], isset($parts['port']) ? $parts['port'] : 80);
                if (!$fsock) {
                    return false;
                }
                $path = $parts['path'];
                if (isset($parts['query'])) {
                    $path .= '?' . $parts['query'];
                }
                fputs($fsock, "GET $path HTTP/1.0\r\n");
                fputs($fsock, "Host: $parts[host]\r\n\r\n");
                $line = fgets($fsock, 1024);
                if (strlen($line) < 3) {
                    return false;
                }
                preg_match('#HTTP/1.\d (\d{3})#', $line, $temp);
                if ($temp[1] != '200') {
                    return false;
                }

                // skip the rest of the headers in the http response
                while (!feof($fsock) && fgets($fsock, 1024) != "\r\n") {
                }

                while (!feof($fsock)) {
                    $temp = fread($fsock, 1024);
                    if ($temp === false) {
                        return false;
                    }
                    $data .= $temp;
                }

                break;
            //case 'ftp':
            //case 'ldap':
            //default:
        }

        return $data;
    }

    /**
     * Validates an intermediate cert as identified via authority info access extension
     *
     * See https://tools.ietf.org/html/rfc4325 for more info
     *
     * @param bool $caonly
     * @param int $count
     * @return bool
     */
    private function ***REMOVED***($caonly, $count)
    {
        $opts = $this->getExtension('id-pe-***REMOVED***');
        if (!is_array($opts)) {
            return false;
        }
        foreach ($opts as $opt) {
            if ($opt['accessMethod'] == 'id-ad-caIssuers') {
                // ***REMOVED*** is a GeneralName. GeneralName fields support stuff like email addresses, IP addresses, LDAP,
                // etc, but we're only supporting URI's. URI's and LDAP are the only thing https://tools.ietf.org/html/rfc4325
                // discusses
                if (isset($opt['***REMOVED***']['uniformResourceIdentifier'])) {
                    $url = $opt['***REMOVED***']['uniformResourceIdentifier'];
                    break;
                }
            }
        }

        if (!isset($url)) {
            return false;
        }

        $cert = static::fetchURL($url);
        if (!is_string($cert)) {
            return false;
        }

        $parent = new static();
        $parent->CAs = $this->CAs;
        /*
         "Conforming applications that support HTTP or FTP for accessing
          certificates MUST be able to accept .cer files and SHOULD be able
          to accept .p7c files." -- https://tools.ietf.org/html/rfc4325

         A .p7c file is 'a "certs-only" CMS message as specified in RFC 2797"

         These are currently unsupported
        */
        if (!is_array($parent->loadX509($cert))) {
            return false;
        }

        if (!$parent->validateSignatureCountable($caonly, ++$count)) {
            return false;
        }

        $this->CAs[] = $parent->currentCert;
        //$this->loadCA($cert);

        return true;
    }

    /**
     * Validate a signature
     *
     * Works on X.509 certs, CSR's and CRL's.
     * Returns true if the signature is verified, false if it is not correct or null on error
     *
     * By default returns false for self-signed certs. Call ***REMOVED***(false) to make this support
     * self-signed.
     *
     * The behavior of this function is inspired by {@link http://php.net/openssl-verify openssl_verify}.
     *
     * @param bool $caonly optional
     * @return mixed
     */
    public function ***REMOVED***($caonly = true)
    {
        return $this->validateSignatureCountable($caonly, 0);
    }

    /**
     * Validate a signature
     *
     * Performs said validation whilst keeping track of how many times validation method is called
     *
     * @param bool $caonly
     * @param int $count
     * @return mixed
     */
    private function validateSignatureCountable($caonly, $count)
    {
        if (!is_array($this->currentCert) || !isset($this->***REMOVED***)) {
            return null;
        }

        if ($count == self::$recur_limit) {
            return false;
        }

        /* TODO:
           "emailAddress attribute values are not case-sensitive (e.g., "subscriber@example.com" is the same as "SUBSCRIBER@EXAMPLE.COM")."
            -- http://tools.ietf.org/html/rfc5280#section-4.1.2.6

           implement ***REMOVED*** in the id-ce-***REMOVED*** extension */

        switch (true) {
            case isset($this->currentCert['***REMOVED***']):
                // self-signed cert
                switch (true) {
                    case !defined('FILE_X509_IGNORE_TYPE') && $this->currentCert['***REMOVED***']['issuer'] === $this->currentCert['***REMOVED***']['subject']:
                    case defined('FILE_X509_IGNORE_TYPE') && $this->getIssuerDN(self::DN_STRING) === $this->getDN(self::DN_STRING):
                        $authorityKey = $this->getExtension('id-ce-authorityKeyIdentifier');
                        $subjectKeyID = $this->getExtension('id-ce-***REMOVED***');
                        switch (true) {
                            case !is_array($authorityKey):
                            case !$subjectKeyID:
                            case isset($authorityKey['keyIdentifier']) && $authorityKey['keyIdentifier'] === $subjectKeyID:
                                $signingCert = $this->currentCert; // working cert
                        }
                }

                if (!empty($this->CAs)) {
                    for ($i = 0; $i < count($this->CAs); $i++) {
                        // even if the cert is a self-signed one we still want to see if it's a CA;
                        // if not, we'll conditionally return an error
                        $ca = $this->CAs[$i];
                        switch (true) {
                            case !defined('FILE_X509_IGNORE_TYPE') && $this->currentCert['***REMOVED***']['issuer'] === $ca['***REMOVED***']['subject']:
                            case defined('FILE_X509_IGNORE_TYPE') && $this->getDN(self::DN_STRING, $this->currentCert['***REMOVED***']['issuer']) === $this->getDN(self::DN_STRING, $ca['***REMOVED***']['subject']):
                                $authorityKey = $this->getExtension('id-ce-authorityKeyIdentifier');
                                $subjectKeyID = $this->getExtension('id-ce-***REMOVED***', $ca);
                                switch (true) {
                                    case !is_array($authorityKey):
                                    case !$subjectKeyID:
                                    case isset($authorityKey['keyIdentifier']) && $authorityKey['keyIdentifier'] === $subjectKeyID:
                                        if (is_array($authorityKey) && isset($authorityKey['authorityCertSerialNumber']) && !$authorityKey['authorityCertSerialNumber']->equals($ca['***REMOVED***']['serialNumber'])) {
                                            break 2; // serial mismatch - check other ca
                                        }
                                        $signingCert = $ca; // working cert
                                        break 3;
                                }
                        }
                    }
                    if (count($this->CAs) == $i && $caonly) {
                        return $this->***REMOVED***($caonly, $count) && $this->***REMOVED***($caonly);
                    }
                } elseif (!isset($signingCert) || $caonly) {
                    return $this->***REMOVED***($caonly, $count) && $this->***REMOVED***($caonly);
                }
                return $this->validateSignatureHelper(
                    $signingCert['***REMOVED***']['***REMOVED***']['algorithm']['algorithm'],
                    $signingCert['***REMOVED***']['***REMOVED***']['***REMOVED***'],
                    $this->currentCert['***REMOVED***']['algorithm'],
                    substr($this->currentCert['signature'], 1),
                    $this->***REMOVED***
                );
            case isset($this->currentCert['certificationRequestInfo']):
                return $this->validateSignatureHelper(
                    $this->currentCert['certificationRequestInfo']['subjectPKInfo']['algorithm']['algorithm'],
                    $this->currentCert['certificationRequestInfo']['subjectPKInfo']['***REMOVED***'],
                    $this->currentCert['***REMOVED***']['algorithm'],
                    substr($this->currentCert['signature'], 1),
                    $this->***REMOVED***
                );
            case isset($this->currentCert['publicKeyAndChallenge']):
                return $this->validateSignatureHelper(
                    $this->currentCert['publicKeyAndChallenge']['spki']['algorithm']['algorithm'],
                    $this->currentCert['publicKeyAndChallenge']['spki']['***REMOVED***'],
                    $this->currentCert['***REMOVED***']['algorithm'],
                    substr($this->currentCert['signature'], 1),
                    $this->***REMOVED***
                );
            case isset($this->currentCert['tbsCertList']):
                if (!empty($this->CAs)) {
                    for ($i = 0; $i < count($this->CAs); $i++) {
                        $ca = $this->CAs[$i];
                        switch (true) {
                            case !defined('FILE_X509_IGNORE_TYPE') && $this->currentCert['tbsCertList']['issuer'] === $ca['***REMOVED***']['subject']:
                            case defined('FILE_X509_IGNORE_TYPE') && $this->getDN(self::DN_STRING, $this->currentCert['tbsCertList']['issuer']) === $this->getDN(self::DN_STRING, $ca['***REMOVED***']['subject']):
                                $authorityKey = $this->getExtension('id-ce-authorityKeyIdentifier');
                                $subjectKeyID = $this->getExtension('id-ce-***REMOVED***', $ca);
                                switch (true) {
                                    case !is_array($authorityKey):
                                    case !$subjectKeyID:
                                    case isset($authorityKey['keyIdentifier']) && $authorityKey['keyIdentifier'] === $subjectKeyID:
                                        if (is_array($authorityKey) && isset($authorityKey['authorityCertSerialNumber']) && !$authorityKey['authorityCertSerialNumber']->equals($ca['***REMOVED***']['serialNumber'])) {
                                            break 2; // serial mismatch - check other ca
                                        }
                                        $signingCert = $ca; // working cert
                                        break 3;
                                }
                        }
                    }
                }
                if (!isset($signingCert)) {
                    return false;
                }
                return $this->validateSignatureHelper(
                    $signingCert['***REMOVED***']['***REMOVED***']['algorithm']['algorithm'],
                    $signingCert['***REMOVED***']['***REMOVED***']['***REMOVED***'],
                    $this->currentCert['***REMOVED***']['algorithm'],
                    substr($this->currentCert['signature'], 1),
                    $this->***REMOVED***
                );
            default:
                return false;
        }
    }

    /**
     * Validates a signature
     *
     * Returns true if the signature is verified and false if it is not correct.
     * If the algorithms are unsupposed an exception is thrown.
     *
     * @param string $***REMOVED***
     * @param string $publicKey
     * @param string $***REMOVED***
     * @param string $signature
     * @param string $***REMOVED***
     * @throws \phpseclib3\Exception\UnsupportedAlgorithmException if the algorithm is unsupported
     * @return bool
     */
    private function validateSignatureHelper($***REMOVED***, $publicKey, $***REMOVED***, $signature, $***REMOVED***)
    {
        switch ($***REMOVED***) {
            case 'id-RSASSA-PSS':
                $key = RSA::loadFormat('PSS', $publicKey);
                break;
            case 'rsaEncryption':
                $key = RSA::loadFormat('PKCS8', $publicKey);
                switch ($***REMOVED***) {
                    case 'id-RSASSA-PSS':
                        break;
                    case '***REMOVED***':
                    case '***REMOVED***':
                    case 'sha1WithRSAEncryption':
                    case 'sha224WithRSAEncryption':
                    case 'sha256WithRSAEncryption':
                    case 'sha384WithRSAEncryption':
                    case 'sha512WithRSAEncryption':
                        $key = $key
                            ->withHash(preg_replace('#***REMOVED***$#', '', $***REMOVED***))
                            ->withPadding(RSA::SIGNATURE_PKCS1);
                        break;
                    default:
                        throw new UnsupportedAlgorithmException('Signature algorithm unsupported');
                }
                break;
            case 'id-Ed25519':
            case 'id-Ed448':
                $key = EC::loadFormat('PKCS8', $publicKey);
                break;
            case 'id-ecPublicKey':
                $key = EC::loadFormat('PKCS8', $publicKey);
                switch ($***REMOVED***) {
                    case 'ecdsa-with-SHA1':
                    case 'ecdsa-with-SHA224':
                    case 'ecdsa-with-SHA256':
                    case 'ecdsa-with-SHA384':
                    case 'ecdsa-with-SHA512':
                        $key = $key
                            ->withHash(preg_replace('#^ecdsa-with-#', '', strtolower($***REMOVED***)));
                        break;
                    default:
                        throw new UnsupportedAlgorithmException('Signature algorithm unsupported');
                }
                break;
            case 'id-dsa':
                $key = DSA::loadFormat('PKCS8', $publicKey);
                switch ($***REMOVED***) {
                    case 'id-dsa-with-sha1':
                    case 'id-dsa-with-sha224':
                    case 'id-dsa-with-sha256':
                        $key = $key
                            ->withHash(preg_replace('#^id-dsa-with-#', '', strtolower($***REMOVED***)));
                        break;
                    default:
                        throw new UnsupportedAlgorithmException('Signature algorithm unsupported');
                }
                break;
            default:
                throw new UnsupportedAlgorithmException('Public key algorithm unsupported');
        }

        return $key->verify($***REMOVED***, $signature);
    }

    /**
     * Sets the recursion limit
     *
     * When validating a signature it may be necessary to download intermediate certs from URI's.
     * An intermediate cert that linked to itself would result in an infinite loop so to prevent
     * that we set a recursion limit. A negative number means that there is no recursion limit.
     *
     * @param int $count
     */
    public static function setRecurLimit($count)
    {
        self::$recur_limit = $count;
    }

    /**
     * Prevents URIs from being automatically retrieved
     *
     */
    public static function ***REMOVED***()
    {
        self::$disable_url_fetch = true;
    }

    /**
     * Allows URIs to be automatically retrieved
     *
     */
    public static function ***REMOVED***()
    {
        self::$disable_url_fetch = false;
    }

    /**
     * Decodes an IP address
     *
     * Takes in a base64 encoded "blob" and returns a human readable IP address
     *
     * @param string $ip
     * @return string
     */
    public static function decodeIP($ip)
    {
        return inet_ntop($ip);
    }

    /**
     * Decodes an IP address in a name constraints extension
     *
     * Takes in a base64 encoded "blob" and returns a human readable IP address / mask
     *
     * @param string $ip
     * @return array
     */
    public static function decodeNameConstraintIP($ip)
    {
        $size = strlen($ip) >> 1;
        $mask = substr($ip, $size);
        $ip = substr($ip, 0, $size);
        return [inet_ntop($ip), inet_ntop($mask)];
    }

    /**
     * Encodes an IP address
     *
     * Takes a human readable IP address into a base64-encoded "blob"
     *
     * @param string|array $ip
     * @return string
     */
    public static function encodeIP($ip)
    {
        return is_string($ip) ?
            inet_pton($ip) :
            inet_pton($ip[0]) . inet_pton($ip[1]);
    }

    /**
     * "Normalizes" a Distinguished Name property
     *
     * @param string $propName
     * @return mixed
     */
    private function ***REMOVED***($propName)
    {
        switch (strtolower($propName)) {
            case 'jurisdictionofincorporationcountryname':
            case 'jurisdictioncountryname':
            case 'jurisdictionc':
                return 'jurisdictionOfIncorporationCountryName';
            case 'jurisdictionofincorporationstateorprovincename':
            case 'jurisdictionstateorprovincename':
            case '***REMOVED***':
                return 'jurisdictionOfIncorporationStateOrProvinceName';
            case 'jurisdictionlocalityname':
            case 'jurisdictionl':
                return 'jurisdictionLocalityName';
            case 'id-at-***REMOVED***':
            case '***REMOVED***':
                return 'id-at-***REMOVED***';
            case 'id-at-countryname':
            case 'countryname':
            case 'c':
                return 'id-at-countryName';
            case 'id-at-***REMOVED***':
            case '***REMOVED***':
            case 'o':
                return 'id-at-***REMOVED***';
            case 'id-at-dnqualifier':
            case 'dnqualifier':
                return 'id-at-dnQualifier';
            case 'id-at-commonname':
            case 'commonname':
            case 'cn':
                return 'id-at-commonName';
            case 'id-at-***REMOVED***':
            case '***REMOVED***':
            case 'state':
            case 'province':
            case 'provincename':
            case 'st':
                return 'id-at-***REMOVED***';
            case 'id-at-localityname':
            case 'localityname':
            case 'l':
                return 'id-at-localityName';
            case 'id-emailaddress':
            case 'emailaddress':
                return 'pkcs-9-at-emailAddress';
            case 'id-at-serialnumber':
            case 'serialnumber':
                return 'id-at-serialNumber';
            case 'id-at-postalcode':
            case 'postalcode':
                return 'id-at-postalCode';
            case 'id-at-streetaddress':
            case 'streetaddress':
                return 'id-at-streetAddress';
            case 'id-at-name':
            case 'name':
                return 'id-at-name';
            case 'id-at-givenname':
            case 'givenname':
                return 'id-at-givenName';
            case 'id-at-surname':
            case 'surname':
            case 'sn':
                return 'id-at-surname';
            case 'id-at-initials':
            case 'initials':
                return 'id-at-initials';
            case 'id-at-***REMOVED***':
            case '***REMOVED***':
                return 'id-at-***REMOVED***';
            case 'id-at-organizationalunitname':
            case 'organizationalunitname':
            case 'ou':
                return 'id-at-organizationalUnitName';
            case 'id-at-pseudonym':
            case 'pseudonym':
                return 'id-at-pseudonym';
            case 'id-at-title':
            case 'title':
                return 'id-at-title';
            case 'id-at-description':
            case 'description':
                return 'id-at-description';
            case 'id-at-role':
            case 'role':
                return 'id-at-role';
            case 'id-at-***REMOVED***':
            case '***REMOVED***':
            case '***REMOVED***':
                return 'id-at-***REMOVED***';
            case 'postaladdress':
            case 'id-at-postaladdress':
                return 'id-at-postalAddress';
            default:
                return false;
        }
    }

    /**
     * Set a Distinguished Name property
     *
     * @param string $propName
     * @param mixed $propValue
     * @param string $type optional
     * @return bool
     */
    public function setDNProp($propName, $propValue, $type = 'utf8String')
    {
        if (empty($this->dn)) {
            $this->dn = ['rdnSequence' => []];
        }

        if (($propName = $this->***REMOVED***($propName)) === false) {
            return false;
        }

        foreach ((array) $propValue as $v) {
            if (!is_array($v) && isset($type)) {
                $v = [$type => $v];
            }
            $this->dn['rdnSequence'][] = [
                [
                    'type' => $propName,
                    'value' => $v
                ]
            ];
        }

        return true;
    }

    /**
     * Remove Distinguished Name properties
     *
     * @param string $propName
     */
    public function removeDNProp($propName)
    {
        if (empty($this->dn)) {
            return;
        }

        if (($propName = $this->***REMOVED***($propName)) === false) {
            return;
        }

        $dn = &$this->dn['rdnSequence'];
        $size = count($dn);
        for ($i = 0; $i < $size; $i++) {
            if ($dn[$i][0]['type'] == $propName) {
                unset($dn[$i]);
            }
        }

        $dn = array_values($dn);
        // fix for https://bugs.php.net/75433 affecting PHP 7.2
        if (!isset($dn[0])) {
            $dn = array_splice($dn, 0, 0);
        }
    }

    /**
     * Get Distinguished Name properties
     *
     * @param string $propName
     * @param array $dn optional
     * @param bool $withType optional
     * @return mixed
     */
    public function getDNProp($propName, array $dn = null, $withType = false)
    {
        if (!isset($dn)) {
            $dn = $this->dn;
        }

        if (empty($dn)) {
            return false;
        }

        if (($propName = $this->***REMOVED***($propName)) === false) {
            return false;
        }

        $filters = [];
        $filters['value'] = ['type' => ASN1::TYPE_UTF8_STRING];
        ASN1::setFilters($filters);
        $this->mapOutDNs($dn, 'rdnSequence');
        $dn = $dn['rdnSequence'];
        $result = [];
        for ($i = 0; $i < count($dn); $i++) {
            if ($dn[$i][0]['type'] == $propName) {
                $v = $dn[$i][0]['value'];
                if (!$withType) {
                    if (is_array($v)) {
                        foreach ($v as $type => $s) {
                            $type = array_search($type, ASN1::ANY_MAP);
                            if ($type !== false && array_key_exists($type, ASN1::STRING_TYPE_SIZE)) {
                                $s = ASN1::convert($s, $type);
                                if ($s !== false) {
                                    $v = $s;
                                    break;
                                }
                            }
                        }
                        if (is_array($v)) {
                            $v = array_pop($v); // Always strip data type.
                        }
                    } elseif (is_object($v) && $v instanceof Element) {
                        $map = $this->getMapping($propName);
                        if (!is_bool($map)) {
                            $decoded = ASN1::decodeBER($v);
                            if (!$decoded) {
                                return false;
                            }
                            $v = ASN1::asn1map($decoded[0], $map);
                        }
                    }
                }
                $result[] = $v;
            }
        }

        return $result;
    }

    /**
     * Set a Distinguished Name
     *
     * @param mixed $dn
     * @param bool $merge optional
     * @param string $type optional
     * @return bool
     */
    public function setDN($dn, $merge = false, $type = 'utf8String')
    {
        if (!$merge) {
            $this->dn = null;
        }

        if (is_array($dn)) {
            if (isset($dn['rdnSequence'])) {
                $this->dn = $dn; // No merge here.
                return true;
            }

            // handles stuff generated by openssl_x509_parse()
            foreach ($dn as $prop => $value) {
                if (!$this->setDNProp($prop, $value, $type)) {
                    return false;
                }
            }
            return true;
        }

        // handles everything else
        $results = preg_split('#((?:^|, *|/)(?:C=|O=|OU=|CN=|L=|ST=|SN=|postalCode=|streetAddress=|emailAddress=|serialNumber=|organizationalUnitName=|title=|description=|role=|***REMOVED***=|postalAddress=))#', $dn, -1, PREG_SPLIT_DELIM_CAPTURE);
        for ($i = 1; $i < count($results); $i += 2) {
            $prop = trim($results[$i], ', =/');
            $value = $results[$i + 1];
            if (!$this->setDNProp($prop, $value, $type)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get the Distinguished Name for a certificates subject
     *
     * @param mixed $format optional
     * @param array $dn optional
     * @return array|bool|string
     */
    public function getDN($format = self::DN_ARRAY, array $dn = null)
    {
        if (!isset($dn)) {
            $dn = isset($this->currentCert['tbsCertList']) ? $this->currentCert['tbsCertList']['issuer'] : $this->dn;
        }

        switch ((int) $format) {
            case self::DN_ARRAY:
                return $dn;
            case self::DN_ASN1:
                $filters = [];
                $filters['rdnSequence']['value'] = ['type' => ASN1::TYPE_UTF8_STRING];
                ASN1::setFilters($filters);
                $this->mapOutDNs($dn, 'rdnSequence');
                return ASN1::encodeDER($dn, Maps\Name::MAP);
            case self::DN_CANON:
                //  No SEQUENCE around RDNs and all string values normalized as
                // trimmed lowercase UTF-8 with all spacing as one blank.
                // constructed RDNs will not be canonicalized
                $filters = [];
                $filters['value'] = ['type' => ASN1::TYPE_UTF8_STRING];
                ASN1::setFilters($filters);
                $result = '';
                $this->mapOutDNs($dn, 'rdnSequence');
                foreach ($dn['rdnSequence'] as $rdn) {
                    foreach ($rdn as $i => $attr) {
                        $attr = &$rdn[$i];
                        if (is_array($attr['value'])) {
                            foreach ($attr['value'] as $type => $v) {
                                $type = array_search($type, ASN1::ANY_MAP, true);
                                if ($type !== false && array_key_exists($type, ASN1::STRING_TYPE_SIZE)) {
                                    $v = ASN1::convert($v, $type);
                                    if ($v !== false) {
                                        $v = preg_replace('/\s+/', ' ', $v);
                                        $attr['value'] = strtolower(trim($v));
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    $result .= ASN1::encodeDER($rdn, Maps\RelativeDistinguishedName::MAP);
                }
                return $result;
            case self::DN_HASH:
                $dn = $this->getDN(self::DN_CANON, $dn);
                $hash = new Hash('sha1');
                $hash = $hash->hash($dn);
                extract(unpack('Vhash', $hash));
                return strtolower(Strings::bin2hex(pack('N', $hash)));
        }

        // Default is to return a string.
        $start = true;
        $output = '';

        $result = [];
        $filters = [];
        $filters['rdnSequence']['value'] = ['type' => ASN1::TYPE_UTF8_STRING];
        ASN1::setFilters($filters);
        $this->mapOutDNs($dn, 'rdnSequence');

        foreach ($dn['rdnSequence'] as $field) {
            $prop = $field[0]['type'];
            $value = $field[0]['value'];

            $delim = ', ';
            switch ($prop) {
                case 'id-at-countryName':
                    $desc = 'C';
                    break;
                case 'id-at-***REMOVED***':
                    $desc = 'ST';
                    break;
                case 'id-at-***REMOVED***':
                    $desc = 'O';
                    break;
                case 'id-at-organizationalUnitName':
                    $desc = 'OU';
                    break;
                case 'id-at-commonName':
                    $desc = 'CN';
                    break;
                case 'id-at-localityName':
                    $desc = 'L';
                    break;
                case 'id-at-surname':
                    $desc = 'SN';
                    break;
                case 'id-at-***REMOVED***':
                    $delim = '/';
                    $desc = '***REMOVED***';
                    break;
                case 'id-at-postalAddress':
                    $delim = '/';
                    $desc = 'postalAddress';
                    break;
                default:
                    $delim = '/';
                    $desc = preg_replace('#.+-([^-]+)$#', '$1', $prop);
            }

            if (!$start) {
                $output .= $delim;
            }
            if (is_array($value)) {
                foreach ($value as $type => $v) {
                    $type = array_search($type, ASN1::ANY_MAP, true);
                    if ($type !== false && array_key_exists($type, ASN1::STRING_TYPE_SIZE)) {
                        $v = ASN1::convert($v, $type);
                        if ($v !== false) {
                            $value = $v;
                            break;
                        }
                    }
                }
                if (is_array($value)) {
                    $value = array_pop($value); // Always strip data type.
                }
            } elseif (is_object($value) && $value instanceof Element) {
                $callback = function ($x) {
                    return '\x' . bin2hex($x[0]);
                };
                $value = strtoupper(preg_replace_callback('#[^\x20-\x7E]#', $callback, $value->element));
            }
            $output .= $desc . '=' . $value;
            $result[$desc] = isset($result[$desc]) ?
                array_merge((array) $result[$desc], [$value]) :
                $value;
            $start = false;
        }

        return $format == self::DN_OPENSSL ? $result : $output;
    }

    /**
     * Get the Distinguished Name for a certificate/crl issuer
     *
     * @param int $format optional
     * @return mixed
     */
    public function getIssuerDN($format = self::DN_ARRAY)
    {
        switch (true) {
            case !isset($this->currentCert) || !is_array($this->currentCert):
                break;
            case isset($this->currentCert['***REMOVED***']):
                return $this->getDN($format, $this->currentCert['***REMOVED***']['issuer']);
            case isset($this->currentCert['tbsCertList']):
                return $this->getDN($format, $this->currentCert['tbsCertList']['issuer']);
        }

        return false;
    }

    /**
     * Get the Distinguished Name for a certificate/csr subject
     * Alias of getDN()
     *
     * @param int $format optional
     * @return mixed
     */
    public function getSubjectDN($format = self::DN_ARRAY)
    {
        switch (true) {
            case !empty($this->dn):
                return $this->getDN($format);
            case !isset($this->currentCert) || !is_array($this->currentCert):
                break;
            case isset($this->currentCert['***REMOVED***']):
                return $this->getDN($format, $this->currentCert['***REMOVED***']['subject']);
            case isset($this->currentCert['certificationRequestInfo']):
                return $this->getDN($format, $this->currentCert['certificationRequestInfo']['subject']);
        }

        return false;
    }

    /**
     * Get an individual Distinguished Name property for a certificate/crl issuer
     *
     * @param string $propName
     * @param bool $withType optional
     * @return mixed
     */
    public function ***REMOVED***($propName, $withType = false)
    {
        switch (true) {
            case !isset($this->currentCert) || !is_array($this->currentCert):
                break;
            case isset($this->currentCert['***REMOVED***']):
                return $this->getDNProp($propName, $this->currentCert['***REMOVED***']['issuer'], $withType);
            case isset($this->currentCert['tbsCertList']):
                return $this->getDNProp($propName, $this->currentCert['tbsCertList']['issuer'], $withType);
        }

        return false;
    }

    /**
     * Get an individual Distinguished Name property for a certificate/csr subject
     *
     * @param string $propName
     * @param bool $withType optional
     * @return mixed
     */
    public function ***REMOVED***($propName, $withType = false)
    {
        switch (true) {
            case !empty($this->dn):
                return $this->getDNProp($propName, null, $withType);
            case !isset($this->currentCert) || !is_array($this->currentCert):
                break;
            case isset($this->currentCert['***REMOVED***']):
                return $this->getDNProp($propName, $this->currentCert['***REMOVED***']['subject'], $withType);
            case isset($this->currentCert['certificationRequestInfo']):
                return $this->getDNProp($propName, $this->currentCert['certificationRequestInfo']['subject'], $withType);
        }

        return false;
    }

    /**
     * Get the certificate chain for the current cert
     *
     * @return mixed
     */
    public function getChain()
    {
        $chain = [$this->currentCert];

        if (!is_array($this->currentCert) || !isset($this->currentCert['***REMOVED***'])) {
            return false;
        }
        while (true) {
            $currentCert = $chain[count($chain) - 1];
            for ($i = 0; $i < count($this->CAs); $i++) {
                $ca = $this->CAs[$i];
                if ($currentCert['***REMOVED***']['issuer'] === $ca['***REMOVED***']['subject']) {
                    $authorityKey = $this->getExtension('id-ce-authorityKeyIdentifier', $currentCert);
                    $subjectKeyID = $this->getExtension('id-ce-***REMOVED***', $ca);
                    switch (true) {
                        case !is_array($authorityKey):
                        case is_array($authorityKey) && isset($authorityKey['keyIdentifier']) && $authorityKey['keyIdentifier'] === $subjectKeyID:
                            if ($currentCert === $ca) {
                                break 3;
                            }
                            $chain[] = $ca;
                            break 2;
                    }
                }
            }
            if ($i == count($this->CAs)) {
                break;
            }
        }
        foreach ($chain as $key => $value) {
            $chain[$key] = new X509();
            $chain[$key]->loadX509($value);
        }
        return $chain;
    }

    /**
     * Returns the current cert
     *
     * @return array|bool
     */
    public function &***REMOVED***()
    {
        return $this->currentCert;
    }

    /**
     * Set public key
     *
     * Key needs to be a \phpseclib3\Crypt\RSA object
     *
     * @param PublicKey $key
     * @return void
     */
    public function setPublicKey(PublicKey $key)
    {
        $this->publicKey = $key;
    }

    /**
     * Set private key
     *
     * Key needs to be a \phpseclib3\Crypt\RSA object
     *
     * @param PrivateKey $key
     */
    public function setPrivateKey(PrivateKey $key)
    {
        $this->privateKey = $key;
    }

    /**
     * Set challenge
     *
     * Used for SPKAC CSR's
     *
     * @param string $challenge
     */
    public function setChallenge($challenge)
    {
        $this->challenge = $challenge;
    }

    /**
     * Gets the public key
     *
     * Returns a \phpseclib3\Crypt\RSA object or a false.
     *
     * @return mixed
     */
    public function getPublicKey()
    {
        if (isset($this->publicKey)) {
            return $this->publicKey;
        }

        if (isset($this->currentCert) && is_array($this->currentCert)) {
            $paths = [
                '***REMOVED***/***REMOVED***',
                'certificationRequestInfo/subjectPKInfo',
                'publicKeyAndChallenge/spki'
            ];
            foreach ($paths as $path) {
                $keyinfo = $this->subArray($this->currentCert, $path);
                if (!empty($keyinfo)) {
                    break;
                }
            }
        }
        if (empty($keyinfo)) {
            return false;
        }

        $key = $keyinfo['***REMOVED***'];

        switch ($keyinfo['algorithm']['algorithm']) {
            case 'id-RSASSA-PSS':
                return RSA::loadFormat('PSS', $key);
            case 'rsaEncryption':
                return RSA::loadFormat('PKCS8', $key)->withPadding(RSA::SIGNATURE_PKCS1);
            case 'id-ecPublicKey':
            case 'id-Ed25519':
            case 'id-Ed448':
                return EC::loadFormat('PKCS8', $key);
            case 'id-dsa':
                return DSA::loadFormat('PKCS8', $key);
        }

        return false;
    }

    /**
     * Load a Certificate Signing Request
     *
     * @param string $csr
     * @param int $mode
     * @return mixed
     */
    public function loadCSR($csr, $mode = self::FORMAT_AUTO_DETECT)
    {
        if (is_array($csr) && isset($csr['certificationRequestInfo'])) {
            unset($this->currentCert);
            unset($this->***REMOVED***);
            unset($this->***REMOVED***);
            $this->dn = $csr['certificationRequestInfo']['subject'];
            if (!isset($this->dn)) {
                return false;
            }

            $this->currentCert = $csr;
            return $csr;
        }

        // see http://tools.ietf.org/html/rfc2986

        if ($mode != self::FORMAT_DER) {
            $newcsr = ASN1::extractBER($csr);
            if ($mode == self::FORMAT_PEM && $csr == $newcsr) {
                return false;
            }
            $csr = $newcsr;
        }
        $orig = $csr;

        if ($csr === false) {
            $this->currentCert = false;
            return false;
        }

        $decoded = ASN1::decodeBER($csr);

        if (!$decoded) {
            $this->currentCert = false;
            return false;
        }

        $csr = ASN1::asn1map($decoded[0], Maps\***REMOVED***::MAP);
        if (!isset($csr) || $csr === false) {
            $this->currentCert = false;
            return false;
        }

        $this->***REMOVED***($csr, 'certificationRequestInfo/attributes');
        $this->mapInDNs($csr, 'certificationRequestInfo/subject/rdnSequence');

        $this->dn = $csr['certificationRequestInfo']['subject'];

        $this->***REMOVED*** = substr($orig, $decoded[0]['content'][0]['start'], $decoded[0]['content'][0]['length']);

        $key = $csr['certificationRequestInfo']['subjectPKInfo'];
        $key = ASN1::encodeDER($key, Maps\***REMOVED***::MAP);
        $csr['certificationRequestInfo']['subjectPKInfo']['***REMOVED***'] =
            "-----BEGIN PUBLIC KEY-----\r\n" .
            chunk_split(base64_encode($key), 64) .
            "-----END PUBLIC KEY-----";

        $this->***REMOVED*** = null;
        $this->currentCert = $csr;

        $this->publicKey = null;
        $this->publicKey = $this->getPublicKey();

        return $csr;
    }

    /**
     * Save CSR request
     *
     * @param array $csr
     * @param int $format optional
     * @return string
     */
    public function saveCSR(array $csr, $format = self::FORMAT_PEM)
    {
        if (!is_array($csr) || !isset($csr['certificationRequestInfo'])) {
            return false;
        }

        switch (true) {
            case !($algorithm = $this->subArray($csr, 'certificationRequestInfo/subjectPKInfo/algorithm/algorithm')):
            case is_object($csr['certificationRequestInfo']['subjectPKInfo']['***REMOVED***']):
                break;
            default:
                $csr['certificationRequestInfo']['subjectPKInfo'] = new Element(
                    base64_decode(preg_replace('#-.+-|[\r\n]#', '', $csr['certificationRequestInfo']['subjectPKInfo']['***REMOVED***']))
                );
        }

        $filters = [];
        $filters['certificationRequestInfo']['subject']['rdnSequence']['value']
            = ['type' => ASN1::TYPE_UTF8_STRING];

        ASN1::setFilters($filters);

        $this->mapOutDNs($csr, 'certificationRequestInfo/subject/rdnSequence');
        $this->***REMOVED***($csr, 'certificationRequestInfo/attributes');
        $csr = ASN1::encodeDER($csr, Maps\***REMOVED***::MAP);

        switch ($format) {
            case self::FORMAT_DER:
                return $csr;
            // case self::FORMAT_PEM:
            default:
                return "-----BEGIN CERTIFICATE REQUEST-----\r\n" . chunk_split(Strings::base64_encode($csr), 64) . '-----END CERTIFICATE REQUEST-----';
        }
    }

    /**
     * Load a SPKAC CSR
     *
     * SPKAC's are produced by the HTML5 keygen element:
     *
     * https://developer.mozilla.org/en-US/docs/HTML/Element/keygen
     *
     * @param string $spkac
     * @return mixed
     */
    public function loadSPKAC($spkac)
    {
        if (is_array($spkac) && isset($spkac['publicKeyAndChallenge'])) {
            unset($this->currentCert);
            unset($this->***REMOVED***);
            unset($this->***REMOVED***);
            $this->currentCert = $spkac;
            return $spkac;
        }

        // see http://www.w3.org/html/wg/drafts/html/master/forms.html#signedpublickeyandchallenge

        // OpenSSL produces SPKAC's that are preceded by the string SPKAC=
        $temp = preg_replace('#(?:SPKAC=)|[ \r\n\\\]#', '', $spkac);
        $temp = preg_match('#^[a-zA-Z\d/+]*={0,2}$#', $temp) ? Strings::base64_decode($temp) : false;
        if ($temp != false) {
            $spkac = $temp;
        }
        $orig = $spkac;

        if ($spkac === false) {
            $this->currentCert = false;
            return false;
        }

        $decoded = ASN1::decodeBER($spkac);

        if (!$decoded) {
            $this->currentCert = false;
            return false;
        }

        $spkac = ASN1::asn1map($decoded[0], Maps\SignedPublicKeyAndChallenge::MAP);

        if (!isset($spkac) || !is_array($spkac)) {
            $this->currentCert = false;
            return false;
        }

        $this->***REMOVED*** = substr($orig, $decoded[0]['content'][0]['start'], $decoded[0]['content'][0]['length']);

        $key = $spkac['publicKeyAndChallenge']['spki'];
        $key = ASN1::encodeDER($key, Maps\***REMOVED***::MAP);
        $spkac['publicKeyAndChallenge']['spki']['***REMOVED***'] =
            "-----BEGIN PUBLIC KEY-----\r\n" .
            chunk_split(base64_encode($key), 64) .
            "-----END PUBLIC KEY-----";

        $this->***REMOVED*** = null;
        $this->currentCert = $spkac;

        $this->publicKey = null;
        $this->publicKey = $this->getPublicKey();

        return $spkac;
    }

    /**
     * Save a SPKAC CSR request
     *
     * @param array $spkac
     * @param int $format optional
     * @return string
     */
    public function saveSPKAC(array $spkac, $format = self::FORMAT_PEM)
    {
        if (!is_array($spkac) || !isset($spkac['publicKeyAndChallenge'])) {
            return false;
        }

        $algorithm = $this->subArray($spkac, 'publicKeyAndChallenge/spki/algorithm/algorithm');
        switch (true) {
            case !$algorithm:
            case is_object($spkac['publicKeyAndChallenge']['spki']['***REMOVED***']):
                break;
            default:
                $spkac['publicKeyAndChallenge']['spki'] = new Element(
                    base64_decode(preg_replace('#-.+-|[\r\n]#', '', $spkac['publicKeyAndChallenge']['spki']['***REMOVED***']))
                );
        }

        $spkac = ASN1::encodeDER($spkac, Maps\SignedPublicKeyAndChallenge::MAP);

        switch ($format) {
            case self::FORMAT_DER:
                return $spkac;
            // case self::FORMAT_PEM:
            default:
                // OpenSSL's ***REMOVED*** of SPKAC requires the SPKAC be preceded by SPKAC= and since there are pretty much
                // no other SPKAC decoders phpseclib will use that same format
                return 'SPKAC=' . Strings::base64_encode($spkac);
        }
    }

    /**
     * Load a Certificate Revocation List
     *
     * @param string $crl
     * @param int $mode
     * @return mixed
     */
    public function loadCRL($crl, $mode = self::FORMAT_AUTO_DETECT)
    {
        if (is_array($crl) && isset($crl['tbsCertList'])) {
            $this->currentCert = $crl;
            unset($this->***REMOVED***);
            return $crl;
        }

        if ($mode != self::FORMAT_DER) {
            $newcrl = ASN1::extractBER($crl);
            if ($mode == self::FORMAT_PEM && $crl == $newcrl) {
                return false;
            }
            $crl = $newcrl;
        }
        $orig = $crl;

        if ($crl === false) {
            $this->currentCert = false;
            return false;
        }

        $decoded = ASN1::decodeBER($crl);

        if (!$decoded) {
            $this->currentCert = false;
            return false;
        }

        $crl = ASN1::asn1map($decoded[0], Maps\***REMOVED***::MAP);
        if (!isset($crl) || $crl === false) {
            $this->currentCert = false;
            return false;
        }

        $this->***REMOVED*** = substr($orig, $decoded[0]['content'][0]['start'], $decoded[0]['content'][0]['length']);

        $this->mapInDNs($crl, 'tbsCertList/issuer/rdnSequence');
        if ($this->***REMOVED***($crl, 'tbsCertList/crlExtensions')) {
            $this->***REMOVED***($crl, 'tbsCertList/crlExtensions');
        }
        if ($this->***REMOVED***($crl, 'tbsCertList/***REMOVED***')) {
            $rclist_ref = &$this->***REMOVED***($crl, 'tbsCertList/***REMOVED***');
            if ($rclist_ref) {
                $rclist = $crl['tbsCertList']['***REMOVED***'];
                foreach ($rclist as $i => $extension) {
                    if ($this->***REMOVED***($rclist, "$i/***REMOVED***")) {
                        $this->***REMOVED***($rclist_ref, "$i/***REMOVED***");
                    }
                }
            }
        }

        $this->***REMOVED*** = null;
        $this->currentCert = $crl;

        return $crl;
    }

    /**
     * Save Certificate Revocation List.
     *
     * @param array $crl
     * @param int $format optional
     * @return string
     */
    public function saveCRL(array $crl, $format = self::FORMAT_PEM)
    {
        if (!is_array($crl) || !isset($crl['tbsCertList'])) {
            return false;
        }

        $filters = [];
        $filters['tbsCertList']['issuer']['rdnSequence']['value']
            = ['type' => ASN1::TYPE_UTF8_STRING];
        $filters['tbsCertList']['signature']['parameters']
            = ['type' => ASN1::TYPE_UTF8_STRING];
        $filters['***REMOVED***']['parameters']
            = ['type' => ASN1::TYPE_UTF8_STRING];

        if (empty($crl['tbsCertList']['signature']['parameters'])) {
            $filters['tbsCertList']['signature']['parameters']
                = ['type' => ASN1::TYPE_NULL];
        }

        if (empty($crl['***REMOVED***']['parameters'])) {
            $filters['***REMOVED***']['parameters']
                = ['type' => ASN1::TYPE_NULL];
        }

        ASN1::setFilters($filters);

        $this->mapOutDNs($crl, 'tbsCertList/issuer/rdnSequence');
        $this->***REMOVED***($crl, 'tbsCertList/crlExtensions');
        $rclist = &$this->subArray($crl, 'tbsCertList/***REMOVED***');
        if (is_array($rclist)) {
            foreach ($rclist as $i => $extension) {
                $this->***REMOVED***($rclist, "$i/***REMOVED***");
            }
        }

        $crl = ASN1::encodeDER($crl, Maps\***REMOVED***::MAP);

        switch ($format) {
            case self::FORMAT_DER:
                return $crl;
            // case self::FORMAT_PEM:
            default:
                return "-----BEGIN X509 CRL-----\r\n" . chunk_split(Strings::base64_encode($crl), 64) . '-----END X509 CRL-----';
        }
    }

    /**
     * Helper function to build a time field according to RFC 3280 section
     *  - 4.1.2.5 Validity
     *  - 5.1.2.4 This Update
     *  - 5.1.2.5 Next Update
     *  - 5.1.2.6 Revoked Certificates
     * by choosing utcTime iff year of date given is before 2050 and generalTime else.
     *
     * @param string $date in format date('D, d M Y H:i:s O')
     * @return array|Element
     */
    private function timeField($date)
    {
        if ($date instanceof Element) {
            return $date;
        }
        $dateObj = new \***REMOVED***($date, new \DateTimeZone('GMT'));
        $year = $dateObj->format('Y'); // the same way ASN1.php parses this
        if ($year < 2050) {
            return ['utcTime' => $date];
        } else {
            return ['generalTime' => $date];
        }
    }

    /**
     * Sign an X.509 certificate
     *
     * $issuer's private key needs to be loaded.
     * $subject can be either an existing X.509 cert (if you want to resign it),
     * a CSR or something with the DN and public key explicitly set.
     *
     * @return mixed
     */
    public function sign(X509 $issuer, X509 $subject)
    {
        if (!is_object($issuer->privateKey) || empty($issuer->dn)) {
            return false;
        }

        if (isset($subject->publicKey) && !($***REMOVED*** = $subject->formatSubjectPublicKey())) {
            return false;
        }

        $currentCert = isset($this->currentCert) ? $this->currentCert : null;
        $***REMOVED*** = isset($this->***REMOVED***) ? $this->***REMOVED*** : null;
        $***REMOVED*** = self::identifySignatureAlgorithm($issuer->privateKey);

        if (isset($subject->currentCert) && is_array($subject->currentCert) && isset($subject->currentCert['***REMOVED***'])) {
            $this->currentCert = $subject->currentCert;
            $this->currentCert['***REMOVED***']['signature'] = $***REMOVED***;
            $this->currentCert['***REMOVED***'] = $***REMOVED***;

            if (!empty($this->startDate)) {
                $this->currentCert['***REMOVED***']['validity']['notBefore'] = $this->timeField($this->startDate);
            }
            if (!empty($this->endDate)) {
                $this->currentCert['***REMOVED***']['validity']['notAfter'] = $this->timeField($this->endDate);
            }
            if (!empty($this->serialNumber)) {
                $this->currentCert['***REMOVED***']['serialNumber'] = $this->serialNumber;
            }
            if (!empty($subject->dn)) {
                $this->currentCert['***REMOVED***']['subject'] = $subject->dn;
            }
            if (!empty($subject->publicKey)) {
                $this->currentCert['***REMOVED***']['***REMOVED***'] = $***REMOVED***;
            }
            $this->***REMOVED***('id-ce-authorityKeyIdentifier');
            if (isset($subject->domains)) {
                $this->***REMOVED***('id-ce-***REMOVED***');
            }
        } elseif (isset($subject->currentCert) && is_array($subject->currentCert) && isset($subject->currentCert['tbsCertList'])) {
            return false;
        } else {
            if (!isset($subject->publicKey)) {
                return false;
            }

            $startDate = new \***REMOVED***('now', new \DateTimeZone(@date_default_timezone_get()));
            $startDate = !empty($this->startDate) ? $this->startDate : $startDate->format('D, d M Y H:i:s O');

            $endDate = new \***REMOVED***('+1 year', new \DateTimeZone(@date_default_timezone_get()));
            $endDate = !empty($this->endDate) ? $this->endDate : $endDate->format('D, d M Y H:i:s O');

            /* "The serial number MUST be a positive integer"
               "Conforming CAs MUST NOT use serialNumber values longer than 20 octets."
                -- https://tools.ietf.org/html/rfc5280#section-4.1.2.2

               for the integer to be positive the leading bit needs to be 0 hence the
               application of a bitmap
            */
            $serialNumber = !empty($this->serialNumber) ?
                $this->serialNumber :
                new BigInteger(Random::string(20) & ("\x7F" . str_repeat("\xFF", 19)), 256);

            $this->currentCert = [
                '***REMOVED***' =>
                    [
                        'version' => 'v3',
                        'serialNumber' => $serialNumber, // $this->***REMOVED***()
                        'signature' => $***REMOVED***,
                        'issuer' => false, // this is going to be overwritten later
                        'validity' => [
                            'notBefore' => $this->timeField($startDate), // $this->setStartDate()
                            'notAfter' => $this->timeField($endDate)   // $this->setEndDate()
                        ],
                        'subject' => $subject->dn,
                        '***REMOVED***' => $***REMOVED***
                    ],
                    '***REMOVED***' => $***REMOVED***,
                    'signature'          => false // this is going to be overwritten later
            ];

            // Copy extensions from CSR.
            $csrexts = $subject->getAttribute('pkcs-9-at-***REMOVED***', 0);

            if (!empty($csrexts)) {
                $this->currentCert['***REMOVED***']['extensions'] = $csrexts;
            }
        }

        $this->currentCert['***REMOVED***']['issuer'] = $issuer->dn;

        if (isset($issuer->***REMOVED***)) {
            $this->setExtension('id-ce-authorityKeyIdentifier', [
                    //'***REMOVED***' => array(
                    //    array(
                    //        'directoryName' => $issuer->dn
                    //    )
                    //),
                    'keyIdentifier' => $issuer->***REMOVED***
                ]);
            //$extensions = &$this->currentCert['***REMOVED***']['extensions'];
            //if (isset($issuer->serialNumber)) {
            //    $extensions[count($extensions) - 1]['authorityCertSerialNumber'] = $issuer->serialNumber;
            //}
            //unset($extensions);
        }

        if (isset($subject->***REMOVED***)) {
            $this->setExtension('id-ce-***REMOVED***', $subject->***REMOVED***);
        }

        $altName = [];

        if (isset($subject->domains) && count($subject->domains)) {
            $altName = array_map(['\phpseclib3\File\X509', 'dnsName'], $subject->domains);
        }

        if (isset($subject->ipAddresses) && count($subject->ipAddresses)) {
            // should an IP address appear as the CN if no domain name is specified? idk
            //$ips = count($subject->domains) ? $subject->ipAddresses : array_slice($subject->ipAddresses, 1);
            $ipAddresses = [];
            foreach ($subject->ipAddresses as $ipAddress) {
                $encoded = $subject->ipAddress($ipAddress);
                if ($encoded !== false) {
                    $ipAddresses[] = $encoded;
                }
            }
            if (count($ipAddresses)) {
                $altName = array_merge($altName, $ipAddresses);
            }
        }

        if (!empty($altName)) {
            $this->setExtension('id-ce-***REMOVED***', $altName);
        }

        if ($this->caFlag) {
            $keyUsage = $this->getExtension('id-ce-keyUsage');
            if (!$keyUsage) {
                $keyUsage = [];
            }

            $this->setExtension(
                'id-ce-keyUsage',
                array_values(array_unique(array_merge($keyUsage, ['cRLSign', 'keyCertSign'])))
            );

            $***REMOVED*** = $this->getExtension('id-ce-***REMOVED***');
            if (!$***REMOVED***) {
                $***REMOVED*** = [];
            }

            $this->setExtension(
                'id-ce-***REMOVED***',
                array_merge(['cA' => true], $***REMOVED***),
                true
            );

            if (!isset($subject->***REMOVED***)) {
                $this->setExtension('id-ce-***REMOVED***', $this->***REMOVED***($this->currentCert), false, false);
            }
        }

        // resync $this->***REMOVED***
        // save $***REMOVED*** in case there are any \phpseclib3\File\ASN1\Element objects in it
        $***REMOVED*** = $this->currentCert['***REMOVED***'];
        $this->loadX509($this->saveX509($this->currentCert));

        $result = $this->currentCert;
        $this->currentCert['signature'] = $result['signature'] = "\0" . $issuer->privateKey->sign($this->***REMOVED***);
        $result['***REMOVED***'] = $***REMOVED***;

        $this->currentCert = $currentCert;
        $this->***REMOVED*** = $***REMOVED***;

        return $result;
    }

    /**
     * Sign a CSR
     *
     * @return mixed
     */
    public function signCSR()
    {
        if (!is_object($this->privateKey) || empty($this->dn)) {
            return false;
        }

        $origPublicKey = $this->publicKey;
        $this->publicKey = $this->privateKey->getPublicKey();
        $publicKey = $this->formatSubjectPublicKey();
        $this->publicKey = $origPublicKey;

        $currentCert = isset($this->currentCert) ? $this->currentCert : null;
        $***REMOVED*** = isset($this->***REMOVED***) ? $this->***REMOVED*** : null;
        $***REMOVED*** = self::identifySignatureAlgorithm($this->privateKey);

        if (isset($this->currentCert) && is_array($this->currentCert) && isset($this->currentCert['certificationRequestInfo'])) {
            $this->currentCert['***REMOVED***'] = $***REMOVED***;
            if (!empty($this->dn)) {
                $this->currentCert['certificationRequestInfo']['subject'] = $this->dn;
            }
            $this->currentCert['certificationRequestInfo']['subjectPKInfo'] = $publicKey;
        } else {
            $this->currentCert = [
                'certificationRequestInfo' =>
                    [
                        'version' => 'v1',
                        'subject' => $this->dn,
                        'subjectPKInfo' => $publicKey
                    ],
                    '***REMOVED***' => $***REMOVED***,
                    'signature'          => false // this is going to be overwritten later
            ];
        }

        // resync $this->***REMOVED***
        // save $certificationRequestInfo in case there are any \phpseclib3\File\ASN1\Element objects in it
        $certificationRequestInfo = $this->currentCert['certificationRequestInfo'];
        $this->loadCSR($this->saveCSR($this->currentCert));

        $result = $this->currentCert;
        $this->currentCert['signature'] = $result['signature'] = "\0" . $this->privateKey->sign($this->***REMOVED***);
        $result['certificationRequestInfo'] = $certificationRequestInfo;

        $this->currentCert = $currentCert;
        $this->***REMOVED*** = $***REMOVED***;

        return $result;
    }

    /**
     * Sign a SPKAC
     *
     * @return mixed
     */
    public function signSPKAC()
    {
        if (!is_object($this->privateKey)) {
            return false;
        }

        $origPublicKey = $this->publicKey;
        $this->publicKey = $this->privateKey->getPublicKey();
        $publicKey = $this->formatSubjectPublicKey();
        $this->publicKey = $origPublicKey;

        $currentCert = isset($this->currentCert) ? $this->currentCert : null;
        $***REMOVED*** = isset($this->***REMOVED***) ? $this->***REMOVED*** : null;
        $***REMOVED*** = self::identifySignatureAlgorithm($this->privateKey);

        // re-signing a SPKAC seems silly but since everything else supports re-signing why not?
        if (isset($this->currentCert) && is_array($this->currentCert) && isset($this->currentCert['publicKeyAndChallenge'])) {
            $this->currentCert['***REMOVED***'] = $***REMOVED***;
            $this->currentCert['publicKeyAndChallenge']['spki'] = $publicKey;
            if (!empty($this->challenge)) {
                // the bitwise AND ensures that the output is a valid IA5String
                $this->currentCert['publicKeyAndChallenge']['challenge'] = $this->challenge & str_repeat("\x7F", strlen($this->challenge));
            }
        } else {
            $this->currentCert = [
                'publicKeyAndChallenge' =>
                    [
                        'spki' => $publicKey,
                        // quoting <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/keygen>,
                        // "A challenge string that is submitted along with the public key. Defaults to an empty string if not specified."
                        // both Firefox and OpenSSL ("openssl spkac -key private.key") behave this way
                        // we could alternatively do this instead if we ignored the specs:
                        // Random::string(8) & str_repeat("\x7F", 8)
                        'challenge' => !empty($this->challenge) ? $this->challenge : ''
                    ],
                    '***REMOVED***' => $***REMOVED***,
                    'signature'          => false // this is going to be overwritten later
            ];
        }

        // resync $this->***REMOVED***
        // save $publicKeyAndChallenge in case there are any \phpseclib3\File\ASN1\Element objects in it
        $publicKeyAndChallenge = $this->currentCert['publicKeyAndChallenge'];
        $this->loadSPKAC($this->saveSPKAC($this->currentCert));

        $result = $this->currentCert;
        $this->currentCert['signature'] = $result['signature'] = "\0" . $this->privateKey->sign($this->***REMOVED***);
        $result['publicKeyAndChallenge'] = $publicKeyAndChallenge;

        $this->currentCert = $currentCert;
        $this->***REMOVED*** = $***REMOVED***;

        return $result;
    }

    /**
     * Sign a CRL
     *
     * $issuer's private key needs to be loaded.
     *
     * @return mixed
     */
    public function signCRL(X509 $issuer, X509 $crl)
    {
        if (!is_object($issuer->privateKey) || empty($issuer->dn)) {
            return false;
        }

        $currentCert = isset($this->currentCert) ? $this->currentCert : null;
        $***REMOVED*** = isset($this->***REMOVED***) ? $this->***REMOVED*** : null;
        $***REMOVED*** = self::identifySignatureAlgorithm($issuer->privateKey);

        $thisUpdate = new \***REMOVED***('now', new \DateTimeZone(@date_default_timezone_get()));
        $thisUpdate = !empty($this->startDate) ? $this->startDate : $thisUpdate->format('D, d M Y H:i:s O');

        if (isset($crl->currentCert) && is_array($crl->currentCert) && isset($crl->currentCert['tbsCertList'])) {
            $this->currentCert = $crl->currentCert;
            $this->currentCert['tbsCertList']['signature'] = $***REMOVED***;
            $this->currentCert['***REMOVED***'] = $***REMOVED***;
        } else {
            $this->currentCert = [
                'tbsCertList' =>
                    [
                        'version' => 'v2',
                        'signature' => $***REMOVED***,
                        'issuer' => false, // this is going to be overwritten later
                        'thisUpdate' => $this->timeField($thisUpdate) // $this->setStartDate()
                    ],
                    '***REMOVED***' => $***REMOVED***,
                    'signature'          => false // this is going to be overwritten later
            ];
        }

        $tbsCertList = &$this->currentCert['tbsCertList'];
        $tbsCertList['issuer'] = $issuer->dn;
        $tbsCertList['thisUpdate'] = $this->timeField($thisUpdate);

        if (!empty($this->endDate)) {
            $tbsCertList['nextUpdate'] = $this->timeField($this->endDate); // $this->setEndDate()
        } else {
            unset($tbsCertList['nextUpdate']);
        }

        if (!empty($this->serialNumber)) {
            $crlNumber = $this->serialNumber;
        } else {
            $crlNumber = $this->getExtension('id-ce-cRLNumber');
            // "The CRL number is a non-critical CRL extension that conveys a
            //  monotonically increasing sequence number for a given CRL scope and
            //  CRL issuer.  This extension allows users to easily determine when a
            //  particular CRL supersedes another CRL."
            // -- https://tools.ietf.org/html/rfc5280#section-5.2.3
            $crlNumber = $crlNumber !== false ? $crlNumber->add(new BigInteger(1)) : null;
        }

        $this->***REMOVED***('id-ce-authorityKeyIdentifier');
        $this->***REMOVED***('id-ce-issuerAltName');

        // Be sure version >= v2 if some extension found.
        $version = isset($tbsCertList['version']) ? $tbsCertList['version'] : 0;
        if (!$version) {
            if (!empty($tbsCertList['crlExtensions'])) {
                $version = 1; // v2.
            } elseif (!empty($tbsCertList['***REMOVED***'])) {
                foreach ($tbsCertList['***REMOVED***'] as $cert) {
                    if (!empty($cert['***REMOVED***'])) {
                        $version = 1; // v2.
                    }
                }
            }

            if ($version) {
                $tbsCertList['version'] = $version;
            }
        }

        // Store additional extensions.
        if (!empty($tbsCertList['version'])) { // At least v2.
            if (!empty($crlNumber)) {
                $this->setExtension('id-ce-cRLNumber', $crlNumber);
            }

            if (isset($issuer->***REMOVED***)) {
                $this->setExtension('id-ce-authorityKeyIdentifier', [
                        //'***REMOVED***' => array(
                        //    ]
                        //        'directoryName' => $issuer->dn
                        //    ]
                        //),
                        'keyIdentifier' => $issuer->***REMOVED***
                    ]);
                //$extensions = &$tbsCertList['crlExtensions'];
                //if (isset($issuer->serialNumber)) {
                //    $extensions[count($extensions) - 1]['authorityCertSerialNumber'] = $issuer->serialNumber;
                //}
                //unset($extensions);
            }

            $issuerAltName = $this->getExtension('id-ce-***REMOVED***', $issuer->currentCert);

            if ($issuerAltName !== false) {
                $this->setExtension('id-ce-issuerAltName', $issuerAltName);
            }
        }

        if (empty($tbsCertList['***REMOVED***'])) {
            unset($tbsCertList['***REMOVED***']);
        }

        unset($tbsCertList);

        // resync $this->***REMOVED***
        // save $tbsCertList in case there are any \phpseclib3\File\ASN1\Element objects in it
        $tbsCertList = $this->currentCert['tbsCertList'];
        $this->loadCRL($this->saveCRL($this->currentCert));

        $result = $this->currentCert;
        $this->currentCert['signature'] = $result['signature'] = "\0" . $issuer->privateKey->sign($this->***REMOVED***);
        $result['tbsCertList'] = $tbsCertList;

        $this->currentCert = $currentCert;
        $this->***REMOVED*** = $***REMOVED***;

        return $result;
    }

    /**
     * Identify signature algorithm from key settings
     *
     * @param PrivateKey $key
     * @throws \phpseclib3\Exception\UnsupportedAlgorithmException if the algorithm is unsupported
     * @return array
     */
    private static function identifySignatureAlgorithm(PrivateKey $key)
    {
        if ($key instanceof RSA) {
            if ($key->getPadding() & RSA::SIGNATURE_PSS) {
                $r = PSS::load($key->withPassword()->toString('PSS'));
                return [
                    'algorithm' => 'id-RSASSA-PSS',
                    'parameters' => PSS::savePSSParams($r)
                ];
            }
            switch ($key->getHash()) {
                case 'md2':
                case 'md5':
                case 'sha1':
                case 'sha224':
                case 'sha256':
                case 'sha384':
                case 'sha512':
                    return ['algorithm' => $key->getHash() . '***REMOVED***'];
            }
            throw new UnsupportedAlgorithmException('The only supported hash algorithms for RSA are: md2, md5, sha1, sha224, sha256, sha384, sha512');
        }

        if ($key instanceof DSA) {
            switch ($key->getHash()) {
                case 'sha1':
                case 'sha224':
                case 'sha256':
                    return ['algorithm' => 'id-dsa-with-' . $key->getHash()];
            }
            throw new UnsupportedAlgorithmException('The only supported hash algorithms for DSA are: sha1, sha224, sha256');
        }

        if ($key instanceof EC) {
            switch ($key->getCurve()) {
                case 'Ed25519':
                case 'Ed448':
                    return ['algorithm' => 'id-' . $key->getCurve()];
            }
            switch ($key->getHash()) {
                case 'sha1':
                case 'sha224':
                case 'sha256':
                case 'sha384':
                case 'sha512':
                    return ['algorithm' => 'ecdsa-with-' . strtoupper($key->getHash())];
            }
            throw new UnsupportedAlgorithmException('The only supported hash algorithms for EC are: sha1, sha224, sha256, sha384, sha512');
        }

        throw new UnsupportedAlgorithmException('The only supported public key classes are: RSA, DSA, EC');
    }

    /**
     * Set certificate start date
     *
     * @param \***REMOVED***|string $date
     */
    public function setStartDate($date)
    {
        if (!is_object($date) || !($date instanceof \***REMOVED***)) {
            $date = new \***REMOVED***($date, new \DateTimeZone(@date_default_timezone_get()));
        }

        $this->startDate = $date->format('D, d M Y H:i:s O');
    }

    /**
     * Set certificate end date
     *
     * @param \***REMOVED***|string $date
     */
    public function setEndDate($date)
    {
        /*
          To indicate that a certificate has no well-defined expiration date,
          the notAfter SHOULD be assigned the ***REMOVED*** value of
          ***REMOVED***.

          -- http://tools.ietf.org/html/rfc5280#section-4.1.2.5
        */
        if (is_string($date) && strtolower($date) === 'lifetime') {
            $temp = '***REMOVED***';
            $temp = chr(ASN1::TYPE_GENERALIZED_TIME) . ASN1::encodeLength(strlen($temp)) . $temp;
            $this->endDate = new Element($temp);
        } else {
            if (!is_object($date) || !($date instanceof \***REMOVED***)) {
                $date = new \***REMOVED***($date, new \DateTimeZone(@date_default_timezone_get()));
            }

            $this->endDate = $date->format('D, d M Y H:i:s O');
        }
    }

    /**
     * Set Serial Number
     *
     * @param string $serial
     * @param int $base optional
     */
    public function ***REMOVED***($serial, $base = -256)
    {
        $this->serialNumber = new BigInteger($serial, $base);
    }

    /**
     * Turns the certificate into a certificate authority
     *
     */
    public function makeCA()
    {
        $this->caFlag = true;
    }

    /**
     * Check for validity of subarray
     *
     * This is intended for use in conjunction with _subArrayUnchecked(),
     * implementing the checks included in _subArray() but without copying
     * a potentially large array by passing its reference by-value to is_array().
     *
     * @param array $root
     * @param string $path
     * @return boolean
     */
    private function ***REMOVED***(array $root, $path)
    {
        if (!is_array($root)) {
            return false;
        }

        foreach (explode('/', $path) as $i) {
            if (!is_array($root)) {
                return false;
            }

            if (!isset($root[$i])) {
                return true;
            }

            $root = $root[$i];
        }

        return true;
    }

    /**
     * Get a reference to a subarray
     *
     * This variant of _subArray() does no is_array() checking,
     * so $root should be checked with _isSubArrayValid() first.
     *
     * This is here for performance reasons:
     * Passing a reference (i.e. $root) by-value (i.e. to is_array())
     * creates a copy. If $root is an especially large array, this is expensive.
     *
     * @param array $root
     * @param string $path  absolute path with / as component separator
     * @param bool $create optional
     * @return array|false
     */
    private function &***REMOVED***(array &$root, $path, $create = false)
    {
        $false = false;

        foreach (explode('/', $path) as $i) {
            if (!isset($root[$i])) {
                if (!$create) {
                    return $false;
                }

                $root[$i] = [];
            }

            $root = &$root[$i];
        }

        return $root;
    }

    /**
     * Get a reference to a subarray
     *
     * @param array $root
     * @param string $path  absolute path with / as component separator
     * @param bool $create optional
     * @return array|false
     */
    private function &subArray(array &$root = null, $path, $create = false)
    {
        $false = false;

        if (!is_array($root)) {
            return $false;
        }

        foreach (explode('/', $path) as $i) {
            if (!is_array($root)) {
                return $false;
            }

            if (!isset($root[$i])) {
                if (!$create) {
                    return $false;
                }

                $root[$i] = [];
            }

            $root = &$root[$i];
        }

        return $root;
    }

    /**
     * Get a reference to an extension subarray
     *
     * @param array $root
     * @param string $path optional absolute path with / as component separator
     * @param bool $create optional
     * @return array|false
     */
    private function &extensions(array &$root = null, $path = null, $create = false)
    {
        if (!isset($root)) {
            $root = $this->currentCert;
        }

        switch (true) {
            case !empty($path):
            case !is_array($root):
                break;
            case isset($root['***REMOVED***']):
                $path = '***REMOVED***/extensions';
                break;
            case isset($root['tbsCertList']):
                $path = 'tbsCertList/crlExtensions';
                break;
            case isset($root['certificationRequestInfo']):
                $pth = 'certificationRequestInfo/attributes';
                $attributes = &$this->subArray($root, $pth, $create);

                if (is_array($attributes)) {
                    foreach ($attributes as $key => $value) {
                        if ($value['type'] == 'pkcs-9-at-***REMOVED***') {
                            $path = "$pth/$key/value/0";
                            break 2;
                        }
                    }
                    if ($create) {
                        $key = count($attributes);
                        $attributes[] = ['type' => 'pkcs-9-at-***REMOVED***', 'value' => []];
                        $path = "$pth/$key/value/0";
                    }
                }
                break;
        }

        $extensions = &$this->subArray($root, $path, $create);

        if (!is_array($extensions)) {
            $false = false;
            return $false;
        }

        return $extensions;
    }

    /**
     * Remove an Extension
     *
     * @param string $id
     * @param string $path optional
     * @return bool
     */
    private function removeExtensionHelper($id, $path = null)
    {
        $extensions = &$this->extensions($this->currentCert, $path);

        if (!is_array($extensions)) {
            return false;
        }

        $result = false;
        foreach ($extensions as $key => $value) {
            if ($value['extnId'] == $id) {
                unset($extensions[$key]);
                $result = true;
            }
        }

        $extensions = array_values($extensions);
        // fix for https://bugs.php.net/75433 affecting PHP 7.2
        if (!isset($extensions[0])) {
            $extensions = array_splice($extensions, 0, 0);
        }
        return $result;
    }

    /**
     * Get an Extension
     *
     * Returns the extension if it exists and false if not
     *
     * @param string $id
     * @param array $cert optional
     * @param string $path optional
     * @return mixed
     */
    private function ***REMOVED***($id, array $cert = null, $path = null)
    {
        $extensions = $this->extensions($cert, $path);

        if (!is_array($extensions)) {
            return false;
        }

        foreach ($extensions as $key => $value) {
            if ($value['extnId'] == $id) {
                return $value['extnValue'];
            }
        }

        return false;
    }

    /**
     * Returns a list of all extensions in use
     *
     * @param array $cert optional
     * @param string $path optional
     * @return array
     */
    private function ***REMOVED***(array $cert = null, $path = null)
    {
        $exts = $this->extensions($cert, $path);
        $extensions = [];

        if (is_array($exts)) {
            foreach ($exts as $extension) {
                $extensions[] = $extension['extnId'];
            }
        }

        return $extensions;
    }

    /**
     * Set an Extension
     *
     * @param string $id
     * @param mixed $value
     * @param bool $critical optional
     * @param bool $replace optional
     * @param string $path optional
     * @return bool
     */
    private function ***REMOVED***($id, $value, $critical = false, $replace = true, $path = null)
    {
        $extensions = &$this->extensions($this->currentCert, $path, true);

        if (!is_array($extensions)) {
            return false;
        }

        $newext = ['extnId'  => $id, 'critical' => $critical, 'extnValue' => $value];

        foreach ($extensions as $key => $value) {
            if ($value['extnId'] == $id) {
                if (!$replace) {
                    return false;
                }

                $extensions[$key] = $newext;
                return true;
            }
        }

        $extensions[] = $newext;
        return true;
    }

    /**
     * Remove a certificate, CSR or CRL Extension
     *
     * @param string $id
     * @return bool
     */
    public function ***REMOVED***($id)
    {
        return $this->removeExtensionHelper($id);
    }

    /**
     * Get a certificate, CSR or CRL Extension
     *
     * Returns the extension if it exists and false if not
     *
     * @param string $id
     * @param array $cert optional
     * @param string $path
     * @return mixed
     */
    public function getExtension($id, array $cert = null, $path = null)
    {
        return $this->***REMOVED***($id, $cert, $path);
    }

    /**
     * Returns a list of all extensions in use in certificate, CSR or CRL
     *
     * @param array $cert optional
     * @param string $path optional
     * @return array
     */
    public function getExtensions(array $cert = null, $path = null)
    {
        return $this->***REMOVED***($cert, $path);
    }

    /**
     * Set a certificate, CSR or CRL Extension
     *
     * @param string $id
     * @param mixed $value
     * @param bool $critical optional
     * @param bool $replace optional
     * @return bool
     */
    public function setExtension($id, $value, $critical = false, $replace = true)
    {
        return $this->***REMOVED***($id, $value, $critical, $replace);
    }

    /**
     * Remove a CSR attribute.
     *
     * @param string $id
     * @param int $disposition optional
     * @return bool
     */
    public function ***REMOVED***($id, $disposition = self::ATTR_ALL)
    {
        $attributes = &$this->subArray($this->currentCert, 'certificationRequestInfo/attributes');

        if (!is_array($attributes)) {
            return false;
        }

        $result = false;
        foreach ($attributes as $key => $attribute) {
            if ($attribute['type'] == $id) {
                $n = count($attribute['value']);
                switch (true) {
                    case $disposition == self::ATTR_APPEND:
                    case $disposition == self::ATTR_REPLACE:
                        return false;
                    case $disposition >= $n:
                        $disposition -= $n;
                        break;
                    case $disposition == self::ATTR_ALL:
                    case $n == 1:
                        unset($attributes[$key]);
                        $result = true;
                        break;
                    default:
                        unset($attributes[$key]['value'][$disposition]);
                        $attributes[$key]['value'] = array_values($attributes[$key]['value']);
                        $result = true;
                        break;
                }
                if ($result && $disposition != self::ATTR_ALL) {
                    break;
                }
            }
        }

        $attributes = array_values($attributes);
        return $result;
    }

    /**
     * Get a CSR attribute
     *
     * Returns the attribute if it exists and false if not
     *
     * @param string $id
     * @param int $disposition optional
     * @param array $csr optional
     * @return mixed
     */
    public function getAttribute($id, $disposition = self::ATTR_ALL, array $csr = null)
    {
        if (empty($csr)) {
            $csr = $this->currentCert;
        }

        $attributes = $this->subArray($csr, 'certificationRequestInfo/attributes');

        if (!is_array($attributes)) {
            return false;
        }

        foreach ($attributes as $key => $attribute) {
            if ($attribute['type'] == $id) {
                $n = count($attribute['value']);
                switch (true) {
                    case $disposition == self::ATTR_APPEND:
                    case $disposition == self::ATTR_REPLACE:
                        return false;
                    case $disposition == self::ATTR_ALL:
                        return $attribute['value'];
                    case $disposition >= $n:
                        $disposition -= $n;
                        break;
                    default:
                        return $attribute['value'][$disposition];
                }
            }
        }

        return false;
    }

    /**
     * Returns a list of all CSR attributes in use
     *
     * @param array $csr optional
     * @return array
     */
    public function getAttributes(array $csr = null)
    {
        if (empty($csr)) {
            $csr = $this->currentCert;
        }

        $attributes = $this->subArray($csr, 'certificationRequestInfo/attributes');
        $attrs = [];

        if (is_array($attributes)) {
            foreach ($attributes as $attribute) {
                $attrs[] = $attribute['type'];
            }
        }

        return $attrs;
    }

    /**
     * Set a CSR attribute
     *
     * @param string $id
     * @param mixed $value
     * @param int $disposition optional
     * @return bool
     */
    public function setAttribute($id, $value, $disposition = self::ATTR_ALL)
    {
        $attributes = &$this->subArray($this->currentCert, 'certificationRequestInfo/attributes', true);

        if (!is_array($attributes)) {
            return false;
        }

        switch ($disposition) {
            case self::ATTR_REPLACE:
                $disposition = self::ATTR_APPEND;
                // fall-through
            case self::ATTR_ALL:
                $this->***REMOVED***($id);
                break;
        }

        foreach ($attributes as $key => $attribute) {
            if ($attribute['type'] == $id) {
                $n = count($attribute['value']);
                switch (true) {
                    case $disposition == self::ATTR_APPEND:
                        $last = $key;
                        break;
                    case $disposition >= $n:
                        $disposition -= $n;
                        break;
                    default:
                        $attributes[$key]['value'][$disposition] = $value;
                        return true;
                }
            }
        }

        switch (true) {
            case $disposition >= 0:
                return false;
            case isset($last):
                $attributes[$last]['value'][] = $value;
                break;
            default:
                $attributes[] = ['type' => $id, 'value' => $disposition == self::ATTR_ALL ? $value : [$value]];
                break;
        }

        return true;
    }

    /**
     * Sets the subject key identifier
     *
     * This is used by the id-ce-authorityKeyIdentifier and the id-ce-***REMOVED*** extensions.
     *
     * @param string $value
     */
    public function ***REMOVED***($value)
    {
        if (empty($value)) {
            unset($this->***REMOVED***);
        } else {
            $this->***REMOVED*** = $value;
        }
    }

    /**
     * Compute a public key identifier.
     *
     * Although key identifiers may be set to any unique value, this function
     * computes key identifiers from public key according to the two
     * recommended methods (4.2.1.2 RFC 3280).
     * Highly polymorphic: try to accept all possible forms of key:
     * - Key object
     * - \phpseclib3\File\X509 object with public or private key defined
     * - Certificate or CSR array
     * - \phpseclib3\File\ASN1\Element object
     * - PEM or DER string
     *
     * @param mixed $key optional
     * @param int $method optional
     * @return string binary key identifier
     */
    public function ***REMOVED***($key = null, $method = 1)
    {
        if (is_null($key)) {
            $key = $this;
        }

        switch (true) {
            case is_string($key):
                break;
            case is_array($key) && isset($key['***REMOVED***']['***REMOVED***']['***REMOVED***']):
                return $this->***REMOVED***($key['***REMOVED***']['***REMOVED***']['***REMOVED***'], $method);
            case is_array($key) && isset($key['certificationRequestInfo']['subjectPKInfo']['***REMOVED***']):
                return $this->***REMOVED***($key['certificationRequestInfo']['subjectPKInfo']['***REMOVED***'], $method);
            case !is_object($key):
                return false;
            case $key instanceof Element:
                // Assume the element is a bitstring-packed key.
                $decoded = ASN1::decodeBER($key->element);
                if (!$decoded) {
                    return false;
                }
                $raw = ASN1::asn1map($decoded[0], ['type' => ASN1::TYPE_BIT_STRING]);
                if (empty($raw)) {
                    return false;
                }
                // If the key is private, compute identifier from its corresponding public key.
                $key = ***REMOVED***::load($raw);
                if ($key instanceof PrivateKey) {  // If private.
                    return $this->***REMOVED***($key, $method);
                }
                $key = $raw; // Is a public key.
                break;
            case $key instanceof X509:
                if (isset($key->publicKey)) {
                    return $this->***REMOVED***($key->publicKey, $method);
                }
                if (isset($key->privateKey)) {
                    return $this->***REMOVED***($key->privateKey, $method);
                }
                if (isset($key->currentCert['***REMOVED***']) || isset($key->currentCert['certificationRequestInfo'])) {
                    return $this->***REMOVED***($key->currentCert, $method);
                }
                return false;
            default: // Should be a key object (i.e.: \phpseclib3\Crypt\RSA).
                $key = $key->getPublicKey();
                break;
        }

        // If in PEM format, convert to binary.
        $key = ASN1::extractBER($key);

        // Now we have the key string: compute its sha-1 sum.
        $hash = new Hash('sha1');
        $hash = $hash->hash($key);

        if ($method == 2) {
            $hash = substr($hash, -8);
            $hash[0] = chr((ord($hash[0]) & 0x0F) | 0x40);
        }

        return $hash;
    }

    /**
     * Format a public key as appropriate
     *
     * @return array|false
     */
    private function formatSubjectPublicKey()
    {
        $format = $this->publicKey instanceof RSA && ($this->publicKey->getPadding() & RSA::SIGNATURE_PSS) ?
            'PSS' :
            'PKCS8';

        $publicKey = base64_decode(preg_replace('#-.+-|[\r\n]#', '', $this->publicKey->toString($format)));

        $decoded = ASN1::decodeBER($publicKey);
        if (!$decoded) {
            return false;
        }
        $mapped = ASN1::asn1map($decoded[0], Maps\***REMOVED***::MAP);
        if (!is_array($mapped)) {
            return false;
        }

        $mapped['***REMOVED***'] = $this->publicKey->toString($format);

        return $mapped;
    }

    /**
     * Set the domain name's which the cert is to be valid for
     *
     * @param mixed ...$domains
     * @return void
     */
    public function setDomain(...$domains)
    {
        $this->domains = $domains;
        $this->removeDNProp('id-at-commonName');
        $this->setDNProp('id-at-commonName', $this->domains[0]);
    }

    /**
     * Set the IP Addresses's which the cert is to be valid for
     *
     * @param mixed[] ...$ipAddresses
     */
    public function setIPAddress(...$ipAddresses)
    {
        $this->ipAddresses = $ipAddresses;
        /*
        if (!isset($this->domains)) {
            $this->removeDNProp('id-at-commonName');
            $this->setDNProp('id-at-commonName', $this->ipAddresses[0]);
        }
        */
    }

    /**
     * Helper function to build domain array
     *
     * @param string $domain
     * @return array
     */
    private static function dnsName($domain)
    {
        return ['dNSName' => $domain];
    }

    /**
     * Helper function to build IP Address array
     *
     * (IPv6 is not currently supported)
     *
     * @param string $address
     * @return array
     */
    private function iPAddress($address)
    {
        return ['iPAddress' => $address];
    }

    /**
     * Get the index of a revoked certificate.
     *
     * @param array $rclist
     * @param string $serial
     * @param bool $create optional
     * @return int|false
     */
    private function ***REMOVED***(array &$rclist, $serial, $create = false)
    {
        $serial = new BigInteger($serial);

        foreach ($rclist as $i => $rc) {
            if (!($serial->compare($rc['***REMOVED***']))) {
                return $i;
            }
        }

        if (!$create) {
            return false;
        }

        $i = count($rclist);
        $***REMOVED*** = new \***REMOVED***('now', new \DateTimeZone(@date_default_timezone_get()));
        $rclist[] = ['***REMOVED***' => $serial,
                          '***REMOVED***'  => $this->timeField($***REMOVED***->format('D, d M Y H:i:s O'))];
        return $i;
    }

    /**
     * Revoke a certificate.
     *
     * @param string $serial
     * @param string $date optional
     * @return bool
     */
    public function revoke($serial, $date = null)
    {
        if (isset($this->currentCert['tbsCertList'])) {
            if (is_array($rclist = &$this->subArray($this->currentCert, 'tbsCertList/***REMOVED***', true))) {
                if ($this->***REMOVED***($rclist, $serial) === false) { // If not yet revoked
                    if (($i = $this->***REMOVED***($rclist, $serial, true)) !== false) {
                        if (!empty($date)) {
                            $rclist[$i]['***REMOVED***'] = $this->timeField($date);
                        }

                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * Unrevoke a certificate.
     *
     * @param string $serial
     * @return bool
     */
    public function unrevoke($serial)
    {
        if (is_array($rclist = &$this->subArray($this->currentCert, 'tbsCertList/***REMOVED***'))) {
            if (($i = $this->***REMOVED***($rclist, $serial)) !== false) {
                unset($rclist[$i]);
                $rclist = array_values($rclist);
                return true;
            }
        }

        return false;
    }

    /**
     * Get a revoked certificate.
     *
     * @param string $serial
     * @return mixed
     */
    public function getRevoked($serial)
    {
        if (is_array($rclist = $this->subArray($this->currentCert, 'tbsCertList/***REMOVED***'))) {
            if (($i = $this->***REMOVED***($rclist, $serial)) !== false) {
                return $rclist[$i];
            }
        }

        return false;
    }

    /**
     * List revoked certificates
     *
     * @param array $crl optional
     * @return array|bool
     */
    public function listRevoked(array $crl = null)
    {
        if (!isset($crl)) {
            $crl = $this->currentCert;
        }

        if (!isset($crl['tbsCertList'])) {
            return false;
        }

        $result = [];

        if (is_array($rclist = $this->subArray($crl, 'tbsCertList/***REMOVED***'))) {
            foreach ($rclist as $rc) {
                $result[] = $rc['***REMOVED***']->toString();
            }
        }

        return $result;
    }

    /**
     * Remove a Revoked Certificate Extension
     *
     * @param string $serial
     * @param string $id
     * @return bool
     */
    public function removeRevokedCertificateExtension($serial, $id)
    {
        if (is_array($rclist = &$this->subArray($this->currentCert, 'tbsCertList/***REMOVED***'))) {
            if (($i = $this->***REMOVED***($rclist, $serial)) !== false) {
                return $this->removeExtensionHelper($id, "tbsCertList/***REMOVED***/$i/***REMOVED***");
            }
        }

        return false;
    }

    /**
     * Get a Revoked Certificate Extension
     *
     * Returns the extension if it exists and false if not
     *
     * @param string $serial
     * @param string $id
     * @param array $crl optional
     * @return mixed
     */
    public function getRevokedCertificateExtension($serial, $id, array $crl = null)
    {
        if (!isset($crl)) {
            $crl = $this->currentCert;
        }

        if (is_array($rclist = $this->subArray($crl, 'tbsCertList/***REMOVED***'))) {
            if (($i = $this->***REMOVED***($rclist, $serial)) !== false) {
                return $this->getExtension($id, $crl, "tbsCertList/***REMOVED***/$i/***REMOVED***");
            }
        }

        return false;
    }

    /**
     * Returns a list of all extensions in use for a given revoked certificate
     *
     * @param string $serial
     * @param array $crl optional
     * @return array|bool
     */
    public function getRevokedCertificateExtensions($serial, array $crl = null)
    {
        if (!isset($crl)) {
            $crl = $this->currentCert;
        }

        if (is_array($rclist = $this->subArray($crl, 'tbsCertList/***REMOVED***'))) {
            if (($i = $this->***REMOVED***($rclist, $serial)) !== false) {
                return $this->getExtensions($crl, "tbsCertList/***REMOVED***/$i/***REMOVED***");
            }
        }

        return false;
    }

    /**
     * Set a Revoked Certificate Extension
     *
     * @param string $serial
     * @param string $id
     * @param mixed $value
     * @param bool $critical optional
     * @param bool $replace optional
     * @return bool
     */
    public function setRevokedCertificateExtension($serial, $id, $value, $critical = false, $replace = true)
    {
        if (isset($this->currentCert['tbsCertList'])) {
            if (is_array($rclist = &$this->subArray($this->currentCert, 'tbsCertList/***REMOVED***', true))) {
                if (($i = $this->***REMOVED***($rclist, $serial, true)) !== false) {
                    return $this->***REMOVED***($id, $value, $critical, $replace, "tbsCertList/***REMOVED***/$i/***REMOVED***");
                }
            }
        }

        return false;
    }

    /**
     * Register the mapping for a custom/unsupported extension.
     *
     * @param string $id
     * @param array $mapping
     */
    public static function ***REMOVED***($id, array $mapping)
    {
        if (isset(self::$extensions[$id]) && self::$extensions[$id] !== $mapping) {
            throw new \***REMOVED***(
                'Extension ' . $id . ' has already been defined with a different mapping.'
            );
        }

        self::$extensions[$id] = $mapping;
    }

    /**
     * Register the mapping for a custom/unsupported extension.
     *
     * @param string $id
     *
     * @return array|null
     */
    public static function getRegisteredExtension($id)
    {
        return isset(self::$extensions[$id]) ? self::$extensions[$id] : null;
    }

    /**
     * Register the mapping for a custom/unsupported extension.
     *
     * @param string $id
     * @param mixed $value
     * @param bool $critical
     * @param bool $replace
     */
    public function ***REMOVED***($id, $value, $critical = false, $replace = false)
    {
        $this->***REMOVED***[$id] = compact('critical', 'replace', 'value');
    }
}
