import React from 'react';
import {InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BlockEdit = (props) => {
  return (
    <div {...useBlockProps()}>
        <InspectorControls>
            <PanelBody title={__('Example Block', 'wp-customizer-react-blocks')} initialOpen={true}>
                <TextControl label={__('Text', 'wp-customizer-react-blocks')} value={props.attributes.text} onChange={(newText) => props.setAttributes({ text: newText })} />
            </PanelBody>
        </InspectorControls>
    </div>
  )
}

export default BlockEdit;