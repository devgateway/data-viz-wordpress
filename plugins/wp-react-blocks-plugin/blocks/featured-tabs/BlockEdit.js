import { InspectorControls, PanelColorSettings, useBlockProps } from '@wordpress/block-editor';
import {FormToggle, Panel, PanelBody, PanelRow, RangeControl, ResizableBox, TextControl} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { BlockEditWithFilters } from '@devgateway/dvz-wp-commons';

class BlockEdit extends BlockEditWithFilters {
    constructor(props) {
        super(props);
    }

    onChangeColor(i, value) {
        const { setAttributes, attributes: { color } } = this.props;
        const parts = (color || '').split(',');
        parts[i] = value || '#FFFF';
        setAttributes({ color: parts.join(',') });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
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
                items,
                type,
                taxonomy,
                categories,
                height,
                color,
                useScrolls,
                readMoreLabel,
                closeLabel,
                previewMode
            },
        } = this.props;

        const divStyles = { height: `${height}px`, width: "100%" };

        return (
            <div>
                <InspectorControls>
                    <Panel header={__("Tabs Configuration")}>
                        <PanelBody title={__("Items & Labels")}>
                            <PanelRow>
                                <RangeControl
                                    label={__("Items", "dg")}
                                    value={items}
                                    onChange={(items) => setAttributes({ items })}
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

                            <PanelRow>
                                <TextControl
                                    label={__('Close Label', 'dg')}
                                    value={closeLabel}
                                    onChange={(closeLabel) => setAttributes({ closeLabel })}
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
                                <p>{__("Use Scrolls","dg")}</p>
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
                            {new Array(items).fill(1).map((v, i) =>
                                <PanelRow key={i}>
                                    <PanelColorSettings
                                        title={__(`Color Settings  ${i + 1}`)}
                                        colorSettings={[
                                            {
                                                value: (color || '').split(',')[i],
                                                onChange: (colorValue) => this.onChangeColor(i, colorValue),
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
                    style={{"margin": "auto", width: "100%"}}
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
                            height: parseInt(height + delta.height, 10),
                        });
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
                    }}
                >
                    <div style={divStyles}>
                        {this.state.react_ui_url && <iframe style={divStyles} scrolling={"no"}
                                                            ref={this.iframe}
                                                            src={this.state.react_ui_url + "/embeddable/featuredtabs"}/>}

                    </div>
                </ResizableBox>
            </div>
        );
    }
}

const Edit = (props) => {
    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return <div {...blockProps}><BlockEdit {...props}/></div>;
};

export default Edit;
