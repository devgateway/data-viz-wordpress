import React from 'react';
import { ***REMOVED*** } from './type';
import { InnerBlocks } from '@wordpress/block-editor'; // or wp.editor

const SaveComponent = (props: { attributes: ***REMOVED*** }) => {
    const {
        attributes: {
            type,
            height,
            buttonLabel,
            pdfLabel,
            url
        },
    } = props;

    const divStyles = {}

    return (
        <div style={divStyles}>
            <div
                data-height={height}
                className={"viz-component"}
                data-component={"downloadpdf"}
                data-button-label={buttonLabel}
                data-pdf-label={pdfLabel}
                data-url={url}
            >

                <InnerBlocks.Content></InnerBlocks.Content>
            </div>
        </div>


    );
}


export default SaveComponent