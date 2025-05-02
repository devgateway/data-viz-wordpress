import { InspectorControls, PanelColorSettings, useBlockProps } from "@wordpress/block-editor";
import { Panel, ResizableBox } from "@wordpress/components";
import React from "react";
import { PrevalenceMapBlockProps } from "./types";
import { __ } from "@wordpress/i18n";

const EditComponent = (props: PrevalenceMapBlockProps) => {

    const {
        backgroundColor,
        setBackgroundColor,
        toggleSelection,
        setAttributes,
        attributes: {
            width,
            height,
            alignment
        },
    } = props;

    const blockProps = useBlockProps({ className: 'wp-react-component' });
    const onChangeAlignment = newAlignment => {
        props.setAttributes({ alignment: newAlignment });
    };
    let divClass;
    let divStyles = { "text-align": alignment };
    if (backgroundColor != undefined) {
        if (backgroundColor.class != undefined) {
            divClass = backgroundColor.class;
        } else {
            divStyles['background-color'] = backgroundColor.color;
        }
    }

    return (
        <div>
            <InspectorControls>
                <Panel header="Block Settings">
                    <PanelColorSettings
                        title={__('Color settings', "dg")}
                        colorSettings={[
                            {
                                value: backgroundColor.color,
                                onChange: (newColor, index) => setBackgroundColor(newColor, index),
                                label: __('Background color', "dg")
                            },
                        ]}
                    />
                    {/*
                    <PanelBody title="Alignment"  initialOpen={true}>
                        <PanelRow>
                            <AlignmentToolbar
                                label={"Alignment"}
                                value={alignment}
                                onChange={onChangeAlignment}
                            />
                        </PanelRow>
                    </PanelBody>
                       */}
                </Panel>
            </InspectorControls>
            <div {...blockProps} >
                <ResizableBox
                    size={{
                        height,
                        width,
                    }}
                    style={{ "margin": "auto" }}
                    minHeight="50"
                    minWidth="50"
                    enable={{
                        top: false,
                        right: true,
                        bottom: true,
                        left: false,
                        topRight: false,
                        bottomRight: true,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(event, direction, elt, delta) => {
                        const newHeight = parseInt(String(height)) + parseInt(String(delta.height));
                        const newWidth = parseInt(String(width)) + parseInt(String(delta.width));
                        setAttributes({
                            height: newHeight,
                            width: newWidth,
                        });
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
                    }}
                >
                    <div className={divClass} style={{ ...divStyles, width, height }}>
                        {/* @ts-ignore */}
                        {this.state.react_ui_url && <iframe scrolling={"no"} style={{ width, height }}
                            // @ts-ignore
                            src={this.state.react_ui_url + "/embeddable/map"} />}
                    </div>
                </ResizableBox>
            </div>

        </div>
    );
}
