import React from "react";
import { Component } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import {
    Button,
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    ***REMOVED***,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import { ***REMOVED*** } from "@wordpress/block-editor";
import Measures from './utils/MapMeasures'
import Property from "./utils/Property";
import ***REMOVED*** from "./utils/***REMOVED***";
import ***REMOVED*** from "./utils/***REMOVED***";
import { isSupersetAPI, Format, Measure, Category, Filter, Dimension, Application } from "@devgateway/dvz-wp-commons";
import { CategoricalFilterProps, ***REMOVED*** } from "./utils/types";


const ***REMOVED*** = ({ param, index, options, ***REMOVED*** }: ***REMOVED***) => {
    const sortedOptions = options ? options.sort(function (a, b) {
        var aLabel = a.label ? a.label.toLowerCase() : "";
        var bLabel = b.label ? b.label.toLowerCase() : "";
        return aLabel < bLabel ? -1 : aLabel > bLabel ? 1 : 0;
    }) : [];

    return <SelectControl onChange={(value) => {
        ***REMOVED***(value, index)
    }} value={param} options={sortedOptions} />
}



const ***REMOVED*** = ({ value, index, items, ***REMOVED*** }: CategoricalFilterProps) => {
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
                ***REMOVED***(v.id, index)
            }} /></PanelRow>)
    } else {
        return null;
    }
}

interface DataLayerSettingProps {
    ***REMOVED***: (property: string, value: any) => void;
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


export class ***REMOVED*** extends Component<DataLayerSettingProps, DataLayerSettingState> {
    constructor(props: DataLayerSettingProps) {
        super(props);
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.addFilter = this.addFilter.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.removeFilter = this.removeFilter.bind(this)
        this.items = this.items.bind(this)
        this.getCSValue = this.getCSValue.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.state = {
            measures: [], dimensions: [], filters: [], categories: []
        }
    }

    ***REMOVED***(format: any) {
        const {
            ***REMOVED***, allDimensions, allFilters, allMeasures, features, apps, layer: {
                app,
                csv,
                measures,
                filters,
                ***REMOVED***,
                ***REMOVED***,
                type,
                fillColor,
                borderColor,
                breaks,
                markFillColor,
                ***REMOVED***,
                markSizeScale,
                tooltip
            }
        } = this.props

        ***REMOVED***("format", format);
    }


    getCSValue() {
        const { apps, features, layer: { csv, ***REMOVED*** } } = this.props
        if (csv == '') {
            let generatedCSV = 'id,value\n'
            if (features && features.length > 0) {
                features.forEach(f => {
                    generatedCSV = generatedCSV + f.properties[***REMOVED***] + ', \n'

                })
            }

            return generatedCSV
        }
        return csv
    }

    ***REMOVED***(prevState: DataLayerSettingState) {

        const { ***REMOVED*** } = this.props
        ***REMOVED***("measures", [])
        ***REMOVED***("filters", [])

        //setAttributes({measures: [], filters: []})
    }

    ***REMOVED***(param: string, idx: number) {

        const { layer: { filters }, ***REMOVED***, allFilters } = this.props
        const newFilters = filters.slice()
        const selected = allFilters.filter(f => f.param === param)[0]
        newFilters[idx] = { ...selected, value: [] }
        // setAttributes({filters: newFilters})
        ***REMOVED***("filters", newFilters)


    }

    ***REMOVED***(value: any, idx: number) {

        const { layer: { filters }, ***REMOVED*** } = this.props
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
        ***REMOVED***("filters", newFilters)
    }

    ***REMOVED***(value: any, idx: number) {

        const { layer: { filters }, ***REMOVED*** } = this.props
        const selected = filters[idx]
        let values = selected.value
        values = value.split(",")
        const newFilters = filters.slice()
        newFilters[idx].value = values
        //setAttributes({filters: newFilters})
        ***REMOVED***("filters", newFilters)

    }

    addFilter() {

        const { layer: { filters }, ***REMOVED***, allFilters } = this.props
        let index = filters.length > allFilters.length ? allFilters.length : filters.length
        const newFilter = (allFilters && allFilters.length > 0) ? {
            ...allFilters[index], "value": []
        } : null
        let newFilters = filters.slice()
        newFilters.push(newFilter)
        //setAttributes({filters: newFilters})
        ***REMOVED***("filters", newFilters)
    }

    removeFilter(f: Filter) {
        const { layer: { filters }, ***REMOVED***, allFilters } = this.props
        let newFilters = filters.slice(0, -1)
        ***REMOVED***("filters", newFilters)
    }


    ***REMOVED***(prevProps: DataLayerSettingProps) {
        const { ***REMOVED***, layer: { type, dimension2, types } } = this.props
        const { layer: { type: prevType, dimension2: ***REMOVED*** } } = prevProps
    }


    ***REMOVED***(value: string) {
        const { ***REMOVED*** } = this.props
        ***REMOVED***("measures", [value])
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
            ***REMOVED***,
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
                ***REMOVED***,
                ***REMOVED***,
                type,
                ***REMOVED***,
                useBreaks,
                fillColor,
                borderColor,
                format,

                breaks,
                labelFontSize,
                markFillColor,
                ***REMOVED***,
                ***REMOVED***,
                markSizeScale,
                ***REMOVED***,
                tooltip,
                usePattern,
                patterns,
                ***REMOVED***,
                ***REMOVED***,
                onRemoveLayer,
                onMoveLayer,
                ***REMOVED***,

            }
        } = this.props




        let ***REMOVED*** = ""
        let ***REMOVED*** = ""

        const appsOptions = apps.map(a => ({ label: a.name, value: a.name }));
        const ***REMOVED*** = allDatasets.map(d => ({ label: d.name, value: d.id }));



        if (app != 'csv') {
            const theMeasure = measures ? measures[0] : null
            const ***REMOVED*** = allMeasures && theMeasure ? allMeasures.filter(m => m.value == theMeasure)[0] : null
            if (***REMOVED***) {
                ***REMOVED*** = ***REMOVED***.label
                ***REMOVED*** = ***REMOVED***.value


                if (***REMOVED*** && (!***REMOVED***[***REMOVED***] || ***REMOVED***[***REMOVED***] == "")) {
                    ***REMOVED***("***REMOVED***", {
                        ...***REMOVED***,
                        [***REMOVED***]: ***REMOVED***
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
                        ***REMOVED***("app", app)
                    }}
                    options={appsOptions}
                />
            </PanelRow>
            {isSupersetAPI(app, apps) &&
                <PanelRow>
                    <SelectControl
                        multiple={false}
                        label={__('Datasets')}
                        value={***REMOVED***}
                        onChange={(newDatasetId) => {
                            ***REMOVED***("***REMOVED***", newDatasetId)
                        }}
                        options={***REMOVED***}
                    />
                </PanelRow>
            }
            {type != 'dataPoints' && <Property property={"***REMOVED***"}
                type={"select"} ***REMOVED***={***REMOVED***}
                features={features}
                value={***REMOVED***}
                title={"Shape Attribute"}>

            </Property>}

            {app == 'csv' && <PanelRow>
                <***REMOVED***
                    label={__("CSV Data")}
                    value={this.getCSValue()}
                    onChange={(csv) => ***REMOVED***("csv", csv)}
                />
            </PanelRow>}

            {app == 'csv' && <PanelRow>
                <Format title={"Format"} format={format} hiddenCustomAxisFormat={true}
                    ***REMOVED***={this.***REMOVED***}></Format>
            </PanelRow>}

            {app != 'csv' && <PanelRow>
                <SelectControl
                    multiple={false}
                    label={'Dimension' + (type == 'dataPoints' ? 'LatLong' : '')}
                    value={***REMOVED***}
                    onChange={(value) => {
                        ***REMOVED***("***REMOVED***", value)
                    }}
                    options={allDimensions}
                />
            </PanelRow>}
            <PanelRow>
                <***REMOVED***
                    label={__("Tooltip")}
                    value={tooltip}
                    help={__("You can use variables {var_name}")}
                    onChange={(tooltip) => ***REMOVED***("tooltip", tooltip)}
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
                ***REMOVED***={this.***REMOVED***}
                ***REMOVED***={this.***REMOVED***}
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
                        <***REMOVED*** param={f.param} index={index} options={allFilters.map(f => ({ label: f.label, value: f.param }))}
                            ***REMOVED***={this.***REMOVED***} />
                        {<***REMOVED*** value={f.value} index={index} items={this.items(f.type)}
                            ***REMOVED***={this.***REMOVED***} />}
                    </PanelBody>)
                })}

                <PanelRow>
                    <Button variant={"link"} onClick={() => this.addFilter()}>{__("Add Filter")}</Button>
                    <Button variant={"link"} onClick={() => this.removeFilter(filters[filters.length - 1])}>{__("Remove")}</Button>
                </PanelRow>
            </PanelBody>}
        </React.Fragment>,
        <PanelBody initialOpen={false} title={"Symbols and Styles"}>
            {app != "csv" && ***REMOVED*** && <PanelRow>
                <TextControl
                    label={***REMOVED***}
                    help={__("Customize Measure Label")}
                    value={***REMOVED*** ? ***REMOVED***[***REMOVED***] : ""}
                    onChange={(measureLabel) => {
                        ***REMOVED***("***REMOVED***", {
                            ...***REMOVED***, [***REMOVED***]: measureLabel
                        })


                    }}>
                </TextControl>
            </PanelRow>}
            <PanelRow>
                <***REMOVED***
                    title={__(`Default Fill Color`)}
                    colorSettings={[{
                        label: __("Default Fill Color"),
                        clearable: true, 
                        enableAlpha: true,
                        value: fillColor, 
                        onChange: (fillColor) => {
                            ***REMOVED***("fillColor", fillColor)
                        },

                    }]}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Use Centroid Points"
                    checked={***REMOVED***}
                    onChange={(value) => {
                        ***REMOVED***("***REMOVED***", true)
                    }}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Use Shape Colors"
                    checked={!***REMOVED***}
                    onChange={(value) => {
                        ***REMOVED***("***REMOVED***", false)
                    }}
                />
            </PanelRow>


            {***REMOVED*** && <PanelRow>
                <RangeControl
                    label="Point Base Size"
                    value={markSizeScale}
                    onChange={(value) => {
                        ***REMOVED***("markSizeScale", value)
                    }}
                    step={1}
                    min={0}
                    max={100}
                />
            </PanelRow>}
            {***REMOVED*** && <PanelRow>
                <RangeControl
                    label="Point Label Size"
                    value={***REMOVED***}
                    onChange={(***REMOVED***) => {
                        ***REMOVED***("***REMOVED***", ***REMOVED***)
                    }}
                    step={1}
                    min={0}
                    max={100}
                >

                </RangeControl>
            </PanelRow>}
            {***REMOVED*** && <PanelRow>

                <***REMOVED***
                    title={__(`Circle Fill Color`)}
                    colorSettings={[{
                        label: __("Circle Fill Color"),
                        clearable: true, 
                        enableAlpha: true, 
                        value: markFillColor, 
                        onChange: (markFillColor) => {
                            ***REMOVED***("markFillColor", markFillColor)
                        },

                    }]}
                /></PanelRow>}

            {***REMOVED*** && <PanelRow>
                <***REMOVED***
                    title={__(`Circle Label Color`)}
                    colorSettings={[{
                        label: __("Circle Label Color"),
                        clearable: true,
                        enableAlpha: true,
                        value: ***REMOVED***,
                        onChange: (***REMOVED***) => {
                            ***REMOVED***("***REMOVED***", ***REMOVED***)
                        },

                    }]}
                />
            </PanelRow>}
            {***REMOVED*** && <PanelRow>
                <***REMOVED***
                    title={__(`Circle Border Color`)}
                    colorSettings={[{
                        label: __("Circle Border Color"),
                        clearable: true,
                        enableAlpha: true,
                        value: ***REMOVED***,
                        onChange: (borderColor) => {
                            ***REMOVED***("***REMOVED***", borderColor)
                        },

                    }]}
                />
            </PanelRow>}

            <PanelRow>
                <ToggleControl
                    label="Use Breaks"
                    checked={useBreaks}
                    onChange={e => {
                        ***REMOVED***("useBreaks", !useBreaks)
                    }}

                />
            </PanelRow>

            {useBreaks && <***REMOVED***
                showSize={***REMOVED***}
                ***REMOVED***={***REMOVED***}
                ***REMOVED***={markFillColor}
                ***REMOVED***={***REMOVED***} breaks={breaks} />}


            <PanelRow>
                <ToggleControl
                    label="Use Patterns"
                    checked={usePattern}
                    onChange={e => {
                        ***REMOVED***("usePattern", !usePattern)
                    }}
                />
            </PanelRow>

            {usePattern && <***REMOVED*** allCategories={allCategories} allDimensions={allDimensions}
                ***REMOVED***={fillColor} ***REMOVED***={***REMOVED***}
                patterns={patterns} app={app} csv={csv}
                ***REMOVED***={***REMOVED***} />}
        </PanelBody>



        ])
    }

}


export default ***REMOVED***;
