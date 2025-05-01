import React from 'react';
import { __ } from '@wordpress/i18n';
import { ***REMOVED***, PanelBody, PanelRow, SelectControl, TextControl } from '@wordpress/components';
import { Component } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch';
import { togglePanel } from './Util';
import { ***REMOVED***, isSupersetAPI } from './APIutils'
import { subscribe, select } from '@wordpress/data';
import { DgSettings, ***REMOVED***, Taxonomies, Taxonomy, Wp_Types } from './types';

export interface ***REMOVED*** {
    height: number;
    setAttributes: (attributes: any) => void;
    panelStatus: any;
    initialOpen?: boolean;
}

export const SizeConfig = ({ height, setAttributes, panelStatus, initialOpen = false }: ***REMOVED***) => {
    return (<PanelBody initialOpen={panelStatus ? panelStatus["SIZE"] : initialOpen}
        onToggle={() => togglePanel("SIZE", panelStatus, setAttributes)}
        title={__("Size")}>
        <PanelRow>
            <TextControl
                size={10}
                label="Height"
                value={height}
                onChange={(height) => setAttributes({ height: height ? parseInt(height) : 0 })}
            />
        </PanelRow>
    </PanelBody>)

}
export type ComponentWithSettingsProps = {
    attributes: any;
    setAttributes: (attributes: any) => void;
}

export type ComponentWithSettingsState = {
    react_ui_url?: string;
    react_api_url?: string | null;
    apache_superset_url?: string | boolean | null;
    site_language?: string;
    current_language?: string;
    previewMode?: string;
}

export class ComponentWithSettings<T extends ComponentWithSettingsProps, U extends ComponentWithSettingsState> extends Component<T, U> {
    iframe: React.RefObject<***REMOVED***>;
    unsubscribe: () => void;

    constructor(props: T) {
        super(props);
        this.state = {
            react_ui_url: '',
            react_api_url: null,
            apache_superset_url: null,
            site_language: '',
            current_language: '',
        } as U

        window.***REMOVED***("message", (event) => {

            if (event.data.type === '***REMOVED***' && event.data.value === true) {
                if (this.iframe.current) {
                    console.log("-----------Sending message -----------")
                    this.iframe.current.contentWindow?.postMessage(({ messageType: 'component-attributes', ...this.props.attributes }), "*")
                }
            }
        }, false);
        this.iframe = React.createRef();
        this.unsubscribe = subscribe(() => {
            const ***REMOVED*** = select("core/editor").getDeviceType();
            if (***REMOVED*** !== this.state.previewMode) {
                this.setState({previewMode: ***REMOVED*** });
            }
        });
    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        if (this.iframe.current?.contentWindow) {
            this.iframe.current.contentWindow.postMessage(({messageType: 'component-attributes', ...this.props.attributes}), "*")
        }
    }

    ***REMOVED***() {
        apiFetch<DgSettings>({ path: '/dg/v1/settings' }).then((data) => {
            this.setState({
                react_ui_url: data["react_ui_url"] + '/' + window._page_locale,
                react_api_url: data["react_api_url"],
                apache_superset_url: data["apache_superset_url"],
                site_language: data["site_language"],
                current_language: new ***REMOVED***(document.location.search).get("edit_lang") || ''
            });
        });
    }

    ***REMOVED***() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

export type BlockEditWithFiltersProps = {
    attributes: any;
    setAttributes: (attributes: any) => void;
}


export interface BlockEditWithFiltersState extends ComponentWithSettingsState {
    ***REMOVED***: Taxonomy[] | null;
    types: Wp_Types[] | null;
    taxonomies: Taxonomies | null;
    loading: boolean;
}

export class ***REMOVED***<T extends BlockEditWithFiltersProps = BlockEditWithFiltersProps, S extends BlockEditWithFiltersState = BlockEditWithFiltersState> extends ComponentWithSettings<T, S> {

    constructor(props: T) {
        super(props);
        this.state = {
            react_ui_url: '',
            react_api_url: null,
            apache_superset_url: null,
            site_language: '',
            current_language: '',
            ***REMOVED***: [],
            types: null,
            taxonomies: null,
            loading: true
        } as unknown as S;
        this.onTypeChanged = this.onTypeChanged.bind(this);
        this.***REMOVED*** = this.***REMOVED***.bind(this);
        this.***REMOVED*** = this.***REMOVED***.bind(this);
        this.***REMOVED*** = this.***REMOVED***.bind(this);
    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        const {
            attributes: {
                type, taxonomy },
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
            attributes: {
                taxonomy },
        } = this.props;


        if (taxonomy != 'none') {
            this.***REMOVED***()

        }

    }

    onTypeChanged(value) {
        const { setAttributes } = this.props
        setAttributes({ categories: [] })
        setAttributes({ taxonomy: 'none' })
        setAttributes({ type: value })
    }

    ***REMOVED***(value) {
        const { setAttributes } = this.props
        setAttributes({ categories: [] })
        setAttributes({ taxonomy: value })

    }

    ***REMOVED***(checked, value) {

        const { setAttributes, attributes: { categories } } = this.props
        if (!checked) {
            setAttributes({ categories: categories.filter(i => i != value) })
        } else {
            let newCate = [...categories]
            newCate.push(value)
            setAttributes({ categories: newCate })
        }

    }

    ***REMOVED***() {
        const {
            attributes: {
                taxonomy },
        } = this.props;

        apiFetch<Taxonomy[]>({
            path: '/wp/v2/taxonomies/' + taxonomy + '?per_page=100',
        }).then(data => {

            this.setState({ ***REMOVED***: data });
        });
    }

    getTaxonomies() {

        apiFetch<Taxonomies>({
            path: '/wp/v2/taxonomies?per_page=100',
        }).then(data => {
            this.setState({
                taxonomies: data,
            });
        });
    }

    getTypes() {
        apiFetch<Wp_Types[]>({
            path: '/wp/v2/types?per_page=100',
        }).then(data => {
            this.setState({
                types: data, loading: false
            });
        });
    }

    typeOptions() {
        const { types } = this.state
        const typeOptions = types ? Object.keys(types)
            .filter(k => ['page', 'attachment', 'wp_block']
                .indexOf(k) == -1).map(k => ({
                    slug: types[k].slug, label: types[k].name, value: types[k].rest_base
                })) : []

        return typeOptions

    }

    ***REMOVED***() {
        const {
            attributes: {
                type,
            },
        } = this.props;
        const { types, taxonomies } = this.state
        let slug: string;
        if (types) {
            slug = this.typeOptions().filter(t => t.value == type)[0].slug

            const ***REMOVED*** = types && taxonomies ? Object.keys(taxonomies)
                .filter(i => taxonomies[i].types.indexOf(slug) > -1).map(k => ({
                    label: types[slug].name + ' -> ' + taxonomies[k].name, value: taxonomies[k].rest_base
                })) : []

            return [{ label: 'None', value: 'none' }, ...***REMOVED***]
        } else {
            return []
        }
    }

    ***REMOVED***() {
        const { ***REMOVED*** } = this.state
        const taxonomyValuesOptions = ***REMOVED*** && ***REMOVED***.map(t => ({ label: t.name, value: t.id }))
        return taxonomyValuesOptions || []
    }


    renderFilters() {
        const {
            attributes: {
                type, taxonomy, categories,

            }
        } = this.props
        return (<PanelBody title={__("Filter")}>
            <PanelRow>
                <SelectControl
                    label={__("Post Type")} options={this.typeOptions()}
                    value={type}
                    onChange={this.onTypeChanged} />
            </PanelRow>
            <PanelRow>

                <SelectControl label={__("Use a taxonomy filter ")} options={this.***REMOVED***()}
                    value={taxonomy}
                    onChange={this.***REMOVED***}
                />
            </PanelRow>
            {(taxonomy != 'none' && this.***REMOVED***().length > 0) && this.***REMOVED***().map(o => {
                return <PanelRow><***REMOVED***
                    label={o.label}
                    onChange={(checked) => this.***REMOVED***(checked, o.value)}
                    checked={categories.indexOf(o.value) > -1}
                /></PanelRow>
            })}
        </PanelBody>)

    }
}

export type BlockEditWithAPIMetadataProps = {
    attributes: {
        app: string;
        ***REMOVED***?: string;
    };
    setAttributes: (attributes: any) => void;
}

export type BlockEditWithAPIMetadataState = {
    apps: any[];
    datasets?: any[];
    dimensions?: any[];
    filters?: any[];
    measures?: any[];
    categories?: any[];
} & ComponentWithSettingsState;


export class BlockEditWithAPIMetadata<T extends BlockEditWithAPIMetadataProps = BlockEditWithAPIMetadataProps, S extends BlockEditWithAPIMetadataState = BlockEditWithAPIMetadataState> extends ComponentWithSettings<T, S> {
    constructor(props: T) {
        super(props);
    }

    ***REMOVED***() {
        apiFetch<DgSettings>({
            path: '/dg/v1/settings'
        }).then((settingsData) => {
            fetch(`/api/registry/eureka/apps`, {
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then((response: Response) => response.json() as Promise<***REMOVED***>)
                .then(data => {
                    const apps = data.applications ? [...data.applications.application
                        .filter(a => a.instance[0].metadata.type === 'data')
                        .map(a => ({
                            label: a.name, value: a.instance[0].vipAddress, settings: a.instance[0]
                        })), {
                        label: 'CSV', value: 'csv'
                    }] : [{
                        label: 'CSV', value: 'csv'
                    }];

                    this.setState({
                        react_ui_url: settingsData["react_ui_url"] + '/' + window._page_locale,
                        react_api_url: settingsData["react_api_url"],
                        apache_superset_url: settingsData["apache_superset_url"],
                        site_language: settingsData["site_language"],
                        current_language: new ***REMOVED***(document.location.search).get("edit_lang") || "",
                        apps
                    }, () => {

                        const { app, ***REMOVED*** } = this.props.attributes;

                        if (isSupersetAPI(app, this.state.apps)) {
                            this.loadDatasets(app)
                        }

                        if (app && app != 'none') {
                            this.loadMetadata(app, ***REMOVED***);
                        }
                    });
                })
                .catch(() => {
                    console.log("Error when loading apps");
                });
        });
    }
    ***REMOVED***(prevProps: BlockEditWithAPIMetadataProps, prevState: any, snapshot?: any) {
        super.***REMOVED***(prevProps, prevState, snapshot);
        const {
            attributes: {
                app,
                ***REMOVED***
            }
        } = this.props;
        const {
            attributes: {
                ***REMOVED***: prevDvzProxyDatasetId,
                app: prevAPP
            }
        } = prevProps;


        if (app != prevAPP) { //if app changes we shoudl reload metadta


            if (isSupersetAPI(app, this.state.apps)) { //if app is superset proxy an additional step is added
                this.loadDatasets(app)
                if (***REMOVED***) {
                    this.loadMetadata(app, ***REMOVED***)
                }
            } else {
                this.loadMetadata(app, ***REMOVED***);
            }
        } else {//app wasn't changed

            if (***REMOVED*** != prevDvzProxyDatasetId) {
                this.loadMetadata(app, ***REMOVED***);
            }

        }
    }


    ***REMOVED***() {
        const { app, ***REMOVED*** } = this.props.attributes;
        fetch(`/api/${app}/cacheEvict?***REMOVED***=${***REMOVED***}`).then(() => {
            this.loadMetadata(app, ***REMOVED***)
        })

    }


    loadDatasets(app) {
        fetch(`/api/${app}/datasets`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    datasets: data
                });
            })
            .catch(() => {
                console.log("Error when loading datasets");
            });
    }


    loadMetadata(app: string, ***REMOVED***?: string) {
        if (app == 'csv') {
            return;
        }


        const dimensionsUrl = `/api/${app}/dimensions${***REMOVED*** ? `?***REMOVED***=${***REMOVED***}` : ''}`
        const measuresUrl = `/api/${app}/measures${***REMOVED*** ? `?***REMOVED***=${***REMOVED***}` : ''}`
        const filtersUrl = `/api/${app}/filters${***REMOVED*** ? `?***REMOVED***=${***REMOVED***}` : ''}`
        const categoriesUrl = `/api/${app}/categories${***REMOVED*** ? `?***REMOVED***=${***REMOVED***}` : ''}`

        if (app != "csv") {
            fetch(dimensionsUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    } else {

                        return response.json()
                    }
                })
                .then(data => {

                    this.setState({
                        dimensions: [{ "label": __("None"), "value": "none" }, ...***REMOVED***(data)]
                    })
                })
                .catch(function () {
                    console.log("Error when loading dimensions")
                })


            fetch(filtersUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json()
                })
                .then(data => {

                    const options = data.map(f => ({ ...f, value: f.param }))
                    this.setState({ filters: options })

                })
                .catch(function (response) {
                    console.log("Error when loading filters", response)
                })

            fetch(measuresUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json()
                })
                .then(data => {
                    ***REMOVED***.setItem(`measures_${app}`, JSON.stringify(***REMOVED***(data)))
                    debugger
                    this.setState({ measures: ***REMOVED***(data) })
                })
                .catch(function () {
                    console.log("Error when loading measures")
                })

            fetch(categoriesUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json()
                })
                .then(data => {
                    ***REMOVED***.setItem(`categories_${app}`, JSON.stringify(data))
                    this.setState({ categories: ***REMOVED***(data) })
                }
                )
                .catch(function (response) {
                    console.log("Error when getting categories", response)
                })
        }

    }


    fetchData(url: string, stateKey: string, transformData: (data: any) => any) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(data => {
                // TODO: Check if the data is an array
                // @ts-ignore
                this.setState({
                    [stateKey]: transformData(data)
                });
            })
            .catch(() => {
                console.log(`Error when loading ${stateKey}`);
            });
    }

}

export default SizeConfig
