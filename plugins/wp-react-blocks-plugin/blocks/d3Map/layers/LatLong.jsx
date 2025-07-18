import {Component} from "@wordpress/element";
import {__} from '@wordpress/i18n';
import {
    ***REMOVED***,
    Button,
    ***REMOVED***,
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    ***REMOVED***,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import Measures from './utils/MapMeasures.jsx'
import Property from "./utils/Property";
import {***REMOVED***} from "@wordpress/block-editor";
import ***REMOVED*** from "./utils/***REMOVED***";
import {isSupersetAPI} from "@devgateway/dvz-wp-commons";

const ***REMOVED*** = (p1, p2) => {
    return JSON.stringify(p1) === JSON.stringify(p2)
}
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


    ***REMOVED***(format) {
        const {***REMOVED***} = this.props
        ***REMOVED***("format", format);
    }

    getCSValue() {
        const {apps, features, layer: {csv, ***REMOVED***}} = this.props
        if (csv == '') {
            let generatedCSV = 'Latitude,Longitude,value\n'
            if (features && features.length > 0) {
                features.forEach(f => {
                    if (f.properties[***REMOVED***]) {
                        generatedCSV = generatedCSV + f.properties[***REMOVED***] + ', \n'
                    }

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
        const {***REMOVED***, allCategories, layer: {type, dimension2, types}} = this.props
        const {allCategories: ***REMOVED***, layer: {type: prevType, dimension2: ***REMOVED***}} = prevProps
        if (!***REMOVED***(allCategories, ***REMOVED***)) {

            ***REMOVED***("allCategories", allCategories)
        }
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
            ***REMOVED***, allDimensions, allFilters, allMeasures, allCategories, allDatasets, features, apps, layer, layer: {
                app,
                csv,
                measures,
                filters,
                format,
                ***REMOVED***,
                ***REMOVED***,
                dimension1,
                type,
                ***REMOVED***,
                fillColor,
                borderColor,
                useBreaks,
                breaks,
                pointStyleBy,
                dimension2,
                ***REMOVED*** = [],
                markFillColor,
                ***REMOVED***,
                markSizeScale,
                tooltip,
                visible = true,
                ***REMOVED***,
                ***REMOVED***
            }
        } = this.props

        const cats = dimension2 && allCategories ? allCategories.filter(c => c.type.toUpperCase() == dimension2.toUpperCase()) : []
        const items = cats.length > 0 ? cats[0].items : []
        const ***REMOVED*** = items.map(i => i.value)

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

            {isSupersetAPI(app, apps) && <PanelRow>
                <SelectControl
                    label={__('Datasets')}
                    value={[***REMOVED***]}
                    onChange={(newDatasetId) => {
                        ***REMOVED***("***REMOVED***", newDatasetId)
                    }}
                    options={allDatasets}
                />
            </PanelRow>
            }

            {app == 'csv' && <PanelRow>
                <***REMOVED***
                    label={__("CSV Data")}
                    value={this.getCSValue(csv)}
                    onChange={(csv) => ***REMOVED***("csv", csv)}
                />
            </PanelRow>}
            {app != 'csv' &&
            <>
            <PanelRow>
                <SelectControl
                    label={'Dimension'}
                    value={[***REMOVED***]} // e.g: value = [ 'a', 'c' ]
                    onChange={(value) => {
                        ***REMOVED***("***REMOVED***", value)
                    }}
                    options={allDimensions}
                />
            </PanelRow>

            <PanelRow>
                <SelectControl
                    label={'Second Dimension'}
                    value={[dimension2]}
                    onChange={(value) => {
                        ***REMOVED***("dimension2", value)
                    }}
                    options={allDimensions}
                />
            </PanelRow>
            </>
            }

            <PanelRow>
                <***REMOVED***
                    label={__("Tooltip")}
                    value={tooltip}
                    help={__(`You can use the following variables: `)}
                    onChange={(tooltip) => ***REMOVED***("tooltip", tooltip)}
                    rows={10}
                />

            </PanelRow>
            {app != 'csv' && allMeasures && allMeasures.map(m => <PanelRow><p
                style={{
                    "margin-top": "calc(8px)",
                    "font-size": "12px",
                    "font-style": "normal",
                    "color": "rgb(117, 117, 117)"}}>{"{" + m.value + "}"}</p></PanelRow>)
            }
            {app != 'csv' && dimension2 != 'none' && <PanelRow><p
              style={{
                  "margin-top": "calc(8px)",
                  "font-size": "12px",
                  "font-style": "normal",
                  "color": "rgb(117, 117, 117)"}}>{"{" + dimension2 + "}"}</p></PanelRow>
            }
        </PanelBody>,
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
               <PanelRow>
                        <ToggleControl
                            label={__("Show 2nd Dimension on Legends")}
                            checked={***REMOVED***}
                            onChange={(***REMOVED***) => {
                                ***REMOVED***("***REMOVED***", ***REMOVED***)
                            }}
                        />
                </PanelRow>
                {***REMOVED*** &&
                    <PanelRow>
                        <TextControl
                            label={__("2nd Dimension Legend Label")}
                            value={layer.***REMOVED*** ? layer.***REMOVED*** : ''}
                            onChange={(***REMOVED***) => {
                                ***REMOVED***("***REMOVED***", ***REMOVED***)
                            }}
                            placeholder={__("e.g. 'Region'")}
                        />
                    </PanelRow>
                }
                <PanelRow>
                    <SelectControl
                      label={"Color by"}
                      value={pointStyleBy ? pointStyleBy : 'none'}
                      onChange={(v) => {
                          ***REMOVED***('pointStyleBy', v)
                      }}
                      options={[{label: "None", value: "none"}, {label: "Dimension", value: "dimension"}, {label: "Measure", value: "measure"}]}/>
                </PanelRow>

               {pointStyleBy === 'measure' && <Measures
                    ***REMOVED***={this.***REMOVED***}
                    ***REMOVED***={this.***REMOVED***}
                    measures={layer.measures}
                    format={layer.format}
                    {...this.props}/>}


             <PanelBody initialOpen={true} title={"Default Styles"}>
                <PanelRow>
                    <RangeControl
                        label={__(`Default Points Size`)}
                        value={markSizeScale}
                        onChange={(value) => {
                            ***REMOVED***("markSizeScale", value)
                        }}
                        step={1}
                        min={0}
                        max={100}
                    />
                </PanelRow>
                <PanelRow>
                    <***REMOVED***
                        title={__(`Default Fill Color`)}
                        value={markFillColor}
                        colorSettings={[{
                            clearable: true,
                            enableAlpha: true,
                            value: markFillColor, onChange: (markFillColor) => {
                                ***REMOVED***("markFillColor", markFillColor)
                            },

                        }]}
                    />
                </PanelRow>
                <PanelRow>
                    <***REMOVED***
                        title={__(`Default Border Color`)}
                        value={borderColor}
                        colorSettings={[{
                            clearable: true,
                            enableAlpha: true,
                            value: ***REMOVED***, onChange: (borderColor) => {
                                ***REMOVED***("***REMOVED***", borderColor)
                            },

                        }]}
                    />
                </PanelRow>
              </PanelBody>

              <PanelBody initialOpen={true} title={"Breaks"}>
                {pointStyleBy === 'measure' &&
                    <***REMOVED***
                        app={app}
                        csv={csv}
                        ***REMOVED***={***REMOVED***}
                        measures={measures}
                        filters={filters}
                        ***REMOVED***={***REMOVED***}
                        showSize={***REMOVED***}
                        ***REMOVED***={***REMOVED***}
                        ***REMOVED***={markFillColor}
                        format={format}
                        ***REMOVED***={***REMOVED***} breaks={breaks}
                        />
                }

                {pointStyleBy  === 'dimension' && ***REMOVED*** && ***REMOVED***.map(field => <PanelBody initialOpen={false} title={field}>
                    <PanelRow>
                        <RangeControl
                          label={__(`Point Size`)}
                          value={***REMOVED***[field + '_size'] ? ***REMOVED***[field + '_size'] : markSizeScale}
                          onChange={(v) => {
                              ***REMOVED***('***REMOVED***', {...***REMOVED***, [field + '_size']: v})
                          }}
                          step={1}
                          min={0}
                          max={100}
                        />
                    </PanelRow>
                    <PanelRow>
                        <***REMOVED***
                          title={__(`Point Fill Color`)}
                          value={***REMOVED***[field + '_color'] ? ***REMOVED***[field + '_color'] : markFillColor}
                          colorSettings={[{
                              clearable: true,
                              enableAlpha: true,
                              value: ***REMOVED***[field + '_color'] ? ***REMOVED***[field + '_color'] : markFillColor, onChange: (v) => {
                                  ***REMOVED***('***REMOVED***', {...***REMOVED***, [field + '_color']: v})
                              },

                          }]}
                        />
                    </PanelRow>
                    <PanelRow>
                        <***REMOVED***
                          title={__(`Point Border Color`)}
                          value={***REMOVED***[field + '_border'] ? ***REMOVED***[field + '_border'] : ***REMOVED***}
                          colorSettings={[{
                              clearable: true,
                              enableAlpha: true,
                              value: ***REMOVED***[field + '_border'] ? ***REMOVED***[field + '_border'] : ***REMOVED***, onChange: (v) => {
                                  ***REMOVED***('***REMOVED***', {...***REMOVED***, [field + '_border']: v})
                              },
                          }]}
                        />
                    </PanelRow>

                </PanelBody>)
                }
                </PanelBody>
            </PanelBody>
        ])
    }

}
export default ***REMOVED***;