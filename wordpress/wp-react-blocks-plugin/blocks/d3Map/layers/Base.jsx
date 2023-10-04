import {
    Button,
    PanelBody,
    PanelRow,
    RangeControl,
    ***REMOVED***,
    SelectControl,
    TextControl,
    ToggleControl
} from "@wordpress/components";
import {__} from '@wordpress/i18n';
import {getJsonFiles} from "./utils/FileUtils";
import {useEffect} from "react";
import {useState} from "@wordpress/element";
import DataLayer from "./Data";
import LatLongLayer from "./LatLong";
import {BlockEditWithAPIMetadata, ComponentWithSettings} from "../../commons";
import Property from "./utils/Property";

import {***REMOVED***} from "@wordpress/block-editor";

const typeOptions = [
    {label: "Base", value: "base"},
    {label: "Data Shape", value: "data"},
    {label: "Data Points ", value: "dataPoints"}
]

const toOptions = (files) => {
    return [{label: 'None', value: 'none'}, ...files.map(file => {
        return {label: file.title.rendered, value: file.source_url}
    })]
}

const Base = (props) => {
    const {onChange, metadata, layer, layer: {name, shapeColor, labelFilter, type, file, app, labelField}} = props

    const [files, setFiles] = useState([])
    const [features, setFeatures] = useState([])
    useEffect(() => {

        getJsonFiles().then(files => {
            setFiles(toOptions(files))

        })
    }, [])


    useEffect(() => {

        fetch(file).then(response => response.json()).then(data => {
            setFeatures(data.features);
        });
    }, [layer.file])
    const ***REMOVED*** = (atrr, value) => {

        console.log("change attribute " + atrr + " to " + value)
        const newLayer = {...layer}
        newLayer[atrr] = value
        onChange(newLayer)
    }


    return [<PanelRow>
        <TextControl
            type={"String"}
            label={__("Name", "dg")}
            onChange={name => ***REMOVED***("name", name)}
            value={name}
        />
    </PanelRow>, <PanelRow>
        <SelectControl
            label={__("Type", "dg")}
            value={type}
            onChange={type => ***REMOVED***("type", type)}
            options={typeOptions}
        />
    </PanelRow>, <>{type != 'dataPoints' && <PanelRow>
        <SelectControl
            type={"String"}
            label="File"
            onChange={file => ***REMOVED***("file", file)}
            value={file}
            options={files}>

        </SelectControl>
    </PanelRow>
    }</>,
        <>
            {type != 'dataPoints' && <PanelBody title={"Colors"} initialOpen={false}>
                <***REMOVED***
                    title={__(`Fill Color`)}
                    colorSettings={[{
                        value: layer.fillColor, onChange: (fillColor) => {
                            ***REMOVED***("fillColor", fillColor)
                        },

                    }]}
                />
                <***REMOVED***
                    title={__(`Border Color`)}
                    colorSettings={[{
                        value: layer.borderColor, onChange: (borderColor) => {
                            ***REMOVED***("borderColor", borderColor)
                        },

                    }]}
                />

                <***REMOVED***
                    title={__(`Label Color`)}
                    label="Color"
                    colorSettings={[{

                        value: layer.labelColor, onChange: (labelColor) => {
                            ***REMOVED***("labelColor", labelColor)
                        },

                    }]}
                />

            </PanelBody>}
        </>,
        <>
            {type != 'dataPoints' && <PanelBody title={"Labels"} initialOpen={false}>

                <Property
                    title={"Label Field"}
                    property={"labelField"} value={labelField}
                    ***REMOVED***={***REMOVED***}
                    features={features}/>


                <PanelRow>
                    <RangeControl
                        label="Size"
                        value={layer.labelFontSize}
                        onChange={(labelFontSize) => ***REMOVED***("labelFontSize", labelFontSize)}
                        min={1}
                        step={1}
                        max={100}
                    />
                </PanelRow>

                {labelField != 'none' && <PanelBody title={__("Labels")}>
                    <PanelRow>
                        <ToggleControl
                            label={"None/All"}
                            checked={labelFilter.length == 0 }
                            onChange={(checked) => {
                                if (!checked){
                                    ***REMOVED***("labelFilter", features.map(f => f.properties[labelField]))
                                }else{
                                    ***REMOVED***("labelFilter", [])
                                }

                            }}
                        />
                    </PanelRow>
                    {features && features.map(feature => <>
                        <PanelRow>
                            <ToggleControl
                                label={feature.properties[labelField]}
                                checked={labelFilter.indexOf(feature.properties[labelField]) == -1}
                                onChange={(selected) => {
                                    ***REMOVED***("labelFilter", !selected ? [...layer.labelFilter, feature.properties[labelField]] : layer.labelFilter.filter(f => f !== feature.properties[labelField]))
                                }}
                            />
                        </PanelRow>
                        {(labelFilter.indexOf(feature.properties[labelField]) == -1) && <PanelBody>
                            <PanelRow>
                                <RangeControl
                                    label="Offset X"
                                    min={-500}
                                    max={500}
                                    value={layer.labelSettings[feature.properties[labelField] + "_offsetX"] || 0}
                                    onChange={(offsetX) => ***REMOVED***("labelSettings", {
                                        ...layer.labelSettings, [feature.properties[labelField] + "_offsetX"]: offsetX
                                    })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label="Offset Y"
                                    min={-500}
                                    max={500}
                                    value={layer.labelSettings[feature.properties[labelField] + "_offsetY"] || 0}
                                    onChange={(offset) => ***REMOVED***("labelSettings", {
                                        ...layer.labelSettings, [feature.properties[labelField] + "_offsetY"]: offset
                                    })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <***REMOVED*** label={"Rotation"}
                                                    value={layer.labelSettings[feature.properties[labelField] + "_rotation"] || 0}
                                                    onChange={(rotation) => ***REMOVED***("labelSettings", {
                                                        ...layer.labelSettings,
                                                        [feature.properties[labelField] + "_rotation"]: rotation
                                                    })}>

                                    ></***REMOVED***>
                            </PanelRow>
                        </PanelBody>}

                    </>)}

                </PanelBody>}
            </PanelBody>

            }  </>,

        <React.Fragment>
            {type == 'data' && <>
                <DataLayer
                    apps={metadata.apps}
                    ***REMOVED***={***REMOVED***}
                    allDimensions={metadata.dimensions}
                    allFilters={metadata.filters}
                    allMeasures={metadata.measures}
                    allCategories={metadata.categories}
                    allApps={metadata.apps}
                    features={features}
                    layer={layer}>
                </DataLayer>

            </>}
            {type == 'dataPoints' && <>
                <LatLongLayer
                    apps={metadata.apps}
                    ***REMOVED***={***REMOVED***}
                    allDimensions={metadata.dimensions}
                    allFilters={metadata.filters}
                    allMeasures={metadata.measures}
                    allCategories={metadata.categories}
                    allApps={metadata.apps}
                    features={features}
                    layer={layer}>
                </LatLongLayer>

            </>}
        </React.Fragment>,


    ]

}

class ***REMOVED*** extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
    }

    ***REMOVED***() {
        const {layer: {name, type, file, app}} = this.props
        fetch(`/api/registry/eureka/apps`, {
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                const apps = data.applications ? [...data.applications.application
                    .filter(a => a.instance[0].metadata.type === 'data')
                    .map(a => ({
                        label: a.name, value: a.instance[0].vipAddress, settings: a.instance[0]
                    })), {label: 'CSV', value: 'csv'}] : [{label: 'CSV', value: 'csv'}]

                this.setState({...this.state, apps})
                this._loadMetadata(app)
            })
            .catch(function (response) {
                alert("error" + response)
            })
    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        super.***REMOVED***(prevProps, prevState, snapshot)
        const {layer: {app}} = this.props
        const {layer: {app: prevAPP}} = prevProps
        if ((app != prevAPP) || (prevAPP == null && app != null)) {

            this._loadMetadata(app)
        }
    }

    render() {
        const {onRemoveLayer, layer, layer: {name, type, file, app}} = this.props

        return <PanelBody title={__(`${name}`)}>
            <Base {...this.props} metadata={this.state}></Base>
            <PanelRow>
                <Button variant={"primary"} type onClick={onRemoveLayer}>Delete {name}</Button>
            </PanelRow>
            <PanelRow>
            </PanelRow>
        </PanelBody>
    }

}

export default ***REMOVED***