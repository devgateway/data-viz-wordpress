import React from 'react';
import { Component } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import {
    Button,
    PanelBody,
    PanelRow,
    SelectControl,
    ToggleControl
} from '@wordpress/components';
import Measures from './Measures'
import { CategoricalFilterProps, FilterSelectorProps } from '../d3Map/layers/utils/types';
import { APIConfigProps, APIConfigState } from './types';
import { CategoryItem } from '@dg-data-viz/wp-commons';

const FilterSelector = ({ param, index, options, onUpdateFilterParam }: FilterSelectorProps) => {
    const sortedOptions = options?.sort(function (a, b) {
        var aLabel = a.label ? a.label.toLowerCase() : "";
        var bLabel = b.label ? b.label.toLowerCase() : "";
        return aLabel < bLabel ? -1 : aLabel > bLabel ? 1 : 0;
    });

    return <SelectControl onChange={(value) => {
        onUpdateFilterParam(value, index)
    }} value={param} options={sortedOptions} />
}


const CategoricalFilter = ({ value, index, items, onUpdateFilterValue }: CategoricalFilterProps) => {
    if (items) {
        const sortedItems = items.sort(function (a, b) {
            /*
                var aValue= a.value ? a.value.toLowerCase() : "";
                var bValue = b.value ? b.value.toLowerCase() : "";
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            */
            return (a.position ?? 0) - (b.position ?? 0)
        });
        return sortedItems.map(v => <PanelRow> <ToggleControl label={v.value} checked={value.indexOf(v.id) > -1}
            onChange={e => {
                onUpdateFilterValue(v.id, index)
            }} /></PanelRow>)
    } else {
        return null;
    }
}

/*let types = [
    {label: 'Bar', value: 'bar', supports: {singleMeasure: false, singleDimension: false}},
    {label: 'Pie', value: 'pie', supports: {singleMeasure: true, singleDimension: false}},
    {label: 'Line', value: 'line', supports: {singleMeasure: false, singleDimension: true}},
    {label: 'Map', value: 'map', supports: {singleMeasure: true, singleDimension: false}}]*/

export class APIConfig extends Component<APIConfigProps, APIConfigState> {
    constructor(props: APIConfigProps) {
        super(props);

        this.onMeasuresChange = this.onMeasuresChange.bind(this)
        this.onSetSingleMeasure = this.onSetSingleMeasure.bind(this)
        this.addFilter = this.addFilter.bind(this)
        this.updateFilterParam = this.updateFilterParam.bind(this)
        this.updateFilterValue = this.updateFilterValue.bind(this)
        this.setFilterValue = this.setFilterValue.bind(this)
        this.removeFilter = this.removeFilter.bind(this)
        this.items = this.items.bind(this)


        this.state = {
            measures: [],
            dimensions: [],
            filters: [],
            categories: []
        }
    }

    cleanSelection(prevState: APIConfigState) {
        const { setAttributes } = this.props
        setAttributes({ measures: [], filters: [] })
    }

    updateFilterParam(param: string, idx: number) {
        const { attributes: { filters }, setAttributes, allFilters } = this.props
        const newFilters = filters.slice()
        const selected = allFilters.filter(f => f.param === param)[0]
        newFilters[idx] = { ...selected, value: [] }
        setAttributes({ filters: newFilters })

    }

    updateFilterValue(value, idx: number) {
        const { attributes: { filters }, setAttributes, allFilters } = this.props
        const selected = filters[idx]
        let values = selected.value
        if (values.indexOf(value) > -1) {
            values = values.filter(v => v != value)
        } else {
            values.push(value)
        }

        const newFilters = filters.slice()
        newFilters[idx].value = values
        setAttributes({ filters: newFilters })
    }

    setFilterValue(value: string, idx: number) {
        const { attributes: { filters }, setAttributes, allFilters } = this.props
        const selected = filters[idx]
        let values = selected.value
        values = value.split(",")
        const newFilters = filters.slice()
        newFilters[idx].value = values
        setAttributes({ filters: newFilters })

    }

    addFilter() {
        const { attributes: { filters }, setAttributes, allFilters } = this.props
        let index = filters.length > allFilters.length ? allFilters.length : filters.length
        const newFilter = (allFilters && allFilters.length > 0) ? {
            ...allFilters[index],
            "value": []
        } : null
        let newFilters = filters.slice()
        if (newFilter) {
            newFilters.push(newFilter)
        }
        setAttributes({ filters: newFilters })
    }

    removeFilter() {
        const { attributes: { filters }, setAttributes, allFilters } = this.props
        let newFilters = filters.slice(0, -1)
        setAttributes({ filters: newFilters })
    }



    componentDidUpdate(prevProps: APIConfigProps) {

        const { setAttributes, attributes: { type, dimension2, types } } = this.props
        const { attributes: { type: prevType, dimension2: prevDimension2 } } = prevProps


        const prevTypeObject = types.filter(t => t.value === prevType).length > 0 ? types.filter(t => t.value === prevType)[0] : null
        const currentType = types.filter(t => t.value === type).length > 0 ? types.filter(t => t.value === type)[0] : null

        if (type != prevType && currentType) {
            if (prevTypeObject?.supports.singleMeasure != currentType.supports.singleMeasure || (currentType.supports.singleMeasure == false && dimension2 != "none")) {
                setAttributes({ measures: [], filters: [] })
            } else {
                setAttributes({ filters: [] })
            }
        }

        if (dimension2 != prevDimension2 && currentType && currentType.supports.singleMeasure == false) {
            setAttributes({ measures: [] })
        }

    }


    onSetSingleMeasure(value: string) {
        const { setAttributes } = this.props
        setAttributes({ measures: [value] })

    }

    onMeasuresChange(value: string) {
        const { setAttributes, attributes: { measures } } = this.props
        if (measures.indexOf(value) > -1) {
            setAttributes({ measures: measures.filter(d => d != value) })
        } else {
            setAttributes({ measures: [...measures, value] })
        }
    }


    items(type: string) {

        const values = this.props.allCategories ? this.props.allCategories.filter(c => c.type === type) : []
        const cat = values.length > 0 ? values[0] : null
        let items: CategoryItem[] | null = null
        if (type === 'Boolean') {
            items = [{ "value": "Yes", id: true }, { "value": "No", id: false }]
        } else if (cat) {
            if (cat.items) {
                items = cat.items
            }
        }
        return items

    }

    render() {
        const {
            allDimensions,
            allFilters,
            allMeasures,
            setAttributes, attributes: {
                measures,
                filters,
                dimension1,
                dimension2,
                type,
                types
            }
        } = this.props


        const currentType = types.filter(t => t.value === type).length > 0 ? types.filter(t => t.value === type)[0] : null

        return (
            [<PanelBody initialOpen={false} title={__(type == 'map' ? 'Fields' : `Dimensions`)}>
                <PanelRow>
                    <SelectControl
                        label={__(type == 'map' ? 'Matching Field' : 'First Dimension')}
                        value={dimension1}
                        onChange={(value) => {
                            setAttributes({ dimension1: value })
                        }}
                        options={allDimensions}
                    />
                </PanelRow>
                <PanelRow>
                    <SelectControl
                        label={__('Breakdown Field')}
                        value={dimension2}
                        onChange={(value) => {
                            setAttributes({ dimension2: value })
                        }}
                        options={allDimensions}
                    />
                </PanelRow>
            </PanelBody>,
            // TODO: Check the type
            // @ts-ignore
            <Measures
                {...this.props}
                onSetSingleMeasure={this.onSetSingleMeasure}
                onMeasuresChange={this.onMeasuresChange}
                currentType={currentType} />,
            <>
                <PanelBody initialOpen={false} title={__("Filters")}>
                    {filters.map((f, index) => {

                        return (
                            <PanelBody initialOpen={true} title={__(`Filter - ${f.label}`)}>
                                <FilterSelector param={f.param} index={index} options={allFilters.map(f => ({ label: f.label, value: f.param }))}
                                    onUpdateFilterParam={this.updateFilterParam} />
                                {<CategoricalFilter value={f.value} index={index} items={this.items(f.type)}
                                    onUpdateFilterValue={this.updateFilterValue} />}
                            </PanelBody>)
                    })}

                    <PanelRow>

                        <Button variant={"link"} onClick={this.addFilter}>{__("Add Filter")}</Button>
                        <Button variant={"link"} onClick={this.removeFilter}>{__("Remove")}</Button>
                    </PanelRow>
                </PanelBody>

            </>
            ]
        )
    }

}


export default APIConfig;
