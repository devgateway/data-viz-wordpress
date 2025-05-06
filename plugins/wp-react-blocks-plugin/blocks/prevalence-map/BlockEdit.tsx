import { ***REMOVED***, ***REMOVED***, useBlockProps } from "@wordpress/block-editor";
import { Panel, ResizableBox } from "@wordpress/components";
import React from "react";
import { PrevalenceMapBlockProps } from "./types";
import { __ } from "@wordpress/i18n";

const EditComponent = (props: PrevalenceMapBlockProps) => {

    const {
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***,
        setAttributes,
        attributes: {
            width,
            height,
            alignment
        },
    } = props;

    const blockProps = useBlockProps({ className: 'wp-react-component' });
    const ***REMOVED*** = newAlignment => {
        props.setAttributes({ alignment: newAlignment });
    };
    let divClass;
    let divStyles = { "text-align": alignment };
    if (***REMOVED*** != undefined) {
        if (***REMOVED***.class != undefined) {
            divClass = ***REMOVED***.class;
        } else {
            divStyles['background-color'] = ***REMOVED***.color;
        }
    }

    return (
        <div>
            <***REMOVED***>
                <Panel header="Block Settings">
                    <***REMOVED***
                        title={__('Color settings', "dg")}
                        colorSettings={[
                            {
                                value: ***REMOVED***.color,
                                onChange: (newColor, index) => ***REMOVED***(newColor, index),
                                label: __('Background color', "dg")
                            },
                        ]}
                    />
                    {/*
                    <PanelBody title="Alignment"  initialOpen={true}>
                        <PanelRow>
                            <***REMOVED***
                                label={"Alignment"}
                                value={alignment}
                                onChange={***REMOVED***}
                            />
                        </PanelRow>
                    </PanelBody>
                       */}
                </Panel>
            </***REMOVED***>
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
                        ***REMOVED***(true);
                    }}
                    onResizeStart={() => {
                        ***REMOVED***(false);
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
