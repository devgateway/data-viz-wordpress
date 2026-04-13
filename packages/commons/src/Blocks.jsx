import { __ } from '@wordpress/i18n';
import {
    CheckboxControl,
    PanelBody,
    PanelRow,
    SelectControl,
    TextControl,
    Spinner,
    SearchControl,
    __experimentalText as Text,
    __experimentalScrollable as Scrollable
} from '@wordpress/components';
import { Component } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { togglePanel } from "./Util";

import { getTranslatedOptions } from './APIutils';
import { isSupersetAPI } from "./APIutils";


export const SizeConfig = ({ height, setAttributes, panelStatus, initialOpen }) => {
    return (<PanelBody initialOpen={panelStatus ? panelStatus["SIZE"] : initialOpen}
        onToggle={e => togglePanel("SIZE", panelStatus, setAttributes)}
        title={__("Size")}>
        <PanelRow>
            <TextControl
                size={10}
                label="Height"
                value={height}
                onChange={(height) => setAttributes({ height: height ? parseInt(height) : 0 })}
            />
        </PanelRow>
    </PanelBody>);

};

export class ComponentWithSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            react_ui_url: ''
        };

        window.addEventListener("message", (event) => {
            if (event.data.type === 'componentReady' && event.data.value === true) {
                if (this.iframe.current) {
                    console.log("-----------Sending message -----------");
                    this.iframe.current.contentWindow.postMessage(({ messageType: 'component-attributes', ...this.props.attributes }), "*");
                }
            }
        }, false);
        this.iframe = React.createRef();
        this.unsubscribe = wp.data.subscribe(() => {
            const newPreviewMode = wp.data.select("core/editor").getDeviceType();
            if (newPreviewMode !== this.state.previewMode) {
                this.setState({ previewMode: newPreviewMode });
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.iframe.current?.contentWindow) {
            this.iframe.current.contentWindow.postMessage(({ messageType: 'component-attributes', ...this.props.attributes }), "*");
        }
    }

    componentDidMount() {
        apiFetch({ path: '/dg/v1/settings' }).then((data) => {
            this.setState({
                react_ui_url: data["react_ui_url"] + '/' + window._page_locale,
                react_api_url: data["react_api_url"],
                apache_superset_url: data["apache_superset_url"],
                site_language: data["site_language"],
                current_language: new URLSearchParams(document.location.search).get("edit_lang"),
                landing_page_url: data["landing_page_url"] || ''
            }, () => {
                if (this.onSettingsLoaded) {
                    this.onSettingsLoaded();
                }
            });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    renderWordpressSource() {
        const { setAttributes, attributes: { wordpressSourceType, wordpressSource } } = this.props;
        const hasLandingUrl = !!this.state.landing_page_url;
        const sourceType = wordpressSourceType || 'internal';
        return (
            <PanelBody title={__('WordPress Source')}>
                <PanelRow>
                    <SelectControl
                        label={__('Source')}
                        value={sourceType}
                        options={[
                            { label: __('Internal (this site)'), value: 'internal' },
                            {
                                label: hasLandingUrl
                                    ? __('Landing Page')
                                    : __('Landing Page (not configured)'),
                                value: 'landing',
                                disabled: !hasLandingUrl,
                            },
                            { label: __('Custom URL'), value: 'custom' },
                        ]}
                        onChange={(value) => {
                            if (value === 'landing' && !hasLandingUrl) return;
                            const landingUrl = value === 'landing'
                                ? this.state.landing_page_url.replace(/\/+$/, '') + '/wp/wp-json'
                                : '';
                            setAttributes({
                                wordpressSourceType: value,
                                wordpressSource: landingUrl,
                            });
                        }}
                    />
                </PanelRow>
                {sourceType === 'custom' && (
                    <PanelRow>
                        <TextControl
                            label={__('WordPress URL')}
                            help={__('Enter the base URL of the WordPress instance to load post types, taxonomies and configuration from.')}
                            value={wordpressSource || ''}
                            onChange={(wordpressSource) => setAttributes({ wordpressSource })}
                            placeholder="https://example.com/wp/wp-json"
                        />
                    </PanelRow>
                )}
            </PanelBody>
        );
    }
}
export class BlockEditWithFilters extends ComponentWithSettings {

    constructor(props) {
        super(props);
        this.state = {
            taxonomyValues: [],
            sortingTaxonomyValues: [],
            types: null,
            taxonomies: null,
            loading: false,
            defaultValues: [],
            defaultValuesSearchTerm: '',
        };
        this.onTypeChanged = this.onTypeChanged.bind(this);
        this.onTaxonomyChanged = this.onTaxonomyChanged.bind(this);
        this.onSortingTaxonomyChanged = this.onSortingTaxonomyChanged.bind(this);
        this.getTaxonomyValues = this.getTaxonomyValues.bind(this);
        this.onCategoryChanged = this.onCategoryChanged.bind(this);
        this.getSortingTaxonomyValues = this.getSortingTaxonomyValues.bind(this);
        this.onDefaultCategoryChanged = this.onDefaultCategoryChanged.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            setAttributes, attributes: {
                type, taxonomy, count, sortingTaxonomy, wordpressSource, wordpressSourceType
            },
        } = this.props;

        super.componentDidUpdate(prevProps, prevState, snapshot);
        if (prevProps.attributes) {
            if (type !== prevProps.attributes.type) {
            }
            if (taxonomy !== prevProps.attributes.taxonomy) {
                this.getTaxonomyValues();
            }
            if (sortingTaxonomy !== prevProps.attributes.sortingTaxonomy) {
                this.getSortingTaxonomyValues();
            }
            const sourceChanged =
                wordpressSourceType !== prevProps.attributes.wordpressSourceType ||
                wordpressSource !== prevProps.attributes.wordpressSource;
            if (sourceChanged) {
                this.getTypes();
                this.getTaxonomies();
                this.getTaxonomyValues();
                this.getSortingTaxonomyValues();
            }
        }

    }

    componentDidMount() {
        super.componentDidMount();
        // Data loading is deferred to onSettingsLoaded() to ensure
        // landing_page_url is available before the first fetch.
    }

    onSettingsLoaded() {
        this.getTypes();
        this.getTaxonomies();

        const {
            attributes: {
                taxonomy, sortingTaxonomy
            },
        } = this.props;

        if (taxonomy && taxonomy !== 'none') {
            this.getTaxonomyValues();
        }

        if (sortingTaxonomy && sortingTaxonomy !== 'none') {
            this.getSortingTaxonomyValues();
        }
    }

    onTypeChanged(value) {
        const { setAttributes } = this.props;
        setAttributes({ categories: [] });
        setAttributes({ taxonomy: 'none' });
        setAttributes({ type: value });
    }

    onTaxonomyChanged(value) {
        const { setAttributes } = this.props;
        setAttributes({ categories: [] });
        setAttributes({ taxonomy: value });


    }

    onSortingTaxonomyChanged(value) {
        const { setAttributes } = this.props;
        setAttributes({ sortFirstBy: 'none' });
        setAttributes({ sortingTaxonomy: value });
    }

    onDefaultValuesChanged(value, filterType = 'multi-select') {
        const { setAttributes } = this.props;
        if (filterType === 'multi-select') {
            setAttributes({ defaultValues: value });
        } else {
            setAttributes({ defaultValues: [value] });
        }
    }

    onCategoryChanged(checked, value) {

        const { setAttributes, attributes: { categories } } = this.props;
        if (!checked) {
            setAttributes({ categories: categories.filter(i => i != value) });
        } else {
            let newCate = [...categories];
            newCate.push(value);
            setAttributes({ categories: newCate });
        }

    }

    onDefaultCategoryChanged(value, filterType = 'multi-select', checked) {
        const { setAttributes, attributes: { defaultValues } } = this.props;

        if (filterType === 'multi-select') {
            if (!checked) {
                setAttributes({ defaultValues: defaultValues.filter(i => i !== value) });
            } else {
                setAttributes({ defaultValues: [...defaultValues, value] });
            }
        } else {
            // For single-select, 'checked' parameter is not used, 'value' is the selected value
            setAttributes({ defaultValues: [value] });
        }
    }


    apiFetchFromSource(path) {
        const { attributes: { wordpressSourceType, wordpressSource } } = this.props;
        if (wordpressSourceType === 'landing') {
            const base = (this.state.landing_page_url || '').replace(/\/+$/, '');
            if (base) {
                const wpUrl = base + '/wp';
                return fetch(wpUrl + '/wp-json' + path).then(r => r.json());
            }
        }
        if (wordpressSourceType === 'custom' && wordpressSource) {
            const base = wordpressSource.replace(/\/+$/, '');
            return fetch(base + '/wp-json' + path).then(r => r.json());
        }
        return wp.apiFetch({ path });
    }

    getTaxonomyValues() {
        const {
            attributes: {
                taxonomy,
            },
        } = this.props;

        if (!taxonomy || taxonomy === 'none') {
            this.setState({ loading: false, taxonomyValues: [] });
            return;
        }

        this.setState({ loading: true });
        this.apiFetchFromSource('/wp/v2/' + taxonomy + '?per_page=100').then(data => {
            this.setState({ loading: false, taxonomyValues: Array.isArray(data) ? data : [] });
        }).catch(() => {
            this.setState({ loading: false, taxonomyValues: [] });
        });
    }

    getSortingTaxonomyValues() {
        const {
            attributes: {
                sortingTaxonomy
            },
        } = this.props;

        if (!sortingTaxonomy || sortingTaxonomy === 'none') {
            this.setState({ sortingTaxonomyValues: [] });
            return;
        }

        this.apiFetchFromSource('/wp/v2/' + sortingTaxonomy + '?per_page=100').then(data => {
            this.setState({ sortingTaxonomyValues: Array.isArray(data) ? data : [] });
        }).catch(() => {
            this.setState({ sortingTaxonomyValues: [] });
        });
    }

    getTaxonomies() {
        this.apiFetchFromSource('/wp/v2/taxonomies?per_page=100').then(data => {
            this.setState({
                taxonomies: data,
            });
        });
    }

    getTypes() {
        this.apiFetchFromSource('/wp/v2/types?per_page=100').then(data => {
            this.setState({ types: data, loading: false });
        });
    }

    typeOptions() {
        const {
            setAttributes, attributes: {
                count, type, taxonomy, category
            },
        } = this.props;
        const { types, taxonomies, taxonomyValues } = this.state;
        const typeOptions = types ? Object.keys(types)
            .filter(k => ['page', 'attachment', 'wp_block']
                .indexOf(k) === -1).map(k => ({
                    slug: types[k].slug, label: types[k].name, value: types[k].rest_base
                })) : [];

        return typeOptions;

    }

    taxonomyOptions() {
        const {
            attributes: {
                type,
            },
        } = this.props;
        const { types, taxonomies, taxonomyValues } = this.state;
        let slug;

        if (types) {
            slug = this.typeOptions().filter(t => t.value == type)[0]?.slug;

            const taxonomyOptions = types && taxonomies ? Object.keys(taxonomies)
                .filter(i => taxonomies[i].types.indexOf(slug) > -1).map(k => ({
                    label: types[slug].name + ' -> ' + taxonomies[k].name, value: taxonomies[k].rest_base
                })) : [];

            return [{ label: 'None', value: 'none' }, ...taxonomyOptions];
        } else {
            return [];
        }
    }

    categoriesOptions() {
        const { types, taxonomies, taxonomyValues } = this.state;
        const taxonomyValuesOptions = taxonomyValues && taxonomyValues.map(t => ({ label: t.name, value: t.id }));
        return taxonomyValuesOptions;
    }

    sortingCategoriesOptions() {
        const { sortingTaxonomyValues } = this.state;
        const taxonomyValuesOptions = sortingTaxonomyValues && sortingTaxonomyValues.map(t => ({ label: t.name, value: t.id }));
        return taxonomyValuesOptions;
    }


    renderFilters(title) {
        const {
            setAttributes,
            attributes: {
                type, taxonomy, categories, isCountryFilter

            }
        } = this.props;
        return (<PanelBody title={__(title || "Filter")}>
            <PanelRow>
                <SelectControl
                    label={__("Post Type")} options={this.typeOptions()}
                    value={type}
                    onChange={this.onTypeChanged} />
            </PanelRow>

            <PanelRow>
                <SelectControl label={isCountryFilter ? __("Select Taxonomy with Countries") : __("Use a taxonomy filter ")} options={this.taxonomyOptions()}
                    value={taxonomy}
                    help={isCountryFilter ? __("Select a taxonomy that contains countries") : null}
                    onChange={this.onTaxonomyChanged}
                />
            </PanelRow>
            {this.state.loading && taxonomy && taxonomy !== 'none' ? (
                <PanelRow>
                    <Spinner />
                </PanelRow>
            ) : (
                taxonomy && taxonomy !== 'none' && this.categoriesOptions().map(o => {
                    return <PanelRow><CheckboxControl
                        label={o.label}
                        onChange={(checked) => this.onCategoryChanged(checked, o.value)}
                        checked={categories.indexOf(o.value) > -1}
                    /></PanelRow>;
                })
            )}
        </PanelBody>);

    }

    renderSorting(showTaxonomy = true) {
        const {
            setAttributes,
            attributes: {
                sortingTaxonomy, sortFirstBy

            }
        } = this.props;
        return (<PanelBody title={__("Sorting Configuration")}>
            {showTaxonomy && (
                <PanelRow>

                    <SelectControl label={__("Select Taxonomy with the sorting")} options={this.taxonomyOptions()}
                        value={sortingTaxonomy}
                        help={__("Select a taxonomy that contains the sorting")}
                        onChange={this.onSortingTaxonomyChanged}
                    />
                </PanelRow>
            )}

            <PanelRow>
                {(sortingTaxonomy !== 'none' || sortingTaxonomy !== null) && (
                    <SelectControl
                        label={__("Sort First By")}
                        options={[{ label: 'None', value: 'none' }, ...this.sortingCategoriesOptions()]}
                        value={sortFirstBy}
                        onChange={(value) => {
                            setAttributes({ sortFirstBy: value });
                        }}
                    />
                )}

            </PanelRow>
        </PanelBody>);

    }


    renderSelectDefaultValues(filterType = 'multi-select') {
        const { setAttributes, attributes: { defaultValues, taxonomy } } = this.props;

        return (
            <>

                {filterType === 'multi-select' ? (
                    <PanelBody title={__("Default Values")}>
                        <Text style={{ marginBottom: 20 }}>
                            {__("Select the default values for the filter")}
                        </Text>
                        <SearchControl
                            __nextHasNoMarginBottom
                            style={{ marginTop: 20 }}
                            label={__("Search categories")}
                            value={this.state.defaultValuesSearchTerm}
                            onChange={(searchTerm) => this.setState({ defaultValuesSearchTerm: searchTerm })}
                            placeholder={__("Search...")}
                        />
                        <Scrollable style={{ maxHeight: 200, width: '100%', marginTop: 10 }}>
                            {
                                taxonomy && taxonomy !== 'none' && this.categoriesOptions()
                                    .filter(o => o.label.toLowerCase().includes(this.state.defaultValuesSearchTerm.toLowerCase()))
                                    .map(o => {
                                        return <PanelRow key={o.value}><CheckboxControl
                                            label={o.label}
                                            onChange={(checked) => this.onDefaultCategoryChanged(o.value, filterType, checked)}
                                            checked={defaultValues.indexOf(o.value) > -1}
                                        /></PanelRow>;
                                    })
                            }
                        </Scrollable>
                    </PanelBody>
                ) : (
                    <PanelBody title={__("Default Value")}>
                        <Text style={{ marginBottom: 20 }}>
                            {__("Select the default value for the filter")}
                        </Text>
                        <SelectControl
                            options={[{ label: 'None', value: 'none' }, ...this.categoriesOptions()]}
                            value={defaultValues[0]} onChange={(value) => {
                                this.onDefaultCategoryChanged(value, filterType);
                            }} />
                    </PanelBody>
                )
                }
            </>
        );
    }
}


export class BlockEditWithAPIMetadata extends ComponentWithSettings {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        apiFetch({
            path: '/dg/v1/settings'
        }).then((settingsData) => {
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
                        current_language: new URLSearchParams(document.location.search).get("edit_lang"),
                        apps
                    }, () => {

                        const { app, dvzProxyDatasetId } = this.props.attributes;

                        if (isSupersetAPI(app, this.state.apps)) {
                            this.loadDatasets(app);
                        }

                        if (app && app != 'none') {
                            this.loadMetadata(app, dvzProxyDatasetId);
                        }
                    });
                })
                .catch(() => {
                    console.log("Error when loading apps");
                });
        });
    }

    componentDidUpdate(prevProps) {
        super.componentDidUpdate(prevProps);
        const {
            attributes: {
                app,
                dvzProxyDatasetId
            }
        } = this.props;
        const {
            attributes: {
                dvzProxyDatasetId: prevDvzProxyDatasetId,
                app: prevAPP
            }
        } = prevProps;


        if (app != prevAPP) { //if app changes we shoudl reload metadta


            if (isSupersetAPI(app, this.state.apps)) { //if app is superset proxy an additional step is added
                this.loadDatasets(app);
                if (dvzProxyDatasetId) {
                    this.loadMetadata(app, dvzProxyDatasetId);
                }
            } else {
                this.loadMetadata(app);
            }
        } else {//app wasn't changed

            if (dvzProxyDatasetId != prevDvzProxyDatasetId) {
                this.loadMetadata(app, dvzProxyDatasetId);
            }

        }
    }


    evictSuperSetCache() {
        const { app, dvzProxyDatasetId } = this.props.attributes;
        fetch(`/api/${app}/cacheEvict?dvzProxyDatasetId=${dvzProxyDatasetId}`).then(() => {
            this.loadMetadata(app, dvzProxyDatasetId);
        });

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


    loadMetadata(app, dvzProxyDatasetId) {
        if (app == 'csv') {
            return;
        }


        const dimensionsUrl = `/api/${app}/dimensions${dvzProxyDatasetId ? `?dvzProxyDatasetId=${dvzProxyDatasetId}` : ''}`;
        const measuresUrl = `/api/${app}/measures${dvzProxyDatasetId ? `?dvzProxyDatasetId=${dvzProxyDatasetId}` : ''}`;
        const filtersUrl = `/api/${app}/filters${dvzProxyDatasetId ? `?dvzProxyDatasetId=${dvzProxyDatasetId}` : ''}`;
        const categoriesUrl = `/api/${app}/categories${dvzProxyDatasetId ? `?dvzProxyDatasetId=${dvzProxyDatasetId}` : ''}`;

        if (app != "csv") {
            fetch(dimensionsUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    } else {

                        return response.json();
                    }
                })
                .then(data => {

                    this.setState({
                        dimensions: [{ "label": __("None"), "value": "none" }, ...getTranslatedOptions(data)]
                    });
                })
                .catch(function (response) {
                    console.log("Error when loading dimensions");
                });


            fetch(filtersUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json();
                })
                .then(data => {

                    const options = data.map(f => ({ ...f, value: f.param }));
                    this.setState({ filters: options });

                })
                .catch(function (response) {
                    console.log("Error when loading filters", response);
                });

            fetch(measuresUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    sessionStorage.setItem(`measures_${app}`, JSON.stringify(getTranslatedOptions(data)));
                    this.setState({ measures: getTranslatedOptions(data) });
                })
                .catch(function (response) {
                    console.log("Error when loading measures");
                });

            fetch(categoriesUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    sessionStorage.setItem(`categories_${app}`, JSON.stringify(data));
                    this.setState({ categories: getTranslatedOptions(data) });
                }
                )
                .catch(function (response) {
                    console.log("Error when getting categories", response);
                });
        }

    }


    fetchData(url, stateKey, transformData) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then(data => {

                this.setState({
                    [stateKey]: transformData(data)
                });
            })
            .catch(() => {
                console.log(`Error when loading ${stateKey}`);
            });
    }

}

export default SizeConfig;
