<?php

namespace YoastSEO_Vendor\Psr\Http\Message;

interface UploadedFileFactoryInterface
{
    /**
     * Create a new uploaded file.
     *
     * If a size is not provided it will be determined by checking the size of
     * the file.
     *
     * @see http://php.net/manual/features.file-upload.post-method.php
     * @see http://php.net/manual/features.file-upload.errors.php
     *
     * @param ***REMOVED*** $stream Underlying stream representing the
     *     uploaded file content.
     * @param int $size in bytes
     * @param int $error PHP file upload error
     * @param string $***REMOVED*** Filename as provided by the client, if any.
     * @param string $***REMOVED*** Media type as provided by the client, if any.
     *
     * @return UploadedFileInterface
     *
     * @throws \InvalidArgumentException If the file resource is not readable.
     */
    public function ***REMOVED***(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $stream, int $size = null, int $error = \UPLOAD_ERR_OK, string $***REMOVED*** = null, string $***REMOVED*** = null) : \YoastSEO_Vendor\Psr\Http\Message\UploadedFileInterface;
}
