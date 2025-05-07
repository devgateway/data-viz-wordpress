import React from 'react';
import { ComponentWithSettings } from '@devgateway/dvz-wp-commons';
import { PageModulesBlockProps, PageModulesBlockState } from './types';
import { ***REMOVED***, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, ResizableBox, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
class BlockEdit extends ComponentWithSettings<PageModulesBlockProps, PageModulesBlockState> {
    constructor(props: PageModulesBlockProps) {
        super(props);
    }

    ***REMOVED***() {
        super.***REMOVED***();
    }

    ***REMOVED***() {
        if (this.unsubscribe) {
            this.unsubscribe()
        }
    }

    ***REMOVED***(prevProps: PageModulesBlockProps, prevState: PageModulesBlockState, snapshot) {
        const ***REMOVED*** = this.state?.previewMode ?? 'Desktop';
        if (***REMOVED*** !== prevState.previewMode) {
            this.props.setAttributes({previewMode: ***REMOVED***})
        }
    }

    render() {
        const {attributes: {width, height, navLabel, topTopLabel, previewMode}, ***REMOVED***, setAttributes} = this.props;
        const urlParams = new ***REMOVED***(window.location.search);
        const parent = urlParams.get('post');
        const queryString = `editing=true&parent=${parent}&data-nav-label=${navLabel}&data-to-top-label=${topTopLabel}&data-preview-mode=${previewMode}`;
        const divClass = ""
        const divStyles = {height: `${height}px`, width: '100%'}

        return (
            <div>

                <***REMOVED***>
                    <Panel header={__("Configuration","dg")}>
                        <PanelBody title={__("Labels","dg")}>
                            <PanelRow>
                                <TextControl
                                    label={__('Navigator Label',"dg")}
                                    value={navLabel}
                                    onChange={(navLabel) => setAttributes({navLabel})}
                                />

                            </PanelRow>

                            <PanelRow>
                                <TextControl
                                    label={__('To Top Label',"dg")}
                                    value={topTopLabel}
                                    onChange={(topTopLabel) => setAttributes({topTopLabel})}
                                />

                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </***REMOVED***>
                <ResizableBox
                    size={{height}}
                    style={{"margin": "auto", width: "100%"}}
                    minHeight="200"
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
                            height: parseInt(String(height)) + parseInt(String(delta.height)),

                        });
                        ***REMOVED***(true);
                    }}
                    onResizeStart={() => {
                        ***REMOVED***(false);
                    }}
                >

                    <div>
                        {this.state.react_ui_url&&<iframe
                            style={{...divStyles}} className={divClass}
                            scrolling={"no"}
                            src={this.state.react_ui_url + "/embeddable/pagemodules?" + queryString}/>}
                    </div>


                </ResizableBox>
            </div>
        );


    }
}

const Edit = (props: PageModulesBlockProps) => {
    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return <div {...blockProps}><BlockEdit {...props} /></div>;
}

export default Edit;