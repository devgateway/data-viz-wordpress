import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { useRef, useState, useCallback, useEffect, Fragment as Fragment$1 } from "react";
import { Segment, Header, Button, Container } from "semantic-ui-react";
import { D as DataProvider, a as DataConsumer } from "./DataConsumer-Bpiyfpil.js";
import { injectIntl } from "react-intl";
import { ResponsivePie } from "@nivo/pie";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import template from "string-template";
import { sequentialColorInterpolators, colorSchemes, isSequentialColorScheme, isCategoricalColorScheme } from "@nivo/colors";
import * as d3 from "d3";
import { v4 } from "uuid";
import { ***REMOVED*** } from "@nivo/radar";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@nivo/core";
import { line, area } from "d3-shape";
import Papa from "papaparse";
import { g as getDeviceType } from "./deviceType-CnQNKjrj.js";
import { ***REMOVED*** } from "@nivo/line";
import "react-compiler-runtime";
import { e as connect_default, f as cleanFilter, b as PostContent } from "./server-build-C_g_IF5C.js";
import "./DataContext-BNxY-bMy.js";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
import "prop-types";
import "react-dom/client";
import "immutable";
import "@devgateway/customizer";
import "@reduxjs/toolkit";
import "@artsy/fresnel";
import "clsx";
import "semantic-ui-react/dist/commonjs/lib/index.js";
import "query-string";
const ***REMOVED*** = /(\+?\%)[\(]([A-z0-9,.,-]+)\)/gi;
const ***REMOVED*** = /(\+?\#)[\(]([A-z0-9,.,-]+)\)/gi;
const ***REMOVED*** = /(\+?\#C)[\(]([A-z0-9,.,-]+)\)/gi;
const applyFormat = (expresion, str, style, isPercent, intl, container) => {
  let result;
  let str1 = str;
  while ((result = expresion.exec(str)) !== null) {
    const arg = result[2];
    const numFormat = result[1];
    const format = (n, d = 2) => {
      return intl.formatNumber(isPercent ? n / 100 : n, {
        maximumFractionDigits: d,
        ...style,
        signDisplay: numFormat && numFormat.startsWith("+") ? "never" : "auto"
      });
    };
    const formatted = format.apply(void 0, arg.split(","));
    str1 = str1.replaceAll(result[0], formatted);
  }
  return str1;
};
const formatContent = (tooltip, variables, intl, tooltipEnableMarkdown) => {
  let str = tooltipEnableMarkdown ? template(tooltip, variables) : template(tooltip, variables).replace(/(?:\r\n|\r|\n)/g, "<br>");
  str = applyFormat(***REMOVED***, str, { style: "percent" }, true, intl);
  str = applyFormat(***REMOVED***, str, { style: "decimal" }, false, intl);
  str = applyFormat(
    ***REMOVED***,
    str,
    { notation: "compact" },
    false,
    intl
  );
  return str;
};
const Tooltip = ({ tooltip, d, intl, tooltipEnableMarkdown, format }) => {
  const { color, data } = d.datum || d.point || d;
  const current = d.value || (d.datum ? d.datum.value : null) || (d.point ? d.point.data.y : null);
  if (data) {
    const vars = data.variables ? data.variables[d.id] || data.variables : data;
    const params = {
      field: d.point ? d.point.serieId : d.id,
      ...vars,
      value: current
    };
    if (data.***REMOVED***) {
      params.***REMOVED*** = data.variables[data.***REMOVED*** + "Population"];
    }
    const str = formatContent(tooltip, params, intl, tooltipEnableMarkdown);
    if (tooltipEnableMarkdown) {
      return /* @__PURE__ */ jsx(
        ReactMarkdown,
        {
          children: str,
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeRaw],
          className: "chart tooltip"
        }
      );
    } else {
      return /* @__PURE__ */ jsx("div", { className: "chart tooltip", children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: str } }) });
    }
  } else {
    return /* @__PURE__ */ jsx("div", {});
  }
};
const ***REMOVED*** = ({ children, onWrapChange, className }) => {
  const containerRef = useRef(null);
  const [wrapCount, setWrapCount] = useState(0);
  const makeFlexWrap = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("display", "flex", "important");
      if (wrapCount > 0) {
        containerRef.current.style.setProperty(
          "flex-wrap",
          "wrap",
          "important"
        );
      } else {
        containerRef.current.style.setProperty(
          "flex-wrap",
          "nowrap",
          "important"
        );
      }
    }
  }, [wrapCount]);
  const checkWrap = useCallback(() => {
    const container = containerRef.current;
    let count = 0;
    if (container && container.children.length > 1) {
      const firstTop = container.children[0].getBoundingClientRect().top;
      Array.from(container.children).forEach((child, index2) => {
        if (index2 > 0 && child.getBoundingClientRect().top > firstTop) {
          count++;
        }
      });
    }
    if (count !== wrapCount) {
      setWrapCount(count);
    }
  }, [wrapCount]);
  useEffect(() => {
    checkWrap();
    window.***REMOVED***("resize", checkWrap);
    return () => window.***REMOVED***("resize", checkWrap);
  }, [checkWrap]);
  useEffect(() => {
    if (onWrapChange) {
      onWrapChange(wrapCount);
    }
  }, [wrapCount, onWrapChange]);
  useEffect(() => {
    makeFlexWrap();
  }, [makeFlexWrap]);
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className, children: [
    makeFlexWrap(),
    children
  ] });
};
const Chart$4 = ({
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
  ***REMOVED***,
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
  const [filter, setFilter] = useState([]);
  const [tooltipValue, ***REMOVED***] = useState(tooltip);
  const [optionsVal, setOptions] = useState(options);
  const [bottomSpacing, ***REMOVED***] = useState(50);
  const [newMarginTop, ***REMOVED***] = useState(marginTop);
  const [wrapCount, setWrapCount] = useState(0);
  const [***REMOVED***, ***REMOVED***] = useState(marginBottom);
  const chartLegends = optionsVal.data.sort((a, b) => {
    if (a.position && b.position) {
      return a.position - b.position;
    }
    return 0;
  }).map((d, index2) => {
    const theColor = ***REMOVED***.getColor(d.id, d);
    return {
      color: theColor,
      id: d.id,
      label: d.label
    };
  });
  useEffect(() => {
    ***REMOVED***(tooltip);
    setOptions({
      ...options,
      id: v4()
    });
  }, [tooltip, options]);
  useEffect(() => {
    const adjustBottomForLegends = () => {
      const extraItems = Math.max(chartLegends.length - 5, 0);
      const adjustment = 5 * extraItems;
      ***REMOVED***(adjustment);
    };
    adjustBottomForLegends();
  }, [chartLegends]);
  const rightLegendDynamicStyle = {
    bottom: `-${bottomSpacing}px`
  };
  const leftLegendDynamicStyle = {
    bottom: `-${bottomSpacing}px`,
    gap: "0px"
  };
  const toggle = (id) => {
    const newFilter = filter.slice();
    if (newFilter.indexOf(id) > -1) {
      const index2 = newFilter.indexOf(id);
      newFilter.splice(index2, 1);
    } else {
      newFilter.push(id);
    }
    setFilter(newFilter);
  };
  const applyFilter = (values) => {
    if (filter) {
      return values.filter((d) => filter.indexOf(d.id) === -1);
    } else {
      return values;
    }
  };
  if (!optionsVal || !optionsVal.data) {
    return null;
  }
  const margins = {
    top: newMarginTop,
    right: marginRight,
    bottom: ***REMOVED***,
    left: marginLeft
  };
  const legendTitle = () => {
    return /* @__PURE__ */ jsx(Fragment, { children: showLegends && legendLabel && /* @__PURE__ */ jsx("div", { className: "legend item", children: /* @__PURE__ */ jsx("label", { className: "legend-title", children: legendLabel }) }) });
  };
  const legendItems = () => {
    if (reverseLegend) {
      chartLegends.reverse();
    }
    return /* @__PURE__ */ jsx(Fragment, { children: showLegends && chartLegends.map((legend) => {
      return /* @__PURE__ */ jsxs("div", { className: "legend item", onClick: () => toggle(legend.id), children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "ignore",
            type: "checkbox",
            checked: filter.length == 0 || !filter.includes(legend.id)
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: ***REMOVED*** ? "checkmark-with-bg" : "checkmark",
            style: {
              ***REMOVED***: ***REMOVED*** == true ? legend.color : "transparent"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "label",
          {
            style: {
              ***REMOVED***: ***REMOVED*** == true ? legend.color : "transparent",
              color: ***REMOVED***
            },
            children: legend.label
          }
        )
      ] });
    }) });
  };
  const CenterText = (layerProps) => {
    const { centerX, centerY } = layerProps;
    const centerText = centerLabel.split(/[\r\n]/g);
    let totalValue = 0;
    if (layerProps.dataWithArc) {
      totalValue = layerProps.dataWithArc.reduce(
        function(previousValue, currentValue) {
          return previousValue + currentValue.value;
        },
        0
      );
    }
    return /* @__PURE__ */ jsx(
      "text",
      {
        x: centerX,
        y: centerY,
        textAnchor: "start",
        ***REMOVED***: "central",
        children: centerText.map((label, i) => {
          return /* @__PURE__ */ jsx(
            "tspan",
            {
              x: centerX + parseInt(***REMOVED***),
              y: centerY + parseInt(***REMOVED***) + i * 20,
              style: {
                fontSize: ***REMOVED*** + "px",
                fontWeight: centerLabelFontWeight,
                fill: "#000"
              },
              children: formatContent(label, { totalValue }, intl)
            }
          );
        })
      }
    );
  };
  return /* @__PURE__ */ jsx("div", { style: { height }, className: "pie-chart", children: optionsVal && optionsVal.data && optionsVal.data.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ResponsivePie,
      {
        data: applyFilter(optionsVal.data),
        margin: margins,
        startAngle,
        endAngle,
        sortByValue: true,
        innerRadius: 0.7,
        padAngle: slicePadding,
        cornerRadius: 3,
        colors: (d) => {
          return ***REMOVED***.getColor(d.id, d.data);
        },
        borderWidth: 1,
        borderColor: { from: "color", modifiers: [["brighter", "2"]] },
        ***REMOVED***: showArcLabels,
        ***REMOVED***: ***REMOVED***,
        ***REMOVED***: "#333333",
        arcLinkLabelsSkipAngle: 5,
        ***REMOVED***: 15,
        ***REMOVED***: 20,
        arcLabel: (l) => intl.formatNumber(
          format.style === "percent" ? l.value / 100 : l.value,
          format
        ),
        radialLabelsSkipAngle: 20,
        radialLabelsTextColor: "#333333",
        radialLabelsLinkOffset: 1,
        radialLabelsLinkDiagonalLength: 5,
        radialLabelsLinkHorizontalLength: 16,
        radialLabelsLinkStrokeWidth: 1,
        radialLabelsLinkColor: { from: "color" },
        arcLinkLabel: (r) => r.label,
        layers: [
          "arcLinkLabels",
          "arcs",
          "arcLabels",
          "legends",
          CenterText
        ],
        animate: true,
        ***REMOVED***: 90,
        motionDamping: 15,
        legends: [],
        ***REMOVED***: { from: "color", modifiers: [["darker", 1.6]] },
        tooltip: (d) => {
          if (d.datum && d.datum.data && d.datum.data.variables) {
            const percent = d.datum.arc.angleDeg / 360 * 100;
            d.datum.data.variables.valuePercent = percent;
            d.datum.data.variables.category = d.datum.id;
          }
          if (***REMOVED*** && tooltip && tooltip.trim().length > 0) {
            return /* @__PURE__ */ jsx(
              Tooltip,
              {
                intl,
                format,
                d,
                tooltip: tooltipValue,
                tooltipEnableMarkdown
              }
            );
          }
          return null;
        }
      },
      optionsVal.id
    ),
    (***REMOVED*** === "top" || ***REMOVED*** === "bottom") && /* @__PURE__ */ jsx(
      "div",
      {
        className: `legends container has-standard-12-font-size ${***REMOVED***}`,
        children: /* @__PURE__ */ jsxs("div", { className: "legend-sections", children: [
          /* @__PURE__ */ jsx("div", { className: "title-section", children: legendTitle() }),
          /* @__PURE__ */ jsx(
            ***REMOVED***,
            {
              onWrapChange: (count) => {
                if (***REMOVED*** === "top") {
                  ***REMOVED***(marginTop + count / 2 * 40);
                  setWrapCount(count);
                } else {
                  ***REMOVED***(marginBottom + count / 2 * 25);
                  setWrapCount(count);
                }
              },
              className: `legends container has-standard-12-font-size items-section`,
              children: legendItems()
            }
          )
        ] })
      }
    ),
    (***REMOVED*** === "right" || ***REMOVED*** === "left") && /* @__PURE__ */ jsxs(
      "div",
      {
        className: `legends container has-standard-12-font-size  ${***REMOVED***}`,
        style: ***REMOVED*** === "right" ? rightLegendDynamicStyle : leftLegendDynamicStyle,
        children: [
          legendTitle(),
          legendItems()
        ]
      }
    )
  ] }) });
};
const HalfPie = injectIntl(Chart$4);
const Legends = ({
  filter,
  showLegends,
  chartLegends,
  legendLabel,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED***,
  onToggle,
  reverseLegend
}) => {
  const legendTitle = () => {
    return /* @__PURE__ */ jsx(Fragment, { children: showLegends && legendLabel && /* @__PURE__ */ jsx("div", { className: "legend item", children: /* @__PURE__ */ jsx("label", { className: "legend-title", children: legendLabel }) }) });
  };
  const legendItems = () => {
    if (reverseLegend) {
      chartLegends.reverse();
    }
    return /* @__PURE__ */ jsx(Fragment, { children: showLegends && chartLegends.map((legend) => {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "legend item",
          onClick: () => onToggle(legend.id),
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "ignore",
                type: "checkbox",
                checked: filter.length == 0 || !filter.includes(legend.id),
                readOnly: true
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: ***REMOVED*** ? "checkmark-with-bg" : "checkmark",
                style: {
                  ***REMOVED***: ***REMOVED*** == true ? legend.color : "#FFF"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                ***REMOVED***,
                style: {
                  ***REMOVED***: ***REMOVED*** == true ? legend.color : "#FFF",
                  color: ***REMOVED***
                },
                children: legend.label
              }
            )
          ]
        }
      );
    }) });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    " ",
    (***REMOVED*** == "top" || ***REMOVED*** == "bottom") && /* @__PURE__ */ jsx(
      "div",
      {
        className: `legends container has-standard-12-font-size  ${***REMOVED***}`,
        children: /* @__PURE__ */ jsxs("div", { className: "legend-sections", children: [
          /* @__PURE__ */ jsx("div", { className: "title-section", children: legendTitle() }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `legends container has-standard-12-font-size items-section`,
              children: legendItems()
            }
          )
        ] })
      }
    ),
    (***REMOVED*** == "right" || ***REMOVED*** == "left") && /* @__PURE__ */ jsxs(
      "div",
      {
        className: `legends container has-standard-12-font-size  ${***REMOVED***}`,
        children: [
          legendTitle(),
          legendItems()
        ]
      }
    )
  ] });
};
const DEFAULT_COLOR$1 = "none";
const Chart$3 = ({
  legends,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  options,
  intl,
  format,
  height,
  showLegends,
  ***REMOVED***,
  legendLabel,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED***,
  reverseLegend,
  radarCurve,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED***,
  ***REMOVED*** = 10,
  ***REMOVED***,
  radarDotSize,
  ***REMOVED***,
  ***REMOVED***
}) => {
  const [filter, setFilter] = useState([]);
  const applyFilter = (values) => {
    return values ? values.filter((d) => filter.indexOf(d) === -1) : [];
  };
  const toggle = (id) => {
    const newFilter = filter.slice();
    if (newFilter.indexOf(id) > -1) {
      const index2 = newFilter.indexOf(id);
      newFilter.splice(index2, 1);
    } else {
      newFilter.push(id);
    }
    setFilter(newFilter);
  };
  if (!options || !options.data) {
    return null;
  }
  const margins = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft
  };
  const chartLegends = options.keys.map((k) => {
    let theColor;
    let enabled = true;
    if (filter.indexOf(k) > -1) {
      enabled = false;
      theColor = DEFAULT_COLOR$1;
    } else {
      theColor = ***REMOVED***.getColorByKey(k);
    }
    return {
      enabled,
      color: theColor,
      id: k,
      label: k
    };
  });
  const customLayer = (props) => {
    return /* @__PURE__ */ jsxs("g", { children: [
      /* @__PURE__ */ jsx(
        "line",
        {
          strokeWidth: 1,
          style: { ***REMOVED***: "4,4", stroke: "rgb(51, 51, 51)" },
          x1: props.centerX,
          y1: props.centerY,
          x2: props.centerX + props.radiusScale(70) * Math.sin(0),
          y2: 0
        }
      ),
      props.radiusScale.ticks(***REMOVED***).filter((t) => t > 0).map((tick, index2) => {
        const r = props.radiusScale(tick);
        const x = props.centerX + r * Math.sin(0) + 7;
        const y = props.centerY - r * Math.cos(0);
        return /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx(
            "line",
            {
              strokeWidth: 1,
              style: { stroke: "rgb(51, 51, 51)" },
              x1: x - 7,
              y1: y - 4,
              x2: x - 3,
              y2: y - 4
            }
          ),
          /* @__PURE__ */ jsx(
            "text",
            {
              x,
              y,
              style: {
                "font-family": "sans-serif",
                "font-size": "11px",
                fill: "rgb(51, 51, 51)"
              },
              children: intl.formatNumber(
                format.style === "percent" ? tick / 100 : tick,
                format
              )
            }
          )
        ] });
      })
    ] });
  };
  return /* @__PURE__ */ jsx("div", { style: { height }, className: "radar", children: options && options.data && options.data.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ***REMOVED***,
      {
        data: options.data,
        keys: applyFilter(options.keys),
        indexBy: options.indexBy,
        colors: (d) => {
          const color = ***REMOVED***.getColor(d.key, d);
          return color;
        },
        tooltipFormat: (d) => {
          return intl.formatNumber(
            format.style === "percent" ? d / 100 : d,
            format
          );
        },
        borderColor: { from: "color" },
        curve: radarCurve,
        fillOpacity: ***REMOVED***,
        borderWidth: ***REMOVED***,
        gridLevels: ***REMOVED***,
        gridShape: ***REMOVED***,
        ***REMOVED***: parseInt(***REMOVED***),
        enableDots: ***REMOVED***,
        dotSize: radarDotSize,
        ***REMOVED***: 2,
        ***REMOVED***: ***REMOVED***,
        ***REMOVED***: ***REMOVED***,
        dotLabel: (d) => {
          return intl.formatNumber(
            format.style === "percent" ? d.value / 100 : d.value,
            format
          );
        },
        blendMode: "multiply",
        motionConfig: "wobbly",
        margin: margins,
        animate: true,
        theme: {
          tooltip: {
            basic: {
              whiteSpace: "pre",
              display: "flex",
              alignItems: "center"
            },
            container: {
              background: "#EEE",
              boxShadow: ""
            },
            table: {},
            tableCell: { padding: "3px 5px" }
          }
        },
        layers: [
          "grid",
          "layers",
          "slices",
          customLayer,
          "dots",
          "axes",
          "legends",
          "mesh",
          "annotations"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Legends,
      {
        filter,
        showLegends,
        chartLegends,
        legendLabel,
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***,
        onToggle: toggle,
        reverseLegend
      }
    )
  ] }) });
};
const Radar = injectIntl(Chart$3);
const Line$1 = (data, lineColor, layout, groupMode, keys, ***REMOVED***, title, measure) => injectIntl((props) => {
  const { intl } = props;
  let centerLine = groupMode === "grouped";
  if (data) {
    const { bars, xScale, yScale, innerWidth, innerHeight } = props;
    let indexes = /* @__PURE__ */ new Set();
    let lineData = [];
    let barWidth = 0;
    if (bars && bars.length > 0) {
      indexes = new Set(props.bars.map((b) => b.data.indexValue));
      lineData = data.data.filter((d) => {
        const indexesArray = Array.from(indexes);
        return indexesArray.find((i) => i == d[0]);
      });
      barWidth = layout === "horizontal" ? props.bars[0].height : props.bars[0].width;
    } else {
      centerLine = false;
      if (data.data) {
        data.data.forEach((it) => {
          if (it) {
            indexes.add(it[0]);
          }
        });
        lineData = data.data;
        barWidth = layout === "horizontal" ? innerHeight / indexes.size : innerWidth / indexes.size;
      }
    }
    let yIndex;
    let xIndex;
    if (layout === "horizontal") {
      xIndex = 1;
      yIndex = 0;
    } else {
      xIndex = 0;
      yIndex = 1;
    }
    const lineGenerator = line();
    lineGenerator.x((data2) => {
      if (layout === "horizontal") {
        return xScale(data2[xIndex]);
      } else {
        return xScale(data2[xIndex]) + barWidth * (centerLine ? keys.length : 1) / 2;
      }
    }).y((data2) => {
      if (layout === "horizontal") {
        return yScale(data2[yIndex]) + barWidth * (centerLine ? keys.length : 1) / 2;
      } else {
        return yScale(data2[yIndex]);
      }
    });
    const tooltip = d3.select("#root").append("div").attr("class", "chart tooltip").style("transition", "all 1s ease-out;").style("background-color", lineColor).style("position", "absolute").style("visibility", "hidden");
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          d: lineGenerator(lineData),
          fill: "none",
          "stroke-width": "4",
          stroke: `${lineColor}`,
          style: { pointerEvents: "none" }
        }
      ),
      lineData.map((d) => {
        const ***REMOVED*** = layout === "horizontal" ? barWidth * (centerLine ? keys.length : 1) / 2 : 0;
        const ***REMOVED*** = layout === "horizontal" ? 0 : barWidth * (centerLine ? keys.length : 1) / 2;
        return /* @__PURE__ */ jsx(
          "circle",
          {
            onMouseOver: (event) => {
              tooltip.style("visibility", "visible");
            },
            onMouseMove: (event) => {
              if (***REMOVED*** && ***REMOVED***.trim().length > 0) {
                tooltip.html(
                  formatContent(
                    ***REMOVED***,
                    {
                      x: d[0],
                      y: d[1],
                      title,
                      measure
                    },
                    intl
                  )
                );
                tooltip.style(
                  "top",
                  event.pageY - tooltip.node().getBoundingClientRect().height + "px"
                ).style(
                  "left",
                  event.pageX - tooltip.node().getBoundingClientRect().width + "px"
                );
              }
            },
            onMouseOut: (event) => tooltip.style("visibility", "hidden"),
            cx: xScale(d[xIndex]) + ***REMOVED***,
            cy: yScale(d[yIndex]) + ***REMOVED***,
            r: 7,
            fill: lineColor,
            style: { pointerEvents: "all", cursor: "pointer" }
          },
          d.index
        );
      })
    ] });
  } else {
    return null;
  }
});
const POSITION_MIDDLE = "middle";
const POSITION_TOP = "top";
const ZERO_LINE_COLOR$1 = "#66676d";
const GRID_LINE_COLOR = "#dddddd";
const DEFAULT_COLOR = "none";
const COLOR_VARIABLE = "_Color";
const Chart$2 = ({
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
}) => {
  var _a;
  const isMobile2 = getDeviceType() === "mobile";
  const LABEL_SKIP_WIDTH = 30;
  const LABEL_SKIP_HEIGHT2 = 15;
  const ***REMOVED*** = JSON.parse(***REMOVED***(***REMOVED***));
  const isMobileCustomizationEnabled = isMobile2 && ((***REMOVED*** == null ? void 0 : ***REMOVED***.***REMOVED***) ?? false);
  const ***REMOVED*** = () => {
    if (barLabelColor === "null" || barLabelColor === null || !barLabelColor) {
      return "#000000";
    }
    return barLabelColor;
  };
  const [filter, setFilter] = useState([]);
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
  const ***REMOVED*** = (options2, colors2, filter2, DEFAULT_COLOR2, ***REMOVED***) => {
    let chartLegends2 = [];
    if (options2.data) {
      chartLegends2 = colors2.colorBy === "index" ? options2.data.map((d) => {
        let theColor;
        let enabled = true;
        if (filter2.indexOf(d[options2.indexBy]) > -1) {
          enabled = false;
          theColor = DEFAULT_COLOR2;
        } else {
          theColor = d[COLOR_VARIABLE] ? d[COLOR_VARIABLE] : ***REMOVED***.getColor(d.id, d);
        }
        return {
          enabled,
          color: theColor,
          id: d[options2.indexBy],
          label: d[options2.indexBy]
        };
      }) : options2.keys.map((k) => {
        let theColor;
        let enabled = true;
        if (filter2.indexOf(k) > -1) {
          enabled = false;
          theColor = DEFAULT_COLOR2;
        } else {
          theColor = ***REMOVED***.getColorByKey(k);
        }
        return {
          enabled,
          color: theColor,
          id: k,
          label: k
        };
      });
    }
    return chartLegends2;
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
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      showLegends && chartLegends.map((legend, index2) => {
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `legend item ${legend.enabled ? "" : "ignore"}`,
            onClick: () => toggle(legend.id),
            children: [
              ***REMOVED*** && /* @__PURE__ */ jsx(
                "input",
                {
                  className: legend.enabled ? "" : "ignore",
                  type: "checkbox",
                  checked: legend.enabled,
                  readOnly: true,
                  style: {
                    ***REMOVED***: ***REMOVED*** ? colorBy === "values" ? tickColor : legend.color : "none",
                    color: "#000"
                  }
                }
              ),
              !***REMOVED*** && /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: legend.enabled,
                  readOnly: true,
                  style: {
                    color: "#000"
                  }
                }
              ),
              ***REMOVED*** && /* @__PURE__ */ jsx(
                "span",
                {
                  className: "checkmark-with-bg",
                  style: { ***REMOVED***: legend.color }
                }
              ),
              !***REMOVED*** && /* @__PURE__ */ jsx("span", { className: "checkmark" }),
              ***REMOVED*** && /* @__PURE__ */ jsx(
                "label",
                {
                  className: legend.enabled ? "" : "ignore",
                  style: {
                    ***REMOVED***: colorBy === "values" ? tickColor : legend.color,
                    color: ***REMOVED***
                  },
                  children: legend.label
                }
              ),
              !***REMOVED*** && /* @__PURE__ */ jsx(
                "label",
                {
                  className: legend.enabled ? "" : "ignore",
                  style: {
                    color: ***REMOVED***
                  },
                  children: legend.label
                }
              )
            ]
          },
          index2
        );
      }),
      colorBy === "values" && /* @__PURE__ */ jsxs("div", { className: "legend item", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "range min",
            style: {
              ***REMOVED***: ***REMOVED***.***REMOVED***(
                ***REMOVED***.minValue
              ),
              color: "#fff"
            }
          }
        ),
        /* @__PURE__ */ jsx("label", { children: intl.formatNumber(
          format.style === "percent" ? ***REMOVED***.minValue / 100 : ***REMOVED***.minValue,
          {
            ...format,
            minimumFractionDigits: 0
          }
        ) })
      ] }),
      colorBy === "values" && /* @__PURE__ */ jsxs("div", { className: "legend item", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "range max",
            style: {
              ***REMOVED***: ***REMOVED***.***REMOVED***(
                ***REMOVED***.maxValue
              ),
              color: "#fff"
            },
            children: " "
          }
        ),
        /* @__PURE__ */ jsx("label", { children: intl.formatNumber(
          format.style === "percent" ? ***REMOVED***.maxValue / 100 : ***REMOVED***.maxValue,
          {
            ...format,
            minimumFractionDigits: 0
          }
        ) })
      ] }),
      showLegends && ***REMOVED*** && overlays.map((o, idx) => {
        return /* @__PURE__ */ jsxs("div", { className: "legend item", onClick: () => toggleLine(idx), children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: ***REMOVED*** && showLine[idx] ? "" : "ignore",
              type: "checkbox",
              checked: showLine[idx],
              readOnly: true,
              style: {
                ***REMOVED***: showLine[idx] && ***REMOVED*** === true ? o.lineColor : "none",
                color: "#000"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: ***REMOVED*** ? "checkmark-with-bg" : "checkmark",
              style: {
                ***REMOVED***: showLine[idx] && ***REMOVED*** === true ? o.lineColor : "none"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "label",
            {
              className: showLine[idx] ? "" : "ignore",
              style: {
                ***REMOVED***: showLine[idx] && ***REMOVED*** === true ? o.lineColor : "none",
                color: ***REMOVED***
              },
              children: o.title
            }
          )
        ] }, idx);
      })
    ] });
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
    bottom: `-${bottomSpacing}px`
  };
  const leftLegendDynamicStyle = {
    bottom: `-${bottomSpacing}px`,
    gap: "0px",
    top: "0px"
  };
  const ***REMOVED*** = (data) => {
    return drawLine(data, "1 0", GRID_LINE_COLOR, "Y");
  };
  const createZeroLineHighlight = (data) => {
    return drawLine(data, "4 4", ZERO_LINE_COLOR$1, "X");
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
    return /* @__PURE__ */ jsx(Fragment$1, { children: bars.filter((b) => b.data.value != null).map((bar, idx) => {
      let seriedId = bar.data.indexValue;
      if (options.***REMOVED*** && options.***REMOVED***.size > 1) {
        seriedId = bar.data.id;
      }
      const ***REMOVED*** = ***REMOVED***.filter(
        (c) => c.serieLabel == seriedId
      )[0];
      if (***REMOVED*** && ***REMOVED***.low && ***REMOVED***.high) {
        const low = yScale(parseFloat(***REMOVED***.low));
        const high = yScale(parseFloat(***REMOVED***.high));
        return /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx(
            "line",
            {
              y1: low,
              y2: high,
              x1: bar.x + bar.width / 2,
              x2: bar.x + bar.width / 2,
              strokeWidth: 1,
              stroke: ZERO_LINE_COLOR$1
            }
          ),
          /* @__PURE__ */ jsx(
            "line",
            {
              y1: low,
              y2: low,
              x1: bar.x + bar.width / 2 - 3,
              x2: bar.x + bar.width / 2 + 3,
              strokeWidth: 1,
              stroke: ZERO_LINE_COLOR$1
            }
          ),
          /* @__PURE__ */ jsx(
            "line",
            {
              y1: high,
              y2: high,
              x1: bar.x + bar.width / 2 - 3,
              x2: bar.x + bar.width / 2 + 3,
              strokeWidth: 1,
              stroke: ZERO_LINE_COLOR$1
            }
          )
        ] }, idx);
      }
    }) });
  };
  const drawLine = (data, ***REMOVED***, color, axis) => {
    const { yScale, innerWidth, innerHeight } = data;
    let points;
    let lineGenerator;
    if (axis == "X") {
      points = [0, innerWidth];
      lineGenerator = line().x((xPoint, index2) => {
        if (index2 === 0) {
          return -10;
        } else {
          return xPoint;
        }
      }).y(() => yScale(0));
    } else {
      points = [0, innerHeight];
      lineGenerator = line().x(() => 0).y((point) => {
        return point;
      });
    }
    return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsx(
      "path",
      {
        d: lineGenerator(points),
        fill: "none",
        stroke: color,
        style: { pointerEvents: "none", ***REMOVED*** }
      }
    ) });
  };
  const getTextWidth2 = (text, font) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) {
      return 0;
    }
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  };
  const applyFilter = (values2, filterKeys) => {
    if (filter) {
      if ((colors.colorBy === "index" || colors.colorBy === "id" || colors.colorBy === "values") && !filterKeys) {
        return values2.filter((d) => filter.indexOf(d[options.indexBy]) === -1);
      } else {
        return values2 ? values2.filter((d) => filter.indexOf(d) === -1) : [];
      }
    } else {
      return values2;
    }
  };
  const CustomTick = (tick) => {
    const tickObject = Object.assign({}, tick);
    const theme = useTheme();
    if (isMobileCustomizationEnabled && hiddenLabels.includes(String(tickObject.value))) {
      tickObject.value = "";
    }
    let ***REMOVED***;
    if (***REMOVED***) {
      ***REMOVED*** = tickColor;
    } else {
      ***REMOVED*** = legendColor(tick);
    }
    getTextWidth2(tickObject.value, "12px Roboto") + 30;
    if (tickRotation > 0 && tickRotation < 180) {
      return /* @__PURE__ */ jsxs("g", { transform: `translate(${tick.x},${tick.y + 30})`, children: [
        showTickLine && /* @__PURE__ */ jsx(
          "line",
          {
            stroke: ***REMOVED***,
            strokeWidth: 1.5,
            y1: -32,
            y2: -12
          }
        ),
        /* @__PURE__ */ jsx("g", { transform: `translate(0, ${tick.y + offsetText})`, children: /* @__PURE__ */ jsx(
          "text",
          {
            transform: `rotate(${tickRotation})`,
            textAnchor: "start",
            ***REMOVED***: "middle",
            style: {
              ...theme.axis.ticks.text,
              fill: xLabelColor === "null" ? "black" : xLabelColor,
              fontSize: "12px"
            },
            children: tickObject.value
          }
        ) })
      ] });
    } else if (tickRotation > 180 && tickRotation < 360) {
      return /* @__PURE__ */ jsxs("g", { transform: `translate(${tick.x},${tick.y + 30})`, children: [
        showTickLine && /* @__PURE__ */ jsx(
          "line",
          {
            stroke: ***REMOVED***,
            strokeWidth: 1.5,
            y1: -32,
            y2: -12
          }
        ),
        /* @__PURE__ */ jsx("g", { transform: `translate(0, ${tick.y + offsetText})`, children: /* @__PURE__ */ jsx(
          "text",
          {
            transform: `rotate(${tickRotation})`,
            textAnchor: "end",
            ***REMOVED***: "middle",
            style: {
              ...theme.axis.ticks.text,
              fill: xLabelColor === "null" ? "black" : xLabelColor,
              fontSize: "12px"
            },
            children: tickObject.value
          }
        ) })
      ] });
    } else {
      return /* @__PURE__ */ jsxs("g", { transform: `translate(${tick.x},${tick.y + 30})`, children: [
        showTickLine && /* @__PURE__ */ jsx(
          "line",
          {
            stroke: ***REMOVED***,
            strokeWidth: 1.5,
            y1: -32,
            y2: -12
          }
        ),
        /* @__PURE__ */ jsx("g", { transform: `translate(0, ${tick.y + offsetText})`, children: /* @__PURE__ */ jsx(
          "text",
          {
            transform: `rotate(${tickRotation})`,
            textAnchor: "middle",
            ***REMOVED***: "middle",
            style: {
              ...theme.axis.ticks.text,
              fill: xLabelColor === "null" ? "black" : xLabelColor,
              fontSize: "12px"
            },
            children: tickObject.value
          }
        ) })
      ] });
    }
  };
  const toggle = (id) => {
    const newFilter = filter.slice();
    if (newFilter.indexOf(id) > -1) {
      const index2 = newFilter.indexOf(id);
      newFilter.splice(index2, 1);
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
    return /* @__PURE__ */ jsx("g", { children: bars.map((bar, idx) => {
      const { width, height: height2, y, x, data } = bar;
      if (layout === "horizontal" && height2 <= LABEL_SKIP_HEIGHT2) {
        return;
      }
      if (layout === "vertical" && width <= LABEL_SKIP_WIDTH) {
        return;
      }
      const value = data.value ? intl.formatNumber(
        format.style === "percent" ? data.value / 100 : data.value,
        format
      ) : "";
      const valueLength = value.length;
      let yPos;
      let xPos;
      if (layout == "vertical" && height2 >= LABEL_SKIP_HEIGHT2 || layout == "horizontal" && width >= LABEL_SKIP_HEIGHT2) {
        if (layout == "vertical") {
          const padding = 6;
          yPos = y - padding;
          xPos = x + width / 2 - valueLength * 3.5;
        } else {
          const padding = 4;
          yPos = y + height2 / 2 + padding;
          xPos = x + width + 5;
        }
        return /* @__PURE__ */ jsx(
          "text",
          {
            y: yPos,
            x: xPos,
            style: { fill: ***REMOVED***() },
            children: `${value}`
          },
          idx
        );
      }
    }) });
  };
  const ***REMOVED*** = (props) => {
    const indexes = options.data.filter((d) => filter.indexOf(d[options.indexBy]) == -1).map((d) => d[options.indexBy]);
    const { bars } = props;
    return /* @__PURE__ */ jsx("g", { children: indexes.filter(
      (key) => bars.filter((b) => b.data.indexValue == key).length > 0
    ).map((key, idx) => {
      var _a2;
      const barsInGroup = bars.filter((b) => b.data.indexValue == key);
      let anchor = "right";
      let x = 0;
      let y = 0;
      if (layout == "horizontal") {
        if (groupMode === "stacked") {
          if (groupTotalFixedPosition) {
            x = props.innerWidth - 20;
          } else {
            x = barsInGroup.map((b) => b.width).reduce((a, b) => a + b);
            if (reverse) {
              x = props.innerWidth - x;
            }
          }
          y = props.yScale(key) + barsInGroup[0].height / 2;
        } else {
          if (groupTotalFixedPosition) {
            x = props.innerWidth;
          } else {
            x = barsInGroup.map((b) => b.width).reduce((a, b) => a > b ? a : b);
            if (reverse) {
              x = props.innerWidth - x;
            }
          }
          y = props.yScale(key) + barsInGroup.map((b) => b.height).reduce((a, b) => a + b) / 2;
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
              y = parseInt(String(***REMOVED***)) + barsInGroup.map((b) => b.height).reduce((a, b) => a + b) + 14;
            } else {
              y = props.innerHeight - parseInt(String(***REMOVED***)) - barsInGroup.map((b) => b.height).reduce((a, b) => a + b) - 5;
            }
          }
        } else {
          x = props.xScale(key) + barsInGroup.map((b) => b.width).reduce((a, b) => a + b) / 2;
          if (reverse) {
            y = props.innerHeight;
          }
          if (groupTotalFixedPosition) {
            y = y - parseInt(String(***REMOVED***));
          } else {
            if (barsInGroup.length % 2 == 1) {
              const index2 = Math.floor(barsInGroup.length / 2);
              y = barsInGroup[index2].height;
            } else {
              const index2 = barsInGroup.length / 2;
              y = Math.max(
                barsInGroup[index2].height,
                barsInGroup[index2 - 1].height
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
      let total = group.parent_variables ? group.parent_variables[***REMOVED***] : group[***REMOVED***];
      const sumOfVariablesToFilterOut = colorBy !== "index" ? (_a2 = filter == null ? void 0 : filter.map((item) => group[item])) == null ? void 0 : _a2.reduce((acc, curr) => acc + curr, 0) : 0;
      total -= sumOfVariablesToFilterOut;
      return /* @__PURE__ */ jsx("text", { y, x, style: { fill: ***REMOVED***() }, children: /* @__PURE__ */ jsxs("tspan", { textAnchor: anchor, children: [
        ***REMOVED*** ? ***REMOVED*** + " " : "",
        intl.formatNumber(
          ***REMOVED***.style === "percent" ? total / 100 : total,
          ***REMOVED***
        )
      ] }) }, idx);
    }) });
  };
  const margins = {
    top: newMarginTop,
    right: marginRight,
    bottom: ***REMOVED***,
    left: marginLeft
  };
  let overlayData;
  let overLayMax = 0;
  let overLayMin = 0;
  if (***REMOVED***) {
    overlayData = Papa.parse(***REMOVED***, {
      header: false,
      dynamicTyping: true
    });
    overLayMax = Math.max(...overlayData.data.map((d) => d[1]));
    overLayMin = Math.min(...overlayData.data.map((d) => d[1]));
  }
  const ***REMOVED*** = () => {
    const values2 = [];
    if (***REMOVED***) {
      ***REMOVED***.forEach((c) => {
        if (c.low) {
          values2.push(parseFloat(c.low));
        }
        if (c.high) {
          values2.push(parseFloat(c.high));
        }
      });
      if (options.data) {
        options.data.map((d) => {
          options.keys.forEach((k) => {
            if (d[k]) {
              values2.push(d[k]);
            }
          });
        });
      }
    }
    return values2;
  };
  const values = ***REMOVED***();
  const dataMax = Math.max(...values);
  const dataMin = Math.min(...values);
  const ***REMOVED*** = () => {
    if (groupMode === "stacked" && maxValue !== "fixed" || maxValue === "fixed" && fixedMaxValue === null || // @ts-ignore
    maxValue === "fixed" && fixedMaxValue === "") {
      return Math.max(
        Math.max(
          ...options.data.map((d) => options.keys.map((x) => d[x] ? d[x] : 0)).map(
            (l) => l.reduce((a, b) => {
              return Math.max(a + b, a + 0);
            })
          )
        ),
        overLayMax
      ) * 1.1;
    }
    return maxValue === "fixed" && fixedMaxValue !== null && // @ts-ignore
    fixedMaxValue !== "" ? fixedMaxValue : Math.max(overLayMax, dataMax) * 1.05;
  };
  const ***REMOVED*** = () => {
    const minVal = Math.min(overLayMin, dataMin);
    return maxValue === "fixed" && fixedMinValue !== null && // @ts-ignore
    fixedMinValue !== "" ? fixedMinValue : minVal > 0 ? minVal * 0.9 : minVal * 1.1;
  };
  const ***REMOVED*** = ***REMOVED***();
  const ***REMOVED*** = ***REMOVED***();
  const layers = ["grid", "axes", "bars"];
  if (***REMOVED***) {
    layers.push(***REMOVED***);
  }
  layers.push(***REMOVED***);
  layers.push(***REMOVED***);
  if (***REMOVED*** && overlays) {
    overlays.forEach((o, idx) => {
      if (showLine[idx] == true || showLine[idx] == void 0) {
        const { ***REMOVED***: ***REMOVED***, lineColor, tooltip: tooltip2 } = o;
        if (o.app == "csv") {
          const overlayData2 = Papa.parse(***REMOVED***, {
            header: false,
            dynamicTyping: true
          });
          if (overlayData2.data && overlayData2.data.filter((d) => d[1] !== null).length > 0) {
            overlayData2.data = overlayData2.data.filter((d) => d[1] !== null);
            const line2 = Line$1(
              overlayData2,
              lineColor,
              layout,
              groupMode,
              applyFilter(options.keys, true),
              tooltip2,
              o.title,
              ""
            );
            layers.push(line2);
          }
        } else {
          if (o.measure[0]) {
            const overlayData2 = {};
            const data = options.data.map((d) => [
              d[options.indexBy],
              d.variables[o.measure[0]]
            ]);
            const measure = options.metadata.measures ? options.metadata.measures.filter((m) => m.value == o.measure[0]) : [];
            overlayData2.data = data;
            const line2 = Line$1(
              overlayData2,
              lineColor,
              layout,
              groupMode,
              applyFilter(options.keys, true),
              tooltip2,
              o.title,
              measure.length > 0 ? measure[0].label : ""
            );
            layers.push(line2);
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
    return /* @__PURE__ */ jsx(Fragment, { children: showLegends && legendLabel && /* @__PURE__ */ jsx("div", { className: "legend item", children: /* @__PURE__ */ jsx("label", { className: "legend-title", children: legendLabel }) }) });
  };
  const hiddenLabels = [];
  if (isMobileCustomizationEnabled) {
    ticks = parseInt(***REMOVED***.***REMOVED***);
    const labels = new Map(Object.entries(((_a = ***REMOVED*** == null ? void 0 : ***REMOVED***.labels) == null ? void 0 : _a.xAxis) ?? {}));
    for (const [key, value] of labels) {
      if (!value) {
        hiddenLabels.push(key);
      }
    }
  }
  return /* @__PURE__ */ jsx("div", { style: { height }, children: options && options.data && options.data.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      ResponsiveBar,
      {
        colorBy: colors.colorBy,
        animate: true,
        enableLabel: ***REMOVED*** == POSITION_MIDDLE,
        ...options,
        maxValue: ***REMOVED***,
        minValue: ***REMOVED***,
        keys: applyFilter(options.keys, true),
        data: applyFilter(options.data, false),
        groupMode: groupMode ? groupMode : "grouped",
        margin: margins,
        innerPadding: ***REMOVED***,
        valueScale: {
          type: valueScale,
          clamp: maxValue === "fixed" && minMaxClamp
        },
        colors: (d) => {
          if (d && d.data[COLOR_VARIABLE]) {
            return d.data[COLOR_VARIABLE];
          }
          const color = ***REMOVED***.getColor(d.id, d.data);
          return color;
        },
        borderColor: "#000",
        reverse,
        axisTop: null,
        axisRight: showRightAxis ? {
          tickSize: layout == "horizontal" && showTickLine || layout === "vertical" ? 5 : 0,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: ticks,
          legend: legends && legends.right,
          ***REMOVED***: "middle",
          legendOffset: parseInt(String(offsetRight)),
          format: (value) => {
            if (layout == "vertical") {
              const ***REMOVED*** = ***REMOVED*** ? ***REMOVED*** : format;
              return intl.formatNumber(
                ***REMOVED***.style === "percent" ? value / 100 : value,
                {
                  ...***REMOVED***
                }
              );
            }
            return value;
          }
        } : null,
        axisBottom: isMobileCustomizationEnabled && (***REMOVED*** == null ? void 0 : ***REMOVED***.xAxisDisabled) === true ? null : layout == "horizontal" ? {
          legend: legends && legends.bottom,
          ***REMOVED***: "middle",
          legendOffset: parseInt(String(offsetBottom)),
          tickPadding: 5,
          tickRotation: 0,
          tickValues: parseInt(String(***REMOVED***)),
          format: (value) => {
            if (layout == "horizontal") {
              const ***REMOVED*** = ***REMOVED*** ? ***REMOVED*** : format;
              return intl.formatNumber(
                ***REMOVED***.style === "percent" ? value / 100 : value,
                {
                  ...***REMOVED***
                }
              );
            }
            return value;
          }
        } : {
          legend: legends && legends.bottom,
          ***REMOVED***: "middle",
          legendOffset: parseInt(String(offsetBottom)),
          renderTick: CustomTick
        },
        axisLeft: {
          tickSize: layout == "horizontal" && showTickLine || layout === "vertical" ? 5 : 0,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: ticks,
          legend: legends && legends.left,
          ***REMOVED***: "middle",
          legendOffset: parseInt(String(offsetY)),
          format: (value) => {
            if (layout == "vertical") {
              const ***REMOVED*** = ***REMOVED*** ? ***REMOVED*** : format;
              return intl.formatNumber(
                ***REMOVED***.style === "percent" ? value / 100 : value,
                {
                  ...***REMOVED***
                }
              );
            }
            return value;
          }
        },
        enableGridY,
        enableGridX,
        layout,
        ***REMOVED***: LABEL_SKIP_WIDTH,
        ***REMOVED***: LABEL_SKIP_HEIGHT2,
        padding: barPadding,
        ***REMOVED***: ***REMOVED***(),
        label: (l) => intl.formatNumber(
          format.style === "percent" ? (l.value ?? 0) / 100 : l.value ?? 0,
          format
        ),
        layers,
        onMouseEnter: (_data) => {
        },
        onMouseLeave: (_data) => {
        },
        tooltip: (d) => {
          if (***REMOVED*** && tooltip && tooltip.trim().length > 0) {
            return /* @__PURE__ */ jsx(
              Tooltip,
              {
                intl,
                format,
                d,
                tooltip,
                tooltipEnableMarkdown
              }
            );
          }
          return null;
        },
        theme: {
          tooltip: {
            basic: {
              whiteSpace: "pre",
              display: "flex",
              alignItems: "center"
            },
            container: {
              background: "transparent",
              boxShadow: ""
            },
            table: {},
            tableCell: { padding: "3px 5px" }
          }
        }
      }
    ),
    (***REMOVED*** === "top" || ***REMOVED*** === "bottom") && /* @__PURE__ */ jsx(
      "div",
      {
        className: `legends container has-standard-12-font-size ${***REMOVED***}`,
        children: /* @__PURE__ */ jsxs("div", { className: "legend-sections", children: [
          /* @__PURE__ */ jsx("div", { className: "title-section", children: legendTitle() }),
          /* @__PURE__ */ jsx(
            ***REMOVED***,
            {
              onWrapChange: (count) => {
                if (***REMOVED*** === "top") {
                  ***REMOVED***(marginTop + count / 2 * 40);
                  setWrapCount(count);
                } else {
                  ***REMOVED***(marginBottom + count / 2 * 25);
                  setWrapCount(count);
                }
              },
              className: `legends container has-standard-12-font-size items-section`,
              children: legendItems()
            }
          )
        ] })
      }
    ),
    (***REMOVED*** === "right" || ***REMOVED*** === "left") && /* @__PURE__ */ jsxs(
      "div",
      {
        className: `legends container has-standard-12-font-size  ${***REMOVED***}`,
        style: ***REMOVED*** === "right" ? rightLegendDynamicStyle : leftLegendDynamicStyle,
        children: [
          legendTitle(),
          legendItems()
        ]
      }
    )
  ] }) });
};
const Bar = injectIntl(Chart$2);
const ZERO_LINE_COLOR = "#66676d";
const DEFAULT_TICK_BG_COLOR = "#f0f0f1";
const isMobile$1 = getDeviceType() === "mobile";
const getTextWidth = (text, font) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};
const Chart$1 = ({
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
  var _a, _b, _c;
  const ***REMOVED*** = JSON.parse(***REMOVED***(***REMOVED***));
  const isMobileConfigEnabled = isMobile$1 && ((***REMOVED*** == null ? void 0 : ***REMOVED***.***REMOVED***) ?? false);
  const [bottomSpacing, ***REMOVED***] = useState(50);
  const [newMarginTop, ***REMOVED***] = useState(marginTop);
  const [wrapCount, setWrapCount] = useState(0);
  const [***REMOVED***, ***REMOVED***] = useState(marginBottom);
  const [filter, setFilter] = useState([]);
  const chartLegends = options.data.map((d) => ({
    id: d.id,
    label: d.id,
    color: ***REMOVED***.getColor(d.id, d)
  }));
  const legendItems = () => {
    if (reverseLegend) {
      chartLegends.reverse();
    }
    return /* @__PURE__ */ jsx(Fragment, { children: showLegends && chartLegends.map((legend, idx) => {
      return /* @__PURE__ */ jsxs("div", { className: "legend item", onClick: () => toggle(legend.id), children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "ignore",
            type: "checkbox",
            checked: filter.length === 0 || !filter.includes(legend.id),
            readOnly: true,
            style: {
              ***REMOVED***: ***REMOVED*** === true ? legend.color : "none",
              color: ***REMOVED***
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: ***REMOVED*** === true ? "checkmark-with-bg" : "checkmark",
            style: {
              ***REMOVED***: ***REMOVED*** === true ? legend.color : "transparent"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "label",
          {
            style: {
              ***REMOVED***: ***REMOVED*** === true ? legend.color : "transparent",
              color: ***REMOVED***
            },
            children: legend.label
          }
        )
      ] }, idx);
    }) });
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
    bottom: `-${bottomSpacing}px`
  };
  const leftLegendDynamicStyle = {
    bottom: `-${bottomSpacing}px`,
    gap: "0px",
    top: "0px"
  };
  const applyFilter = (values2) => {
    if (filter.length) {
      return values2.filter((v) => filter.indexOf(v.id) === -1);
    }
    return values2;
  };
  const toggle = (id) => {
    const newFilter = filter.slice();
    if (newFilter.indexOf(id) > -1) {
      const index2 = newFilter.indexOf(id);
      newFilter.splice(index2, 1);
    } else {
      newFilter.push(id);
    }
    setFilter(newFilter);
  };
  const CustomTick = (tick) => {
    const tickObject = Object.assign({}, tick);
    const theme = useTheme();
    if (isMobileConfigEnabled && hiddenLabels.includes(String(tickObject.value))) {
      tickObject.value = "";
    }
    getTextWidth(tickObject.value, "12px Roboto") + 15;
    if (tickRotation > 0 && tickRotation < 180) {
      return /* @__PURE__ */ jsxs("g", { transform: `translate(${tick.x},${tick.y + 30})`, children: [
        showTickLine && /* @__PURE__ */ jsx(
          "line",
          {
            stroke: ***REMOVED*** ? tickColor : DEFAULT_TICK_BG_COLOR,
            strokeWidth: 1.5,
            y1: -32,
            y2: -12
          }
        ),
        /* @__PURE__ */ jsx("g", { transform: `translate(0, ${tick.y + offsetText})`, children: /* @__PURE__ */ jsx(
          "text",
          {
            transform: `rotate(${tickRotation})`,
            textAnchor: "start",
            ***REMOVED***: "middle",
            style: {
              ...theme.axis.ticks.text,
              fill: xLabelColor,
              fontSize: "12px"
            },
            children: tickObject.value
          }
        ) })
      ] });
    } else if (tickRotation > 180 && tickRotation < 360) {
      return /* @__PURE__ */ jsxs("g", { transform: `translate(${tick.x},${tick.y + 30})`, children: [
        showTickLine && /* @__PURE__ */ jsx(
          "line",
          {
            stroke: ***REMOVED*** ? tickColor : DEFAULT_TICK_BG_COLOR,
            strokeWidth: 1.5,
            y1: -32,
            y2: -12
          }
        ),
        /* @__PURE__ */ jsx("g", { transform: `translate(0, ${tick.y + offsetText})`, children: /* @__PURE__ */ jsx(
          "text",
          {
            transform: `rotate(${tickRotation})`,
            textAnchor: "end",
            ***REMOVED***: "middle",
            style: {
              ...theme.axis.ticks.text,
              fill: xLabelColor,
              fontSize: "12px"
            },
            children: tickObject.value
          }
        ) })
      ] });
    } else {
      return /* @__PURE__ */ jsxs("g", { transform: `translate(${tick.x},${tick.y + 30})`, children: [
        showTickLine && /* @__PURE__ */ jsx(
          "line",
          {
            stroke: ***REMOVED*** ? tickColor : DEFAULT_TICK_BG_COLOR,
            strokeWidth: 1.5,
            y1: -32,
            y2: -12
          }
        ),
        /* @__PURE__ */ jsx("g", { transform: `translate(0, ${tick.y + offsetText})`, children: /* @__PURE__ */ jsx(
          "text",
          {
            transform: `rotate(${tickRotation})`,
            textAnchor: "middle",
            ***REMOVED***: "middle",
            style: {
              ...theme.axis.ticks.text,
              fill: xLabelColor,
              fontSize: "12px"
            },
            children: tickObject.value
          }
        ) })
      ] });
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
    const lower = ***REMOVED*** == "CUSTOM_BETWEEN_TWO_LINES" && ***REMOVED*** ? ***REMOVED*** : sortedData[0].measure;
    const upper = ***REMOVED*** == "CUSTOM_BETWEEN_TWO_LINES" && ***REMOVED*** ? ***REMOVED*** : sortedData[sortedData.length - 1].measure;
    const areaGenerator = area().x((d) => xScale(d.data.x)).y0((d) => yScale(d.data.variables[lower])).y1((d) => yScale(d.data.variables[upper]));
    return /* @__PURE__ */ jsx(Fragment, { children: series && series[0] && /* @__PURE__ */ jsx(
      "path",
      {
        d: areaGenerator(series[0].data),
        fill: color,
        fillOpacity: 0.4
      }
    ) });
  };
  const drawLine = ({ series, xScale, yScale, innerHeight, innerWidth }) => {
    const points = [0, innerWidth];
    const lineGenerator = line().x((xPoint, index2) => {
      if (index2 === 0) {
        return -10;
      } else {
        return xPoint;
      }
    }).y((xPoint) => yScale(0));
    return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsx(
      "path",
      {
        d: lineGenerator(points),
        fill: "none",
        stroke: ZERO_LINE_COLOR,
        style: { pointerEvents: "none", ***REMOVED***: "4 4" }
      }
    ) });
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
          return flattenedData.filter((f) => f.x == x).map((ff) => ff.y).reduce((a, b) => {
            return Math.max(a + b, a + 0);
          });
        })
      );
      min = Math.min(
        ...xValues.map((x) => {
          return flattenedData.filter((f) => f.x == x).map((ff) => ff.y).reduce((a, b) => {
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
    max = max < 0 ? max * 0.9 : max * 1.1;
    min = min > 0 ? min * 0.9 : min * 1.1;
    return { min, max };
  };
  let min = "auto";
  let max = "auto";
  const minMax = ***REMOVED***();
  if (maxValue == "fixed") {
    min = fixedMinValue != null && fixedMinValue != "" ? fixedMinValue : minMax.min;
    max = fixedMaxValue != null && fixedMaxValue != "" ? fixedMaxValue : minMax.max;
  } else {
    min = minMax.min;
    max = minMax.max;
  }
  const legendTitle = () => {
    return /* @__PURE__ */ jsx(Fragment, { children: showLegends && legendLabel && /* @__PURE__ */ jsx("div", { className: "legend item", children: /* @__PURE__ */ jsx("label", { className: "legend-title", children: legendLabel }) }) });
  };
  const margins = {
    top: newMarginTop,
    right: marginRight,
    bottom: ***REMOVED***,
    left: marginLeft
  };
  let ticks = parseInt(***REMOVED***);
  const hasData = options.data && ((_b = (_a = options.data) == null ? void 0 : _a.filter((d) => {
    var _a2;
    return ((_a2 = d == null ? void 0 : d.data) == null ? void 0 : _a2.length) > 0;
  })) == null ? void 0 : _b.length);
  const hiddenLabels = [];
  if (isMobileConfigEnabled) {
    ticks = parseInt(***REMOVED***.***REMOVED***);
    const labels = new Map(Object.entries(((_c = ***REMOVED*** == null ? void 0 : ***REMOVED***.labels) == null ? void 0 : _c.xAxis) ?? {}));
    for (const [key, value] of labels) {
      if (!value) {
        hiddenLabels.push(key);
      }
    }
  }
  if (options && options.data && hasData > 0) {
    return /* @__PURE__ */ jsxs("div", { style: { height }, children: [
      /* @__PURE__ */ jsx(
        ***REMOVED***,
        {
          data: applyFilter(options.data),
          margin: margins,
          xScale: { type: "point" },
          yScale: {
            type: "linear",
            min,
            max,
            stacked: groupMode == "stacked",
            reverse: false,
            clamp: minMaxClamp
          },
          layers,
          axisTop: null,
          axisRight: showRightAxis ? {
            tickSize: 5,
            tickValues: ticks,
            tickPadding: 5,
            tickRotation: 0,
            legend: legends.right,
            ***REMOVED***: "middle",
            legendOffset: parseInt(offsetRight),
            format: (value) => {
              const ***REMOVED*** = ***REMOVED*** ? ***REMOVED*** : format;
              return intl.formatNumber(
                ***REMOVED***.style === "percent" ? value / 100 : value,
                {
                  ...***REMOVED***
                }
              );
            }
          } : null,
          enableGridY,
          enableGridX,
          lineWidth: 3,
          colors: (d) => {
            return ***REMOVED***.getColor(d.id, d);
          },
          axisBottom: isMobileConfigEnabled && (***REMOVED*** == null ? void 0 : ***REMOVED***.xAxisDisabled) === true ? null : {
            renderTick: CustomTick,
            legend: legends.bottom,
            ***REMOVED***: "middle",
            legendOffset: parseInt(offsetBottom)
          },
          axisLeft: {
            tickSize: 5,
            tickValues: ticks,
            tickPadding: 5,
            tickRotation: 0,
            legend: legends.left,
            ***REMOVED***: "middle",
            legendOffset: parseInt(offsetY),
            format: (value) => {
              const ***REMOVED*** = ***REMOVED*** ? ***REMOVED*** : format;
              return intl.formatNumber(
                ***REMOVED***.style === "percent" ? value / 100 : value,
                {
                  ...***REMOVED***
                }
              );
            }
          },
          tooltip: (d) => {
            if (***REMOVED*** && tooltip && tooltip.trim().length > 0) {
              return /* @__PURE__ */ jsx(
                Tooltip,
                {
                  intl,
                  format,
                  d,
                  tooltip,
                  tooltipEnableMarkdown
                }
              );
            }
            return null;
          },
          pointSize: 10,
          ***REMOVED***: 2,
          ***REMOVED***: { from: "serieColor" },
          ***REMOVED***: -12,
          useMesh: true
        },
        /* @__PURE__ */ new Date()
      ),
      (***REMOVED*** === "top" || ***REMOVED*** === "bottom") && /* @__PURE__ */ jsx(
        "div",
        {
          className: `legends container has-standard-12-font-size ${***REMOVED***}`,
          children: /* @__PURE__ */ jsxs("div", { className: "legend-sections", children: [
            /* @__PURE__ */ jsx("div", { className: "title-section", children: legendTitle() }),
            /* @__PURE__ */ jsx(
              ***REMOVED***,
              {
                onWrapChange: (count) => {
                  if (***REMOVED*** === "top") {
                    ***REMOVED***(marginTop + count / 2 * 40);
                    setWrapCount(count);
                  } else {
                    ***REMOVED***(marginBottom + count / 2 * 25);
                    setWrapCount(count);
                  }
                },
                className: `legends container has-standard-12-font-size items-section`,
                children: legendItems()
              }
            )
          ] })
        }
      ),
      (***REMOVED*** === "right" || ***REMOVED*** === "left") && /* @__PURE__ */ jsxs(
        "div",
        {
          className: `legends container has-standard-12-font-size  ${***REMOVED***}`,
          style: ***REMOVED*** === "right" ? rightLegendDynamicStyle : leftLegendDynamicStyle,
          children: [
            legendTitle(),
            legendItems()
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx("div", {});
};
const Line = injectIntl(Chart$1);
const measuresMap = (data) => {
  const { metadata } = data ? data : {};
  const metadataMap = {};
  if (metadata) {
    metadata.measures.forEach((f) => {
      metadataMap[f.value] = f;
    });
  }
  return metadataMap;
};
const typesMap = (data) => {
  const { metadata } = data ? data : {};
  const metadataMap = {};
  if (metadata) {
    metadata.types.forEach((f) => {
      metadataMap[f.dimension] = {
        dimension: f.dimension,
        category: f.category,
        items: f.items
      };
    });
  }
  return metadataMap;
};
const ***REMOVED*** = (obj, locale) => {
  if (obj) {
    if (obj.labels && obj.labels[locale.toUpperCase()]) {
      return obj.labels[locale.toUpperCase()];
    } else {
      return obj.label ? obj.label : obj.value;
    }
  }
  return null;
};
const alphaSort$1 = (reverse, locale, a, b) => {
  return new Intl.Collator(locale, {
    caseFirst: "upper",
    numeric: true,
    sensitivity: "variant"
  }).compare(reverse ? b : a, reverse ? a : b);
};
const numericSort$1 = (reverse, a, b) => {
  return reverse ? b - a : a - b;
};
const getOptionsNoDimension$1 = (props) => {
  const { data, measures, swap, dimensions, locale, customLabels } = props;
  let options = {};
  const ***REMOVED*** = dimensions.filter((f) => f != "");
  const ***REMOVED*** = /* @__PURE__ */ new Set();
  if (***REMOVED***.length == 0 && data) {
    const mMap = measuresMap(data);
    const categories = /* @__PURE__ */ new Set();
    const keys = /* @__PURE__ */ new Set();
    let series = [];
    let indexBy;
    if (data.metadata && data.metadata.measures) {
      const ***REMOVED*** = data.metadata.measures.filter((m) => measures.includes(m.value)).sort((aMeasure, bMeasure) => {
        if (aMeasure.position != null && bMeasure.position != null && aMeasure.position != bMeasure.position) {
          return aMeasure.position - bMeasure.position;
        }
        return 0;
      });
      series = [];
      indexBy = "measure";
      categories.add("measure");
      const variables = {};
      Object.keys(data).forEach((k) => {
        variables[k] = data[k];
      });
      ***REMOVED***.forEach((m) => {
        const row = {};
        const label = customLabels[m.value] || ***REMOVED***(mMap[m.value], locale);
        row.type = "measure";
        row["***REMOVED***"] = m.value;
        row["measure"] = label;
        row[label] = data[m.value];
        row.variables = variables;
        series.push(row);
        keys.add(label);
        ***REMOVED***.add(mMap[m.value]);
      });
      options = {
        categories,
        indexBy,
        keys: Array.from(keys),
        ***REMOVED***,
        data: series
      };
    }
  }
  return options;
};
const ***REMOVED***$1 = (props) => {
  const { data, measures, dimensions, overallLabel } = props;
  if (dimensions.length == 1 && data.children) {
    const overallAdded = data.children.filter((c) => c.value == overallLabel).length > 0;
    if (!overallAdded) {
      const overallData = {};
      overallData.type = dimensions[0];
      overallData.value = overallLabel;
      overallData.label = overallLabel;
      Object.keys(data).forEach((k) => {
        if (!["children", "metadata", "type", "value"].includes(k)) {
          overallData[k] = data[k];
        }
      });
      data.children = [overallData, ...data.children];
    }
  } else if (dimensions.length == 2 && data.children) {
    data.children.forEach((d) => {
      const overallAdded = d.children.filter((c) => c.value == overallLabel).length > 0;
      if (!overallAdded) {
        const overallData = {};
        overallData.type = dimensions[1];
        overallData.value = overallLabel;
        overallData.label = overallLabel;
        Object.keys(d).forEach((k) => {
          if (!["children", "metadata", "type", "value"].includes(k)) {
            overallData[k] = d[k];
          }
        });
        d.children = [overallData, ...d.children];
      }
    });
  }
  return data;
};
const ***REMOVED***$1 = (props) => {
  let options = {};
  const {
    data,
    measures,
    swap,
    dimensions,
    ***REMOVED***,
    locale,
    customLabels,
    colorBy,
    hiddenBars
  } = props;
  const ***REMOVED*** = dimensions.filter((f) => f != "");
  const ***REMOVED*** = data.metadata.measures.filter((m) => measures.includes(m.value)).sort((aMeasure, bMeasure) => {
    if (aMeasure.position != null && bMeasure.position != null && aMeasure.position != bMeasure.position) {
      return aMeasure.position - bMeasure.position;
    }
    return 0;
  });
  if (***REMOVED*** && measures.length == 1) {
    ***REMOVED***$1(props);
  }
  if (***REMOVED***.length == 0 && data) {
    options = getOptionsNoDimension$1(props);
  } else if (data && data.children && ***REMOVED***.length > 0) {
    const mMap = measuresMap(data);
    const tMap = typesMap(data);
    const ***REMOVED*** = /* @__PURE__ */ new Set();
    const ***REMOVED*** = /* @__PURE__ */ new Set();
    const keys = /* @__PURE__ */ new Set();
    const series = [];
    let indexBy;
    if (swap && ***REMOVED***.length == 1 && measures.length > 0) {
      indexBy = "measure";
      ***REMOVED***.forEach((measure) => {
        const row = {};
        row["measure"] = customLabels[measure.value] || ***REMOVED***(mMap[measure.value], locale);
        ***REMOVED***.add(mMap[measure.value]);
        data.children.forEach((d) => {
          const value = ***REMOVED***(
            tMap[d.type].items.filter((i) => i.value === d.value)[0],
            locale
          ) || d.value;
          const variables = {};
          Object.keys(d).forEach((k) => {
            variables[k] = d[k];
          });
          variables[d.type] = d.value.toString();
          row["variables"] = variables;
          ***REMOVED***.add(tMap[d.type]);
          row[value] = d[measure.value];
          keys.add(value);
        });
        series.push({ ...row });
      });
    } else {
      indexBy = data.children[0].type;
      data.children.forEach((d) => {
        const variables = {};
        const row = {};
        row[d.type] = ***REMOVED***(
          tMap[d.type] && tMap[d.type].items ? tMap[d.type].items.filter((i) => i.value === d.value)[0] : d.value,
          locale
        ) || d.value;
        Object.keys(d).forEach((k) => {
          variables[k] = d[k];
        });
        ***REMOVED***.add(tMap[d.type]);
        variables[d.type] = d.value.toString();
        ***REMOVED***.map((m) => {
          const label = customLabels[m.value] || ***REMOVED***(mMap[m.value], locale);
          row[label] = d[m.value];
          ***REMOVED***.add(mMap[m.value]);
          keys.add(label);
        });
        series.push({ ...row, variables, parent_variables: variables });
      });
    }
    const allKeys = Array.from(keys);
    let filtered = hiddenBars && series ? series.filter((s) => hiddenBars.indexOf(s[indexBy]) == -1) : series;
    if (props.sort == "***REMOVED***") {
      filtered = filtered.sort(
        (a, b) => alphaSort$1(props.sortreverse, locale, a[indexBy], b[indexBy])
      );
    }
    if (props.sort == "values") {
      filtered = filtered.sort((a, b) => {
        const va = Math.max(...allKeys.map((k) => a[k]));
        const vb = Math.max(...allKeys.map((k) => b[k]));
        return numericSort$1(props.sortreverse, va, vb);
      });
    }
    options = {
      metadata: data.metadata,
      indexBy,
      ***REMOVED***,
      ***REMOVED***,
      keys: allKeys,
      data: filtered
    };
  }
  return React__default.Children.map(
    props.children,
    (child) => React__default.cloneElement(child, { options })
  );
};
const ***REMOVED***$1 = (props) => {
  var _a, _b;
  const {
    data,
    measures,
    ***REMOVED***,
    dimensions,
    hiddenBars,
    colorBy,
    locale,
    customLabels
  } = props;
  const ***REMOVED*** = dimensions.filter((f) => f != "");
  let options = {};
  if (***REMOVED***) {
    ***REMOVED***$1(props);
  }
  if (***REMOVED***.length == 0 && data) {
    options = getOptionsNoDimension$1(props);
  } else if (data && data.children && ***REMOVED***.length > 0) {
    measuresMap(data);
    const tMap = typesMap(data);
    const field = measures[0];
    const ***REMOVED*** = /* @__PURE__ */ new Set();
    const keys = /* @__PURE__ */ new Set();
    const series = [];
    const vals = [];
    const indexBy = data.children[0].type;
    let total = 0;
    let variables;
    let parentValue;
    data.children.forEach((d) => {
      const row = { variables: {} };
      parentValue = ***REMOVED***(
        tMap[d.type] && tMap[d.type].items ? tMap[d.type].items.filter((i) => i.value === d.value)[0] : d.value,
        locale
      ) || d.value;
      row[d.type] = parentValue;
      row[parentValue] = d[field];
      variables = new Object();
      variables[d.type] = parentValue;
      row.parent_variables = variables;
      Object.keys(d).forEach((k) => {
        variables[k] = d[k];
      });
      ***REMOVED***.add(tMap[d.type]);
      if (!d.children) {
        keys.add(parentValue);
      }
      if (d.children) {
        d.children.forEach((d1) => {
          variables = new Object();
          ***REMOVED***.add(tMap[d1.type]);
          const value = ***REMOVED***(
            tMap[d1.type] && tMap[d1.type].items ? tMap[d1.type].items.filter((i) => i.value === d1.value)[0] : d1.value,
            locale
          ) || d1.value;
          variables[d.type] = parentValue;
          variables[d1.type] = value;
          Object.keys(d1).forEach((k) => {
            variables[k] = d1[k];
          });
          row.variables[value] = variables;
          keys.add(value);
          total += d1[field];
          vals.push(d1[field]);
          row[value] = d1[field];
        });
      } else {
        const variables2 = new Object();
        variables2[d.type] = parentValue;
        ***REMOVED***.add(tMap[d.type]);
        Object.keys(data).forEach((k) => {
          variables2[k] = d[k];
        });
        row.variables = variables2;
      }
      series.push(row);
    });
    const upperLocale = locale.toUpperCase();
    const filtered = colorBy == "id" ? series : series.filter((s) => hiddenBars.indexOf(s[indexBy]) == -1);
    const allKeys = Array.from(keys);
    if (props.sort == "***REMOVED***") {
      filtered.sort(
        (a, b) => alphaSort$1(props.sortreverse, locale, a[indexBy], b[indexBy])
      );
    } else if (props.sort == "values") {
      filtered.sort((a, b) => {
        var _a2, _b2, _c;
        if (props.***REMOVED*** == "_total") {
          const va = Math.max(...allKeys.map((k) => a[k]));
          const vb = Math.max(...allKeys.map((k) => b[k]));
          return numericSort$1(props.sortreverse, va, vb);
        } else {
          if (((_b2 = (_a2 = data == null ? void 0 : data.metadata) == null ? void 0 : _a2.types) == null ? void 0 : _b2.length) > 1) {
            const translatedSor2Dimension = (_c = data == null ? void 0 : data.metadata) == null ? void 0 : _c.types[1].items.filter((c) => {
              if (props.***REMOVED*** === c.value || c.labels && c.labels[upperLocale] === props.***REMOVED***) {
                return true;
              }
              return false;
            });
            if (translatedSor2Dimension.length > 0) {
              const sortVal = translatedSor2Dimension[0].labels[upperLocale] ? translatedSor2Dimension[0].labels[upperLocale] : translatedSor2Dimension[0].value;
              const va = Math.max(
                ...allKeys.filter((k) => k === sortVal).map((k) => a[k])
              );
              const vb = Math.max(
                ...allKeys.filter((k) => k === sortVal).map((k) => b[k])
              );
              return numericSort$1(props.sortreverse, va ? va : 0, vb ? vb : 0);
            }
          }
        }
      });
    }
    const arrayKeys = [...keys];
    if (((_b = (_a = data == null ? void 0 : data.metadata) == null ? void 0 : _a.types) == null ? void 0 : _b.length) > 1) {
      arrayKeys.sort((k1, k2) => {
        var _a2, _b2;
        const item1 = data.metadata.types[1].items.filter(
          (f) => f.value == k1 || f.labels && f.labels[upperLocale] == k1
        );
        const item2 = data.metadata.types[1].items.filter(
          (f) => f.value == k2 || f.labels && f.labels[upperLocale] == k2
        );
        const pos1 = (_a2 = item1[0]) == null ? void 0 : _a2.position;
        const pos2 = (_b2 = item2[0]) == null ? void 0 : _b2.position;
        return pos1 - pos2;
      });
    }
    options = {
      metadata: data.metadata,
      ***REMOVED***,
      indexBy,
      keys: colorBy == "index" ? arrayKeys : arrayKeys.filter((k) => hiddenBars.indexOf(k) == -1),
      data: filtered
    };
  }
  return /* @__PURE__ */ jsx(Fragment, { children: React__default.Children.map(
    props.children,
    (child) => React__default.cloneElement(child, { options })
  ) });
};
const BarData$2 = (props) => {
  const { data, measures, dimensions } = props;
  const copyData = JSON.parse(JSON.stringify(data));
  if (dimensions.length === 1) {
    return /* @__PURE__ */ jsx(***REMOVED***$1, { ...props, data: copyData });
  } else {
    return /* @__PURE__ */ jsx(***REMOVED***$1, { ...props, data: copyData });
  }
};
const PieData$1 = (props) => {
  const { children, data, measures, locale, customLabels } = props;
  const ***REMOVED*** = /* @__PURE__ */ new Set();
  const ***REMOVED*** = /* @__PURE__ */ new Set();
  const mMap = measuresMap(data);
  if (data && data.children) {
    const values = [];
    const tMap = typesMap(data);
    const keys = [];
    data.children.forEach((d) => {
      if (d.children) {
        d.children.forEach((d1) => {
          const row = new Object();
          const variables = new Object();
          variables[d.type] = ***REMOVED***(
            tMap[d.type].items.filter((i) => i.value === d.value)[0],
            locale
          ) || d.value;
          variables[d1.type] = ***REMOVED***(
            tMap[d1.type].items.filter((i) => i.value === d1.value)[0],
            locale
          ) || d1.value;
          Object.keys(d1).forEach((k) => {
            variables[k] = d1[k];
          });
          row.id = ***REMOVED***(
            tMap[d.type].items.filter((i) => i.value === d.value)[0],
            locale
          ) + " - " + ***REMOVED***(
            tMap[d1.type].items.filter((i) => i.value === d1.value)[0],
            locale
          );
          keys.push(d.value + " - " + d1.value);
          row.value = d1[measures[0]];
          row.label = ***REMOVED***(
            tMap[d.type].items.filter((i) => i.value === d.value)[0],
            locale
          ) + " - " + ***REMOVED***(
            tMap[d1.type].items.filter((i) => i.value === d1.value)[0],
            locale
          );
          row.variables = variables;
          values.push(row);
        });
      } else {
        const category = tMap[d.type].items.filter(
          (i) => i.value === d.value
        )[0];
        const row = new Object();
        const variables = new Object();
        variables[d.type] = ***REMOVED***(category, locale) || d.value;
        Object.keys(data).forEach((k) => {
          variables[k] = d[k];
        });
        ***REMOVED***.add(tMap[d.type]);
        row.id = ***REMOVED***(category, locale) || d.value;
        row.label = ***REMOVED***(category, locale) || d.value;
        row.position = category.position || 0;
        row.value = d[measures[0]];
        row.variables = variables;
        values.push(row);
      }
    });
    const options = {
      indexBy: "id",
      keys: [],
      ***REMOVED***,
      ***REMOVED***,
      data: values.sort((d1, d2) => d2.value - d1.value),
      metadata: data.metadata
    };
    return React__default.Children.map(
      children,
      (child) => React__default.cloneElement(child, { options })
    );
  } else {
    const ***REMOVED*** = data.metadata.measures.filter(
      (m) => measures.includes(m.value)
    );
    const values = [];
    const variables = {};
    Object.keys(data).forEach((k) => {
      variables[k] = data[k];
    });
    ***REMOVED***.forEach((m) => {
      const row = {};
      row.type = "measure";
      row["***REMOVED***"] = m.value;
      row["id"] = customLabels[m.value] || ***REMOVED***(mMap[m.value], locale);
      row["position"] = m.position;
      row["label"] = customLabels[m.value] || ***REMOVED***(mMap[m.value], locale);
      row["value"] = data[m.value];
      row.variables = variables;
      values.push(row);
    });
    const options = {
      indexBy: "id",
      keys: [],
      ***REMOVED***,
      ***REMOVED***,
      data: values.sort((d1, d2) => d2.value - d1.value),
      metadata: data.metadata
    };
    return React__default.Children.map(
      children,
      (child) => React__default.cloneElement(child, { options })
    );
  }
};
const alphaSort = (reverse, locale, a, b) => {
  return new Intl.Collator(locale, {
    caseFirst: "upper",
    numeric: true,
    sensitivity: "variant"
  }).compare(reverse ? b : a, reverse ? a : b);
};
const numericSort = (reverse, a, b) => {
  return reverse ? b - a : a - b;
};
const getOptionsNoDimension = (props) => {
  const { data, measures, swap, dimensions, locale, customLabels } = props;
  let options = {};
  const ***REMOVED*** = dimensions.filter((f) => f != "");
  const ***REMOVED*** = /* @__PURE__ */ new Set();
  if (***REMOVED***.length == 0 && data) {
    const mMap = measuresMap(data);
    const categories = /* @__PURE__ */ new Set();
    const keys = /* @__PURE__ */ new Set();
    let series = [];
    let indexBy;
    if (data.metadata && data.metadata.measures) {
      const ***REMOVED*** = data.metadata.measures.filter((m) => measures.includes(m.value)).sort((aMeasure, bMeasure) => {
        if (aMeasure.position != null && bMeasure.position != null && aMeasure.position != bMeasure.position) {
          return aMeasure.position - bMeasure.position;
        }
        return 0;
      });
      series = [];
      indexBy = "measure";
      categories.add("measure");
      const variables = {};
      Object.keys(data).forEach((k) => {
        variables[k] = data[k];
      });
      ***REMOVED***.forEach((m) => {
        const row = {};
        const label = customLabels[m.value] || ***REMOVED***(mMap[m.value], locale);
        row.type = "measure";
        row["***REMOVED***"] = m.value;
        row["measure"] = label;
        row[label] = data[m.value];
        row.variables = variables;
        series.push(row);
        keys.add(label);
        ***REMOVED***.add(mMap[m.value]);
      });
      options = {
        categories,
        indexBy,
        keys: Array.from(keys),
        ***REMOVED***,
        data: series
      };
    }
  }
  return options;
};
const ***REMOVED*** = (props) => {
  const { data, measures, dimensions, overallLabel } = props;
  if (dimensions.length == 1 && data.children) {
    const overallAdded = data.children.filter((c) => c.value == overallLabel).length > 0;
    if (!overallAdded) {
      const overallData = {};
      overallData.type = dimensions[0];
      overallData.value = overallLabel;
      overallData.label = overallLabel;
      Object.keys(data).forEach((k) => {
        if (!["children", "metadata", "type", "value"].includes(k)) {
          overallData[k] = data[k];
        }
      });
      data.children = [overallData, ...data.children];
    }
  } else if (dimensions.length == 2 && data.children) {
    data.children.forEach((d) => {
      const overallAdded = d.children.filter((c) => c.value == overallLabel).length > 0;
      if (!overallAdded) {
        const overallData = {};
        overallData.type = dimensions[1];
        overallData.value = overallLabel;
        overallData.label = overallLabel;
        Object.keys(d).forEach((k) => {
          if (!["children", "metadata", "type", "value"].includes(k)) {
            overallData[k] = d[k];
          }
        });
        d.children = [overallData, ...d.children];
      }
    });
  }
  return data;
};
const ***REMOVED*** = (props) => {
  let options = {};
  const {
    data,
    measures,
    swap,
    dimensions,
    ***REMOVED***,
    locale,
    customLabels,
    colorBy,
    hiddenBars
  } = props;
  const ***REMOVED*** = dimensions.filter((f) => f != "");
  const ***REMOVED*** = data.metadata.measures.filter((m) => measures.includes(m.value)).sort((aMeasure, bMeasure) => {
    if (aMeasure.position != null && bMeasure.position != null && aMeasure.position != bMeasure.position) {
      return aMeasure.position - bMeasure.position;
    }
    return 0;
  });
  if (***REMOVED*** && measures.length == 1) {
    ***REMOVED***(props);
  }
  if (***REMOVED***.length == 0 && data) {
    options = getOptionsNoDimension(props);
  } else if (data && data.children && ***REMOVED***.length > 0) {
    const mMap = measuresMap(data);
    const tMap = typesMap(data);
    const categories = /* @__PURE__ */ new Set();
    const ***REMOVED*** = /* @__PURE__ */ new Set();
    const ***REMOVED*** = /* @__PURE__ */ new Set();
    const keys = /* @__PURE__ */ new Set();
    const series = [];
    let indexBy;
    if (swap && ***REMOVED***.length == 1 && measures.length > 0) {
      indexBy = "measure";
      ***REMOVED***.forEach((measure) => {
        const row = {};
        row["measure"] = customLabels[measure.value] || ***REMOVED***(mMap[measure.value], locale);
        ***REMOVED***.add(mMap[measure.value]);
        data.children.forEach((d) => {
          const value = ***REMOVED***(
            tMap[d.type].items.filter((i) => i.value === d.value)[0],
            locale
          ) || d.value;
          const variables = {};
          Object.keys(d).forEach((k) => {
            variables[k] = d[k];
          });
          variables[d.type] = d.value.toString();
          row["variables"] = variables;
          ***REMOVED***.add(tMap[d.type]);
          row[value] = d[measure.value];
          keys.add(value);
        });
        series.push({ ...row });
      });
    } else {
      indexBy = data.children[0].type;
      Object.keys(data).filter((k) => measures.indexOf(k) > -1).forEach((k) => {
        var _a;
        const variables = {};
        const row = {};
        categories.add(customLabels[k] || ((_a = mMap[k]) == null ? void 0 : _a.label));
        ***REMOVED***.add(mMap[k]);
        row["id"] = customLabels[k] || ***REMOVED***(mMap[k], locale);
        row["label"] = customLabels[k] || ***REMOVED***(mMap[k], locale);
        row["position"] = mMap && mMap[k] && mMap[k].position ? mMap[k].position : 0;
        row["data"] = data.children.map((d) => {
          const value = ***REMOVED***(
            tMap[d.type].items.filter((i) => i.value === d.value)[0],
            locale
          ) || d.value;
          const variables2 = {};
          Object.keys(d).forEach((k2) => {
            variables2[k2] = d[k2];
          });
          variables2["value"] = d[k];
          variables2[d.type] = d.value.toString();
          ***REMOVED***.add(tMap[d.type]);
          keys.add(value);
          return {
            x: value,
            y: d[k],
            variables: variables2
          };
        });
        series.push({ ...row, variables, parent_variables: variables });
      });
    }
    const allKeys = Array.from(keys);
    let filtered = hiddenBars && series ? series.filter((s) => hiddenBars.indexOf(s[indexBy]) == -1) : series;
    if (props.sort == "***REMOVED***") {
      filtered = filtered.sort(
        (a, b) => alphaSort(props.sortreverse, locale, a[indexBy], b[indexBy])
      );
    }
    if (props.sort == "values") {
      filtered = filtered.sort((a, b) => {
        const va = Math.max(...allKeys.map((k) => a[k]));
        const vb = Math.max(...allKeys.map((k) => b[k]));
        return numericSort(props.sortreverse, va, vb);
      });
    }
    options = {
      metadata: data.metadata,
      indexBy,
      categories,
      ***REMOVED***,
      ***REMOVED***,
      keys: allKeys,
      data: filtered
    };
  }
  return React__default.Children.map(
    props.children,
    (child) => React__default.cloneElement(child, { options })
  );
};
const ***REMOVED*** = (props) => {
  var _a, _b;
  const {
    data,
    measures,
    ***REMOVED***,
    dimensions,
    hiddenBars,
    colorBy,
    locale,
    customLabels
  } = props;
  const ***REMOVED*** = dimensions.filter((f) => f != "");
  let options = {};
  if (***REMOVED***) {
    ***REMOVED***(props);
  }
  if (***REMOVED***.length == 0 && data) {
    options = getOptionsNoDimension(props);
  } else if (data && data.children && ***REMOVED***.length > 0) {
    measuresMap(data);
    const tMap = typesMap(data);
    const field = measures[0];
    const ***REMOVED*** = /* @__PURE__ */ new Set();
    const keys = /* @__PURE__ */ new Set();
    const series = [];
    const vals = [];
    const indexBy = data.children[0].type;
    let total = 0;
    let variables;
    let parentValue;
    data.children.forEach((d) => {
      const row = { variables: {} };
      parentValue = ***REMOVED***(
        tMap[d.type] && tMap[d.type].items ? tMap[d.type].items.filter((i) => i.value === d.value)[0] : d.value,
        locale
      ) || d.value;
      row[d.type] = parentValue;
      row[parentValue] = d[field];
      variables = new Object();
      variables[d.type] = parentValue;
      row.parent_variables = variables;
      Object.keys(d).forEach((k) => {
        variables[k] = d[k];
      });
      ***REMOVED***.add(tMap[d.type]);
      if (!d.children) {
        keys.add(parentValue);
      }
      if (d.children) {
        d.children.forEach((d1) => {
          variables = new Object();
          ***REMOVED***.add(tMap[d1.type]);
          const value = ***REMOVED***(
            tMap[d1.type] && tMap[d1.type].items ? tMap[d1.type].items.filter((i) => i.value === d1.value)[0] : d1.value,
            locale
          ) || d1.value;
          variables[d.type] = parentValue;
          variables[d1.type] = value;
          Object.keys(d1).forEach((k) => {
            variables[k] = d1[k];
          });
          row.variables[value] = variables;
          keys.add(value);
          total += d1[field];
          vals.push(d1[field]);
          row[value] = d1[field];
        });
      } else {
        const variables2 = new Object();
        variables2[d.type] = parentValue;
        ***REMOVED***.add(tMap[d.type]);
        Object.keys(data).forEach((k) => {
          variables2[k] = d[k];
        });
        row.variables = variables2;
      }
      series.push(row);
    });
    const upperLocale = locale.toUpperCase();
    const filtered = colorBy == "id" ? series : series.filter((s) => hiddenBars.indexOf(s[indexBy]) == -1);
    const allKeys = Array.from(keys);
    if (props.sort == "***REMOVED***") {
      filtered.sort(
        (a, b) => alphaSort(props.sortreverse, locale, a[indexBy], b[indexBy])
      );
    } else if (props.sort == "values") {
      filtered.sort((a, b) => {
        var _a2, _b2, _c;
        if (props.***REMOVED*** == "_total") {
          const va = Math.max(...allKeys.map((k) => a[k]));
          const vb = Math.max(...allKeys.map((k) => b[k]));
          return numericSort(props.sortreverse, va, vb);
        } else {
          if (((_b2 = (_a2 = data == null ? void 0 : data.metadata) == null ? void 0 : _a2.types) == null ? void 0 : _b2.length) > 1) {
            const translatedSor2Dimension = (_c = data == null ? void 0 : data.metadata) == null ? void 0 : _c.types[1].items.filter((c) => {
              if (props.***REMOVED*** === c.value || c.labels && c.labels[upperLocale] === props.***REMOVED***) {
                return true;
              }
              return false;
            });
            if (translatedSor2Dimension.length > 0) {
              const sortVal = translatedSor2Dimension[0].labels[upperLocale] ? translatedSor2Dimension[0].labels[upperLocale] : translatedSor2Dimension[0].value;
              const va = Math.max(
                ...allKeys.filter((k) => k === sortVal).map((k) => a[k])
              );
              const vb = Math.max(
                ...allKeys.filter((k) => k === sortVal).map((k) => b[k])
              );
              return numericSort(props.sortreverse, va ? va : 0, vb ? vb : 0);
            }
          }
        }
      });
    }
    const arrayKeys = [...keys];
    if (((_b = (_a = data == null ? void 0 : data.metadata) == null ? void 0 : _a.types) == null ? void 0 : _b.length) > 1) {
      arrayKeys.sort((k1, k2) => {
        var _a2, _b2;
        const item1 = data.metadata.types[1].items.filter(
          (f) => f.value == k1 || f.labels && f.labels[upperLocale] == k1
        );
        const item2 = data.metadata.types[1].items.filter(
          (f) => f.value == k2 || f.labels && f.labels[upperLocale] == k2
        );
        const pos1 = (_a2 = item1[0]) == null ? void 0 : _a2.position;
        const pos2 = (_b2 = item2[0]) == null ? void 0 : _b2.position;
        return pos1 - pos2;
      });
    }
    options = {
      metadata: data.metadata,
      ***REMOVED***,
      indexBy,
      keys: colorBy == "index" ? arrayKeys : arrayKeys.filter((k) => hiddenBars.indexOf(k) == -1),
      data: filtered
    };
  }
  return /* @__PURE__ */ jsx(Fragment, { children: React__default.Children.map(
    props.children,
    (child) => React__default.cloneElement(child, { options })
  ) });
};
const BarData$1 = (props) => {
  const { data, measures, dimensions } = props;
  const copyData = JSON.parse(JSON.stringify(data));
  if (dimensions.length === 1) {
    return /* @__PURE__ */ jsx(***REMOVED***, { ...props, data: copyData });
  } else {
    return /* @__PURE__ */ jsx(***REMOVED***, { ...props, data: copyData });
  }
};
const dataFrames = { BarDataFrame: BarData$2, PieDataFrame: PieData$1, LineDataFrame: BarData$1 };
const LineData = ({ children, data }) => {
  const {
    data: json,
    meta: { fields }
  } = data;
  fields[0];
  const keys = fields.slice(1).filter((f) => !f.startsWith("_"));
  const chartData = keys.map((k) => {
    const row = {};
    row["id"] = k;
    row["data"] = json.map((j) => {
      const variables = {};
      Object.keys(j).forEach((k2) => {
        variables[k2] = j[k2];
      });
      return {
        x: j[fields[0]],
        y: j[k],
        variables: { ...variables, field: k }
      };
    });
    return row;
  });
  const options = {
    indexBy: "id",
    keys,
    data: chartData
  };
  return React__default.Children.map(
    children,
    (child) => React__default.cloneElement(child, { options })
  );
};
const PieData = ({ children, data }) => {
  const {
    data: json,
    meta: { fields }
  } = data;
  fields[0];
  const keys = data.data.map((d) => d.ID);
  const chartData = json.map((j) => {
    const row = {};
    const variables = {};
    Object.keys(j).forEach((k) => {
      variables[k] = j[k];
    });
    variables["field"] = fields[1];
    row["variables"] = variables;
    row["id"] = j[fields[0]];
    row["label"] = j[fields[0]];
    row["value"] = j[fields[1]];
    return row;
  });
  const options = {
    keys,
    indexBy: "id",
    data: chartData
  };
  return React__default.Children.map(
    children,
    (child) => React__default.cloneElement(child, { options })
  );
};
const BarData = ({ children, data, measures }) => {
  const {
    data: json,
    meta: { fields }
  } = data;
  const index2 = fields[0];
  const keys = measures && measures.length > 0 ? measures : fields.slice(1).filter((f) => !f.startsWith("_"));
  const options = {
    indexBy: index2,
    keys,
    data: json
  };
  return React__default.Children.map(
    children,
    (child) => React__default.cloneElement(child, { options })
  );
};
const CSVDataFrame = ({ children, data, keys, type, measures }) => {
  if (type == "bar") {
    return /* @__PURE__ */ jsx(BarData, { data, keys, measures, children });
  }
  if (type == "line") {
    return /* @__PURE__ */ jsx(LineData, { data, keys, measures, children });
  }
  if (type == "bump") {
    return /* @__PURE__ */ jsx(LineData, { data, keys, measures, children });
  }
  if (type == "pie") {
    return /* @__PURE__ */ jsx(PieData, { data, keys, measures, children });
  }
  if (type == "radar") {
    return /* @__PURE__ */ jsx(BarData, { data, keys, measures, children });
  }
};
class Colors {
  constructor(colorBy, scheme, data, keys, indexBy) {
    this._colorBy = colorBy;
    this._scheme = scheme;
    this._data = data;
    this._keys = keys;
    this._indexBy = indexBy;
    this._domain = [];
    this._color = null;
  }
  get domain() {
    return this._domain;
  }
  get color() {
    return this._color;
  }
  get maxValue() {
    return this.domain && this.domain.length > 0 ? this.domain[1] : 0;
  }
  get minValue() {
    return this.domain && this.domain.length > 0 ? this.domain[0] : 0;
  }
  get colorBy() {
    return this._colorBy;
  }
  get scheme() {
    return this._scheme;
  }
  get data() {
    return this._data;
  }
  get keys() {
    return this._keys;
  }
  get indexBy() {
    return this._indexBy;
  }
  getColor(id, datum) {
  }
  ***REMOVED***(value) {
  }
  getColorByKey(value) {
  }
  ***REMOVED***(value) {
    return this.color ? this.color(value) : null;
  }
}
const DEFAULT_SYSTEM_COLOR = "#9F9F9F";
class SystemColors extends Colors {
  constructor(app, type, colorBy, scheme, data, keys, indexBy, ***REMOVED***, ***REMOVED***, locale) {
    super(colorBy, scheme, data, keys, indexBy);
    this.colorMap = {};
    this._colorBy = type == "line" ? "id" : colorBy;
    if (this._indexBy && ***REMOVED***) {
      [...***REMOVED***].forEach((c) => {
        if (c && c.items) {
          c.items.forEach((s) => {
            if (locale && s.labels && s.labels[locale.toUpperCase()]) {
              this.colorMap[s.labels[locale.toUpperCase()]] = s.categoryStyle;
            } else {
              this.colorMap[s.value] = s.categoryStyle;
            }
          });
        }
      });
    }
    if (***REMOVED***) {
      [...***REMOVED***].forEach((c) => {
        if (c && c.styles) {
          if (locale && c.labels && c.labels[locale.toUpperCase()]) {
            this.colorMap[c.labels[locale.toUpperCase()]] = c.styles;
          } else {
            this.colorMap[c.label] = c.styles;
          }
        }
      });
    }
  }
  getColor(id, datum) {
    if (this._colorBy === "index") {
      return this.colorMap[datum[this._indexBy]] ? this.colorMap[datum[this._indexBy]].color : DEFAULT_SYSTEM_COLOR;
    } else {
      return this.colorMap[id] ? this.colorMap[id].color : DEFAULT_SYSTEM_COLOR;
    }
  }
  ***REMOVED***(value) {
    return this.colorMap[value] ? this.colorMap[value].color : DEFAULT_SYSTEM_COLOR;
  }
  getColorByKey(value) {
    return this.colorMap[value] ? this.colorMap[value].color : DEFAULT_SYSTEM_COLOR;
  }
}
class PlainColor extends Colors {
  constructor(color) {
    super();
    this._color = color;
  }
  getColor(id, datum) {
    return this._color;
  }
  ***REMOVED***(value) {
    return this._color;
  }
  getColorByKey(value) {
    return this._color;
  }
}
class CustomColors extends Colors {
  constructor(app, type, colorBy, scheme, data, ***REMOVED***, ***REMOVED***, keys, indexBy, manualColors = {}, locale, overallLabel, customLabels) {
    super(colorBy, scheme, data, keys, indexBy);
    this._manualColor = {};
    this._manualColor[overallLabel] = manualColors ? manualColors["Overall"] : null;
    if (app != "csv") {
      const ***REMOVED*** = (***REMOVED***) => {
        items = [...***REMOVED***][***REMOVED***].items;
        if (manualColors != null && manualColors != void 0) {
          Object.keys(manualColors).forEach((k) => {
            const vals = items.filter((i) => i.code === k);
            if (vals.length > 0 && vals[0].labels) {
              let translated;
              if (locale) {
                translated = vals[0].labels[locale.toUpperCase()];
              }
              if (translated) {
                this._manualColor[translated] = manualColors[k];
              } else {
                this._manualColor[vals[0].value] = manualColors[k];
              }
            }
          });
        }
      };
      const mapByMeasure = () => {
        items = ***REMOVED***;
        Object.keys(manualColors).forEach((k) => {
          const vals = [...items].filter((i) => i.value === k);
          if (vals.length > 0 && vals[0].labels) {
            const customLabel = customLabels[k];
            if (customLabels && customLabel) {
              this._manualColor[customLabel] = manualColors[k];
            }
            let translated;
            if (locale) {
              translated = vals[0].labels[locale.toUpperCase()];
            }
            if (translated) {
              this._manualColor[translated] = manualColors[k];
            } else {
              this._manualColor[vals[0].label] = manualColors[k];
            }
          }
        });
      };
      let items = [];
      const ***REMOVED*** = type == "line" ? 1 : colorBy === "index" ? 0 : 1;
      if (!***REMOVED***) {
        mapByMeasure();
      } else if (***REMOVED***.size == 1 && ***REMOVED*** == 1) {
        if (indexBy == "measure") {
          ***REMOVED***(0);
        } else {
          mapByMeasure();
        }
      } else {
        ***REMOVED***(***REMOVED***);
      }
    } else {
      this._manualColor = manualColors;
    }
  }
  getColor(id, datum) {
    if (this.colorBy === "index") {
      const color = this._manualColor[id] || this._manualColor[datum[this.indexBy]];
      return color ? color : "#5555";
    }
    if (this.colorBy === "id") {
      return this._manualColor[id] ? this._manualColor[id] : "#5555";
    }
    return "#5555";
  }
  ***REMOVED***(value) {
  }
  getColorByKey(value) {
    return this._manualColor[value] ? this._manualColor[value] : "#5555";
  }
}
class ***REMOVED*** extends Colors {
  constructor(colorBy, scheme, data, keys, indexBy) {
    super(colorBy, scheme, data, keys, indexBy);
    if (colorBy === "index") {
      this._domain = [0, this.data.length];
    }
    if (colorBy === "id") {
      this._domain = [0, this.keys.length];
    }
    if (colorBy === "values") {
      const values = data.map((d) => keys.map((k) => d[k])).flatMap((d) => d).filter((n) => n != void 0);
      this._domain = [Math.min(...values), Math.max(...values)];
    }
    const interpolator = sequentialColorInterpolators[this.scheme];
    this._color = d3.***REMOVED***(interpolator);
    this._color.domain(this._domain);
  }
  getColor(id, datum) {
    if (this.colorBy === "index") {
      const indexes = this.data.map((d) => d[this.indexBy]);
      return this.color(indexes.indexOf(datum[this.indexBy]));
    }
    if (this.colorBy === "id") {
      return this.color(this.keys.indexOf(id));
    }
    if (this.colorBy === "values") {
      return this.color(datum[id]);
    }
  }
  ***REMOVED***(value) {
    const indexes = this.data.map((d) => d[this.indexBy]);
    return this.color(indexes.indexOf(value));
  }
  getColorByKey(value) {
    return this.color(this.keys.indexOf(value));
  }
}
class ***REMOVED*** extends Colors {
  constructor(colorBy, scheme, data, keys, indexBy) {
    super(colorBy, scheme, data, keys, indexBy);
    if (colorBy === "index") {
      this._domain = this.data.map((d) => d[this.indexBy]);
    }
    if (colorBy === "id") {
      this._domain = this.keys;
    }
    if (colorBy === "values") {
      const values = data.map((d) => keys.map((k) => d[k])).flatMap((d) => d).filter((n) => n != void 0);
      this._domain = [Math.min(...values), Math.max(...values)];
    }
    this._color = d3.scaleOrdinal(colorSchemes[this.scheme]);
    this._color.domain(this._domain);
  }
  ***REMOVED***(value) {
    if (this.colorBy === "values") {
      return "gray";
    }
    return this.color(value);
  }
  getColor(id, datum) {
    if (this.colorBy === "index") {
      return this.color(datum[this.indexBy]);
    }
    if (this.colorBy === "id") {
      return this.color(id);
    }
    return "gray";
  }
  ***REMOVED***(value) {
    if (this.colorBy === "values") {
      return "gray";
    }
    return this.color(value);
  }
  getColorByKey(value) {
    if (this.colorBy === "values") {
      return "gray";
    }
    return this.color(value);
  }
}
class ColorProvider extends React__default.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      app,
      type,
      colorBy,
      scheme,
      barColor,
      manualColors,
      locale,
      overallLabel,
      customLabels,
      options: { data, keys, indexBy, ***REMOVED***, ***REMOVED*** }
    } = this.props;
    let colorManager;
    if (data) {
      if (scheme === "system") {
        colorManager = new SystemColors(
          app,
          type,
          colorBy,
          scheme,
          data,
          keys,
          indexBy,
          ***REMOVED***,
          ***REMOVED***,
          locale
        );
      } else if (scheme === "plain_color") {
        colorManager = new PlainColor(barColor);
      } else if (scheme == "manual") {
        colorManager = new CustomColors(
          app,
          type,
          colorBy,
          scheme,
          data,
          ***REMOVED***,
          ***REMOVED***,
          keys,
          indexBy,
          manualColors,
          locale,
          overallLabel,
          customLabels
        );
      } else {
        if (isSequentialColorScheme(scheme)) {
          colorManager = new ***REMOVED***(
            colorBy,
            scheme,
            data,
            keys,
            indexBy
          );
        }
        if (isCategoricalColorScheme(scheme)) {
          colorManager = new ***REMOVED***(
            colorBy,
            scheme,
            data,
            keys,
            indexBy
          );
        }
      }
      return /* @__PURE__ */ jsx("div", { children: React__default.Children.map(
        this.props.children,
        (child) => React__default.cloneElement(child, {
          ...this.props,
          ***REMOVED***: colorManager
        })
      ) });
    } else {
      return null;
    }
  }
}
const Messages = (props) => {
  const { data, noDataMsg, app, group, onClean, editing } = props;
  if (data && data.itemsSize && data.itemsSize > 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Segment, { placeholder: true, className: "***REMOVED***", children: [
    /* @__PURE__ */ jsxs(Header, { icon: true, children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          className: "noDataSVG",
          viewBox: "0 0 512 512",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M403.7,96.3c-41-41-95.6-63.6-153.7-63.6c-58,0-112.6,22.6-153.7,63.6c-41,41-63.6,95.6-63.6,153.7\n                        c0,58,22.6,112.6,63.6,153.7c41,41,95.6,63.6,153.7,63.6c58,0,112.6-22.6,153.7-63.6c41-41,63.7-95.6,63.7-153.7\n                        C467.3,192,444.7,137.4,403.7,96.3z M57.7,250C57.7,144,144,57.7,250,57.7c37.2,0,72,10.6,101.5,29l-63,77.1c-2.8-3.5-6-6.8-9.5-10\n                        c-18.2-16.7-39.9-24.5-65.1-23.5c-25.2,1.1-46.2,10.7-62.9,28.9c-16.7,18.2-24.5,39.9-23.5,65.1c1.1,25.2,10.7,46.2,28.9,62.9\n                        c6.2,5.7,12.8,10.3,19.8,14l-66,80.8C77.7,347.6,57.7,301.1,57.7,250z M280.2,217.8c0.7,17.3-4.7,32.3-16.3,45\n                        c-10.9,11.9-24.3,18.5-40.2,19.9l56.3-68.9C280.1,215.2,280.2,216.5,280.2,217.8z M194.6,278.8c-6.9-2.7-13.3-6.8-19.2-12.2\n                        c-12.7-11.6-19.4-26.1-20.1-43.5c-0.7-17.3,4.7-32.4,16.3-45c11.6-12.7,26.1-19.4,43.5-20.1c17.3-0.7,32.3,4.7,45,16.3\n                        c4,3.7,7.3,7.6,10.1,11.8L194.6,278.8z M250,442.3c-46,0-88.2-16.2-121.3-43.2l73.1-89.5c6.4,1,13,1.4,19.9,1.1\n                        c10.2-0.4,19.7-2.5,28.6-6.1c8.9-3.6,16.7-8.4,23.4-14.2l81,74.4c2.6,2.4,6,3.6,9.3,3.6c3.7,0,7.4-1.5,10.1-4.5\n                        c5.1-5.6,4.8-14.3-0.8-19.4l-81-74.4c5.3-7.2,9.3-15.3,12.2-24.5c2.8-9.2,4.1-18.8,3.6-29c-0.5-10.7-2.5-20.6-6-29.8l69.8-85.5\n                        c43,35.3,70.5,88.8,70.5,148.7C442.3,356,356,442.3,250,442.3z"
            }
          )
        }
      ),
      editing && /* @__PURE__ */ jsx("div", { className: "WPnoDataMsg", children: "Not enough parameters to render the chart" }),
      /* @__PURE__ */ jsx("div", { className: "WPnoDataMsg", children: noDataMsg })
    ] }),
    /* @__PURE__ */ jsx(Button, { onClick: (e) => onClean({ app, group }), children: "Clear Filter" })
  ] });
};
const ***REMOVED***$1 = {
  onClean: cleanFilter
};
const Messages$1 = connect_default(null, ***REMOVED***$1)(Messages);
const isMobile = getDeviceType() === "mobile";
const isTablet = getDeviceType() === "tablet";
const isMidTablet = getDeviceType() === "midTablet";
const ***REMOVED*** = getDeviceType() === "mobile" || getDeviceType() === "tablet" || getDeviceType() === "midTablet";
const Chart = (props) => {
  const {
    parent,
    editing = false,
    unique,
    childContent,
    categories,
    ***REMOVED***,
    "data-app": app = "prevalence",
    "data-group": group = "default",
    "data-height": height = 500,
    "data-type": type = "bar",
    //'data-source': source = 'gender/smoke',f
    "data-dimension1": dimension1,
    "data-dimension2": dimension2,
    "data-dimension3": dimension3,
    "data-color-by": colorBy = "index",
    "data-scheme": scheme = "system",
    "data-group-mode": groupMode = "grouped",
    "data-left-legend": left = "Left Legend",
    "data-legend-label": legendLabel = "",
    "data-bottom-legend": bottom = "Bottom Legend",
    "data-dualmode": dualMode,
    "data-legend-position": ***REMOVED*** = "right",
    "data-show-legends": showLegends = "true",
    "data-data-source-label": ***REMOVED*** = "Source",
    "data-chart-data-source": dataSource = "Data Source",
    "data-toggle-info-label": ***REMOVED*** = "Info Graphic",
    "data-toggle-chart-label": ***REMOVED*** = "Chart",
    //'data-number-format': format = '{"style":"percent", "minimumFractionDigits": 1, "maximumFractionDigits": 1}',
    "data-tick-rotation": tickRotation = 0,
    "data-tick-color": tickColor = "rgb(92,93,99)",
    "data-measures": measures = "{}",
    "data-format": format = "{}",
    "data-csv": csv = "",
    "data-margin-left": marginLeft = 50,
    "data-margin-top": marginTop = 25,
    "data-margin-right": marginRight = 25,
    "data-margin-bottom": marginBottom = 25,
    "data-start-angle": startAngle = 0,
    "data-end-angle": endAngle = 360,
    "data-view-mode": editMode = "info",
    "data-filters": filters = "[]",
    //filters
    "data-tooltip-html": tooltip = "",
    "data-layout": layout = "vertical",
    "data-reverse": reverse = "false",
    "data-offset-y": offsetY = "-40",
    "data-line-layer-enabled": ***REMOVED*** = "false",
    //"data-csv-line-layer-data": ***REMOVED*** = "",
    //"data-csv-line-color": lineColor = "#000000",
    //"data-csv-line-tooltip": lineTooltip = "",
    //"data-csv-line-title": lineTitle = "",
    "data-overlays": overlays,
    "data-max-value": maxValue = "auto",
    "data-value-scale": valueScale = "linear",
    "data-swap": swap = "false",
    "data-no-data-message": noDataMsg = "No data matches your selection",
    "data-bar-color": barColor = "rgb(0,0,0)",
    "data-override-tick-color": ***REMOVED*** = "false",
    "data-fixed-min-value": fixedMinValue = 0,
    "data-fixed-max-value": fixedMaxValue = 0,
    "data-bar-padding": barPadding = 0.15,
    "data-bar-label-position": ***REMOVED*** = "middle",
    "data-show-grid": showGrid = "true",
    "data-include-overall": ***REMOVED*** = "false",
    "data-bar-inner-padding": ***REMOVED*** = 0.7,
    "data-x-label-color": xLabelColor = "#000",
    "data-bar-label-color": barLabelColor = "#000",
    "data-legend-label-color": ***REMOVED*** = "#000",
    "data-tooltip-enabled": ***REMOVED*** = "true",
    "data-use-check-box-background": ***REMOVED*** = "false",
    "data-use-label-background": ***REMOVED*** = "true",
    "data-highlight-xaxis-line": ***REMOVED*** = "false",
    "data-show-tick-line": showTickLine = "true",
    "data-show-right-axis": showRightAxis = "true",
    "data-manual-colors": manualColors = "{}",
    "data-right-legend": rightLegend = "",
    "data-offset-right": offsetRight = "40",
    "data-offset-bottom": offsetBottom = "40",
    "data-hidden-bars": hiddenBars = [],
    "data-confidence-intervals": ***REMOVED*** = "[]",
    "data-enable-area": enableArea = "false",
    "data-area-shading-criteria": ***REMOVED*** = "DEFAULT",
    "data-area-lower-bound": ***REMOVED*** = "",
    "data-area-upper-bound": ***REMOVED*** = "",
    "data-show-points": showPoints = "true",
    "data-center-label": centerLabel = "",
    "data-show-arc-labels": showArcLabels = "true",
    "data-show-arc-link-labels": ***REMOVED*** = "true",
    "data-slice-padding": slicePadding = 1,
    "data-center-label-font-weight": centerLabelFontWeight = "normal",
    "data-center-label-font-size": ***REMOVED*** = "12",
    "data-center-label-xoffset": ***REMOVED*** = 0,
    "data-center-label-yoffset": ***REMOVED*** = 0,
    "data-group-total-measure": ***REMOVED*** = "",
    "data-show-group-total": ***REMOVED*** = "true",
    "data-group-total-label": ***REMOVED*** = "",
    "data-group-total-format": ***REMOVED*** = "{}",
    "data-group-total-label-offset": ***REMOVED***,
    "data-group-total-fixed-position": groupTotalFixedPosition = "false",
    "data-tooltip-enable-markdown": tooltipEnableMarkdown = "false",
    "data-y-axis-tick-values": ***REMOVED*** = "10",
    "data-x-axis-tick-values": ***REMOVED*** = "10",
    "data-offset-text": offsetText = 0,
    "data-overall-label": overallLabel = "Overall",
    "data-min-max-clamp": minMaxClamp = "false",
    "data-reverse-legend": reverseLegend = "false",
    "data-sort": sort = "default",
    "data-sort-reverse": sortReverse = "false",
    "data-***REMOVED***": ***REMOVED*** = "_total",
    "data-radar-curve": radarCurve = "linearClosed",
    "data-radar-fill-opacity": ***REMOVED*** = 0.25,
    "data-radar-border-width": ***REMOVED*** = 2,
    "data-radar-grid-levels": ***REMOVED*** = 3,
    "data-radar-grid-shape": ***REMOVED*** = "circular",
    "data-radar-grid-label-offset": ***REMOVED*** = 36,
    "data-radar-enable-dots": ***REMOVED*** = "true",
    "data-radar-dot-size": radarDotSize = 8,
    "data-radar-enable-dot-label": ***REMOVED*** = "true",
    "data-radar-dot-label-offset": ***REMOVED*** = -12,
    "data-mobile-customization": ***REMOVED*** = "{}"
  } = props;
  let {
    "data-enable-grid-y": enableGridY = "true",
    "data-enable-grid-x": enableGridX = "false"
  } = props;
  const ***REMOVED*** = JSON.parse(***REMOVED***(***REMOVED***));
  const isMobileConfigEnabled = (isMobile || isTablet || isMidTablet) && ((***REMOVED*** == null ? void 0 : ***REMOVED***.***REMOVED***) ?? false);
  const locale = props.intl.locale;
  const ref = useRef(null);
  const decode = (value) => {
    try {
      if (editing) {
        return value;
      }
      return ***REMOVED***(value);
    } catch (err) {
      console.error("error decoding value:" + value);
      return value;
    }
  };
  const parse = (value) => {
    try {
      return JSON.parse(decode(value));
    } catch (error) {
      console.error("error parsing value:" + value);
    }
    return null;
  };
  const ***REMOVED*** = () => {
    return parse(manualColors)[app];
  };
  const ***REMOVED*** = () => {
    return parse(measures);
  };
  const ***REMOVED*** = () => {
    if (***REMOVED***[app]) {
      let format2 = ***REMOVED***[app].format;
      if (!format2) {
        const keys = Object.keys(***REMOVED***[app]);
        for (let i = 0; i < keys.length; i++) {
          if (***REMOVED***[app][keys[i]].selected && ***REMOVED***[app][keys[i]].format) {
            format2 = ***REMOVED***[app][keys[i]].format;
            break;
          }
        }
      }
      return format2;
    } else {
      return ***REMOVED*** && ***REMOVED***["csv"] ? ***REMOVED***["csv"].format : null;
    }
  };
  const ***REMOVED*** = () => {
    let format2 = null;
    if (***REMOVED***[app]) {
      const ***REMOVED*** = ***REMOVED***[app].***REMOVED***;
      if (***REMOVED*** && ***REMOVED***[app].customFormat) {
        format2 = ***REMOVED***[app].customFormat;
      }
    } else {
      if (***REMOVED*** && ***REMOVED***["csv"]) {
        const ***REMOVED*** = ***REMOVED***["csv"].***REMOVED***;
        if (***REMOVED*** && ***REMOVED***["csv"].customFormat) {
          format2 = ***REMOVED***["csv"].customFormat;
        }
      }
    }
    return format2;
  };
  const ***REMOVED*** = () => {
    if (***REMOVED***[app]) {
      return Object.keys(***REMOVED***[app]).map((s) => ({ value: s, ...***REMOVED***[app][s] })).filter((m) => m.selected).map((s) => s.value);
    }
    return [];
  };
  const ***REMOVED*** = () => {
    const customLabels = {};
    if (***REMOVED***[app]) {
      const ***REMOVED*** = Object.keys(***REMOVED***[app]).map((s) => ({ value: s, ...***REMOVED***[app][s] })).filter((m) => m.selected && m.***REMOVED***);
      ***REMOVED***.forEach((m) => {
        customLabels[m.value] = m.customLabel;
      });
    }
    return customLabels;
  };
  const ***REMOVED*** = () => {
    if (***REMOVED***[app]) {
      return Object.keys(***REMOVED***[app]).filter(
        (k) => ***REMOVED***[app][k].***REMOVED***
      );
    }
    return [];
  };
  let ***REMOVED*** = ***REMOVED***();
  let ***REMOVED*** = ***REMOVED***();
  let ***REMOVED*** = ***REMOVED***();
  const userMeasures = ***REMOVED***();
  let leftLegendForSelectedMeasure = left;
  let rightLegendForSelectedMeasure = rightLegend;
  let tooltipForSelectedMeasure = decode(tooltip);
  if (***REMOVED***) {
    const selected = Object.keys(***REMOVED***[app].measures).map((s) => ({ value: s, ...***REMOVED***[app].measures[s] })).filter((m) => m.selected).map((s) => s.value);
    ***REMOVED*** = ***REMOVED***;
    ***REMOVED*** = selected;
    ***REMOVED*** = ***REMOVED***();
    leftLegendForSelectedMeasure = ***REMOVED***.leftTitle;
    rightLegendForSelectedMeasure = ***REMOVED***.rightTitle;
    if (***REMOVED***.customTooltip) {
      tooltipForSelectedMeasure = ***REMOVED***.customTooltip;
    }
  }
  const numberFormat = ***REMOVED*** ? {
    style: ***REMOVED***.style === "compacted" ? "decimal" : ***REMOVED***.style,
    notation: ***REMOVED***.style === "compacted" ? "compact" : "standard",
    currency: ***REMOVED***.currency,
    minimumFractionDigits: parseInt(***REMOVED***.minimumFractionDigits),
    maximumFractionDigits: parseInt(***REMOVED***.maximumFractionDigits)
  } : {
    notation: "standard",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  const ***REMOVED*** = ***REMOVED***();
  const groupTotalFormatObject = parse(***REMOVED***);
  const groupTotalFormatParsed = {
    style: groupTotalFormatObject.style === "compacted" ? "decimal" : groupTotalFormatObject.style,
    notation: groupTotalFormatObject.style === "compacted" ? "compact" : "standard",
    currency: groupTotalFormatObject.currency,
    minimumFractionDigits: parseInt(
      groupTotalFormatObject.minimumFractionDigits
    ),
    maximumFractionDigits: parseInt(
      groupTotalFormatObject.maximumFractionDigits
    )
  };
  const [mode, setMode] = useState(editMode);
  const viewMode = editing ? editMode : mode;
  const colors = {
    scheme,
    colorBy
  };
  const contentHeight = editing ? height - 80 : height;
  const ***REMOVED*** = () => {
    if (isMobileConfigEnabled) {
      if (***REMOVED*** == null ? void 0 : ***REMOVED***.***REMOVED***) {
        return bottom;
      } else {
        return "";
      }
    }
    return bottom;
  };
  const ***REMOVED*** = () => {
    if (isMobileConfigEnabled) {
      if (***REMOVED*** == null ? void 0 : ***REMOVED***.***REMOVED***) {
        return leftLegendForSelectedMeasure;
      } else {
        return "";
      }
    }
    return leftLegendForSelectedMeasure;
  };
  const ***REMOVED*** = () => {
    if (isMobileConfigEnabled) {
      if (***REMOVED*** == null ? void 0 : ***REMOVED***.***REMOVED***) {
        return rightLegendForSelectedMeasure;
      } else {
        return "";
      }
    }
    return rightLegendForSelectedMeasure;
  };
  const legends = {
    left: ***REMOVED***(),
    bottom: ***REMOVED***(),
    right: ***REMOVED***()
  };
  const parseBoolean = (str) => {
    if (str === "true" || str === true) {
      return true;
    } else if (str === "false" || str === false) {
      return false;
    }
  };
  const ***REMOVED*** = () => {
    if (parseBoolean(enableGridX) && !parseBoolean(enableGridY)) {
      enableGridX = false;
      enableGridY = true;
    } else if (!parseBoolean(enableGridX) && parseBoolean(enableGridY)) {
      enableGridX = true;
      enableGridY = false;
    }
  };
  const switchLayout = () => {
    if (layout === "horizontal") {
      ***REMOVED***();
      return "vertical";
    } else {
      ***REMOVED***();
      return "horizontal";
    }
  };
  const mobileLayout = () => {
    if (***REMOVED*** == null ? void 0 : ***REMOVED***.***REMOVED***) {
      return switchLayout();
    }
    return layout;
  };
  const ***REMOVED*** = (mobileEnabled, mobileSetting, defaultValue) => {
    return mobileEnabled ? parseInt(mobileSetting) ?? defaultValue : defaultValue;
  };
  const getBarPadValueOuterOrInner = (mobileEnabled, mobileSetting, defaultValue) => {
    return mobileEnabled ? mobileSetting ?? defaultValue : defaultValue;
  };
  const chartProps = {
    app,
    tickColor: ***REMOVED***(tickColor),
    tickRotation: isMobileConfigEnabled ? ***REMOVED***.tickRotation ?? tickRotation : tickRotation,
    layout: isMobileConfigEnabled ? mobileLayout() : layout,
    reverse: reverse == true || reverse == "true",
    showLegends: showLegends == true || showLegends == "true",
    legendLabel,
    swap: swap == true || swap == "true",
    showGrid: showGrid == true || showGrid == "true",
    marginLeft: ***REMOVED***(isMobileConfigEnabled, parseInt(***REMOVED*** == null ? void 0 : ***REMOVED***.marginLeft), parseInt(marginLeft)),
    marginTop: ***REMOVED***(isMobileConfigEnabled, parseInt(***REMOVED*** == null ? void 0 : ***REMOVED***.marginTop), parseInt(marginTop)),
    marginRight: ***REMOVED***(isMobileConfigEnabled, parseInt(***REMOVED*** == null ? void 0 : ***REMOVED***.marginRight), parseInt(marginRight)),
    marginBottom: ***REMOVED***(isMobileConfigEnabled, parseInt(***REMOVED*** == null ? void 0 : ***REMOVED***.marginBottom), parseInt(marginBottom)),
    height: `${contentHeight}px`,
    ***REMOVED***: ***REMOVED*** ? "bottom" : ***REMOVED***,
    legends,
    tooltip: tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true" ? tooltipForSelectedMeasure : tooltipForSelectedMeasure.replace(/\r\n/g, "<hr/>").replace(/[\r\n]/g, "<hr/>"),
    colors,
    groupMode,
    format: numberFormat,
    startAngle,
    endAngle,
    offsetY,
    // ***REMOVED***,
    // lineColor: ***REMOVED***(lineColor),
    // lineTooltip,
    // lineTitle,
    maxValue,
    valueScale,
    categories,
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    overlays: parse(overlays) || [],
    barColor: ***REMOVED***(barColor),
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    fixedMinValue,
    fixedMaxValue,
    barPadding: getBarPadValueOuterOrInner(isMobileConfigEnabled, ***REMOVED*** == null ? void 0 : ***REMOVED***.barPadding, barPadding),
    ***REMOVED***,
    ***REMOVED***: getBarPadValueOuterOrInner(isMobileConfigEnabled, ***REMOVED*** == null ? void 0 : ***REMOVED***.***REMOVED***, ***REMOVED***),
    xLabelColor: ***REMOVED***(xLabelColor),
    barLabelColor: ***REMOVED***(barLabelColor),
    ***REMOVED***: ***REMOVED***(***REMOVED***),
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    showTickLine: showTickLine == true || showTickLine == "true",
    showRightAxis: showRightAxis == true || showRightAxis == "true",
    offsetRight,
    offsetBottom,
    ***REMOVED***: parse(***REMOVED***) || [],
    showPoints: showPoints == true || showPoints == "true",
    enableArea: enableArea == true || enableArea == "true",
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***: groupTotalFormatParsed,
    ***REMOVED***,
    groupTotalFixedPosition: groupTotalFixedPosition == true || groupTotalFixedPosition == "true",
    centerLabel,
    showArcLabels: showArcLabels == true || showArcLabels == "true",
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    slicePadding,
    centerLabelFontWeight,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    userMeasures,
    tooltipEnableMarkdown: tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true",
    ***REMOVED***: isMobileConfigEnabled ? ***REMOVED***.***REMOVED*** ?? ***REMOVED*** : ***REMOVED***,
    ***REMOVED***,
    enableGridY: enableGridY == true || enableGridY == "true",
    enableGridX: enableGridX == true || enableGridX == "true",
    offsetText,
    ***REMOVED***,
    overallLabel,
    minMaxClamp,
    reverseLegend: reverseLegend == true || reverseLegend == "true",
    ***REMOVED***,
    sort,
    sortReverse: sortReverse == true || sortReverse == "true",
    radarCurve,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    radarDotSize,
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    dimension1
  };
  const params = {};
  const ff = parse(filters) || {};
  if (ff && ff.forEach) {
    ff.forEach((f) => {
      if (f.value != null && f.value.filter((v) => v != null && v.toString().trim() != "").length > 0)
        params[f.param] = f.value;
    });
  }
  let ***REMOVED*** = null;
  let Chart2 = null;
  if (app === "csv") {
    ***REMOVED*** = CSVDataFrame;
  } else {
    switch (type) {
      case "line":
        ***REMOVED*** = dataFrames.LineDataFrame;
        break;
      case "pie":
        ***REMOVED*** = dataFrames.PieDataFrame;
        break;
      case "radar":
        ***REMOVED*** = dataFrames.BarDataFrame;
        break;
      default:
        ***REMOVED*** = dataFrames.BarDataFrame;
        break;
    }
  }
  let showNotEnoughParameters = false;
  switch (type) {
    case "bar":
      Chart2 = Bar;
      showNotEnoughParameters = app != "csv" && dimension1 == "none" && ***REMOVED***.length == 0;
      break;
    case "line":
      Chart2 = Line;
      showNotEnoughParameters = app !== "csv" && (***REMOVED***.length === 0 || dimension1 === "none");
      break;
    case "pie":
      showNotEnoughParameters = app != "csv" && ***REMOVED***.length == 0;
      Chart2 = HalfPie;
      break;
    case "radar":
      showNotEnoughParameters = app != "csv" && ***REMOVED***.length == 0;
      Chart2 = Radar;
      break;
    default:
      Chart2 = /* @__PURE__ */ jsx("div", { children: "No Chart" });
      break;
  }
  const dual = dualMode === "true";
  const dimensions = [];
  if (dimension1 != "none") {
    dimensions.push(dimension1);
  }
  if (dimension2 != "none") {
    dimensions.push(dimension2);
  }
  const [legendsContainerHeight, setLegendsContainerHeight] = useState(0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (***REMOVED***) {
        const adjustDataSourceMargin = () => {
          const ***REMOVED*** = ref.current.querySelector(
            ".legends.container.has-standard-12-font-size.bottom"
          ) || ref.current.querySelector(".legends.container.items-section");
          if (!***REMOVED***) return;
          const { clientHeight: height2 } = ***REMOVED***;
          const styles = window.***REMOVED***(***REMOVED***);
          const marginTop2 = parseInt(styles.marginTop);
          const marginBottom2 = parseInt(styles.marginBottom);
          const paddingTop = parseInt(styles.paddingTop);
          const paddingBottom = parseInt(styles.paddingBottom);
          const totalHeight = height2 + marginTop2 + marginBottom2 + paddingTop + paddingBottom;
          const container = ***REMOVED***.closest(".ui.fluid.container.content");
          if (container) {
            const ***REMOVED*** = container.querySelector(".data-source");
            if (***REMOVED***) {
              const ***REMOVED*** = ***REMOVED***.getBoundingClientRect();
              const legendsRect = ***REMOVED***.getBoundingClientRect();
              if (legendsRect.bottom !== 0 && ***REMOVED***.top !== 0) {
                if (***REMOVED***.textContent.trim() === "") return;
                const ***REMOVED*** = marginBottom2;
                const adjustedLegendsBottom = legendsRect.bottom + ***REMOVED***;
                const ***REMOVED*** = window.***REMOVED***(***REMOVED***);
                const ***REMOVED*** = parseFloat(***REMOVED***.marginTop) || 0;
                const adjustedDataSourceTop = ***REMOVED***.top - ***REMOVED***;
                if (adjustedLegendsBottom > adjustedDataSourceTop) {
                  let overlap = adjustedLegendsBottom - adjustedDataSourceTop;
                  if (overlap < 5) overlap += 1;
                  ***REMOVED***.style.marginTop = `${overlap + 1}px`;
                }
              } else {
                setTimeout(() => {
                  if (***REMOVED***.top < legendsRect.bottom) {
                    ***REMOVED***.style.marginTop = `${legendsRect.bottom - ***REMOVED***.top + 1}px`;
                  }
                }, 1e3);
              }
            }
          }
          const ***REMOVED*** = ***REMOVED***.closest(".chart.container");
          if (***REMOVED***) {
            const ***REMOVED*** = ***REMOVED***.getBoundingClientRect();
            const ***REMOVED*** = window.***REMOVED***(***REMOVED***);
            const chartContainerMarginBottom = parseFloat(***REMOVED***.marginBottom) || 0;
            const adjustedChartContainerBottom = ***REMOVED***.bottom + chartContainerMarginBottom;
            const legendsRect = ***REMOVED***.getBoundingClientRect();
            const ***REMOVED*** = parseFloat(styles.marginTop) || 0;
            const ***REMOVED*** = legendsRect.top - ***REMOVED***;
            if (***REMOVED*** < adjustedChartContainerBottom) {
              const overlap = adjustedChartContainerBottom - ***REMOVED***;
              ***REMOVED***.style.marginTop = `${overlap + 1}px`;
            }
          }
          setLegendsContainerHeight(totalHeight);
        };
        adjustDataSourceMargin();
      }
    }, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [***REMOVED***, ref]);
  return /* @__PURE__ */ jsx("div", { ref, children: /* @__PURE__ */ jsxs(
    Container,
    {
      className: "chart container",
      style: {
        minHeight: type === "pie" && window.innerWidth <= 480 ? `${parseInt(height) + parseInt(legendsContainerHeight) * 0.5}px` : `${parseInt(height) + parseInt(legendsContainerHeight)}px`
      },
      fluid: true,
      children: [
        /* @__PURE__ */ jsx(
          DataProvider,
          {
            editing,
            style: { height: `${contentHeight}px` },
            params,
            app,
            group,
            csv,
            store: [app, unique, ...dimensions],
            source: dimensions.join("/"),
            children: /* @__PURE__ */ jsxs(
              Container,
              {
                style: { height: `${contentHeight}px` },
                className: "body",
                fluid: true,
                children: [
                  showNotEnoughParameters && /* @__PURE__ */ jsx(Messages$1, { editing }),
                  !showNotEnoughParameters && /* @__PURE__ */ jsxs(DataConsumer, { children: [
                    /* @__PURE__ */ jsx(Messages$1, { app, group, noDataMsg, children: " " }),
                    /* @__PURE__ */ jsx(
                      ***REMOVED***,
                      {
                        locale,
                        colorBy,
                        hiddenBars,
                        swap: swap === "true" || swap === true,
                        type,
                        includeTotal: true,
                        ***REMOVED***: ***REMOVED*** === true || ***REMOVED*** === "true",
                        overallLabel,
                        measures: ***REMOVED***,
                        dimensions: [...dimensions],
                        sort,
                        sortreverse: sortReverse === true || sortReverse === "true",
                        ***REMOVED***,
                        customLabels: ***REMOVED***(),
                        children: /* @__PURE__ */ jsx(
                          ColorProvider,
                          {
                            type,
                            app,
                            locale,
                            overallLabel,
                            customLabels: ***REMOVED***(),
                            manualColors: ***REMOVED***(),
                            colorBy,
                            scheme,
                            barColor: chartProps.barColor,
                            children: /* @__PURE__ */ jsx(Chart2, { ...chartProps })
                          }
                        )
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("br", {}),
        dual && childContent && viewMode === "info" && /* @__PURE__ */ jsx(
          Container,
          {
            fluid: true,
            style: { height: contentHeight + "px" },
            className: "body",
            children: /* @__PURE__ */ jsx(
              PostContent,
              {
                post: { content: { rendered: childContent } }
              }
            )
          }
        )
      ]
    }
  ) });
};
const ***REMOVED*** = (state, ownProps) => {
  const { "data-app": app, "data-group": group } = ownProps;
  const ***REMOVED*** = state.getIn(["data", "measures", app, group]);
  if (***REMOVED***) {
    return {
      ***REMOVED***
    };
  } else {
    return {};
  }
};
const ***REMOVED*** = {};
const index = connect_default(***REMOVED***, ***REMOVED***)(Chart);
export {
  index as default
};
