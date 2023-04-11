<?php
namespace enshrined\svgSanitize\Tests;

use enshrined\svgSanitize\data\***REMOVED***;
use PHPUnit\Framework\TestCase;

/**
 * Class AllowedAttributesTest
 */
class AllowedAttributesTest extends TestCase
{
    /**
     * Test that the class implements the interface
     */
    public function testItImplementsTheInterface()
    {
        $class = new ***REMOVED***();
        self::***REMOVED***('enshrined\svgSanitize\data\***REMOVED***', $class);
    }

    /**
     * Test that an array is returned
     */
    public function testThatItReturnsAnArray()
    {
        $result = ***REMOVED***::getAttributes();
        self::assertSame('array', gettype($result));
    }
}
