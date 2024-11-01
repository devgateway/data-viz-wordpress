import React, { Fragment, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { ***REMOVED*** } from "@nivo/line";
import Tooltip from "./Tooltip";
import { area, line } from "d3-shape";
import { useTheme } from "@nivo/core";
import ***REMOVED*** from "@/layout/***REMOVED***";
import deviceType from '@/utils/deviceType'

const ZERO_LINE_COLOR = "#66676d";
const DEFAULT_TICK_BG_COLOR = "#f0f0f1";

const isMobile = deviceType() === "mobile";

const getTextWidth = (text, font) => {
  // re-use canvas object for better performance
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};

const ***REMOVED*** = (col, amt) => {
  let usePound = false;
  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
};

const Chart = ({
  app,
  legends,
  tooltip,
  ***REMOVED***,
  options,
  intl,
  groupMode,
  reverse,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  format,
  colors,
  offsetY,
  height,
  showLegends,
  ***REMOVED***,
  tickRotation,
  offsetText,
  tickColor,
  legendLabel,
  xLabelColor,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED***,
  showTickLine,
  showRightAxis,
  valueScale,
  enableArea,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED***,
  showPoints,
  maxValue,
  fixedMinValue,
  fixedMaxValue,
  offsetBottom,
  ***REMOVED***,
  enableGridY,
  enableGridX,
  ***REMOVED***,
  offsetRight,
  ***REMOVED***,
  tooltipEnableMarkdown,
  minMaxClamp,
  reverseLegend,
  ***REMOVED***,
  ***REMOVED***
}) => {
  const theme = useTheme();

  const ***REMOVED*** = JSON.parse(***REMOVED***(***REMOVED***));
  const isMobileConfigEnabled = isMobile && (***REMOVED***?.***REMOVED*** ?? false);
  const [bottomSpacing, ***REMOVED***] = useState(50);
  const [newMarginTop, ***REMOVED***] = useState(marginTop);
  const [wrapCount, setWrapCount] = useState(0);
  const [***REMOVED***, ***REMOVED***] = useState(marginBottom);

  const [filter, setFilter] = useState([]);

  const chartLegends = options.data.map((d) => ({
    id: d.id,
    label: d.id,
    color: ***REMOVED***.getColor(d.id, d),
  }));

  const legendItems = () => {
    if (reverseLegend) {
      chartLegends.reverse();
    }
    return (
      <>
        {showLegends &&
          chartLegends.map((legend) => {
            return (
              <div className={"legend item"} onClick={() => toggle(legend.id)}>
                <input
                  className={"ignore"}
                  type="checkbox"
                  checked={filter.length === 0 || !filter.includes(legend.id)}
                  readOnly
                  style={{
                    ***REMOVED***:
                      ***REMOVED*** === true ? legend.color : "none",
                    color: ***REMOVED***,
                  }}
                />
                <span
                  className={
                    ***REMOVED*** === true ? "checkmark-with-bg" : "checkmark"
                  }
                  style={{
                    ***REMOVED***:
                      ***REMOVED*** === true ? legend.color : "transparent",
                  }}
                ></span>
                <label
                  style={{
                    ***REMOVED***:
                      ***REMOVED*** === true ? legend.color : "transparent",
                    color: ***REMOVED***,
                  }}
                >
                  {legend.label}
                </label>
              </div>
            );
          })}
      </>
    );
  };

  useEffect(() => {
    const adjustBottomForLegends = () => {
      const extraItems = Math.max(chartLegends.length - 5, 0);
      const adjustment = 5 * extraItems;
      ***REMOVED***(adjustment);
    };

    adjustBottomForLegends();
  }, [chartLegends]);

  const rightLegendDynamicStyle = {
    bottom: `-${bottomSpacing}px`,
  };

  const leftLegendDynamicStyle = {
    bottom: `-${bottomSpacing}px`,
    gap: "0px",
    top: "0px",
  };

  const applyFilter = (values) => {
    if (filter.length) {
      return values.filter((v) => filter.indexOf(v.id) === -1);
    }
    return values;
  };
  const toggle = (id) => {
    const newFilter = filter.slice();
    if (newFilter.indexOf(id) > -1) {
      const index = newFilter.indexOf(id);
      newFilter.splice(index, 1);
    } else {
      newFilter.push(id);
    }
    setFilter(newFilter);
  };

  const CustomTick = (tick) => {
    const tickObject = Object.assign({}, tick);
    if(isMobileConfigEnabled && hiddenLabels.includes(String(tickObject.value))) {
      tickObject.value = "";
    }
    
    const width = getTextWidth(tickObject.value, "12px Roboto") + 15;

    if (tickRotation > 0 && tickRotation < 180) {
      return (
        <g transform={`translate(${tick.x},${tick.y + 30})`}>
          {showTickLine && (
            <line
              stroke={***REMOVED*** ? tickColor : DEFAULT_TICK_BG_COLOR}
              strokeWidth={1.5}
              y1={-32}
              y2={-12}
            />
          )}

          <g transform={`translate(0, ${tick.y + offsetText})`}>
            {/* <rect
              transform={`rotate(${tickRotation})`}
              x={-12}
              y={-12}
              rx={2}
              ry={2}
              width={width + 12}
              height={22}
              fill={***REMOVED*** ? tickColor : DEFAULT_TICK_BG_COLOR}
            /> */}

            <text
              transform={`rotate(${tickRotation})`}
              textAnchor="start"
              ***REMOVED***="middle"
              style={{
                ...theme.axis.ticks.text,
                fill: xLabelColor,
                fontSize: "12px",
              }}

            >
              {tickObject.value}
            </text>
          </g>
        </g>
      );
    } else if (tickRotation > 180 && tickRotation < 360) {
      return (
        <g transform={`translate(${tick.x},${tick.y + 30})`}>
          {showTickLine && (
            <line
              stroke={***REMOVED*** ? tickColor : DEFAULT_TICK_BG_COLOR}
              strokeWidth={1.5}
              y1={-32}
              y2={-12}
            />
          )}

          <g transform={`translate(0, ${tick.y + offsetText})`}>
            {/* <rect
              transform={`rotate(${tickRotation - 180})`}
              x={-12}
              y={-10}
              rx={2}
              ry={2}
              width={width + 12}
              height={22}
              fill={***REMOVED*** ? tickColor : DEFAULT_TICK_BG_COLOR}
            /> */}

            <text
              transform={`rotate(${tickRotation})`}
              textAnchor="end"
              ***REMOVED***="middle"
              style={{
                ...theme.axis.ticks.text,
                fill: xLabelColor,
                fontSize: "12px",
              }}
            >
              {tickObject.value}
            </text>
          </g>
        </g>
      );
    } else {
      return (
        <g transform={`translate(${tick.x},${tick.y + 30})`}>
          {showTickLine && (
            <line
              stroke={***REMOVED*** ? tickColor : DEFAULT_TICK_BG_COLOR}
              strokeWidth={1.5}
              y1={-32}
              y2={-12}
            />
          )}

          <g transform={`translate(0, ${tick.y + offsetText})`}>
            {/* <rect
              transform={`rotate(${tickRotation})`}
              x={(-1 * width) / 2}
              y={-12}
              rx={2}
              ry={2}
              width={width}
              height={22}
              fill={***REMOVED*** ? tickColor : DEFAULT_TICK_BG_COLOR}
            /> */}

            <text
              transform={`rotate(${tickRotation})`}
              textAnchor="middle"
              ***REMOVED***="middle"
              style={{
                ...theme.axis.ticks.text,
                fill: xLabelColor,
                fontSize: "12px",
              }}
              // dx={5}
              // dy={15}
            >
              {tickObject.value}
            </text>
          </g>
        </g>
      );
    }
  };

  const AreaLayer = ({ series, xScale, yScale, innerHeight }) => {
    const color = series && series.length > 0 ? series[0].color : "#3daff7";
    const ***REMOVED*** = [];
    if (series[0]) {
      series[0].data.forEach((d) => {
        if (app == "csv") {
          options.keys.forEach((m) => {
            ***REMOVED***.push({ measure: m, min: d.data.variables[m] });
          });
        } else {
          ***REMOVED***.forEach((m) => {
            ***REMOVED***.push({ measure: m, min: d.data.variables[m] });
          });
        }
      });
    }

    const sortedData = ***REMOVED***.sort((a, b) => {
      return a.min - b.min;
    });

    const lower =
      ***REMOVED*** == "CUSTOM_BETWEEN_TWO_LINES" && ***REMOVED***
        ? ***REMOVED***
        : sortedData[0].measure;
    const upper =
      ***REMOVED*** == "CUSTOM_BETWEEN_TWO_LINES" && ***REMOVED***
        ? ***REMOVED***
        : sortedData[sortedData.length - 1].measure;

    const areaGenerator = area()
      .x((d) => xScale(d.data.x))
      .y0((d) => yScale(d.data.variables[lower]))
      .y1((d) => yScale(d.data.variables[upper]));

    return (
      <>
        {series && series[0] && (
          <path
            d={areaGenerator(series[0].data)}
            fill={color}
            fillOpacity={0.4}
          />
        )}
      </>
    );
  };

  const drawLine = ({ series, xScale, yScale, innerHeight, innerWidth }) => {
    const points = [0, innerWidth];
    const lineGenerator = line()
      .x((xPoint, index) => {
        if (index === 0) {
          return -10;
        } else {
          return xPoint;
        }
      })
      .y((xPoint) => yScale(0));

    return (
      <Fragment>
        <path
          d={lineGenerator(points)}
          fill="none"
          stroke={ZERO_LINE_COLOR}
          style={{ pointerEvents: "none", ***REMOVED***: "4 4" }}
        />
      </Fragment>
    );
  };

  const layers = ["grid", "axes", "lines", "legends"];
  if (enableArea) {
    layers.push(AreaLayer);
  }
  if (showPoints) {
    layers.push("points");
    layers.push("mesh");
  }
  if (***REMOVED***) {
    layers.push(drawLine);
  }

  let values = [];
  options.data.forEach((item) => {
    if (item.data) {
      values = [...values, ...item.data.map((it) => it.y)];
    }
  });

  const ***REMOVED*** = () => {
    if (groupMode === "stacked") {
      const flattenedData = [];
      options.data.forEach((d) => {
        flattenedData.push(...d.data);
      });

      const xValues = [];
      flattenedData.forEach((dd) => {
        if (xValues.indexOf(dd.x) == -1) {
          xValues.push(dd.x);
        }
      });

      max = Math.max(
        ...xValues.map((x) => {
          return flattenedData
            .filter((f) => f.x == x)
            .map((ff) => ff.y)
            .reduce((a, b) => {
              return Math.max(a + b, a + 0);
            });
        })
      );

      min = Math.min(
        ...xValues.map((x) => {
          return flattenedData
            .filter((f) => f.x == x)
            .map((ff) => ff.y)
            .reduce((a, b) => {
              return Math.min(a - b, b - a);
            });
        })
      );
    } else {
      if (values.length > 0) {
        max = Math.max(...values);
        min = Math.min(...values);
      }
    }

    //reduce/increase the min and max value of the axis by 10% to avoid the line going out of the chart
    max = max < 0 ? max * 0.9 : max * 1.1;
    min = min > 0 ? min * 0.9 : min * 1.1;
    return { min, max };
  };

  let min = "auto";
  let max = "auto";
  const minMax = ***REMOVED***();
  if (maxValue == "fixed") {
    min =
      fixedMinValue != null && fixedMinValue != "" ? fixedMinValue : minMax.min;
    max =
      fixedMaxValue != null && fixedMaxValue != "" ? fixedMaxValue : minMax.max;
  } else {
    min = minMax.min;
    max = minMax.max;
  }

  const legendTitle = () => {
    return (
      <>
        {showLegends && legendLabel && (
          <div className={"legend item"}>
            <label className="legend-title">{legendLabel}</label>
          </div>
        )}
      </>
    );
  };

  const margins = {
    top: newMarginTop,
    right: marginRight,
    bottom: ***REMOVED***,
    left: marginLeft,
  };

  let ticks = parseInt(***REMOVED***);

  const hasData =
    options.data && options.data?.filter((d) => d?.data?.length > 0)?.length;

  const hiddenLabels = [];
  if(isMobileConfigEnabled) {
      ticks = parseInt(***REMOVED***.***REMOVED***);
      const labels = new Map(Object.entries(***REMOVED***?.labels?.xAxis ?? {}));
      for (const [key, value] of labels) {
        if (!value) {
          hiddenLabels.push(key);
        }
      }
  }

  if (options && options.data && hasData > 0) {
    return (
      <div style={{ height: height }}>
        <***REMOVED***
          key={new Date()}
          data={applyFilter(options.data)}
          margin={margins}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: min,
            max: max,
            stacked: groupMode == "stacked",
            reverse: false,
            clamp: minMaxClamp,
          }}
          layers={layers}
          axisTop={null}
          axisRight={
            showRightAxis
              ? {
                  tickSize: 5,
                  tickValues: ticks,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: legends.right,
                  ***REMOVED***: "middle",
                  legendOffset: parseInt(offsetRight),
                  format: (value) => {
                    const ***REMOVED*** = ***REMOVED***
                      ? ***REMOVED***
                      : format;
                    return intl.formatNumber(
                      ***REMOVED***.style === "percent" ? value / 100 : value,
                      {
                        ...***REMOVED***,
                      }
                    );
                  },
                }
              : null
          }
          enableGridY={enableGridY}
          enableGridX={enableGridX}
          lineWidth={3}
          colors={(d) => {
            return ***REMOVED***.getColor(d.id, d);
          }}
          axisBottom={
            isMobileConfigEnabled && ***REMOVED***?.xAxisDisabled === true ? null :{
            renderTick: CustomTick,
            legend: legends.bottom,
            ***REMOVED***: "middle",
            legendOffset: parseInt(offsetBottom),
          }}
          axisLeft={{
            tickSize: 5,
            tickValues: ticks,
            tickPadding: 5,
            tickRotation: 0,
            legend: legends.left,
            ***REMOVED***: "middle",
            legendOffset: parseInt(offsetY),
            format: (value) => {
              const ***REMOVED*** = ***REMOVED***
                ? ***REMOVED***
                : format;
              return intl.formatNumber(
                ***REMOVED***.style === "percent" ? value / 100 : value,
                {
                  ...***REMOVED***,
                }
              );
            },
          }}
          tooltip={(d) => {
            if (***REMOVED*** && tooltip && tooltip.trim().length > 0) {
              return (
                <Tooltip
                  intl={intl}
                  format={format}
                  d={d}
                  tooltip={tooltip}
                  tooltipEnableMarkdown={tooltipEnableMarkdown}
                />
              );
            }

            return null;
          }}
          pointSize={10}
          ***REMOVED***={2}
          ***REMOVED***={{ from: "serieColor" }}
          ***REMOVED***={-12}
          useMesh={true}
        />

        {(***REMOVED*** === "top" || ***REMOVED*** === "bottom") && (
          <div
            className={`legends container has-standard-12-font-size ${***REMOVED***}`}
          >
            <div className="legend-sections">
              <div className="title-section">{legendTitle()}</div>
              <***REMOVED***
                onWrapChange={(count) => {
                  if (***REMOVED*** === "top") {
                    ***REMOVED***(marginTop + (count / 2) * 40);
                    setWrapCount(count);
                  } else {
                    ***REMOVED***(marginBottom + (count / 2) * 25);
                    setWrapCount(count);
                  }
                }}
                className={`legends container has-standard-12-font-size items-section`}
              >
                {legendItems()}
              </***REMOVED***>
            </div>
          </div>
        )}
        {(***REMOVED*** === "right" || ***REMOVED*** === "left") && (
          <div
            className={`legends container has-standard-12-font-size  ${***REMOVED***}`}
            style={
              ***REMOVED*** === "right"
                ? rightLegendDynamicStyle
                : leftLegendDynamicStyle
            }
          >
            {legendTitle()}
            {legendItems()}
          </div>
        )}
      </div>
    );
  }

  return <div></div>;
};

export default injectIntl(Chart);
