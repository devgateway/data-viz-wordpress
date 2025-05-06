import React from 'react';
import { InspectorControls, PanelColorSettings, useBlockProps } from '@wordpress/block-editor';
import { FormToggle, Panel, PanelBody, PanelRow, RangeControl, ResizableBox, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockEditWithFilters, BlockEditWithFiltersState } from '@dg-data-viz/wp-commons';
import { FeaturedTabsProps } from './types';

class BlockEdit extends BlockEditWithFilters<FeaturedTabsProps, BlockEditWithFiltersState> {
    constructor(props: FeaturedTabsProps) {
        super(props);
    }

    onChangeColor(i: number, value: string) {
        const {
            setAttributes,
            attributes: {
                colors
            },
        } = this.props;

        const newColors = { ...colors };
        newColors["color_" + i] = value;

        setAttributes({ "colors": newColors });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    componentDidUpdate(prevProps: FeaturedTabsProps, prevState: BlockEditWithFiltersState , snapshot: any) {
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
                count,
                type,
                taxonomy,
                categories,
                height,
                colors,
                useScrolls,
                readMoreLabel,
                previewMode
            },
        } = this.props;

        const colorsParams = Object.keys(colors).map(k => colors[k]).join(",");
        const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}&data-height=${height}&data-color=${encodeURIComponent(colorsParams)}&data-read-more-label=${readMoreLabel}&data-use-scrolls=${useScrolls}&data-preview-mode=${previewMode}`;
        const divStyles = { height: `${height}px`, width: "100%" };

        return (
            <div>
                <InspectorControls>
                    <Panel header={__("Tabs Configuration")}>
                        <PanelBody title={__("Items & Labels")}>
                            <PanelRow>
                                <RangeControl
                                    label={__("Items", "dg")}
                                    value={count}
                                    onChange={(count) => setAttributes({ count })}
                                    min={2}
                                    max={10}
                                />
                            </PanelRow>
                            <PanelRow>
                                <TextControl
                                    label={__('Read More Label', 'dg')}
                                    value={readMoreLabel}
                                    onChange={(readMoreLabel) => setAttributes({ readMoreLabel })}
                                />
                            </PanelRow>
                        </PanelBody>

                        <PanelBody title={__("Size")}>
                            <PanelRow>
                                <RangeControl
                                    label={__("Height", "dg")}
                                    value={height}
                                    onChange={(newHeight) => setAttributes({ height: newHeight })}
                                    min={1} // set a minimum height value
                                    max={2500} // set a maximum height value
                                />
                            </PanelRow>
                        </PanelBody>

                        <PanelBody title={__("Scroll")}>
                            <PanelRow>
                                <p>{__("Use Scrolls", "dg")}</p>
                                <FormToggle
                                    checked={useScrolls}
                                    onChange={() => {
                                        const newUseScrolls = !useScrolls; // Calculate the new value
                                        setAttributes({ useScrolls: newUseScrolls }); // Set the attribute
                                    }}
                                />
                            </PanelRow>
                        </PanelBody>

                        {this.renderFilters()}

                        <PanelBody title={__("Colors")}>
                            {new Array(count).fill(1).map((v, i) =>
                                <PanelRow key={i}>
                                    <PanelColorSettings
                                        title={__(`Color Settings  ${i + 1}`)}
                                        colorSettings={[
                                            {
                                                value: colors[`color_${i}`],
                                                onChange: (colorValue) => {
                                                    if (colorValue) {
                                                        this.onChangeColor(i, colorValue);
                                                    }
                                                },
                                                label: __('Background Color'),
                                            }
                                        ]}
                                    />
                                </PanelRow>
                            )}
                        </PanelBody>

                    </Panel>
                </InspectorControls>

                <ResizableBox
                    size={{ height }}
                    style={{ "margin": "auto", width: "100%" }}
                    minHeight="150"
                    minWidth="250"
                    enable={{
                        top: false,
                        right: true,
                        bottom: true,
                        left: false,
                        topRight: true,
                        bottomRight: true,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(event, direction, elt, delta) => {
                        setAttributes({
                            height: parseInt(String(height)) + parseInt(String(delta.height), 10),
                        });
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
                    }}
                >
                    <div style={divStyles}>
                        {this.state.react_ui_url && <iframe style={divStyles} scrolling={"no"} title="featured-tabs"
                            src={this.state.react_ui_url + "/embeddable/featuredtabs?" + queryString} />}

                    </div>
                </ResizableBox>
            </div>
        );
    }
}

const Edit = (props) => {
    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return <div {...blockProps}><BlockEdit {...props} /></div>;
};

export default Edit;

