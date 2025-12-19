import React from "react";
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {  PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockEditWithFilters } from '@devgateway/dvz-wp-commons';

class BlockEdit extends BlockEditWithFilters {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            toggleSelection,
            setAttributes,
            attributes: {
                group,
                resetLabel,
            }
        } = this.props;

        return ([
            <InspectorControls>
                <PanelBody initialOpen title={__("Group")}>
                    <PanelRow>
                        <TextControl
                            label={__('Group')}
                            value={group}
                            onChange={(group) => setAttributes({ group })}
                        />
                    </PanelRow>
                </PanelBody>

                <PanelBody title={__('Reset button configuration')}>

                    <PanelRow>
                        <TextControl
                            label={__('Reset label')}
                            value={resetLabel}
                            onChange={(value) => setAttributes({ resetLabel: value })}
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,
            (<div>

                {this.state.react_ui_url && <iframe ref={this.iframe} scrolling={"no"}
                    src={this.state.react_ui_url + "/embeddable/postsFiltersReset"} />}
            </div>

            )
        ]);
    }
}

const Edit = (props) => {

    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return (<div {...blockProps}>
        <p className={"iframe container"}>
            <BlockEdit {...props} />
        </p>

    </div>);


};
export default Edit;
