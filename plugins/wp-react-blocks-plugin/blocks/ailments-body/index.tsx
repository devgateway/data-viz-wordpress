import React from 'react';
import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import {
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    useBlockProps,
    withColors
} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, ResizableBox, TextControl} from '@wordpress/components';
import {Generic} from '../icons/index.js'
import {***REMOVED***} from "@devgateway/dvz-wp-commons";
import { BLOCKS_CATEGORY, BLOCKS_NS } from '../constants';

interface ***REMOVED*** {
    ***REMOVED***: {
        color: string;
        class: string;
    };
    ***REMOVED***: (color: string) => void;
    ***REMOVED***: (selected: boolean) => void;
    setAttributes: (attributes: any) => void;
    attributes: {
        height: string;
        alignment: string;
    };
    src: string;
}


const EditComponent = (props: ***REMOVED***) => {

    const {
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***,
        setAttributes,
        attributes: {
            height,
            alignment
        },
    } = props;

    const blockProps = useBlockProps({className: 'wp-react-component'});
    const ***REMOVED*** = newAlignment => {
        props.setAttributes({alignment: newAlignment});
    };
    let divClass: string | undefined;
    let divStyles = {"text-align": alignment, width: "100%", height: height + "px"};
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
                    <***REMOVED***
                        title={__('Color settings','dg')}
                        colorSettings={[
                            {
                                value: ***REMOVED***?.color,
                                onChange: (newColor) => ***REMOVED***(newColor || ''),
                                label: __('Background color','dg')
                            },
                        ]}
                    />

                </Panel>
            </***REMOVED***>
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
                        const newHeight = parseInt(String(height), 10) + parseInt(String(delta.height), 10);
                        setAttributes({
                            height: newHeight
                        });
                        ***REMOVED***(true);
                    }}
                    onResizeStart={() => {
                        ***REMOVED***(false);
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
        ***REMOVED***,
    } = props.attributes;

    const divClass = ***REMOVED***('background-color', ***REMOVED***);
    const divStyles = {width, height, "background-color": customBackgroundColor};

    return (<div className={divClass} style={divStyles}>
            <div style={{width, height}} className={"viz-component"} data-component={"body"}></div>
        </div>


    );
}

class ***REMOVED*** extends ***REMOVED***<***REMOVED***> {
    render() {
        return <EditComponent {...this.props} src={this.state.react_ui_url + "/embeddable/body"}></EditComponent>
    }
}

// @ts-ignore Types not available
***REMOVED***(BLOCKS_NS + '/ailments', {
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
        ***REMOVED***: {
            type: 'string'
        },

    },
    edit: withColors('***REMOVED***', {textColor: 'color'})(***REMOVED***),
    save: SaveComponent,
});
