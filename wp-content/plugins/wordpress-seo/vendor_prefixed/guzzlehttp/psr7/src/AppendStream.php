<?php

namespace YoastSEO_Vendor\GuzzleHttp\Psr7;

use YoastSEO_Vendor\Psr\Http\Message\***REMOVED***;
/**
 * Reads from multiple streams, one after the other.
 *
 * This is a read-only stream decorator.
 *
 * @final
 */
class AppendStream implements \YoastSEO_Vendor\Psr\Http\Message\***REMOVED***
{
    /** @var ***REMOVED***[] Streams being decorated */
    private $streams = [];
    private $seekable = \true;
    private $current = 0;
    private $pos = 0;
    /**
     * @param ***REMOVED***[] $streams Streams to decorate. Each stream must
     *                                   be readable.
     */
    public function __construct(array $streams = [])
    {
        foreach ($streams as $stream) {
            $this->addStream($stream);
        }
    }
    public function __toString()
    {
        try {
            $this->rewind();
            return $this->getContents();
        } catch (\Exception $e) {
            return '';
        }
    }
    /**
     * Add a stream to the AppendStream
     *
     * @param ***REMOVED*** $stream Stream to append. Must be readable.
     *
     * @throws \InvalidArgumentException if the stream is not readable
     */
    public function addStream(\YoastSEO_Vendor\Psr\Http\Message\***REMOVED*** $stream)
    {
        if (!$stream->isReadable()) {
            throw new \InvalidArgumentException('Each stream must be readable');
        }
        // The stream is only seekable if all streams are seekable
        if (!$stream->isSeekable()) {
            $this->seekable = \false;
        }
        $this->streams[] = $stream;
    }
    public function getContents()
    {
        return \YoastSEO_Vendor\GuzzleHttp\Psr7\Utils::copyToString($this);
    }
    /**
     * Closes each attached stream.
     *
     * {@inheritdoc}
     */
    public function close()
    {
        $this->pos = $this->current = 0;
        $this->seekable = \true;
        foreach ($this->streams as $stream) {
            $stream->close();
        }
        $this->streams = [];
    }
    /**
     * Detaches each attached stream.
     *
     * Returns null as it's not clear which underlying stream resource to return.
     *
     * {@inheritdoc}
     */
    public function detach()
    {
        $this->pos = $this->current = 0;
        $this->seekable = \true;
        foreach ($this->streams as $stream) {
            $stream->detach();
        }
        $this->streams = [];
        return null;
    }
    public function tell()
    {
        return $this->pos;
    }
    /**
     * Tries to calculate the size by adding the size of each stream.
     *
     * If any of the streams do not return a valid number, then the size of the
     * append stream cannot be determined and null is returned.
     *
     * {@inheritdoc}
     */
    public function getSize()
    {
        $size = 0;
        foreach ($this->streams as $stream) {
            $s = $stream->getSize();
            if ($s === null) {
                return null;
            }
            $size += $s;
        }
        return $size;
    }
    public function eof()
    {
        return !$this->streams || $this->current >= \count($this->streams) - 1 && $this->streams[$this->current]->eof();
    }
    public function rewind()
    {
        $this->seek(0);
    }
    /**
     * Attempts to seek to the given position. Only supports SEEK_SET.
     *
     * {@inheritdoc}
     */
    public function seek($offset, $whence = \SEEK_SET)
    {
        if (!$this->seekable) {
            throw new \***REMOVED***('This AppendStream is not seekable');
        } elseif ($whence !== \SEEK_SET) {
            throw new \***REMOVED***('The AppendStream can only seek with SEEK_SET');
        }
        $this->pos = $this->current = 0;
        // Rewind each stream
        foreach ($this->streams as $i => $stream) {
            try {
                $stream->rewind();
            } catch (\Exception $e) {
                throw new \***REMOVED***('Unable to seek stream ' . $i . ' of the AppendStream', 0, $e);
            }
        }
        // Seek to the actual position by reading from each stream
        while ($this->pos < $offset && !$this->eof()) {
            $result = $this->read(\min(8096, $offset - $this->pos));
            if ($result === '') {
                break;
            }
        }
    }
    /**
     * Reads from all of the appended streams until the length is met or EOF.
     *
     * {@inheritdoc}
     */
    public function read($length)
    {
        $buffer = '';
        $total = \count($this->streams) - 1;
        $remaining = $length;
        $***REMOVED*** = \false;
        while ($remaining > 0) {
            // Progress to the next stream if needed.
            if ($***REMOVED*** || $this->streams[$this->current]->eof()) {
                $***REMOVED*** = \false;
                if ($this->current === $total) {
                    break;
                }
                $this->current++;
            }
            $result = $this->streams[$this->current]->read($remaining);
            // Using a loose comparison here to match on '', false, and null
            if ($result == null) {
                $***REMOVED*** = \true;
                continue;
            }
            $buffer .= $result;
            $remaining = $length - \strlen($buffer);
        }
        $this->pos += \strlen($buffer);
        return $buffer;
    }
    public function isReadable()
    {
        return \true;
    }
    public function isWritable()
    {
        return \false;
    }
    public function isSeekable()
    {
        return $this->seekable;
    }
    public function write($string)
    {
        throw new \***REMOVED***('Cannot write to an AppendStream');
    }
    public function getMetadata($key = null)
    {
        return $key ? null : [];
    }
}
