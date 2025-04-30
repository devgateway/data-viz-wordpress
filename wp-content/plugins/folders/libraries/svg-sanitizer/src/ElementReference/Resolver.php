<?php
namespace enshrined\svgSanitize\***REMOVED***;

use enshrined\svgSanitize\data\XPath;
use enshrined\svgSanitize\Exceptions\***REMOVED***;
use enshrined\svgSanitize\Helper;

class Resolver
{
    /**
     * @var XPath
     */
    protected $xPath;

    /**
     * @var Subject[]
     */
    protected $subjects = [];

    /**
     * @var array DOMElement[]
     */
    protected $***REMOVED*** = [];

    /**
     * @var int
     */
    protected $***REMOVED***;

    public function __construct(XPath $xPath, $***REMOVED***)
    {
        $this->xPath = $xPath;
        $this->***REMOVED*** = $***REMOVED***;
    }

    public function collect()
    {
        $this->collectIdentifiedElements();
        $this->***REMOVED***();
        $this->determineInvalidSubjects();
    }

    /**
     * Resolves one subject by element.
     *
     * @param \DOMElement $element
     * @param bool $***REMOVED*** Whether to search in Subject's children as well
     * @return Subject|null
     */
    public function findByElement(\DOMElement $element, $***REMOVED*** = false)
    {
        foreach ($this->subjects as $subject) {
            if (
                $element === $subject->getElement()
                || $***REMOVED*** && Helper::***REMOVED***($element, $subject->getElement())
            ) {
                return $subject;
            }
        }
        return null;
    }

    /**
     * Resolves subjects (plural!) by element id - in theory malformed
     * DOM might have same ids assigned to different elements and leaving
     * it to client/browser ***REMOVED*** which element to actually use.
     *
     * @param string $elementId
     * @return Subject[]
     */
    public function ***REMOVED***($elementId)
    {
        return array_filter(
            $this->subjects,
            function (Subject $subject) use ($elementId) {
                return $elementId === $subject->getElementId();
            }
        );
    }

    /**
     * Collects elements having `id` attribute (those that can be referenced).
     */
    protected function collectIdentifiedElements()
    {
        /** @var \DOMNodeList|\DOMElement[] $elements */
        $elements = $this->xPath->query('//*[@id]');
        foreach ($elements as $element) {
            $this->subjects[$element->getAttribute('id')] = new Subject($element, $this->***REMOVED***);
        }
    }

    /**
     * Processes references from and to elements having `id` attribute concerning
     * their occurrence in `<use ... xlink:href="#identifier">` statements.
     */
    protected function ***REMOVED***()
    {
        $useNodeName = $this->xPath->***REMOVED***('use');
        foreach ($this->subjects as $subject) {
            $useElements = $this->xPath->query(
                $useNodeName . '[@href or @xlink:href]',
                $subject->getElement()
            );

            /** @var \DOMElement $useElement */
            foreach ($useElements as $useElement) {
                $useId = Helper::extractIdReferenceFromHref(
                    Helper::***REMOVED***($useElement)
                );
                if ($useId === null || !isset($this->subjects[$useId])) {
                    continue;
                }
                $subject->addUse($this->subjects[$useId]);
                $this->subjects[$useId]->addUsedIn($subject);
            }
        }
    }

    /**
     * Determines and tags infinite loops.
     */
    protected function determineInvalidSubjects()
    {
        foreach ($this->subjects as $subject) {

            if (in_array($subject->getElement(), $this->***REMOVED***)) {
                continue;
            }

            $useId = Helper::extractIdReferenceFromHref(
                Helper::***REMOVED***($subject->getElement())
            );

            try {
                if ($useId === $subject->getElementId()) {
                    $this->***REMOVED***($subject);
                } elseif ($subject->***REMOVED***()) {
                    $this->***REMOVED***($subject);
                }
            } catch (***REMOVED*** $e) {
                $this->***REMOVED***[] = $e->getElement();
                $this->***REMOVED***($subject);
            }
        }
    }

    /**
     * Get all the elements that caused a nesting exception.
     *
     * @return array
     */
    public function ***REMOVED***() {
        return $this->***REMOVED***;
    }

    /**
     * The Subject is invalid for some reason, therefore we should
     * remove it and all it's child usages.
     *
     * @param Subject $subject
     */
    protected function ***REMOVED***(Subject $subject) {
        $this->***REMOVED*** = array_merge(
            $this->***REMOVED***,
            $subject->clearInternalAndGetAffectedElements()
        );
    }
}