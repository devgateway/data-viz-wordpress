import React, {useEffect, useRef} from 'react';
import {connect} from "react-redux";
import * as d3 from 'd3' // d3 plugin
import * as topojson from "topojson-client";
import {Icon, Popup} from "semantic-ui-react";
import {***REMOVED***} from "react-intl";

/*
  id: Date.now(),
    name: 'New Layer',
    app: "csv",
    dimension1: "none",
    dimension2: "none",
    measures: [],

    filters: [],

    csv: "",

    file: 'none',

    opacity: 1,

    fillColor: '#FFFFFF',
    markFillColor: '#FFFFFF',

    borderColor: '#000000',
    ***REMOVED***: '#000000',
    markSizeScale: 2,

    labelColor: '#000000',
    ***REMOVED***: '#000000',
    labelFontSize: 2,

    labelFilter: [],
    labelSettings: {},

    labelField: 'none',
    type: 'base', //base layer user will select only a file
    //type:'shape', //shape layer user will select file and data source
    //type:'data', //will select data source and symbols + symbols configuration
    useBreaks: false,
    usePattern: false,

    format: {
        "style": "percent",
        "minimumFractionDigits": 1,
        "maximumFractionDigits": 1,
        "currency": "USD",
    },
    ***REMOVED***: 'none',
    ***REMOVED***: 'none',
    ***REMOVED***: false,
    ***REMOVED***: 'none',
    patterns: [],
    tooltip: "Value {value}",
    breaks: [],

* */
const ***REMOVED*** = (props) => {
    const {fillColor, borderColor, name} = props
    return <div className={"legend"}>
        <div className={"legend-item"}>
            <div className={"legend-color"} style={{***REMOVED***: fillColor, borderColor: borderColor}}/>
            <div className={"legend-label"}>{name}</div>
        </div>
    </div>
}

const toId = (key) => {
    //replace blank space by underscore
    if (!key) return ""
    return "legend_pattern_" + key.toString().replace(/ /g, "_")
}
const ***REMOVED*** = (props) => {
    const {
        markFillColor,
        fillColor,
        markSizeScale,
        ***REMOVED***,
        ***REMOVED***,
        name,
        useBreaks,
        breaks,
        usePattern,
        patterns,
        measures,
        borderColor,
        data,
        ***REMOVED***,
        divRef,
        id,
        patternWidth = .35,
        patternHeight = .25,

    } = props
    let measureLabel = measures

    if (***REMOVED***) {
        measureLabel = ***REMOVED***[measures[0]]
    }


    const g = d3.select(`#data-${id}`)
    const ***REMOVED*** = g.selectAll("defs").selectAll("pattern")

    if (usePattern&&divRef.current && ***REMOVED***.size() > 0) {
        const patternsData = ***REMOVED***.data()
        d3.select(divRef.current).select("svg").remove()
        const g = d3.select(divRef.current).append("svg")

        const defs = g.append("defs")
        defs.selectAll("pattern").remove()
        defs.selectAll("pattern")
            .data(patternsData).enter()
            .append("pattern")
            .attr('id', d => toId(d.key))
            .attr('patternUnits', '***REMOVED***')
            .attr('width', 5)
            .attr('height', 5)
            .attr("x", 0).attr("y", 0)
            .attr("***REMOVED***", d => `rotate(${!d.rotation ? 0 : d.rotation})`)

        patternsData.forEach(d => {
            if (d.type === 'lines') {
                defs.select("#" + toId(d.key))
                    .append("rect")
                    .attr("x", 0)
                    .attr('width', 1)
                    .attr('height', 10)
                    .attr("opacity", .75)
                    .attr('fill', d.color)
            }
            if (d.type === 'squares') {
                defs.select("#" + toId(d.key))
                    .append("rect")
                    .attr('width', 3)
                    .attr('height', 3)
                    .attr('fill', d.color)
                    .attr("opacity", 1)
                    .attr("stroke-width", 1)

            }
            if (d.type === 'dots') {
                defs.select("#" + toId(d.key))
                    .append("circle")
                    .attr("cx", 2)
                    .attr("cy", 2)
                    .attr('r', 2)
                    .attr('fill', d.color)
                    .attr("opacity", 1)
                    .attr("stroke-width", 1)

            }
            if (d.type === 'triangle') {
                defs.select("#" + toId(d.key))
                    .append("polygon")
                    .attr("points", "5,0 8,8 0,5")
                    .attr('fill', d.color)
                    .attr("opacity", 1)
                    .attr("stroke-width", 1)

            }
        })


        g.attr("width", "150px")
            .attr("height", "auto")

        g.selectAll(".legend-squares")
            .data(patternsData)
            .enter()
            .append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("y", (d, i) => (i * 22))
            .attr("x", 20)
            .attr("stroke", borderColor)
            .attr("style", (d) => {
                return "none;fill:url(#" + toId(d.key) + ");"
            })

        g.selectAll(".patterns-labels")
            .data(patternsData)
            .enter()
            .append("text")
            .attr("class","patterns-labels")
            .attr("y", (d, i) => (i * 22))
            .attr("x", 40)

            .text(d=>d.key)
    }

    return <div className={"legend"}>
        {***REMOVED*** && !useBreaks && <div>
            <div className={"legend-item"}>
                <div className={"legend-color"} style={{***REMOVED***: fillColor}}/>
                <div className={"legend-label"}>{name}</div>

            </div>
            <div className={"legend-breaks"}>
                <div className={"break"}>

                    <div className={"break-item"} style={{
                        ***REMOVED***: markFillColor,
                        border: `1px solid ${***REMOVED***}`,

                    }}></div>
                    <div className={"break-label"}> {measureLabel}</div>
                </div>
            </div>
        </div>
        }

        {***REMOVED*** && useBreaks && <div>
            <div className={"legend-item"}>
                <div className={"legend-color"} style={{***REMOVED***: fillColor, borderColor: borderColor}}/>
                <div className={"legend-label"}>{name}</div>
            </div>
            <div className={"legend-breaks"}>
                <div className={"break-label"}> {measureLabel}</div>
                {breaks.map((b, i) => {
                    return (<div className={"break"}>
                        <div className={"break-item"} style={{
                            ***REMOVED***: b.color,
                            border: `1px solid ${borderColor}`,
                        }}></div>
                        <div className={"break-label"}> &lt; {b.end}</div>
                    </div>)

                })}
            </div>
        </div>
        }


        {!***REMOVED*** && <div>
            <div className={"legend-item"}>
                <div className={"legend-color"} style={{***REMOVED***: fillColor, borderColor: borderColor}}/>
                <div className={"legend-label"}>{name}</div>
            </div>
            {useBreaks && <div className={"legend-breaks"}>
                <div className={"break-label"}> {measureLabel}</div>
                {breaks.map((b, i) => {
                    return (<div className={"break"}>
                        <div className={"break-item-shape"} style={{
                            ***REMOVED***: b.color,
                            border: `1px solid ${borderColor}`,
                        }}></div>
                        <div className={"break-label"}> &lt; {b.end}</div>
                    </div>)

                })}
            </div>}
        </div>
        }


    </div>
}
const Legends = (props) => {

    const divRef = useRef(null);
    const {layers = []} = props;
    return <div className={"legends"} ref={divRef}>
        {layers.map(l => {
            return <div>
                {l.type == "base" && <***REMOVED***  {...l}/>}
                {l.type == "data" && <***REMOVED*** divRef={divRef} {...l}/>}
            </div>
        })}

    </div>
}

export default Legends