import React from 'react';

interface ***REMOVED*** {
    setAttributes: (attributes: any) => void;
    attributes: {
        buttonLabel: string;
        height: number;
        width: number;
        ***REMOVED***: string;
        fontColor: string;
    };
}
const SaveComponent = (props: ***REMOVED***) => {
    const {
        attributes: {
            buttonLabel,
            height,
            width,
            ***REMOVED***,
            fontColor
        },
    } = props;

    const divClass = ""
    const divStyles = {}
    return (
        <div className={divClass} style={divStyles}>
            <div
                className={"viz-component"}
                data-button-label={buttonLabel}
                data-height={height}
                data-width={width}
                data-background-color={***REMOVED***}
                data-font-color={fontColor}
                data-component={"backToTop"}>
            </div>
        </div>
    );
}


export default SaveComponent