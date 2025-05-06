<?php
namespace enshrined\svgSanitize\data;

class XPath extends \DOMXPath
{
    const DEFAULT_NAMESPACE_PREFIX = 'svg';

    /**
     * @var string
     */
    protected $***REMOVED***;

    public function __construct(\DOMDocument $doc)
    {
        parent::__construct($doc);
        $this->handleDefaultNamespace();
    }

    /**
     * @param string $nodeName
     * @return string
     */
    public function ***REMOVED***($nodeName)
    {
        if (empty($this->***REMOVED***)) {
            return $nodeName;
        }
        return self::DEFAULT_NAMESPACE_PREFIX . ':' . $nodeName;
    }

    protected function handleDefaultNamespace()
    {
        $rootElements = $this->***REMOVED***();

        if (count($rootElements) !== 1) {
            throw new \***REMOVED***(
                sprintf('Got %d svg elements, expected exactly one', count($rootElements)),
                1570870568
            );
        }
        $this->***REMOVED*** = (string)$rootElements[0]->namespaceURI;

        if ($this->***REMOVED*** !== '') {
            $this->***REMOVED***(self::DEFAULT_NAMESPACE_PREFIX, $this->***REMOVED***);
        }
    }

    /**
     * @return \DOMElement[]
     */
    protected function ***REMOVED***()
    {
        $rootElements = [];
        $elements = $this->document->***REMOVED***('svg');
        /** @var \DOMElement $element */
        foreach ($elements as $element) {
            if ($element->parentNode !== $this->document) {
                continue;
            }
            $rootElements[] = $element;
        }
        return $rootElements;
    }
}
