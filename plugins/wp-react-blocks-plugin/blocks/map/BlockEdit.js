import React from 'react'
import { InspectorControls, useBlockProps} from '@wordpress/block-editor'
import { Panel, PanelBody, PanelRow, SelectControl, ResizableBox, ToggleControl, TextControl, Button} from '@wordpress/components'
import { PanelColorSettings } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'
import { BlockEditWithAPIMetadata, isSupersetAPI, MapCSVSourceConfig } from '@devgateway/dvz-wp-commons';
import APIConfig from "./APIConfig"
import LegendBreaks from "./LegendBreaks"
import MapSymbols from "./Symbols"
import Tooltips from "./Tooltips"
import Settings from "./Settings"

class BlockEdit extends BlockEditWithAPIMetadata {
    constructor() {
        super();
        this.state = {
            taxonomyValues: [],
            types: 'media',
            taxonomies: null,
            loading: true
        }

        this.iframe = React.createRef();
        this.onFileTypeChanged = this.onFileTypeChanged.bind(this)
        this.getLayerColor = this.getLayerColor.bind(this)
        this.setLayerColor = this.setLayerColor.bind(this)
        this.toggleLayer = this.toggleLayer.bind(this)
        this.getValue = this.getValue.bind(this)
        this.setValue = this.setValue.bind(this)
        this.updateLocationsAndCSV = this.updateLocationsAndCSV.bind(this)
        this.extractFeatures = this.extractFeatures.bind(this)
        this.applyLocalization = this.applyLocalization.bind(this)
        this.reloadIframe = this.reloadIframe.bind(this)
    }

    componentDidMount() {
        super.componentDidMount();
        this.getTaxonomies()
        const {
            attributes: {
                mainLayerId
            },
        } = this.props;
        if (mainLayerId) {
            this.getFileMetaData(this.props.attributes.mainLayerId)
        } else if (this.props.attributes.mapFile){
            this.getFile("/"+ this.props.attributes.mapFile)
        }

        this.getMapFiles()
        this.updateMapPosition();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {attributes: {fileType}} = this.props;
        super.componentDidUpdate(prevProps, prevState, snapshot)
        if (prevProps.attributes) {
            if (fileType != prevProps.attributes.fileType) {
                this.getMapFiles()
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            const currentPosition = JSON.parse(this.props.attributes.mapPosition)
        const nextPosition = JSON.parse(nextProps.attributes.mapPosition)
        if (currentPosition.x !== nextPosition.x ||
            currentPosition.y !== nextPosition.y ||
            currentPosition.k !== nextPosition.k) {
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
            }, this.getTaxonomyValues(data));
        });
    }

    getTaxonomyValues(taxonomies) {
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
                const newTaxonomyValues = [...this.state.taxonomyValues, ...data]
                this.setState({taxonomyValues: newTaxonomyValues});
            });
        })
    }

    getMapFiles() {
        const {
            attributes: {
             fileType,
             taxonomy},
     } = this.props;

        const fileTypeFilter = taxonomy != 'none' && fileType!= 'none' ? `&${taxonomy}=${fileType}` :''
        const mapFiles = [{value:'',  label: 'None'}]
        wp.apiFetch({
            path: '/wp/v2/media?per_page=100&mime_type=application/json' + fileTypeFilter,
        }).then(json => {
            if (json) {
                json.forEach(f => {
                    mapFiles.push({value: f.id, label: f.title.rendered})
                })

                this.setState({mapFiles: mapFiles})
            }
        });
    }

    getFileMetaData(id) {
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

    taxonomyValueOptions() {
        const {taxonomyValues} = this.state
        const taxonomyValuesOptions = taxonomyValues && taxonomyValues.map(t => ({label: t.name, value: t.id, taxonomy: t.taxonomy}))

        return [{label: 'None', value: 'none', taxonomy: 'none'}, ...taxonomyValuesOptions]
    }

    getCollectionField(data) {
        const topology = data ? data : this.state.layerData;
        if (topology && topology.objects) {
            const fields = Object.keys(topology.objects)
            for (let index in fields) {
                const field = fields[index]
                if (topology.objects[field].type == 'GeometryCollection') {
                    return field
                }
            }
        }

        return "collection"
    }

    mappingFieldOptions() {
        const mappingFields = []
        const features = this.extractFeatures()
        const geometry = features[0]
        if (geometry) {
            Object.keys(geometry.properties).map(k => {
                mappingFields.push({value: k, label: k})
            })
        }

       return [{label: 'None', value: 'none'}, ...mappingFields]
    }

    getLayerMappingFieldOptions() {
        const selectedLayer = this.props.attributes.recentlyToggledLayerId;
        if (selectedLayer && !this.state.layerData) {
            this.getFileMetaData(selectedLayer);
        }
        return this.mappingFieldOptions();
    }

    onFileTypeChanged(value) {
        const {setAttributes} = this.props
        const taxonomyValues = this.taxonomyValueOptions()
        const taxonomyValue = taxonomyValues.filter(t => t.value == value)[0]
        setAttributes({fileType: value, taxonomy: taxonomyValue ? taxonomyValue.taxonomy : 'none'})
    }

    extractFeatures() {
        const {layerData} = this.state;
        const collectionName = this.getCollectionField()
        if (layerData && layerData.objects && layerData.objects[collectionName] && layerData.objects[collectionName].geometries){
            return layerData.objects[collectionName].geometries
        } else if(layerData && layerData.features) {
            return layerData.features
        }

        return []
    }

    getApiFieldOptions() {
        const apiFields = []
        const categories = this.state.categories || []

        categories.forEach(category => {
            if (category.type) {
                apiFields.push({
                    value: category.type,
                    label: category.label || category.type
                })
            }
        })

        return [{label: 'None', value: 'none'}, ...apiFields]
    }

    getDatasourceOptions(fileValue) {
        const { attributes: { app } } = this.props;

        // Set default datasource based on app
        const currentDatasource = this.getValue(fileValue, 'datasource');
        if (!currentDatasource && app !== 'csv') {
            this.setValue(fileValue, 'datasource', app);
        }

        return [
            {label: 'Select Datasource', value: 'none'},
            ...(this.state.apps ? this.state.apps.filter(a => a.value !== 'csv') : [])
        ];
    }

    getApiLabels(type, locale) {
        const labels = this.state.categories?.find(d => d.type.toLowerCase() === type.toLowerCase())?.items;
        const labelMap = new Map();

        if (labels?.length > 0) {
            labels.forEach(l => {
                if (locale && locale !== 'en' && l.labels && l.labels[locale.toUpperCase()]) {
                    // Use translated label for non-English locales
                    labelMap.set(l.value, l.labels[locale.toUpperCase()]);
                } else {
                    // Use original label for English or when no translation exists
                    labelMap.set(l.value, l.label || l.value);
                }
            });
        }

        return labelMap;
    }

    applyLocalization(layerId) {
        const locale = this.getValue(layerId, 'locale') || 'en';
        const apiField = this.getValue(layerId, 'apiField');
        const layerMappingField = this.getValue(layerId, 'layerMappingField');
        const datasource = this.getValue(layerId, 'datasource');

        if (!datasource || datasource === 'none') {
            alert(__('Please select a datasource before applying localization'));
            return;
        }

        if (!apiField || apiField === 'none' || !layerMappingField || layerMappingField === 'none') {
            alert(__('Please select both API field and Mapping field before applying localization'));
            return;
        }

        const apiLabels = this.getApiLabels(apiField, locale);
        this.setValue(layerId, 'displayLayerLabels', true);
        // Update the layer features with localized labels
        if (apiLabels && apiLabels.size > 0) {
            this.updateLocationsAndCSV(this.state.layerData, layerMappingField, locale, apiField);
        }
        this.reloadIframe();
    }

    reloadIframe() {
        // Trigger iframe refresh by updating a timestamp parameter
        if (this.iframe.current) {
            const baseUrl = this.state.react_ui_url + "/embeddable/map?"
            const timestamp = new Date().getTime()
            this.iframe.current.src = `${baseUrl}refresh=${timestamp}`
        }
    }

    updateLocationsAndCSV(layerData, field, locale = 'en', apiField = null) {
        const {setAttributes, attributes: {csv, mappingField}} = this.props;
         const selectedField = field || mappingField
         const features = this.extractFeatures()

         if (selectedField) {
            const locations = []
            const apiLabels = apiField ? this.getApiLabels(apiField, locale) : null;
            features.forEach(g => {
                if (g.properties && g.properties[selectedField]) {
                    const location = g.properties[selectedField]
                    const label = apiLabels && apiLabels.has(location) ? apiLabels.get(location) : location
                    locations.push({ value: location, label: label })
                }
            })

            this.setState({ locations: locations })

            const csvFieldIsBlank = csv == null || csv.trim().length == 0 || csv.trim() == 'name,value'
            if (csvFieldIsBlank) {
                let text = 'name,value\n'
                locations.forEach(loc => {
                    text += loc.value + ',1\n'
                })
                setAttributes({ csv: text })
            }
        }
    }


    updateMapPosition() {
        const {setAttributes} = this.props;
        window.addEventListener("message",
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
            setAttributes({enabledLayers: values, recentlyToggledLayerId: itemId});
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

        return decodeURIComponent(color)
    }

    setLayerColor(value, field,color) {
        const {setAttributes, attributes: {
            enabledLayers
         }
     } = this.props;
        if (enabledLayers) {
            const values = [...enabledLayers]
            const index = values.findIndex(l => l.id == value)
            values[index][field] = color ? encodeURIComponent(color) : encodeURIComponent('#f8f8f8')
            setAttributes({enabledLayers: values})
        }
    }

    getValue(value, field) {
        const {setAttributes, attributes: {enabledLayers}} = this.props;
        const layer = enabledLayers.filter(l => l.id == value)[0]
        return layer ? layer[field] : undefined
    }

    setValue(id, field, value) {
        const {setAttributes, attributes: {
            enabledLayers
         }} = this.props;

         if (enabledLayers) {
            const values = [...enabledLayers]
            const index = values.findIndex(l => l.id == id)
            if (index !== -1) {
                values[index][field] = value
                setAttributes({enabledLayers: values})
            }
        }
    }

    render() {
        const {
            className, isSelected,
            toggleSelection, setAttributes, attributes: {
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
                aggregationFormula,
                zoomLevelToShowPoints,
                defaultPointColor,
                zoomOnFilter,
                zoomOnFilterField,
                showShadingLayerLabels,
                dvzProxyDatasetId
            }
        } = this.props;

        const {mapFiles} = this.state;
        const levels = [dimension1, dimension2]
        const source = levels.filter(l => l != 'none' && l != null).join('/')
        const validLegendBreaks = legendBreaks.filter(b => b.min || b.max);
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

        return ([isSelected && (<InspectorControls>
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

                     {isSupersetAPI(app, this.state.apps) &&   <PanelRow>
                                                            <SelectControl
                                                                label={__('Datasets')}
                                                                value={[dvzProxyDatasetId]}
                                                                onChange={(newDatasetId)   => {
                                                                    setAttributes({
                                                                        dvzProxyDatasetId: newDatasetId,
                                                                        dimension1: 'none',
                                                                        dimension2: 'none',
                                                                        dimension3: 'none',
                                                                        measures: []
                                                                    })
                                                                    this.setState({dimensions: [], measures: [], filters: [], categories: []})
                                                                    this.loadMetadata(app, newDatasetId)
                                                                }}
                                                                options={datasets}
                                                            />
                                                          </PanelRow>
                                                        }

                        </PanelBody>
                    <PanelBody initialOpen={true} title={__("Map Layers")}>
                   <PanelRow>
                     <SelectControl label={__("Layers Filter")}
                     options={this.taxonomyValueOptions()}
                            value={fileType}
                            onChange={this.onFileTypeChanged}
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
                                <PanelColorSettings
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

                        {app != 'csv' &&
                            <PanelBody initialOpen={false} title={__("Localize Layer")}>
                                <PanelRow>
                                    <p style={{fontSize: '12px', fontStyle: 'italic', color: '#666', margin: '0'}}>
                                        {__('Note: Use this feature only when there is corresponding API data for this layer in the database. This will apply localized labels to map regions based on the selected API field and locale.')}
                                    </p>
                                </PanelRow>
                                <PanelRow>
                                    <SelectControl
                                        label={__('Datasource')}
                                        value={[this.getValue(file.value, 'datasource') || (app !== 'csv' ? app : 'none')]}
                                        onChange={(value) => {
                                            this.setValue(file.value, 'datasource', value);
                                        }}
                                        options={this.getDatasourceOptions(file.value)}
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <SelectControl
                                        label={__('API Field')}
                                        value={[this.getValue(file.value, 'apiField') || 'none']}
                                        onChange={(value) => {
                                            this.setValue(file.value, 'apiField', value);
                                        }}
                                        options={this.getApiFieldOptions()}
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <SelectControl
                                        label={__('Mapping Field')}
                                        value={[this.getValue(file.value, 'layerMappingField') || 'none']}
                                        onChange={(value) => {
                                            this.setValue(file.value, 'layerMappingField', value);
                                        }}
                                        options={this.getLayerMappingFieldOptions()}
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <SelectControl
                                        label={__('Current Locale')}
                                        value={[this.getValue(file.value, 'locale') || 'en']}
                                        onChange={(value) => {
                                            this.setValue(file.value, 'locale', value);
                                        }}
                                        options={[
                                            {label: 'English', value: 'en'},
                                            {label: 'French', value: 'fr'},
                                            {label: 'Portuguese', value: 'pt'},
                                            {label: 'Spanish', value: 'es'},
                                            {label: 'Swahili', value: 'sw'},
                                            {label: 'Amharic', value: 'am'}
                                        ]}
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <Button
                                        variant='primary'
                                        onClick={() => this.applyLocalization(file.value)}
                                        disabled={!(
                                            (this.getValue(file.value, 'datasource') && this.getValue(file.value, 'datasource') !== 'none') &&
                                            (this.getValue(file.value, 'apiField') && this.getValue(file.value, 'apiField') !== 'none') &&
                                            (this.getValue(file.value, 'layerMappingField') && this.getValue(file.value, 'layerMappingField') !== 'none')
                                        )}
                                    >
                                        {__('Apply Localization')}
                                    </Button>
                                </PanelRow>
                            </PanelBody>
                        }
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
                                this.getFileMetaData(value)
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
                        options={this.mappingFieldOptions()}
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
                    <MapCSVSourceConfig {...this.props}>
                    </MapCSVSourceConfig>
                }
                <Settings {...this.props} locations = {this.state.locations}> </Settings>
                <LegendBreaks {...this.props} allMeasures={this.state.measures || []} app = {app}/>
                <MapSymbols {...this.props} allMeasures={this.state.measures || []} app = {app} locations = {this.state.locations}/>
                <Tooltips {...this.props} allMeasures={this.state.measures || []} app = {app} locations = {this.state.locations}></Tooltips>
                {mapType == "POINTS_MAP" &&
                <PanelBody title="Point Map Config">
                     <PanelRow>
                <PanelColorSettings
                    title={__('Default Point Color')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(defaultPointColor ? defaultPointColor : "#f0f0f1"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({defaultPointColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({defaultPointColor: null})
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
                            value={[aggregationFormula]}
                            onChange={(value) => {
                                setAttributes({ aggregationFormula: value })
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
                                value={zoomOnFilterField}
                                onChange={(zoomOnFilterField) => setAttributes({ zoomOnFilterField })}
                            />
                        </PanelRow>
                        }
                </PanelBody>
              }
            </Panel>
        </InspectorControls>),

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
                    toggleSelection(true);
                }}
                onResizeStart={() => {
                    toggleSelection(false);
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
