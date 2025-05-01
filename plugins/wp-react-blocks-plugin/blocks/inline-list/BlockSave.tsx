import React from 'react';
import { ***REMOVED*** } from './types';

const SaveComponent = (props: { attributes: ***REMOVED*** }) => {
    const {
        attributes: {
            count,
            type,
            taxonomy,
            categories,
            height,
            width,
            colors,
            showIcons,
            ***REMOVED***,
            contentToggleHPosition
        },
    } = props;

    const divClass = ""
    const divStyles = {}
    const colorsParams = Object.keys(colors).map(k => colors[k]).join(",")
    return (
        <div className={divClass} style={divStyles}>
            <div data-items={count}
                data-height={height}
                data-width={width}
                data-color={colorsParams}
                data-type={type} data-taxonomy={taxonomy} data-categories={categories.toString()}
                className={"viz-component"}
                data-show-post-icons={showIcons}
                data-show-content-toggle={***REMOVED***}
                data-content-toggle-h-position={contentToggleHPosition}
                data-component={"inlineList"}>
            </div>
        </div>
    );
}


export default SaveComponent