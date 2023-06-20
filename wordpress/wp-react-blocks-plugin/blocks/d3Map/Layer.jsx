import {
    Button,
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    TextControl,
    ToggleControl
} from "@wordpress/components";
import {__} from '@wordpress/i18n';
import {getJsonFiles} from "./FileUtils";
import {useEffect} from "react";
import {useState} from "@wordpress/element";
import ***REMOVED*** from "./***REMOVED***";
import {BlockEditWithAPIMetadata, ComponentWithSettings} from "../commons";
import Property from "./Property";
import {FieldSet} from "./LayerObject"
import {***REMOVED***} from "@wordpress/block-editor";

const typeOptions = [{label: "Data", value: "data"}, {label: "Base", value: "base"}]

const toOptions = (files) => {
    return [{label: 'None', value: 'none'}, ...files.map(file => {
        return {label: file.title.rendered, value: file.source_url}
    })]
}

const Layer = (props) => {
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
            console.log(data.features)
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
    </PanelRow>, ,

        <PanelRow>
            <SelectControl
                type={"String"}
                label="File"
                onChange={file => ***REMOVED***("file", file)}
                value={file}
                options={files}>

            </SelectControl>
        </PanelRow>,
        <PanelBody title={"Colors"} initialOpen={false}>
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

        </PanelBody>,

        <PanelBody title={"Labels"} initialOpen={false}>

            <Property
                title={"Label Field"}
                property={"labelField"} value={labelField}
                ***REMOVED***={***REMOVED***}
                features={features}/>


            <PanelRow>
                <RangeControl
                    label="Size"
                    value={layer.labelFontSize * 1000}
                    onChange={(labelFontSize) => ***REMOVED***("labelFontSize", labelFontSize / 1000)}
                    min={0}
                    step={1}
                    max={500}
                />
            </PanelRow>

            {labelField != 'none' && <PanelRow>
                <PanelBody title={"Show/Hidde Labels"}>
                    {features && features.map(feature => <ToggleControl
                        label={feature.properties[labelField]}
                        checked={labelFilter.indexOf(feature.properties[labelField]) == -1}
                        onChange={(selected) => {
                            
                            ***REMOVED***("labelFilter", !selected ? [...layer.labelFilter, feature.properties[labelField]] : layer.labelFilter.filter(f => f !== feature.properties[labelField]))
                        }}
                    />)}

                </PanelBody>
            </PanelRow>}
        </PanelBody>,

        <React.Fragment>
            {type == 'data' && <PanelBody initialOpen={false} title={__("Data Layer Settings")}>
                <PanelRow>
                    <SelectControl
                        value={[app]} // e.g: value = [ 'a', 'c' ]
                        onChange={(app) => {
                            ***REMOVED***("app", app)
                        }}
                        options={metadata.apps}
                    />
                </PanelRow>


                <***REMOVED***
                    ***REMOVED***={***REMOVED***}
                    allDimensions={metadata.dimensions}
                    allFilters={metadata.filters}
                    allMeasures={metadata.measures}
                    allCategories={metadata.categories}
                    allApps={metadata.apps}
                    features={features}
                    layer={layer}>
                </***REMOVED***>

            </PanelBody>}
        </React.Fragment>,


    ]

}

class ***REMOVED*** extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
    }

    ***REMOVED***() {
        const {layer: {name, type, file, app}} = this.props
        debugger
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
        debugger;
        if ((app != prevAPP) || (prevAPP == null && app != null)) {

            this._loadMetadata(app)
        }
    }

    render() {
        const {onRemoveLayer, layer, layer: {name, type, file, app}} = this.props

        return <PanelBody title={__(`${name}`)}>
            <Layer {...this.props} metadata={this.state}></Layer>
            <PanelRow>
                <Button variant={"primary"} type onClick={onRemoveLayer}>Delete {name}</Button>
            </PanelRow>
            <PanelRow>
            </PanelRow>
        </PanelBody>
    }

}

export default ***REMOVED***