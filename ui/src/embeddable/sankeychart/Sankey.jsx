import React, {Fragment, useState} from 'react'
import {***REMOVED***} from '@nivo/sankey'
import {injectIntl} from 'react-intl';
import {useTheme} from '@nivo/core'

const POSITION_MIDDLE = "middle";
const POSITION_TOP = "top";
const ZERO_LINE_COLOR = "#66676d";
const GRID_LINE_COLOR = '#dddddd';
const DEFAULT_COLOR = 'none';
const LABEL_SKIP_WIDTH = 30;
const LABEL_SKIP_HEIGHT = 0;
const COLOR_VARIABLE = "_Color"

const Chart = (props) => {
  const {
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
    reverseLegend,
    enableGridY,
    enableGridX,
    ***REMOVED***
  } = props
  const [filter, setFilter] = useState([])
  const {colorBy, scheme} = colors


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


  let margins = {top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft}

  let chartLegends = []

  /*if (options.data) {
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
  }*/

  let layers = ["grid", "axes", "bars"]

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
    </>)
  }

  const ***REMOVED*** = (data) => {
    data.nodes.forEach(node => {
      debugger
      node.color = ***REMOVED***.getColor(node.id)
    })
    debugger
    return data
  }

  return (
    <div style={{height: height}}>
      <>
        {props.options.data && props.options.data.nodes && props.options.data.nodes.length && <***REMOVED***
          data={***REMOVED***(props.options.data)}
          margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
          align="justify"
          //colors={{ scheme: 'category10' }}
          nodeOpacity={1}
          nodeHoverOthersOpacity={0.35}
          nodeThickness={18}
          nodeSpacing={24}
          ***REMOVED***={0}
          ***REMOVED***={{
            from: 'color',
            modifiers: [
              [
                'darker',
                0.8
              ]
            ]
          }}
          ***REMOVED***={3}
          linkOpacity={0.5}
          linkHoverOthersOpacity={0.1}
          linkContract={3}
          ***REMOVED***={true}
          labelPosition="outside"
          ***REMOVED***="vertical"
          labelPadding={16}
          ***REMOVED***={{
            from: 'color',
            modifiers: [
              [
                'darker',
                1
              ]
            ]
          }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 130,
              itemWidth: 100,
              itemHeight: 14,
              itemDirection: 'right-to-left',
              itemsSpacing: 2,
              itemTextColor: '#999',
              symbolSize: 14,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000'
                  }
                }
              ]
            }
          ]}
        />}
        {/*(***REMOVED*** == 'top' || ***REMOVED*** == 'bottom') &&
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
        */}

        {/*(***REMOVED*** == 'right' || ***REMOVED*** == 'left') &&
        <div className={`legends container has-standard-12-font-size  ${***REMOVED***}`}>
          {legendTitle()}
          {legendItems()}
        </div>
        */}

      </>

    </div>)

}

export default injectIntl(Chart)
