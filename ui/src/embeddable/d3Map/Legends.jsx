import React, {useEffect} from 'react';
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

const ***REMOVED*** = (props) => {
    const {
        markFillColor,
        fillColor,
        markSizeScale,
        ***REMOVED***,
        name,
        useBreaks,
        breaks,
        usePatterns,
        patterns,
        measures,
        borderColor
    } = props

    debugger;

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

                    }}></div>
                    <div className={"break-label"}> {measures}</div>
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
                {breaks.map((b, i) => {
                    return (<div className={"break"}>
                        <div className={"break-item"} style={{
                            ***REMOVED***: b.color,

                        }}></div>
                        <div className={"break-label"}>  &lt; {b.end}</div>
                    </div>)

                })}
            </div>
        </div>
        }
    </div>
}
const Legends = (props) => {

    const {layers = []} = props;
    return <div className={"legends"}>
        {layers.map(l => {
            return <div>
                {l.type == "base" && <***REMOVED*** {...l}/>}
                {l.type == "data" && <***REMOVED*** {...l}/>}
            </div>
        })}

    </div>
}

export default Legends