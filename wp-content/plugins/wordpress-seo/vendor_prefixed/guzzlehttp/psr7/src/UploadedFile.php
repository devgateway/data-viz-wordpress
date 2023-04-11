<?php

namespace YoastSEO_Vendor\GuzzleHttp\Psr7;

use InvalidArgumentException;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\UploadedFileInterface;
use ***REMOVED***;
class UploadedFile implements \YoastSEO_Vendor\Psr\Http\Message\UploadedFileInterface
{
    /**
     * @var int[]
     */
    private static $errors = [\UPLOAD_ERR_OK, \UPLOAD_ERR_INI_SIZE, \UPLOAD_ERR_FORM_SIZE, \UPLOAD_ERR_PARTIAL, \UPLOAD_ERR_NO_FILE, \UPLOAD_ERR_NO_TMP_DIR, \UPLOAD_ERR_CANT_WRITE, \UPLOAD_ERR_EXTENSION];
    /**
     * @var string
     */
    private $***REMOVED***;
    /**
     * @var string
     */
    private $***REMOVED***;
    /**
     * @var int
     */
    private $error;
    /**
     * @var string|null
     */
    private $file;
    /**
     * @var bool
     */
    private $moved = \false;
    /**
     * @var int
     */
    private $size;
    /**
     * @var ***REMOVED***|null
     */
    private $stream;
    /**
     * @param ***REMOVED***|string|resource $streamOrFile
     * @param int                             $size
     * @param int                             $errorStatus
     * @param string|null                     $***REMOVED***
     * @param string|null                     $***REMOVED***
     */
    public function __construct($streamOrFile, $size, $errorStatus, $***REMOVED*** = null, $***REMOVED*** = null)
    {
        $this->setError($errorStatus);
        $this->setSize($size);
        $this->***REMOVED***($***REMOVED***);
        $this->***REMOVED***($***REMOVED***);
        if ($this->isOk()) {
            $this->***REMOVED***($streamOrFile);
        }
    }
    /**
     * Depending on the value set file or stream variable
     *
     * @param mixed $streamOrFile
     *
     * @throws InvalidArgumentException
     */
    private function ***REMOVED***($streamOrFile)
    {
        if (\is_string($streamOrFile)) {
            $this->file = $streamOrFile;
        } elseif (\is_resource($streamOrFile)) {
            $this->stream = new \YoastSEO_Vendor\GuzzleHttp\Psr7\Stream($streamOrFile);
        } elseif ($streamOrFile instanceof \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***) {
            $this->stream = $streamOrFile;
        } else {
            throw new \InvalidArgumentException('Invalid stream or file provided for UploadedFile');
        }
    }
    /**
     * @param int $error
     *
     * @throws InvalidArgumentException
     */
    private function setError($error)
    {
        if (\false === \is_int($error)) {
            throw new \InvalidArgumentException('Upload file error status must be an integer');
        }
        if (\false === \in_array($error, \YoastSEO_Vendor\GuzzleHttp\Psr7\UploadedFile::$errors)) {
            throw new \InvalidArgumentException('Invalid error status for UploadedFile');
        }
        $this->error = $error;
    }
    /**
     * @param int $size
     *
     * @throws InvalidArgumentException
     */
    private function setSize($size)
    {
        if (\false === \is_int($size)) {
            throw new \InvalidArgumentException('Upload file size must be an integer');
        }
        $this->size = $size;
    }
    /**
     * @param mixed $param
     *
     * @return bool
     */
    private function ***REMOVED***($param)
    {
        return \in_array(\gettype($param), ['string', 'NULL']);
    }
    /**
     * @param mixed $param
     *
     * @return bool
     */
    private function ***REMOVED***($param)
    {
        return \is_string($param) && \false === empty($param);
    }
    /**
     * @param string|null $***REMOVED***
     *
     * @throws InvalidArgumentException
     */
    private function ***REMOVED***($***REMOVED***)
    {
        if (\false === $this->***REMOVED***($***REMOVED***)) {
            throw new \InvalidArgumentException('Upload file client filename must be a string or null');
        }
        $this->***REMOVED*** = $***REMOVED***;
    }
    /**
     * @param string|null $***REMOVED***
     *
     * @throws InvalidArgumentException
     */
    private function ***REMOVED***($***REMOVED***)
    {
        if (\false === $this->***REMOVED***($***REMOVED***)) {
            throw new \InvalidArgumentException('Upload file client media type must be a string or null');
        }
        $this->***REMOVED*** = $***REMOVED***;
    }
    /**
     * Return true if there is no upload error
     *
     * @return bool
     */
    private function isOk()
    {
        return $this->error === \UPLOAD_ERR_OK;
    }
    /**
     * @return bool
     */
    public function isMoved()
    {
        return $this->moved;
    }
    /**
     * @throws ***REMOVED*** if is moved or not ok
     */
    private function ***REMOVED***()
    {
        if (\false === $this->isOk()) {
            throw new \***REMOVED***('Cannot retrieve stream due to upload error');
        }
        if ($this->isMoved()) {
            throw new \***REMOVED***('Cannot retrieve stream after it has already been moved');
        }
    }
    /**
     * {@inheritdoc}
     *
     * @throws ***REMOVED*** if the upload was not successful.
     */
    public function getStream()
    {
        $this->***REMOVED***();
        if ($this->stream instanceof \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***) {
            return $this->stream;
        }
        return new \YoastSEO_Vendor\GuzzleHttp\Psr7\***REMOVED***($this->file, 'r+');
    }
    /**
     * {@inheritdoc}
     *
     * @see http://php.net/is_uploaded_file
     * @see http://php.net/move_uploaded_file
     *
     * @param string $targetPath Path to which to move the uploaded file.
     *
     * @throws ***REMOVED***         if the upload was not successful.
     * @throws InvalidArgumentException if the $path specified is invalid.
     * @throws ***REMOVED***         on any error during the move operation, or on
     *                                  the second or subsequent call to the method.
     */
    public function moveTo($targetPath)
    {
        $this->***REMOVED***();
        if (\false === $this->***REMOVED***($targetPath)) {
            throw new \InvalidArgumentException('Invalid path provided for move operation; must be a non-empty string');
        }
        if ($this->file) {
            $this->moved = \php_sapi_name() == 'cli' ? \rename($this->file, $targetPath) : \move_uploaded_file($this->file, $targetPath);
        } else {
            \YoastSEO_Vendor\GuzzleHttp\Psr7\Utils::copyToStream($this->getStream(), new \YoastSEO_Vendor\GuzzleHttp\Psr7\***REMOVED***($targetPath, 'w'));
            $this->moved = \true;
        }
        if (\false === $this->moved) {
            throw new \***REMOVED***(\sprintf('Uploaded file could not be moved to %s', $targetPath));
        }
    }
    /**
     * {@inheritdoc}
     *
     * @return int|null The file size in bytes or null if unknown.
     */
    public function getSize()
    {
        return $this->size;
    }
    /**
     * {@inheritdoc}
     *
     * @see http://php.net/manual/en/features.file-upload.errors.php
     *
     * @return int One of PHP's UPLOAD_ERR_XXX constants.
     */
    public function getError()
    {
        return $this->error;
    }
    /**
     * {@inheritdoc}
     *
     * @return string|null The filename sent by the client or null if none
     *                     was provided.
     */
    public function ***REMOVED***()
    {
        return $this->***REMOVED***;
    }
    /**
     * {@inheritdoc}
     */
    public function ***REMOVED***()
    {
        return $this->***REMOVED***;
    }
}
