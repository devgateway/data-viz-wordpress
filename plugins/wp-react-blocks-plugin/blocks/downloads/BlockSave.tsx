import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { ***REMOVED*** } from './types';

const SaveComponent = (props: { attributes: ***REMOVED*** }) => {
    const {
        attributes: {
            type,
            height,
            checkPng,
            checkJpg,
            buttonLabel,
            defaultFormat,
            pngLabel,
            jpgLabel,
            pngText,
            jpgText,
            title,
            sectionTitle,
            style,
            useTitle,
            fontClass,
            fontSize,
            color,
            tooltip,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***
        },
    } = props;

    const divClass = ""
    const divStyles = {}


    return (
        <div className={divClass} style={divStyles}>
            <div
                data-height={height}
                className={"viz-component self-render-component"}
                data-component={"download"}
                data-check-png={checkPng}
                data-check-jpg={checkJpg}
                data-button-label={buttonLabel}
                data-default-format={defaultFormat}
                data-png-label={pngLabel}
                data-jpg-label={jpgLabel}
                data-png-text={pngText}
                data-jpg-text={jpgText}
                data-title={title}
                data-section-title={***REMOVED***(`<p class="${fontClass}" style="font-size:${(!fontClass) ? fontSize : 'auto'};color:${color}">${sectionTitle}</p>`)}
                data-style={style}
                data-use-title={useTitle}
                data-download-tooltip={***REMOVED***(***REMOVED***)}
                data-include-source-url={***REMOVED***}
                data-source-urlmargin-left={***REMOVED***}
                data-source-urlmargin-top={***REMOVED***}
                data-source-urlfont-size={***REMOVED***}>
                <InnerBlocks.Content />
            </div>
        </div>


    );
}


export default SaveComponent