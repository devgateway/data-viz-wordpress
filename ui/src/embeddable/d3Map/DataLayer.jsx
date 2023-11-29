import React, {useEffect} from 'react';
import {connect} from "react-redux";
import BaseLayer from "./BaseLayer";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import {parse} from "../utils/parseUtils";
import * as d3 from "d3";
import {injectIntl} from "react-intl";

import BreaksStyles from "./BreaksStyles.js";


const toGenericID = (key) => {
    //replace blank space by underscore
    if (!key) return ""
    return key.toString().replace(/ /g, "_")
}
const toId = (key) => {
    //replace blank space by underscore
    if (!key) return ""
    return "pattern_" + toGenericID(key)
}


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
            patternDiscriminatorLabel,
            breaks,
            patterns,
            projection,
            useBreaks,
            ***REMOVED***,
            usePattern,

            intl,


        } = this.props


        const brStyles = new BreaksStyles({
            breaks: breaks,
            ***REMOVED***: markFillColor,
            ***REMOVED***: ***REMOVED***,
            defaultSize: markSizeScale
        })

        if (this.gRef && this.gRef.current) {
            this.g = d3.select(this.gRef.current)
            let numberFormat = {
                style: (format.style === 'compacted') ? 'decimal' : format.style,
                notation: (format.style === 'compacted') ? 'compact' : "standard",
                currency: format.currency,
                minimumFractionDigits: parseInt(format.minimumFractionDigits),
                maximumFractionDigits: parseInt(format.maximumFractionDigits)
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

            this.g.attr("class", "base-layer") //add unique name
            this.createPaths(json)

            this.g.selectAll(".point").remove()
            this.g.selectAll(".point-label").remove()
            this.g.selectAll(".shape-pattern").remove()

            this.g.selectAll("defs").remove()
            const k = this.props.transform ? this.props.transform.k : 1

            const patternWidth = 10 * 1 / k
            const patternHeight = 10 * 1 / k


            const defs = this.g.append("defs")
            let patternsData = []
            if (app == "csv" && ***REMOVED*** != 'none') {
                patternsData = [...new Set(data.data.map(d => d[***REMOVED***]))].map(key => {
                    return {
                        key: key,
                        type: patterns[key + "_symbol"],
                        color: patterns[key + "_color"],
                        rotation: patterns[key + "_rotation"]
                    }
                })
            } else if (***REMOVED*** != 'none') {
                const types = data.metadata.types.filter(d => d.dimension == ***REMOVED***)
                patternsData = types && types.length > 0 ? types[0].items.map(item => {
                    const key = item.value
                    return {
                        key: key,
                        type: patterns[key + "_symbol"],
                        color: patterns[key + "_color"],
                        rotation: patterns[key + "_rotation"]
                    }

                }) : []
            }


            defs.selectAll("pattern").remove()
            defs.selectAll("pattern")
                .data(patternsData).enter()
                .append("pattern")
                .attr('id', d => toId(d.key))
                .attr('patternUnits', '***REMOVED***')
                .attr('width', patternWidth)
                .attr('height', patternHeight)
                .attr("x", 0).attr("y", 0)
                .attr("***REMOVED***", d => `rotate(${d.rotation})`)

            patternsData.forEach(d => {
                if (d.type === 'lines') {
                    defs.select("#" + toId(d.key))
                        .append("rect")
                        .attr("x", .05)
                        .attr('width', patternWidth / 2)
                        .attr('height', patternHeight)
                        .attr("opacity", 1)
                        .attr('fill', d.color)
                }
                if (d.type === 'squares') {
                    defs.select("#" + toId(d.key))
                        .append("rect")
                        .attr('width', patternWidth / 2)
                        .attr('height', patternHeight / 2)
                        .attr('fill', d.color)
                        .attr("opacity", 1)
                        .attr("stroke-width", 1)

                }
                if (d.type === 'dots') {
                    defs.select("#" + toId(d.key))
                        .append("circle")
                        .attr("cx", patternWidth / 2)
                        .attr("cy", patternHeight / 2)
                        .attr('r', patternWidth / 2.5)
                        .attr('fill', d.color)
                        .attr("opacity", 1)
                        .attr("stroke-width", 1)

                }
                if (d.type === 'triangle') {
                    defs.select("#" + toId(d.key))
                        .append("polygon")
                        .attr("points", `${patternWidth / 2} 0, 0 ${patternWidth}, ${patternWidth}  ${patternWidth} `)
                        .attr('fill', d.color)
                        .attr("opacity", 1)
                        .attr("stroke-width", 1)

                }
            })


            if (!***REMOVED***) {
                this.g.selectAll("path")
                    .attr("fill", d => {
                        if (!d || !d.properties || !d.properties._value) {
                            return fillColor
                        }
                        return brStyles.getColor(d.properties._value)
                    })
                    .attr("stroke", borderColor)
                    .attr("id", "state-borders")
                    .attr("d", path).on("mouseenter", (d) => {
                    if (d.properties._value) {
                        this.showToolTip(tooltip, ***REMOVED***(d), brStyles.getColor(d.properties._value))
                    }
                })
                    .on("mouseleave", (d) => {
                        this.hiddenToolTip()
                    })
                    .on("mousemove", (d) => {
                        this.moveToolTip()
                    })

                this.createLabels(json)

            }


            if (usePattern && json && json.features) {
                json.features.forEach(d => {
                    let patterns = []
                    if (d.properties && d.properties.meta) {
                        patterns = (app != "csv") ? d.properties.meta[***REMOVED***] ? d.properties.meta[***REMOVED***] : [] : [d.properties.meta[***REMOVED***]]
                        if (patterns && patterns.length > 0) {
                            patterns.forEach(p => {
                                this.g.append("path")
                                    .attr("d", path(d))
                                    .attr("class", "shape-pattern")
                                    .attr("opacity", d => {
                                        if (useBreaks) {
                                            return .7
                                        }
                                    })
                                    .attr("fill", d => {
                                        return "transparent"
                                    })

                                    .attr("style", () => {
                                        return "none;fill:url(#" + toId(p) + ");"
                                    })
                                    .on("mouseenter", () => {
                                        this.showToolTip(tooltip, ***REMOVED***(d), brStyles.getColor(d.properties._value))
                                    }).on("mousemove", (d) => {
                                    this.moveToolTip()
                                }).on("mouseleave", (d) => {
                                    this.hiddenToolTip()
                                })

                            })
                        }

                    }

                })

                /*Adding patterns to legends*/
                debugger;
                patternsData = patternsData.filter(p => {
                    return p.type != undefined
                }).sort((a, b) => {
                    return new Intl.Collator(intl.locale, {caseFirst: 'upper', numeric: true, sensitivity: 'variant'})
                        .compare(a.key, b.key);
                })
                debugger;


                d3.select(this.gRef.current.parentNode.parentNode).select(`.layer_${toGenericID(id)}`).select("svg").remove()
                const g = d3.select(this.gRef.current.parentNode.parentNode).select(`.layer_${toGenericID(id)}`).append("svg")
                const defs = g.append("defs")
                defs.selectAll("pattern").remove()
                defs.selectAll("pattern")
                    .data(patternsData).enter()
                    .append("pattern")
                    .attr('id', d => 'l_' + toId(d.key))
                    .attr('patternUnits', '***REMOVED***')
                    .attr('width', 5)
                    .attr('height', 5)
                    .attr("x", 0).attr("y", 0)
                    .attr("***REMOVED***", d => `rotate(${!d.rotation ? 0 : d.rotation})`)

                patternsData.forEach(d => {
                    if (d.type === 'lines') {
                        defs.select("#" + 'l_' + toId(d.key))
                            .append("rect")
                            .attr("x", 0)
                            .attr('width', 1)
                            .attr('height', 10)
                            .attr("opacity", .75)
                            .attr('fill', d.color)
                    }
                    if (d.type === 'squares') {
                        defs.select("#" + 'l_' + toId(d.key))
                            .append("rect")
                            .attr('width', 3)
                            .attr('height', 3)
                            .attr('fill', d.color)
                            .attr("opacity", 1)
                            .attr("stroke-width", 1)

                    }
                    if (d.type === 'dots') {
                        defs.select("#" + 'l_' + toId(d.key))
                            .append("circle")
                            .attr("cx", 2)
                            .attr("cy", 2)
                            .attr('r', 2)
                            .attr('fill', d.color)
                            .attr("opacity", 1)
                            .attr("stroke-width", 1)

                    }
                    if (d.type === 'triangle') {
                        defs.select("#" + 'l_' + toId(d.key))
                            .append("polygon")
                            .attr("points", "5,0 8,8 0,5")
                            .attr('fill', d.color)
                            .attr("opacity", 1)
                            .attr("stroke-width", 1)

                    }
                })

                g.attr("width", "150px")
                    .attr("height", patternsData.length * 40 + "px")

                g.append("text")
                    .attr("class", "patterns-title")
                    .attr("y", 5)
                    .attr("x", 12)
                    .text(a => app === 'csv' ? ***REMOVED*** : patternDiscriminatorLabel)

                g.selectAll(".legend-squares")
                    .data(patternsData)
                    .enter()
                    .append("rect")
                    .attr("width", 18)
                    .attr("height", 18)
                    .attr("y", (d, i) => (i * 22) + 25)
                    .attr("x", 20)
                    .attr("stroke", borderColor)
                    .attr("style", (d) => {
                        return "none;fill:url(#" + 'l_' + toId(d.key) + ");"
                    })

                debugger;
                g.selectAll(".patterns-labels")
                    .data(patternsData)
                    .enter()
                    .append("text")
                    .attr("class", "patterns-labels")
                    .attr("y", (d, i) => (i * 22) + 25)
                    .attr("x", 40)
                    .text(d => d.key)

            }
            if (***REMOVED***) {
                this.createLabels(json)


                this.g.selectAll(".point")
                    .data(filteredData)
                    .enter()
                    .append("circle")
                    .attr("fill", d => brStyles.getColor(d.properties._value, true))
                    .attr("stroke", ***REMOVED***)
                    .attr("class", "point")
                    .attr("stroke-width", 2)
                    .style("vector-effect", "non-scaling-stroke")
                    .attr("cx", d => path.centroid(d)[0])
                    .attr("cy", d => path.centroid(d)[1])
                    .attr('r', d => {
                        return brStyles.getSize(d.properties._value) * 1 / k
                    })
                    //.attr("transform", this.props.transform)
                    .on("mouseenter", (d) => {
                        debugger;
                        if (d.properties._value) {

                            const variables = {
                                ...d.properties, meta: {
                                    [***REMOVED***]: d.properties.meta ? d.properties.meta.value : '', ...d.properties.meta,
                                    value: d.properties._value
                                }
                            }
                            this.showToolTip(tooltip, variables, brStyles.getColor(d.properties._value))
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
                        return (***REMOVED*** * (1 / k)) + "px"
                    })
                    .attr("fill", ***REMOVED***)
                    .text(d => {
                        return intl.formatNumber(format.style === 'percent' ? d.properties._value / 100 : d.properties._value, numberFormat)

                    }).on("mouseover", (d) => {

                });
            } //Map Shapes


        }


    }


    create() {


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
                            if (***REMOVED*** && ***REMOVED*** != 'none') {
                                const ***REMOVED*** = values[0] && values[0].children ? values[0].children.filter(f => f.type == ***REMOVED***).map(d => d.value) : []
                                /*
                                 const patternType = values[0].children.map(d => ({
                                     value: d.value, [measures[0]]: d[measures[0]]
                                 })).sort(d => d.value)[0].value
                                 */
                                d.properties.meta[***REMOVED***] = ***REMOVED***
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

        return <g id={"data-" + id} className={"data " + id} ref={this.gRef}/>
    }

}

const DataWrapper = (props) => {
    const {
        id, unique, filters, csv, app, group = "default", ***REMOVED***, editing, ***REMOVED***, intl
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
        source={***REMOVED*** + (***REMOVED*** != 'none' ? "/" + ***REMOVED*** : '')}>
        <DataConsumer>
            <DataLayer {...props}></DataLayer>
        </DataConsumer>

    </DataProvider>)
}

export default injectIntl(DataWrapper)