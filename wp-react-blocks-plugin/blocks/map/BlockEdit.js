import { ***REMOVED***, useBlockProps} from '@wordpress/block-editor'
import { Panel, PanelBody, PanelRow, SelectControl, ResizableBox, ToggleControl, TextControl} from '@wordpress/components'
import { ***REMOVED*** } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'
import { BlockEditWithAPIMetadata } from '../commons/index'
import APIConfig from "./APIConfig"
import ***REMOVED*** from "../commons/***REMOVED***"
import LegendBreaks from "./LegendBreaks"
import MapSymbols from "./Symbols"
import Tooltips from "./Tooltips"
import Settings from "./Settings"
import {ALIVE_SUPERSET_APP, DEFAULT_FORMAT_SETTINGS} from '../commons/Constants';

class BlockEdit extends BlockEditWithAPIMetadata {
    constructor() {
        super();
        this.state = {
            ***REMOVED***: [],
            types: 'media',
            taxonomies: null,
            loading: true
        }

        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.getLayerColor = this.getLayerColor.bind(this)
        this.setLayerColor = this.setLayerColor.bind(this)
        this.toggleLayer = this.toggleLayer.bind(this)
        this.getValue = this.getValue.bind(this)
        this.setValue = this.setValue.bind(this)
        this.updateLocationsAndCSV = this.updateLocationsAndCSV.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
    }

    ***REMOVED***() {
        super.***REMOVED***();
        this.getTaxonomies()
        const {
            attributes: {
                mainLayerId
            },
        } = this.props;
        if (mainLayerId) {
            this.***REMOVED***(this.props.attributes.mainLayerId)
        } else if (this.props.attributes.mapFile){
            this.getFile("/"+ this.props.attributes.mapFile)
        }

        this.getMapFiles()
        this.***REMOVED***();
    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        const {attributes: {fileType}} = this.props;
        super.***REMOVED***(prevProps, prevState, snapshot)
        if (prevProps.attributes) {
            if (fileType != prevProps.attributes.fileType) {
                this.getMapFiles()
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            const ***REMOVED*** = JSON.parse(this.props.attributes.mapPosition)
        const nextPosition = JSON.parse(nextProps.attributes.mapPosition)
        if (***REMOVED***.x !== nextPosition.x ||
            ***REMOVED***.y !== nextPosition.y ||
            ***REMOVED***.k !== nextPosition.k) {
            return false
        }
        } catch (error) {
            console.log('error parsing map position:' + error)
        }

        return true
    }

    getTaxonomies() {
        wp.apiFetch({
            path: '/wp/v2/taxonomies?per_page=100',
        }).then(data => {
            this.setState({
                taxonomies: data,
            }, this.***REMOVED***(data));
        });
    }

    ***REMOVED***(taxonomies) {
        const typesList = []
        if (taxonomies) {
            const txs = Object.keys(taxonomies)
            txs.forEach(t=> {
                if (taxonomies[t].types.indexOf('attachment') != -1) {
                    typesList.push({
                        slug: taxonomies[t].slug,
                        label: taxonomies[t].name,
                        value: taxonomies[t].rest_base
                    })
                }
            })
        }

        typesList.forEach(t => {
            wp.apiFetch({
                path: '/wp/v2/' + t.value + '?per_page=100',
            }).then(data => {
                const ***REMOVED*** = [...this.state.***REMOVED***, ...data]
                this.setState({***REMOVED***: ***REMOVED***});
            });
        })
    }

    getMapFiles() {
        const {
            attributes: {
             fileType,
             taxonomy},
     } = this.props;

        const ***REMOVED*** = taxonomy != 'none' && fileType!= 'none' ? `&${taxonomy}=${fileType}` :''
        const mapFiles = [{value:'',  label: 'None'}]
        wp.apiFetch({
            path: '/wp/v2/media?per_page=100&mime_type=application/json' + ***REMOVED***,
        }).then(json => {
            if (json) {
                json.forEach(f => {
                    mapFiles.push({value: f.id, label: f.title.rendered})
                })

                this.setState({mapFiles: mapFiles})
            }
        });
    }

    ***REMOVED***(id) {
        fetch('/wp/wp-json/wp/v2/media/' + id)
        .then(response => response.json())
        .then(json => {
            if (json) {
                this.getFile(json.source_url)
            }
        });
    }

    getFile(url) {
        fetch(url)
        .then(response => response.json())
        .then(json => {
            if (json) {
                if (json) {
                   this.setState({layerData: json}, () => {
                     this.updateLocationsAndCSV(json)
                   })

                }
            }
        });
    }

    ***REMOVED***() {
        const {***REMOVED***} = this.state
        const taxonomyValuesOptions = ***REMOVED*** && ***REMOVED***.map(t => ({label: t.name, value: t.id, taxonomy: t.taxonomy}))

        return [{label: 'None', value: 'none', taxonomy: 'none'}, ...taxonomyValuesOptions]
    }

    ***REMOVED***(data) {
        const topology = data ? data : this.state.layerData;
        if (topology && topology.objects) {
            const fields = Object.keys(topology.objects)
            for (let index in fields) {
                const field = fields[index]
                if (topology.objects[field].type == '***REMOVED***') {
                    return field
                }
            }
        }

        return "collection"
    }

    ***REMOVED***() {
        const mappingFields = []
        const features = this.***REMOVED***()
        const geometry = features[0]
        if (geometry) {
            Object.keys(geometry.properties).map(k => {
                mappingFields.push({value: k, label: k})
            })
        }

       return [{label: 'None', value: 'none'}, ...mappingFields]
    }

    ***REMOVED***(value) {
        const {setAttributes} = this.props
        const ***REMOVED*** = this.***REMOVED***()
        const taxonomyValue = ***REMOVED***.filter(t => t.value == value)[0]
        setAttributes({fileType: value, taxonomy: taxonomyValue ? taxonomyValue.taxonomy : 'none'})
    }

    ***REMOVED***() {
        const {layerData} = this.state;
        const ***REMOVED*** = this.***REMOVED***()
        if (layerData && layerData.objects && layerData.objects[***REMOVED***] && layerData.objects[***REMOVED***].geometries){
            return layerData.objects[***REMOVED***].geometries
        } else if(layerData && layerData.features) {
            return layerData.features
        }

        return []
    }

    updateLocationsAndCSV(layerData, field) {
        const {setAttributes, attributes: {csv, mappingField}} = this.props;
         const selectedField = field || mappingField
         const features = this.***REMOVED***()
         if (selectedField) {
            const locations = []
            features.forEach(g => {
                if (g.properties && g.properties[selectedField]) {
                    const location = g.properties[selectedField]
                    locations.push({ value: location, label: location })
                }
            })

            this.setState({ locations: locations })

            const ***REMOVED*** = csv == null || csv.trim().length == 0 || csv.trim() == 'name,value'
            if (***REMOVED***) {
                let text = 'name,value\n'
                locations.forEach(loc => {
                    text += loc.value + ',1\n'
                })
                setAttributes({ csv: text })
            }
        }
    }


    ***REMOVED***() {
        const {setAttributes} = this.props;
        window.***REMOVED***("message",
            (event) => {
                if (event.data.type == 'map') {
                    const iframeOrigin = event.origin.split(':')[0]
                    const parentOrigin = window.location.origin.split(':')[0]

                    if (iframeOrigin == parentOrigin) {
                        setAttributes({mapPosition:  event.data.value})
                    }
                }
            },
            false);
    }

    toggleLayer(itemId, value) {
        const {setAttributes, attributes: {
            enabledLayers
         }
        } = this.props;
        if (enabledLayers) {

            const values = [...enabledLayers]
            if (value) {
                values.push({id: itemId, index: 0})
            } else {
                const index = values.findIndex(l => l.id == itemId)
                values.splice(index, 1)
            }
            setAttributes({enabledLayers: values})
        }
    }

    getLayerColor(value, field) {
        const {attributes: {
               enabledLayers
            }
        } = this.props;
        let color = field == 'bgColor' ? '#f8f8f8' : '#000'
        if (enabledLayers) {
           const layer = enabledLayers.filter(l => l.id == value)[0]
           if (layer && layer[field]) {
            color = layer[field]
           }
        }

        return ***REMOVED***(color)
    }

    setLayerColor(value, field,color) {
        const {setAttributes, attributes: {
            enabledLayers
         }
     } = this.props;
        if (enabledLayers) {
            const values = [...enabledLayers]
            const index = values.findIndex(l => l.id == value)
            values[index][field] = color ? ***REMOVED***(color) : ***REMOVED***('#f8f8f8')
            setAttributes({enabledLayers: values})
        }
    }

    getValue(value, field) {
        const {setAttributes, attributes: {enabledLayers}} = this.props;
        const layer = enabledLayers.filter(l => l.id == value)[0]
        return layer[field]
    }

    setValue(id, field, value) {
        const {setAttributes, attributes: {
            enabledLayers
         }} = this.props;

         if (enabledLayers) {
            const values = [...enabledLayers]
            const index = values.findIndex(l => l.id == id)
            values[index][field] = value
            setAttributes({enabledLayers: values})
        }
    }

    render() {
        const {
            className, isSelected,
            ***REMOVED***, setAttributes, attributes: {
                height,
                app,
                dimension1,
                dimension2,
                legendBreaks,
                mainLayerId,
                mappingField,
                filters,
                fileType,
                mapCenter,
                enabledLayers,
                mapType,
                ***REMOVED***,
                zoomLevelToShowPoints,
                ***REMOVED***,
                zoomOnFilter,
                ***REMOVED***,
                showShadingLayerLabels,
                datasetId
            }
        } = this.props;

        const {mapFiles} = this.state;
        const levels = [dimension1, dimension2]
        const source = levels.filter(l => l != 'none' && l != null).join('/')
        const ***REMOVED*** = legendBreaks.filter(b => b.min || b.max);
        let params = {}
        filters.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })

        const  datasets = [{label: 'Select Dataset', value: '0'}]
        if (this.state.datasets) {
            this.state.datasets.forEach(d => {
                datasets.push({label: d.label, value: d.id})
            })
        }

        const divStyles = { height: height + 'px', width: '100%' };

        return ([isSelected && (<***REMOVED***>
            <Panel header={__("Map Configuration")}>
            <PanelBody initialOpen={false} title={__("Map Type")}>
            <PanelRow>
            <SelectControl
                        label={__('Map Type')}
                                value={[mapType]}
                                onChange={(value) => {
                                    setAttributes({ mapType: value })
                                }}
                                options={[{ label: 'Default', value: 'DEFAULT'}, { label: 'Points Map', value: 'POINTS_MAP' }]}
                            />
            </PanelRow>
                </PanelBody>
                <PanelBody initialOpen={false} title={__("Data Source")}>
                    <PanelBody initialOpen={true} title={__("Map Layers")}>
                   <PanelRow>
                     <SelectControl label={__("Layers Filter")}
                     options={this.***REMOVED***()}
                            value={fileType}
                            onChange={this.***REMOVED***}
                            style={{width: "150px"}}
                       />
                    </PanelRow>

                    {mapFiles && mapFiles.filter(f => f.value).map(file => {
                        return (<><PanelRow>
                            <ToggleControl
                                label={file.label}
                                checked={enabledLayers ? enabledLayers.findIndex(l => l.id == file.value) > -1 : false}
                                onChange={(value) => {
                                    this.toggleLayer(file.value, value)
                                }}
                                  />
                                  </PanelRow>
                            {enabledLayers.findIndex(l => l.id == file.value) > -1 &&
                            <>
                            <PanelRow>
                                <***REMOVED***
                                    title={__(`Background Color`)}
                                    colorSettings={[
                                        {
                                            value: this.getLayerColor(file.value, 'bgColor'),
                                            onChange: (color) => {
                                                this.setLayerColor(file.value, 'bgColor', color)
                                            },
                                            label: __("")
                                        }
                                    ]}
                                />
                            </PanelRow>
                            <div style={{padding:"20px"}} >
                        {<TextControl value={this.getValue(file.value, 'index')} label={__("Index")}
                            onChange={(value) => {this.setValue(file.value, 'index', value)}} max={10} type="number" />}
                        </div>
                        </>
                    }
                        </>)
                    })}

                    <PanelRow>
                        <SelectControl
                            label={__('Layer Used for shading')}
                            value={[mainLayerId]}
                            onChange={(value) => {
                                setAttributes({ mainLayerId: value })
                                this.***REMOVED***(value)
                            }}
                            options={ this.state.mapFiles ? this.state.mapFiles.filter(m => !m.value || enabledLayers.findIndex(l => l.id == m.value) > -1) : []}
                        />
                    </PanelRow>
                    <PanelRow>
                    <SelectControl
                                label={__('Show Shading Layer Labels')}
                                value={[showShadingLayerLabels]}
                                onChange={(value) => {
                                    setAttributes({ showShadingLayerLabels: value })
                                }}
                                options={[{ label: 'Only if admin unit has data', value: 'ifUnitHasData'}, {label: 'Do not show', value: 'doNotShow' }, {label: 'Show All', value: 'showAll' }]}/>
                   </PanelRow>
                    <PanelRow>
                    <SelectControl
                            label={__('Mapping Field')}
                            value={[mappingField]}
                            onChange={(value) => {
                            setAttributes({ mappingField: value, mapLabelField: value})
                            this.updateLocationsAndCSV(this.state.layerData, value)
                        }}
                        options={this.***REMOVED***()}
                        />
                    </PanelRow>
                    <PanelRow>
                            <SelectControl
                                label={__('Map Center')}
                                value={[mapCenter]}
                                onChange={(value) => {
                                    setAttributes({ mapCenter: value })
                                }}
                                options={[{ label: 'Kenya', value: 'KEN'}, { label: 'Nigeria', value: 'NGA' }, { label: 'South Africa', value: 'ZAF' }, { label: 'West Africa', value: 'West Africa' }, { label: 'Africa', value: 'Africa' }, { label: 'Ethiopia', value: 'ETH'}, { label: 'Zambia', value: 'ZMB'},{ label: 'Democratic Republic of the Congo', value: 'DRC'}, { label: 'World', value: 'World'}]}
                            />
                        </PanelRow>
                    </PanelBody>

                        <PanelBody initialOpen={true} title={__("Data")}>
                        <PanelRow>
                        <SelectControl
                            value={[app]} // e.g: value = [ 'a', 'c' ]
                            onChange={(app) => {
                                setAttributes({
                                    app: app,
                                    dimension1: 'none',
                                    dimension2: 'none',
                                    filters: []                                    
                                })
                            }}
                            options={this.state.apps}
                        />
                    </PanelRow>

                     {app == ALIVE_SUPERSET_APP &&   <PanelRow>
                                                            <SelectControl
                                                                label={__('Datasets')}
                                                                value={[datasetId]} 
                                                                onChange={(newDatasetId)   => {
                                                                    setAttributes({
                                                                        datasetId: newDatasetId,
                                                                        dimension1: 'none',
                                                                        dimension2: 'none',
                                                                        dimension3: 'none',	
                                                                        measures: []
                                                                    })
                                                                    this.setState({dimensions: [], measures: [], filters: [], categories: []})
                                                                    this.loadMetadata(newDatasetId)
                                                                }}
                                                                options={datasets}
                                                            />
                                                          </PanelRow>
                                                        }
                                                      
                        </PanelBody>

                </PanelBody>
                {app != 'csv' &&
                    <APIConfig
                        allDimensions={this.state.dimensions || []}
                        allFilters={this.state.filters || []}
                        allMeasures={this.state.measures || []}
                        allCategories={this.state.categories || []}
                        allApps={this.state.apps}
                        {...this.props}>
                    </APIConfig>
                }

                {app == 'csv' &&
                    <***REMOVED*** {...this.props}>
                    </***REMOVED***>
                }
                <Settings {...this.props} locations = {this.state.locations}> </Settings>
                <LegendBreaks {...this.props} allMeasures={this.state.measures || []} app = {app}/>
                <MapSymbols {...this.props} allMeasures={this.state.measures || []} app = {app} locations = {this.state.locations}/>
                <Tooltips {...this.props} allMeasures={this.state.measures || []} app = {app} locations = {this.state.locations}></Tooltips>
                {mapType == "POINTS_MAP" &&
                <PanelBody title="Point Map Config">
                     <PanelRow>
                <***REMOVED***
                    title={__('Default Point Color')}
                    colorSettings={[
                        {
                            value: ***REMOVED***(***REMOVED*** ? ***REMOVED*** : "#f0f0f1"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({***REMOVED***: ***REMOVED***(color)})
                                } else {
                                    setAttributes({***REMOVED***: null})
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
                </PanelRow>
                     <PanelRow>
                        <SelectControl
                            label={__('Aggregation Formula')}
                            value={[***REMOVED***]}
                            onChange={(value) => {
                                setAttributes({ ***REMOVED***: value })
                            }}
                            options={[{label:'Count',value: 'COUNT'}, {label:'Sum',value: 'SUM'}]}
                        />
                    </PanelRow>
                    {/*<PanelRow>
                    <TextControl value={zoomLevelToShowPoints} label={__("Zoom Level To Show Points")}
                                    onChange={value => setAttributes({ zoomLevelToShowPoints: value }) } type="number" />
                        </PanelRow>*/}

                        <PanelRow>
                <ToggleControl
                    label={__('Zoom on Filter')}
                    checked={zoomOnFilter}
                    onChange={() => setAttributes({ zoomOnFilter: !zoomOnFilter })}/>
            </PanelRow>

            {zoomOnFilter &&
                  <PanelRow>
                            <TextControl
                                label={__('Zoom on filter data field')}
                                value={***REMOVED***}
                                onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                            />
                        </PanelRow>
                        }
                </PanelBody>
              }
            </Panel>
        </***REMOVED***>),

        (
            <ResizableBox
                size={{ height }}
                style={{ "margin": "auto", width: "100%" }}
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
                    setAttributes({
                        height: parseInt(height + delta.height, 10),
                    });
                    ***REMOVED***(true);
                }}
                onResizeStart={() => {
                    ***REMOVED***(false);
                }}>

                <div>
                    {this.state.react_ui_url && <iframe ref={this.iframe} scrolling={"no"}
                        style={divStyles}
                        src={this.state.react_ui_url + "/embeddable/map?"} />}
                </div>
            </ResizableBox>
        )]
        );

    }
}


const Edit = (props) => {

    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return <div {...blockProps}><BlockEdit {...props} /></div>;


}
export default Edit;