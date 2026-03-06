import { InspectorControls, PanelColorSettings, useBlockProps } from '@wordpress/block-editor'
import {
    Panel, PanelBody, PanelRow, SelectControl, ResizableBox, ToggleControl, TextControl, Button
} from '@wordpress/components'

import { __ } from '@wordpress/i18n'
import { BlockEditWithAPIMetadata, ComponentWithSettings, SizeConfig } from '@devgateway/dvz-wp-commons'
import LayerSettings from "./layers/Base";
import LayerModel from "./layers/Model"
import { togglePanel } from '@devgateway/dvz-wp-commons';;

class BlockEdit extends ComponentWithSettings {
    constructor(props) {
        super(props);
        this.onChangeLayer = this.onChangeLayer.bind(this)
        this.addLayer = this.addLayer.bind(this)
        this.removeLayer = this.removeLayer.bind(this)
        this.onMoveLayer = this.onMoveLayer.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { attributes: { app } } = this.props
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    componentDidMount() {
        super.componentDidMount();
        const { setAttributes } = this.props;
        setAttributes({ identifier: Math.ceil(Math.random() * 100000000) })//set a random id to identify each of the maps on the page

        window.addEventListener("message", (event) => {
            if (event.data.type == `d3_map_${this.props.attributes.identifier}`) {
                const iframeOrigin = event.origin.split(':')[1]
                const parentOrigin = window.location.origin.split(':')[1]
                if (iframeOrigin == parentOrigin) {
                    console.log("Received message from iframe " + event.data.type, event.data.value)
                    setAttributes({ mapPosition: event.data.value })
                }
            }
        }, false);
    }

    addLayer() {
        const { setAttributes, attributes: { layers } } = this.props
        const newLayers = [...layers]
        const model = { ...LayerModel }
        model.id = Date.now()
        newLayers.push(model)

        setAttributes({ layers: newLayers })
    }

    removeLayer(layer) {
        const { setAttributes, attributes: { layers } } = this.props
        const { id, name } = layer
        const newLayers = layers.filter(l => l.id != id)
        setAttributes({ layers: newLayers })
    }

    onChangeLayer(layer) {
        const { setAttributes, attributes: { layers } } = this.props
        const newLayers = [...layers]
        const index = layers.findIndex(l => l.id === layer.id);
        if (index !== -1) {
            newLayers[index] = layer;
        }
        setAttributes({ layers: newLayers })
    }

    onMoveLayer(direction, layer) {

        const { setAttributes, attributes: { layers } } = this.props
        const newLayers = [...layers]
        const index = newLayers.findIndex(l => l.id === layer.id);

        const newIndex = index + direction;
        if (newIndex > -1 && newIndex < newLayers.length) {

            const element = newLayers.splice(index, 1);
            newLayers.splice(newIndex, 0, element[0]);
            setAttributes({ layers: newLayers })
        }
    }

    render() {
        const {
            className, isSelected, toggleSelection, setAttributes, attributes: {
                projection,
                panelStatus, mapPosition, height, width, group, backGroundColor, layers = [],
                rotationEnabled,
                zoomEnabled,
                waitForFilters
            }
        } = this.props;


        const divStyles = { height: height + 'px', width: '100%' };
        return ([isSelected && (<InspectorControls>
            <Panel header={__("Map Configuration")}>
                <PanelBody
                    initialOpen={false}//{false}//{panelStatus['GROUP']}
                    onToggle={e => togglePanel("GROUP", panelStatus, setAttributes)}
                    title={__("Group")}>
                    <PanelRow>
                        <TextControl
                            label={__('Name')}
                            help={__("Name of the map group")}
                            value={group}
                            onChange={(group) => setAttributes({ group })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__('Wait For Filters')}
                            help={__("If enabled, map will wait for filter selection before loading")}
                            checked={waitForFilters}
                            onChange={() => setAttributes({ waitForFilters: !waitForFilters })}
                        />
                    </PanelRow>
                </PanelBody>
                <PanelBody initialOpen={false}//{panelStatus["SIZE"]}
                    onToggle={e => togglePanel("SIZE", panelStatus, setAttributes)}
                    title={__("Size and Position")}>
                    <PanelRow>
                        <TextControl
                            size={10}
                            label="Height"
                            help={__("Map height in pixels")}
                            value={height}
                            onChange={(height) => setAttributes({ height: height ? parseInt(height) : 0 })}
                        />
                    </PanelRow>


                    <PanelRow>
                        <TextControl
                            size={10}
                            label="Position"
                            help={__("Map center coordinates and zoom level")}
                            value={JSON.stringify(mapPosition)}
                            onChange={(newPos) => {
                                setAttributes({ mapPosition: JSON.parse(newPos) })
                            }
                            }
                        />
                    </PanelRow>
                </PanelBody>
                <PanelBody initialOpen={false}//{panelStatus["PROJECTION"]}
                    onToggle={e => togglePanel("PROJECTION", panelStatus, setAttributes)}
                    title={__("Projection")}>
                    <PanelRow>
                        <SelectControl
                            label={__("Projection")}
                            help={__("Map projection type")}
                            value={projection}
                            onChange={(projection) => setAttributes({ projection })}
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
                                    label: "geoNaturalEarth1",
                                    value: "geoNaturalEarth1"
                                },
                                {
                                    label: "geoAzimuthalEqualArea",
                                    value: "geoAzimuthalEqualArea"
                                },
                                {
                                    label: "geoOrthographic",
                                    value: "geoOrthographic"
                                }]}
                        />


                    </PanelRow>

                    <PanelRow>
                        <ToggleControl label={__('Enable Rotation')} help={__("Allow users to rotate the map")} checked={rotationEnabled}
                            onChange={e => setAttributes({ rotationEnabled: !rotationEnabled })}></ToggleControl>
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl label={__('Enable Zoom Controls')} help={__("Show zoom controls on the map")} checked={zoomEnabled}
                            onChange={e => setAttributes({ zoomEnabled: !zoomEnabled })}></ToggleControl>
                    </PanelRow>
                </PanelBody>
                <PanelBody
                    initialOpen={false}//{panelStatus['COLORS']}
                    onToggle={e => togglePanel("COLORS", panelStatus, setAttributes)}
                    title={__("Colors")}>


                    <PanelColorSettings
                        title={__('Background')}
                        colorSettings={[{
                            clearable: true,
                            enableAlpha: true,
                            value: decodeURIComponent(backGroundColor),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({ backGroundColor: encodeURIComponent(color) })
                                } else {
                                    setAttributes({ backGroundColor: "#FFFFFF" })
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
                        onRemoveLayer={(e) => this.removeLayer(layer)}
                        onChange={this.onChangeLayer}
                        onMoveLayer={this.onMoveLayer}
                        layer={layer}

                    />))}
                    <PanelRow>
                        <Button variant={"primary"} onClick={e => this.addLayer()}>Add New Layer</Button>
                    </PanelRow>

                </PanelBody>
            </Panel>
        </InspectorControls>),

        (<div style={{ margin: "auto", width: "100%" }}>
            <ResizableBox
                style={{ margin: "auto" }}
                size={{
                    height, width: '100%'
                }}
                minHeight="50"
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
                        height: parseInt(height + delta.height, 10),
                    });
                    toggleSelection(true);
                }}
                onResizeStart={() => {
                    toggleSelection(false);
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