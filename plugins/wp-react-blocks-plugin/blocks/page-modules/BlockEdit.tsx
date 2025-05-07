import React from 'react';
import { ComponentWithSettings } from '@devgateway/dvz-wp-commons';
import { PageModulesBlockProps, PageModulesBlockState } from './types';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, ResizableBox, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
class BlockEdit extends ComponentWithSettings<PageModulesBlockProps, PageModulesBlockState> {
    constructor(props: PageModulesBlockProps) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe()
        }
    }

    componentDidUpdate(prevProps: PageModulesBlockProps, prevState: PageModulesBlockState, snapshot) {
        const newPreviewMode = this.state?.previewMode ?? 'Desktop';
        if (newPreviewMode !== prevState.previewMode) {
            this.props.setAttributes({previewMode: newPreviewMode})
        }
    }

    render() {
        const {attributes: {width, height, navLabel, topTopLabel, previewMode}, toggleSelection, setAttributes} = this.props;
        const urlParams = new URLSearchParams(window.location.search);
        const parent = urlParams.get('post');
        const queryString = `editing=true&parent=${parent}&data-nav-label=${navLabel}&data-to-top-label=${topTopLabel}&data-preview-mode=${previewMode}`;
        const divClass = ""
        const divStyles = {height: `${height}px`, width: '100%'}

        return (
            <div>

                <InspectorControls>
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
                </InspectorControls>
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
                        toggleSelection(true);
                    }}
                    onResizeStart={() => {
                        toggleSelection(false);
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