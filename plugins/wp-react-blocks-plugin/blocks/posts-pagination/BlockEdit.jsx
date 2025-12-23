import React from "react";
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockEditWithFilters } from '@devgateway/dvz-wp-commons';

class BlockEdit extends BlockEditWithFilters {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            setAttributes,
            attributes: {
                group,
                numberOfItemsPerPage
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
                    <PanelRow>
                        <RangeControl
                            label={__('Number of items')}
                            value={numberOfItemsPerPage}
                            min={1}
                            onChange={(numberOfItemsPerPage) => setAttributes({ numberOfItemsPerPage: parseInt(numberOfItemsPerPage, 10) })}
                        />
                    </PanelRow>
                </PanelBody>

            </InspectorControls>,
            (
                <div>
                    {this.state.react_ui_url && <iframe ref={this.iframe} scrolling={"no"}
                        src={this.state.react_ui_url + "/embeddable/postsPagination"} />}
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
