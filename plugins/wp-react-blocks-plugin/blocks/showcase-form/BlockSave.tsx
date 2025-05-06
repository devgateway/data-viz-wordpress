import React from 'react';
import {
    ***REMOVED***
} from '@wordpress/block-editor';
import { ShowcaseFormBlockAttributes } from './types';

const SaveComponent = (props: {attributes: ShowcaseFormBlockAttributes}) => {
    const {
        customBackgroundColor,
        ***REMOVED***,
        width,
        height,
        alignment
    } = props.attributes;

    const divClass = ***REMOVED***('background-color', ***REMOVED***);

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