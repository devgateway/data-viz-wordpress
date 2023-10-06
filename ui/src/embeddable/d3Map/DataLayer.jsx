import React, {useEffect} from 'react';
import {connect} from "react-redux";
import BaseLayer from "./BaseLayer";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import {parse} from "../utils/parseUtils";
import * as d3 from "d3";
import {injectIntl} from "react-intl";


const getFilters = (filters) => {
    const ff = parse(filters) || []
    let params = {};
    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0) params[f.param] = f.value
        })
    } else {
        params = ff;
    }

    return params
}

class DataLayer extends BaseLayer {
    constructor() {
        super();
        this.***REMOVED*** = this.***REMOVED***.bind(this)

    }


    ***REMOVED***(json) {
        const {
            app,
            svg,
            format,
            id,
            file,
            path,
            ***REMOVED***,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            tooltip,
            markFillColor,
            ***REMOVED***,
            ***REMOVED***,
            markSizeScale,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            measures,
            editing,
            data,
            ***REMOVED***,
            breaks,
            patterns,
            projection,
            useBreaks,
            ***REMOVED***,
            usePattern,
            intl,


        } = this.props


        let numberFormat = {
            style: (format.style === 'compacted') ? 'decimal' : format.style,
            notation: (format.style === 'compacted') ? 'compact' : "standard",
            currency: format.currency,
            minimumFractionDigits: parseInt(format.minimumFractionDigits),
            maximumFractionDigits: parseInt(format.maximumFractionDigits)
        }

        const sizeScale = d3.***REMOVED***()
            .domain(breaks.map(d => d.end))
            .range(breaks.map(d => d.size));

        const colorScale = d3.***REMOVED***()
            .domain(breaks.map(d => d.end))
            .range(breaks.map(d => d.color));

        let getSize = (value) => {
            if (breaks.length > 0 && useBreaks) {
                return markSizeScale + sizeScale(value)
            }
            return markSizeScale
        }

        let getColor = (value, isMarker) => {

            if (breaks.length > 0 && useBreaks) {
                return colorScale(value)
            }

            if (isMarker) {
                return markFillColor
            }
            return fillColor
        }

        const filteredData = json.features.filter(f => f.properties._value != null)


        const ***REMOVED*** = (d) => {
            if (d.properties._value) {
                const variables = {
                    ...d.properties, meta: {
                        [***REMOVED***]: d.properties.meta ? d.properties.meta.value : '', ...d.properties.meta,
                        value: d.properties._value
                    }
                }
                return variables
            }
            return {}

        }

        this.createPaths(json)

        this.g.selectAll(".point").remove()
        this.g.selectAll(".point-label").remove()
        this.g.selectAll(".shape-pattern").remove()

        d3.select(svg).selectAll("defs").remove()

        const defs = d3.select(svg).append("defs")
        let patternsData = []
        if (app == "csv" && ***REMOVED***!='none') {
            patternsData = [...new Set(data.data.map(d => d[***REMOVED***]))].map(key => {
                return {
                    key: key,
                    type: patterns[key + "_symbol"],
                    color: patterns[key + "_color"],
                    rotation: patterns[key + "_rotation"]
                }
            })
        } else if(***REMOVED***!='none') {
                patternsData = data.metadata.types.filter(d => d.dimension == ***REMOVED***)[0].items.map(item => {
                const key = item.value
                return {
                    key: key,
                    type: patterns[key + "_symbol"],
                    color: patterns[key + "_color"],
                    rotation: patterns[key + "_rotation"]
                }

            })
        }

        defs.selectAll("pattern").remove()
        defs.selectAll("pattern")
            .data(patternsData).enter()
            .append("pattern")
            .attr('id', d => d.key)
            .attr('patternUnits', '***REMOVED***')
            .attr('width', .25)
            .attr('height', .25)
            .attr("x", 0).attr("y", 0)
            .attr("***REMOVED***", d => `rotate(${d.rotation})`)

        patternsData.forEach(d => {
            if (d.type === 'lines') {
                defs.select("#" + d.key)
                    .append("rect")
                    .attr('width', .1)
                    .attr('height', 1)
                    .attr('fill', d.color)
            }
            if (d.type === 'squares') {
                defs.select("#" + d.key)
                    .append("rect")
                    .attr('width', .15)
                    .attr('height', .15)
                    .attr('fill', d.color)
                    .attr("stroke-width", 1)

            }
        })

        if (usePattern) {
            this.g.selectAll("shape-pattern")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("class", "shape-pattern")
                .attr("opacity", d => {
                    if (useBreaks) {
                        return .7
                    }
                })
                .attr("fill", d => {
                    return "transparent"
                })

                .attr("style", d => {
                    if (d.properties && d.properties.meta) {
                        const id = d.properties.meta[***REMOVED***]
                        return "none;fill:url(#" + id + ");"
                    } else {
                        // return "pointer-events:none;"
                    }

                })
                .on("mouseenter", (d) => {
                    this.showToolTip(tooltip, ***REMOVED***(d), getColor(d.properties._value))
                }).on("mousemove", (d) => {
                this.moveToolTip()
            }).on("mouseleave", (d) => {
                this.hiddenToolTip()
            })


        }
        if (!***REMOVED***) {


            this.g.selectAll("path")
                .attr("fill", d => {
                    if (!d.properties._value) {
                        return fillColor
                    }
                    return getColor(d.properties._value)
                })
                .attr("stroke", borderColor)
                .attr("id", "state-borders")
                .attr("d", path).on("mouseenter", (d) => {
                this.showToolTip(tooltip, ***REMOVED***(d), getColor(d.properties._value))
            })
                .on("mouseleave", (d) => {
                    this.hiddenToolTip()
                })
                .on("mousemove", (d) => {
                    this.moveToolTip()
                })

            this.createLabels(json)

        }
        if (***REMOVED***) {
            this.createLabels(json)
            this.g.selectAll(".point")
                .data(filteredData)
                .enter()
                .append("circle")
                .attr("fill", d => getColor(d.properties._value, true))
                .attr("stroke", ***REMOVED***)
                .attr("class", "point")
                .attr("stroke-width", 2)
                .style("vector-effect", "non-scaling-stroke")
                .attr("cx", d => path.centroid(d)[0])
                .attr("cy", d => path.centroid(d)[1])
                .attr('r', d => {
                    return getSize(d.properties._value) * 1 / this.props.transform.k
                })
                //.attr("transform", this.props.transform)
                .on("mouseenter", (d) => {
                    if (d.properties._value) {
                        const variables = {
                            ...d.properties, meta: {
                                [***REMOVED***]: d.properties.meta ? d.properties.meta.value : '', ...d.properties.meta,
                                value: d.properties._value
                            }
                        }
                        this.showToolTip(tooltip, variables, getColor(d.properties._value))
                    }
                })
                .on("mouseleave", (d) => {
                    this.hiddenToolTip()
                })


            this.g.selectAll(".point-label").data(filteredData)
                .enter()
                .append("text")
                .attr("class", "point-label")
                .attr("x", d => path.centroid(d)[0])
                .attr("y", d => path.centroid(d)[1])
                .attr("font-size", d => {
                    return (***REMOVED*** * (1 / this.props.transform.k)) + "px"
                })
                .attr("fill", ***REMOVED***)
                .text(d => {
                    return intl.formatNumber(format.style === 'percent' ? d.properties._value / 100 : d.properties._value, numberFormat)

                }).on("mouseover", (d) => {

            });
        } //Map Shapes


    }


    create() {

        console.log("create")
        const {
            app,
            name,
            file,
            path,
            zoom,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            ***REMOVED***,
            editing,
            data,
            measures,
            ***REMOVED***
        } = this.props

        if (file != "none") {
            this.loadJSON(file).then(json => {

                const features = json.features.map(d => {

                    const joinValue = d.properties[***REMOVED***]

                    if (app != 'csv' && data && data.children) {
                        const values = data.children.filter(d => d.value.indexOf(joinValue) > -1)
                        if (values.length > 0) {

                            const measureValue = (values[0][measures[0]])
                            d.properties.meta = values[0]
                            d.properties._value = measureValue

                            if (***REMOVED*** && ***REMOVED***!='none') {
                                const ***REMOVED*** = values[0].children.filter(f => f.type == ***REMOVED***).map(d => d.value)

                                const patternType = values[0].children.map(d => ({
                                    value: d.value, [measures[0]]: d[measures[0]]
                                })).sort(d => d.value)[0].value

                                d.properties.meta[***REMOVED***] = patternType
                            }

                        } else {
                            d.properties._value = null
                        }

                    } else if (app == 'csv') {
                        const values = data.data.filter(d => d[data.meta.fields[0]] == joinValue)
                        if (values.length > 0) {
                            d.properties.meta = values[0]
                            d.properties._value = values[0][data.meta.fields[1]]
                        } else {
                            d.properties._value = null
                        }


                    } else {
                        d.properties._value = null
                    }
                    return d
                })


                const newJson = {...json, features}


                this.***REMOVED***(newJson);


            });
        }
    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        const {projection} = this.props

        this.create()
    }

    ***REMOVED***() {
        this.create()
        this.props.zoom.current.fullView()
    }

    render() {

        const {
            id,
            file,
            path,
            zoom,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            ***REMOVED***,
            ***REMOVED***,

            editing
        } = this.props

        return <g className={"data " + id} ref={this.gRef}/>
    }

}

const DataWrapper = (props) => {
    const {
        id, unique, filters, csv, app, group = "default", ***REMOVED***, editing, ***REMOVED***,
    } = props

    let params = {}

    const ff = filters || {}

    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
    }



    return (<DataProvider
        editing={editing}
        params={params}
        app={app}
        csv={***REMOVED***(csv)}
        group={group}
        editing={editing}
        ignoreErrors={true}
        isSvg={true}
        store={[app, unique, id]}
        source={***REMOVED*** + (***REMOVED*** != 'none' ? "/"+***REMOVED*** : '')}>
        <DataConsumer>
            <DataLayer {...props}></DataLayer>
        </DataConsumer>

    </DataProvider>)
}

export default injectIntl(DataWrapper)