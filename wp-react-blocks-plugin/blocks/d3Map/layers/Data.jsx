import {Component} from "@wordpress/element";
import {__} from '@wordpress/i18n';
import {
    Button, ButtonGroup,
    ***REMOVED***,
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    ***REMOVED***,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import Measures from '../../commons/Measures.jsx'
import Property from "./utils/Property";
import ***REMOVED*** from "./utils/***REMOVED***";
import {***REMOVED***} from "@wordpress/block-editor";
import ***REMOVED*** from "./utils/***REMOVED***";
import Format from '../../charts/Format.jsx'
import {ALIVE_SUPERSET_APP} from '../../commons/Constants';

const ***REMOVED*** = ({param, index, options, ***REMOVED***}) => {
    const sortedOptions = options.sort(function (a, b) {
        var aLabel = a.label ? a.label.toLowerCase() : "";
        var bLabel = b.label ? b.label.toLowerCase() : "";
        return aLabel < bLabel ? -1 : aLabel > bLabel ? 1 : 0;
    });

    return <SelectControl onChange={(value) => {
        ***REMOVED***(value, index)
    }} value={param} options={sortedOptions}/>
}

const ***REMOVED*** = ({value, index, items, ***REMOVED***}) => {
    if (items) {
        const sortedItems = items.sort(function (a, b) {
            /*
                var aValue= a.value ? a.value.toLowerCase() : "";
                var bValue = b.value ? b.value.toLowerCase() : "";
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            */
            return a.position - b.position
        });
        return sortedItems.map(v => <PanelRow> <ToggleControl label={v.value} checked={value.indexOf(v.id) > -1}
                                                              onChange={e => {
                                                                  ***REMOVED***(v.id, index)
                                                              }}/></PanelRow>)
    } else {
        return null;
    }
}

export class ***REMOVED*** extends Component {
    constructor(props) {
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

    



    ***REMOVED***(format, field) {
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
        const {apps, features, layer: {csv, ***REMOVED***}} = this.props
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

    ***REMOVED***(prevState) {

        const {***REMOVED***} = this.props
        ***REMOVED***("measures", [])
        ***REMOVED***("filters", [])

        //setAttributes({measures: [], filters: []})
    }

    ***REMOVED***(param, idx) {

        const {layer: {filters}, ***REMOVED***, allFilters} = this.props
        const newFilters = filters.slice()
        const selected = allFilters.filter(f => f.param === param)[0]
        newFilters[idx] = {...selected, value: []}
        // setAttributes({filters: newFilters})
        ***REMOVED***("filters", newFilters)


    }

    ***REMOVED***(value, idx) {

        const {layer: {filters}, ***REMOVED***} = this.props
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

    ***REMOVED***(value, idx) {

        const {layer: {filters}, ***REMOVED***} = this.props
        const selected = filters[idx]
        let values = selected.value
        values = value.split(",")
        const newFilters = filters.slice()
        newFilters[idx].value = values
        //setAttributes({filters: newFilters})
        ***REMOVED***("filters", newFilters)

    }

    addFilter() {

        const {layer: {filters}, ***REMOVED***, allFilters} = this.props
        let index = filters.length > allFilters.length ? allFilters.length : filters.length
        const newFilter = (allFilters && allFilters.length > 0) ? {
            ...allFilters[index], "value": []
        } : null
        let newFilters = filters.slice()
        newFilters.push(newFilter)
        //setAttributes({filters: newFilters})
        ***REMOVED***("filters", newFilters)
    }

    removeFilter(f) {
        const {layer: {filters}, ***REMOVED***, allFilters} = this.props
        let newFilters = filters.slice(0, -1)
        ***REMOVED***("filters", newFilters)
    }


    ***REMOVED***(prevProps) {
        const {***REMOVED***, layer: {type, dimension2, types}} = this.props
        const {layer: {type: prevType, dimension2: ***REMOVED***}} = prevProps
    }


    ***REMOVED***(value) {
        const {***REMOVED***} = this.props
        ***REMOVED***("measures", [value])
    }

    items(type) {

        const values = this.props.allCategories ? this.props.allCategories.filter(c => c.type === type) : []
        const cat = values.length > 0 ? values[0] : null
        let items = null
        if (type === 'Boolean') {
            items = [{"value": "Yes", id: true}, {"value": "No", id: false}]
        } else if (cat) {
            items = cat.items
        }
        return items

    }

    render() {
        const {
            ***REMOVED***,
            allDimensions, allFilters, allMeasures, allCategories, allDatasets, features, apps,layer, layer: {
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
                datasetId,
                           
            }
        } = this.props

        let ***REMOVED*** = ""
        let ***REMOVED*** = ""

        

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
                    label={__("App", "dg")}
                    value={[app]} // e.g: value = [ 'a', 'c' ]
                    onChange={(app) => {  
                       ***REMOVED***("app", app)                            
                    }}
                    options={apps}
                />
            </PanelRow>
            {app == ALIVE_SUPERSET_APP && <PanelRow>
                <SelectControl
                    label={__('Datasets')}
                    value={[datasetId]}
                    onChange={(newDatasetId) => {
                        ***REMOVED***("datasetId", newDatasetId)                       
                    }}
                    options={allDatasets}
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
                    value={this.getCSValue(csv)}
                    onChange={(csv) => ***REMOVED***("csv", csv)}
                />
            </PanelRow>}

            {app == 'csv' && <PanelRow>
                <Format title={"Format"} format={format} hiddenCustomAxisFormat={true}
                        ***REMOVED***={this.***REMOVED***}></Format>
            </PanelRow>}

            {app != 'csv' && <PanelRow>
                <SelectControl
                    label={'Dimension' + (type == 'dataPoints' ? 'LatLong' : '')}
                    value={[***REMOVED***]} // e.g: value = [ 'a', 'c' ]
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
                    "margin-top": "calc(8px)",
                    "font-size": "12px",
                    "font-style": "normal",
                    "color": "rgb(117, 117, 117)"
                }}>{"{" + m.value + "}"}</p></PanelRow>)}
        </PanelBody>,
        <React.Fragment>
            {app != 'csv' && <Measures
                ***REMOVED***={this.***REMOVED***}
                ***REMOVED***={this.***REMOVED***}
                measures={layer.measures}
                format={layer.format}
                {...this.props}/>}
        </React.Fragment>,
        <React.Fragment>
            {app != 'csv' && <PanelBody initialOpen={false} title={__("Filters")}>
                {filters.map((f, index) => {
                    return (<PanelBody initialOpen={false} title={__(`Filter - ${f.label}`)}>
                        <***REMOVED*** param={f.param} index={index} options={allFilters}
                                        ***REMOVED***={this.***REMOVED***}/>
                        {<***REMOVED*** value={f.value} index={index} items={this.items(f.type)}
                                            ***REMOVED***={this.***REMOVED***}/>}
                    </PanelBody>)
                })}

                <PanelRow>
                    <Button variant={"link"} onClick={this.addFilter}>{__("Add Filter")}</Button>
                    <Button variant={"link"} onClick={this.removeFilter}>{__("Remove")}</Button>
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
                    value={fillColor}
                    colorSettings={[{
                        clearable: true, enableAlpha: true,
                        value: fillColor, onChange: (fillColor) => {
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
                    value={markFillColor}
                    colorSettings={[{
                        clearable: true, enableAlpha: true, value: markFillColor, onChange: (markFillColor) => {
                            ***REMOVED***("markFillColor", markFillColor)
                        },

                    }]}
                /></PanelRow>}

            {***REMOVED*** && <PanelRow>
                <***REMOVED***
                    title={__(`Circle Label Color`)}
                    value={***REMOVED***}
                    colorSettings={[{
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
                    value={borderColor}
                    colorSettings={[{
                        clearable: true, enableAlpha: true, value: ***REMOVED***, onChange: (borderColor) => {
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
                ***REMOVED***={***REMOVED***} breaks={breaks}/>}


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
                                             ***REMOVED***={***REMOVED***}/>}
        </PanelBody>



        ])
    }

}


export default ***REMOVED***;