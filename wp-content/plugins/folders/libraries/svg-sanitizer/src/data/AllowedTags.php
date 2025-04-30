<?php
namespace enshrined\svgSanitize\data;

/**
 * Class AllowedTags
 *
 * @package enshrined\svgSanitize\data
 */
class AllowedTags implements TagInterface
{

    /**
     * Returns an array of tags
     *
     * @return array
     */
    public static function getTags()
    {
        return array (
            // HTML
            'a',
            'font',
            'image',
            'style',

            // SVG
            'svg',
            'altglyph',
            'altglyphdef',
            'altglyphitem',
            'animatecolor',
            'animatemotion',
            '***REMOVED***',
            'circle',
            'clippath',
            'defs',
            'desc',
            'ellipse',
            'filter',
            'font',
            'g',
            'glyph',
            'glyphref',
            'hkern',
            'image',
            'line',
            '***REMOVED***',
            'marker',
            'mask',
            'metadata',
            'mpath',
            'path',
            'pattern',
            'polygon',
            'polyline',
            '***REMOVED***',
            'rect',
            'stop',
            'switch',
            'symbol',
            'text',
            'textpath',
            'title',
            'tref',
            'tspan',
            'use',
            'view',
            'vkern',

            // SVG Filters
            'feBlend',
            'feColorMatrix',
            '***REMOVED***',
            'feComposite',
            '***REMOVED***',
            '***REMOVED***',
            '***REMOVED***',
            '***REMOVED***',
            'feFlood',
            'feFuncA',
            'feFuncB',
            'feFuncG',
            'feFuncR',
            '***REMOVED***',
            'feMerge',
            'feMergeNode',
            'feMorphology',
            'feOffset',
            'fePointLight',
            '***REMOVED***',
            'feSpotLight',
            'feTile',
            'feTurbulence',

            //text
            '#text'
        );
    }
}
