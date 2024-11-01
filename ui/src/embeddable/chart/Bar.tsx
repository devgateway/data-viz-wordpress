import React, { Fragment, useEffect, useState } from "react";
import Tooltip from "./Tooltip";
import { BarDatum, BarLayer, LegendData, ResponsiveBar } from "@nivo/bar";
import { injectIntl } from "react-intl";
import { useTheme } from "@nivo/core";
import { line } from "d3-shape";
import LineLayer from "./LineLayer";
import Papa from "papaparse";
import ***REMOVED*** from '@/layout/***REMOVED***';
import deviceType from '@/utils/deviceType';

const POSITION_MIDDLE = "middle";
const POSITION_TOP = "top";
const ZERO_LINE_COLOR = "#66676d";
const GRID_LINE_COLOR = "#dddddd";
const DEFAULT_COLOR = "none";
const LABEL_SKIP_HEIGHT = 0;
const COLOR_VARIABLE = "_Color";

export interface BarChartProps {
  legends?: Record<string, any>;
  marginLeft: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  options: Record<string, any>;
  intl: any;
  format?: any;
  colors: any;
  groupMode: any;
  height: number;
  showLegends: boolean;
  ***REMOVED***: string;
  tickRotation: number;
  offsetText: number | string;
  tickColor: string;
  layout?: "horizontal" | "vertical";
  reverse: boolean;
  offsetY: number | string;
  ***REMOVED***: string;
  tooltip: string;
  ***REMOVED***: boolean;
  overlays: any[];
  maxValue: string;
  valueScale: "linear" | "log" | "symlog" | "point" | "band" | "time";
  ***REMOVED***: any;
  legendLabel: string;
  ***REMOVED***: boolean;
  fixedMinValue: number;
  fixedMaxValue: number;
  barPadding: number;
  ***REMOVED***: string;
  ***REMOVED***: number;
  ***REMOVED***: boolean;
  xLabelColor: string;
  barLabelColor: string;
  ***REMOVED***: boolean;
  ***REMOVED***: boolean;
  ***REMOVED***: string;
  ***REMOVED***: boolean;
  showTickLine: boolean;
  showRightAxis: boolean;
  offsetRight: number | string;
  offsetBottom: number | string;
  ***REMOVED***: any[];
  ***REMOVED***: boolean;
  ***REMOVED***: string;
  ***REMOVED***: any;
  ***REMOVED***: string;
  ***REMOVED***: number | string;
  groupTotalFixedPosition: boolean;
  tooltipEnableMarkdown: boolean;
  ***REMOVED***: number;
  ***REMOVED***: number;
  ***REMOVED***: string;
  minMaxClamp: boolean;
  reverseLegend: boolean;
  enableGridY: boolean;
  enableGridX: boolean;
  ***REMOVED***: any;
}

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
  offsetText,
  tickColor,
  layout,
  reverse,
  offsetY,
  ***REMOVED***,
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
  tooltipEnableMarkdown,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED***,
  minMaxClamp,
  reverseLegend,
  enableGridY,
  enableGridX,
  ***REMOVED***
}: BarChartProps) => {
  const isMobile = deviceType() === "mobile";
  const LABEL_SKIP_WIDTH = 30; // important for vertical layout
  const LABEL_SKIP_HEIGHT = 15; // important for horizontal layout
  const ***REMOVED*** = JSON.parse(***REMOVED***(***REMOVED***));
  const isMobileCustomizationEnabled = isMobile && (***REMOVED***?.***REMOVED*** ?? false);
  const ***REMOVED*** = () => {
    if (barLabelColor === "null" || barLabelColor === null || !barLabelColor) {
      return "#000000";
    }
    return barLabelColor;
  };

  const [filter, setFilter] = useState<any>([]);
  const { colorBy } = colors;
  const ***REMOVED*** = {};
  overlays.forEach((o, idx) => {
    ***REMOVED***[idx] = true;
  });

  const [showLine, setShowLine] = useState(***REMOVED***);
  const [bottomSpacing, ***REMOVED***] = useState(50);
  const [newMarginTop, ***REMOVED***] = useState(marginTop);
  const [wrapCount, setWrapCount] = useState(0);
  const [***REMOVED***, ***REMOVED***] = useState(marginBottom);

  const ***REMOVED*** = (
    options,
    colors,
    filter,
    DEFAULT_COLOR,
    ***REMOVED***
  ) => {
    type ChartLegends = {
      enabled: boolean;
      color: string;
      id: string;
      label: string;
    }

    let chartLegends: ChartLegends [] = [];

    if (options.data) {
      chartLegends =
        colors.colorBy === "index"
          ? options.data.map((d) => {
              let theColor;
              let enabled = true;
              if (filter.indexOf(d[options.indexBy]) > -1) {
                enabled = false;
                theColor = DEFAULT_COLOR;
              } else {
                theColor = d[COLOR_VARIABLE]
                  ? d[COLOR_VARIABLE]
                  : ***REMOVED***.getColor(d.id, d);
              }
              return {
                enabled: enabled,
                color: theColor,
                id: d[options.indexBy],
                label: d[options.indexBy],
              };
            })
          : options.keys.map((k) => {
              let theColor;
              let enabled = true;
              if (filter.indexOf(k) > -1) {
                enabled = false;
                theColor = DEFAULT_COLOR;
              } else {
                theColor = ***REMOVED***.getColorByKey(k);
              }
              return {
                enabled: enabled,
                color: theColor,
                id: k,
                label: k,
              };
            });
    }

    return chartLegends;
  };

  const chartLegends = ***REMOVED***(
    options,
    colors,
    filter,
    DEFAULT_COLOR,
    ***REMOVED***
  );
  const legendItems = () => {
    if (reverseLegend) {
      chartLegends.reverse();
    }
    return (
      <>
        {showLegends &&
          chartLegends.map((legend) => {
            return (
              <div
                className={`legend item ${legend.enabled ? "" : "ignore"}`}
                onClick={() => toggle(legend.id)}
              >
                {***REMOVED*** && (
                  <input
                    className={legend.enabled ? "" : "ignore"}
                    type="checkbox"
                    checked={legend.enabled}
                    readOnly
                    style={{
                      ***REMOVED***: ***REMOVED***
                        ? colorBy === "values"
                          ? tickColor
                          : legend.color
                        : "none",
                      color: "#000",
                    }}
                  />
                )}
                {!***REMOVED*** && (
                  <input
                    type="checkbox"
                    checked={legend.enabled}
                    readOnly
                    style={{
                      color: "#000",
                    }}
                  />
                )}

                {***REMOVED*** && (
                  <span
                    className={"checkmark-with-bg"}
                    style={{ ***REMOVED***: legend.color }}
                  ></span>
                )}

                {!***REMOVED*** && <span className={"checkmark"}></span>}

                {***REMOVED*** && (
                  <label
                    className={legend.enabled ? "" : "ignore"}
                    style={{
                      ***REMOVED***:
                        colorBy === "values" ? tickColor : legend.color,
                      color: ***REMOVED***,
                    }}
                  >
                    {legend.label}
                  </label>
                )}

                {!***REMOVED*** && (
                  <label
                    className={legend.enabled ? "" : "ignore"}
                    style={{
                      color: ***REMOVED***,
                    }}
                  >
                    {legend.label}
                  </label>
                )}
              </div>
            );
          })}
        {colorBy === "values" && (
          <div className={"legend item"}>
            <label
              className={"range min"}
              style={{
                ***REMOVED***: ***REMOVED***.***REMOVED***(
                  ***REMOVED***.minValue
                ),
                color: "#fff",
              }}
            ></label>
            <label>
              {intl.formatNumber(
                format.style === "percent"
                  ? ***REMOVED***.minValue / 100
                  : ***REMOVED***.minValue,
                {
                  ...format,
                  minimumFractionDigits: 0,
                }
              )}
            </label>
          </div>
        )}

        {colorBy === "values" && (
          <div className={"legend item"}>
            <label
              className={"range max"}
              style={{
                ***REMOVED***: ***REMOVED***.***REMOVED***(
                  ***REMOVED***.maxValue
                ),
                color: "#fff",
              }}
            >
              {" "}
            </label>
            <label>
              {intl.formatNumber(
                format.style === "percent"
                  ? ***REMOVED***.maxValue / 100
                  : ***REMOVED***.maxValue,
                {
                  ...format,
                  minimumFractionDigits: 0,
                }
              )}
            </label>
          </div>
        )}

        {showLegends &&
          ***REMOVED*** &&
          overlays.map((o, idx) => {
            return (
              <div className={"legend item"} onClick={() => toggleLine(idx)}>
                <input
                  className={***REMOVED*** && showLine[idx] ? "" : "ignore"}
                  type="checkbox"
                  checked={showLine[idx]}
                  readOnly
                  style={{
                    ***REMOVED***:
                      showLine[idx] && ***REMOVED*** === true
                        ? o.lineColor
                        : "none",
                    color: "#000",
                  }}
                />
                <span
                  className={
                    ***REMOVED*** ? "checkmark-with-bg" : "checkmark"
                  }
                  style={{
                    ***REMOVED***:
                      showLine[idx] && ***REMOVED*** === true
                        ? o.lineColor
                        : "none",
                  }}
                ></span>
                <label
                  className={showLine[idx] ? "" : "ignore"}
                  style={{
                    ***REMOVED***:
                      showLine[idx] && ***REMOVED*** === true
                        ? o.lineColor
                        : "none",
                    color: ***REMOVED***,
                  }}
                >
                  {o.title}
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

  const ***REMOVED*** = (data) => {
    return drawLine(data, "1 0", GRID_LINE_COLOR, "Y");
  };

  const createZeroLineHighlight = (data) => {
    return drawLine(data, "4 4", ZERO_LINE_COLOR, "X");
  };

  const ***REMOVED*** = (data) => {
    return drawLine(data, "1 0", GRID_LINE_COLOR, "X");
  };

  const legendColor = (tick) => {
    const legendItem = chartLegends.find((c) => c.id === tick.value);
    return legendItem ? legendItem.color : "#FFFFFF";
  };

  const ***REMOVED*** = (data) => {
    const { yScale, bars } = data;

    return (
      <Fragment>
        {bars
          .filter((b) => b.data.value != null)
          .map((bar, idx) => {
            let seriedId = bar.data.indexValue;
            if (
              options.***REMOVED*** &&
              options.***REMOVED***.size > 1
            ) {
              seriedId = bar.data.id;
            }

            const ***REMOVED*** = ***REMOVED***.filter(
              (c) => c.serieLabel == seriedId
            )[0];
            if (
              ***REMOVED*** &&
              ***REMOVED***.low &&
              ***REMOVED***.high
            ) {
              const low = yScale(parseFloat(***REMOVED***.low));
              const high = yScale(parseFloat(***REMOVED***.high));
              return (
                <g key={idx}>
                  <line
                    y1={low}
                    y2={high}
                    x1={bar.x + bar.width / 2}
                    x2={bar.x + bar.width / 2}
                    strokeWidth={1}
                    stroke={ZERO_LINE_COLOR}
                  />
                  <line
                    y1={low}
                    y2={low}
                    x1={bar.x + bar.width / 2 - 3}
                    x2={bar.x + bar.width / 2 + 3}
                    strokeWidth={1}
                    stroke={ZERO_LINE_COLOR}
                  />
                  <line
                    y1={high}
                    y2={high}
                    x1={bar.x + bar.width / 2 - 3}
                    x2={bar.x + bar.width / 2 + 3}
                    strokeWidth={1}
                    stroke={ZERO_LINE_COLOR}
                  />
                </g>
              );
            }
          })}
      </Fragment>
    );
  };

  const drawLine = (data, ***REMOVED***, color, axis) => {
    const { yScale, innerWidth, innerHeight } = data;
    let points;
    let lineGenerator;
    if (axis == "X") {
      points = [0, innerWidth];
      lineGenerator = line()
      // @ts-ignore Investigate why it is returning a tuple instead of a number
        .x((xPoint, index) => {
          if (index === 0) {
            return -10;
          } else {
            return xPoint;
          }
        })
        .y(() => yScale(0));
    } else {
      points = [0, innerHeight];
      lineGenerator = line()
        .x(() => 0)
        // @ts-ignore Investigate why it is returning a tuple instead of a number
        .y((point) => {
          return point;
        });
    }

    return (
      <Fragment>
        <path
          d={lineGenerator(points)}
          fill="none"
          stroke={color}
          style={{ pointerEvents: "none", ***REMOVED***: ***REMOVED*** }}
        />
      </Fragment>
    );
  };

  const getTextWidth = (text, font) => {
    // re-use canvas object for better performance
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      return 0;
    }

    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  };

  const applyFilter = (values, filterKeys) => {
    if (filter) {
      if (
        (colors.colorBy === "index" ||
          colors.colorBy === "id" ||
          colors.colorBy === "values") &&
        !filterKeys
      ) {
        return values.filter((d) => filter.indexOf(d[options.indexBy]) === -1);
      } else {
        return values ? values.filter((d) => filter.indexOf(d) === -1) : [];
      }
    } else {
      return values;
    }
  };

  const CustomTick = (tick) => {
    const tickObject = Object.assign({}, tick);
    const theme = useTheme();
   
    // @ts-ignore
    if(isMobileCustomizationEnabled && hiddenLabels.includes(String(tickObject.value))) {
      tickObject.value = "";
    }
    
    let ***REMOVED***;
    if (***REMOVED***) {
      ***REMOVED*** = tickColor;
    } else {
      ***REMOVED*** = legendColor(tick);
    }
    const width = getTextWidth(tickObject.value, "12px Roboto") + 30;

    if (tickRotation > 0 && tickRotation < 180) {
      return (
        <g transform={`translate(${tick.x},${tick.y + 30})`}>
          {showTickLine && (
            <line
              stroke={***REMOVED***}
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
              width={width}
              height={22}
              fill={"#FFFFFF"}
            /> */}

            <text
              transform={`rotate(${tickRotation})`}
              textAnchor="start"
              ***REMOVED***="middle"
              style={{
                ...theme.axis.ticks.text,
                fill: xLabelColor === "null" ? "black" : xLabelColor,
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
              stroke={***REMOVED***}
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
              width={width}
              height={22}
              fill={"#FFFFFF"}
            /> */}

            <text
              transform={`rotate(${tickRotation})`}
              textAnchor="end"
              ***REMOVED***="middle"
              style={{
                ...theme.axis.ticks.text,
                fill: xLabelColor === "null" ? "black" : xLabelColor,
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
              stroke={***REMOVED***}
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
              fill={"#FFFFFF"}
            /> */}

            <text
              transform={`rotate(${tickRotation})`}
              textAnchor="middle"
              ***REMOVED***="middle"
              style={{
                ...theme.axis.ticks.text,
                fill: xLabelColor === "null" ? "black" : xLabelColor,
                fontSize: "12px",
              }}
            >
              {tickObject.value}
            </text>
          </g>
        </g>
      );
    }
  };

  const toggle = (id) => {
    const newFilter: any [] = filter.slice();
    if (newFilter.indexOf(id) > -1) {
      const index = newFilter.indexOf(id);
      newFilter.splice(index, 1);
    } else {
      newFilter.push(id);
    }
    setFilter(newFilter);
  };

  const toggleLine = (idx) => {
    const ***REMOVED*** = Object.assign({}, showLine);
    ***REMOVED***[idx] = !***REMOVED***[idx];
    setShowLine(***REMOVED***);
  };

  const ***REMOVED*** = ({ bars }) => {
    return (
      <g>
        {bars.map((bar, idx) => {
          const { width, height, y, x, data } = bar;
          if (layout === "horizontal" && height <= LABEL_SKIP_HEIGHT) {
            return;
          }
          if (layout === "vertical" && width <= LABEL_SKIP_WIDTH) {
            return;
          }
          const value = data.value
            ? intl.formatNumber(
                format.style === "percent" ? data.value / 100 : data.value,
                format
              )
            : "";
          const valueLength = value.length;
          let yPos;
          let xPos;
          if (
            (layout == "vertical" && height >= LABEL_SKIP_HEIGHT) ||
            (layout == "horizontal" && width >= LABEL_SKIP_HEIGHT)
          ) {
            if (layout == "vertical") {
              const padding = 6; // adjusts position not to be too close to the bar
              yPos = y - padding;
              xPos = x + width / 2 - valueLength * 3.5;
            } else {
              const padding = 4; // adjusts position not to be too close to the bar
              yPos = y + height / 2 + padding;
              xPos = x + width + 5;
            }

            return (
              <text
                key={idx}
                y={yPos}
                x={xPos}
                style={{ fill: ***REMOVED***() }}
              >{`${value}`}</text>
            );
          }
        })}
      </g>
    );
  };

  const ***REMOVED*** = (props) => {
    const indexes = options.data
      .filter((d) => filter.indexOf(d[options.indexBy]) == -1)
      .map((d) => d[options.indexBy]);
    const { bars } = props;
    return (
      <g>
        {indexes
          .filter(
            (key) => bars.filter((b) => b.data.indexValue == key).length > 0
          )
          .map((key) => {
            const barsInGroup = bars.filter((b) => b.data.indexValue == key);

            let anchor = "right";
            let x = 0;
            let y = 0;
            if (layout == "horizontal") {
              if (groupMode === "stacked") {
                if (groupTotalFixedPosition) {
                  x = props.innerWidth - 20; //barsInGroup.map(b => b.width).reduce((a, b) => a>b?a:b)
                } else {
                  x = barsInGroup.map((b) => b.width).reduce((a, b) => a + b);
                  if (reverse) {
                    x = props.innerWidth - x;
                  }
                }

                y = props.yScale(key) + barsInGroup[0].height / 2;
              } else {
                if (groupTotalFixedPosition) {
                  x = props.innerWidth; //barsInGroup.map(b => b.width).reduce((a, b) => a>b?a:b)
                } else {
                  x = barsInGroup
                    .map((b) => b.width)
                    .reduce((a, b) => (a > b ? a : b));
                  if (reverse) {
                    x = props.innerWidth - x;
                  }
                }
                y =
                  props.yScale(key) +
                  barsInGroup.map((b) => b.height).reduce((a, b) => a + b) / 2;
              }
              x = x + parseInt(String(***REMOVED***)) + 5;
            } else {
              anchor = "middle";
              if (groupMode === "stacked") {
                x = props.xScale(key) + barsInGroup[0].width / 2;
                if (groupTotalFixedPosition) {
                  y = y - parseInt(String(***REMOVED***));
                } else {
                  if (reverse) {
                    y =
                      parseInt(String(***REMOVED***)) +
                      barsInGroup.map((b) => b.height).reduce((a, b) => a + b) +
                      14;
                  } else {
                    y =
                      props.innerHeight -
                      parseInt(String(***REMOVED***)) -
                      barsInGroup.map((b) => b.height).reduce((a, b) => a + b) -
                      5;
                  }
                }
              } else {
                x =
                  props.xScale(key) +
                  barsInGroup.map((b) => b.width).reduce((a, b) => a + b) / 2;
                if (reverse) {
                  y = props.innerHeight;
                }
                if (groupTotalFixedPosition) {
                  y = y - parseInt(String(***REMOVED***));
                } else {
                  if (barsInGroup.length % 2 == 1) {
                    const index = Math.floor(barsInGroup.length / 2);
                    y = barsInGroup[index].height;
                  } else {
                    const index = barsInGroup.length / 2;
                    y = Math.max(
                      barsInGroup[index].height,
                      barsInGroup[index - 1].height
                    );
                  }
                  if (reverse) {
                    y = y + 14 + parseInt(String(***REMOVED***));
                  } else {
                    y = props.innerHeight - y - parseInt(String(***REMOVED***)) - 5;
                  }
                }
              }
            }

            const group = options.data.filter(
              (d) => d[options.indexBy] === key
            )[0];
            let total = group.parent_variables
              ? group.parent_variables[***REMOVED***]
              : group[***REMOVED***];
            const sumOfVariablesToFilterOut =
              colorBy !== "index"
                ? filter
                    ?.map((item) => group[item])
                    ?.reduce((acc, curr) => acc + curr, 0)
                : 0;
            total -= sumOfVariablesToFilterOut;

            return (
              <text y={y} x={x} style={{ fill: ***REMOVED***() }}>
                <tspan textAnchor={anchor}>
                  {***REMOVED*** ? ***REMOVED*** + " " : ""}
                  {intl.formatNumber(
                    ***REMOVED***.style === "percent" ? total / 100 : total,
                    ***REMOVED***
                  )}
                </tspan>
              </text>
            );
          })}
      </g>
    );
  };

  const margins = {
    top: newMarginTop,
    right: marginRight,
    bottom: ***REMOVED***,
    left: marginLeft,
  };

  let overlayData;
  let overLayMax = 0;
  let overLayMin = 0;
  if (***REMOVED***) {
    overlayData = Papa.parse(***REMOVED***, {
      header: false,
      dynamicTyping: true,
    });
    overLayMax = Math.max(...overlayData.data.map((d) => d[1]));
    overLayMin = Math.min(...overlayData.data.map((d) => d[1]));
  }

  const ***REMOVED*** = () => {
    const values: number [] = [];
    if (***REMOVED***) {
      ***REMOVED***.forEach((c) => {
        if (c.low) {
          values.push(parseFloat(c.low));
        }
        if (c.high) {
          values.push(parseFloat(c.high));
        }
      });

      if (options.data) {
        options.data.map((d) => {
          options.keys.forEach((k) => {
            if (d[k]) {
              values.push(d[k]);
            }
          });
        });
      }
    }
    return values;
  };

  const values = ***REMOVED***();
  const dataMax = Math.max(...values);
  const dataMin = Math.min(...values);

  const ***REMOVED*** = () => {
    if (
      (groupMode === "stacked" && maxValue !== "fixed") ||
      (maxValue === "fixed" && fixedMaxValue === null) ||
      // @ts-ignore
      (maxValue === "fixed" && fixedMaxValue === "")
    ) {
      return (
        Math.max(
          Math.max(
            ...options.data
              .map((d) => options.keys.map((x) => (d[x] ? d[x] : 0)))
              .map((l) =>
                l.reduce((a, b) => {
                  return Math.max(a + b, a + 0);
                })
              )
          ),
          overLayMax
        ) * 1.1
      );
    }

    return maxValue === "fixed" &&
      fixedMaxValue !== null &&
      // @ts-ignore
      fixedMaxValue !== ""
      ? fixedMaxValue
      : Math.max(overLayMax, dataMax) * 1.05;
  };

  const ***REMOVED*** = () => {
    const minVal = Math.min(overLayMin, dataMin);
    return maxValue === "fixed" &&
      fixedMinValue !== null &&
      // @ts-ignore
      fixedMinValue !== ""
      ? fixedMinValue
      : minVal > 0
      ? minVal * 0.9
      : minVal * 1.1;
  };

  const ***REMOVED*** = ***REMOVED***();
  const ***REMOVED*** = ***REMOVED***();

  const layers: BarLayer<BarDatum>[] = ["grid", "axes", "bars"];
  if (***REMOVED***) {
    layers.push(***REMOVED***);
  }

  layers.push(***REMOVED***);
  layers.push(***REMOVED***);

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

      if (showLine[idx] == true || showLine[idx] == undefined) {
        const { ***REMOVED***, lineColor, tooltip } = o;
        if (o.app == "csv") {
          const overlayData = Papa.parse(***REMOVED***, {
            header: false,
            dynamicTyping: true,
          });
          if (
            overlayData.data &&
            overlayData.data.filter((d: any) => d[1] !== null).length > 0
          ) {
            overlayData.data = overlayData.data.filter((d: any) => d[1] !== null);
            const line = LineLayer(
              overlayData,
              lineColor,
              layout,
              groupMode,
              applyFilter(options.keys, true),
              tooltip,
              o.title,
              ""
            );
            layers.push(line as any);
          }
        } else {
          if (o.measure[0]) {
            const overlayData: Record<string, any> = {};
            const data = options.data.map((d) => [
              d[options.indexBy],
              d.variables[o.measure[0]],
            ]);
            const measure = options.metadata.measures
              ? options.metadata.measures.filter((m) => m.value == o.measure[0])
              : [];
            overlayData.data = data;
            const line = LineLayer(
              overlayData,
              lineColor,
              layout,
              groupMode,
              applyFilter(options.keys, true),
              tooltip,
              o.title,
              measure.length > 0 ? measure[0].label : ""
            );
            layers.push(line as any);
          }
        }
      }
    });
  }

  if (***REMOVED*** === POSITION_TOP) {
    layers.push(***REMOVED***);
  }

  if (***REMOVED***) {
    layers.push(createZeroLineHighlight);
  }

  layers.push(***REMOVED***);

  let ticks = parseInt(String(***REMOVED***));
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

const hiddenLabels: string [] = [];
if(isMobileCustomizationEnabled) {
    ticks = parseInt(***REMOVED***.***REMOVED***);
    const labels = new Map(Object.entries(***REMOVED***?.labels?.xAxis ?? {}));
    for (const [key, value] of labels) {
      if (!value) {
        hiddenLabels.push(key);
      }
    }
}

  return (
    <div style={{ height: height }}>
      {options && options.data && options.data.length > 0 && (
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
            valueScale={{
              type: valueScale,
              clamp: maxValue === "fixed" && minMaxClamp,
            }}
            colors={(d) => {
              if (d && d.data[COLOR_VARIABLE]) {
                return d.data[COLOR_VARIABLE];
              }
              const color = ***REMOVED***.getColor(d.id, d.data);
              return color;
            }}
            borderColor="#000"
            reverse={reverse}
            axisTop={null}
            axisRight={
              showRightAxis
                ? {
                    tickSize:
                      (layout == "horizontal" && showTickLine) ||
                      layout === "vertical"
                        ? 5
                        : 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    tickValues: ticks,
                    legend: legends && legends.right,
                    ***REMOVED***: "middle",
                    legendOffset: parseInt(String(offsetRight)),
                    format: (value) => {
                      if (layout == "vertical") {
                        const ***REMOVED*** = ***REMOVED***
                          ? ***REMOVED***
                          : format;
                        return intl.formatNumber(
                          ***REMOVED***.style === "percent"
                            ? value / 100
                            : value,
                          {
                            ...***REMOVED***,
                          }
                        );
                      }

                      return value;
                    },
                  }
                : null
            }
            axisBottom={
              isMobileCustomizationEnabled && ***REMOVED***?.xAxisDisabled === true ? null :
              layout == "horizontal"
                ? {
                    legend: legends && legends.bottom,
                    ***REMOVED***: "middle",
                    legendOffset: parseInt(String(offsetBottom)),
                    tickPadding: 5,
                    tickRotation: 0,
                    tickValues: parseInt(String(***REMOVED***)),
                    format: (value) => {
                      if (layout == "horizontal") {
                        const ***REMOVED*** = ***REMOVED***
                          ? ***REMOVED***
                          : format;
                        return intl.formatNumber(
                          ***REMOVED***.style === "percent"
                            ? value / 100
                            : value,
                          {
                            ...***REMOVED***,
                          }
                        );
                      }
                      return value;
                    },
                  }
                : {
                    legend: legends && legends.bottom,
                    ***REMOVED***: "middle",
                    legendOffset: parseInt(String(offsetBottom)),
                    renderTick: CustomTick,
                  }
            }
            axisLeft={{
              tickSize:
                (layout == "horizontal" && showTickLine) ||
                layout === "vertical"
                  ? 5
                  : 0,
              tickPadding: 5,
              tickRotation: 0,
              tickValues: ticks,
              legend: legends && legends.left,
              ***REMOVED***: "middle",
              legendOffset: parseInt(String(offsetY)),
              format: (value) => {
                if (layout == "vertical") {
                  const ***REMOVED*** = ***REMOVED***
                    ? ***REMOVED***
                    : format;
                  return intl.formatNumber(
                    ***REMOVED***.style === "percent" ? value / 100 : value,
                    {
                      ...***REMOVED***,
                    }
                  );
                }
                return value;
              },
            }}
            enableGridY={enableGridY}
            enableGridX={enableGridX}
            layout={layout}
            ***REMOVED***={LABEL_SKIP_WIDTH}
            ***REMOVED***={LABEL_SKIP_HEIGHT}
            padding={barPadding}
            ***REMOVED***={***REMOVED***()}
            label={(l) =>
              intl.formatNumber(
                format.style === "percent" ? (l.value ?? 0) / 100 : l.value ?? 0,
                format
              )
            }
            layers={layers}
            onMouseEnter={(_data) => {}}
            onMouseLeave={(_data) => {}}
            tooltip={(d) => {
              if (***REMOVED*** && tooltip && tooltip.trim().length > 0) {
                return (
                  <Tooltip
                    intl={intl}
                    format={format as any}
                    d={d}
                    tooltip={tooltip}
                    tooltipEnableMarkdown={tooltipEnableMarkdown}
                  />
                );
              }
              return null;
            }}
            theme={{
              tooltip: {
                basic: {
                  whiteSpace: "pre",
                  display: "flex",
                  alignItems: "center",
                },
                container: {
                  background: "transparent",
                  boxShadow: "",
                },
                table: {},
                tableCell: { padding: "3px 5px" },
              },
            }}
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
        </>
      )}
    </div>
  );
};

export default injectIntl(Chart);
