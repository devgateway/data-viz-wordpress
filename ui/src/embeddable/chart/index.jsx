import React, { useEffect, useRef, useState } from "react";
import { Container } from "semantic-ui-react";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import { buildDivergingOptions, ***REMOVED*** } from "./***REMOVED***";
import HalfPie from "./Pie";

import Radar from "./Radar";
import Bar from "./Bar";
import Line from "./Line";

import { PostContent } from "@devgateway/wp-react-lib";
import dataFrames from "./data/index";

import CSVDataFrame from "./CSVDataFrame";
import ColorProvider from "./colors/ColorProvider";
import Messages from "./Messages";
import { connect } from "react-redux";

const PieChart = (props) => {
  const { data, legends, colors, height } = props;
  const options = ***REMOVED***(data, true);
  return (
    <HalfPie
      height={height}
      legends={legends}
      colors={colors}
      options={options}
      format={{ style: "percent" }}
    ></HalfPie>
  );
};

const Diverging = (props) => {
  const { data, legends, colors, height } = props;
  const options = buildDivergingOptions(data, true);
  return (
    <Diverging
      height={height}
      legends={legends}
      colors={colors}
      options={options}
      format={{ style: "percent", currency: "EUR" }}
    ></Diverging>
  );
};
const Chart = (props) => {
  let {
    parent,
    editing = false,
    unique,
    childContent,
    categories,
    ***REMOVED***,
    "data-app": app = "prevalence",
    "data-group": group = "default",
    "data-height": height = 500,
    "data-type": type = "bar", //'data-source': source = 'gender/smoke',f
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
    "data-toggle-chart-label": ***REMOVED*** = "Chart", //'data-number-format': format = '{"style":"percent", "minimumFractionDigits": 1, "maximumFractionDigits": 1}',
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
    "data-filters": filters = "[]", //filters
    "data-tooltip-html": tooltip = "",
    "data-layout": layout = "vertical",
    "data-reverse": reverse = "false",
    "data-offset-y": offsetY = "-40",
    "data-line-layer-enabled": ***REMOVED*** = "false",

    //"data-csv-line-layer-data": ***REMOVED*** = "",
    //"data-csv-line-color": lineColor = "#000000",
    //"data-csv-line-tooltip": lineTooltip = "",
    //"data-csv-line-title": lineTitle = "",

    "data-overlays": overlays = "[]",
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
    "data-line-label-position": ***REMOVED*** = "none",
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
    "data-enable-grid-y": enableGridY = "true",
    "data-enable-grid-x": enableGridX = "false",
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
    "data-mobile-customization": ***REMOVED*** = "{}",
  } = props;
  const ***REMOVED*** = JSON.parse(
    ***REMOVED***(***REMOVED***)
  );
  const [***REMOVED***, ***REMOVED***] = useState(
    window.innerWidth <= 1250
  );
  const isMobileConfigEnabled =
    ***REMOVED*** && (***REMOVED***?.***REMOVED*** ?? false);

  const ***REMOVED*** = () => {
    if (
      window.matchMedia("(min-width: 768px) and (max-width: 1250px)").matches
    ) {
      return isMobileConfigEnabled
        ? ***REMOVED***?.tabletXAxisTextRotation ?? tickRotation
        : tickRotation;
    } else if (window.matchMedia("(max-width: 480px)").matches) {
      return isMobileConfigEnabled
        ? ***REMOVED***?.mobileXAxisTextRotation ?? tickRotation
        : tickRotation;
    } else {
      return tickRotation;
    }
  };

  const [***REMOVED***, ***REMOVED***] = useState(***REMOVED***());

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
      let format = ***REMOVED***[app].format;
      if (!format) {
        const keys = Object.keys(***REMOVED***[app]);
        for (let i = 0; i < keys.length; i++) {
          if (
            ***REMOVED***[app][keys[i]].selected &&
            ***REMOVED***[app][keys[i]].format
          ) {
            format = ***REMOVED***[app][keys[i]].format;
            break;
          }
        }
      }

      return format;
    } else {
      return ***REMOVED*** && ***REMOVED***["csv"]
        ? ***REMOVED***["csv"].format
        : null;
    }
  };

  const ***REMOVED*** = () => {
    let format = null;
    if (***REMOVED***[app]) {
      const ***REMOVED*** = ***REMOVED***[app].***REMOVED***;
      if (***REMOVED*** && ***REMOVED***[app].customFormat) {
        format = ***REMOVED***[app].customFormat;
      }
    } else {
      if (***REMOVED*** && ***REMOVED***["csv"]) {
        const ***REMOVED*** = ***REMOVED***["csv"].***REMOVED***;
        if (***REMOVED*** && ***REMOVED***["csv"].customFormat) {
          format = ***REMOVED***["csv"].customFormat;
        }
      }
    }

    return format;
  };

  const ***REMOVED*** = () => {
    if (***REMOVED***[app]) {
      return Object.keys(***REMOVED***[app])
        .map((s) => ({ value: s, ...***REMOVED***[app][s] }))
        .filter((m) => m.selected)
        .map((s) => s.value);
    }
    return [];
  };
  const ***REMOVED*** = () => {
    const customLabels = {};
    if (***REMOVED***[app]) {
      const ***REMOVED*** = Object.keys(***REMOVED***[app])
        .map((s) => ({ value: s, ...***REMOVED***[app][s] }))
        .filter((m) => m.selected && m.***REMOVED***);
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
  let userMeasures = ***REMOVED***();
  let leftLegendForSelectedMeasure = left;
  let rightLegendForSelectedMeasure = rightLegend;

  /*Decoding tooltip string*/
  let tooltipForSelectedMeasure = decode(tooltip);

  if (***REMOVED***) {
    const selected = Object.keys(***REMOVED***[app].measures)
      .map((s) => ({ value: s, ...***REMOVED***[app].measures[s] }))
      .filter((m) => m.selected)
      .map((s) => s.value);
    ***REMOVED*** = ***REMOVED***;
    ***REMOVED*** = selected;
    ***REMOVED*** = ***REMOVED***();

    leftLegendForSelectedMeasure = ***REMOVED***.leftTitle;
    rightLegendForSelectedMeasure = ***REMOVED***.rightTitle;
    if (***REMOVED***.customTooltip) {
      tooltipForSelectedMeasure = ***REMOVED***.customTooltip;
    }
  }

  let numberFormat = ***REMOVED***
    ? {
        style:
          ***REMOVED***.style === "compacted"
            ? "decimal"
            : ***REMOVED***.style,
        notation: ***REMOVED***.style === "compacted" ? "compact" : "standard",
        currency: ***REMOVED***.currency,
        minimumFractionDigits: parseInt(***REMOVED***.minimumFractionDigits),
        maximumFractionDigits: parseInt(***REMOVED***.maximumFractionDigits),
      }
    : {
        notation: "standard",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };

  const ***REMOVED*** = ***REMOVED***();

  const groupTotalFormatObject = parse(***REMOVED***);

  let groupTotalFormatParsed = {
    style:
      groupTotalFormatObject.style === "compacted"
        ? "decimal"
        : groupTotalFormatObject.style,
    notation:
      groupTotalFormatObject.style === "compacted" ? "compact" : "standard",
    currency: groupTotalFormatObject.currency,
    minimumFractionDigits: parseInt(
      groupTotalFormatObject.minimumFractionDigits
    ),
    maximumFractionDigits: parseInt(
      groupTotalFormatObject.maximumFractionDigits
    ),
  };
  const [mode, setMode] = useState(editMode);
  const viewMode = editing ? editMode : mode;
  const colors = {
    scheme: scheme,
    colorBy: colorBy,
  };
  let child = null;
  const contentHeight = editing ? height - 80 : height;

  const ***REMOVED*** = () => {
    if (isMobileConfigEnabled) {
      if (***REMOVED***?.***REMOVED***) {
        return bottom;
      } else {
        return "";
      }
    }
    return bottom;
  };

  const ***REMOVED*** = () => {
    if (isMobileConfigEnabled) {
      if (***REMOVED***?.***REMOVED***) {
        return leftLegendForSelectedMeasure;
      } else {
        return "";
      }
    }
    return leftLegendForSelectedMeasure;
  };

  const ***REMOVED*** = () => {
    if (isMobileConfigEnabled) {
      if (***REMOVED***?.***REMOVED***) {
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
    right: ***REMOVED***(),
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
    if (***REMOVED***?.***REMOVED***) {
      return switchLayout();
    }
    return layout;
  };


  const ***REMOVED*** = (mobileEnabled, mobileSetting, defaultValue) => {
    return mobileEnabled
      ? parseInt(mobileSetting) ?? defaultValue
      : defaultValue;
  };

  const getBarPadValueOuterOrInner = (
    mobileEnabled,
    mobileSetting,
    defaultValue
  ) => {
    return mobileEnabled ? mobileSetting ?? defaultValue : defaultValue;
  };

  useEffect(() => {
    const ***REMOVED*** = () => {
      ***REMOVED***(window.innerWidth <= 1250);
      ***REMOVED***(***REMOVED***());
    };
    window.***REMOVED***("resize", ***REMOVED***);
    return () => {
      window.***REMOVED***("resize", ***REMOVED***);
    };
  }, []);

  const chartProps = {
    app,
    tickColor: ***REMOVED***(tickColor),
    tickRotation: ***REMOVED***,
    layout: isMobileConfigEnabled ? mobileLayout() : layout,
    reverse: reverse == true || reverse == "true",
    showLegends: showLegends == true || showLegends == "true",
    legendLabel,
    swap: swap == true || swap == "true",
    showGrid: showGrid == true || showGrid == "true",

    marginLeft: ***REMOVED***(
      isMobileConfigEnabled,
      parseInt(***REMOVED***?.marginLeft),
      parseInt(marginLeft)
    ),
    marginTop: ***REMOVED***(
      isMobileConfigEnabled,
      parseInt(***REMOVED***?.marginTop),
      parseInt(marginTop)
    ),
    marginRight: ***REMOVED***(
      isMobileConfigEnabled,
      parseInt(***REMOVED***?.marginRight),
      parseInt(marginRight)
    ),
    marginBottom: ***REMOVED***(
      isMobileConfigEnabled,
      parseInt(***REMOVED***?.marginBottom),
      parseInt(marginBottom)
    ),
    height: `${contentHeight}px`,
    ***REMOVED***: ***REMOVED*** ? "bottom" : ***REMOVED***,
    legends,
    tooltip:
      tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true"
        ? tooltipForSelectedMeasure
        : tooltipForSelectedMeasure
            .replace(/\r\n/g, "<hr/>")
            .replace(/[\r\n]/g, "<hr/>"),
    colors: colors,
    groupMode: groupMode,
    format: numberFormat,
    startAngle,
    endAngle,
    offsetY, // ***REMOVED***,
    // lineColor: ***REMOVED***(lineColor),
    // lineTooltip,
    // lineTitle,
    maxValue,
    valueScale,
    categories,
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    overlays: overlays ? parse(overlays) : [],
    barColor: ***REMOVED***(barColor),
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    fixedMinValue,
    fixedMaxValue,
    barPadding: getBarPadValueOuterOrInner(
      isMobileConfigEnabled,
      ***REMOVED***?.barPadding,
      barPadding
    ),
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***: getBarPadValueOuterOrInner(
      isMobileConfigEnabled,
      ***REMOVED***?.***REMOVED***,
      ***REMOVED***
    ),
    xLabelColor: ***REMOVED***(xLabelColor),
    barLabelColor: ***REMOVED***(barLabelColor),
    ***REMOVED***: ***REMOVED***(***REMOVED***),
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    ***REMOVED***:
      ***REMOVED*** == true || ***REMOVED*** == "true",
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
    groupTotalFixedPosition:
      groupTotalFixedPosition == true || groupTotalFixedPosition == "true",
    centerLabel,
    showArcLabels: showArcLabels == true || showArcLabels == "true",
    ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
    slicePadding,
    centerLabelFontWeight,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    userMeasures,
    tooltipEnableMarkdown:
      tooltipEnableMarkdown == true || tooltipEnableMarkdown == "true",
    ***REMOVED***: isMobileConfigEnabled
      ? ***REMOVED***.***REMOVED*** ?? ***REMOVED***
      : ***REMOVED***,
    ***REMOVED***: isMobileConfigEnabled
      ? ***REMOVED***.***REMOVED*** ?? ***REMOVED***
      : ***REMOVED***,
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
    ***REMOVED***:
      ***REMOVED*** == true || ***REMOVED*** == "true",
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    dimension1
  };

  let params = {};
  const ff = parse(filters) || {};

  if (ff && ff.forEach) {
    ff.forEach((f) => {
      if (
        f.value != null &&
        f.value.filter((v) => v != null && v.toString().trim() != "").length > 0
      )
        params[f.param] = f.value;
    });
  }

  let ***REMOVED*** = null;
  let Chart = null;

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
        //TODO RADAR
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
      Chart = Bar;
      showNotEnoughParameters =
        app != "csv" && dimension1 == "none" && ***REMOVED***.length == 0;
      break;
    case "line":
      Chart = Line;
      showNotEnoughParameters =
        app !== "csv" && (***REMOVED***.length === 0 || dimension1 === "none");
      break;
    case "pie":
      showNotEnoughParameters = app != "csv" && ***REMOVED***.length == 0;
      Chart = HalfPie;
      break;
    case "radar":
      showNotEnoughParameters = app != "csv" && ***REMOVED***.length == 0;
      Chart = Radar;
      break;
    default:
      Chart = <div>No Chart</div>;
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
  const [orientation, ***REMOVED***] = useState(***REMOVED***());

  function ***REMOVED***() {
    return (
      window.screen.orientation?.type ||
      (window.innerWidth > window.innerHeight
        ? "landscape-primary"
        : "portrait-primary")
    );
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (***REMOVED***) {
        // Function to handle margin adjustment for all charts
        const adjustDataSourceMargin = () => {
          const ***REMOVED*** =
            ref.current.querySelector(
              ".legends.container.has-standard-12-font-size.bottom"
            ) || ref.current.querySelector(".legends.container.items-section");

          if (!***REMOVED***) return;

          // Get computed style and dimensions of the legends container
          const { clientHeight: height } = ***REMOVED***;
          const styles = window.***REMOVED***(***REMOVED***);
          const marginTop = parseInt(styles.marginTop);
          const marginBottom = parseInt(styles.marginBottom);
          const paddingTop = parseInt(styles.paddingTop);
          const paddingBottom = parseInt(styles.paddingBottom);
          const totalHeight =
            height + marginTop + marginBottom + paddingTop + paddingBottom;

          // Find the closest '.ui.fluid.container.content' ancestor from the legends container
          const container = ***REMOVED***.closest(
            ".ui.fluid.container.content"
          );

          if (container) {
            const ***REMOVED*** = container.querySelector(".data-source");
            if (***REMOVED***) {
              const ***REMOVED*** =
                ***REMOVED***.getBoundingClientRect();
              const legendsRect = ***REMOVED***.getBoundingClientRect();

              // Ensure elements are visible before adjusting margins
              if (legendsRect.bottom !== 0 && ***REMOVED***.top !== 0) {
                if (***REMOVED***.textContent.trim() === "") return;

                const ***REMOVED*** = marginBottom; // Legend margin-bottom is already computed
                const adjustedLegendsBottom =
                  legendsRect.bottom + ***REMOVED***;
                const ***REMOVED*** =
                  window.***REMOVED***(***REMOVED***);
                const ***REMOVED*** =
                  parseFloat(***REMOVED***.marginTop) || 0;
                const adjustedDataSourceTop =
                  ***REMOVED***.top - ***REMOVED***;

                if (adjustedLegendsBottom > adjustedDataSourceTop) {
                  let overlap = adjustedLegendsBottom - adjustedDataSourceTop;
                  if (overlap < 5) overlap += 1;
                  ***REMOVED***.style.marginTop = `${overlap + 1}px`; // Add padding
                }
              } else {
                // Delay adjustment if elements are not fully visible yet
                setTimeout(() => {
                  if (***REMOVED***.top < legendsRect.bottom) {
                    ***REMOVED***.style.marginTop = `${
                      legendsRect.bottom - ***REMOVED***.top + 1
                    }px`;
                  }
                }, 1000);
              }
            }
          }

          // Check for overlap with the chart container above
          const ***REMOVED*** = ***REMOVED***.closest(".chart.container");
          if (***REMOVED***) {
            const ***REMOVED*** = ***REMOVED***.getBoundingClientRect();
            const ***REMOVED*** =
              window.***REMOVED***(***REMOVED***);
            const chartContainerMarginBottom =
              parseFloat(***REMOVED***.marginBottom) || 0;
            const adjustedChartContainerBottom =
              ***REMOVED***.bottom + chartContainerMarginBottom;

            const legendsRect = ***REMOVED***.getBoundingClientRect();
            const ***REMOVED*** = parseFloat(styles.marginTop) || 0;
            const ***REMOVED*** = legendsRect.top - ***REMOVED***;

            if (***REMOVED*** < adjustedChartContainerBottom) {
              const overlap = adjustedChartContainerBottom - ***REMOVED***;
              ***REMOVED***.style.marginTop = `${overlap + 1}px`; // Add padding
            }
          }

          setLegendsContainerHeight(totalHeight);
        };

        adjustDataSourceMargin();
      }
    }, 100);

    // Cleanup observer and timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, [***REMOVED***, ref]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        ***REMOVED***(***REMOVED***());
      }, 100);
    };
    if (window.screen.orientation) {
      window.screen.orientation.***REMOVED***("change", handleResize);
    } else {
      window.***REMOVED***("resize", handleResize);
    }
    return () => window.***REMOVED***("resize", handleResize);
  }, []);

  return (
    <div ref={ref} key={orientation}>
      <Container
        className={"chart container"}
        style={{
          minHeight:
            type === "pie" && window.innerWidth <= 480
              ? `${parseInt(height) + parseInt(legendsContainerHeight) * 0.5}px`
              : `${parseInt(height) + parseInt(legendsContainerHeight)}px`,
        }}
        fluid={true}
      >
        <DataProvider
          editing={editing}
          style={{ height: `${contentHeight}px` }}
          params={params}
          app={app}
          group={group}
          csv={csv}
          store={[app, unique, ...dimensions]}
          source={dimensions.join("/")}
        >
          <Container
            style={{ height: `${contentHeight}px` }}
            className={"body"}
            fluid={true}
          >
            {showNotEnoughParameters && <Messages editing={editing}></Messages>}
            {!showNotEnoughParameters && (
              <DataConsumer>
                <Messages app={app} group={group} noDataMsg={noDataMsg}>
                  {" "}
                </Messages>
                <***REMOVED***
                  locale={locale}
                  colorBy={colorBy}
                  hiddenBars={hiddenBars}
                  swap={swap === "true" || swap === true}
                  type={type}
                  includeTotal={true}
                  ***REMOVED***={
                    ***REMOVED*** === true || ***REMOVED*** === "true"
                  }
                  overallLabel={overallLabel}
                  measures={***REMOVED***}
                  dimensions={[...dimensions]}
                  sort={sort}
                  sortreverse={sortReverse === true || sortReverse === "true"}
                  ***REMOVED***={***REMOVED***}
                  customLabels={***REMOVED***()}
                >
                  <ColorProvider
                    type={type}
                    app={app}
                    locale={locale}
                    overallLabel={overallLabel}
                    customLabels={***REMOVED***()}
                    manualColors={***REMOVED***()}
                    colorBy={colorBy}
                    scheme={scheme}
                    barColor={chartProps.barColor}
                  >
                    <Chart {...chartProps}></Chart>
                  </ColorProvider>
                </***REMOVED***>
              </DataConsumer>
            )}
          </Container>
        </DataProvider>

        <br />
        {dual && childContent && viewMode === "info" && (
          <Container
            fluid={true}
            style={{ height: contentHeight + "px" }}
            className={"body"}
          >
            <PostContent
              post={{ content: { rendered: childContent } }}
            ></PostContent>
          </Container>
        )}
      </Container>
    </div>
  );
};

const ***REMOVED*** = (state, ownProps) => {
  const { "data-app": app, "data-group": group } = ownProps;
  const ***REMOVED*** = state.getIn(["data", "measures", app, group]);
  if (***REMOVED***) {
    return {
      ***REMOVED***: ***REMOVED***,
    };
  } else {
    return {};
  }
};
const ***REMOVED*** = {};
export default connect(***REMOVED***, ***REMOVED***)(injectIntl(Chart));
