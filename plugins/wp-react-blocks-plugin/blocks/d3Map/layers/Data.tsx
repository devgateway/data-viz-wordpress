import React from "react";
import { Component } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import {
    Button,
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    TextareaControl,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import { PanelColorSettings } from "@wordpress/block-editor";
import Measures from './utils/MapMeasures'
import Property from "./utils/Property";
import BreaksGenerator from "./utils/BreaksGenerator";
import PatternGenerator from "./utils/PatternGenerator";
import { isSupersetAPI, Format, Measure, Category, Filter, Dimension, Application } from "@devgateway/dvz-wp-commons";
import { CategoricalFilterProps, FilterSelectorProps } from "./utils/types";


const FilterSelector = ({ param, index, options, onUpdateFilterParam }: FilterSelectorProps) => {
    const sortedOptions = options ? options.sort(function (a, b) {
        var aLabel = a.label ? a.label.toLowerCase() : "";
        var bLabel = b.label ? b.label.toLowerCase() : "";
        return aLabel < bLabel ? -1 : aLabel > bLabel ? 1 : 0;
    }) : [];

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
            return a.position && b.position ? a.position - b.position : 0;
        });
        return sortedItems.map(v => <PanelRow key={v.id}> <ToggleControl label={v.value} checked={value.indexOf(v.id) > -1}
            onChange={e => {
                onUpdateFilterValue(v.id, index)
            }} /></PanelRow>)
    } else {
        return null;
    }
}

interface DataLayerSettingProps {
    onChangeProperty: (property: string, value: any) => void;
    allDimensions: Dimension[];
    allFilters: Filter[];
    allMeasures: Measure[];
    allCategories: Category[];
    allDatasets: any[];
    features: any[];
    apps: Application[];
    layer: any;
}

interface DataLayerSettingState {
    measures: Measure[];
    dimensions: Dimension[];
    filters: Filter[];
    categories: Category[];
}


export class DataLayerSetting extends Component<DataLayerSettingProps, DataLayerSettingState> {
    constructor(props: DataLayerSettingProps) {
        super(props);
        this.onSetSingleMeasure = this.onSetSingleMeasure.bind(this)
        this.addFilter = this.addFilter.bind(this)
        this.updateFilterParam = this.updateFilterParam.bind(this)
        this.updateFilterValue = this.updateFilterValue.bind(this)
        this.setFilterValue = this.setFilterValue.bind(this)
        this.removeFilter = this.removeFilter.bind(this)
        this.items = this.items.bind(this)
        this.getCSValue = this.getCSValue.bind(this)
        this.onFormatChange = this.onFormatChange.bind(this)
        this.state = {
            measures: [], dimensions: [], filters: [], categories: []
        }
    }

    onFormatChange(format: any) {
        const {
            onChangeProperty, allDimensions, allFilters, allMeasures, features, apps, layer: {
                app,
                csv,
                measures,
                filters,
                featureJoinAttribute,
                apiJoinAttribute,
                type,
                fillColor,
                borderColor,
                breaks,
                markFillColor,
                markBorderColor,
                markSizeScale,
                tooltip
            }
        } = this.props

        onChangeProperty("format", format);
    }


    getCSValue() {
        const { apps, features, layer: { csv, featureJoinAttribute } } = this.props
        if (csv == '') {
            let generatedCSV = 'id,value\n'
            if (features && features.length > 0) {
                features.forEach(f => {
                    generatedCSV = generatedCSV + f.properties[featureJoinAttribute] + ', \n'

                })
            }

            return generatedCSV
        }
        return csv
    }

    cleanSelection(prevState: DataLayerSettingState) {

        const { onChangeProperty } = this.props
        onChangeProperty("measures", [])
        onChangeProperty("filters", [])

        //setAttributes({measures: [], filters: []})
    }

    updateFilterParam(param: string, idx: number) {

        const { layer: { filters }, onChangeProperty, allFilters } = this.props
        const newFilters = filters.slice()
        const selected = allFilters.filter(f => f.param === param)[0]
        newFilters[idx] = { ...selected, value: [] }
        // setAttributes({filters: newFilters})
        onChangeProperty("filters", newFilters)


    }

    updateFilterValue(value: any, idx: number) {

        const { layer: { filters }, onChangeProperty } = this.props
        const selected = filters[idx]
        let values = selected.value
        if (values.indexOf(value) > -1) {
            values = values.filter(v => v != value)
        } else {
            values.push(value)
        }

        const newFilters = filters.slice()
        newFilters[idx].value = values
        // setAttributes({filters: newFilters})
        onChangeProperty("filters", newFilters)
    }

    setFilterValue(value: any, idx: number) {

        const { layer: { filters }, onChangeProperty } = this.props
        const selected = filters[idx]
        let values = selected.value
        values = value.split(",")
        const newFilters = filters.slice()
        newFilters[idx].value = values
        //setAttributes({filters: newFilters})
        onChangeProperty("filters", newFilters)

    }

    addFilter() {

        const { layer: { filters }, onChangeProperty, allFilters } = this.props
        let index = filters.length > allFilters.length ? allFilters.length : filters.length
        const newFilter = (allFilters && allFilters.length > 0) ? {
            ...allFilters[index], "value": []
        } : null
        let newFilters = filters.slice()
        newFilters.push(newFilter)
        //setAttributes({filters: newFilters})
        onChangeProperty("filters", newFilters)
    }

    removeFilter(f: Filter) {
        const { layer: { filters }, onChangeProperty, allFilters } = this.props
        let newFilters = filters.slice(0, -1)
        onChangeProperty("filters", newFilters)
    }


    componentDidUpdate(prevProps: DataLayerSettingProps) {
        const { onChangeProperty, layer: { type, dimension2, types } } = this.props
        const { layer: { type: prevType, dimension2: prevDimension2 } } = prevProps
    }


    onSetSingleMeasure(value: string) {
        const { onChangeProperty } = this.props
        onChangeProperty("measures", [value])
    }

    items(type) {

        const values = this.props.allCategories ? this.props.allCategories.filter(c => c.type === type) : []
        const cat = values.length > 0 ? values[0] : null
        let items: { value: string, id: any }[] | null = null
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
            onChangeProperty,
            allDimensions,
            allFilters,
            allMeasures,
            allCategories,
            allDatasets,
            features,
            apps,
            layer,


            layer: {
                app,
                csv,
                measures,
                filters,
                featureJoinAttribute,
                apiJoinAttribute,
                type,
                useCentroidPoint,
                useBreaks,
                fillColor,
                borderColor,
                format,

                breaks,
                labelFontSize,
                markFillColor,
                markLabelColor,
                markBorderColor,
                markSizeScale,
                markerLabelSize,
                tooltip,
                usePattern,
                patterns,
                customMeasuresLabels,
                patternDiscriminator,
                onRemoveLayer,
                onMoveLayer,
                dvzProxyDatasetId,

            }
        } = this.props




        let selectedMeasureLabel = ""
        let selectedMeasureValue = ""

        const appsOptions = apps.map(a => ({ label: a.name, value: a.name }));
        const datasetsOptions = allDatasets.map(d => ({ label: d.name, value: d.id }));



        if (app != 'csv') {
            const theMeasure = measures ? measures[0] : null
            const selectedMeasure = allMeasures && theMeasure ? allMeasures.filter(m => m.value == theMeasure)[0] : null
            if (selectedMeasure) {
                selectedMeasureLabel = selectedMeasure.label
                selectedMeasureValue = selectedMeasure.value


                if (customMeasuresLabels && (!customMeasuresLabels[selectedMeasureValue] || customMeasuresLabels[selectedMeasureValue] == "")) {
                    onChangeProperty("customMeasuresLabels", {
                        ...customMeasuresLabels,
                        [selectedMeasureValue]: selectedMeasureLabel
                    })
                }
            }
        }
        return ([<PanelBody initialOpen={false} title={"Data Source"}>
            <PanelRow>
                <SelectControl
                    multiple={false}
                    label={__("App", "dg")}
                    value={app} // e.g: value = [ 'a', 'c' ]
                    onChange={(app) => {
                        onChangeProperty("app", app)
                    }}
                    options={appsOptions}
                />
            </PanelRow>
            {isSupersetAPI(app, apps) &&
                <PanelRow>
                    <SelectControl
                        multiple={false}
                        label={__('Datasets')}
                        value={dvzProxyDatasetId}
                        onChange={(newDatasetId) => {
                            onChangeProperty("dvzProxyDatasetId", newDatasetId)
                        }}
                        options={datasetsOptions}
                    />
                </PanelRow>
            }
            {type != 'dataPoints' && <Property property={"featureJoinAttribute"}
                type={"select"} onChangeProperty={onChangeProperty}
                features={features}
                value={featureJoinAttribute}
                title={"Shape Attribute"}>

            </Property>}

            {app == 'csv' && <PanelRow>
                <TextareaControl
                    label={__("CSV Data")}
                    value={this.getCSValue()}
                    onChange={(csv) => onChangeProperty("csv", csv)}
                />
            </PanelRow>}

            {app == 'csv' && <PanelRow>
                <Format title={"Format"} format={format} hiddenCustomAxisFormat={true}
                    onFormatChange={this.onFormatChange}></Format>
            </PanelRow>}

            {app != 'csv' && <PanelRow>
                <SelectControl
                    multiple={false}
                    label={'Dimension' + (type == 'dataPoints' ? 'LatLong' : '')}
                    value={apiJoinAttribute}
                    onChange={(value) => {
                        onChangeProperty("apiJoinAttribute", value)
                    }}
                    options={allDimensions}
                />
            </PanelRow>}
            <PanelRow>
                <TextareaControl
                    label={__("Tooltip")}
                    value={tooltip}
                    help={__("You can use variables {var_name}")}
                    onChange={(tooltip) => onChangeProperty("tooltip", tooltip)}
                    rows={10}
                />

            </PanelRow>
            {app != 'csv' && allMeasures && allMeasures.map(m => <PanelRow><p
                style={{
                    marginTop: "calc(8px)",
                    fontSize: "12px",
                    fontStyle: "normal",
                    color: "rgb(117, 117, 117)"
                }}>{"{" + m.value + "}"}</p></PanelRow>)}
        </PanelBody>,
        <React.Fragment>
            {app != 'csv' && <Measures
                {...this.props}
                allMeasures={allMeasures}
                onFormatChange={this.onFormatChange}
                onSetSingleMeasure={this.onSetSingleMeasure}
                // TODO: fix measures component
                // @ts-ignore 
                measures={layer.measures}
                format={layer.format}
                 />}
        </React.Fragment>,
        <React.Fragment>
            {app != 'csv' && <PanelBody initialOpen={false} title={__("Filters")}>
                {filters.map((f, index) => {
                    return (<PanelBody initialOpen={false} title={__(`Filter - ${f.label}`)}>
                        <FilterSelector param={f.param} index={index} options={allFilters.map(f => ({ label: f.label, value: f.param }))}
                            onUpdateFilterParam={this.updateFilterParam} />
                        {<CategoricalFilter value={f.value} index={index} items={this.items(f.type)}
                            onUpdateFilterValue={this.updateFilterValue} />}
                    </PanelBody>)
                })}

                <PanelRow>
                    <Button variant={"link"} onClick={() => this.addFilter()}>{__("Add Filter")}</Button>
                    <Button variant={"link"} onClick={() => this.removeFilter(filters[filters.length - 1])}>{__("Remove")}</Button>
                </PanelRow>
            </PanelBody>}
        </React.Fragment>,
        <PanelBody initialOpen={false} title={"Symbols and Styles"}>
            {app != "csv" && selectedMeasureValue && <PanelRow>
                <TextControl
                    label={selectedMeasureLabel}
                    help={__("Customize Measure Label")}
                    value={customMeasuresLabels ? customMeasuresLabels[selectedMeasureValue] : ""}
                    onChange={(measureLabel) => {
                        onChangeProperty("customMeasuresLabels", {
                            ...customMeasuresLabels, [selectedMeasureValue]: measureLabel
                        })


                    }}>
                </TextControl>
            </PanelRow>}
            <PanelRow>
                <PanelColorSettings
                    title={__(`Default Fill Color`)}
                    colorSettings={[{
                        label: __("Default Fill Color"),
                        clearable: true, 
                        enableAlpha: true,
                        value: fillColor, 
                        onChange: (fillColor) => {
                            onChangeProperty("fillColor", fillColor)
                        },

                    }]}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Use Centroid Points"
                    checked={useCentroidPoint}
                    onChange={(value) => {
                        onChangeProperty("useCentroidPoint", true)
                    }}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Use Shape Colors"
                    checked={!useCentroidPoint}
                    onChange={(value) => {
                        onChangeProperty("useCentroidPoint", false)
                    }}
                />
            </PanelRow>


            {useCentroidPoint && <PanelRow>
                <RangeControl
                    label="Point Base Size"
                    value={markSizeScale}
                    onChange={(value) => {
                        onChangeProperty("markSizeScale", value)
                    }}
                    step={1}
                    min={0}
                    max={100}
                />
            </PanelRow>}
            {useCentroidPoint && <PanelRow>
                <RangeControl
                    label="Point Label Size"
                    value={markerLabelSize}
                    onChange={(markerLabelSize) => {
                        onChangeProperty("markerLabelSize", markerLabelSize)
                    }}
                    step={1}
                    min={0}
                    max={100}
                >

                </RangeControl>
            </PanelRow>}
            {useCentroidPoint && <PanelRow>

                <PanelColorSettings
                    title={__(`Circle Fill Color`)}
                    colorSettings={[{
                        label: __("Circle Fill Color"),
                        clearable: true, 
                        enableAlpha: true, 
                        value: markFillColor, 
                        onChange: (markFillColor) => {
                            onChangeProperty("markFillColor", markFillColor)
                        },

                    }]}
                /></PanelRow>}

            {useCentroidPoint && <PanelRow>
                <PanelColorSettings
                    title={__(`Circle Label Color`)}
                    colorSettings={[{
                        label: __("Circle Label Color"),
                        clearable: true,
                        enableAlpha: true,
                        value: markLabelColor,
                        onChange: (markLabelColor) => {
                            onChangeProperty("markLabelColor", markLabelColor)
                        },

                    }]}
                />
            </PanelRow>}
            {useCentroidPoint && <PanelRow>
                <PanelColorSettings
                    title={__(`Circle Border Color`)}
                    colorSettings={[{
                        label: __("Circle Border Color"),
                        clearable: true,
                        enableAlpha: true,
                        value: markBorderColor,
                        onChange: (borderColor) => {
                            onChangeProperty("markBorderColor", borderColor)
                        },

                    }]}
                />
            </PanelRow>}

            <PanelRow>
                <ToggleControl
                    label="Use Breaks"
                    checked={useBreaks}
                    onChange={e => {
                        onChangeProperty("useBreaks", !useBreaks)
                    }}

                />
            </PanelRow>

            {useBreaks && <BreaksGenerator
                showSize={useCentroidPoint}
                defaultBorderColor={markBorderColor}
                defaultFillColor={markFillColor}
                onChangeProperty={onChangeProperty} breaks={breaks} />}


            <PanelRow>
                <ToggleControl
                    label="Use Patterns"
                    checked={usePattern}
                    onChange={e => {
                        onChangeProperty("usePattern", !usePattern)
                    }}
                />
            </PanelRow>

            {usePattern && <PatternGenerator allCategories={allCategories} allDimensions={allDimensions}
                defaultFillColor={fillColor} onChangeProperty={onChangeProperty}
                patterns={patterns} app={app} csv={csv}
                patternDiscriminator={patternDiscriminator} />}
        </PanelBody>



        ])
    }

}


export default DataLayerSetting;
