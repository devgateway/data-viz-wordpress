import React from 'react';
import {***REMOVED***, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BlockEdit = (props) => {
  return (
    <div {...useBlockProps()}>
        <***REMOVED***>
            <PanelBody title={__('Example Block', 'wp-customizer-react-blocks')} initialOpen={true}>
                <TextControl label={__('Text', 'wp-customizer-react-blocks')} value={props.attributes.text} onChange={props.setAttributes.bind(this)} />
            </PanelBody>
        </***REMOVED***>
    </div>
  )
}

export default BlockEdit;