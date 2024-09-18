import { ***REMOVED***, injectIntl } from "react-intl";
import * as d3 from "d3"; // d3 plugin
import {
  Container,
  Grid,
  Icon,
  Popup,
  Dimmer,
  Loader,
  Segment,
} from "semantic-ui-react";
import React from "react";
import * as topojson from "topojson";
import Legend from "./legend";
import { formatContent } from "../common/MapTooltip";
import ***REMOVED*** from '../../utils/deviceType';

const geoStats = require("geostats");
const COLOR_VARIABLE = "_Color_";
const LOCATION = "location";
const SHOW_ALL = "showAll";
const SHOW_IF_HAS_DATA = "ifUnitHasData";
const MAX_LABEL_LEN = 10;

const breakpoints = {
  mobile: {
      min: 320,
      max: 480
  },
  tablet: {
      min: 481,
      max: 768
  },
  midTablet: {
      min: 769,
      max: 852,
  },
  laptop: {
      min: 852,
      max: 1024
  },
  desktop: {
      min: 1025,
      max: 1365
  },
  wide: {
      min: 1366,
      max: Infinity
  }
};


const ***REMOVED*** = {
  'mobile': 4,
  'tablet': 4,
  'midTablet': 2,
  'laptop': 2,
  'desktop': 2,
  'wide': 2
}

const ***REMOVED*** = {
  'mobile': 330,
  'tablet': 250,
  'midTablet': 250,
  'laptop': 200,
  'desktop': 100,
  'wide': 100
}

const ***REMOVED*** = {
  'mobile': 250,
  'tablet': 250,
  'midTablet': 250,
  'laptop': 0,
  'desktop': 0,
  'wide': 0
}


const colorSchemes = {
  greens: [
    "#ccffdd",
    "#b3ffcc",
    "#99ffbb",
    "#80ffaa",
    "#66ff99",
    "#4dff88",
    "#33ff77",
    "#1aff66",
    "#00ff55",
    "#00e64d",
  ],
  greys: [
    "#f2f2f2",
    "#e6e6e6",
    "#d9d9d9",
    "#cccccc",
    "#bfbfbf",
    "#b3b3b3",
    "#a6a6a6",
    "#999999",
    "#8c8c8c",
    "#808080",
  ],
  oranges: [
    "#fff0e6",
    "#ffe0cc",
    "#ffd1b3",
    "#ffc299",
    "#ffb380",
    "#ffa366",
    "#ff944d",
    "#ff8533",
    "#ff751a",
    "#ff6600",
  ],
  purples: [
    "#ffe6ff",
    "#ffccff",
    "#ffb3ff",
    "#ff99ff",
    "#ff80ff",
    "#ff66ff",
    "#ff4dff",
    "#ff33ff",
    "#ff1aff",
    "#ff00ff",
  ],
  reds: [
    "#ffe6e6",
    "#ffcccc",
    "#ffb3b3",
    "#ff9999",
    "#ff8080",
    "#ff6666",
    "#ff4d4d",
    "#ff3333",
    "#ff1a1a",
    "#ff0000",
  ],
  blues: [
    "#e6eeff",
    "#ccddff",
    "#b3ccff",
    "#99bbff",
    "#80aaff",
    "#6699ff",
    "#4d88ff",
    "#3377ff",
    "#1a66ff",
    "#0055ff",
  ],
};


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapContainer = React.createRef();

    this.state = { mainLayer: null, layers: null };

    this.classColor = this.classColor.bind(this);

    this.featuresZoom = this.featuresZoom.bind(this);
    this.fullView = this.fullView.bind(this);

    this.onZoomIn = this.onZoomIn.bind(this);
    this.onZoomOut = this.onZoomOut.bind(this);
    this.onReset = this.onReset.bind(this);

    this.onClick = this.onClick.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.***REMOVED*** = this.***REMOVED***.bind(this);
    this.d3Map = this.d3Map.bind(this);
    this.getFeatures = this.getFeatures.bind(this);
    this.***REMOVED*** = this.***REMOVED***.bind(this);
    this.getMapId = this.getMapId.bind(this);
    this.zoomed = this.zoomed.bind(this);
    this.zoomEnd = this.zoomEnd.bind(this);
    this.drawPoints = this.drawPoints.bind(this);
    this.***REMOVED*** = this.***REMOVED***.bind(this);
    this.getLayers = this.getLayers.bind(this);

    this.onPointClick = this.onPointClick.bind(this);
    this.***REMOVED*** = this.***REMOVED***.bind(this);
    this.getCenter = this.getCenter.bind(this);

    //map variables
    this.mapPosition = null;
    this.zooming = false;
    this.***REMOVED*** = ***REMOVED***[***REMOVED***()]
    this.projection = d3
      .geoMercator()
      .scale(props.scale)
      .center(props.center) // centers map at given coordinates
      .translate([this.getWidth() / this.***REMOVED***, this.getHeight() / 2]);
    this.path = d3.geoPath().projection(this.projection);
    this.zoom = d3
      .zoom()
      .scaleExtent([1, 16])
      .on("zoom", this.zoomed)
      .on("end", this.zoomEnd);

    this.centered = null;
    this.state = {
      ***REMOVED***:
        props.***REMOVED*** &&
        props.***REMOVED***.measures &&
        props.***REMOVED***.measures.length > 1
          ? props.***REMOVED***.measures[0]
          : null,
      ***REMOVED***: [],
      ***REMOVED***: null,
      layersLoading: false,
    };
  }

  ***REMOVED***() {
    window.***REMOVED***('scroll', this.handleScroll, { passive: true });
    window.***REMOVED***('touchmove', this.handleScroll, { passive: true });
    this.loadLayers();
    this.tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden");
  }

  ***REMOVED***(error, info) {
    console.log(error);
  }


handleScroll = () => {
  // adds debounce to scroll to prevent event from rerendering the map too often
  let scrollTimeout = null;
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const labelsExist = d3.select(this.getMapId()).selectAll(".map-labels-container").size() > 0;
    if (!labelsExist) {
      this.***REMOVED***(this.getFeatures(), false);
    }
  }, 300);
}


***REMOVED***() {
  window.***REMOVED***('scroll', this.handleScroll);
}

  loadLayers() {
    const { source, mainLayerId, enabledLayers } = this.props;
    this.setState({
      layers: [],
      layersLoading: true,
    });
    if (enabledLayers && enabledLayers.length > 0) {
      const metadataFuncs = [];
      enabledLayers.forEach((l) => {
        metadataFuncs.push(
          new Promise((resolve, reject) => {
            d3.json(process.env.REACT_APP_WP_API + "/wp/v2/media/" + l.id)
              .then((data) => {
                resolve({ id: l.id, url: data.source_url, index: l.index });
              })
              .catch(function (error) {
                resolve({ id: l.id, url: null, index: l.index });
              });
          }),
        );
      });

      Promise.all(metadataFuncs).then((metadata) => {
        const layerFuncs = [];
        metadata.forEach((m) => {
          if (m.url) {
            layerFuncs.push(
              new Promise((resolve, reject) => {
                d3.json(m.url).then((data) => {
                  resolve({ id: m.id, data, index: m.index });
                });
              }),
            );
          }
        });

        Promise.all(layerFuncs).then((layers) => {
          this.setState({
            layers: layers,
            layersLoading: false,
          });
        });
      });
    } else {
      d3.json(source).then((data) => {
        this.setState({
          layers: [{ id: null, url: source, data, index: 0 }],
          layersLoading: false,
        });
      });
    }
  }

  getMainLayer() {
    const layers = this.getLayers();
    const { mainLayerId, enabledLayers } = this.props;
    let layer;
    if (layers) {
      layer =
        layers.filter(
          (layer) => layer.id == mainLayerId || layer.id == null,
        )[0] || layers[0];
    }
    return layer ? layer.data : null;
  }

  ***REMOVED***(prevProps, prevState, snapshot) {
    const { ***REMOVED***, layers, ***REMOVED*** } = this.state;
    const mainLayer = this.getMainLayer();
    const { ***REMOVED***, intl, ***REMOVED***, ***REMOVED*** } =
      this.props;

    const { ***REMOVED***: ***REMOVED*** } = prevProps;

    if (***REMOVED***) {
      const ***REMOVED*** = [];
      const appliedItems = [];
      //Reset zoom when filters is applied
      if (***REMOVED***) {
        Object.keys(***REMOVED***).forEach((k) => {
          ***REMOVED***.push(
            ...***REMOVED***[k].filter(
              (v) => v != Number.MIN_SAFE_INTEGER,
            ),
          );
        });
      }
      if (***REMOVED***) {
        Object.keys(***REMOVED***).forEach((k) => {
          appliedItems.push(
            ...***REMOVED***[k].filter((v) => v != Number.MIN_SAFE_INTEGER),
          );
        });
      }
      //filters reset
      if (***REMOVED***.length > 0 && appliedItems.length == 0) {
        this.onReset();
      }
    }

    this.tooltip.style("visibility", "hidden");

    if (prevProps.enabledLayers.length != this.props.enabledLayers.length) {
      this.loadLayers();
    }

    const features = this.getFeatures();
    if (prevProps.center !== this.props.center) {
      this.mapPosition = null;
      this.projection
        .scale(this.props.scale)
        .center(this.props.center) // centers map at given coordinates
        .translate([this.getWidth() / 2, this.getHeight() / 2]);
    }

    const filterUpdated = this.filterUpdated(prevProps, prevState);
    this.d3Map(features, filterUpdated);
    if (
      layers &&
      ***REMOVED*** &&
      (***REMOVED*** != prevProps.***REMOVED*** ||
        layers != prevState.layers ||
        ***REMOVED*** != prevState.***REMOVED*** ||
        ***REMOVED*** != prevState.***REMOVED*** ||
        mainLayer != prevState.mainLayer ||
        prevProps.mainLayerId !== this.props.mainLayerId ||
        JSON.stringify(prevProps.enabledLayers) !=
          JSON.stringify(this.props.enabledLayers))
    ) {
      this.***REMOVED***(this.getFeatures(), filterUpdated);
    }
  }

  getHeight() {
    return this.props.height;
  }

  getWidth() {
    if (this.mapContainer.current) {
      return this.mapContainer.current.offsetWidth;
    }
    return this.props.width;
  }

  ***REMOVED***(features) {
    var x0, x1, y0, y1;
    for (var x in features) {
      const [[xx0, yy0], [xx1, yy1]] = this.path.bounds(features[x]);
      if (xx0 < x0 || x0 == null) {
        x0 = xx0;
      }

      if (xx1 > x1 || x1 == null) {
        x1 = xx1;
      }

      if (yy0 < y0 || y0 == null) {
        y0 = yy0;
      }

      if (yy1 > y1 || y1 == null) {
        y1 = yy1;
      }
    }
    return [
      [x0, y0],
      [x1, y1],
    ];
  }

  onReset() {
    this.mapPosition = null;
    this.tooltip.style("visibility", "hidden");
    this.fullView();
  }

  resizeLabels() {
    const { labelFontSize, mapLabelField } = this.props;
    // Invert the font size and label box width and height
    const labels = d3
      .select(this.getMapId())
      .select("svg")
      .select("g")
      .selectAll(".map-labels-container");

    labels.each((d, i, nodes) => {
      const label = d3.select(nodes[i]);
      const transform = d3.zoomTransform(label.node());

      const position = this.***REMOVED***(d);
      let boxWidth = this.***REMOVED***(d);
      let boxHeight = this.***REMOVED***(d);

      if (d.properties[mapLabelField]) {
        boxWidth = transform.k > 1 ? boxWidth / transform.k : boxWidth;
        boxHeight = transform.k > 1 ? boxHeight / transform.k : boxHeight;
      }

      label
        .attr("x", position[0] - boxWidth / 2)
        .attr("y", position[1] - (transform.k > 1 ? 10 / transform.k : 10))
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr(
          "font-size",
          (transform.k > 1 ? labelFontSize / transform.k : labelFontSize) +
            "px",
        );
    });
  }

  ***REMOVED***() {
    const { labelFontSize, mapLabelField } = this.props;
    // Invert the font size and label box width and height
    const labels = d3
      .select(this.getMapId())
      .select("svg")
      .select("g")
      .selectAll(".point-labels-container");

    labels.each((d, i, nodes) => {
      const label = d3.select(nodes[i]);
      const transform = d3.zoomTransform(label.node()); // Get the current zoom transform directly

      let boxWidth = this.***REMOVED***(d) + 20;
      boxWidth = transform.k > 1 ? boxWidth / transform.k : boxWidth;
      const position = this.projection([
        d.geometry.coordinates[1],
        d.geometry.coordinates[0],
      ]);

      let adjustment = this.***REMOVED***(d) / 2;
      adjustment = transform.k > 1 ? adjustment / transform.k : adjustment;

      const width = this.***REMOVED***(d) + 30;
      const fontSize =
        transform.k > 1 ? labelFontSize / transform.k : labelFontSize;

      label
        .attr("x", position[0] - boxWidth / 2)
        .attr("y", position[1] - adjustment)
        .attr("width", width)
        .attr("font-size", fontSize + "px");
      // If height adjustment is needed, you can uncomment and adjust the following line similarly
      // .attr("height", height / transform.k);
    });
  }

  resizeCircles(transform) {
    // Invert the radius of circles based on the zoom scale
    const circles = d3
      .select(this.getMapId())
      .select("svg")
      .selectAll("circle");
    circles.attr("r", transform.k > 1 ? 6 / transform.k : 6);
  }

  zoomed(event) {
    this.tooltip.style("visibility", "hidden");
    const transform = event.transform; // Accessing transform from the event
    const g = d3.select(this.getMapId()).select("svg").select("g");
    g.attr("transform", transform);

    this.resizeCircles(transform); // Pass the transform to resizeCircles
    this.resizeLabels(transform); // Pass the transform to resizeLabels
    this.***REMOVED***(transform); // Pass the transform to ***REMOVED***
  }

  zoomEnd(event) {
    const { editing } = this.props;
    const transform = event.transform;
    this.mapPosition = { k: transform.k, x: transform.x, y: transform.y };
    if (editing) {
      var parentWindow = window.parent;
      parentWindow.postMessage(
        { type: "map", value: JSON.stringify(this.mapPosition) },
        "*",
      );
    }
  }

  classColor(d) {
    let { zoomEnabled } = this.props;
    if(!zoomEnabled) {
      zoomEnabled = ['mobile', 'tablet', 'midTablet'].includes(***REMOVED***()) ? true: false;
    }
    if (zoomEnabled) {
      return "active zoom-enabled";
    } else {
      return "active";
    }
  }

  ***REMOVED***(data) {
    const { ***REMOVED***, ***REMOVED***, colorScheme } = this.props;
    const ***REMOVED*** = [];
    if (***REMOVED*** && data && data.length > 0) {
      let parsedData = data
        .filter((d) => d.properties && d.properties.value != null)
        .map((d) => {
          return d.properties.value.toFixed(2);
        });

      let values = [];
      parsedData.forEach((item) => {
        if (item > 0) {
          let floor = item * 0.99;
          let ceil = item * 1.01;
          if (values.indexOf(floor) === -1) {
            values.push(floor);
          }
          if (values.indexOf(ceil) === -1) {
            values.push(ceil);
          }
        }
      });

      const colors = colorSchemes[colorScheme];
      if (values.length > 0) {
        const serie = new geoStats(values);
        serie.setPrecision(2);
        let ***REMOVED*** =
          values.length > 1 ? values.length - 1 : values.length;
        serie.getJenks(Math.min(***REMOVED***, ***REMOVED***));
        serie.ranges.forEach((range, i) => {
          const legendBreak = {};
          let adjustment = 0.01;
          legendBreak.min =
            parseFloat(range.substr(0, range.indexOf("-") - 1)) +
            (i > 0 ? adjustment : 0);
          legendBreak.max = parseFloat(
            range.substr(range.indexOf("-") + 2, range.length),
          );
          legendBreak.color = colors[i];
          ***REMOVED***.push(legendBreak);
        });

        return ***REMOVED***;
      }
    }

    return ***REMOVED***;
  }

  getBreaks() {
    const { legendBreaks, ***REMOVED*** } = this.props;
    if (***REMOVED***) {
      const features = this.getFeatures();
      return this.***REMOVED***(features);
    } else {
      let ***REMOVED*** = legendBreaks;
      if (this.***REMOVED***()) {
        ***REMOVED*** = legendBreaks
          .filter((b) => b.measure === this.***REMOVED***())
          .filter((f) => {
            let result = true;
            if (f.filters && f.filters.length > 0) {
              if (
                this.props.***REMOVED*** &&
                JSON.stringify(this.props.***REMOVED***) !== "{}"
              ) {
                const keys = Object.keys(this.props.***REMOVED***);
                let found = f.filters.filter((filter) => {
                  if (keys.indexOf(filter.field) != -1) {
                    const ***REMOVED*** =
                      this.props.***REMOVED***[filter.field];
                    const ***REMOVED*** = filter.values;
                    return (
                      ***REMOVED***
                        .join(",")
                        .indexOf(***REMOVED***) != -1
                    );
                  }
                  return false;
                });

                return found.length > 0;
              }
            }
            return result;
          });
      }
      return ***REMOVED***;
    }
  }

  fillColor(d, breaks) {
    const { ***REMOVED***, mainLayerId } = this.props;
    let overrideColor;
    if (
      d.properties &&
      d.properties.variables &&
      this.state.***REMOVED*** &&
      d.properties.value != null
    ) {
      let key = COLOR_VARIABLE + this.state.***REMOVED***;
      overrideColor = d.properties.variables[key.trim()];
      if (overrideColor) {
        return overrideColor;
      }
    }
    if (
      d.properties.value != null &&
      ((mainLayerId && d.properties.layerId === mainLayerId) || !mainLayerId)
    ) {
      const breakItem = breaks.find((item) => {
        if (item.min != null && item.max != null) {
          return (
            d.properties.value >= item.min && d.properties.value <= item.max
          );
        }

        if (item.min != null) {
          return d.properties.value >= item.min;
        }

        if (item.max != null) {
          return d.properties.value <= item.max;
        }
      });

      return breakItem && breakItem.color ? breakItem.color : ***REMOVED***;
    }

    const layerProps = this.props.enabledLayers.filter(
      (l) => l.id === d.properties.layerId,
    )[0];
    if (layerProps && layerProps.bgColor && layerProps.bgColor != "undefined") {
      return layerProps.bgColor;
    }

    return ***REMOVED***;
  }

  setValues() {
    const features = this.getFeatures();
    const group = d3.select(this.getMapId()).select("svg").select("g");
    group.selectAll("path").data(features).join("path").attr("d", this.path);
  }

  ***REMOVED***(d) {
    if (d.properties.LABEL_LATITUDE && d.properties.LABEL_LONGITUDE) {
      return this.projection([
        d.properties.LABEL_LONGITUDE,
        d.properties.LABEL_LATITUDE,
      ]);
    } else {
      return this.path.centroid(d);
    }
  }

  ***REMOVED***(features, filterUpdated) {
    const { mapLabelField, symbols, ***REMOVED*** } = this.props;

    const ***REMOVED*** = [
      ...features.filter((f) => {
        return ***REMOVED*** != f.properties[mapLabelField];
      }),
      ...features.filter((f) => {
        return ***REMOVED*** == f.properties[mapLabelField];
      }),
    ];

    this.drawPolygons(***REMOVED***);
    this.drawLabels(***REMOVED***);
    this.drawPoints(***REMOVED***, filterUpdated);
    if (symbols.length > 0) {
      this.addSymbols(symbols, ***REMOVED***);
    }
  }

  drawLabels(***REMOVED***) {
    const {
      mapLabelField,
      ***REMOVED***,
      intl,
      valueFormat,
      ***REMOVED***,
      ***REMOVED***,
      ***REMOVED***,
      labelFontSize,
      ***REMOVED***,
      mapType,
      noDataText,
      ***REMOVED***,
    } = this.props;
    const group = d3.select(this.getMapId()).select("svg").select("g");
    const labelsExist = group.selectAll(".map-labels-container").size() > 0;
    if (labelsExist) {
      console.log("Labels already exist, skipping redraw...");
      return; // Skip redrawing if labels are already present
    }

    group
      .selectAll(".map-labels")
      .data(
        ***REMOVED***.filter((f) => {
          if (***REMOVED*** && ***REMOVED***.length > 0) {
            return !***REMOVED***.includes(f.properties[mapLabelField]);
          }
          return true;
        }),
      )
      .enter()
      .append("foreignObject")
      .attr("class", "map-labels-container")
      .attr("x", (d) => {
        const position = this.***REMOVED***(d);
        if (d.properties[mapLabelField]) {
          const boxWidth = this.***REMOVED***(d);
          return position[0] - boxWidth / 2;
        } else {
          return position[0];
        }
      })
      .attr("y", (d) => {
        const position = this.***REMOVED***(d);
        return position[1] - 10;
      })
      .attr("width", (d) => this.***REMOVED***(d))
      .attr("height", (d) => this.***REMOVED***(d))
      .attr("font-size", (d, i) => labelFontSize + "px")
      .attr("overflow", "visible")
      .attr("opacity", 1)
      .style("display", (d) => {
        if (
          ***REMOVED*** == SHOW_ALL ||
          (***REMOVED*** == SHOW_IF_HAS_DATA && d.properties.hasDataRow)
        ) {
          return "block";
        } else {
          return "none";
        }
      })
      .attr("pointer-events", mapType == "POINTS_MAP" ? "none" : "all")
      .on("mouseover", this.showTooltip)
      .on("mousemove", this.mousemove)
      .on("mouseout", this.mouseout)
      .append("xhtml:div")
      .style("color", (d, i) => ***REMOVED***)
      .style("font-weight", (d) => ***REMOVED***)
      .style("background-color", (d) => {
        if (d.properties.hasDataRow && ***REMOVED***) {
          if (
            d.properties.value != null ||
            (d.properties.value == null && ***REMOVED***)
          ) {
            return "#fff6e1";
          }
        }

        return "none";
      })
      .style("border-radius", (d) => "4px")
      .style("line-height", "95%")
      .style("text-align", "center")
      .html((d, i) => {
        return this.createLabel(d);
      });
  }

  createLabel(d) {
    const {
      mapLabelField,
      ***REMOVED***,
      intl,
      valueFormat,
      ***REMOVED***,
      ***REMOVED***,
      noDataText,
    } = this.props;

    let label = "";
    if (
      ***REMOVED*** == SHOW_ALL ||
      (***REMOVED*** == SHOW_IF_HAS_DATA && d.properties.hasDataRow)
    ) {
      label = d.properties[mapLabelField];
      let abbrev = d.properties["abbrev"];
      if (label && label.length > MAX_LABEL_LEN && abbrev) {
        label = abbrev;
      }

      if (***REMOVED***) {
        if (d.properties.value != null) {
          const variables = d.properties.variables || {};
          label +=
            "<br><span class='map-label-value'>" +
            formatContent(
              valueFormat,
              {
                value: d.properties.value,
                measure: this.***REMOVED***(),
                ...variables,
              },
              intl,
            ) +
            "</span>";
        } else {
          if (
            ***REMOVED*** == true &&
            d.properties.value == null &&
            d.properties.hasDataRow
          ) {
            label +=
              "<br><span class='map-label-value'>" + noDataText + "</span>";
          }
        }
      }
    }

    return label;
  }

  drawPolygons(***REMOVED***) {
    const {
      mapLabelField,
      ***REMOVED***,
      mapFocusBoundaryColor,
      ***REMOVED***,
    } = this.props;

    const breaks = this.getBreaks();
    const group = d3.select(this.getMapId()).select("svg").select("g");

    const polygons = ***REMOVED***.filter(
      (f) =>
        f.geometry &&
        f.geometry &&
        (f.geometry.type == "Polygon" || f.geometry.type == "MultiPolygon"),
    );

    if (polygons.length > 0) {
      group
        .selectAll("path")
        .data(polygons)
        .join("path")
        .attr("d", this.path)
        .attr("fill", (d) => this.fillColor(d, breaks))
        .attr("stroke-width", (d) => {
          if (***REMOVED*** == d.properties[mapLabelField]) {
            return 1.2;
          } else {
            return 0.4;
          }
        })
        .attr("stroke", (d) => {
          if (***REMOVED*** == d.properties[mapLabelField]) {
            return mapFocusBoundaryColor;
          } else {
            return ***REMOVED***;
          }
        })
        .on("click", this.***REMOVED***);
    }
  }

  drawPoints(***REMOVED***, filterUpdated) {
    const {
      intl,
      ***REMOVED***,
      ***REMOVED***,
      ***REMOVED***,
      ***REMOVED***,
      ***REMOVED***,
      ***REMOVED***,
      noDataText,
      showShadingLayerLabels,
    } = this.props;

    const group = d3.select(this.getMapId()).select("svg").select("g");
    let ***REMOVED*** = [];
    if (***REMOVED***.pointsData) {
      let ***REMOVED*** = this.state.***REMOVED***;
      if (
        filterUpdated &&
        ***REMOVED*** &&
        ***REMOVED***[***REMOVED***]
      ) {
        ***REMOVED*** = ***REMOVED***[***REMOVED***];
      }

      ***REMOVED*** = ***REMOVED***.pointsData
        .filter((p) => p.lat && p.lng && p.label == ***REMOVED***)
        .map((p) => {
          return {
            properties: {
              label: p.label,
              lat: p.lat,
              lng: p.lng,
              value: p.value,
              variables: p.variables,
            },
          };
        });

      group
        .selectAll(".circle")
        .data(***REMOVED***)
        .enter()
        .append("circle")
        .attr("id", (d, i) => {
          return "circle" + i;
        })
        .attr("cx", (d) => {
          const position = this.projection([
            d.properties.lng,
            d.properties.lat,
          ]);
          return position[0];
        })
        .attr("cy", (d) => {
          const position = this.projection([
            d.properties.lng,
            d.properties.lat,
          ]);
          return position[1];
        })
        .attr("r", (d, i) => {
          return 2;
        })
        .style("stroke-width", 0.5)
        .style("fill", (d, i) => {
          return ***REMOVED***;
        })
        .on("mouseover", (d, i) => this.onPointClick(d, i))
        .on("mouseout", this.mouseout);
    }

    const breaks = this.getBreaks();
    let points = [];
    if (showShadingLayerLabels == SHOW_ALL) {
      points = ***REMOVED***.filter(
        (f) => f.geometry && f.geometry.type == "Point",
      );
    } else if (showShadingLayerLabels == SHOW_IF_HAS_DATA) {
      points = ***REMOVED***.filter(
        (p) =>
          p.geometry && p.geometry.type == "Point" && p.properties.hasDataRow,
      );
    }

    if (points.length > 0) {
      group
        .selectAll(".point-labels")
        .data(points)
        .enter()
        .append("foreignObject")
        .attr("id", (d, i) => {
          return "point-label" + i;
        })
        .attr("class", "point-labels-container")
        .attr("x", (d) => {
          const width = this.***REMOVED***(d) + 20;
          const position = this.projection([
            d.geometry.coordinates[1],
            d.geometry.coordinates[0],
          ]);
          return position[0] - width / 2;
        })
        .attr("y", (d) => {
          const position = this.projection([
            d.geometry.coordinates[1],
            d.geometry.coordinates[0],
          ]);
          return position[1] - this.***REMOVED***(d) / 2;
        })
        .attr("width", (d) => this.***REMOVED***(d) + 20)
        .attr("height", (d) => "1px")
        .attr("overflow", "visible")
        .attr("font-size", "12px")
        .style("opacity", 1)
        .append("xhtml:div")
        .style("color", (d, i) => ***REMOVED***)
        .style("font-weight", (d) => "bold")
        .style("background-color", (d) => this.fillColor(d, breaks))
        .style("padding", (d) => "5px 3px 5px 3px")
        .style("border-radius", (d) => "4px")
        .style("line-height", "100%")
        .style("text-align", "center")
        .html((d, i) => {
          return formatContent(
            ***REMOVED***,
            {
              value: d.properties.value,
              locationName: d.properties[this.props.mapLabelField],
            },
            intl,
            noDataText,
          );
        })
        .on("mouseover", (event, d, i) => {
          d3.select(this.getMapId())
            .select("svg")
            .select("g")
            .select("#point-label" + i)
            .raise();
          this.showTooltip(event, d);
        })
        .on("mousemove", this.mousemove)
        .on("mouseout", this.mouseout);
    }
  }

  addSymbols(symbols, features) {
    const { mappingField } = this.props;
    const group = d3.select(this.getMapId()).select("svg").select("g");
    symbols.forEach((symbol) => {
      if (symbol.field && symbol.image && symbol.values) {
        let filteredFeaturesWithGpsCoords = features.filter((f) => {
          let fieldName = LOCATION == symbol.field ? mappingField : "value";
          let fiedValue =
            (f.properties[fieldName] ||
              (f.properties.variables
                ? f.properties.variables[fieldName]
                : "")) + "";
          let valuesToMatch = symbol.values + "";
          let ***REMOVED*** = valuesToMatch.split(",");
          return (
            f.properties.LATITUDE &&
            f.properties.LONGITUDE &&
            ***REMOVED***.filter(
              (v) => v.trim().toLowerCase() == fiedValue.trim().toLowerCase(),
            ).length > 0
          );
        });

        let filteredFeaturesNoCoords = features.filter((f) => {
          let fieldName = LOCATION == symbol.field ? mappingField : "value";
          let fiedValue =
            (f.properties[fieldName] ||
              (f.properties.variables
                ? f.properties.variables[fieldName]
                : "")) + "";
          let valuesToMatch = symbol.values + "";
          let ***REMOVED*** = valuesToMatch.split(",");
          return (
            !f.properties.LATITUDE &&
            !f.properties.LONGITUDE &&
            ***REMOVED***.filter(
              (v) => v.trim().toLowerCase() == fiedValue.trim().toLowerCase(),
            ).length > 0
          );
        });

        // if feature has lat and long, use that to position the symbol
        group
          .selectAll("image")
          .data(filteredFeaturesWithGpsCoords)
          .enter()
          .append("image")
          .attr("width", 40)
          .attr("height", 40)
          .attr("class", "map-symbol")
          .attr("xlink:href", "/" + symbol.image)
          .attr("transform", (d) => {
            return (
              "translate(" +
              this.projection([d.properties.LONGITUDE, d.properties.LATITUDE]) +
              ")"
            );
          })
          .on("mouseover", this.showTooltip)
          .on("mousemove", this.mousemove)
          .on("mouseout", this.mouseout);

        // if feature does not have lat and long, use the centroid to position the symbol
        group
          .selectAll("image")
          .data(filteredFeaturesNoCoords)
          .enter()
          .append("image")
          .attr("width", 40)
          .attr("height", 40)
          .attr("class", "map-symbol")
          .attr("xlink:href", "/" + symbol.image)
          .attr("x", (d) => {
            return this.path.centroid(d)[0] - 20;
          })
          .attr("y", (d) => {
            return this.path.centroid(d)[1];
          })
          .on("mouseover", this.showTooltip)
          .on("mousemove", this.mousemove)
          .on("mouseout", this.mouseout);
      }
    });
  }

  ***REMOVED***() {
    const { ***REMOVED*** } = this.props;
    if (***REMOVED***) {
      return 30;
    }

    return 25;
  }

  ***REMOVED***(d) {
    const { mapLabelField } = this.props;
    const defaultLength = 80;
    if (d.properties[mapLabelField]) {
      const textLength = d.properties[mapLabelField].length;
      if (textLength < 10) {
        return defaultLength;
      }
      return textLength * 8;
    }

    return 0;
  }

  featuresZoom(fs, immediate, callback) {
    const svg = d3.select(this.getMapId()).select("svg");
    const bounds = this.***REMOVED***(fs);
    const [[x0, y0], [x1, y1]] = bounds;
    const width = this.getWidth();
    const height = this.getHeight();
    const scale = Math.min(
      8,
      0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height),
    );
    const translate = [width / 2 - (x0 + x1) / 2, height / 2 - (y0 + y1) / 2];

    if (immediate) {
      svg.call(
        this.zoom.transform,
        d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale),
      );
    } else {
      svg
        .transition()
        .duration(450)
        .call(
          this.zoom.transform,
          d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale),
        )
        .on("end", callback);
    }
  }

  fullView() {
    const { mapPosition, editing } = this.props;
    const svg = d3.select(this.getMapId()).select("svg");

    // Clear 'background' class from active paths
    const paths = svg.select("g").selectAll(".active");
    paths.attr("class", function () {
      return d3
        .select(this)
        .attr("class")
        .replace(/background/gi, "");
    });

    // Determine the transform based on whether mapPosition is defined and editing is false
    let ***REMOVED*** = d3.zoomIdentity;
    if (mapPosition && !editing) {
      ***REMOVED*** = ***REMOVED***
        .translate(mapPosition.x, mapPosition.y)
        .scale(mapPosition.k);
    } else {
      ***REMOVED*** = ***REMOVED***.translate(0, 0).scale(1);
    }

    svg.transition().duration(300).call(this.zoom.transform, ***REMOVED***);
  }

  showTooltip(event, d) {
    let {
      showTooltip,
      zoomEnabled,
      tooltipTheme,
      ***REMOVED***,
      ***REMOVED***,
      tooltipFormat,
      intl,
      mappingField,
      ***REMOVED***,
      fields,
      mapType,
      noDataText,
    } = this.props;

    zoomEnabled = ['mobile', 'tablet', 'midTablet'].includes(***REMOVED***()) ? true: false;

    if (
      (showTooltip && d.properties.value != null) ||
      (showTooltip && ***REMOVED***)
    ) {
      const svg = d3.select(this.getMapId()).select("svg");
      const elements = svg.select("g").selectAll(".active");
      elements.attr("class", (p) => {
        if (p.properties[mappingField] === d.properties[mappingField]) {
          return "focus" + (zoomEnabled ? " zoom-enabled" : "");
        } else {
          return "active" + (zoomEnabled ? " zoom-enabled" : "");
        }
      });

      const format =
        tooltipFormat || "{locationName} %({value},2) \n {label}: %({value},2)";
      const dataVars = d.properties.variables || {};

      const variables = {
        ...d.properties,
        value: d.properties.value,
        measure: this.***REMOVED***(),
        measureLabel: d.properties.measureLabel,
        locationName: d.properties[mappingField],
        ...dataVars,
      };
      this.tooltip
        .attr("class", tooltipTheme)
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("visibility", "visible")
        .html((e) => {
          let html = `<div style='font-size:${***REMOVED***}px;' class='tooltip-content' >`;
          if (d.properties.value != null) {
            const lines = format.split("\n");
            let headerFormat = lines[0];
            let overallFormat = lines.length > 1 ? lines[1] : null;
            let ***REMOVED*** = 1;
            let ***REMOVED***;
            if (fields.length > 1 && mapType != "POINTS_MAP") {
              ***REMOVED*** = lines.length > 2 ? 2 : 1;
              ***REMOVED*** = lines[***REMOVED***];
            } else {
              ***REMOVED*** = null;
            }

            if (headerFormat) {
              html += formatContent(headerFormat, variables, intl, noDataText);
            }
            if (overallFormat) {
              if (!html.endsWith("<hr>")) {
                html += "<hr>";
              }
              html += formatContent(overallFormat, variables, intl, noDataText);
            }
            if (***REMOVED***) {
              if (d.properties.children) {
                d.properties.children.forEach((child, index) => {
                  const vars = {
                    value: child.value,
                    label: child.label,
                    measure: this.***REMOVED***(),
                    measureLabel: d.properties.measureLabel,
                    ...dataVars,
                  };
                  if (!html.endsWith("<hr>")) {
                    html += "<hr>";
                  }
                  html += formatContent(
                    ***REMOVED***,
                    vars,
                    intl,
                    noDataText,
                  );
                });
              }
            }

            if (lines.length > ***REMOVED*** + 1) {
              if (!html.endsWith("<hr>")) {
                html += "<hr>";
              }
              lines.forEach((line, index) => {
                if (index > ***REMOVED***) {
                  if (!html.endsWith("<hr>")) {
                    html += "<hr>";
                  }
                  html += formatContent(line, variables, intl, noDataText);
                }
              });
            }

            const tooltips = ***REMOVED***.filter(
              (t) => t.location === d.properties[mappingField],
            );
            tooltips.forEach((t) => {
              if (!html.endsWith("<hr>")) {
                html += "<hr>";
              }
              html += t.tooltip;
            });
          } else {
            let format =
              tooltipFormat ||
              "{locationName} %({value},2) \n {label}: %({value},2)";
            let variables = {
              value: null,
              measure: this.***REMOVED***(),
              measureLabel: d.properties.measureLabel,
              locationName: d.properties[mappingField],
              ...dataVars,
            };
            html += formatContent(format, variables, intl, noDataText);
            html += "</div>";
          }

          return html;
        });
    }
  }

  mousemove(event, d) {
    // The event object contains the mouse coordinates
    this.tooltip
      .style("top", event.pageY + "px")
      .style("left", event.pageX + 5 + "px");
  }

  mouseout(event, d) {
    const { showTooltip } = this.props;
    if (showTooltip) {
      const svg = d3.select(this.getMapId()).select("svg");
      const paths = svg.select("g").selectAll(".focus");
      paths.attr("class", "active");
      this.tooltip.style("visibility", "hidden");
    }
  }
  onClick(event, d) {
    if (d.properties) {
      this.tooltip
        .style("visibility", "visible")
        .style("top", event.pageY + "px")
        .style("left", event.pageX + 5 + "px");
    }
    event.***REMOVED***();
    event.***REMOVED***();
  }

  onPointClick(event, d, i) {
    this.showTooltip(event, d);
    this.tooltip
      .style("visibility", "visible")
      .style("top", event.pageY + "px")
      .style("left", event.pageX + 5 + "px");

    const svg = d3.select(this.getMapId()).select("svg").select("g");
    svg
      .selectAll("circle")
      .style("fill", this.props.***REMOVED***)
      .style("stroke", "none");

    svg
      .select("#circle" + i)
      .raise()
      .style("fill", "#fff");
  }

  ***REMOVED***(event, d) {
    const { mappingField } = this.props;
    if (
      this.state.***REMOVED*** !== d.properties[mappingField] &&
      d.properties.value !== null
    ) {
      this.setState({ ***REMOVED***: d.properties[mappingField] });
    }
  }

  onZoomIn(e) {
    const svg = d3.select(this.getMapId()).select("svg");
    svg.transition().call(this.zoom.scaleBy, 1.5);
  }

  onZoomOut() {
    const svg = d3.select(this.getMapId()).select("svg");
    svg.transition().call(this.zoom.scaleBy, 0.6667);
  }

  ***REMOVED***() {
    let measure = this.state.***REMOVED***;
    if (
      !measure &&
      this.props.***REMOVED*** &&
      this.props.***REMOVED***.measures &&
      this.props.***REMOVED***.measures.length > 1
    ) {
      measure = this.props.***REMOVED***.measures[0];
    }

    return measure;
  }

  ***REMOVED***(mainLayer) {
    const { topoJSONField } = this.props;
    if (mainLayer && mainLayer.objects) {
      const fields = Object.keys(mainLayer.objects);
      for (let index in fields) {
        const field = fields[index];
        if (mainLayer.objects[field].type == "***REMOVED***") {
          return field;
        }
      }
    }

    return topoJSONField;
  }

  ***REMOVED***(mainLayer) {
    const ***REMOVED*** = this.***REMOVED***(mainLayer);
    if (mainLayer && mainLayer.objects && mainLayer.objects[***REMOVED***]) {
      return topojson.feature(mainLayer, mainLayer.objects[***REMOVED***])
        .features;
    } else if (mainLayer && mainLayer.features) {
      return mainLayer.features;
    }
    return [];
  }

  getLayers() {
    const { layers } = this.state;
    const { enabledLayers } = this.props;
    if (layers && layers.length > 0) {
      const updatedLayers = layers.map((layer) => {
        const found = enabledLayers.find((l) => l.id == layer.id);
        layer.index = found ? found.index : 0;
        return layer;
      });

      return updatedLayers.sort((a, b) => {
        if (parseInt(a.index) < parseInt(b.index)) {
          return 1;
        }

        if (parseInt(a.index) > parseInt(b.index)) {
          return -1;
        }

        return 0;
      });
    }

    return [];
  }

  getFeatures() {
    const mainLayer = this.getMainLayer();
    const layers = this.getLayers();
    if (mainLayer) {
      const { ***REMOVED***, mappingField, app, mainLayerId, enabledLayers } =
        this.props;
      let features = [];
      try {
        features = this.***REMOVED***(mainLayer);
        features.map((f) => {
          f.properties.layerId = mainLayerId;
          return f;
        });
        if (layers) {
          layers.forEach((layer) => {
            if (layer.id != mainLayerId) {
              let tt = this.***REMOVED***(layer.data);
              tt = tt.map((f) => {
                f.properties.layerId = layer.id;
                return f;
              });
              features = [...tt, ...features];
            }
          });
        }
      } catch (error) {
        console.log("error updating features .." + error);
      }

      const ***REMOVED*** = features.filter((d) => d.properties != null);
      let ***REMOVED*** = ***REMOVED***.locationsData;

      if (***REMOVED***.measures && ***REMOVED***.measures.length > 1) {
        ***REMOVED*** = ***REMOVED***.locationsData.filter(
          (d) => d.measure === this.***REMOVED***(),
        );
      }

      ***REMOVED***.map((f) => {
        if (***REMOVED***) {
          const dataItem = ***REMOVED***.find((d) => {
            const nameOnData = d.label ? d.label.toLowerCase() : "";
            const nameOnMapFile = f.properties[mappingField]
              ? f.properties[mappingField].toLowerCase()
              : "";
            return nameOnData === nameOnMapFile;
          });

          if (dataItem) {
            let measureLabel = dataItem.measure;
            if (
              ***REMOVED***.***REMOVED*** &&
              dataItem.measure &&
              ***REMOVED***.***REMOVED***[dataItem.measure]
            ) {
              measureLabel = ***REMOVED***.***REMOVED***[dataItem.measure];
            }

            f.properties.value = dataItem.value;
            f.properties.measure = dataItem.measure;
            f.properties.measureLabel = measureLabel;
            f.properties.children = dataItem.children;
            f.properties.variables = dataItem.variables;
            f.properties.hasDataRow = true;
            Object.keys(dataItem).forEach((key) => {
              f.properties[key] = dataItem[key];
            });
          } else {
            f.properties.value = null;
            f.properties.measure = null;
            f.properties.children = null;
            f.properties.measureLabel = null;
            f.properties.hasDataRow = false;
          }
        }
      });

      return ***REMOVED***;
    }

    return [];
  }

  getMapId() {
    const { unique } = this.props;
    return ".map.wrapper." + unique;
  }

  filterUpdated(prevProps, prevState) {
    const { ***REMOVED*** } = this.props;
    const prevFilters = (prevProps && prevProps.***REMOVED***) || {};
    const ***REMOVED*** = this.props.***REMOVED*** || {};
    let filterUpdated = false;
    if (prevFilters[***REMOVED***] != ***REMOVED***[***REMOVED***]) {
      filterUpdated = true;
    }

    return filterUpdated;
  }

  getCenter(features, filterUpdated) {
    const { zoomOnFilter, ***REMOVED***, mappingField, ***REMOVED*** } =
      this.props;
    let center = null;
    if (zoomOnFilter && ***REMOVED***) {
      let ***REMOVED*** = this.state.***REMOVED***;
      if (
        filterUpdated &&
        ***REMOVED*** &&
        ***REMOVED***[***REMOVED***]
      ) {
        ***REMOVED*** = ***REMOVED***[***REMOVED***];
      }

      const ***REMOVED*** = features.filter(
        (d) =>
          d.properties != null &&
          d.properties[mappingField] == ***REMOVED***,
      )[0];

      if (
        ***REMOVED*** &&
        ***REMOVED***.properties != null &&
        ***REMOVED***.properties.value
      ) {
        center = ***REMOVED***;
      }
    }

    return center;
  }

  area(poly) {
    var s = 0.0;
    var coordinates =
      poly.coordinates.length > 1
        ? poly.coordinates[0][0]
        : poly.coordinates[0];
    for (let i = 0; i < coordinates.length - 1; i++) {
      s +=
        coordinates[i][0] * coordinates[i + 1][1] -
        coordinates[i + 1][0] * coordinates[i][1];
    }
    return 0.5 * s;
  }

  centroid(poly) {
    var c = [0, 0];
    var coordinates =
      poly.coordinates.length > 1
        ? poly.coordinates[0][0]
        : poly.coordinates[0];
    for (let i = 0; i < coordinates.length - 1; i++) {
      c[0] +=
        (coordinates[i][0] + coordinates[i + 1][0]) *
        (coordinates[i][0] * coordinates[i + 1][1] -
          coordinates[i + 1][0] * coordinates[i][1]);
      c[1] +=
        (coordinates[i][1] + coordinates[i + 1][1]) *
        (coordinates[i][0] * coordinates[i + 1][1] -
          coordinates[i + 1][0] * coordinates[i][1]);
    }
    var a = this.area(poly);
    c[0] /= a * 6;
    c[1] /= a * 6;
    return c;
  }

  d3Map(features, filterUpdated) {
    let { zoomEnabled, ***REMOVED***, mapPosition, editing, mapType } =
      this.props;
      if(!zoomEnabled) {
        zoomEnabled = ['mobile', 'tablet'].includes(***REMOVED***()) ? true: false;
      }
    const breaks = this.getBreaks();
    const container = d3.select(this.getMapId());
    let svg = container.select("svg");
    let ***REMOVED*** = this.getWidth();
    if(***REMOVED*** === 0) {
      ***REMOVED*** = window.innerWidth + ***REMOVED***[***REMOVED***()];
    } else {
      ***REMOVED*** += ***REMOVED***[***REMOVED***()];
    }
    const ***REMOVED*** = this.getHeight() - 100;

    if (svg.empty()) {
      svg = container.append("svg");
    } else {
      svg.selectAll("*").remove();
    }

    svg
      .attr(
        "style",
        `background-color:${***REMOVED***};`,
      )
      .attr("viewBox", `0 0 ${***REMOVED***} ${***REMOVED***}`)
      .attr("***REMOVED***", "xMidYMid meet")

    svg
      .append("g")
      .selectAll("path")
      .data(features)
      .enter()
      .append("path")
      .attr("fill", (d) => this.fillColor(d, breaks))
      .attr("d", d3.geoPath().projection(this.projection))
      .attr("class", (d) => this.classColor(d))
      .on("mouseover", mapType !== "POINTS_MAP" ? this.showTooltip : null)
      .on("mousemove", mapType !== "POINTS_MAP" ? this.mousemove : null)
      .on("mouseout", mapType !== "POINTS_MAP" ? this.mouseout : null);

    if (this.mapPosition) {
      svg
        .transition()
        .duration(300)
        .call(
          this.zoom.transform,
          d3.zoomIdentity
            .translate(this.mapPosition.x, this.mapPosition.y)
            .scale(this.mapPosition.k),
        );
    }

    if (
      !this.mapPosition &&
      mapPosition &&
      mapPosition.x &&
      mapPosition.y &&
      mapPosition.k
    ) {
      svg
        .transition()
        .duration(300)
        .call(
          this.zoom.transform,
          d3.zoomIdentity
            .translate(mapPosition.x, mapPosition.y)
            .scale(mapPosition.k),
        );
        if(mapType === 'POINTS_MAP') {
          let ***REMOVED*** = {
            'mobile': 100,
            'tablet': 0,
            'midTablet': 0,
            'desktop': 0,
            'laptop': 0,
            'wide': 0
          }
          const translateVal = ***REMOVED***[***REMOVED***()];
          svg
          .transition()
          .duration(300)
          .call(
            this.zoom.transform,
            d3.zoomIdentity
              .translate(mapPosition.x + translateVal, mapPosition.y)
              .scale(mapPosition.k),
          );
        }
    }

    if (zoomEnabled || editing) {
      svg.call(this.zoom);
    } else {
      svg.on("dblclick.zoom", null);
    }

    let center = this.getCenter(features, filterUpdated);
    if (center) {
      var bounds = this.path.bounds(center);
      var centerx = [
        (bounds[0][0] + bounds[1][0]) / 2,
        (bounds[0][1] + bounds[1][1]) / 2,
      ];
      svg
        .transition()
        .duration(750)
        .call(
          this.zoom.transform,
          d3.zoomIdentity
            .translate(***REMOVED*** / 2, ***REMOVED*** / 2)
            .scale(12)
            .translate(-centerx[0], -centerx[1]),
        );
    }
  }


  getAvg() {
    const { ***REMOVED*** } = this.props;
    return ***REMOVED***.nationalData.value;
  }

  selectedMeasureChanged(selected) {
    if (this.state.***REMOVED*** != selected) {
      this.setState({ ***REMOVED***: selected });
    }
  }

  getFilters() {
    const { ***REMOVED*** } = this.props;
    const results = {};
    if (***REMOVED***) {
      const keys = Object.keys(***REMOVED***);
      keys.forEach((k) => {
        const selected = ***REMOVED***[k];
        if (selected) {
          results[k] = Array.isArray(selected) ? selected.join(" ,") : selected;
        }
      });
    }
    return results;
  }

  getHighlightedLocationData() {
    const { ***REMOVED***, ***REMOVED*** } = this.props;
    let ***REMOVED*** = ***REMOVED***.locationsData;
    if (***REMOVED***.measures && ***REMOVED***.measures.length > 1) {
      ***REMOVED*** = ***REMOVED***.locationsData.filter(
        (d) => d.measure === this.***REMOVED***(),
      );
    }

    const dataItem = ***REMOVED***.find(
      (d) => d.label === ***REMOVED***,
    );
    return dataItem;
  }

  getHighlightedLocationColor(data) {
    const breaks = this.getBreaks();
    const { ***REMOVED*** } = this.props;
    const value = data ? data.value : null;
    if (value != null) {
      const breakItem = breaks.find((item) => {
        if (item.min != null && item.max != null) {
          return value >= item.min && value <= item.max;
        }

        if (item.min != null) {
          return value >= item.min;
        }

        if (item.max != null) {
          return value <= item.max;
        }
      });

      return breakItem && breakItem.color ? breakItem.color : ***REMOVED***;
    }

    return ***REMOVED***;
  }

  renderLoader() {
    return (
      <Container className={"loading"}>
        <Segment
          basic={true}
          padded={true}
          textAlign={"center"}
          style={{ margin: "30px" }}
        >
          <Dimmer active inverted>
            <Loader size="medium"></Loader>
          </Dimmer>
        </Segment>
      </Container>
    );
  }

  render() {
    let {
      app,
      legendTitle,
      ***REMOVED***,
      intl,
      zoomEnabled,
      ***REMOVED***,
      ***REMOVED***,
      valueFormat,
      ***REMOVED***,
      unique,
      ***REMOVED***,
      ***REMOVED***,
      ***REMOVED***,
      editing,
      highlightedLocLabelFormat,
      noDataText,
    } = this.props;

    if(!zoomEnabled) {
      zoomEnabled = ['mobile', 'tablet', 'midTablet'].includes(***REMOVED***()) ? true: false;
    }
    const ***REMOVED*** = this.getAvg();
    const filters = this.getFilters();
    const ***REMOVED*** = this.getHighlightedLocationData();

    const ***REMOVED*** = {
      ***REMOVED***: this.getHighlightedLocationColor(***REMOVED***),
      color: ***REMOVED***,
      fontSize: ***REMOVED*** + "px",
    };
    if (editing) {
      ***REMOVED***.marginTop = "25px";
    }

    return (
      <div className="map component wp-data-viz-map" ref={this.mapContainer}>
        {this.state.layersLoading && this.renderLoader()}
        {!this.state.layersLoading && (
          <>
            <Container fluid className={"footnote "}>
              {
                <Grid columns={2}>
                  {app !== "csv" && ***REMOVED*** && (
                    <Grid.Column textAlign={"left"} width={4}>
                      <div className="national-average-div">
                        <span className="national-avg-label">
                          {***REMOVED***}
                        </span>
                        <span className="national-avg-value">
                          {formatContent(
                            valueFormat,
                            { value: ***REMOVED*** },
                            intl,
                            noDataText,
                          )}
                        </span>
                      </div>
                    </Grid.Column>
                  )}
                  <Grid.Column
                    textAlign={"right"}
                    width={app !== "csv" && ***REMOVED*** ? 12 : 16}
                  >
                    <Legend
                      ***REMOVED***={this.getBreaks()}
                      ***REMOVED***={formatContent(
                        legendTitle,
                        { ...filters },
                        intl,
                        noDataText,
                      )}
                      ***REMOVED***={this.state.***REMOVED***}
                      {...this.props}
                    />
                  </Grid.Column>
                </Grid>
              }
              <div className="measure-selector">
                <ul>
                  {***REMOVED*** && (
                    <li>
                      <span className="label">{***REMOVED***}</span>
                    </li>
                  )}
                  {***REMOVED*** &&
                    ***REMOVED***.measures &&
                    ***REMOVED***.measures.length > 1 &&
                    ***REMOVED***.measures.map((measure) => {
                      return (
                        <li
                          onClick={this.selectedMeasureChanged.bind(
                            this,
                            measure,
                          )}
                        >
                          <input
                            checked={this.***REMOVED***() === measure}
                            type="radio"
                            value={measure}
                          />
                          <label>
                            {***REMOVED***.***REMOVED***[measure] ||
                              measure}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </Container>
            <div
              className={"map wrapper scaling-svg-container " + unique}
              style={{ height: this.props.height - ***REMOVED***[***REMOVED***()] + "px" }}
            >
              {***REMOVED*** && ***REMOVED***.value && (
                <div
                  className="highlighted-loc-info"
                  style={***REMOVED***}
                >
                  <span>
                    {" "}
                    {formatContent(
                      highlightedLocLabelFormat,
                      {
                        value: ***REMOVED***.value,
                        locationName: ***REMOVED***.label,
                        measureName: ***REMOVED***.measure,
                      },
                      intl,
                      noDataText,
                    )}
                  </span>
                </div>
              )}

              {(editing || zoomEnabled) && (
                <div className="control panel ignore">
                  <div className="zoom plus" onClick={this.onZoomIn}>
                    <Icon name="plus" size="large" />
                  </div>
                  <div className="zoom minus" onClick={this.onZoomOut}>
                    <Icon name="minus" size="large" />
                  </div>
                  <Popup
                    content={
                      <***REMOVED***
                        id="map.reset.tooltip"
                        ***REMOVED***="Reset zoom"
                      />
                    }
                    trigger={
                      <div className="reset" onClick={this.onReset}>
                        <Icon name="repeat" size="large" />
                      </div>
                    }
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default injectIntl(Map);
