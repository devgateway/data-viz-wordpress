import React from 'react';
import { TimeLineBlockAttributes } from './type';

const SaveComponent = (props: { attributes: TimeLineBlockAttributes }) => {
    const {
        attributes: {
            count,
            type,
            taxonomy,
            categories,
            height,
            config,
            lineColor,
            lineWidth,
            position,
            marginLeft,
            marginTop,
            marginRight,
            marginBottom,
            fontSize,
            titleWidth,
            subtitleWidth,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            titleHeight
        },
    } = props;


    const divStyles = {}

    return (
        <div style={divStyles}>
            <div data-items={count} data-type={type} data-taxonomy={taxonomy} data-categories={categories.toString()}
                className={"viz-component"}
                data-height={height}
                data-component={"timeLine"}
                data-config={***REMOVED***(JSON.stringify(config))}
                data-csv-line-color={***REMOVED***(lineColor)}
                data-position={position}
                data-line-width={lineWidth}
                data-margin-left={marginLeft}
                data-margin-top={marginTop}
                data-margin-right={marginRight}
                data-margin-bottom={marginBottom}
                data-font-size={fontSize}
                data-title-width={titleWidth}
                data-title-height={titleHeight}
                data-subtitle-width={subtitleWidth}
                data-subtitle-height={***REMOVED***}
                data-enable-title-popup={***REMOVED***}
                data-enable-circle-popup={***REMOVED***}
                data-enable-default-popup={***REMOVED***}
                data-close-popup-on-mouse-out={***REMOVED***}>
            </div>
        </div>
    );
}


export default SaveComponent;
