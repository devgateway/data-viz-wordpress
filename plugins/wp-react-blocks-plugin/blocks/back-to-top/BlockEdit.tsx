import React from 'react';
import { ***REMOVED***, useBlockProps } from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
    TextControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ComponentWithSettings } from "@dg-data-viz/wp-commons";
import {***REMOVED***} from '@wordpress/block-editor';

interface ***REMOVED*** {
    setAttributes: (attributes: any) => void;
    attributes: {
        buttonLabel: string;
        height: number;
        width: number;
        ***REMOVED***: string;
        fontColor: string;
    };
}

class BlockEdit extends ComponentWithSettings<***REMOVED***, any> {
    constructor(props) { 
        super(props);       
    }

    render() {
        const {
            setAttributes,
            attributes: {
                buttonLabel,
                height,
                width,
                ***REMOVED***,
                fontColor
            },
        } = this.props;
        
        const queryString = `editing=true&data-button-label=${buttonLabel}&data-height=${height}&data-width=${width}&data-background-color=${***REMOVED***}&data-font-color=${fontColor}`
        const divStyles = { height: height + 'px', width: width + 'px' }       
        return (
            <div>
                <***REMOVED***>
                    <Panel header={__("Back To Top Configuration","dg")}>
                        <PanelBody>
                            <PanelRow>
                                <TextControl
                                    value={buttonLabel}
                                    onChange={(buttonLabel) => setAttributes({ buttonLabel })}
                                />
                            </PanelRow>
                            {/*<PanelRow>
                                <TextControl
                                    size={10}
                                    label="Height"
                                    value={height}
                                    onChange={(height) => setAttributes({ height: height ? parseInt(height) : 0 })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <TextControl
                                    size={10}
                                    label="Width"
                                    value={width}
                                    onChange={(width) => setAttributes({ width: width ? parseInt(width) : 0 })}
                                />
                            </PanelRow>*/}
                            <PanelRow>
                                <***REMOVED***
                                    title={__('Color settings','dg')}
                                    colorSettings={[
                                        {
                                            value: ***REMOVED***(***REMOVED***),
                                            onChange: (color) => {
                                                if (color) {
                                                    setAttributes({ ***REMOVED***: ***REMOVED***(color) })
                                                } else {
                                                    setAttributes({ ***REMOVED***: null })
                                                }
                                            },
                                            label: __('Background Color','dg')
                                        }
                                    ]}
                                />
                            </PanelRow>
                            <PanelRow>
                                <***REMOVED***
                                    title={__('Color settings','dg')}
                                    colorSettings={[
                                        {
                                            value: ***REMOVED***(fontColor),
                                            onChange: (color) => {
                                                if (color) {
                                                    setAttributes({ fontColor: ***REMOVED***(color) })
                                                } else {
                                                    setAttributes({ fontColor: null })
                                                }
                                            },
                                            label: __('Font Color','dg')
                                        }
                                    ]}
                                />
                            </PanelRow>
                        </PanelBody>
                        
                   </Panel>
                </***REMOVED***>
                <div style={divStyles}>
                        {this.state.react_ui_url && <iframe style={divStyles} scrolling={"no"}
                            src={this.state.react_ui_url + "/embeddable/backtotop?" + queryString} />}
                </div>               
            </div>
        );

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return <div {...blockProps}><BlockEdit {...props} /></div>;

}
export default Edit;

