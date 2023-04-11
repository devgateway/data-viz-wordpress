import React, {Fragment, useState} from 'react'
import Tooltip from "./Tooltip"
import {ResponsiveBar} from '@nivo/bar'
import {injectIntl} from 'react-intl';
import {useTheme} from '@nivo/core'
import {line} from "d3-shape";
import LineLayer from './LineLayer'
import Papa from "papaparse";

const POSITION_MIDDLE = "middle";
const POSITION_TOP = "top";
const ZERO_LINE_COLOR = "#66676d";
const GRID_LINE_COLOR = '#dddddd';
const DEFAULT_COLOR = 'none';
const LABEL_SKIP_WIDTH = 30;
const LABEL_SKIP_HEIGHT = 0;
const COLOR_VARIABLE = "_Color"

const Chart = ({
                   ***REMOVED***,
                   legends,
                   marginLeft,
                   marginTop,
                   marginRight,
                   marginBottom,
                   options,
                   intl,
                   format,
                   colors,
                   groupMode,
                   height,
                   showLegends,
                   ***REMOVED***,
                   tickRotation,
                   offsetText,
                   tickColor,
                   layout,
                   reverse,
                   offsetY,
                   ***REMOVED***,
                   lineColor,
                   lineTooltip,
                   lineTitle,
                   tooltip,
                   ***REMOVED***,
                   overlays,
                   maxValue,
                   valueScale,
                   ***REMOVED***,
                   legendLabel,
                   ***REMOVED***,
                   fixedMinValue,
                   fixedMaxValue,
                   barPadding,
                   ***REMOVED***,
                   ***REMOVED***,
                   showGrid,
                   ***REMOVED***,
                   xLabelColor,
                   barLabelColor,
                   ***REMOVED***,
                   ***REMOVED***,
                   ***REMOVED***,
                   ***REMOVED***,
                   showTickLine,
                   showRightAxis,
                   offsetRight,
                   offsetBottom,
                   ***REMOVED***,
                   ***REMOVED***,
                   ***REMOVED***,
                   ***REMOVED***,
                   ***REMOVED***,
                   ***REMOVED***,
                   groupTotalFixedPosition,
                   userMeasures,
                   tooltipEnableMarkdown,
                   ***REMOVED***,
                   minMaxClamp,
                   reverseLegend
               }) => {

    const [filter, setFilter] = useState([])
    const {colorBy, scheme} = colors
    const ***REMOVED*** = {}
    overlays.forEach((o, idx) => {
        ***REMOVED***[idx] = true
    })

    const [showLine, setShowLine] = useState(***REMOVED***)


    const ***REMOVED*** = (data) => {
        return drawLine(data, '1 0', GRID_LINE_COLOR, 'Y')
    }

    const createZeroLineHighlight = (data) => {
        return drawLine(data, '4 4', ZERO_LINE_COLOR, 'X')
    }


    const ***REMOVED*** = (data) => {
        return drawLine(data, '1 0', GRID_LINE_COLOR, 'X')
    }

    const ***REMOVED*** = (data) => {
        const {yScale, xScale, innerWidth, innerHeight, bars} = data

        return (
            <Fragment>
                {bars.filter(b => b.data.value != null).map(bar => {
                    let seriedId = bar.data.indexValue;
                    if (options.***REMOVED*** && options.***REMOVED***.size > 1) {
                        seriedId = bar.data.id;
                    }
                   
                    const ***REMOVED*** = ***REMOVED***.filter(c => c.serieLabel == seriedId)[0]
                    if (***REMOVED*** && ***REMOVED***.low && ***REMOVED***.high) {
                        const low = yScale(parseFloat(***REMOVED***.low))
                        const high = yScale(parseFloat(***REMOVED***.high))
                        return (
                            <g>
                                <line
                                    y1={low} y2={high}
                                    x1={(bar.x + bar.width / 2)}
                                    x2={(bar.x + bar.width / 2)}
                                    strokeWidth={1}
                                    stroke={ZERO_LINE_COLOR}/>
                                <line
                                    y1={low} y2={low}
                                    x1={(bar.x + bar.width / 2) - 3}
                                    x2={(bar.x + bar.width / 2) + 3}
                                    strokeWidth={1}
                                    stroke={ZERO_LINE_COLOR}/>
                                <line
                                    y1={high} y2={high}
                                    x1={(bar.x + bar.width / 2) - 3}
                                    x2={(bar.x + bar.width / 2) + 3}
                                    strokeWidth={1}
                                    stroke={ZERO_LINE_COLOR}/>
                            </g>

                        )
                    }

                })}

            </Fragment>
        );
    }

    const drawLine = (data, ***REMOVED***, color, axis) => {
        const {yScale, innerWidth, innerHeight} = data;
        let points
        let lineGenerator
        if (axis == 'X') {
            points = [0, innerWidth];
            lineGenerator = line()
                .x((xPoint, index) => {
                    if (index === 0) {
                        return -10
                    } else {
                        return xPoint;
                    }
                }).y(xPoint => yScale(0));
        } else {
            points = [0, innerHeight];
            lineGenerator = line()
                .x(point => 0)
                .y(point => {
                    return point;
                });
        }


        return (
            <Fragment>
                <path
                    d={lineGenerator(points)}
                    fill="none"
                    stroke={color}
                    style={{pointerEvents: "none", ***REMOVED***: ***REMOVED***}}
                />
            </Fragment>
        );
    }

    const getTextWidth = (text, font) => {
        // re-use canvas object for better performance
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width;
    }
    const ***REMOVED*** = (col, amt) => {

        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col, 16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

    }

    const applyFilter = (values, filterKeys) => {
        if (filter) {
            if ((colors.colorBy === 'index' || colors.colorBy === 'id' || colors.colorBy === 'values') && !filterKeys) {
                return values.filter(d => filter.indexOf(d[options.indexBy]) === -1);
            } else {
                return values ? values.filter(d => filter.indexOf(d) === -1) : [];
            }
        } else {
            return values
        }
    }


    const CustomTick = (tick) => {
        const theme = useTheme()
        let ***REMOVED***;
        if (***REMOVED***) {
            ***REMOVED*** = tickColor
        } else {
            const legendItem = chartLegends.find(c => c.id == tick.value)
            ***REMOVED*** = legendItem ? legendItem.color : tickColor
        }
        const width = getTextWidth(tick.value, "12px Roboto") + 30

        if ((tickRotation > 0) && (tickRotation < 180)) {

            return (<g transform={`translate(${tick.x},${tick.y + 30})`}>
                {showTickLine &&
                    <line
                        stroke={***REMOVED***}
                        strokeWidth={1.5} y1={-32}
                        y2={-12}/>
                }

                <g transform={`translate(0, ${tick.y + offsetText})`}>
                    <rect transform={`rotate(${tickRotation})`}
                          x={-12}
                          y={-12}
                          rx={2}
                          ry={2} width={width} height={22}
                          fill={***REMOVED***}/>


                    <text transform={`rotate(${tickRotation})`}
                          textAnchor="start"
                          ***REMOVED***="middle"
                          style={{
                              ...theme.axis.ticks.text,
                              fill: xLabelColor,
                              fontSize: "12px",
                          }}>
                        {tick.value}
                    </text>
                </g>
            </g>)

        } else if ((tickRotation > 180) && (tickRotation < 360)) {
            return (<g transform={`translate(${tick.x},${tick.y + 30})`}>
                {showTickLine &&
                    <line
                        stroke={***REMOVED***}
                        strokeWidth={1.5} y1={-32}
                        y2={-12}/>
                }

                <g transform={`translate(0, ${tick.y + offsetText})`}>
                    <rect transform={`rotate(${tickRotation - 180})`}
                          x={-12}
                          y={-10}
                          rx={2}
                          ry={2} width={width} height={22}
                          fill={***REMOVED***}/>


                    <text transform={`rotate(${tickRotation})`}
                          textAnchor="end"
                          ***REMOVED***="middle"
                          style={{
                              ...theme.axis.ticks.text,
                              fill: xLabelColor,
                              fontSize: "12px",
                          }}>
                        {tick.value}
                    </text>
                </g>
            </g>)

        } else {
            return (<g transform={`translate(${tick.x},${tick.y + 30})`}>
                {showTickLine &&
                    <line
                        stroke={***REMOVED***}
                        strokeWidth={1.5} y1={-32}
                        y2={-12}/>
                }

                <g transform={`translate(0, ${tick.y + offsetText})`}>
                    <rect transform={`rotate(${tickRotation})`}
                          x={(-1 * (width) / 2)}
                          y={-12}
                          rx={2}
                          ry={2} width={width} height={22}
                          fill={***REMOVED***}/>


                    <text transform={`rotate(${tickRotation})`}
                          textAnchor="middle"
                          ***REMOVED***="middle"
                          style={{
                              ...theme.axis.ticks.text,
                              fill: xLabelColor,
                              fontSize: "12px",
                          }}>
                        {tick.value}
                    </text>
                </g>
            </g>)
            }
        }
    const toggle = (id) => {
        const newFilter = filter.slice();
        if (newFilter.indexOf(id) > -1) {
            const index = newFilter.indexOf(id);
            newFilter.splice(index, 1);
        } else {
            newFilter.push(id)
        }
        setFilter(newFilter)
    }

    const toggleLine = (idx) => {
        const ***REMOVED*** = Object.assign({}, showLine)
        ***REMOVED***[idx] = !***REMOVED***[idx]
        setShowLine(***REMOVED***)       
    }

    const barLabel = ({bars}) => {

        return (
            <g>
                {bars.map((bar) => {
                    const {width, height, y, x, data} = bar;
                    const value = data.value ? intl.formatNumber(format.style === 'percent' ? data.value / 100 : data.value, format) : ''
                    const valueLength = value.length
                    let yPos;
                    let xPos;
                    if (width >= LABEL_SKIP_WIDTH && height >= LABEL_SKIP_HEIGHT) {
                        if (layout == 'vertical') {
                            let padding = 6 // adjusts position not to be too close to the bar
                            yPos = y - padding;
                            xPos = x + (width / 2) - valueLength * 3.5
                        } else {
                            let padding = 4 // adjusts position not to be too close to the bar
                            yPos = (y + height / 2) + padding
                            xPos = x + width + 5
                        }

                        return (
                            <text y={yPos} x={xPos} style={{fill: barLabelColor}}>{`${value
                            }`}</text>
                        );

                    }
                })}
            </g>
        );
    }


    const ***REMOVED*** = (props) => {
        
        const indexes = options.data.filter(d=>filter.indexOf(d[options.indexBy])==-1).map(d => d[options.indexBy])
            //.filter(filter)
        const {bars} = props
        return (
            <g>
                {indexes.filter(key => bars.filter(b => b.data.indexValue == key).length > 0).map(key => {

                    const barsInGroup = bars.filter(b => b.data.indexValue == key);


                    let anchor = "right"
                    let x = 0
                    let y = 0
                    if (layout == "horizontal") {

                        if (groupMode === "stacked") {
                            if (groupTotalFixedPosition) {
                                x = props.innerWidth - 20 //barsInGroup.map(b => b.width).reduce((a, b) => a>b?a:b)
                            }else{
                                x = barsInGroup.map(b => b.width).reduce((a, b) => a+b)
                                if (reverse) {
                                    x = props.innerWidth - x
                                 }
                            }

                            y = props.yScale(key) + barsInGroup[0].height / 2
                        } else {
                            if (groupTotalFixedPosition) {
                                x = props.innerWidth //barsInGroup.map(b => b.width).reduce((a, b) => a>b?a:b)
                            }else{
                                x = barsInGroup.map(b => b.width).reduce((a, b) => a>b?a:b)
                                if (reverse) {
                                   x = props.innerWidth - x
                                }
                                
                            }
                            y = props.yScale(key) + barsInGroup.map(b => b.height).reduce((a, b) => a + b) / 2

                        }
                        x = x + parseInt(***REMOVED***) + 5

                    } else {
                        anchor = "middle"
                        if (groupMode === "stacked") {
                            x = props.xScale(key) + barsInGroup[0].width / 2
                            if (groupTotalFixedPosition) {
                                y = y - parseInt(***REMOVED***)
                            } else {                                
                                if (reverse) {
                                    y = parseInt(***REMOVED***) + barsInGroup.map(b => b.height).reduce((a, b) => a + b) + 14
                                } else {
                                    y = props.innerHeight - parseInt(***REMOVED***) - barsInGroup.map(b => b.height).reduce((a, b) => a + b) - 5
                                }
                            }
                        } else {
                            x = props.xScale(key) + barsInGroup.map(b => b.width).reduce((a, b) => a + b) / 2
                            if (reverse) {
                                y = props.innerHeight
                            }
                            if (groupTotalFixedPosition) {
                                y = y - parseInt(***REMOVED***)

                            } else {
                               if (barsInGroup.length % 2 == 1) {
                                const index = Math.floor(barsInGroup.length / 2)
                                y = barsInGroup[index].height                                
                              } else {
                                const index = barsInGroup.length / 2
                                y = Math.max(barsInGroup[index].height, barsInGroup[index-1].height)
                              }
                              if (reverse) {
                                y = y + 14 + ***REMOVED***
                             } else {
                                y = props.innerHeight - y - ***REMOVED*** - 5                                 
                             }
                            }                           
                        }
                    }


                    const group = options.data.filter(d => d[options.indexBy] == key)[0]
                    const total = group.parent_variables ? group.parent_variables[***REMOVED***] : group[***REMOVED***]

                    return (
                        <text y={y} x={x} style={{fill: barLabelColor}}>
                            <tspan textAnchor={anchor}>{***REMOVED*** ? ***REMOVED*** + " " : ""}
                                {
                                    intl.formatNumber(***REMOVED***.style === 'percent' ? total / 100 : total, ***REMOVED***)
                                }</tspan>
                        </text>
                    );

                })}
            </g>
        );
    }

    let margins = {top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft}

    let chartLegends = []

    if (options.data) {
        chartLegends = colors.colorBy === 'index' ? options.data.map((d, index) => {
            let theColor;
            let enabled = true;
            if (filter.indexOf(d[options.indexBy]) > -1) {
                enabled = false
                theColor = DEFAULT_COLOR
            } else {
                theColor = d[COLOR_VARIABLE] ? d[COLOR_VARIABLE] : ***REMOVED***.getColor(d.id, d)
            }
            return {
                enabled: enabled,
                color: theColor,
                id: d[options.indexBy],
                label: d[options.indexBy]
            }
        }) : options.keys.map((k) => {
            let theColor;
            let enabled = true;
            if (filter.indexOf(k) > -1) {
                enabled = false
                theColor = DEFAULT_COLOR
            } else {
                theColor = ***REMOVED***.getColorByKey(k)
            }
            return {
                enabled: enabled,
                color: theColor,
                id: k,
                label: k
            }
        })
    }

    let overlayData
    let overLayMax = 0
    let overLayMin = 0
    if (***REMOVED***) {
        overlayData = Papa.parse(***REMOVED***, {header: false, dynamicTyping: true});
        overLayMax = Math.max(...overlayData.data.map(d => d[1]))
        overLayMin = Math.min(...overlayData.data.map(d => d[1]))
    }

    
    const ***REMOVED*** = () => {
        let values = [];
        if (***REMOVED***) {
            ***REMOVED***.forEach(c => {
                if (c.low) {
                    values.push(parseFloat(c.low))
                }
                if (c.high) {
                    values.push(parseFloat(c.high))
                }
            })

            if (options.data) {
                options.data.map(d => {
                    options.keys.forEach(k => {
                        if (d[k]) {
                            values.push(d[k])
                        }
                    })
                })
            }
        }
        return values
    }
    
    let values = ***REMOVED***()
    let dataMax = Math.max(...values)
    let dataMin = Math.min(...values)

    const ***REMOVED*** = () => {
        if (groupMode === "stacked" && maxValue !== 'fixed' || (maxValue === 'fixed' && fixedMaxValue === null || fixedMaxValue === '')) {
            return Math.max(Math.max(...options.data.map(d => options.keys.map(x => d[x]?d[x]:0)).map(l => l.reduce((a, b) =>{
                return Math.max(a + b, a + 0)
              } ))), overLayMax)  * 1.1;             
        }
        
        return maxValue === 'fixed' && fixedMaxValue !== null && fixedMaxValue !== '' ? fixedMaxValue : Math.max(overLayMax, dataMax) * 1.05
    }

    const ***REMOVED*** = () => {
        const minVal = Math.min(overLayMin, dataMin)
        return maxValue === 'fixed' && fixedMinValue !== null && fixedMinValue !== '' ? fixedMinValue : minVal > 0 ? minVal * 0.9 : minVal * 1.1
    }

    const ***REMOVED*** = ***REMOVED***()
    const ***REMOVED*** = ***REMOVED***()

    
    let layers = ["axes", "bars"]
    if (***REMOVED***) {
        layers.push(***REMOVED***)
    }

    if (showGrid) {
        layers.unshift("grid")
    } else {
        layers.push(***REMOVED***)
        layers.push(***REMOVED***)
    }

    
    if (***REMOVED*** && overlays) {
        overlays.forEach((o, idx) => {
            /*
            app: 'csv',
            lineColor: ***REMOVED***("#555555"),
            ***REMOVED***: preFillCsv,
            tooltip: "",
            title: "",
            measure: [],
            */
            
            if (showLine[idx] == true) {
                const {app, ***REMOVED***, lineColor, tooltip, title, measure} = o
                if (o.app == 'csv') {                    
                    const overlayData = Papa.parse(***REMOVED***, {header: false, dynamicTyping: true});
                    const line = LineLayer(overlayData, lineColor, layout, groupMode, applyFilter(options.keys, true), tooltip, o.title, "")
                    layers.push(line)
                } else {
                    const overlayData = {}
                    const data = options.data.map(d => [d[options.indexBy], d.variables[o.measure[0]]])
                    
                    const measure =options.metadata.measures? options.metadata.measures.filter(m => m.value == o.measure[0]):[]
                    overlayData.data = data
                    const line = LineLayer(overlayData, lineColor, layout, groupMode, applyFilter(options.keys, true), tooltip, o.title, measure.length > 0 ? measure[0].label : "")
                    layers.push(line)

                }
            }
        })
    }

    if (***REMOVED*** === POSITION_TOP) {
        layers.push(barLabel)
    }

    if (***REMOVED***) {
        layers.push(createZeroLineHighlight)
    }

    layers.push(***REMOVED***)
    
    let ticks = parseInt(***REMOVED***)  

    const legendTitle = () => {
       return (<>{showLegends && legendLabel &&
            <div className={"legend item"}>
                <label className="legend-title">{legendLabel}</label>
            </div>
        }</>)
    }

    const legendItems = () => {
        if (reverseLegend){
            chartLegends.reverse()
        }
        return (<>
        {showLegends && chartLegends.map(legend => {
            return (
                <div className={`legend item ${legend.enabled ? "" : "ignore"}`} onClick={() => toggle(legend.id)}>


                    {***REMOVED*** && <input className={legend.enabled ? "" : "ignore"} type='checkbox'
                           checked={legend.enabled}
                           style={{
                               ***REMOVED***: ***REMOVED***? (colorBy === 'values' ? tickColor : legend.color) : "none",
                               color: "#000"
                           }}/>
                    }
                    {!***REMOVED*** && <input  type='checkbox'
                           checked={legend.enabled}
                           style={{
                               color: "#000"
                           }}/>}

                    {***REMOVED***&&<span className={ 'checkmark-with-bg' }
                           style={{***REMOVED***:  legend.color }}></span>}

                    {!***REMOVED***&&<span className={'checkmark'}></span>}


                    {***REMOVED***&&  <label className={legend.enabled ? "" : "ignore"}
                                               style={{
                                                   ***REMOVED***:  (colorBy === 'values' ? tickColor : legend.color) ,
                                                   color: ***REMOVED***
                                               }}>{legend.label}</label>}

                    {!***REMOVED***&&  <label className={legend.enabled ? "" : "ignore"}
                                               style={{
                                                   color: ***REMOVED***
                                               }}>{legend.label}</label>}



                </div>)


        })}
        {colorBy === "values" &&
            <div className={"legend item"}>
                <label className={"range min"} style={{
                    ***REMOVED***: ***REMOVED***.***REMOVED***(***REMOVED***.minValue),
                    color: '#fff'
                }}></label>
                <label>
                    {intl.formatNumber(format.style === 'percent' ? ***REMOVED***.minValue / 100 : ***REMOVED***.minValue, {
                        ...format,
                        minimumFractionDigits: 0
                    })}
                </label>
            </div>}

        {colorBy === "values" && <div className={"legend item"}>
            <label className={"range max"} style={{
                ***REMOVED***: ***REMOVED***.***REMOVED***(***REMOVED***.maxValue),
                color: '#fff'
            }}> </label>
            <label>
                {intl.formatNumber(format.style === 'percent' ? ***REMOVED***.maxValue / 100 : ***REMOVED***.maxValue, {
                    ...format,
                    minimumFractionDigits: 0
                })}
            </label>
        </div>}

        {showLegends && ***REMOVED*** && overlays.map((o, idx) => { 
            return (<div className={"legend item"} onClick={() => toggleLine(idx)}>
            <input className={***REMOVED*** && showLine[idx] ? "" : "ignore"}
                   type='checkbox' checked={showLine[idx]}
                   style={{
                       ***REMOVED***: showLine[idx] && ***REMOVED*** == true ? o.lineColor : "none",
                       color: "#000"
                   }}
            />
            <span className={***REMOVED*** ? 'checkmark-with-bg' : 'checkmark'}
                  style={{***REMOVED***: showLine[idx] && ***REMOVED*** == true ? o.lineColor : "none"}}></span>
            <label class={showLine[idx] ? "" : "ignore"} style={{
                ***REMOVED***: showLine[idx] && ***REMOVED*** == true ? o.lineColor: "none",
                color: ***REMOVED***
            }}>{o.title}</label>

        </div>)})}
        </>)
    }

    return (
        <div style={{height: height}}>
        {options && options.data && options.data.length > 0 && 
            <>
                <ResponsiveBar
                    colorBy={colors.colorBy}
                    animate={true}
                    enableLabel={***REMOVED*** == POSITION_MIDDLE}
                    {...options}
                    maxValue={***REMOVED***}
                    minValue={***REMOVED***}                    
                    keys={applyFilter(options.keys, true)}
                    data={applyFilter(options.data, false)}
                    groupMode={groupMode ? groupMode : "grouped"}
                    margin={margins}
                    innerPadding={***REMOVED***}
                    valueScale={{type: valueScale, clamp: maxValue === 'fixed' && minMaxClamp}}
                    colors={d => {
                        if (d && d.data[COLOR_VARIABLE]) {
                            return d.data[COLOR_VARIABLE]
                        }
                        const color=***REMOVED***.getColor(d.id, d.data);
                        return color
                    }
                    }
                    borderColor="#000"
                    reverse={reverse}
                    axisTop={null}
                    axisRight={showRightAxis ? {
                        tickSize: (layout == 'horizontal' && showTickLine) || layout === 'vertical' ? 5 : 0,
                        tickPadding: 5,
                        tickRotation: 0,
                        tickValues: ticks,
                        legend: legends.right,
                        ***REMOVED***: 'middle',
                        legendOffset: parseInt(offsetRight),
                        format: value => layout === 'horizontal' ? value : intl.formatNumber(format.style === 'percent' ? value / 100 : value, {
                            ...format                            
                        })
                    } : null}
                    axisBottom={
                        layout == 'horizontal' ? {
                            legend: legends.bottom,
                            ***REMOVED***: 'middle',
                            legendOffset: parseInt(offsetBottom),
                            tickPadding: 5,
                            tickRotation: 0,
                            format: value => layout === 'vertical' ? value : intl.formatNumber(format.style === 'percent' ? value / 100 : value, {
                                ...format                               
                            })
                        } : {
                            legend: legends.bottom,
                            ***REMOVED***: 'middle',
                            legendOffset: parseInt(offsetBottom),
                            renderTick: CustomTick
                        }}

                    axisLeft={{
                        tickSize: (layout == 'horizontal' && showTickLine) || layout === 'vertical' ? 5 : 0,
                        tickPadding: 5,
                        tickRotation: 0,
                        tickValues: ticks,
                        legend: legends.left,
                        ***REMOVED***: 'middle',
                        legendOffset: parseInt(offsetY),
                        format: value => layout === 'horizontal' ? value : intl.formatNumber(format.style === 'percent' ? value / 100 : value, {
                            ...format                            
                        })
                    }
                    }
                    layout={layout}
                    ***REMOVED***={30}
                    ***REMOVED***={15}
                    padding={barPadding}
                    ***REMOVED***={barLabelColor}
                    label={(l) => intl.formatNumber(format.style === 'percent' ? l.value / 100 : l.value, format)}
                    layers={layers}
                    onMouseEnter={(_data, event) => {
                    }}

                    onMouseLeave={(_data, event) => {
                    }}
                    ***REMOVED***={130}
                    motionDamping={15}
                    tooltip={(d) => {
                        if (***REMOVED*** && tooltip && tooltip.trim().length > 0) {
                            return (<Tooltip intl={intl} format={format} d={d} tooltip={tooltip} tooltipEnableMarkdown={tooltipEnableMarkdown}/>)
                        }
                        return null
                    }}
                    theme={{
                        tooltip: {
                            basic: {whiteSpace: "pre", display: "flex", alignItems: "center"},
                            container: {
                                background: "transparent",
                                boxShadow: ""
                            },
                            table: {},
                            tableCell: {padding: "3px 5px"},

                        },
                    }}
                />
                {(***REMOVED*** == 'top' || ***REMOVED*** == 'bottom') &&
                    <div  className={`legends container has-standard-12-font-size  ${***REMOVED***}`}>
                        <div className = "legend-sections">
                          <div className = "title-section">
                                {legendTitle()}
                            </div>
                            <div className={`legends container has-standard-12-font-size items-section`}>
                                {legendItems()}
                            </div>
                        </div>
                    </div>
                }

                {(***REMOVED*** == 'right' || ***REMOVED*** == 'left') &&
                <div className={`legends container has-standard-12-font-size  ${***REMOVED***}`}>
                    {legendTitle()}
                    {legendItems()}
                </div>
                }
               
        </>}

    </div>)

}

export default injectIntl(Chart)
