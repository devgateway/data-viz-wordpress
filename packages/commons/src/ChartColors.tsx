import React, {useEffect} from "react";
import {PanelBody, PanelRow, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import Papa from 'papaparse'
import {useRef, useState} from "@wordpress/element";
import {***REMOVED***} from "./APIutils";
import { ***REMOVED*** } from "@wordpress/block-editor";
import { Categories, Dimension, Filter, Measure, Options } from "./types";

const OVERALL = 'Overall';
const system = [{value: "system", label: 'System Colors'}, {value: "manual", label: 'Manual Colors'}]
export const categorical = [{value: "nivo", label: 'nivo'}, {
    value: "category10", label: 'category10'
}, {value: "accent", label: 'Accent'}, {value: "dark2", label: 'dark2'}, {
    value: "paired", label: 'paired'
}, {value: "pastel1", label: 'pastel1'}, {value: "pastel2", label: 'pastel2'}, {
    value: "set1", label: 'set1'
}, {value: "set2", label: 'set2'}, {value: "set3", label: 'set3'}]


export const sequential = [{value: "blues", label: 'blues'}, {value: "greens", label: 'greens'}, {
    value: "greys", label: 'greys'
}, {value: "oranges", label: 'oranges'}, {value: "purples", label: 'purples'}, {
    value: "reds", label: 'reds'
}, {value: "blue_green", label: 'blue_green'}, {value: "blue_purple", label: 'blue_purple'}, {
    value: "green_blue", label: 'green_blue'
}, {value: "orange_red", label: 'orange_red'}, {
    value: "purple_blue_green", label: 'purple_blue_green'
}, {value: "purple_blue", label: 'purple_blue'}, {value: "purple_red", label: 'purple_red'}, {
    value: "red_purple", label: 'red_purple'
}, {value: "yellow_green_blue", label: 'yellow_green_blue'}, {
    value: "yellow_green", label: 'yellow_green'
}, {value: "yellow_orange_brown", label: 'yellow_orange_brown'}, {
    value: "yellow_orange_red", label: 'yellow_orange_brown'
}]

export const diverging = [{value: "brown_blueGreen", label: 'brown_blueGreen'},
    {value: "purpleRed_green", label: 'purpleRed_green'},
    {value: "pink_yellowGreen", label: 'pink_yellowGreen'},
    {value: "purple_orange", label: 'purple_orange'},
    {value: "red_blue", label: 'red_blue'},
    {value: "red_grey", label: 'red_grey'},
    {value: "red_yellow_blue", label: 'red_yellow_blue'},
    {value: "red_yellow_green", label: 'red_yellow_green'},
    {value: "spectral", label: 'spectral'}
]

const plainColor = {value: "plain_color", label: 'Use Plain color'};

export type ***REMOVED*** = {
    allDimensions: Dimension[];
    allFilters: Filter[];
    allMeasures: Measure[];
    allCategories: Categories;
    allApps: any[];
   
    setAttributes: (attributes: {
        swap: boolean;
        measures: Record<string, {selected: boolean}>;
        manualColors?: Record<string, Record<string, string>>;
        scheme: string;
        colorBy: string;
        dimension1: string;
        dimension2: string;
        barColor: string | null;
        type: string;
        app: string;
        csv: string;
        ***REMOVED***: boolean;
    }) => void;
    attributes: {
        swap: boolean;
        measures: Record<string, {selected: boolean}>;
        manualColors: Record<string, Record<string, string>>;
        scheme: string;
        colorBy: string;
        dimension1: string;
        dimension2: string;
        barColor: string;
        type: string;
        app: string;
        csv: string;
        ***REMOVED***: boolean;
    }
}

export const ChartColors = (props: ***REMOVED***) => {
    const {
        allDimensions, allFilters, allMeasures, allCategories, allApps, setAttributes, attributes
    } = props;

    const {
        swap,
        measures,
        manualColors,
        scheme,
        colorBy,
        dimension1,
        dimension2,
        barColor,
        type,
        app,
        csv,
        ***REMOVED***
    } = attributes;


    let l1Label: string | null = null;
    let d2Label: string | null = null;
    let d3Label: string | null = null;


    const ***REMOVED*** = measures[app] ? Object.keys(measures[app]).map(k => measures[app][k]).filter(m => m.selected) : []

    let colorOptions: Options[] = []


    if (app !== "csv") {
        l1Label = dimension1 != 'none' && allDimensions ? '1st Dimension - ' + allDimensions.filter(d => d.value == dimension1)[0].label : null
        //if one dimensions is selected o
        if (dimension2 == 'none' && ***REMOVED***.length > 0) {
            d2Label = __("Measure Labels")
            d3Label = __("Measure Values")
        } else if (dimension2 != 'none') {
            //if two dimensions are selected show dimensions 1, dimensions 2 and values
            d2Label = allDimensions ? '2nd Dimension - ' + allDimensions.filter(d => d.value == dimension2)[0].label : null
            d3Label = __("Measure Values")
        }

    } else {
        //CSV Color Options
        const data = Papa.parse(csv, {header: true, dynamicTyping: true});
        l1Label = data.meta.fields && data.meta.fields.length > 0 ? '1st Column Values ' : null
        d2Label = __("Measure Columns Labels")
        d3Label = __("Measure Columns Values")
    }


    if (type == 'bar') {
        if (swap && dimension2 == "none" && ***REMOVED***.length > 0) {
            colorOptions = []
            if (l1Label) {
                colorOptions.push({label: l1Label, value: 'id'})
                if (d2Label) {
                    colorOptions.push({label: d2Label, value: 'index'})
                }
            } else {
                if (d2Label) {
                    colorOptions.push({label: d2Label, value: 'id'})
                }
                colorOptions.push({label: "Measure Values", value: 'values'})
            }

        } else {
            colorOptions = []
            if (l1Label && l1Label !== 'none') {
                colorOptions.push({label: l1Label, value: 'index'})
            }
            if (d2Label && d2Label !== 'none') {
                colorOptions.push({label: d2Label, value: (l1Label && l1Label !== 'none') ? 'id' : 'index'})
            }

            if (d3Label && d3Label !== 'none') {
                colorOptions.push({label: d3Label, value: 'values'})
            }

        }
    }

    if (type == 'pie') {

        if (dimension1 != 'none' && dimension2 == 'none' && colorBy != 'index') {
            setAttributes({ ...attributes, colorBy: 'index'})
            return null;
        }
        if (dimension1 != 'none' && dimension2 != 'none' && colorBy != 'id') {
            setAttributes({ ...attributes, colorBy: 'id'})
            return null;
        }
    }


    let options: Options[] = []
    if (colorBy === 'index' || colorBy === 'id') {
        if (type == "bar") {
            options = [...system, plainColor, ...categorical, ...sequential]

        } else if (type == "line") {
            options = [...system, plainColor, ...categorical]
        } else {
            options = [...system, ...categorical, ...sequential]
        }
    }
    if (colorBy === 'values') {
        options = [...sequential]
    }

    const [useColors, setUseColors] = useState("dimension")


    useEffect(() => {
        let nextUseColors = useColors;
        if (app != "csv") {
            // All conditions for coloring by measures
            if ((dimension2 == "none" && colorBy === "index" && swap) ||
                (type == 'line') ||
                (dimension1 == "none" && dimension2 == "none")) { //Multi measure colored by first dimension but  swapped (Colored by Measure) or dimensionless bar charts
                nextUseColors = "measure"
            } else if (dimension2 == "none" && colorBy === "id" && !swap) {  //Multi Measure chart colored by  (Measure)
                nextUseColors = "measure"
            } else {
                //colored by a dimensions
                nextUseColors = "dimension"
            }
            if (prevStatus.current) {
                if (nextUseColors == "dimension") {
                    if (prevStatus.current["scheme"] != scheme && scheme === "manual") {
                        initColors(colorBy === "index" ? dimension1 : dimension2)
                    }
                    if (prevStatus.current["colorBy"] != colorBy) {
                        initColors(colorBy === "index" ? dimension1 : dimension2)
                    }
                    if (prevStatus.current["dimension1"] != dimension1 || prevStatus.current["dimension2"] != dimension2) {
                        initColors(colorBy === "index" ? dimension1 : dimension2)
                    }
                } else {
                    ***REMOVED***()
                }

            }
            setUseColors(nextUseColors)
        } else {
            if (!manualColors["csv"]) {
                setAttributes({ ...attributes, manualColors: {"csv": {}}, colorBy: colorBy || "" })
            }
        }
        prevStatus.current = {scheme, colorBy: colorBy || "", dimension1, dimension2, useColors, app}

    }, [scheme, dimension1, dimension2, colorBy, swap, app, type])

    const prevStatus = useRef<{scheme: string, colorBy: string, dimension1: string, dimension2: string, useColors: string, app: string} | undefined>(undefined);

    const updateColor = (value: string, color: string) => {
        
        const newColors = Object.assign({}, manualColors)
        newColors[app][value] = color
        setAttributes({ ...attributes, manualColors: newColors, colorBy: colorBy || "" })
    }

    const initColors = (dimension: string) => {
        
        const ds = allDimensions.filter(d => d.value == dimension)
        const newColors = Object.assign({}, manualColors)

        if (!newColors[app]) {
            newColors[app] = {}
        }

        if (ds.length > 0) {
            const {type} = ds[0]
            const cat = allCategories.filter(a => a.type === type)
            if (cat.length > 0) {
                
                cat[0].items.forEach(item => {
                    if (!newColors[app][item.code]) {
                        newColors[app][item.code] = item.categoryStyle ? item.categoryStyle.color : "#eeeeee"
                    }
                })
            }

            setAttributes({ ...attributes, manualColors: newColors })
        }

    }

    const ***REMOVED*** = () => {
        
        const newColors = Object.assign({}, manualColors)
        if (!newColors[app]) {
            newColors[app] = {}
        }
        if (!allMeasures) {
        }
        if (allMeasures) {
            allMeasures.forEach(p => {
                if (!newColors[app][p.value]) {
                    newColors[app][p.value] = p.styles ? p.styles.color : "#eeeeee"
                }
            })

        }
        setAttributes({...attributes, manualColors: newColors})
    }

    const ***REMOVED*** = (dimension1, dimension2) => {
        
        if (manualColors[app]) {
            const ds1 = allDimensions.filter(d => d.value == dimension1)
            const ds2 = allDimensions.filter(d => d.value == dimension2)
            if (ds1.length > 0 && ds2.length > 0) {

                const {type} = ds1[0]
                const {type: type2} = ds2[0]

                const cat = allCategories.filter(a => a.type === type)
                const cat2 = allCategories.filter(a => a.type === type2)
                const list: React.ReactNode[] = []
                cat[0].items.sort((a, b) => (a.position ?? 0) - (b.position ?? 0)).forEach(c1 => {
                    cat2[0].items.sort((a, b) => (a.position ?? 0) - (b.position ?? 0)).forEach(c2 => {
                        list.push(<***REMOVED***
                            colorSettings={[{
                                value: manualColors[app][c1.value + ' - ' + c2.value],
                                onChange: (color) => {
                                    if (color) {
                                        updateColor(c1.value + ' - ' + c2.value, color)
                                    } else {
                                        updateColor(c1.value + ' - ' + c2.value, "#eeeeee")
                                    }
                                },
                                label: c1.value + ' - ' + c2.value
                            }]}
                        />)
                    })
                })

                return list
            }
        }
        return null;
    }

    const catColors = (dimension) => {
        
        if (manualColors[app]) {
            const ds = allDimensions.filter(d => d.value == dimension)
            if (ds.length > 0) {
                const {type} = ds[0]
                const cat = allCategories.filter(a => a.type === type)
                if (cat && cat.length > 0) {
                    const list = cat[0].items.sort((a, b) => (b.position ?? 0) - (a.position ?? 0)).map(item => {
                        return <***REMOVED***
                            colorSettings={[{
                                value: manualColors[app][item.code],
                                onChange: (color) => {
                                    if (color) {
                                        updateColor(item.code, color)
                                    } else {
                                        updateColor(item.code, item.categoryStyle ? item.categoryStyle.color : "#eeeeee")
                                    }
                                }, label: ***REMOVED***(item)
                            }]}
                        />


                    })
                    const dimensions = [dimension1, dimension2].filter(f => f != '' && f != "none");


                    let ***REMOVED***: string[] = []

                    allMeasures.forEach(m => {
                        
                        if (measures[app] && measures[app][m.value] && measures[app][m.value].selected) {
                            ***REMOVED***.push(m.value)
                        }
                    })

                    if (***REMOVED***) {
                        list.push(<***REMOVED***
                            colorSettings={[{
                                value: manualColors[app][OVERALL],
                                onChange: (color) => {
                                    if (color) {
                                        updateColor(OVERALL, color)
                                    } else {
                                        updateColor(OVERALL, "#eeeeee")
                                    }
                                }, label: __("Overall")
                            }]}
                        />)
                    }

                    return list
                } else {
                    return null
                }
            }
        }
        return null
    }

    const measureColors = () => {
        
        if (manualColors[app] && allMeasures && measures[app]) {
            
            const ***REMOVED*** = allMeasures.filter(m => Object.keys(measures[app]).indexOf(m.value) > -1 && measures[app][m.value].selected)
             if (***REMOVED***.length > 0) {

                const list = ***REMOVED***.sort((a, b) => b.position - a.position)
                    .map(item => {
                        return <***REMOVED***
                            colorSettings={[{
                                value: manualColors[app][item.value], onChange: (color) => {
                                    if (color) {
                                        updateColor(item.value, color)
                                    } else {
                                        updateColor(item.value, item.styles ? item.styles.color : "#555555")
                                    }
                                }, label: __(item.label)
                            }]}
                        />
                    })

                if (***REMOVED*** && ***REMOVED***.length == 1) {
                    list.push(<***REMOVED***
                        colorSettings={[{
                            value: manualColors[app][OVERALL], onChange: (color) => {
                                if (color) {
                                    updateColor(OVERALL, color)
                                } else {
                                    updateColor(OVERALL, "#eeeeee")
                                }
                            }, label: __("Overall")
                        }]}
                    />)
                }

                return list


            }
        }
        return null
    }

    const csvColors = (colorBy: string) => {
        const data = Papa.parse(csv, {header: true, dynamicTyping: true});
        const values: Array<string | number> = [];

        if (colorBy === "index" && type != 'line') {
            const field = data.meta?.fields?.[0];
            if (field) {
                values.push(...data.data.map((d: any) => d[field]))
            }
        }
        if (colorBy === "id" || type == 'line') {
            const fields = data.meta?.fields?.slice(1);
            if (fields) {
                // Convert string fields to numbers before pushing to values array
                const numericFields = fields.map(field => Number(field));
                values.push(...numericFields);
            }
        }
        if (colorBy === "values") {
            values.push(0, 100)
        }

        if (manualColors[app] && values) {
            return values.map(v => {
                return <***REMOVED***
                    colorSettings={[{
                        value: manualColors[app][v],

                        onChange: (color) => {
                            if (color) {
                                updateColor(v.toString(), color)
                            }
                        }, label: __(v.toString())
                    }]}
                />
            })
        }

        return null
    }

    const elements: React.ReactNode[] = []
    if (type == 'bar') {
        elements.push(<PanelRow>
            <SelectControl
                multiple={false}
                label={__('Color By')}
                value={colorBy} // e.g: value = [ 'a', 'c' ]
                onChange={(colorBy) => {
                    setAttributes({...attributes, colorBy})
                    if (colorBy === 'index' || colorBy === 'id') {
                        setAttributes({...attributes, colorBy})
                    }
                    if (colorBy === 'values') {
                        setAttributes({...attributes, scheme: "blues", colorBy})
                    }
                }}
                options={colorOptions}
            />
        </PanelRow>)
    }


    return [
        ...elements,
        <PanelRow>
            <SelectControl
                multiple={false}
                label={__('Color Scheme')}
                value={scheme} // e.g: value = [ 'a', 'c' ]
                onChange={(value) => {
                    setAttributes({...attributes, scheme: value})
                }}
                options={options}
            />
        </PanelRow>,


        (scheme == "plain_color") && <PanelRow>
            <***REMOVED***
                title={__('Color settings')}
                colorSettings={[{
                    value: ***REMOVED***(barColor), onChange: (color) => {
                        if (color) {
                            setAttributes({...attributes, barColor: ***REMOVED***(color)})
                        } else {
                            setAttributes({...attributes, barColor: null})
                        }
                    }, label: __('Plain color')
                }]}
            />
        </PanelRow>,

        (scheme == "manual") && <PanelRow>

            {app != "csv" && useColors == "dimension" && colorBy == "index" &&
                <PanelBody initialOpen={false} title={__("Set Colors")}>
                     {catColors(dimension1)}
                </PanelBody>}
            {app != "csv" && useColors == "dimension" && (colorBy == "id" && dimension2 != "none") &&
                <PanelBody initialOpen={false} title={__("Set Colors")}>

                    {type == 'bar' && catColors(dimension2)}
                    {type == 'line' && catColors(dimension2)}
                    {type == 'pie' && ***REMOVED***(dimension1, dimension2)}
                </PanelBody>}


            {app != "csv" && useColors == "dimension" && swap && colorBy == "id" && dimension1 != "none" && dimension2 == "none" &&
                <PanelBody initialOpen={false} title={__("Set Colors")}>
                    {/*Color By Dimension1 swapped chart*/}
                    {catColors(dimension1)}
                </PanelBody>}

            {/* 1 dimension API chart can be colored by measure */}
            {app != 'csv' && useColors === "measure" &&
                <PanelBody initialOpen={false} title={__("Set Color By Measure")}>
                    {measureColors()}
                </PanelBody>}
            {/* CSV CHART*/}

            {app == "csv" && <PanelBody initialOpen={false} title={__("Set Colors")}>
                {csvColors(colorBy)}
            </PanelBody>}


        </PanelRow>]
}

export default ChartColors