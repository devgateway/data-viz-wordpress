import {__} from '@wordpress/i18n';
import {***REMOVED***, PanelBody, PanelRow, SelectControl, TextControl} from '@wordpress/components';
import {Component} from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch';
import {togglePanel} from "./Util";

import {***REMOVED***} from './APIutils'
import {isSupersetAPI} from "./APIutils";


export const SizeConfig = ({height, setAttributes, panelStatus,initialOpen}) => {
    return (<PanelBody initialOpen={panelStatus?panelStatus["SIZE"]:initialOpen} onToggle={e => togglePanel("SIZE", panelStatus, setAttributes)}
                       title={__("Size")}>
        <PanelRow>
            <TextControl
                size={10}
                label="Height"
                value={height}
                onChange={(height) => setAttributes({height: height ? parseInt(height) : 0})}
            />
        </PanelRow>
    </PanelBody>)

}

export class ComponentWithSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            react_ui_url: ''
        }

        window.***REMOVED***("message", (event) => {

            if (event.data.type == '***REMOVED***' && event.data.value == true) {
                if (this.iframe.current) {
                    console.log("-----------Sending message -----------")
                    this.iframe.current.contentWindow.postMessage(({messageType: 'component-attributes', ...this.props.attributes}), "*")
                }
            }
        }, false);
        this.iframe = React.createRef();
    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        if (this.iframe.current) {
            console.log("-----------Sending message -----------")
            this.iframe.current.contentWindow.postMessage(({messageType: 'component-attributes', ...this.props.attributes}), "*")
        }
    }

    ***REMOVED***() {
        apiFetch({path: '/dg/v1/settings'}).then((data) => {           
            this.setState({
                react_ui_url: data["react_ui_url"] + '/' + window._page_locale,
                react_api_url: data["react_api_url"],
                apache_superset_url: data["apache_superset_url"],
                site_language: data["site_language"],
                current_language: new ***REMOVED***(document.location.search).get("edit_lang")
            });
        });
    }
}


export class ***REMOVED*** extends ComponentWithSettings {

    constructor(props) {
        super(props);
        this.state = {
            ***REMOVED***: [],
            types: null,
            taxonomies: null,
            loading: true
        }
        this.onTypeChanged = this.onTypeChanged.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        const {
            setAttributes,
            attributes: {
                type,
                taxonomy,
                count
            },
        } = this.props;

        super.***REMOVED***(prevProps, prevState, snapshot)
            if (prevProps.attributes) {
            if (type != prevProps.attributes.type) {

            }
            if (taxonomy != prevProps.attributes.taxonomy) {
                this.***REMOVED***()

            }
        }

    }

    ***REMOVED***() {
        super.***REMOVED***()
        this.getTypes();
        this.getTaxonomies()

        const {
            setAttributes,
            attributes: {
                type,
                taxonomy,
                count
            },
        } = this.props;


        if (taxonomy != 'none') {
            this.***REMOVED***()

        }

    }

    onTypeChanged(value) {
        const {setAttributes} = this.props
        setAttributes({categories: []})
        setAttributes({taxonomy: 'none'})
        setAttributes({type: value})
    }

    ***REMOVED***(value) {
        const {setAttributes} = this.props
        setAttributes({categories: []})
        setAttributes({taxonomy: value})

    }

    ***REMOVED***(checked, value) {
        
        const {setAttributes, attributes: {categories}} = this.props
        if (!checked) {
            setAttributes({categories: categories.filter(i => i != value)})
        } else {
            let newCate = [...categories]
            newCate.push(value)
            setAttributes({categories: newCate})
        }

    }

    ***REMOVED***() {
        const {
            setAttributes,
            attributes: {
                type,
                taxonomy,
                count
            },
        } = this.props;

        wp.apiFetch({
            path: '/wp/v2/' + taxonomy + '?per_page=100',
        }).then(data => {

            this.setState({***REMOVED***: data});
        });
    }

    getTaxonomies() {

        wp.apiFetch({
            path: '/wp/v2/taxonomies?per_page=100',
        }).then(data => {
            this.setState({
                taxonomies: data,
            });
        });
    }

    getTypes() {
        wp.apiFetch({
            path: '/wp/v2/types?per_page=100',
        }).then(data => {
            const types = data
            this.setState({
                types: data,
                loading: false
            });
        });
    }

    typeOptions() {
        const {
            setAttributes,
            attributes: {
                count,
                type,
                taxonomy,
                category
            },
        } = this.props;
        const {types, taxonomies, ***REMOVED***} = this.state
        const typeOptions = types ? Object.keys(types)
            .filter(k => ['page', 'attachment', 'wp_block']
                .indexOf(k) == -1).map(k => ({
                slug: types[k].slug,
                label: types[k].name,
                value: types[k].rest_base
            })) : []

        return typeOptions

    }

    ***REMOVED***() {
        const {
            attributes: {
                type,
            },
        } = this.props;
        const {types, taxonomies, ***REMOVED***} = this.state
        let slug;
        if (types) {
            slug = this.typeOptions().filter(t => t.value == type)[0].slug

            const ***REMOVED*** = types && taxonomies ? Object.keys(taxonomies)
                .filter(i => taxonomies[i].types.indexOf(slug) > -1).map(k => ({
                    label: types[slug].name + ' -> ' + taxonomies[k].name,
                    value: taxonomies[k].rest_base
                })) : []

            return [{label: 'None', value: 'none'}, ...***REMOVED***]
        } else {
            return []
        }
    }

    ***REMOVED***() {
        const {types, taxonomies, ***REMOVED***} = this.state
        const taxonomyValuesOptions = ***REMOVED*** && ***REMOVED***.map(t => ({label: t.name, value: t.id}))
        return taxonomyValuesOptions
    }


    renderFilters() {
        const {
            attributes: {
                type,
                taxonomy,
                categories,

            }
        } = this.props
        return (<PanelBody title={__("Filter")}>
            <PanelRow>
                <SelectControl
                    label={__("Post Type")} options={this.typeOptions()}
                    value={type}
                    onChange={this.onTypeChanged}/>
            </PanelRow>
            <PanelRow>

                <SelectControl label={__("Use a taxonomy filter ")} options={this.***REMOVED***()}
                               value={taxonomy}
                               onChange={this.***REMOVED***}
                />
            </PanelRow>
            {taxonomy != 'none' && this.***REMOVED***().map(o => {
                return <PanelRow><***REMOVED***
                    label={o.label}
                    onChange={(checked) => this.***REMOVED***(checked, o.value)}
                    checked={categories.indexOf(o.value) > -1}
                /></PanelRow>
            })}
        </PanelBody>)

    }
}


export class BlockEditWithAPIMetadata extends ComponentWithSettings {
    constructor(props) {
        super(props);
    }

    ***REMOVED***() {

        apiFetch({path: '/dg/v1/settings'}).then((settingsData) => {
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
                        label: a.name,
                        value: a.instance[0].vipAddress,
                        settings: a.instance[0]
                    })), 
                    {label: 'CSV', value: 'csv'}] : [{label: 'CSV', value: 'csv'}] 
                    
                    this.setState({
                      react_ui_url: settingsData["react_ui_url"] + '/' + window._page_locale,
                      react_api_url: settingsData["react_api_url"],
                      apache_superset_url: settingsData["apache_superset_url"],
                      site_language: settingsData["site_language"],
                      current_language: new ***REMOVED***(document.location.search).get("edit_lang"),
                      apps
                  }, () => {
                  this.loadMetadata()
                  })
              })
              .catch(function (response) {

              })

        });


    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        super.***REMOVED***(prevProps, prevState, snapshot)
        const {attributes: {app}} = this.props
        const {attributes: {app: prevAPP}} = prevProps


        if (app != prevAPP) {
            this.loadMetadata()
        }
    }

  

    ***REMOVED***(url, datId) {
        let app = this.props.attributes.app || this.props.layer.app
        let datasetId = datId || this.props.attributes.datasetId        
       
        if (this.props.layer) {
            app = this.props.layer.app
            datasetId = this.props.layer.datasetId           
        }


        if (isSupersetAPI(app, this.state.apps)) {
            return `${url}?datasetId=${datasetId}`
        }

        return url
    }

    _loadMetadata(app, datasetId) {
         if (app != "csv") {
            fetch(this.***REMOVED***(`/api/${app}/dimensions`, datasetId))                
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    } else {

                        return response.json()
                    }
                })
                .then(data => {
                    this.setState({
                        ...this.state,
                        dimensions: [{"label": __("None"), "value": "none"}, ...***REMOVED***(data)]
                    })
                })
                .catch(function (response) {
                    console.log("Error when loading dimensions")
                })


            fetch(this.***REMOVED***(`/api/${app}/filters`, datasetId))
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json()
                })
                .then(data => {

                    const options = data.map(f => ({...f, value: f.param}))
                    this.setState({...this.state, filters: options})

                })
                .catch(function (response) {
                    console.log("Error when loading filters", response)
                })

            fetch(this.***REMOVED***(`/api/${app}/measures`, datasetId))
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json()
                })
                .then(data => {

                    this.setState({...this.state, measures: ***REMOVED***(data)})
                })
                .catch(function (response) {
                    console.log("Error when loading measures")
                })

            fetch(this.***REMOVED***(`/api/${app}/categories`, datasetId))
                .then(response => {
                    console.log('***REMOVED***')
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json()
                })
                .then(data => {
                        this.setState({...this.state, categories: ***REMOVED***(data)})
                    }
                )
                .catch(function (response) {
                    console.log("Error when getting categories", response)
                })
        }

        if (isSupersetAPI(app, this.state.apps)) {
            this.loadDatasets(app)
        }
    }

    loadMetadata(newDatasetId) {
       const {attributes: {app}} = this.props
       this._loadMetadata(app, newDatasetId || this.props.attributes.datasetId)       
    }   

    loadDatasets(app) {   
        if (!this.state.apache_superset_url || this.state.apache_superset_url == '' || !isSupersetAPI(app, this.state.apps))    	 
            return
        
          fetch(`/api/${app}/datasets`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json()
            })
            .then(data => {
                this.setState({...this.state, datasets: data})
            })
            .catch(function (response) {
                console.log("Error when loading datasets")
            })
    }    
}

export default SizeConfig

