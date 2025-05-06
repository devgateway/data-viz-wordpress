import React from 'react';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { FormToggle, Panel, PanelBody, PanelRow, RangeControl, ResizableBox } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockEditWithFilters, SizeConfig } from '@dg-data-viz/wp-commons'
import { TabbedPostsBlockProps, TabbedPostsBlockState } from './types';

class BlockEdit extends BlockEditWithFilters<TabbedPostsBlockProps, TabbedPostsBlockState> {
    constructor(props: TabbedPostsBlockProps) {
        super(props);
    }

    componentDidUpdate(prevProps: TabbedPostsBlockProps, prevState: TabbedPostsBlockState, snapshot) {
        const newPreviewMode = this.state?.previewMode;
        if (newPreviewMode !== prevState.previewMode) {
            this.props.setAttributes({ previewMode: newPreviewMode });
        }
    }

    render() {
        const {
            className, isSelected,
            toggleSelection,
            setAttributes,
            attributes: {
                panelStatus,
                count,
                type,
                taxonomy,
                categories,
                height,
                theme,
                useScrolls,
                showIcons,
                useLabels,
                previewMode
            },
        } = this.props;



        const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}&data-height=${height}&data-theme=${theme}&data-show-icons=${showIcons}&data-show-labels=${useLabels}&data-use-scrolls=${useScrolls}&data-preview-mode=${previewMode}`
        const divStyles = { height: `${height}px`, width: '100%' }
        return (
            <div>
                <InspectorControls>
                    <Panel>
                        <PanelBody title={__("Visibility", "dg")}>
                            <PanelRow>
                                <p>{__("Light Theme", "dg")}</p>
                                <FormToggle
                                    checked={theme == 'light'}
                                    onChange={() => setAttributes({ theme: theme == 'light' ? 'buttons' : 'light' })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <p>{__("Use Labels", "dg")}</p>
                                <FormToggle
                                    checked={useLabels}
                                    onChange={() => setAttributes({ useLabels: !useLabels })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <p>{__("Show Icons", "dg")}</p>
                                <FormToggle
                                    checked={showIcons}
                                    onChange={() => setAttributes({ showIcons: !showIcons })}
                                />

                            </PanelRow>
                            <PanelRow>
                                <p>{__("Use Scrolls", "dg")}</p>
                                <FormToggle
                                    checked={useScrolls}
                                    onChange={() => setAttributes({ useScrolls: !useScrolls })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label={__("Items", "dg")}
                                    value={count}
                                    onChange={(count) => setAttributes({ count })}
                                    min={2}
                                    max={10} />
                            </PanelRow>
                        </PanelBody>
                        <SizeConfig initialOpen={false} setAttributes={setAttributes}
                            height={height} panelStatus={panelStatus}>

                        </SizeConfig>
                        {this.renderFilters()}
                    </Panel>
                </InspectorControls>

                <ResizableBox
                    size={{ height }}
                    style={{ "margin": "auto", width: "100%" }}
                    minHeight="200"
                    minWidth="100"
                    enable={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: true,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(event, direction, elt, delta) => {
                        const newHeight = parseInt(String(height)) + parseInt(String(delta.height));
                        setAttributes({
                            height: newHeight,
                        });
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
                    }}>
                    <div style={divStyles}>
                        {this.state.react_ui_url && <iframe style={divStyles} scrolling={"no"}
                            src={this.state.react_ui_url + "/embeddable/tabbedposts?" + queryString} />}
                    </div>
                </ResizableBox>
            </div>
        );

    }
}


const Edit = (props: TabbedPostsBlockProps) => {
    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return <div {...blockProps}>
        <BlockEdit {...props} />
    </div>;
}

export default Edit;
