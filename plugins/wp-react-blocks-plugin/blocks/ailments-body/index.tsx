import React from 'react';
import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    getColorClassName,
    InspectorControls,
    PanelColorSettings,
    useBlockProps,
    withColors
} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, ResizableBox, TextControl} from '@wordpress/components';
import {Generic} from '../icons/index.js'
import {BlockEditWithFilters} from "@dg-data-viz/wordpress-commons";
import { BLOCKS_CATEGORY, BLOCKS_NS } from '../constants';

interface AilmentsBodyProps {
    backgroundColor: {
        color: string;
        class: string;
    };
    setBackgroundColor: (color: string) => void;
    toggleSelection: (selected: boolean) => void;
    setAttributes: (attributes: any) => void;
    attributes: {
        height: string;
        alignment: string;
    };
    src: string;
}


const EditComponent = (props: AilmentsBodyProps) => {

    const {
        backgroundColor,
        setBackgroundColor,
        toggleSelection,
        setAttributes,
        attributes: {
            height,
            alignment
        },
    } = props;

    const blockProps = useBlockProps({className: 'wp-react-component'});
    const onChangeAlignment = newAlignment => {
        props.setAttributes({alignment: newAlignment});
    };
    let divClass: string | undefined;
    let divStyles = {"text-align": alignment, width: "100%", height: height + "px"};
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
                    <PanelBody title={__("Size","dg")}>
                        <PanelRow>
                            <TextControl
                                size={10}
                                label="Height"
                                value={height}
                                onChange={(height) => setAttributes({height: height ? parseInt(height) : 0})}
                            />
                        </PanelRow>
                    </PanelBody>
                    <PanelColorSettings
                        title={__('Color settings','dg')}
                        colorSettings={[
                            {
                                value: backgroundColor?.color,
                                onChange: (newColor) => setBackgroundColor(newColor || ''),
                                label: __('Background color','dg')
                            },
                        ]}
                    />

                </Panel>
            </InspectorControls>
            <div {...blockProps} >
                <ResizableBox
                    size={{
                        height
                    }}
                    style={{"margin": "auto", width: "100%"}}
                    minHeight="50"
                    minWidth="50"
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
                        const newHeight = parseInt(height + delta.height, 10);
                        setAttributes({
                            height: newHeight
                        });
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
                    }}
                >
                    <div className={divClass} style={divStyles}>

                        <iframe scrolling={"no"} style={divStyles}
                                src={props.src}/>
                    </div>
                </ResizableBox>
            </div>

        </div>
    );
}
const SaveComponent = (props) => {
    const {setAttributes} = props;
    const {
        width,
        height,
        customBackgroundColor,
        backgroundColor,
    } = props.attributes;

    const divClass = getColorClassName('background-color', backgroundColor);
    const divStyles = {width, height, "background-color": customBackgroundColor};

    return (<div className={divClass} style={divStyles}>
            <div style={{width, height}} className={"viz-component"} data-component={"body"}></div>
        </div>


    );
}

class EditWithSettings extends BlockEditWithFilters<AilmentsBodyProps> {
    render() {
        return <EditComponent {...this.props} src={this.state.react_ui_url + "/embeddable/body"}></EditComponent>
    }
}

// @ts-ignore Types not available
registerBlockType(BLOCKS_NS + '/ailments', {
    title: __('Ailments Body','dg'),
    icon: Generic,
    category: BLOCKS_CATEGORY,
    attributes: {
        width: {
            type: 'Numeric',
            default: 1200,
        },
        height: {
            type: 'Numeric',
            default: 400,
        },
        backgroundColor: {
            type: 'string'
        },

    },
    edit: withColors('backgroundColor', {textColor: 'color'})(EditWithSettings),
    save: SaveComponent,
});
