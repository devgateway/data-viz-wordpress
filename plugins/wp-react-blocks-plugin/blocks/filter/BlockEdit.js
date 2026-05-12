import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, SelectControl, TextControl, ToggleControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockEditWithAPIMetadata } from '@devgateway/dvz-wp-commons'
import { isSupersetAPI } from '@devgateway/dvz-wp-commons';
import { useEffect } from "react";
import { DataFilters } from '@devgateway/dvz-wp-commons';
const DEFAULT_VALUE_INPUT = 'DEFAULT_VALUE_INPUT'
const LOWEST_VALUE = 'LOWEST_VALUE'
const HIGHEST_VALUE = 'HIGHEST_VALUE'

const CategoricalFilter = ({ value, index, items, onUpdateFilterValue }) => {
    if (items) {
        const sortedItems = items.sort(function (a, b) {
            if (a.position !== undefined && b.position !== undefined) {
                return a.position - b.position
            }

            let aValue = a.value ? a.value.toLowerCase() : "";
            let bValue = b.value ? b.value.toLowerCase() : "";
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;

        });

        return sortedItems.map(v => <PanelRow> <ToggleControl label={v.value} checked={value.indexOf(v.id) > -1}
            onChange={e => {
                onUpdateFilterValue(v.id, index)
            }} /></PanelRow>)
    } else {
        return null;
    }
}

const DefaultSelection = ({ defaultValues, items, filterType, onToggle, onSelect }) => {
    if (!items) {
        return null;
    }

    const sortedItems = items.sort(function (a, b) {
        if (a.position !== undefined && b.position !== undefined && a.position !== b.position) {
            return a.position - b.position
        }

        let aValue = a.value ? a.value.toLowerCase() : "";
        let bValue = b.value ? b.value.toLowerCase() : "";
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });

    const defaultsArr = (defaultValues || '').toString().split(',').map(v => v.trim()).filter(v => v.length > 0);

    if (filterType === 'multi-select') {
        return (
            <>
                {sortedItems.map(v => {
                    const idStr = typeof v.id === 'boolean' ? (v.id ? 'true' : 'false') : String(v.id);
                    const checked = defaultsArr.indexOf(idStr) > -1;
                    return (
                        <PanelRow>
                            <ToggleControl
                                label={v.value}
                                checked={checked}
                                onChange={() => onToggle(v.id)}
                            />
                        </PanelRow>
                    )
                })}
            </>
        )
    } else if (filterType === 'single-select') {
        const options = [{ label: __('None'), value: '' }, ...sortedItems.map(v => ({ label: v.value, value: (typeof v.id === 'boolean' ? (v.id ? 'true' : 'false') : String(v.id)) }))];
        const current = defaultsArr.length > 0 ? defaultsArr[0] : '';
        return (
            <PanelRow>
                <SelectControl
                    label={__('Default Item')}
                    value={current}
                    onChange={onSelect}
                    options={options}
                />
            </PanelRow>
        )
    } else {
        return null;
    }
}

class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
        this.iframe = React.createRef();
        this.updateHiddenFilters = this.updateHiddenFilters.bind(this)
        //this.onFilterChange = this.onFilterChange.bind(this)
        this.items = this.items.bind(this)
        this.updateDefaultValues = this.updateDefaultValues.bind(this)
        this.selectDefaultValue = this.selectDefaultValue.bind(this)

        // Add a key to force iframe reload on attribute changes
        this.state = { ...(this.state || {}), iframeReloadKey: 0 }
    }

    updateHiddenFilters(value, idx) {
        const { attributes: { hiddenFilters }, setAttributes } = this.props
        if (hiddenFilters.indexOf(value) > -1) {
            setAttributes({ hiddenFilters: hiddenFilters.filter(item => item !== value) })
        } else {
            setAttributes({ hiddenFilters: [...hiddenFilters, value] })
        }
    }


    items(type) {
        const allCategories = this.state.categories
        const values = allCategories ? allCategories.filter(c => c.type === type) : []
        const cat = values.length > 0 ? values[0] : null
        let items = []
        if (type === 'Boolean') {
            items = [{ "value": "Yes", id: true }, { "value": "No", id: false }]
        } else if (cat) {
            items = cat.items
        }

        return items

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot)
        const { attributes, setAttributes } = this.props
        const prevAttributes = prevProps.attributes || {}
        if (
            prevAttributes.defaultValues !== attributes.defaultValues ||
            prevAttributes.filterType !== attributes.filterType ||
            prevAttributes.param !== attributes.param ||
            prevAttributes.app !== attributes.app ||
            prevAttributes.defaultValueCriteria !== attributes.defaultValueCriteria ||
            prevAttributes.defaultTopNEnabled !== attributes.defaultTopNEnabled ||
            prevAttributes.defaultTopNCount !== attributes.defaultTopNCount
        ) {
            this.setState({ iframeReloadKey: (this.state.iframeReloadKey || 0) + 1 })
        }

        if (attributes && attributes.filterType === 'single-select' && attributes.defaultTopNEnabled && attributes.defaultTopNCount > 1) {
            setAttributes({ defaultTopNCount: 1 })
        }
    }

    updateDefaultValues(value) {
        const { attributes: { defaultValues }, setAttributes } = this.props
        const arr = (defaultValues || '').toString().split(',').map(v => v.trim()).filter(v => v.length > 0)
        const valStr = typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)
        if (arr.indexOf(valStr) > -1) {
            const updated = arr.filter(v => v !== valStr).join(',')
            setAttributes({ defaultValues: updated })
        } else {
            const updated = [...arr, valStr].join(',')
            setAttributes({ defaultValues: updated })
        }
    }

    selectDefaultValue(value) {
        const { setAttributes } = this.props
        setAttributes({ defaultValues: value })
    }

    render() {
        const {
            isSelected, setAttributes, attributes: {
                group,
                placeHolder,
                param,
                app,
                csvValue,
                isRange,
                allLabel,
                alphabeticalSort,
                ascOrder,
                noneLabel,
                startLabel,
                endLabel,
                useSingleColumn,
                enableTextSearch,
                filterType,
                defaultValues,
                showNoDataOption,
                defaultValueCriteria,
                hiddenFilters,
                allNoneSameBehaviour,
                autoApply,
                closeOnSelect,
                useFilterItems,
                dvzProxyDatasetId,
                defaultTopNEnabled,
                defaultTopNCount,
                parentFilter
            }
        } = this.props;

        const iframeStyles = { height: '65px', 'width': '100%', border: 'none', 'overflow': 'hidden' }
        const selectedFilters = this.state.filters ? this.state.filters.filter(f => f.param == param && f.type != 'Boolean') : null
        const filterAnyType = this.state.filters ? this.state.filters.filter(f => f.param == param) : null

        const filter = selectedFilters && selectedFilters.length > 0 ? selectedFilters[0] : null
        const datasets = [{ label: 'Select Dataset', value: '0' }]
        if (this.state.datasets) {
            this.state.datasets.forEach(d => {
                datasets.push({ label: d.label, value: d.id })
            })
        }

        return ([isSelected && (<InspectorControls>
            <Panel header={__("Filter Configuration")}>
                <PanelBody initialOpen={false} title={__("Group")}>
                    <PanelRow>
                        <TextControl
                            label={__('Name')}
                            value={group}
                            onChange={(group) => setAttributes({ group })}
                            help={__('Internal name for this filter group.')}
                        />
                    </PanelRow>
                </PanelBody>
                <PanelBody initialOpen={false} title={__("API & Source")}>
                    <PanelRow>
                        <SelectControl
                            value={app}
                            onChange={(app) => {
                                setAttributes({ app: app, hiddenFilters: [] })
                            }}
                            options={this.state.apps}
                            help={__('Select the API application source.')}
                        />
                    </PanelRow>

                    {isSupersetAPI(app, this.state.apps) &&
                        <PanelRow>

                            <SelectControl
                                label={__('Datasets')}
                                value={[dvzProxyDatasetId]}
                                onChange={(newDatasetId) => {
                                    setAttributes({
                                        dvzProxyDatasetId: newDatasetId,
                                        dimension1: 'none',
                                        dimension2: 'none'

                                    })
                                    this.setState({ dimensions: [], measures: [], filters: [], categories: [] })
                                    //  this.loadMetadataForSuperset(app, newDatasetId)
                                }}
                                options={datasets}
                                help={__('Select the dataset from the API.')}
                            />
                        </PanelRow>
                    }
                </PanelBody>

                {app && app !== 'csv' && <PanelBody initialOpen={false} title={__("Select Filter")}>
                    <PanelRow>
                        <SelectControl
                            label={__('Filter')}
                            value={param}
                            options={[{ value: '', label: __("Select Filter") }, ...this.state.filters]}
                            onChange={param => {
                                if (param != '') {
                                    const type = this.state.filters.filter(f => f.param === param)[0].type
                                    setAttributes({ param, type, hiddenFilters: [], defaultValues: "" })
                                } else {
                                    setAttributes({ param: "", type: "", hiddenFilters: [], defaultValues: "" })
                                }
                            }}
                            help={__('Select the main filter parameter.')}
                        />
                    </PanelRow>



                    <PanelRow>
                        <SelectControl
                            label={__('Parent Filter')}
                            value={parentFilter}
                            help={__('Set parent filter autoaply false in order to avoid unnecesary data reloading.')}
                            options={[{ value: "", label: __("None") }, ...this.state.filters]}
                            onChange={parentFilter => {
                                if (parentFilter && parentFilter !== "") {
                                    const parentFilterObj = this.state.filters.find(f => f.value === parentFilter);
                                    if (parentFilterObj) {
                                        setAttributes({ parentFilter, parentFilterParam: parentFilterObj.param });
                                    }
                                } else {
                                    setAttributes({ parentFilter: "", parentFilterParam: "" });
                                }
                            }} />
                    </PanelRow>

                </PanelBody>}
                {app && app === 'csv' && <PanelBody initialOpen={false} title={__("Select Filter")}>
                    <PanelRow>
                        <TextControl label={__("Field")} value={param}
                            onChange={(param) => setAttributes({ param })}
                            help={__("The column name in the CSV.")}
                        ></TextControl>
                    </PanelRow>
                    <PanelRow>
                        <TextControl label={__("Values")} value={csvValue}
                            onChange={(csvValue) => setAttributes({ csvValue })}
                            help={__("Comma separated values.")}
                        ></TextControl>
                    </PanelRow>
                    <PanelRow>
                        <SelectControl
                            label={__('Default Value Criteria')}
                            value={defaultValueCriteria}
                            onChange={(defaultValueCriteria) => {
                                setAttributes({ defaultValueCriteria: defaultValueCriteria })
                            }}
                            options={[{
                                value: DEFAULT_VALUE_INPUT, label: 'Enter default value'
                            }, { value: LOWEST_VALUE, label: 'Lowest value in filter data' }, {
                                value: HIGHEST_VALUE, label: 'Highest value in filter data'
                            }]}
                            help={__('How to determine the default value.')}
                        />
                    </PanelRow>
                    {defaultValueCriteria === DEFAULT_VALUE_INPUT && <PanelRow>
                        <TextControl label={__("Default Values")} value={defaultValues}
                            onChange={(defaultValues) => setAttributes({ defaultValues })}
                            help={__("Manually specified default values.")}
                        ></TextControl>
                    </PanelRow>}


                </PanelBody>}
                <PanelBody title={__("Type Setting")}>
                    <PanelRow>
                        <SelectControl
                            label={__('Filter Type')}
                            value={[isRange ? "range" : filterType]}
                            onChange={(filterType) => {
                                setAttributes({ filterType: filterType, isRange: filterType == "range" })
                            }}
                            options={app === 'csv' ? [{
                                label: "Multi select",
                                value: "multi-select"
                            }, { label: "Single select", value: "single-select" }, {
                                label: "Range",
                                value: "range"
                            }] : [{ label: "Multi select", value: "multi-select" }, {
                                label: "Single select",
                                value: "single-select"
                            }, { label: "Range", value: "range" }]}
                            help={__('Display as multi-select, single-select, or range.')}
                        />
                    </PanelRow>

                    {isRange && <PanelRow>
                        <TextControl
                            label={__('Start')}
                            value={startLabel}
                            onChange={(startLabel) => setAttributes({ startLabel })}
                            help={__('Label for the start of the range.')}
                        />
                    </PanelRow>}
                    {isRange && <PanelRow>
                        <TextControl
                            label={__('End')}
                            value={endLabel}
                            onChange={(endLabel) => setAttributes({ endLabel })}
                            help={__('Label for the end of the range.')}
                        />
                    </PanelRow>}
                </PanelBody>
                {app !== 'csv' && <PanelBody initialOpen={false} title={__("Filter or hide items")}>
                    <PanelRow>
                        <ToggleControl
                            label={__("Filter items")}
                            checked={useFilterItems}
                            onChange={() => setAttributes({ useFilterItems: !useFilterItems, filters: [], hiddenFilters: [] })} />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__("Hide items")}
                            checked={!useFilterItems}
                            onChange={() => setAttributes({ useFilterItems: !useFilterItems, filters: [], hiddenFilters: [] })} />
                    </PanelRow>
                    {useFilterItems && <DataFilters
                        allFilters={this.state.filters}
                        allCategories={this.state.categories}
                        {...this.props} />
                    }
                    {!useFilterItems && <PanelBody initialOpen={false} title={__("Hidden Filter Options")}>
                        {(selectedFilters || []).map((f, index) => {
                            return (
                                <CategoricalFilter value={hiddenFilters} index={index} items={this.items(f.type)}
                                    onUpdateFilterValue={this.updateHiddenFilters} />)
                        })}
                    </PanelBody>
                    }
                </PanelBody>}
                {app != 'csv' && !isRange && filterAnyType && filterAnyType.length > 0 && (
                    <PanelBody initialOpen={false} title={__('Default Selection')}>
                        <PanelRow>
                            <ToggleControl
                                label={__('Select Top N Items')}
                                checked={!!defaultTopNEnabled}
                                onChange={() => {
                                    if (!defaultTopNEnabled) {
                                        setAttributes({ defaultTopNEnabled: true, defaultTopNCount: filterType === 'single-select' ? 1 : (defaultTopNCount || 1) })
                                    } else {
                                        setAttributes({ defaultTopNEnabled: false })
                                    }
                                }}
                                help={__('Enable selecting the first N items by default.')}
                            />
                        </PanelRow>
                        {defaultTopNEnabled && (
                            <PanelRow>
                                <TextControl
                                    label={__('Top N Count')}
                                    value={filterType === 'single-select' ? 1 : defaultTopNCount}
                                    disabled={filterType === 'single-select'}
                                    onChange={(val) => {
                                        const n = parseInt(val, 10);
                                        if (filterType === 'single-select') {
                                            setAttributes({ defaultTopNCount: 1 })
                                        } else {
                                            setAttributes({ defaultTopNCount: isNaN(n) ? 0 : n })
                                        }
                                    }}
                                    help={filterType === 'single-select' ? __('Single-select caps Top N to 1.') : __('Number of items to preselect when enabled.')}
                                />
                            </PanelRow>
                        )}
                        {!defaultTopNEnabled && (
                            <DefaultSelection
                                defaultValues={defaultValues}
                                items={this.items(filterAnyType[0].type)}
                                filterType={filterType}
                                onToggle={this.updateDefaultValues}
                                onSelect={this.selectDefaultValue}
                            />
                        )}
                    </PanelBody>
                )}
                <PanelBody title={__("Labels")}>
                    <PanelRow>
                        <TextControl
                            label={__('Place Holder')}
                            value={placeHolder}
                            onChange={(placeHolder) => setAttributes({ placeHolder })}
                            help={__('Placeholder text shown when no selection is made.')}
                        />
                    </PanelRow>
                    {!isRange && <PanelRow>
                        <TextControl
                            label={__('All')}
                            value={allLabel}
                            onChange={(allLabel) => setAttributes({ allLabel })}
                            help={__('Label for the "Select All" option.')}
                        />
                    </PanelRow>}
                    {!isRange && <PanelRow>
                        <TextControl
                            label={__('None')}
                            value={noneLabel}
                            onChange={(noneLabel) => setAttributes({ noneLabel })}
                            help={__('Label for the "Deselect All" option.')}
                        />
                    </PanelRow>}
                </PanelBody>
                <PanelBody title={__("Dropdown Options")}>
                    <PanelRow>
                        <ToggleControl
                            label={__("Alphabetical Sort")}
                            checked={alphabeticalSort}
                            onChange={() => setAttributes({ alphabeticalSort: !alphabeticalSort })}
                            help={__("Sort items alphabetically.")}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__("Order Asc")}
                            checked={ascOrder}
                            onChange={() => setAttributes({ ascOrder: !ascOrder })}
                            help={__("Sort in ascending order.")}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__("Use single column to display dropdown items")}
                            checked={useSingleColumn}
                            onChange={() => setAttributes({ useSingleColumn: !useSingleColumn })}
                            help={__("Force single column layout for dropdown items.")}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl label={__("Enable Text Search")}
                            checked={enableTextSearch}
                            onChange={() => setAttributes({ enableTextSearch: !enableTextSearch })}
                            help={__("Allow users to search within the dropdown.")}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl label={__("Show No Data Option (if available)")}
                            checked={showNoDataOption}
                            onChange={() => setAttributes({ showNoDataOption: !showNoDataOption })}
                            help={__("Show a message when filter list is empty is empty.")}
                        />
                    </PanelRow>
                    {filterType === "multi-select" && <>
                        <PanelRow>
                            <ToggleControl
                                label={__("Close dropdown on item select/click")}
                                checked={closeOnSelect}
                                onChange={() => setAttributes({ closeOnSelect: !closeOnSelect })}
                                help={__("Automatically close dropdown after selection.")}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={__("All and None have same behaviour")}
                                checked={allNoneSameBehaviour}
                                onChange={() => setAttributes({ allNoneSameBehaviour: !allNoneSameBehaviour })}
                                help={__("Treat 'All' and 'None' selections identically.")}
                            />
                        </PanelRow>
                    </>}


                    <PanelBody title={__("Auto Apply")}>
                        <PanelRow>
                            <ToggleControl
                                label={__("Enable Auto Apply")}
                                checked={autoApply}
                                onChange={() => setAttributes({ autoApply: !autoApply })}
                                help={__("Automatically apply filter changes without a submit button.")}
                            />
                        </PanelRow>

                    </PanelBody>
                </PanelBody>

            </Panel>
        </InspectorControls>),

        (<div>

            {this.state.react_ui_url && (
                <iframe
                    key={'filter-iframe-' + (this.state.iframeReloadKey || 0)}
                    ref={this.iframe}
                    scrolling={"no"}
                    style={iframeStyles}
                    src={this.state.react_ui_url + "/embeddable/filter?v=" + (this.state.iframeReloadKey || 0)}
                />
            )}
        </div>

        )]);

    }
}


const Edit = (props) => {

    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return (<div {...blockProps}>
        <p className={"iframe container"}>
            <BlockEdit {...props} />
        </p>

    </div>)


}
export default Edit;
