<?php
// phpcs:ignoreFile -- Reason: Thirdparty Library
/**
* $Id$
*
* Copyright (c) 2013, Donovan Schönknecht.  All rights reserved.
*
* ***REMOVED*** and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* - ***REMOVED*** of source code must retain the above copyright notice,
*   this list of conditions and the following disclaimer.
* - ***REMOVED*** in binary form must reproduce the above copyright
*   notice, this list of conditions and the following disclaimer in the
*   documentation and/or other materials provided with the distribution.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF ***REMOVED*** AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*
* Amazon S3 is a trademark of Amazon.com, Inc. or its affiliates.
*/

/**
* Amazon S3 PHP class
*
* @link http://undesigned.org.za/2007/10/22/amazon-s3-php-class
* @version 0.5.1
*/
class S3
{
	// ACL flags
	const ACL_PRIVATE = 'private';
	const ACL_PUBLIC_READ = 'public-read';
	const ACL_PUBLIC_READ_WRITE = 'public-read-write';
	const ACL_AUTHENTICATED_READ = 'authenticated-read';

	const STORAGE_CLASS_STANDARD = 'STANDARD';
	const STORAGE_CLASS_RRS = 'REDUCED_REDUNDANCY';
	const STORAGE_CLASS_STANDARD_IA = 'STANDARD_IA';

	const SSE_NONE = '';
	const SSE_AES256 = 'AES256';

	/**
	 * The AWS Access key
	 *
	 * @var string
	 * @access private
	 * @static
	 */
	private static $__accessKey = null;

	/**
	 * AWS Secret Key
	 *
	 * @var string
	 * @access private
	 * @static
	 */
	private static $__secretKey = null;

	/**
	 * SSL Client key
	 *
	 * @var string
	 * @access private
	 * @static
	 */
	private static $__sslKey = null;

	/**
	 * Default delimiter to be used, for example while getBucket().
	 * @var string
	 * @access public
	 * @static 
	 */
	public static $defDelimiter = null;

	/**
	 * AWS URI
	 *
	 * @var string
	 * @acess public
	 * @static
	 */
	public static $endpoint = 's3.amazonaws.com';

	/**
	 * Proxy information
	 *
	 * @var null|array
	 * @access public
	 * @static
	 */
	public static $proxy = null;

	/**
	 * Connect using SSL?
	 *
	 * @var bool
	 * @access public
	 * @static
	 */
	public static $useSSL = false;

	/**
	 * Use SSL validation?
	 *
	 * @var bool
	 * @access public
	 * @static
	 */
	public static $***REMOVED*** = true;

	/**
	 * Use SSL version
	 *
	 * @var const
	 * @access public
	 * @static
	 */
	public static $useSSLVersion = CURL_SSLVERSION_TLSv1;

	/**
	 * Use PHP exceptions?
	 *
	 * @var bool
	 * @access public
	 * @static
	 */
	public static $useExceptions = false;

	/**
	 * Time offset applied to time()
	 * @access private
	 * @static
	 */
	private static $__timeOffset = 0;

	/**
	 * SSL client key
	 *
	 * @var bool
	 * @access public
	 * @static
	 */
	public static $sslKey = null;
	
	/**
	 * SSL client certfificate
	 *
	 * @var string
	 * @acess public
	 * @static
	 */
	public static $sslCert = null;
	
	/**
	 * SSL CA cert (only required if you are having problems with your system CA cert)
	 *
	 * @var string
	 * @access public
	 * @static
	 */
	public static $sslCACert = null;
	
	/**
	 * AWS Key Pair ID
	 *
	 * @var string
	 * @access private
	 * @static
	 */
	private static $__signingKeyPairId = null;
	
	/**
	 * Key resource, ***REMOVED***() must be called to clear it from memory
	 *
	 * @var bool
	 * @access private
	 * @static 
	 */
	private static $__signingKeyResource = false;


	/**
	* Constructor - if you're not using the class statically
	*
	* @param string $accessKey Access key
	* @param string $secretKey Secret key
	* @param boolean $useSSL Enable SSL
	* @param string $endpoint Amazon URI
	* @return void
	*/
	public function __construct($accessKey = null, $secretKey = null, $useSSL = false, $endpoint = 's3.amazonaws.com')
	{
		if ($accessKey !== null && $secretKey !== null)
			self::setAuth($accessKey, $secretKey);
		self::$useSSL = $useSSL;
		self::$endpoint = $endpoint;
	}


	/**
	* Set the service endpoint
	*
	* @param string $host Hostname
	* @return void
	*/
	public function setEndpoint($host)
	{
		self::$endpoint = $host;
	}


	/**
	* Set AWS access key and secret key
	*
	* @param string $accessKey Access key
	* @param string $secretKey Secret key
	* @return void
	*/
	public static function setAuth($accessKey, $secretKey)
	{
		self::$__accessKey = $accessKey;
		self::$__secretKey = $secretKey;
	}


	/**
	* Check if AWS keys have been set
	*
	* @return boolean
	*/
	public static function hasAuth() {
		return (self::$__accessKey !== null && self::$__secretKey !== null);
	}


	/**
	* Set SSL on or off
	*
	* @param boolean $enabled SSL enabled
	* @param boolean $validate SSL certificate validation
	* @return void
	*/
	public static function setSSL($enabled, $validate = true)
	{
		self::$useSSL = $enabled;
		self::$***REMOVED*** = $validate;
	}


	/**
	* Set SSL client certificates (experimental)
	*
	* @param string $sslCert SSL client certificate
	* @param string $sslKey SSL client key
	* @param string $sslCACert SSL CA cert (only required if you are having problems with your system CA cert)
	* @return void
	*/
	public static function setSSLAuth($sslCert = null, $sslKey = null, $sslCACert = null)
	{
		self::$sslCert = $sslCert;
		self::$sslKey = $sslKey;
		self::$sslCACert = $sslCACert;
	}


	/**
	* Set proxy information
	*
	* @param string $host Proxy hostname and port (localhost:1234)
	* @param string $user Proxy username
	* @param string $pass Proxy password
	* @param constant $type CURL proxy type
	* @return void
	*/
	public static function setProxy($host, $user = null, $pass = null, $type = CURLPROXY_SOCKS5)
	{
		self::$proxy = array('host' => $host, 'type' => $type, 'user' => $user, 'pass' => $pass);
	}


	/**
	* Set the error mode to exceptions
	*
	* @param boolean $enabled Enable exceptions
	* @return void
	*/
	public static function setExceptions($enabled = true)
	{
		self::$useExceptions = $enabled;
	}


	/**
	* Set AWS time correction offset (use carefully)
	*
	* This can be used when an inaccurate system time is generating
	* invalid request signatures.  It should only be used as a last
	* resort when the system time cannot be changed.
	*
	* @param string $offset Time offset (set to zero to use AWS server time)
	* @return void
	*/
	public static function setTimeCorrectionOffset($offset = 0)
	{
		if ($offset == 0)
		{
			$rest = new S3Request('HEAD');
			$rest = $rest->getResponse();
			$awstime = $rest->headers['date'];
			$systime = time();			
			$offset = $systime > $awstime ? -($systime - $awstime) : ($awstime - $systime);
		}
		self::$__timeOffset = $offset;
	}


/**
 * Sets the signing key for the class.
 *
 * @param string $keyPairId The ID of the key pair.
 * @param string $signingKey The path to the private key file or the key itself.
 * @param bool   $isFile Whether the signing key is a file path or raw key data.
 *
 * @return bool True on success, false on failure.
 */
public static function setSigningKey( $keyPairId, $signingKey, $isFile = true ) {
    global $wp_filesystem;

    // Initialize the WP Filesystem API if needed
    if ( ! function_exists( 'WP_Filesystem' ) ) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
    }
    WP_Filesystem();

    self::$__signingKeyPairId = $keyPairId;
    $keyData = '';

    if ( $isFile ) {
        // Load the key from file
        $keyData = $wp_filesystem->get_contents( $signingKey );
        if ( false === $keyData ) {
            self::__triggerError( 'S3::setSigningKey(): Unable to read private key file: ' . esc_html( $signingKey ), __FILE__, __LINE__ );
            return false;
        }
    } else {
        $keyData = $signingKey;
    }

    // Attempt to get the private key resource
    self::$__signingKeyResource = openssl_pkey_get_private( $keyData );

    if ( false !== self::$__signingKeyResource ) {
        return true;
    }

    self::__triggerError( 'S3::setSigningKey(): Unable to load private key: ' . esc_html( $signingKey ), __FILE__, __LINE__ );
    return false;
}


	/**
	* Free signing key from memory, MUST be called if you are using setSigningKey()
	*
	* @return void
	*/
	public static function ***REMOVED***()
	{
		if (self::$__signingKeyResource !== false)
			openssl_free_key(self::$__signingKeyResource);
	}


	/**
	* Internal error handler
	*
	* @internal Internal error handler
	* @param string $message Error message
	* @param string $file Filename
	* @param integer $line Line number
	* @param integer $code Error code
	* @return void
	*/
	private static function __triggerError($message, $file, $line, $code = 0)
	{
		if (self::$useExceptions)
			throw new S3Exception(esc_html($message),esc_html( $file), esc_html($line), esc_html($code));
		else
			trigger_error(esc_html($message), E_USER_WARNING);
	}


	/**
	* Get a list of buckets
	*
	* @param boolean $detailed Returns detailed bucket list when true
	* @return array | false
	*/
	public static function listBuckets($detailed = false)
	{
		$rest = new S3Request('GET', '', '', self::$endpoint);
		$rest = $rest->getResponse();
		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::listBuckets(): [%s] %s", $rest->error['code'],
			$rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		$results = array();
		if (!isset($rest->body->Buckets)) return $results;

		if ($detailed)
		{
			if (isset($rest->body->Owner, $rest->body->Owner->ID, $rest->body->Owner->DisplayName))
			$results['owner'] = array(
				'id' => (string)$rest->body->Owner->ID, 'name' => (string)$rest->body->Owner->DisplayName
			);
			$results['buckets'] = array();
			foreach ($rest->body->Buckets->Bucket as $b)
				$results['buckets'][] = array(
					'name' => (string)$b->Name, 'time' => strtotime((string)$b->CreationDate)
				);
		} else
			foreach ($rest->body->Buckets->Bucket as $b) $results[] = (string)$b->Name;

		return $results;
	}


	/**
	* Get contents for a bucket
	*
	* If maxKeys is null this method will loop through truncated result sets
	*
	* @param string $bucket Bucket name
	* @param string $prefix Prefix
	* @param string $marker Marker (last file listed)
	* @param string $maxKeys Max keys (maximum number of keys to return)
	* @param string $delimiter Delimiter
	* @param boolean $***REMOVED*** Set to true to return ***REMOVED***
	* @return array | false
	*/
	public static function getBucket($bucket, $prefix = null, $marker = null, $maxKeys = null, $delimiter = null, $***REMOVED*** = false)
	{
		$rest = new S3Request('GET', $bucket, '', self::$endpoint);
		if ($maxKeys == 0) $maxKeys = null;
		if ($prefix !== null && $prefix !== '') $rest->setParameter('prefix', $prefix);
		if ($marker !== null && $marker !== '') $rest->setParameter('marker', $marker);
		if ($maxKeys !== null && $maxKeys !== '') $rest->setParameter('max-keys', $maxKeys);
		if ($delimiter !== null && $delimiter !== '') $rest->setParameter('delimiter', $delimiter);
		else if (!empty(self::$defDelimiter)) $rest->setParameter('delimiter', self::$defDelimiter);
		$response = $rest->getResponse();
		if ($response->error === false && $response->code !== 200)
			$response->error = array('code' => $response->code, 'message' => 'Unexpected HTTP status');
		if ($response->error !== false)
		{
			self::__triggerError(sprintf("S3::getBucket(): [%s] %s",
			$response->error['code'], $response->error['message']), __FILE__, __LINE__);
			return false;
		}

		$results = array();

		$nextMarker = null;
		if (isset($response->body, $response->body->Contents))
		foreach ($response->body->Contents as $c)
		{
			$results[(string)$c->Key] = array(
				'name' => (string)$c->Key,
				'time' => strtotime((string)$c->LastModified),
				'size' => (int)$c->Size,
				'hash' => substr((string)$c->ETag, 1, -1)
			);
			$nextMarker = (string)$c->Key;
		}

		if ($***REMOVED*** && isset($response->body, $response->body->***REMOVED***))
			foreach ($response->body->***REMOVED*** as $c)
				$results[(string)$c->Prefix] = array('prefix' => (string)$c->Prefix);

		if (isset($response->body, $response->body->IsTruncated) &&
		(string)$response->body->IsTruncated == 'false') return $results;

		if (isset($response->body, $response->body->NextMarker))
			$nextMarker = (string)$response->body->NextMarker;

		// Loop through truncated results if maxKeys isn't specified
		if ($maxKeys == null && $nextMarker !== null && (string)$response->body->IsTruncated == 'true')
		do
		{
			$rest = new S3Request('GET', $bucket, '', self::$endpoint);
			if ($prefix !== null && $prefix !== '') $rest->setParameter('prefix', $prefix);
			$rest->setParameter('marker', $nextMarker);
			if ($delimiter !== null && $delimiter !== '') $rest->setParameter('delimiter', $delimiter);

			if (($response = $rest->getResponse()) == false || $response->code !== 200) break;

			if (isset($response->body, $response->body->Contents))
			foreach ($response->body->Contents as $c)
			{
				$results[(string)$c->Key] = array(
					'name' => (string)$c->Key,
					'time' => strtotime((string)$c->LastModified),
					'size' => (int)$c->Size,
					'hash' => substr((string)$c->ETag, 1, -1)
				);
				$nextMarker = (string)$c->Key;
			}

			if ($***REMOVED*** && isset($response->body, $response->body->***REMOVED***))
				foreach ($response->body->***REMOVED*** as $c)
					$results[(string)$c->Prefix] = array('prefix' => (string)$c->Prefix);

			if (isset($response->body, $response->body->NextMarker))
				$nextMarker = (string)$response->body->NextMarker;

		} while ($response !== false && (string)$response->body->IsTruncated == 'true');

		return $results;
	}


	/**
	* Put a bucket
	*
	* @param string $bucket Bucket name
	* @param constant $acl ACL flag
	* @param string $location Set as "EU" to create buckets hosted in Europe
	* @return boolean
	*/
	public static function putBucket($bucket, $acl = self::ACL_PRIVATE, $location = false)
	{
		$rest = new S3Request('PUT', $bucket, '', self::$endpoint);
		$rest->setAmzHeader('x-amz-acl', $acl);

		if ($location !== false)
		{
			$dom = new DOMDocument;
			$createBucketConfiguration = $dom->createElement('CreateBucketConfiguration');
			$***REMOVED*** = $dom->createElement('***REMOVED***', $location);
			$createBucketConfiguration->appendChild($***REMOVED***);
			$dom->appendChild($createBucketConfiguration);
			$rest->data = $dom->saveXML();
			$rest->size = strlen($rest->data);
			$rest->setHeader('Content-Type', 'application/xml');
		}
		$rest = $rest->getResponse();

		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::putBucket({$bucket}, {$acl}, {$location}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		return true;
	}


	/**
	* Delete an empty bucket
	*
	* @param string $bucket Bucket name
	* @return boolean
	*/
	public static function deleteBucket($bucket)
	{
		$rest = new S3Request('DELETE', $bucket, '', self::$endpoint);
		$rest = $rest->getResponse();
		if ($rest->error === false && $rest->code !== 204)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::deleteBucket({$bucket}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		return true;
	}


	/**
	* Create input info array for putObject()
	*
	* @param string $file Input file
	* @param mixed $md5sum Use MD5 hash (supply a string if you want to use your own)
	* @return array | false
	*/
	public static function inputFile($file, $md5sum = true)
	{
		if (!file_exists($file) || !is_file($file) || !is_readable($file))
		{
			self::__triggerError('S3::inputFile(): Unable to open input file: '.$file, __FILE__, __LINE__);
			return false;
		}
		***REMOVED***(false, $file);
		return array('file' => $file, 'size' => filesize($file), 'md5sum' => $md5sum !== false ?
		(is_string($md5sum) ? $md5sum : base64_encode(md5_file($file, true))) : '');
	}


	/**
	* Create input array info for putObject() with a resource
	*
	* @param string $resource Input resource to read from
	* @param integer $bufferSize Input byte size
	* @param string $md5sum MD5 hash to send (optional)
	* @return array | false
	*/
	public static function inputResource(&$resource, $bufferSize = false, $md5sum = '')
	{
		if (!is_resource($resource) || (int)$bufferSize < 0)
		{
			self::__triggerError('S3::inputResource(): Invalid resource or buffer size', __FILE__, __LINE__);
			return false;
		}

		// Try to figure out the bytesize
		if ($bufferSize === false)
		{
			if (fseek($resource, 0, SEEK_END) < 0 || ($bufferSize = ftell($resource)) === false)
			{
				self::__triggerError('S3::inputResource(): Unable to obtain resource size', __FILE__, __LINE__);
				return false;
			}
			fseek($resource, 0);
		}

		$input = array('size' => $bufferSize, 'md5sum' => $md5sum);
		$input['fp'] =& $resource;
		return $input;
	}


/**
 * Puts an object in an S3 bucket.
 *
 * @param mixed  $input                 The input data.
 * @param string $bucket                The bucket name.
 * @param string $uri                   The object URI.
 * @param string $acl                   The access control list.
 * @param array  $metaHeaders           The meta headers.
 * @param array  $***REMOVED***        The request headers.
 * @param string $storageClass          The storage class.
 * @param string $***REMOVED***  The server-side encryption setting.
 *
 * @return bool True on success, false on failure.
 */
public static function putObject( $input, $bucket, $uri, $acl = self::ACL_PRIVATE, $metaHeaders = array(), $***REMOVED*** = array(), $storageClass = self::STORAGE_CLASS_STANDARD, $***REMOVED*** = self::SSE_NONE ) {
    global $wp_filesystem;

    // Ensure WP Filesystem is loaded
    if ( ! function_exists( 'WP_Filesystem' ) ) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
    }
    WP_Filesystem();

    if ( $input === false ) {
        return false;
    }

    $rest = new S3Request( 'PUT', $bucket, $uri, self::$endpoint );

    if ( ! is_array( $input ) ) {
        $input = array(
            'data'   => $input,
            'size'   => strlen( $input ),
            'md5sum' => base64_encode( md5( $input, true ) ),
        );
    }

    // Data
    if ( isset( $input['fp'] ) ) {
        $rest->fp = &$input['fp'];
    } elseif ( isset( $input['file'] ) ) {
        $rest->fp = $wp_filesystem->get_contents( $input['file'] );
        if ( false === $rest->fp ) {
            self::__triggerError( 'S3::putObject(): Unable to open file: ' . esc_html( $input['file'] ), __FILE__, __LINE__ );
            return false;
        }
    } elseif ( isset( $input['data'] ) ) {
        $rest->data = $input['data'];
    }

    // Content-Length (required)
    if ( isset( $input['size'] ) && $input['size'] >= 0 ) {
        $rest->size = $input['size'];
    } else {
        if ( isset( $input['file'] ) ) {
            ***REMOVED***( false, $input['file'] );
            $rest->size = filesize( $input['file'] );
        } elseif ( isset( $input['data'] ) ) {
            $rest->size = strlen( $input['data'] );
        }
    }

    // Custom request headers (Content-Type, Content-Disposition, Content-Encoding)
    if ( is_array( $***REMOVED*** ) ) {
        foreach ( $***REMOVED*** as $h => $v ) {
            strpos( $h, 'x-amz-' ) === 0 ? $rest->setAmzHeader( $h, $v ) : $rest->setHeader( $h, $v );
        }
    } elseif ( is_string( $***REMOVED*** ) ) { // Support for legacy contentType parameter
        $input['type'] = $***REMOVED***;
    }

    // Content-Type
    if ( ! isset( $input['type'] ) ) {
        if ( isset( $***REMOVED***['Content-Type'] ) ) {
            $input['type'] = &$***REMOVED***['Content-Type'];
        } elseif ( isset( $input['file'] ) ) {
            $input['type'] = self::__getMIMEType( $input['file'] );
        } else {
            $input['type'] = 'application/octet-stream';
        }
    }

    if ( $storageClass !== self::STORAGE_CLASS_STANDARD ) { // Storage class
        $rest->setAmzHeader( 'x-amz-storage-class', $storageClass );
    }

    if ( $***REMOVED*** !== self::SSE_NONE ) { // Server-side encryption
        $rest->setAmzHeader( 'x-amz-server-side-encryption', $***REMOVED*** );
    }

    // We need to post with Content-Length and Content-Type, MD5 is optional
    if ( $rest->size >= 0 && ( $rest->fp !== false || $rest->data !== false ) ) {
        $rest->setHeader( 'Content-Type', $input['type'] );
        if ( isset( $input['md5sum'] ) ) {
            $rest->setHeader( 'Content-MD5', $input['md5sum'] );
        }

        $rest->setAmzHeader( 'x-amz-acl', $acl );
        foreach ( $metaHeaders as $h => $v ) {
            $rest->setAmzHeader( 'x-amz-meta-' . $h, $v );
        }
        $rest->getResponse();
    } else {
        $rest->response->error = array( 'code' => 0, 'message' => 'Missing input parameters' );
    }

    if ( $rest->response->error === false && $rest->response->code !== 200 ) {
        $rest->response->error = array( 'code' => $rest->response->code, 'message' => 'Unexpected HTTP status' );
    }
    if ( $rest->response->error !== false ) {
        self::__triggerError( sprintf( 'S3::putObject(): [%s] %s', $rest->response->error['code'], $rest->response->error['message'] ), __FILE__, __LINE__ );
        return false;
    }
    return true;
}


	/**
	* Put an object from a file (legacy function)
	*
	* @param string $file Input file path
	* @param string $bucket Bucket name
	* @param string $uri Object URI
	* @param constant $acl ACL constant
	* @param array $metaHeaders Array of x-amz-meta-* headers
	* @param string $contentType Content type
	* @return boolean
	*/
	public static function putObjectFile($file, $bucket, $uri, $acl = self::ACL_PRIVATE, $metaHeaders = array(), $contentType = null)
	{
		return self::putObject(self::inputFile($file), $bucket, $uri, $acl, $metaHeaders, $contentType);
	}


	/**
	* Put an object from a string (legacy function)
	*
	* @param string $string Input data
	* @param string $bucket Bucket name
	* @param string $uri Object URI
	* @param constant $acl ACL constant
	* @param array $metaHeaders Array of x-amz-meta-* headers
	* @param string $contentType Content type
	* @return boolean
	*/
	public static function ***REMOVED***($string, $bucket, $uri, $acl = self::ACL_PRIVATE, $metaHeaders = array(), $contentType = 'text/plain')
	{
		return self::putObject($string, $bucket, $uri, $acl, $metaHeaders, $contentType);
	}


/**
 * Gets an object from an S3 bucket.
 *
 * @param string $bucket The bucket name.
 * @param string $uri    The object URI.
 * @param mixed  $saveTo The path to save the object to, or a resource.
 *
 * @return mixed The response on success, false on failure.
 */
public static function getObject( $bucket, $uri, $saveTo = false ) {
    global $wp_filesystem;

    // Ensure WP Filesystem is loaded
    if ( ! function_exists( 'WP_Filesystem' ) ) {
        require_once ABSPATH . 'wp-admin/includes/file.php';
    }
    WP_Filesystem();

    $rest = new S3Request( 'GET', $bucket, $uri, self::$endpoint );

    if ( $saveTo !== false ) {
        if ( is_resource( $saveTo ) ) {
            $rest->fp = &$saveTo;
        } else {
            // Ensure the directory exists
            $saveToDir = dirname( $saveTo );
            if ( ! $wp_filesystem->is_dir( $saveToDir ) ) {
                $wp_filesystem->mkdir( $saveToDir, FS_CHMOD_DIR );
            }

            // Use WP Filesystem to open the file
            if ( ! $wp_filesystem->put_contents( $saveTo, '', FS_CHMOD_FILE ) ) {
                $rest->response->error = array( 'code' => 0, 'message' => 'Unable to open save file for writing: ' . esc_html( $saveTo ) );
            } else {
                $rest->file = realpath( $saveTo );
                $rest->fp = tmpfile(); // create a temporary file for writing
                if ( $rest->fp === false ) {
                    $rest->response->error = array( 'code' => 0, 'message' => 'Unable to open save file for writing: ' . esc_html( $saveTo ) );
                }
            }
        }
    }

    if ( $rest->response->error === false ) {
        $rest->getResponse();
    }

    if ( $rest->response->error === false && $rest->response->code !== 200 ) {
        $rest->response->error = array( 'code' => $rest->response->code, 'message' => 'Unexpected HTTP status' );
    }

    if ( $rest->response->error !== false ) {
        self::__triggerError( sprintf( 'S3::getObject(%s, %s): [%s] %s', $bucket, $uri, $rest->response->error['code'], $rest->response->error['message'] ), __FILE__, __LINE__ );
        return false;
    }

    if ( $saveTo !== false && ! is_resource( $saveTo ) ) {
        // Use WP Filesystem to save the temporary file content
        fseek( $rest->fp, 0 ); // rewind the file pointer to the beginning
        $wp_filesystem->put_contents( $saveTo, stream_get_contents( $rest->fp ), FS_CHMOD_FILE );
		//phpcs:ignore WordPress.WP.***REMOVED***.file_system_operations_fclose --  WP_Filesystem does not provide a direct method for closing file pointers.
        fclose( $rest->fp );
    }

    return $rest->response;
}
	/**
	* Get object information
	*
	* @param string $bucket Bucket name
	* @param string $uri Object URI
	* @param boolean $returnInfo Return response information
	* @return mixed | false
	*/
	public static function getObjectInfo($bucket, $uri, $returnInfo = true)
	{
		$rest = new S3Request('HEAD', $bucket, $uri, self::$endpoint);
		$rest = $rest->getResponse();
		if ($rest->error === false && ($rest->code !== 200 && $rest->code !== 404))
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::getObjectInfo({$bucket}, {$uri}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		return $rest->code == 200 ? $returnInfo ? $rest->headers : true : false;
	}


	/**
	* Copy an object
	*
	* @param string $srcBucket Source bucket name
	* @param string $srcUri Source object URI
	* @param string $bucket Destination bucket name
	* @param string $uri Destination object URI
	* @param constant $acl ACL constant
	* @param array $metaHeaders Optional array of x-amz-meta-* headers
	* @param array $***REMOVED*** Optional array of request headers (content type, disposition, etc.)
	* @param constant $storageClass Storage class constant
	* @return mixed | false
	*/
	public static function copyObject($srcBucket, $srcUri, $bucket, $uri, $acl = self::ACL_PRIVATE, $metaHeaders = array(), $***REMOVED*** = array(), $storageClass = self::STORAGE_CLASS_STANDARD)
	{
		$rest = new S3Request('PUT', $bucket, $uri, self::$endpoint);
		$rest->setHeader('Content-Length', 0);
		foreach ($***REMOVED*** as $h => $v)
				strpos($h, 'x-amz-') === 0 ? $rest->setAmzHeader($h, $v) : $rest->setHeader($h, $v);
		foreach ($metaHeaders as $h => $v) $rest->setAmzHeader('x-amz-meta-'.$h, $v);
		if ($storageClass !== self::STORAGE_CLASS_STANDARD) // Storage class
			$rest->setAmzHeader('x-amz-storage-class', $storageClass);
		$rest->setAmzHeader('x-amz-acl', $acl);
		$rest->setAmzHeader('x-amz-copy-source', sprintf('/%s/%s', $srcBucket, rawurlencode($srcUri)));
		if (sizeof($***REMOVED***) > 0 || sizeof($metaHeaders) > 0)
			$rest->setAmzHeader('x-amz-metadata-directive', 'REPLACE');

		$rest = $rest->getResponse();
		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::copyObject({$srcBucket}, {$srcUri}, {$bucket}, {$uri}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		return isset($rest->body->LastModified, $rest->body->ETag) ? array(
			'time' => strtotime((string)$rest->body->LastModified),
			'hash' => substr((string)$rest->body->ETag, 1, -1)
		) : false;
	}


	/**
	* Set up a bucket redirection
	*
	* @param string $bucket Bucket name
	* @param string $location Target host name
	* @return boolean
	*/
	public static function ***REMOVED***($bucket = NULL, $location = NULL)
	{
		$rest = new S3Request('PUT', $bucket, '', self::$endpoint);

		if( empty($bucket) || empty($location) ) {
			self::__triggerError("S3::***REMOVED***({$bucket}, {$location}): Empty parameter.", __FILE__, __LINE__);
			return false;
		}

		$dom = new DOMDocument;
		$***REMOVED*** = $dom->createElement('***REMOVED***');
		$redirectAllRequestsTo = $dom->createElement('RedirectAllRequestsTo');
		$hostName = $dom->createElement('HostName', $location);
		$redirectAllRequestsTo->appendChild($hostName);
		$***REMOVED***->appendChild($redirectAllRequestsTo);
		$dom->appendChild($***REMOVED***);
		$rest->setParameter('website', null);
		$rest->data = $dom->saveXML();
		$rest->size = strlen($rest->data);
		$rest->setHeader('Content-Type', 'application/xml');
		$rest = $rest->getResponse();

		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::***REMOVED***({$bucket}, {$location}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		return true;
	}


	/**
	* Set logging for a bucket
	*
	* @param string $bucket Bucket name
	* @param string $targetBucket Target bucket (where logs are stored)
	* @param string $targetPrefix Log prefix (e,g; domain.com-)
	* @return boolean
	*/
	public static function ***REMOVED***($bucket, $targetBucket, $targetPrefix = null)
	{
		// The S3 log delivery group has to be added to the target bucket's ACP
		if ($targetBucket !== null && ($acp = self::getAccessControlPolicy($targetBucket, '')) !== false)
		{
			// Only add permissions to the target bucket when they do not exist
			$aclWriteSet = false;
			$aclReadSet = false;
			foreach ($acp['acl'] as $acl)
			if ($acl['type'] == 'Group' && $acl['uri'] == 'http://acs.amazonaws.com/groups/s3/LogDelivery')
			{
				if ($acl['permission'] == 'WRITE') $aclWriteSet = true;
				elseif ($acl['permission'] == 'READ_ACP') $aclReadSet = true;
			}
			if (!$aclWriteSet) $acp['acl'][] = array(
				'type' => 'Group', 'uri' => 'http://acs.amazonaws.com/groups/s3/LogDelivery', 'permission' => 'WRITE'
			);
			if (!$aclReadSet) $acp['acl'][] = array(
				'type' => 'Group', 'uri' => 'http://acs.amazonaws.com/groups/s3/LogDelivery', 'permission' => 'READ_ACP'
			);
			if (!$aclReadSet || !$aclWriteSet) self::setAccessControlPolicy($targetBucket, '', $acp);
		}

		$dom = new DOMDocument;
		$***REMOVED*** = $dom->createElement('***REMOVED***');
		$***REMOVED***->setAttribute('xmlns', 'http://s3.amazonaws.com/doc/2006-03-01/');
		if ($targetBucket !== null)
		{
			if ($targetPrefix == null) $targetPrefix = $bucket . '-';
			$***REMOVED*** = $dom->createElement('***REMOVED***');
			$***REMOVED***->appendChild($dom->createElement('TargetBucket', $targetBucket));
			$***REMOVED***->appendChild($dom->createElement('TargetPrefix', $targetPrefix));
			// TODO: Add TargetGrants?
			$***REMOVED***->appendChild($***REMOVED***);
		}
		$dom->appendChild($***REMOVED***);

		$rest = new S3Request('PUT', $bucket, '', self::$endpoint);
		$rest->setParameter('logging', null);
		$rest->data = $dom->saveXML();
		$rest->size = strlen($rest->data);
		$rest->setHeader('Content-Type', 'application/xml');
		$rest = $rest->getResponse();
		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::***REMOVED***({$bucket}, {$targetBucket}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		return true;
	}


	/**
	* Get logging status for a bucket
	*
	* This will return false if logging is not enabled.
	* Note: To enable logging, you also need to grant write access to the log group
	*
	* @param string $bucket Bucket name
	* @return array | false
	*/
	public static function ***REMOVED***($bucket)
	{
		$rest = new S3Request('GET', $bucket, '', self::$endpoint);
		$rest->setParameter('logging', null);
		$rest = $rest->getResponse();
		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::***REMOVED***({$bucket}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		if (!isset($rest->body->***REMOVED***)) return false; // No logging
		return array(
			'targetBucket' => (string)$rest->body->***REMOVED***->TargetBucket,
			'targetPrefix' => (string)$rest->body->***REMOVED***->TargetPrefix,
		);
	}


	/**
	* Disable bucket logging
	*
	* @param string $bucket Bucket name
	* @return boolean
	*/
	public static function ***REMOVED***($bucket)
	{
		return self::***REMOVED***($bucket, null);
	}


	/**
	* Get a bucket's location
	*
	* @param string $bucket Bucket name
	* @return string | false
	*/
	public static function ***REMOVED***($bucket)
	{
		$rest = new S3Request('GET', $bucket, '', self::$endpoint);
		$rest->setParameter('location', null);
		$rest = $rest->getResponse();
		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::***REMOVED***({$bucket}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		return (isset($rest->body[0]) && (string)$rest->body[0] !== '') ? (string)$rest->body[0] : 'US';
	}


	/**
	* Set object or bucket Access Control Policy
	*
	* @param string $bucket Bucket name
	* @param string $uri Object URI
	* @param array $acp Access Control Policy Data (same as the data returned from getAccessControlPolicy)
	* @return boolean
	*/
	public static function setAccessControlPolicy($bucket, $uri = '', $acp = array())
	{
		$dom = new DOMDocument;
		$dom->formatOutput = true;
		$***REMOVED*** = $dom->createElement('***REMOVED***');
		$***REMOVED*** = $dom->createElement('***REMOVED***');

		// It seems the owner has to be passed along too
		$owner = $dom->createElement('Owner');
		$owner->appendChild($dom->createElement('ID', $acp['owner']['id']));
		$owner->appendChild($dom->createElement('DisplayName', $acp['owner']['name']));
		$***REMOVED***->appendChild($owner);

		foreach ($acp['acl'] as $g)
		{
			$grant = $dom->createElement('Grant');
			$grantee = $dom->createElement('Grantee');
			$grantee->setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
			if (isset($g['id']))
			{ // CanonicalUser (DisplayName is omitted)
				$grantee->setAttribute('xsi:type', 'CanonicalUser');
				$grantee->appendChild($dom->createElement('ID', $g['id']));
			}
			elseif (isset($g['email']))
			{ // AmazonCustomerByEmail
				$grantee->setAttribute('xsi:type', 'AmazonCustomerByEmail');
				$grantee->appendChild($dom->createElement('EmailAddress', $g['email']));
			}
			elseif ($g['type'] == 'Group')
			{ // Group
				$grantee->setAttribute('xsi:type', 'Group');
				$grantee->appendChild($dom->createElement('URI', $g['uri']));
			}
			$grant->appendChild($grantee);
			$grant->appendChild($dom->createElement('Permission', $g['permission']));
			$***REMOVED***->appendChild($grant);
		}

		$***REMOVED***->appendChild($***REMOVED***);
		$dom->appendChild($***REMOVED***);

		$rest = new S3Request('PUT', $bucket, $uri, self::$endpoint);
		$rest->setParameter('acl', null);
		$rest->data = $dom->saveXML();
		$rest->size = strlen($rest->data);
		$rest->setHeader('Content-Type', 'application/xml');
		$rest = $rest->getResponse();
		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::setAccessControlPolicy({$bucket}, {$uri}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		return true;
	}


	/**
	* Get object or bucket Access Control Policy
	*
	* @param string $bucket Bucket name
	* @param string $uri Object URI
	* @return mixed | false
	*/
	public static function getAccessControlPolicy($bucket, $uri = '')
	{
		$rest = new S3Request('GET', $bucket, $uri, self::$endpoint);
		$rest->setParameter('acl', null);
		$rest = $rest->getResponse();
		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::getAccessControlPolicy({$bucket}, {$uri}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}

		$acp = array();
		if (isset($rest->body->Owner, $rest->body->Owner->ID, $rest->body->Owner->DisplayName))
			$acp['owner'] = array(
				'id' => (string)$rest->body->Owner->ID, 'name' => (string)$rest->body->Owner->DisplayName
			);

		if (isset($rest->body->***REMOVED***))
		{
			$acp['acl'] = array();
			foreach ($rest->body->***REMOVED***->Grant as $grant)
			{
				foreach ($grant->Grantee as $grantee)
				{
					if (isset($grantee->ID, $grantee->DisplayName)) // CanonicalUser
						$acp['acl'][] = array(
							'type' => 'CanonicalUser',
							'id' => (string)$grantee->ID,
							'name' => (string)$grantee->DisplayName,
							'permission' => (string)$grant->Permission
						);
					elseif (isset($grantee->EmailAddress)) // AmazonCustomerByEmail
						$acp['acl'][] = array(
							'type' => 'AmazonCustomerByEmail',
							'email' => (string)$grantee->EmailAddress,
							'permission' => (string)$grant->Permission
						);
					elseif (isset($grantee->URI)) // Group
						$acp['acl'][] = array(
							'type' => 'Group',
							'uri' => (string)$grantee->URI,
							'permission' => (string)$grant->Permission
						);
					else continue;
				}
			}
		}
		return $acp;
	}


	/**
	* Delete an object
	*
	* @param string $bucket Bucket name
	* @param string $uri Object URI
	* @return boolean
	*/
	public static function deleteObject($bucket, $uri)
	{
		$rest = new S3Request('DELETE', $bucket, $uri, self::$endpoint);
		$rest = $rest->getResponse();
		if ($rest->error === false && $rest->code !== 204)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::deleteObject(): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		return true;
	}


	/**
	* Get a query string authenticated URL
	*
	* @param string $bucket Bucket name
	* @param string $uri Object URI
	* @param integer $lifetime Lifetime in seconds
	* @param boolean $hostBucket Use the bucket name as the hostname
	* @param boolean $https Use HTTPS ($hostBucket should be false for SSL verification)
	* @return string
	*/
	public static function ***REMOVED***($bucket, $uri, $lifetime, $hostBucket = false, $https = false)
	{
		$expires = self::__getTime() + $lifetime;
		$uri = str_replace(array('%2F', '%2B'), array('/', '+'), rawurlencode($uri));
		return sprintf(($https ? 'https' : 'http').'://%s/%s?***REMOVED***=%s&Expires=%u&Signature=%s',
		// $hostBucket ? $bucket : $bucket.'.s3.amazonaws.com', $uri, self::$__accessKey, $expires,
		$hostBucket ? $bucket : self::$endpoint.'/'.$bucket, $uri, self::$__accessKey, $expires,
		urlencode(self::__getHash("GET\n\n\n{$expires}\n/{$bucket}/{$uri}")));
	}


	/**
	* Get a CloudFront signed policy URL
	*
	* @param array $policy Policy
	* @return string
	*/
	public static function ***REMOVED***($policy)
	{
		$data = wp_json_encode($policy);
		$signature = '';
		if (!openssl_sign($data, $signature, self::$__signingKeyResource)) return false;

		$encoded = str_replace(array('+', '='), array('-', '_', '~'), base64_encode($data));
		$signature = str_replace(array('+', '='), array('-', '_', '~'), base64_encode($signature));

		$url = $policy['Statement'][0]['Resource'] . '?';
		foreach (array('Policy' => $encoded, 'Signature' => $signature, 'Key-Pair-Id' => self::$__signingKeyPairId) as $k => $v)
			$url .= $k.'='.str_replace('%2F', '/', rawurlencode($v)).'&';
		return substr($url, 0, -1);
	}


	/**
	* Get a CloudFront canned policy URL
	*
	* @param string $url URL to sign
	* @param integer $lifetime URL lifetime
	* @return string
	*/
	public static function ***REMOVED***($url, $lifetime)
	{
		return self::***REMOVED***(array(
			'Statement' => array(
				array('Resource' => $url, 'Condition' => array(
					'DateLessThan' => array('AWS:EpochTime' => self::__getTime() + $lifetime)
				))
			)
		));
	}


	/**
	* Get upload POST parameters for form uploads
	*
	* @param string $bucket Bucket name
	* @param string $uriPrefix Object URI prefix
	* @param constant $acl ACL constant
	* @param integer $lifetime Lifetime in seconds
	* @param integer $maxFileSize Maximum filesize in bytes (default 5MB)
	* @param string $***REMOVED*** Redirect URL or 200 / 201 status code
	* @param array $amzHeaders Array of x-amz-meta-* headers
	* @param array $headers Array of request headers or content type as a string
	* @param boolean $flashVars Includes additional "Filename" variable posted by Flash
	* @return object
	*/
	public static function getHttpUploadPostParams($bucket, $uriPrefix = '', $acl = self::ACL_PRIVATE, $lifetime = 3600,
	$maxFileSize = 5242880, $***REMOVED*** = "201", $amzHeaders = array(), $headers = array(), $flashVars = false)
	{
		// Create policy object
		$policy = new stdClass;
		$policy->expiration = gmdate('Y-m-d\TH:i:s\Z', (self::__getTime() + $lifetime));
		$policy->conditions = array();
		$obj = new stdClass; $obj->bucket = $bucket; array_push($policy->conditions, $obj);
		$obj = new stdClass; $obj->acl = $acl; array_push($policy->conditions, $obj);

		$obj = new stdClass; // 200 for non-redirect uploads
		if (is_numeric($***REMOVED***) && in_array((int)$***REMOVED***, array(200, 201)))
			$obj->success_action_status = (string)$***REMOVED***;
		else // URL
			$obj->success_action_redirect = $***REMOVED***;
		array_push($policy->conditions, $obj);

		if ($acl !== self::ACL_PUBLIC_READ)
			array_push($policy->conditions, array('eq', '$acl', $acl));

		array_push($policy->conditions, array('starts-with', '$key', $uriPrefix));
		if ($flashVars) array_push($policy->conditions, array('starts-with', '$Filename', ''));
		foreach (array_keys($headers) as $headerKey)
			array_push($policy->conditions, array('starts-with', '$'.$headerKey, ''));
		foreach ($amzHeaders as $headerKey => $headerVal)
		{
			$obj = new stdClass;
			$obj->{$headerKey} = (string)$headerVal;
			array_push($policy->conditions, $obj);
		}
		array_push($policy->conditions, array('content-length-range', 0, $maxFileSize));
		$policy = base64_encode(str_replace('\/', '/', wp_json_encode($policy)));

		// Create parameters
		$params = new stdClass;
		$params->***REMOVED*** = self::$__accessKey;
		$params->key = $uriPrefix.'${filename}';
		$params->acl = $acl;
		$params->policy = $policy; unset($policy);
		$params->signature = self::__getHash($params->policy);
		if (is_numeric($***REMOVED***) && in_array((int)$***REMOVED***, array(200, 201)))
			$params->success_action_status = (string)$***REMOVED***;
		else
			$params->success_action_redirect = $***REMOVED***;
		foreach ($headers as $headerKey => $headerVal) $params->{$headerKey} = (string)$headerVal;
		foreach ($amzHeaders as $headerKey => $headerVal) $params->{$headerKey} = (string)$headerVal;
		return $params;
	}


	/**
	* Create a CloudFront distribution
	*
	* @param string $bucket Bucket name
	* @param boolean $enabled Enabled (true/false)
	* @param array $cnames Array containing CNAME aliases
	* @param string $comment Use the bucket name as the hostname
	* @param string $***REMOVED*** Default root object
	* @param string $***REMOVED*** Origin access identity
	* @param array $***REMOVED*** Array of trusted signers
	* @return array | false
	*/
	public static function ***REMOVED***($bucket, $enabled = true, $cnames = array(), $comment = null, $***REMOVED*** = null, $***REMOVED*** = null, $***REMOVED*** = array())
	{
		if (!extension_loaded('openssl'))
		{
			self::__triggerError(sprintf("S3::***REMOVED***({$bucket}, ".(int)$enabled.", [], '$comment'): %s",
			"CloudFront functionality requires SSL"), __FILE__, __LINE__);
			return false;
		}
		$useSSL = self::$useSSL;

		self::$useSSL = true; // CloudFront requires SSL
		$rest = new S3Request('POST', '', '2010-11-01/distribution', 'cloudfront.amazonaws.com');
		$rest->data = self::__getCloudFrontDistributionConfigXML(
			$bucket.'.s3.amazonaws.com',
			$enabled,
			(string)$comment,
			(string)microtime(true),
			$cnames,
			$***REMOVED***,
			$***REMOVED***,
			$***REMOVED***
		);

		$rest->size = strlen($rest->data);
		$rest->setHeader('Content-Type', 'application/xml');
		$rest = self::__getCloudFrontResponse($rest);

		self::$useSSL = $useSSL;

		if ($rest->error === false && $rest->code !== 201)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::***REMOVED***({$bucket}, ".(int)$enabled.", [], '$comment'): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		} elseif ($rest->body instanceof ***REMOVED***)
			return self::__parseCloudFrontDistributionConfig($rest->body);
		return false;
	}


	/**
	* Get CloudFront distribution info
	*
	* @param string $***REMOVED*** Distribution ID from ***REMOVED***()
	* @return array | false
	*/
	public static function ***REMOVED***($***REMOVED***)
	{
		if (!extension_loaded('openssl'))
		{
			self::__triggerError(sprintf("S3::***REMOVED***($***REMOVED***): %s",
			"CloudFront functionality requires SSL"), __FILE__, __LINE__);
			return false;
		}
		$useSSL = self::$useSSL;

		self::$useSSL = true; // CloudFront requires SSL
		$rest = new S3Request('GET', '', '2010-11-01/distribution/'.$***REMOVED***, 'cloudfront.amazonaws.com');
		$rest = self::__getCloudFrontResponse($rest);

		self::$useSSL = $useSSL;

		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::***REMOVED***($***REMOVED***): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		elseif ($rest->body instanceof ***REMOVED***)
		{
			$dist = self::__parseCloudFrontDistributionConfig($rest->body);
			$dist['hash'] = $rest->headers['hash'];
			$dist['id'] = $***REMOVED***;
			return $dist;
		}
		return false;
	}


	/**
	* Update a CloudFront distribution
	*
	* @param array $dist Distribution array info identical to output of ***REMOVED***()
	* @return array | false
	*/
	public static function ***REMOVED***($dist)
	{
		if (!extension_loaded('openssl'))
		{
			self::__triggerError(sprintf("S3::***REMOVED***({$dist['id']}): %s",
			"CloudFront functionality requires SSL"), __FILE__, __LINE__);
			return false;
		}

		$useSSL = self::$useSSL;

		self::$useSSL = true; // CloudFront requires SSL
		$rest = new S3Request('PUT', '', '2010-11-01/distribution/'.$dist['id'].'/config', 'cloudfront.amazonaws.com');
		$rest->data = self::__getCloudFrontDistributionConfigXML(
			$dist['origin'],
			$dist['enabled'],
			$dist['comment'],
			$dist['***REMOVED***'],
			$dist['cnames'],
			$dist['***REMOVED***'],
			$dist['***REMOVED***'],
			$dist['***REMOVED***']
		);

		$rest->size = strlen($rest->data);
		$rest->setHeader('If-Match', $dist['hash']);
		$rest = self::__getCloudFrontResponse($rest);

		self::$useSSL = $useSSL;

		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::***REMOVED***({$dist['id']}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		} else {
			$dist = self::__parseCloudFrontDistributionConfig($rest->body);
			$dist['hash'] = $rest->headers['hash'];
			return $dist;
		}
		return false;
	}


	/**
	* Delete a CloudFront distribution
	*
	* @param array $dist Distribution array info identical to output of ***REMOVED***()
	* @return boolean
	*/
	public static function ***REMOVED***($dist)
	{
		if (!extension_loaded('openssl'))
		{
			self::__triggerError(sprintf("S3::***REMOVED***({$dist['id']}): %s",
			"CloudFront functionality requires SSL"), __FILE__, __LINE__);
			return false;
		}

		$useSSL = self::$useSSL;

		self::$useSSL = true; // CloudFront requires SSL
		$rest = new S3Request('DELETE', '', '2008-06-30/distribution/'.$dist['id'], 'cloudfront.amazonaws.com');
		$rest->setHeader('If-Match', $dist['hash']);
		$rest = self::__getCloudFrontResponse($rest);

		self::$useSSL = $useSSL;

		if ($rest->error === false && $rest->code !== 204)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::***REMOVED***({$dist['id']}): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		return true;
	}


	/**
	* Get a list of CloudFront distributions
	*
	* @return array
	*/
	public static function ***REMOVED***()
	{
		if (!extension_loaded('openssl'))
		{
			self::__triggerError(sprintf("S3::***REMOVED***(): [%s] %s",
			"CloudFront functionality requires SSL"), __FILE__, __LINE__);
			return false;
		}

		$useSSL = self::$useSSL;
		self::$useSSL = true; // CloudFront requires SSL
		$rest = new S3Request('GET', '', '2010-11-01/distribution', 'cloudfront.amazonaws.com');
		$rest = self::__getCloudFrontResponse($rest);
		self::$useSSL = $useSSL;

		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			self::__triggerError(sprintf("S3::***REMOVED***(): [%s] %s",
			$rest->error['code'], $rest->error['message']), __FILE__, __LINE__);
			return false;
		}
		elseif ($rest->body instanceof ***REMOVED*** && isset($rest->body->***REMOVED***))
		{
			$list = array();
			if (isset($rest->body->Marker, $rest->body->MaxItems, $rest->body->IsTruncated))
			{
				//$info['marker'] = (string)$rest->body->Marker;
				//$info['maxItems'] = (int)$rest->body->MaxItems;
				//$info['isTruncated'] = (string)$rest->body->IsTruncated == 'true' ? true : false;
			}
			foreach ($rest->body->***REMOVED*** as $summary)
				$list[(string)$summary->Id] = self::__parseCloudFrontDistributionConfig($summary);

			return $list;
		}
		return array();
	}

	/**
	* List CloudFront Origin Access Identities
	*
	* @return array
	*/
	public static function listOriginAccessIdentities()
	{
		if (!extension_loaded('openssl'))
		{
			self::__triggerError(sprintf("S3::listOriginAccessIdentities(): [%s] %s",
			"CloudFront functionality requires SSL"), __FILE__, __LINE__);
			return false;
		}

		self::$useSSL = true; // CloudFront requires SSL
		$rest = new S3Request('GET', '', '2010-11-01/origin-access-identity/cloudfront', 'cloudfront.amazonaws.com');
		$rest = self::__getCloudFrontResponse($rest);
		$useSSL = self::$useSSL;

		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			trigger_error(sprintf("S3::listOriginAccessIdentities(): [%s] %s",
			esc_html($rest->error['code']), esc_html($rest->error['message'])), E_USER_WARNING);
			return false;
		}

		if (isset($rest->body->CloudFrontOriginAccessIdentitySummary))
		{
			$identities = array();
			foreach ($rest->body->CloudFrontOriginAccessIdentitySummary as $identity)
				if (isset($identity->***REMOVED***))
					$identities[(string)$identity->Id] = array('id' => (string)$identity->Id, '***REMOVED***' => (string)$identity->***REMOVED***);
			return $identities;
		}
		return false;
	}


	/**
	* Invalidate objects in a CloudFront distribution
	*
	* Thanks to Martin Lindkvist for S3::invalidateDistribution()
	*
	* @param string $***REMOVED*** Distribution ID from ***REMOVED***()
	* @param array $paths Array of object paths to invalidate
	* @return boolean
	*/
	public static function invalidateDistribution($***REMOVED***, $paths)
	{
		if (!extension_loaded('openssl'))
		{
			self::__triggerError(sprintf("S3::invalidateDistribution(): [%s] %s",
			"CloudFront functionality requires SSL"), __FILE__, __LINE__);
			return false;
		}

		$useSSL = self::$useSSL;
		self::$useSSL = true; // CloudFront requires SSL
		$rest = new S3Request('POST', '', '2010-08-01/distribution/'.$***REMOVED***.'/invalidation', 'cloudfront.amazonaws.com');
		$rest->data = self::__getCloudFrontInvalidationBatchXML($paths, (string)microtime(true));
		$rest->size = strlen($rest->data);
		$rest = self::__getCloudFrontResponse($rest);
		self::$useSSL = $useSSL;

		if ($rest->error === false && $rest->code !== 201)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			trigger_error(sprintf("S3::invalidate(".esc_html($***REMOVED***.",".esc_html($paths)."): [%s] %s",
			esc_html($rest->error['code']), esc_html($rest->error['message'])), esc_html(E_USER_WARNING)));
			return false;
		}
		return true;
	}


	/**
	* Get a ***REMOVED*** DOMDocument
	*
	* @internal Used to create XML in invalidateDistribution()
	* @param array $paths Paths to objects to invalidateDistribution
	* @param int $***REMOVED***
	* @return string
	*/
	private static function __getCloudFrontInvalidationBatchXML($paths, $***REMOVED*** = '0')
	{
		$dom = new DOMDocument('1.0', 'UTF-8');
		$dom->formatOutput = true;
		$***REMOVED*** = $dom->createElement('***REMOVED***');
		foreach ($paths as $path)
			$***REMOVED***->appendChild($dom->createElement('Path', $path));

		$***REMOVED***->appendChild($dom->createElement('***REMOVED***', $***REMOVED***));
		$dom->appendChild($***REMOVED***);
		return $dom->saveXML();
	}


	/**
	* List your invalidation batches for invalidateDistribution() in a CloudFront distribution
	*
	* http://docs.***REMOVED***.com/***REMOVED***/latest/APIReference/***REMOVED***.html
	* returned array looks like this:
	*	Array
	*	(
	*		[***REMOVED***] => InProgress
	*		[IT3TFE31M0IHZ] => Completed
	*		[***REMOVED***] => Completed
	*		[***REMOVED***] => Completed
	*	)
	*
	* @param string $***REMOVED*** Distribution ID from ***REMOVED***()
	* @return array
	*/
	public static function getDistributionInvalidationList($***REMOVED***)
	{
		if (!extension_loaded('openssl'))
		{
			self::__triggerError(sprintf("S3::getDistributionInvalidationList(): [%s] %s",
			"CloudFront functionality requires SSL"), __FILE__, __LINE__);
			return false;
		}

		$useSSL = self::$useSSL;
		self::$useSSL = true; // CloudFront requires SSL
		$rest = new S3Request('GET', '', '2010-11-01/distribution/'.$***REMOVED***.'/invalidation', 'cloudfront.amazonaws.com');
		$rest = self::__getCloudFrontResponse($rest);
		self::$useSSL = $useSSL;

		if ($rest->error === false && $rest->code !== 200)
			$rest->error = array('code' => $rest->code, 'message' => 'Unexpected HTTP status');
		if ($rest->error !== false)
		{
			trigger_error(sprintf("S3::getDistributionInvalidationList('".esc_html($***REMOVED***)."'): [%s]",
			esc_html($rest->error['code']), esc_html($rest->error['message'])), esc_html(E_USER_WARNING));
			return false;
		}
		elseif ($rest->body instanceof ***REMOVED*** && isset($rest->body->***REMOVED***))
		{
			$list = array();
			foreach ($rest->body->***REMOVED*** as $summary)
				$list[(string)$summary->Id] = (string)$summary->Status;

			return $list;
		}
		return array();
	}


	/**
	* Get a ***REMOVED*** DOMDocument
	*
	* http://docs.***REMOVED***.com/***REMOVED***/latest/APIReference/index.html?PutConfig.html
	*
	* @internal Used to create XML in ***REMOVED***() and ***REMOVED***()
	* @param string $bucket S3 Origin bucket
	* @param boolean $enabled Enabled (true/false)
	* @param string $comment Comment to append
	* @param string $***REMOVED*** Caller reference
	* @param array $cnames Array of CNAME aliases
	* @param string $***REMOVED*** Default root object
	* @param string $***REMOVED*** Origin access identity
	* @param array $***REMOVED*** Array of trusted signers
	* @return string
	*/
	private static function __getCloudFrontDistributionConfigXML($bucket, $enabled, $comment, $***REMOVED*** = '0', $cnames = array(), $***REMOVED*** = null, $***REMOVED*** = null, $***REMOVED*** = array())
	{
		$dom = new DOMDocument('1.0', 'UTF-8');
		$dom->formatOutput = true;
		$***REMOVED*** = $dom->createElement('***REMOVED***');
		$***REMOVED***->setAttribute('xmlns', 'http://cloudfront.amazonaws.com/doc/2010-11-01/');

		$origin = $dom->createElement('S3Origin');
		$origin->appendChild($dom->createElement('DNSName', $bucket));
		if ($***REMOVED*** !== null) $origin->appendChild($dom->createElement('***REMOVED***', $***REMOVED***));
		$***REMOVED***->appendChild($origin);

		if ($***REMOVED*** !== null) $***REMOVED***->appendChild($dom->createElement('***REMOVED***', $***REMOVED***));

		$***REMOVED***->appendChild($dom->createElement('***REMOVED***', $***REMOVED***));
		foreach ($cnames as $cname)
			$***REMOVED***->appendChild($dom->createElement('CNAME', $cname));
		if ($comment !== '') $***REMOVED***->appendChild($dom->createElement('Comment', $comment));
		$***REMOVED***->appendChild($dom->createElement('Enabled', $enabled ? 'true' : 'false'));

		$trusted = $dom->createElement('***REMOVED***');
		foreach ($***REMOVED*** as $id => $type)
			$trusted->appendChild($id !== '' ? $dom->createElement($type, $id) : $dom->createElement($type));
		$***REMOVED***->appendChild($trusted);

		$dom->appendChild($***REMOVED***);
		//var_dump($dom->saveXML());
		return $dom->saveXML();
	}


	/**
	* Parse a CloudFront distribution config
	*
	* See http://docs.***REMOVED***.com/***REMOVED***/latest/APIReference/index.html?***REMOVED***.html
	*
	* @internal Used to parse the CloudFront ***REMOVED*** node to an array
	* @param object &$node DOMNode
	* @return array
	*/
	private static function __parseCloudFrontDistributionConfig(&$node)
	{
		if (isset($node->***REMOVED***))
			return self::__parseCloudFrontDistributionConfig($node->***REMOVED***);

		$dist = array();
		if (isset($node->Id, $node->Status, $node->***REMOVED***, $node->DomainName))
		{
			$dist['id'] = (string)$node->Id;
			$dist['status'] = (string)$node->Status;
			$dist['time'] = strtotime((string)$node->***REMOVED***);
			$dist['domain'] = (string)$node->DomainName;
		}

		if (isset($node->***REMOVED***))
			$dist['***REMOVED***'] = (string)$node->***REMOVED***;

		if (isset($node->Enabled))
			$dist['enabled'] = (string)$node->Enabled == 'true' ? true : false;

		if (isset($node->S3Origin))
		{
			if (isset($node->S3Origin->DNSName))
				$dist['origin'] = (string)$node->S3Origin->DNSName;

			$dist['***REMOVED***'] = isset($node->S3Origin->***REMOVED***) ?
			(string)$node->S3Origin->***REMOVED*** : null;
		}

		$dist['***REMOVED***'] = isset($node->***REMOVED***) ? (string)$node->***REMOVED*** : null;

		$dist['cnames'] = array();
		if (isset($node->CNAME))
			foreach ($node->CNAME as $cname)
				$dist['cnames'][(string)$cname] = (string)$cname;

		$dist['***REMOVED***'] = array();
		if (isset($node->***REMOVED***))
			foreach ($node->***REMOVED*** as $signer)
			{
				if (isset($signer->Self))
					$dist['***REMOVED***'][''] = 'Self';
				elseif (isset($signer->KeyPairId))
					$dist['***REMOVED***'][(string)$signer->KeyPairId] = 'KeyPairId';
				elseif (isset($signer->***REMOVED***))
					$dist['***REMOVED***'][(string)$signer->***REMOVED***] = '***REMOVED***';
			}

		$dist['comment'] = isset($node->Comment) ? (string)$node->Comment : null;
		return $dist;
	}


	/**
	* Grab CloudFront response
	*
	* @internal Used to parse the CloudFront S3Request::getResponse() output
	* @param object &$rest S3Request instance
	* @return object
	*/
	private static function __getCloudFrontResponse(&$rest)
	{
		$rest->getResponse();
		if ($rest->response->error === false && isset($rest->response->body) &&
		is_string($rest->response->body) && substr($rest->response->body, 0, 5) == '<?xml')
		{
			$rest->response->body = simplexml_load_string($rest->response->body);
			// Grab CloudFront errors
			if (isset($rest->response->body->Error, $rest->response->body->Error->Code,
			$rest->response->body->Error->Message))
			{
				$rest->response->error = array(
					'code' => (string)$rest->response->body->Error->Code,
					'message' => (string)$rest->response->body->Error->Message
				);
				unset($rest->response->body);
			}
		}
		return $rest->response;
	}


	/**
	* Get MIME type for file
	*
	* To override the putObject() Content-Type, add it to $***REMOVED***
	*
	* To use fileinfo, ensure the MAGIC environment variable is set
	*
	* @internal Used to get mime types
	* @param string &$file File path
	* @return string
	*/
	private static function __getMIMEType(&$file)
	{
		static $exts = array(
			'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'gif' => 'image/gif',
			'png' => 'image/png', 'ico' => 'image/x-icon', 'pdf' => 'application/pdf',
			'tif' => 'image/tiff', 'tiff' => 'image/tiff', 'svg' => 'image/svg+xml',
			'svgz' => 'image/svg+xml', 'swf' => 'application/x-shockwave-flash', 
			'zip' => 'application/zip', 'gz' => 'application/x-gzip',
			'tar' => 'application/x-tar', 'bz' => 'application/x-bzip',
			'bz2' => 'application/x-bzip2',  'rar' => 'application/x-rar-compressed',
			'exe' => 'application/x-msdownload', 'msi' => 'application/x-msdownload',
			'cab' => 'application/vnd.ms-cab-compressed', 'txt' => 'text/plain',
			'asc' => 'text/plain', 'htm' => 'text/html', 'html' => 'text/html',
			'css' => 'text/css', 'js' => 'text/javascript',
			'xml' => 'text/xml', 'xsl' => 'application/xsl+xml',
			'ogg' => 'application/ogg', 'mp3' => 'audio/mpeg', 'wav' => 'audio/x-wav',
			'avi' => 'video/x-msvideo', 'mpg' => 'video/mpeg', 'mpeg' => 'video/mpeg',
			'mov' => 'video/quicktime', 'flv' => 'video/x-flv', 'php' => 'text/x-php'
		);

		$ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
		if (isset($exts[$ext])) return $exts[$ext];

		// Use fileinfo if available
		if (extension_loaded('fileinfo') && isset($_ENV['MAGIC']) &&
		($finfo = finfo_open(FILEINFO_MIME, $_ENV['MAGIC'])) !== false)
		{
			if (($type = finfo_file($finfo, $file)) !== false)
			{
				// Remove the charset and grab the last content-type
				$type = explode(' ', str_replace('; charset=', ';charset=', $type));
				$type = array_pop($type);
				$type = explode(';', $type);
				$type = trim(array_shift($type));
			}
			finfo_close($finfo);
			if ($type !== false && strlen($type) > 0) return $type;
		}

		return 'application/octet-stream';
	}


	/**
	* Get the current time
	*
	* @internal Used to apply offsets to sytem time
	* @return integer
	*/
	public static function __getTime()
	{
		return time() + self::$__timeOffset;
	}


	/**
	* Generate the auth string: "AWS AccessKey:Signature"
	*
	* @internal Used by S3Request::getResponse()
	* @param string $string String to sign
	* @return string
	*/
	public static function __getSignature($string)
	{
		return 'AWS '.self::$__accessKey.':'.self::__getHash($string);
	}


	/**
	* Creates a HMAC-SHA1 hash
	*
	* This uses the hash extension if loaded
	*
	* @internal Used by __getSignature()
	* @param string $string String to sign
	* @return string
	*/
	private static function __getHash($string)
	{
		return base64_encode(extension_loaded('hash') ?
		hash_hmac('sha1', $string, self::$__secretKey, true) : pack('H*', sha1(
		(str_pad(self::$__secretKey, 64, chr(0x00)) ^ (str_repeat(chr(0x5c), 64))) .
		pack('H*', sha1((str_pad(self::$__secretKey, 64, chr(0x00)) ^
		(str_repeat(chr(0x36), 64))) . $string)))));
	}

}

/**
 * S3 Request class 
 *
 * @link http://undesigned.org.za/2007/10/22/amazon-s3-php-class
 * @version 0.5.0-dev
 */
final class S3Request
{
	/**
	 * AWS URI
	 *
	 * @var string
	 * @access pricate
	 */
	private $endpoint;
	
	/**
	 * Verb
	 *
	 * @var string
	 * @access private
	 */
	private $verb;
	
	/**
	 * S3 bucket name
	 *
	 * @var string
	 * @access private
	 */
	private $bucket;
	
	/**
	 * Object URI
	 *
	 * @var string
	 * @access private
	 */
	private $uri;
	
	/**
	 * Final object URI
	 *
	 * @var string
	 * @access private
	 */
	private $resource = '';
	
	/**
	 * Additional request parameters
	 *
	 * @var array
	 * @access private
	 */
	private $parameters = array();
	
	/**
	 * Amazon specific request headers
	 *
	 * @var array
	 * @access private
	 */
	private $amzHeaders = array();

	/**
	 * HTTP request headers
	 *
	 * @var array
	 * @access private
	 */
	private $headers = array(
		'Host' => '', 'Date' => '', 'Content-MD5' => '', 'Content-Type' => ''
	);

	/**
	 * Use HTTP PUT?
	 *
	 * @var bool
	 * @access public
	 */
	public $fp = false;

	/**
	 * PUT file size
	 *
	 * @var int
	 * @access public
	 */
	public $size = 0;

	/**
	 * PUT post fields
	 *
	 * @var array
	 * @access public
	 */
	public $data = false;

	/**
	 * S3 request respone
	 *
	 * @var object
	 * @access public
	 */
	public $response;


	/**
	* Constructor
	*
	* @param string $verb Verb
	* @param string $bucket Bucket name
	* @param string $uri Object URI
	* @param string $endpoint AWS endpoint URI
	* @return mixed
	*/
	function __construct($verb, $bucket = '', $uri = '', $endpoint = 's3.amazonaws.com')
	{
		
		$this->endpoint = $endpoint;
		$this->verb = $verb;
		$this->bucket = $bucket;
		$this->uri = $uri !== '' ? '/'.str_replace('%2F', '/', rawurlencode($uri)) : '/';

		//if ($this->bucket !== '')
		//	$this->resource = '/'.$this->bucket.$this->uri;
		//else
		//	$this->resource = $this->uri;

		if ($this->bucket !== '')
		{
			if ($this->__dnsBucketName($this->bucket))
			{
				$this->headers['Host'] = $this->bucket.'.'.$this->endpoint;
				$this->resource = '/'.$this->bucket.$this->uri;
			}
			else
			{
				$this->headers['Host'] = $this->endpoint;
				$this->uri = $this->uri;
				if ($this->bucket !== '') $this->uri = '/'.$this->bucket.$this->uri;
				$this->bucket = '';
				$this->resource = $this->uri;
			}
		}
		else
		{
			$this->headers['Host'] = $this->endpoint;
			$this->resource = $this->uri;
		}


		$this->headers['Date'] = gmdate('D, d M Y H:i:s T');
		$this->response = new STDClass;
		$this->response->error = false;
		$this->response->body = null;
		$this->response->headers = array();
	}


	/**
	* Set request parameter
	*
	* @param string $key Key
	* @param string $value Value
	* @return void
	*/
	public function setParameter($key, $value)
	{
		$this->parameters[$key] = $value;
	}


	/**
	* Set request header
	*
	* @param string $key Key
	* @param string $value Value
	* @return void
	*/
	public function setHeader($key, $value)
	{
		$this->headers[$key] = $value;
	}


	/**
	* Set x-amz-meta-* header
	*
	* @param string $key Key
	* @param string $value Value
	* @return void
	*/
	public function setAmzHeader($key, $value)
	{
		$this->amzHeaders[$key] = $value;
	}


/**
 * Get the S3 response.
 *
 * @return object|false
 */
public function getResponse() {
    $query = '';
    if (sizeof($this->parameters) > 0) {
        $query = (substr($this->uri, -1) !== '?') ? '?' : '&';
        foreach ($this->parameters as $var => $value) {
            $query .= ($value === null || $value === '') ? $var . '&' : $var . '=' . rawurlencode($value) . '&';
        }
        $query = substr($query, 0, -1);
        $this->uri .= $query;

        if (array_key_exists('acl', $this->parameters) ||
            array_key_exists('location', $this->parameters) ||
            array_key_exists('torrent', $this->parameters) ||
            array_key_exists('website', $this->parameters) ||
            array_key_exists('logging', $this->parameters)) {
            $this->resource .= $query;
        }
    }

    $url = (S3::$useSSL ? 'https://' : 'http://') . (!empty($this->headers['Host']) ? $this->headers['Host'] : $this->endpoint) . $this->uri;

    // Prepare headers
    $headers = array();
    foreach ($this->amzHeaders as $header => $value) {
        if (strlen($value) > 0) {
            $headers[$header] = $value;
        }
    }
    foreach ($this->headers as $header => $value) {
        if (strlen($value) > 0) {
            $headers[$header] = $value;
        }
    }

    if (S3::hasAuth()) {
        // Authorization string (CloudFront stringToSign should only contain a date)
        if ($this->headers['Host'] === 'cloudfront.amazonaws.com') {
            $headers['Authorization'] = S3::__getSignature($this->headers['Date']);
        } else {
            $headers['Authorization'] = S3::__getSignature(
                $this->verb . "\n" .
                $this->headers['Content-MD5'] . "\n" .
                $this->headers['Content-Type'] . "\n" .
                $this->headers['Date'] . $amz . "\n" .
                $this->resource
            );
        }
    }

    // Prepare request arguments
    $args = array(
        'method'    => $this->verb,
        'headers'   => $headers,
        'body'      => ($this->data !== false) ? $this->data : null,
        'sslverify' => S3::$***REMOVED***,
        'timeout'   => 15, // Timeout after 15 seconds
    );

    if ($this->verb === 'PUT' || $this->verb === 'POST') {
        if ($this->fp !== false) {
            // Handle file pointer if necessary
            $args['body'] = stream_get_contents($this->fp);
            if ($this->size >= 0) {
                $args['headers']['Content-Length'] = $this->size;
            }
        }
    }

    // Make the request
    $response = wp_remote_request($url, $args);

    if (is_wp_error($response)) {
        $this->response->error = array(
            'code'    => $response->get_error_code(),
            'message' => $response->get_error_message(),
            'resource' => $this->resource,
        );
        return false;
    }

    $this->response->code = wp_remote_retrieve_response_code($response);
    $this->response->headers = wp_remote_retrieve_headers($response);
    $this->response->body = wp_remote_retrieve_body($response);

    if ($this->response->code !== 200) {
        $this->response->error = array(
            'code' => $this->response->code,
            'message' => 'Unexpected HTTP status'
        );
    }

    // Parse body into XML if necessary
    if ($this->response->headers['type'] === 'application/xml' && isset($this->response->body)) {
        $this->response->body = simplexml_load_string($this->response->body);

        // Grab S3 errors
        if (!in_array($this->response->code, array(200, 204, 206)) && isset($this->response->body->Code, $this->response->body->Message)) {
            $this->response->error = array(
                'code' => (string) $this->response->body->Code,
                'message' => (string) $this->response->body->Message,
            );
            if (isset($this->response->body->Resource)) {
                $this->response->error['resource'] = (string) $this->response->body->Resource;
            }
            unset($this->response->body);
        }
    }

    // Clean up file resources
    if ($this->fp !== false && is_resource($this->fp)) {
		//phpcs:ignore WordPress.WP.***REMOVED***.file_system_operations_fclose --  WP_Filesystem does not provide a direct method for closing file pointers.
        fclose($this->fp);
    }

    return $this->response;
}

	/**
	* Sort compare for meta headers
	*
	* @internal Used to sort x-amz meta headers
	* @param string $a String A
	* @param string $b String B
	* @return integer
	*/
	private function __sortMetaHeadersCmp($a, $b)
	{
		$lenA = strpos($a, ':');
		$lenB = strpos($b, ':');
		$minLen = min($lenA, $lenB);
		$ncmp = strncmp($a, $b, $minLen);
		if ($lenA == $lenB) return $ncmp;
		if (0 == $ncmp) return $lenA < $lenB ? -1 : 1;
		return $ncmp;
	}

	/**
	* CURL write callback
	*
	* @param resource &$curl CURL resource
	* @param string &$data Data
	* @return integer
	*/
	private function __responseWriteCallback(&$curl, &$data)
	{
		if (in_array($this->response->code, array(200, 206)) && $this->fp !== false) {

			global $wp_filesystem;
			// Initialize the WP Filesystem API if needed
			if ( ! function_exists( 'WP_Filesystem' ) ) {
				require_once ABSPATH . 'wp-admin/includes/file.php';
			}
			WP_Filesystem();

			if ($wp_filesystem->exists($this->fp)) {
				// Read existing content
				$existing_content = $wp_filesystem->get_contents($this->fp);
			
				// Append new data to the existing content
				$content = $existing_content . $data;
			
				// Write the updated content to the file using WP_Filesystem
				if ( ! $wp_filesystem->put_contents( $this->fp, $content, FS_CHMOD_FILE ) ) {
					return false;
				}
				
				return true;
			} else {
				// Handle the case where the file does not exist
				return false;
			}
		} else {
			$this->response->body .= $data;
		}
		return strlen($data);
	}


	/**
	* Check DNS conformity
	*
	* @param string $bucket Bucket name
	* @return boolean
	*/
	private function __dnsBucketName($bucket)
	{
		if (strlen($bucket) > 63 || preg_match("/[^a-z0-9\.-]/", $bucket) > 0) return false;
		if (S3::$useSSL && strstr($bucket, '.') !== false) return false;
		if (strstr($bucket, '-.') !== false) return false;
		if (strstr($bucket, '..') !== false) return false;
		if (!preg_match("/^[0-9a-z]/", $bucket)) return false;
		if (!preg_match("/[0-9a-z]$/", $bucket)) return false;
		return true;
	}


	/**
	* CURL header callback
	*
	* @param resource $curl CURL resource
	* @param string $data Data
	* @return integer
	*/
	private function __responseHeaderCallback($curl, $data)
	{
		if (($strlen = strlen($data)) <= 2) return $strlen;
		if (substr($data, 0, 4) == 'HTTP')
			$this->response->code = (int)substr($data, 9, 3);
		else
		{
			$data = trim($data);
			if (strpos($data, ': ') === false) return $strlen;
			list($header, $value) = explode(': ', $data, 2);
			if ($header == 'Last-Modified')
				$this->response->headers['time'] = strtotime($value);
			elseif ($header == 'Date')
				$this->response->headers['date'] = strtotime($value);
			elseif ($header == 'Content-Length')
				$this->response->headers['size'] = (int)$value;
			elseif ($header == 'Content-Type')
				$this->response->headers['type'] = $value;
			elseif ($header == 'ETag')
				$this->response->headers['hash'] = $value[0] == '"' ? substr($value, 1, -1) : $value;
			elseif (preg_match('/^x-amz-meta-.*$/', $header))
				$this->response->headers[$header] = $value;
		}
		return $strlen;
	}

}

/**
 * S3 exception class
 *
 * @link http://undesigned.org.za/2007/10/22/amazon-s3-php-class
 * @version 0.5.0-dev
 */

class S3Exception extends Exception {
	/**
	 * Class constructor
	 *
	 * @param string $message Exception message
	 * @param string $file File in which exception was created
	 * @param string $line Line number on which exception was created
	 * @param int $code Exception code
	 */
	function __construct($message, $file, $line, $code = 0)
	{
		parent::__construct($message, $code);
		$this->file = $file;
		$this->line = $line;
	}
}
