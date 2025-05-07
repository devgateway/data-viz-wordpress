import React from 'react';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, RangeControl, ResizableBox } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockEditWithFilters, BlockEditWithFiltersState } from '@devgateway/dvz-wp-commons';
import { PageGalleryBlockProps } from './types';

const EditComponent = (props: PageGalleryBlockProps) => {
    const {attributes: {height,style,columns}, toggleSelection, setAttributes} = props;
    const urlParams = new URLSearchParams(window.location.search);
    const parent = urlParams.get('post');
    const blockProps = useBlockProps({className: 'wp-react-component'});
    const queryString = `editing=true&data-parent=${parent}&data-style=${style}&data-height=${height}&data-columns=${columns}`;
    const divClass = ""
    const divStyles = {height: height + 'px', width: '100%'}
    
    return (
        <div>
            <InspectorControls>
                <Panel>
                    <PanelBody>
                        <PanelRow>
                            <RangeControl
                                label={__('Columns',"dg")}
                                value={columns}
                                onChange={(columns) => setAttributes({columns})}
                                min={1}
                                max={10}
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
                <div {...blockProps} >

                    {
                        props.src && <iframe
                            style={{...divStyles}} className={divClass}
                            scrolling={"no"}
                            src={props.src + queryString}/>
                    }


                </div>
            </ResizableBox>
        </div>
    );
}


export default class EditWithSettings extends BlockEditWithFilters<PageGalleryBlockProps, BlockEditWithFiltersState> {
    render() {
        return <EditComponent
            src={this.state.react_ui_url + "/embeddable/pagegallery?"} {...this.props}></EditComponent>
    }
}