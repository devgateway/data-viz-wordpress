import {PanelBody, PanelRow, SelectControl, TextControl} from "@wordpress/components";
import {__} from '@wordpress/i18n';
import {getJsonFiles} from "./FileUtils";
import {useEffect} from "react";
import {useState} from "@wordpress/element";
import ***REMOVED*** from "./***REMOVED***";
import {BlockEditWithAPIMetadata, ComponentWithSettings} from "../commons";

const typeOptions = [{label: "Data", value: "data"},
    {label: "Base", value: "base"}]

const toOptions = (files) => {
    return [{label: 'None', value: 'none'}, ...files.map(file => {
        return {label: file.title.rendered, value: file.source_url}
    })]
}


const LayerSettings = (props) => {
    const {onChange, metadata, layer, layer: {name, type, file, app}} = props

    const [files, setFiles] = useState([])
    useEffect(() => {
        getJsonFiles().then(files => {
            setFiles(toOptions(files))
        })
    }, [])

    const ***REMOVED*** = (atrr, value) => {
        console.log("change attribute " + atrr + " to " + value)
        const newLayer = {...layer}
        newLayer[atrr] = value
        onChange(newLayer)
    }

    return [
        <PanelRow>
            <TextControl
                type={"String"}
                label={__("Name", "dg")}
                onChange={name => ***REMOVED***("name", name)}
                value={name}
            />
        </PanelRow>,
        <PanelRow>
            <SelectControl
                label={__("Type", "dg")}
                value={type}
                onChange={type => ***REMOVED***("type", type)}
                options={typeOptions}
            />
        </PanelRow>,
        <PanelRow>
            <SelectControl
                type={"String"}
                label="File"
                onChange={file => ***REMOVED***("file", file)}
                value={file}
                options={files}>

            </SelectControl>
        </PanelRow>,
        <PanelBody initialOpen={false} title={__("API & Source")}>
            <PanelRow>
                <SelectControl
                    value={[app]} // e.g: value = [ 'a', 'c' ]
                    onChange={(app) => {
                        ***REMOVED***("app", app)
                    }}
                    options={metadata.apps}
                />
            </PanelRow>
        </PanelBody>,
        <***REMOVED***
            ***REMOVED***={***REMOVED***}
            allDimensions={metadata.dimensions}
            allFilters={metadata.filters}
            allMeasures={metadata.measures}
            allCategories={metadata.categories}
            allApps={metadata.apps}
            layer={layer}>
            >

        </***REMOVED***>
    ]

}

class ***REMOVED*** extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
    }

    ***REMOVED***(prevProps, prevState, snapshot) {

        super.***REMOVED***(prevProps, prevState, snapshot)
        const {layer: {app}} = this.props
        const {layer: {app: prevAPP}} = prevProps

        if (app != prevAPP) {
            debugger;
            this._loadMetadata(app)
        }
    }

    render() {
        return <LayerSettings {...this.props} metadata={this.state}></LayerSettings>
    }

}

export default ***REMOVED***