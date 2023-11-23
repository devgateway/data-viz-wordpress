import React, {useState} from 'react'
import {injectIntl} from 'react-intl';
import {ResponsivePie} from '@nivo/pie'
import Tooltip from "../common/ChartTooltip"
import {formatContent} from '../common/ChartTooltip'
import {
    colorSchemes,
    isCategoricalColorScheme,
    isSequentialColorScheme,
    sequentialColorInterpolators
} from "@nivo/colors";
import * as d3 from "d3";



const Chart = ({
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
                   tickColor,
                   tooltip,
                   startAngle,
                   endAngle,
                   legendLabel,
                   ***REMOVED***,
                   ***REMOVED***,
                   ***REMOVED***,
                   centerLabel,
                   showArcLabels,
                   ***REMOVED***,
                   slicePadding,
                   ***REMOVED***,
                   centerLabelFontWeight,
                   ***REMOVED***,
                   ***REMOVED***,
                   ***REMOVED***,
                   tooltipEnableMarkdown,
                   reverseLegend
               }) => {


    const [filter, setFilter] = useState([])

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

    const applyFilter = (values) => {

        if (filter) {
            return values.filter(d => filter.indexOf(d.id) === -1);

        } else {
            return values
        }
    }

    if (!options || !options.data) {
        return null
    }

    let margins = {top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft}




    const ***REMOVED*** = (position) => {
        if (colors.scheme) {
            const color = colorSchemes[colors.scheme]
            if (isSequentialColorScheme(colors.scheme)) {
                const interpolator = sequentialColorInterpolators[colors.scheme]
                const pos = position - (9 * parseInt((position / 9)))
                const scale = d3.***REMOVED***(interpolator).domain([0, 8])
                return scale(pos)
            }
            if (isCategoricalColorScheme(colors.scheme)) {
                if (position > color.length - 1) {
                    const pos = position - (color.length * parseInt((position / color.length)))
                    return colorSchemes[colors.scheme][pos]
                } else {
                    return colorSchemes[colors.scheme][position]
                }
            }
        } else {
            return colors.colors[position]
        }
    }

    const getColorByKey = (id) => {

        if (colors && colors.scheme) {
            const index = options.keys.findIndex(k => k == id)
            return ***REMOVED***(index)
        } else {

            return colors.colors[options.keys.findIndex(k => k == id)]
        }
    }


    const ***REMOVED*** = (id) => {

        if (colors && colors.scheme) {
            const index = options.data.findIndex(f => f[options.indexBy] == id)
            return ***REMOVED***(index)
        } else {
            return colors.colors[options.data.findIndex(f => f[options.indexBy] == id)]
        }
    }

    const getColor = (id, d) => {
        return ***REMOVED***(id)
    }

    const chartLegends = options.data.sort((a, b) => {
        if (a.position && b.position) {
            return a.position - b.position
        }
        return 0 
    }).map((d, index) => {
       let theColor = ***REMOVED***.getColor(d.id, d)
        return {
            color: theColor,
            id: d.id,
            label: d.label
        }
    })

    const legendTitle = () => {
        return (<>{showLegends && legendLabel &&
            <div className={"legend item"}>
                <label className="legend-title">{legendLabel}</label>
            </div>
        }</>)
    }

    const legendItems = () => {
        if (reverseLegend) {
            chartLegends.reverse()
        }
       return (<>{showLegends && chartLegends.map(legend => {
            return (
                <div className={"legend item"} onClick={() => toggle(legend.id)}>
                    <input className={"ignore"}  type='checkbox' 
                    checked={filter.length == 0 || !filter.includes(legend.id)}/>
                    <span className={***REMOVED*** ? 'checkmark-with-bg' : 'checkmark'} 
                style={{***REMOVED***: ***REMOVED*** == true ? legend.color : "none"}}></span>

                    <label style={{ ***REMOVED***: ***REMOVED*** == true ? legend.color : "none", color: ***REMOVED***}}>{legend.label}</label>
                </div>)
        })}</>)
    }

    const CenterText = (layerProps) => {
        const { centerX, centerY } = layerProps;  
        let centerText = centerLabel.split(/[\r\n]/g)
        let totalValue = 0
        if (layerProps.dataWithArc) {
            totalValue = layerProps.dataWithArc.reduce(function (previousValue, currentValue) {
                return previousValue + currentValue.value;
            }, 0);          
        }
       
         return (
          <text
            x={centerX}
            y={centerY}
            textAnchor="start"
            ***REMOVED***="central">
                {centerText.map((label, i) => {
                  return (<tspan x={centerX + parseInt(***REMOVED***)} y={centerY + parseInt(***REMOVED***) + (i * 20)} style={{
                    fontSize: ***REMOVED*** + "px",
                    fontWeight: centerLabelFontWeight,
                    fill: "#000"
                  }}>{formatContent(label,{totalValue}, intl)}</tspan>)                      
                })}
              
          </text>
        );
      };

    
    return (
        <div style={{height: height}}>
            {options && options.data && options.data.length > 0 &&
            <>
            <ResponsivePie
                data={applyFilter(options.data)}
                margin={margins}
                startAngle={startAngle}
                endAngle={endAngle}
                sortByValue={true}
                innerRadius={0.7}
                padAngle={slicePadding}
                cornerRadius={3}
                colors={d => {
                    return ***REMOVED***.getColor(d.id, d.data)
                }
                }
                borderWidth={1}
                borderColor={{from: 'color', modifiers: [['brighter', '2']]}}
                ***REMOVED*** = {showArcLabels}
                ***REMOVED*** = {***REMOVED***}
                ***REMOVED***="#333333"
                arcLinkLabelsSkipAngle={5}
                ***REMOVED***={15}
                ***REMOVED***={20}
                arcLabel={(l) => intl.formatNumber(format.style === 'percent' ? l.value / 100 : l.value, format)}
                radialLabelsSkipAngle={20}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={1}
                radialLabelsLinkDiagonalLength={5}
                radialLabelsLinkHorizontalLength={16}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{from: 'color'}}
                arcLinkLabel={(r) => r.label}
                layers={['arcLinkLabels', 'arcs', 'arcLabels', 'legends', CenterText]}
                animate={true}
                ***REMOVED***={90}
                motionDamping={15}
                legends={[]}
                ***REMOVED***={{from: 'color', modifiers: [['darker', 1.6]]}}
                
                tooltip={(d)=> {                    
                    if (d.datum && d.datum.data && d.datum.data.variables) {
                        let percent = (d.datum.arc.angleDeg / 360) * 100
                        d.datum.data.variables.valuePercent = percent
                        d.datum.data.variables.category = d.datum.id
                    }     
                  
                 return (<Tooltip intl={intl} format={format} d={d.datum} tooltip={tooltip} tooltipEnableMarkdown={tooltipEnableMarkdown}/>)
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
            </>
            }          
        </div>)
}
export default injectIntl(Chart)
