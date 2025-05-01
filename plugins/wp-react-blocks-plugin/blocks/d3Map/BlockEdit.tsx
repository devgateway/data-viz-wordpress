import React from 'react';
import { ***REMOVED***, ***REMOVED***, useBlockProps } from '@wordpress/block-editor'
import {
    Panel, PanelBody, PanelRow, SelectControl, ResizableBox, ToggleControl, TextControl, Button
} from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { BlockEditWithAPIMetadata, BlockEditWithAPIMetadataState, togglePanel } from '@dg-data-viz/wp-commons';
import LayerSettings from "./layers/Base";
import { D3MapProps } from './layers/utils/types';
import LayerModel from './layers/Model';
class BlockEdit extends BlockEditWithAPIMetadata<D3MapProps, BlockEditWithAPIMetadataState> {
    constructor(props: D3MapProps) {
        super(props);
        this.onChangeLayer = this.onChangeLayer.bind(this)
        this.addLayer = this.addLayer.bind(this)
        this.removeLayer = this.removeLayer.bind(this)
        this.onMoveLayer = this.onMoveLayer.bind(this)
        
    }

    ***REMOVED***(prevProps: D3MapProps, prevState: BlockEditWithAPIMetadataState, snapshot: any) {
        const { attributes: { app } } = this.props
        super.***REMOVED***(prevProps, prevState, snapshot);
    }

    ***REMOVED***() {
        super.***REMOVED***();

        const {
            className, isSelected, ***REMOVED***, setAttributes, attributes
        } = this.props;

        const { group } = attributes;


        window.***REMOVED***("message", (event) => {
            if (event.data.type == `d3_map_${group}`) {
                const iframeOrigin = event.origin.split(':')[1]
                const parentOrigin = window.location.origin.split(':')[1]
                if (iframeOrigin == parentOrigin) {
                    console.log("Received message from iframe " + event.data.type, event.data.value)
                    setAttributes({ ...attributes, mapPosition: event.data.value })
                }
            }
        }, false);
    }

    addLayer() {
        const { setAttributes, attributes } = this.props;
        const { layers } = attributes;
        const newLayers = [...layers]
        const model = { ...LayerModel }
        model.id = Date.now()
        newLayers.push(model)

        setAttributes({ ...attributes, layers: newLayers })
    }

    removeLayer(layer) {
        const { setAttributes, attributes } = this.props
        const { id, name } = layer
        const { layers } = attributes;
        const newLayers = layers.filter(l => l.id != id)
        setAttributes({ ...attributes, layers: newLayers })
    }

    onChangeLayer(layer) {
        const { setAttributes, attributes } = this.props
        const { layers } = attributes;
        const newLayers = [...layers]
        const index = layers.findIndex(l => l.id === layer.id);
        if (index !== -1) {
            newLayers[index] = layer;
        }
        setAttributes({ ...attributes, layers: newLayers })
    }

    onMoveLayer(direction, layer) {

        const { setAttributes, attributes } = this.props
        const { layers } = attributes;
        const newLayers = [...layers]
        const index = newLayers.findIndex(l => l.id === layer.id);

        const newIndex = index + direction;
        if (newIndex > -1 && newIndex < newLayers.length) {

            const element = newLayers.splice(index, 1);
            newLayers.splice(newIndex, 0, element[0]);
            setAttributes({ ...attributes, layers: newLayers })
        }
    }

    render() {
        const {
            className, isSelected, ***REMOVED***, setAttributes, attributes
        } = this.props;

        const {
            projection,
            panelStatus, mapPosition, height, width, group, ***REMOVED***, layers = [],
            ***REMOVED***,
            zoomEnabled
        } = attributes;



        const divStyles = { height: height + 'px', width: '100%' };
        return ([isSelected && (<***REMOVED***>
            <Panel header={__("Map Configuration")}>
                <PanelBody
                    initialOpen={false}//{false}//{panelStatus['GROUP']}
                    onToggle={e => togglePanel("GROUP", panelStatus, setAttributes)}
                    title={__("Group")}>
                    <PanelRow>
                        <TextControl
                            label={__('Name')}
                            value={group}
                            onChange={(group) => setAttributes({ ...attributes, group })}
                        />
                    </PanelRow>
                </PanelBody>
                <PanelBody initialOpen={false}//{panelStatus["SIZE"]}
                    onToggle={e => togglePanel("SIZE", panelStatus, setAttributes)}
                    title={__("Size")}>
                    <PanelRow>
                        <TextControl
                            size={10}
                            label="Height"
                            value={height}
                            onChange={(height) => setAttributes({ ...attributes, height: height ? parseInt(height) : 0 })}
                        />
                    </PanelRow>

                    <PanelRow>
                        <TextControl
                            size={10}
                            label="Width"
                            value={width}
                            onChange={(width) => setAttributes({ ...attributes, width: width ? parseInt(width) : 0 })}
                        />
                    </PanelRow>
                </PanelBody>
                <PanelBody initialOpen={false}//{panelStatus["PROJECTION"]}
                    onToggle={e => togglePanel("PROJECTION", panelStatus, setAttributes)}
                    title={__("Projection")}>
                    <PanelRow>
                        <SelectControl
                            label={__("Projection")}
                            value={projection as "geoMercator" | "geoEqualEarth" | "***REMOVED***" | "geoAzimuthalEqualArea" | "***REMOVED***"}
                            onChange={(projection) => setAttributes({ ...attributes, projection })}
                            options={[
                                {
                                    label: "geoMercator",
                                    value: "geoMercator"
                                },
                                {
                                    label: "geoEqualEarth",
                                    value: "geoEqualEarth"
                                },
                                {
                                    label: "***REMOVED***",
                                    value: "***REMOVED***"
                                },
                                {
                                    label: "geoAzimuthalEqualArea",
                                    value: "geoAzimuthalEqualArea"
                                },
                                {
                                    label: "***REMOVED***",
                                    value: "***REMOVED***"
                                }]}
                        />


                    </PanelRow>

                    <PanelRow>
                        <ToggleControl label={__('Enable Rotation')} checked={***REMOVED***}
                            onChange={e => setAttributes({ ...attributes, ***REMOVED***: !***REMOVED*** })}></ToggleControl>
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl label={__('Enable Zoom Controls')} checked={zoomEnabled}
                            onChange={e => setAttributes({ ...attributes, zoomEnabled: !zoomEnabled })}></ToggleControl>
                    </PanelRow>
                </PanelBody>
                <PanelBody
                    initialOpen={false}//{panelStatus['COLORS']}
                    onToggle={e => togglePanel("COLORS", panelStatus, setAttributes)}
                    title={__("Colors")}>


                    <***REMOVED***
                        title={__('Background')}
                        colorSettings={[{
                            clearable: true,
                            enableAlpha: true,
                            value: ***REMOVED***(***REMOVED***),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({ ...attributes, ***REMOVED***: ***REMOVED***(color) })
                                } else {
                                    setAttributes({ ...attributes, ***REMOVED***: "#FFFFFF" })
                                }
                            },
                            label: __('Background Color')
                        }]}
                    />


                </PanelBody>
                <PanelBody initialOpen={false}//{panelStatus['LAYERS']}
                    onToggle={e => togglePanel("LAYERS", panelStatus, setAttributes)} title={__("Layers")}>
                    {layers.map((layer) => (<LayerSettings
                        {...this.props}
                        setAttributes={setAttributes}
                        onRemoveLayer={() => this.removeLayer(layer)}
                        onChange={this.onChangeLayer}
                        onMoveLayer={this.onMoveLayer}
                        layer={layer}
                    />))}
                    <PanelRow>
                        <Button variant={"primary"} onClick={e => this.addLayer()}>Add New Layer</Button>
                    </PanelRow>

                </PanelBody>
            </Panel>
        </***REMOVED***>),

        (<div style={{ margin: "auto", width: "100%" }}>
            <ResizableBox
                style={{ margin: "auto" }}
                size={{
                    height, width
                }}
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
                    setAttributes({
                        ...attributes,
                        height: parseInt(String(height)) + delta.height,
                        width: parseInt(String(width)) + delta.width,
                    });
                    ***REMOVED***();
                }}
                onResizeStart={() => {
                    ***REMOVED***();
                }}>


                {this.state.react_ui_url && <iframe ref={this.iframe} scrolling={"no"}
                    style={divStyles}
                    src={this.state.react_ui_url + "/embeddable/newMap?"} />}

            </ResizableBox>
        </div>)]);

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return <div {...blockProps}><BlockEdit {...props} /></div>;
}
export default Edit;