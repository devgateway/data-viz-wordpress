import React from 'react';
import {InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ExampleBlockEditProps } from './types';

const BlockEdit = (props: ExampleBlockEditProps) => {
  return (
    <div {...useBlockProps()}>
        <InspectorControls>
            <PanelBody title={__('Example Block', 'wp-customizer-react-blocks')} initialOpen={true}>
                <TextControl label={__('Text', 'wp-customizer-react-blocks')} value={props.attributes.text} onChange={props.setAttributes.bind(this)} />
            </PanelBody>
        </InspectorControls>
    </div>
  )
}

export default BlockEdit;