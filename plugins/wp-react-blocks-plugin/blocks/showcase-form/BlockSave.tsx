import React from 'react';
import {
    getColorClassName
} from '@wordpress/block-editor';
import { ShowcaseFormBlockAttributes } from './types';

const SaveComponent = (props: {attributes: ShowcaseFormBlockAttributes}) => {
    const {
        customBackgroundColor,
        backgroundColor,
        width,
        height,
        alignment
    } = props.attributes;

    const divClass = getColorClassName('background-color', backgroundColor);

    const divStyles = {
        "background-color": customBackgroundColor,
        "text-align": alignment,
        "margin": 'auto'
    };
    return (<div className={divClass} style={divStyles}>
            <div {...props.attributes} className={"viz-component"} data-component={"showCaseForm"}></div>
        </div>
    );
}

export default SaveComponent