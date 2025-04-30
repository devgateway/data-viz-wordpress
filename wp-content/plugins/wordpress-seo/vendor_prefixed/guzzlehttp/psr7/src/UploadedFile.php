<?php

declare (strict_types=1);
namespace YoastSEO_Vendor\GuzzleHttp\Psr7;

use InvalidArgumentException;
use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
use YoastSEO_Vendor\Psr\Http\Message\UploadedFileInterface;
use ***REMOVED***;
class UploadedFile implements \YoastSEO_Vendor\Psr\Http\Message\UploadedFileInterface
{
    private const ERRORS = [\UPLOAD_ERR_OK, \UPLOAD_ERR_INI_SIZE, \UPLOAD_ERR_FORM_SIZE, \UPLOAD_ERR_PARTIAL, \UPLOAD_ERR_NO_FILE, \UPLOAD_ERR_NO_TMP_DIR, \UPLOAD_ERR_CANT_WRITE, \UPLOAD_ERR_EXTENSION];
    /**
     * @var string|null
     */
    private $***REMOVED***;
    /**
     * @var string|null
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
     * @var int|null
     */
    private $size;
    /**
     * @var ***REMOVED***|null
     */
    private $stream;
    /**
     * @param ***REMOVED***|string|resource $streamOrFile
     */
    public function __construct($streamOrFile, ?int $size, int $errorStatus, string $***REMOVED*** = null, string $***REMOVED*** = null)
    {
        $this->setError($errorStatus);
        $this->size = $size;
        $this->***REMOVED*** = $***REMOVED***;
        $this->***REMOVED*** = $***REMOVED***;
        if ($this->isOk()) {
            $this->***REMOVED***($streamOrFile);
        }
    }
    /**
     * Depending on the value set file or stream variable
     *
     * @param ***REMOVED***|string|resource $streamOrFile
     *
     * @throws InvalidArgumentException
     */
    private function ***REMOVED***($streamOrFile) : void
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
     * @throws InvalidArgumentException
     */
    private function setError(int $error) : void
    {
        if (\false === \in_array($error, \YoastSEO_Vendor\GuzzleHttp\Psr7\UploadedFile::ERRORS, \true)) {
            throw new \InvalidArgumentException('Invalid error status for UploadedFile');
        }
        $this->error = $error;
    }
    private static function ***REMOVED***($param) : bool
    {
        return \is_string($param) && \false === empty($param);
    }
    /**
     * Return true if there is no upload error
     */
    private function isOk() : bool
    {
        return $this->error === \UPLOAD_ERR_OK;
    }
    public function isMoved() : bool
    {
        return $this->moved;
    }
    /**
     * @throws ***REMOVED*** if is moved or not ok
     */
    private function ***REMOVED***() : void
    {
        if (\false === $this->isOk()) {
            throw new \***REMOVED***('Cannot retrieve stream due to upload error');
        }
        if ($this->isMoved()) {
            throw new \***REMOVED***('Cannot retrieve stream after it has already been moved');
        }
    }
    public function getStream() : \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***
    {
        $this->***REMOVED***();
        if ($this->stream instanceof \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***) {
            return $this->stream;
        }
        /** @var string $file */
        $file = $this->file;
        return new \YoastSEO_Vendor\GuzzleHttp\Psr7\***REMOVED***($file, 'r+');
    }
    public function moveTo($targetPath) : void
    {
        $this->***REMOVED***();
        if (\false === self::***REMOVED***($targetPath)) {
            throw new \InvalidArgumentException('Invalid path provided for move operation; must be a non-empty string');
        }
        if ($this->file) {
            $this->moved = \PHP_SAPI === 'cli' ? \rename($this->file, $targetPath) : \move_uploaded_file($this->file, $targetPath);
        } else {
            \YoastSEO_Vendor\GuzzleHttp\Psr7\Utils::copyToStream($this->getStream(), new \YoastSEO_Vendor\GuzzleHttp\Psr7\***REMOVED***($targetPath, 'w'));
            $this->moved = \true;
        }
        if (\false === $this->moved) {
            throw new \***REMOVED***(\sprintf('Uploaded file could not be moved to %s', $targetPath));
        }
    }
    public function getSize() : ?int
    {
        return $this->size;
    }
    public function getError() : int
    {
        return $this->error;
    }
    public function ***REMOVED***() : ?string
    {
        return $this->***REMOVED***;
    }
    public function ***REMOVED***() : ?string
    {
        return $this->***REMOVED***;
    }
}
