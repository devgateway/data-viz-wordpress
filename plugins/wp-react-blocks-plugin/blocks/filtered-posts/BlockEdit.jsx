import React from "react";
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl, ResizableBox, RangeControl, ToggleControl } from '@wordpress/components';
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
                numberOfColumns,
                type,
                taxonomy,
                categories,
                height,
                postWidth,
                postHeight,
                numberOfItemsPerPage,
                enableSorting,
                sortingTaxonomy,
                sortFirstBy,
                wordpressSource,
                wordpressSourceType,
            }
        } = this.props;

        const divStyles = {height: `${height}px`, width: "100%"}

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

                {this.renderWordpressSource()}

                <PanelBody title={__('Filtered Posts Configuration')}>
                    <PanelRow>
                        <RangeControl
                            label={__('Number of columns')}
                            value={numberOfColumns}
                            min={1}
                            onChange={(value) => setAttributes({ numberOfColumns: parseInt(value, 10) })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <RangeControl
                            label={__('Post width')}
                            value={postWidth}
                            min={100}
                            max={2500}
                            onChange={(value) => {
                                setAttributes({ postWidth: parseInt(value, 10) })
                            }}
                        />
                    </PanelRow>
                    <PanelRow>
                        <RangeControl
                            label={__('Post height')}
                            value={postHeight}
                            min={100}
                            max={2500}
                            onChange={(value) => setAttributes({ postHeight: parseInt(value, 10) })}
                        />
                    </PanelRow>
                </PanelBody>

                {this.renderFilters(__("Filters"))}

                <PanelBody title={__('Sorting')}>
                    <PanelRow>
                        <ToggleControl
                            label={__('Enable Sorting')}
                            checked={enableSorting}
                            onChange={(value) => setAttributes({ enableSorting: value })}
                        />
                    </PanelRow>
                </PanelBody>

                {enableSorting && this.renderSorting()}
                <PanelBody title={__('Pagination')}>
                    <PanelRow>
                        <RangeControl
                            label={__('Number of items per page')}
                            value={numberOfItemsPerPage}
                            min={1}
                            onChange={(value) => setAttributes({ numberOfItemsPerPage: parseInt(value, 10) })}
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,
            (<ResizableBox
                size={{ height }}
                style={{ "margin": "auto", height: height + 'px' }}
                minHeight="300"
                minWidth="500"
                enable={{
                    top: false,
                    right: false,
                    bottom: true,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                onResizeStop={(event, direction, elt, delta) => {
                    setAttributes({
                        height: parseInt(height + delta.height, 10),

                    });
                    toggleSelection(true);
                }}
                onResizeStart={() => {
                    toggleSelection(false);
                }}>

                <div style={divStyles}>
                    {this.state.react_ui_url && <iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                        src={this.state.react_ui_url + "/embeddable/filteredPosts"} />}
                </div>

            </ResizableBox>

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
