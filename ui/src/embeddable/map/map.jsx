import {***REMOVED***, injectIntl} from 'react-intl'
import * as d3 from 'd3' // d3 plugin
import {Container, Grid, Icon, Popup} from 'semantic-ui-react';
import React from 'react'
import * as topojson from 'topojson'
import Legend from './legend'
import {formatContent} from '../common/Tooltip'

const geoStats = require('geostats')
const COLOR_VARIABLE = "_Color_"
const LOCATION = 'location'
const SHOW_ALL = 'showAll'
const SHOW_IF_HAS_DATA = 'ifUnitHasData'
const MAX_LABEL_LEN = 10


const colorSchemes = {
    greens: ['#ccffdd', '#b3ffcc', '#99ffbb', '#80ffaa', '#66ff99', '#4dff88', '#33ff77', '#1aff66', '#00ff55', '#00e64d'],
    greys: ['#f2f2f2', '#e6e6e6', '#d9d9d9', '#cccccc', '#bfbfbf', '#b3b3b3', '#a6a6a6', '#999999', '#8c8c8c', '#808080'],
    oranges: ['#fff0e6', '#ffe0cc', '#ffd1b3', '#ffc299', '#ffb380', '#ffa366', '#ff944d', '#ff8533', '#ff751a', '#ff6600'],
    purples: ['#ffe6ff', '#ffccff', '#ffb3ff', '#ff99ff', '#ff80ff', '#ff66ff', '#ff4dff', '#ff33ff', '#ff1aff', '#ff00ff'],
    reds: ['#ffe6e6', '#ffcccc', '#ffb3b3', '#ff9999', '#ff8080', '#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a', '#ff0000'],
    blues: ['#e6eeff', '#ccddff', '#b3ccff', '#99bbff', '#80aaff', '#6699ff', '#4d88ff', '#3377ff', '#1a66ff', '#0055ff']
}

class Map extends React.Component {    
    constructor(props) {
        super(props)
        this.mapContainer = React.createRef();

        this.state = {mainLayer: null, layers: null}

        this.classColor = this.classColor.bind(this)

        this.featuresZoom = this.featuresZoom.bind(this)
        this.fullView = this.fullView.bind(this)

        this.onZoomIn = this.onZoomIn.bind(this)
        this.onZoomOut = this.onZoomOut.bind(this)
        this.onReset = this.onReset.bind(this)

        this.onClick = this.onClick.bind(this)        
        this.showTooltip = this.showTooltip.bind(this)
        this.mousemove = this.mousemove.bind(this)
        this.mouseout = this.mouseout.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.d3Map = this.d3Map.bind(this)
        this.getFeatures = this.getFeatures.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.getMapId = this.getMapId.bind(this)
        this.zoomed = this.zoomed.bind(this)
        this.zoomEnd = this.zoomEnd.bind(this)
        this.drawPoints = this.drawPoints.bind(this)       
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.getLayers = this.getLayers.bind(this)

        this.onPointClick = this.onPointClick.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.getCenter = this.getCenter.bind(this)

        //map variables
        this.mapPosition = null
        this.zooming = false
        this.projection = d3.geoMercator()
            .scale(props.scale)
            .center(props.center)  // centers map at given coordinates
            .translate([this.getWidth() / 2, this.getHeight() / 2])
        this.path = d3.geoPath().projection(this.projection)
        this.zoom = d3.zoom().scaleExtent([1, 10])
            .on("zoom", this.zoomed)
            .on("end", this.zoomEnd);

        this.centered = null
        this.state = {
            ***REMOVED***: props.***REMOVED*** && props.***REMOVED***.measures && props.***REMOVED***.measures.length > 1 ? props.***REMOVED***.measures[0] : null,
            ***REMOVED***: [],
            ***REMOVED***: null
        };
    }

    ***REMOVED***() {          
        this.loadLayers()
        this.tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
    }

    ***REMOVED***(error, info) {
        console.log(error)
    }
    
    loadLayers() {        
        const { source, mainLayerId, enabledLayers} = this.props;  
        this.setState({
            'layers': []
        })     
        if (enabledLayers && enabledLayers.length > 0) {
            const metadataFuncs = []
            enabledLayers.forEach((l) => {
                metadataFuncs.push(new Promise((resolve, reject) => {d3.json(process.env.REACT_APP_WP_API + "/wp/v2/media/" + l.id).then((data) => {
                    resolve({id: l.id, url: data.source_url, index: l.index})
                }).catch(function(error) {
                    resolve({id: l.id, url: null, index: l.index})
                 });
            
            }))
            })
    
            Promise.all(metadataFuncs).then((metadata) => { 
                const layerFuncs = []
                metadata.forEach(m => {
                    if (m.url) {
                        layerFuncs.push(new Promise((resolve, reject) => {d3.json(m.url).then((data) => {
                            resolve({id: m.id, data, index: m.index})
                        })}))
                    }                    
                })

                Promise.all(layerFuncs).then((layers) => {
                    this.setState({
                        'layers': layers
                    })
                })
              });
        }  else {
            d3.json(source).then((data) => {                
                this.setState({
                    'layers': [{id: null, url: source, data, index: 0}]
                })
            })
        }          
    }

    getMainLayer(){
        const layers = this.getLayers()
        const {mainLayerId, enabledLayers} = this.props;
        let layer 
        if (layers) {
            layer = layers.filter(layer => layer.id == mainLayerId || layer.id == null)[0] || layers[0]
        }         
        return layer ? layer.data : null
    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        const {***REMOVED***, layers, ***REMOVED***} = this.state
        const mainLayer = this.getMainLayer()
        const {
            ***REMOVED***,
            intl,
            ***REMOVED***,
            ***REMOVED***
        } = this.props
        
        this.tooltip.style("visibility", "hidden")
       
        if (prevProps.enabledLayers.length != this.props.enabledLayers.length) {            
            this.loadLayers()            
        } 

       const features = this.getFeatures();
       
       const filterUpdated = this.filterUpdated(prevProps, prevState)
       const center = this.getCenter(features, filterUpdated)
       const ***REMOVED*** = prevProps.***REMOVED***      
       if (prevProps.center !== this.props.center || center) {
       
           this.mapPosition = null
            this.projection
            .scale(this.props.scale)
            .center(center ? center : this.props.center)  // centers map at given coordinates
            .translate([this.getWidth() / 2, this.getHeight() / 2])           
        } 
       
        this.d3Map(features, filterUpdated)        
        if (layers && ***REMOVED*** && (***REMOVED*** != prevProps.***REMOVED***
            || layers != prevState.layers || ***REMOVED*** != prevState.***REMOVED*** || ***REMOVED*** != prevState.***REMOVED***|| mainLayer != prevState.mainLayer
            || prevProps.mainLayerId !== this.props.mainLayerId || JSON.stringify(prevProps.enabledLayers) != JSON.stringify(this.props.enabledLayers))) {                
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
            const [
                [xx0, yy0],
                [xx1, yy1]
            ] = this.path.bounds(features[x]);
            if (xx0 < x0 || x0 == null) {
                x0 = xx0
            }

            if (xx1 > x1 || x1 == null) {
                x1 = xx1
            }

            if (yy0 < y0 || y0 == null) {
                y0 = yy0
            }

            if (yy1 > y1 || y1 == null) {
                y1 = yy1
            }

        }
        return [
            [x0, y0],
            [x1, y1]
        ];
    }

    onReset() {
        this.mapPosition = null
        this.tooltip.style("visibility", "hidden")
        this.fullView()
    }

    zoomed() {
        this.tooltip.style("visibility", "hidden")
        const group = d3.select(this.getMapId()).select('svg').select("g")
        group.attr("transform", d3.event.transform)       
    }

    
    zoomEnd() {
        const {editing} = this.props;
        let t = d3.event.transform;
        this.mapPosition = {k: t.k, x: t.x, y: t.y}
        if (editing) {            
            var parentWindow = window.parent;            
            parentWindow.postMessage({type: 'map', value: JSON.stringify({k: t.k, x: t.x, y: t.y})}, "*");
        }        
    }

    classColor(d) {
        const {zoomEnabled} = this.props;
        if (zoomEnabled) {
            return 'active zoom-enabled'
        } else {
            return 'active'
        }
    }

    ***REMOVED***(data) {
        const {***REMOVED***, ***REMOVED***, colorScheme} = this.props;
        const ***REMOVED*** = [];
        if (***REMOVED***) {
            let parsedData = data.filter(d => d.properties && d.properties.value).map(d => {
                return d.properties.value.toFixed(2);
            });

            let values = [];
            parsedData.forEach(item => {
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
                let ***REMOVED*** = values.length > 1 ? values.length - 1 : values.length;
                serie.getJenks(Math.min(***REMOVED***, ***REMOVED***));
                serie.ranges.forEach((range, i) => {
                    const legendBreak = {};
                    let adjustment = 0.01;
                    legendBreak.min = parseFloat(range.substr(0, range.indexOf('-') - 1)) + (i > 0 ? adjustment : 0);
                    legendBreak.max = parseFloat(range.substr(range.indexOf('-') + 2, range.length));
                    legendBreak.color = colors[i]
                    ***REMOVED***.push(legendBreak);
                });

                return ***REMOVED***;
            }
        }

        return ***REMOVED***;
    }

    getBreaks() {
        const {legendBreaks, ***REMOVED***} = this.props;
        if (***REMOVED***) {
            const features = this.getFeatures();
            return this.***REMOVED***(features);
        } else {
            let ***REMOVED*** = legendBreaks;
            if (this.***REMOVED***()) {
                ***REMOVED*** = legendBreaks
                    .filter(b => b.measure === this.***REMOVED***())
                    .filter(f => {
                        let result = true;
                        if (f.filters && f.filters.length > 0) {
                            if (this.props.***REMOVED*** && JSON.stringify(this.props.***REMOVED***) !== '{}') {
                                const keys = Object.keys(this.props.***REMOVED***);
                                let found = f.filters.filter(filter => {
                                    if (keys.indexOf(filter.field) != -1) {
                                        const ***REMOVED*** = this.props.***REMOVED***[filter.field]
                                        const ***REMOVED*** = filter.values
                                        return ***REMOVED***.join(',').indexOf(***REMOVED***) != -1
                                    }
                                    return false
                                })

                                return found.length > 0
                            }
                        }
                        return result;
                    })
            }
            return ***REMOVED***;
        }
    }

    fillColor(d, breaks) {
        const {***REMOVED***, mainLayerId} = this.props
        let overrideColor
        if (d.properties && d.properties.variables && this.state.***REMOVED*** && d.properties.value != null) {
            let key = COLOR_VARIABLE + this.state.***REMOVED***
            overrideColor = d.properties.variables[key.trim()]
            if (overrideColor) {
                return overrideColor
            }
        }
        if (d.properties.value != null && (mainLayerId && d.properties.layerId == mainLayerId || !mainLayerId)) {
            const breakItem = breaks.find(item => {
                if (item.min != null && item.max != null) {
                    return d.properties.value >= item.min && d.properties.value <= item.max;
                }

                if (item.min != null) {
                    return d.properties.value >= item.min;
                }

                if (item.max != null) {
                    return d.properties.value <= item.max;
                }

            });

            return (breakItem && breakItem.color) ? breakItem.color : ***REMOVED***;
        }
        
        const layerProps = this.props.enabledLayers.filter(l => l.id == d.properties.layerId)[0]       
        if (layerProps && layerProps.bgColor && layerProps.bgColor != 'undefined'){
           return layerProps.bgColor 
        }
      
        return ***REMOVED***;
    }

    setValues() {
        const features = this.getFeatures()
        const group = d3.select(this.getMapId()).select('svg').select("g")
        group.selectAll("path").data(features)
            .join('path')
            .attr("d", this.path)
    }

    ***REMOVED***(d) {
        if (d.properties.LABEL_LATITUDE && d.properties.LABEL_LONGITUDE) {
            return this.projection([d.properties.LABEL_LONGITUDE, d.properties.LABEL_LATITUDE])
        } else {
            return this.path.centroid(d);
        }
    }

    ***REMOVED***(features, filterUpdated) {        
        const {
            mapLabelField,
            symbols,
            ***REMOVED***
        } = this.props
        

        const ***REMOVED*** = [...(features.filter((f) => {
            return ***REMOVED*** != f.properties[mapLabelField]
        })), ...(features.filter((f) => {
            return ***REMOVED*** == f.properties[mapLabelField]
        }))]

        this.drawPolygons(***REMOVED***)
        this.drawLabels(***REMOVED***)        
        this.drawPoints(***REMOVED***, filterUpdated)        
        if (symbols.length > 0) {
            this.addSymbols(symbols, ***REMOVED***)
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
            mapType           
        } = this.props
        const group = d3.select(this.getMapId()).select('svg').select("g")
       
        group.selectAll('.map-labels')
            .data(***REMOVED***)
            .enter()
            .append("foreignObject")
            .attr('x', (d) => {
                const position = this.***REMOVED***(d)
                if (d.properties[mapLabelField]) {
                    const boxWidth = this.***REMOVED***(d);
                    return position[0] - (boxWidth / 2);
                } else {
                    return position[0]
                }
            })
            .attr("y", (d) => {
                const position = this.***REMOVED***(d)
                return position[1] - 10;
            })            
             .attr("width", (d) => this.***REMOVED***(d))
             .attr("height", (d) => this.***REMOVED***(d) )
             .attr('overflow', 'visible') 
             .attr("opacity", 1)
             .attr('pointer-events', mapType == 'POINTS_MAP' ? 'none' : 'all')
             .on("mouseover", this.showTooltip)
            .on("mousemove", this.mousemove)
            .on("mouseout", this.mouseout)                      
            .append("xhtml:div")           
             .style('font-size',(d, i) => labelFontSize + "px")
            .style("color", (d, i) => ***REMOVED***)
            .style("font-weight", (d) => ***REMOVED***)
            .style("background-color", (d) => { 
                if ((***REMOVED*** || (!d.properties.value && ***REMOVED***) && d.properties.hasDataRow)) {
                    return "#fff6e1";
                }
                 
                return "none"
            })
            .style("border-radius", (d) => "4px")            
            .style('line-height', '150%')
            .style('text-align', 'center')           
            .html((d, i) => {  
                let label = ""             
                if (***REMOVED*** == SHOW_ALL || (***REMOVED*** == SHOW_IF_HAS_DATA && d.properties.hasDataRow)) {
                    label = d.properties[mapLabelField];
                    let abbrev = d.properties["abbrev"]
                    if (label && label.length > MAX_LABEL_LEN && abbrev) {
                        label = abbrev;
                    }
                    
                    if (***REMOVED***) {
                        if (d.properties.value) {
                            const variables = d.properties.variables || {}
                            label += "<br>" + formatContent(valueFormat, {
                                value: d.properties.value,
                                measure: this.***REMOVED***(), ...variables
                            }, intl) + ""   
                        } else {
                            if (***REMOVED*** == true && !d.properties.value && d.properties.hasDataRow) {
                                label += "<br>No Data"
                            }                            
                        }                        
                    }                    
                }
                
                return label 
             })
            
    }

    drawPolygons(***REMOVED***) {
        const {
            mapLabelField,
            ***REMOVED***,
            mapFocusBoundaryColor,
            ***REMOVED***
        } = this.props

        const breaks = this.getBreaks()
        const group = d3.select(this.getMapId()).select('svg').select("g")       
        
        const polygons = ***REMOVED***.filter(f => f.geometry && (f.geometry && (f.geometry.type == 'Polygon' || f.geometry.type == 'MultiPolygon')))

        if (polygons.length > 0) {
            group.selectAll("path").data(polygons)
            .join('path')
            .attr("d", this.path)
            .attr("fill", d => this.fillColor(d, breaks))
            .attr("stroke-width", d => {
                if (***REMOVED*** == d.properties[mapLabelField]) {
                    return 1.2
                } else {
                    return 0.4;
                }
            })
            .attr("stroke", d => {
                if (***REMOVED*** == d.properties[mapLabelField]) {
                    return mapFocusBoundaryColor;
                } else {
                    return ***REMOVED***;
                }
            })
            .on("click", this.***REMOVED***)                       
        }       
    }

    drawPoints(***REMOVED***, filterUpdated) {        
        const {           
            intl,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***, 
            zoomLevelToShowPoints, 
            mappingField,
            ***REMOVED***,
            ***REMOVED***                
        } = this.props

        
        const group = d3.select(this.getMapId()).select('svg').select("g")
        let ***REMOVED*** = []
        if (***REMOVED***.pointsData) {        
            let ***REMOVED*** = this.state.***REMOVED***
            if (filterUpdated && ***REMOVED*** && ***REMOVED***[***REMOVED***]) {            
                ***REMOVED*** = ***REMOVED***[***REMOVED***]
            }           
            
            ***REMOVED*** = ***REMOVED***.pointsData.filter(p => p.lat && p.lng && p.label == ***REMOVED***).map(p => {
                return { properties: { label: p.label, lat: p.lat, lng: p.lng, value: p.value, variables: p.variables } }
            })

            group.selectAll('.circle')
                .data(***REMOVED***)
                .enter()
                .append('circle')
                .attr('id', (d, i) => {
                    return "circle" + i
                })
                .attr('cx', (d) => {
                    const position = this.projection([d.properties.lng, d.properties.lat])
                    return position[0]
                })
                .attr("cy", (d) => {
                    const position = this.projection([d.properties.lng, d.properties.lat])
                    return position[1]
                })
                .attr('r', (d, i) => {
                    return 2
                })
                .style("stroke-width", 0.5)
                .style('fill', (d, i) => {                    
                    return ***REMOVED***
                })
                .on("click", (d, i) => this.onPointClick(d,i))
        }
           
        const breaks = this.getBreaks()
        const points = ***REMOVED***.filter(f => f.geometry && f.geometry.type == 'Point')        
        if (points.length > 0) {
             group.selectAll('.point-labels')
            .data(points)
            .enter()
            .append("foreignObject")
            .attr('x', (d) => {
                const width = this.***REMOVED***(d) + 20
                const position = this.projection([d.geometry.coordinates[1], d.geometry.coordinates[0]])
                 return position[0] - width / 2;
            })
            .attr("y", (d) => {
                const position = this.projection([d.geometry.coordinates[1], d.geometry.coordinates[0]])
                return position[1] - this.***REMOVED***(d) / 2;
            })
             .attr("width", (d) => this.***REMOVED***(d) + 20)
             .attr("height", (d) => this.***REMOVED***(d) + 20)
             .attr('overflow', 'visible')           
             .style('opacity', 1)
             .append("xhtml:div")
            .style('font-size','12px')
            .style("color", (d, i) => ***REMOVED***)
            .style("font-weight", (d) => "bold")
            .style("background-color", (d) => this.fillColor(d, breaks))
            .style("padding", (d) => "5px 3px 5px 3px")
            .style("border-radius", (d) => "4px")            
            .style('line-height', '100%')
            .style('text-align', 'center')           
            .html((d, i) => {
                return formatContent(***REMOVED***, {
                    value: d.properties.value,
                    locationName: d.properties[this.props.mapLabelField]
                }, intl)                
            })
            .on("mouseover", this.showTooltip)
            .on("mousemove", this.mousemove)
            .on("mouseout", this.mouseout);
           }
    }

    addSymbols(symbols, features) {
        const {mappingField} = this.props;
        const group = d3.select(this.getMapId()).select('svg').select("g")
        symbols.forEach(symbol => {
            if (symbol.field && symbol.image && symbol.values) {
                let filteredFeaturesWithGpsCoords = features.filter(f => {
                    let fieldName = LOCATION == symbol.field ? mappingField : "value"
                    let fiedValue = (f.properties[fieldName] || (f.properties.variables ? f.properties.variables[fieldName] : "")) + ""
                    let valuesToMatch = symbol.values + ""
                    let ***REMOVED*** = valuesToMatch.split(",")
                    return f.properties.LATITUDE && f.properties.LONGITUDE && ***REMOVED***.filter(v => v.trim().toLowerCase() == fiedValue.trim().toLowerCase()).length > 0
                })

                let filteredFeaturesNoCoords = features.filter(f => {
                    let fieldName = LOCATION == symbol.field ? mappingField : "value"
                    let fiedValue = (f.properties[fieldName] || (f.properties.variables ? f.properties.variables[fieldName] : "")) + ""
                    let valuesToMatch = symbol.values + ""
                    let ***REMOVED*** = valuesToMatch.split(",")
                    return !f.properties.LATITUDE && !f.properties.LONGITUDE && ***REMOVED***.filter(v => v.trim().toLowerCase() == fiedValue.trim().toLowerCase()).length > 0
                })


                // if feature has lat and long, use that to position the symbol
                group.selectAll("image")
                    .data(filteredFeaturesWithGpsCoords)
                    .enter()
                    .append("image")
                    .attr('width', 40)
                    .attr('height', 40)
                    .attr("class", "map-symbol")
                    .attr("xlink:href", "/" + symbol.image)
                    .attr("transform", (d) => {
                        return "translate(" + this.projection([
                            d.properties.LONGITUDE,
                            d.properties.LATITUDE
                        ]) + ")";
                    })
                    .on("mouseover", this.showTooltip)
                    .on("mousemove", this.mousemove)
                    .on("mouseout", this.mouseout);

                // if feature does not have lat and long, use the centroid to position the symbol
                group.selectAll("image")
                    .data(filteredFeaturesNoCoords)
                    .enter()
                    .append("image")
                    .attr('width', 40)
                    .attr('height', 40)
                    .attr("class", "map-symbol")
                    .attr("xlink:href", "/" + symbol.image)
                    .attr("x", (d) => {
                        return (this.path.centroid(d)[0] - 20)
                    })
                    .attr("y", (d) => {
                        return this.path.centroid(d)[1]
                    })
                    .on("mouseover", this.showTooltip)
                    .on("mousemove", this.mousemove)
                    .on("mouseout", this.mouseout);
            }
        })

    }

    ***REMOVED***() {
        const {***REMOVED***} = this.props;
        if (***REMOVED***) {
            return 30;
        }

        return 25;
    }

    ***REMOVED***(d) {
        const {mapLabelField} = this.props;
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

    featuresZoom(fs, inmediate, callback) {
        const svg = d3.select(this.getMapId()).select('svg')
        const g = svg.select("g")
        const paths = svg.select("g").selectAll(".active")
        var bounds = this.***REMOVED***(fs);
        const [
            [x0, y0],
            [x1, y1]
        ] = bounds;

        if (inmediate) {
            svg.call(
                this.zoom.transform,
                d3.zoomIdentity
                    .translate(this.getWidth() / 2, this.getHeight() / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.getWidth(), (y1 - y0) / this.getHeight())))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2));
        } else {

            svg.transition().on("end", callback).duration(450).call(
                this.zoom.transform,
                d3.zoomIdentity
                    .translate(this.getWidth() / 2, this.getHeight() / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.getWidth(), (y1 - y0) / this.getHeight())))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2));
        }
    }

    fullView() {
        const {mapPosition, editing} = this.props
        this.centered = null
        this.zooming = false
        const svg = d3.select(this.getMapId()).select('svg')
        const paths = svg.select("g").selectAll(".active")
        paths.attr("class", (d1, b, c) => {
            const p = d3.select(c[b])
            return p.attr("class").replace(/background/gi, "")
        })

        if (mapPosition && !editing) {
            svg.transition()
            .duration(300)
            .call(this.zoom.transform, d3.zoomIdentity
                .translate(mapPosition.x, mapPosition.y)
                .scale(mapPosition.k))
        } else {
            svg.transition()
            .duration(300)
            .call(this.zoom.transform, d3.zoomIdentity
                .translate(0, 0)
                .scale(1))
        }        
    }

    showTooltip(d) {
        const {
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
            mapType
        } = this.props;
        if ((showTooltip && d.properties.value != null) || (showTooltip && ***REMOVED***) ) {
            const svg = d3.select(this.getMapId()).select('svg')
            const elements = svg.select("g").selectAll(".active")
            elements.attr("class", p => {
                if (p.properties[mappingField] === d.properties[mappingField]) {
                    return 'focus' + (zoomEnabled ? ' zoom-enabled' : '')
                } else {
                    return 'active' + (zoomEnabled ? ' zoom-enabled' : '')
                }
            })

            const format = tooltipFormat || '{locationName} %({value},2) \n {label}: %({value},2)'
            const dataVars = d.properties.variables || {}
            const variables = {
                value: d.properties.value,
                measure: this.***REMOVED***(),
                measureLabel: d.properties.measureLabel,
                locationName: d.properties[mappingField], ...dataVars
            }
            this.tooltip.attr("class", tooltipTheme)
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("visibility", "visible")
                .html((e) => {

                    let html = `<div style='font-size:${***REMOVED***}px;' class='tooltip-content' >`;
                    if (d.properties.value) {

                        const lines = format.split('\n')
                        let headerFormat = lines[0];
                        let overallFormat = lines.length > 1 ? lines[1] : null
                        let ***REMOVED*** = 1
                        let ***REMOVED***
                        if (fields.length > 1 && mapType != 'POINTS_MAP') {
                            ***REMOVED*** = lines.length > 2  ? 2 : 1
                            ***REMOVED*** = lines[***REMOVED***]
                        } else {
                            ***REMOVED*** = null
                        }

                        if (headerFormat) {
                            html += formatContent(headerFormat, variables, intl)
                        }
                        if (overallFormat) {
                            if (!html.endsWith('<hr>')) {
                                html += '<hr>'
                            }
                            html += formatContent(overallFormat, variables, intl)
                        }
                        if (***REMOVED***) {
                            if (d.properties.children) {
                                d.properties.children.forEach((child, index) => {
                                    const vars = {
                                        value: child.value,
                                        label: child.label,
                                        measure: this.***REMOVED***(),
                                        measureLabel: d.properties.measureLabel, ...dataVars
                                    }
                                    if (!html.endsWith('<hr>')) {
                                        html += '<hr>'
                                    }
                                    html += formatContent(***REMOVED***, vars, intl)
                                })
                            }
                        }

                        if (lines.length > ***REMOVED*** + 1) {
                            if (!html.endsWith('<hr>')) {
                                html += '<hr>'
                            }
                            lines.forEach((line, index) => {
                                if (index > ***REMOVED***) {
                                    if (!html.endsWith('<hr>')) {
                                        html += '<hr>'
                                    }
                                    html += formatContent(line, variables, intl)
                                }
                            })

                        }

                        const tooltips = ***REMOVED***.filter(t => t.location == d.properties[mappingField])
                        tooltips.forEach(t => {
                            if (!html.endsWith('<hr>')) {
                                html += '<hr>'
                            }
                            html += t.tooltip
                        })
                    } else {
                        let format = tooltipFormat || '{locationName} %({value},2) \n {label}: %({value},2)'
                        let variables = {
                            value: null,
                            measure: this.***REMOVED***(),
                            measureLabel: d.properties.measureLabel,
                            locationName: d.properties[mappingField], ...dataVars
                        }
                        html += formatContent(format, variables, intl)
                        html += "</div>"
                    }

                    return html
                })
        }
    }

    mousemove(d) {
        this.tooltip.style("top", (d3.event.pageY) + "px").style("left", (d3.event.pageX + 5) + "px");
    }

    mouseout(d) {
        const {showTooltip} = this.props;
        if (showTooltip) {
            const svg = d3.select(this.getMapId()).select('svg')
            const paths = svg.select("g").selectAll(".focus")
            paths.attr("class", "active")
            this.tooltip.style("visibility", "hidden")
        }
    }

    onClick(d) {
        if (d.properties) {
            this.tooltip.style("visibility", "visible")
            this.tooltip.style("top", (d3.event.pageY) + "px").style("left", (d3.event.pageX + 5) + "px");
        }
        d3.event.***REMOVED***()
        d3.event.***REMOVED***()
    }

    onPointClick(d, i) {  
        this.showTooltip(d)
        this.tooltip.style("visibility", "visible")
        this.tooltip.style("top", (d3.event.pageY) + "px").style("left", (d3.event.pageX + 5) + "px");
        d3.select(this.getMapId()).select('svg').select("g").selectAll('circle')
        .style("fill", this.props.***REMOVED***)
        .style("stroke", "none")

        d3.select(this.getMapId()).select('svg').select("g").select('#circle'+ i)
        .style("fill", "#fff")
    }

    ***REMOVED***(d) {
        const {mappingField} = this.props;  
        if (this.state.***REMOVED*** !== d.properties[mappingField]) {
            this.setState({***REMOVED***: d.properties[mappingField]})        
        }      
        
    }

    onZoomIn(e) {
        const svg = d3.select(this.getMapId()).select('svg')
        svg.transition().call(this.zoom.scaleBy, 1.5)
    }

    onZoomOut() {
        const svg = d3.select(this.getMapId()).select('svg')
        svg.transition().call(this.zoom.scaleBy, 0.6667)
    }

    ***REMOVED***() {
        let measure = this.state.***REMOVED***
        if (!measure && this.props.***REMOVED*** && this.props.***REMOVED***.measures && this.props.***REMOVED***.measures.length > 1) {
            measure = this.props.***REMOVED***.measures[0]
        }

        return measure;
    }

    ***REMOVED***() {
        const mainLayer = this.getMainLayer()
        const {topoJSONField} = this.props;
        if (mainLayer && mainLayer.objects) {
            const fields = Object.keys(mainLayer.objects)            
            for (let index in fields) {
                const field = fields[index]                
                if (mainLayer.objects[field].type == '***REMOVED***') {                    
                    return field
                }
            }           
        }

        return topoJSONField
    }

    ***REMOVED***(mainLayer) {
        if (mainLayer && mainLayer.objects) {
            return topojson.feature(mainLayer, mainLayer.objects[this.***REMOVED***()]).features;
         } else if (mainLayer && mainLayer.features) {
            return mainLayer.features
        }
        return []
    }

    getLayers() {
        const { layers } = this.state
        const { enabledLayers } = this.props;
        const updatedLayers = layers.map(layer => {
            const found = enabledLayers.find(l => l.id == layer.id)
            layer.index = found ? found.index : 0
            return layer
        })

        return updatedLayers.sort((a, b) => {
            if (parseInt(a.index) < parseInt(b.index)) {
                return 1
            }

            if (parseInt(a.index) > parseInt(b.index)) {
                return -1
            }

            return 0
        })
    }

    getFeatures() {
        const mainLayer = this.getMainLayer()
        const layers = this.getLayers()
        if (mainLayer) {
            const {***REMOVED***, mappingField, app, mainLayerId, enabledLayers} = this.props;
            let features = []
            try {                
                features = this.***REMOVED***(mainLayer)
                features.map(f =>{
                    f.properties.layerId = mainLayerId
                    return f
                })
                if (layers) {                                            
                        layers.forEach(layer => {
                        if (layer.id != mainLayerId) {
                            let tt = this.***REMOVED***(layer.data)
                            tt = tt.map(f =>{
                                f.properties.layerId = layer.id 
                                return f
                            })
                            features = [...tt, ...features]                            
                        }
                    }) 
                }
            } catch (error) {
               console.log('error updating features ..' + error)
            }
           
            const ***REMOVED*** = features.filter(d => d.properties != null);
            let ***REMOVED*** = ***REMOVED***.locationsData;

            if (***REMOVED***.measures && ***REMOVED***.measures.length > 1) {
                ***REMOVED*** = ***REMOVED***.locationsData.filter(d => d.measure === this.***REMOVED***());
            }


            ***REMOVED***.map(f => {
                if (***REMOVED***) {
                    const dataItem = ***REMOVED***.find(d => {
                        const nameOnData = d.label ? d.label.toLowerCase() : ""
                        const nameOnMapFile = f.properties[mappingField] ? f.properties[mappingField].toLowerCase() : ""
                        return nameOnData === nameOnMapFile
                    });

                    if (dataItem) {
                        let measureLabel = dataItem.measure
                        if (***REMOVED***.***REMOVED*** && dataItem.measure && ***REMOVED***.***REMOVED***[dataItem.measure]) {
                            measureLabel = ***REMOVED***.***REMOVED***[dataItem.measure]
                        }
                        f.properties.value = dataItem.value;
                        f.properties.measure = dataItem.measure
                        f.properties.measureLabel = measureLabel
                        f.properties.children = dataItem.children;
                        f.properties.variables = dataItem.variables;
                        f.properties.hasDataRow = true;
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
        const {unique} = this.props;
        return '.map.wrapper.' + unique;
    }
    
 filterUpdated(prevProps, prevState) {
        const {***REMOVED***} = this.props
        const prevFilters = prevProps && prevProps.***REMOVED*** || {}
        const ***REMOVED*** = this.props.***REMOVED*** || {}
        let filterUpdated = false
          if (prevFilters[***REMOVED***] != ***REMOVED***[***REMOVED***]) {
                    filterUpdated = true
          }

         return filterUpdated
  }

   getCenter(features, filterUpdated) {
         const {zoomOnFilter, ***REMOVED***, mappingField, ***REMOVED***} = this.props              
        let center = null
        if (zoomOnFilter && ***REMOVED***) {
            let ***REMOVED*** = this.state.***REMOVED***           
            if (filterUpdated && ***REMOVED*** && ***REMOVED***[***REMOVED***]) {            
                ***REMOVED*** = ***REMOVED***[***REMOVED***]
            }           
            
            const ***REMOVED*** = features.filter(d => d.properties != null && d.properties[mappingField] == ***REMOVED***)[0]
            
            if (***REMOVED*** && ***REMOVED***.properties != null && ***REMOVED***.properties.value) {                
               center = this.centroid(***REMOVED***.geometry)           
            }
        }        
        
        return center
    }
    
    area(poly) {
        var s = 0.0;
        var coordinates = poly.coordinates.length > 1 ? poly.coordinates[0][0] : poly.coordinates[0];
        for (let i = 0; i < (coordinates.length - 1); i++) {
            s += (coordinates[i][0] * coordinates[i + 1][1] - coordinates[i + 1][0] * coordinates[i][1]);
        }
        return 0.5 * s;
    }

    centroid(poly) {
        var c = [0, 0];
        var coordinates = poly.coordinates.length > 1 ? poly.coordinates[0][0] : poly.coordinates[0];
        for (let i = 0; i < (coordinates.length - 1); i++) {
            c[0] += (coordinates[i][0] + coordinates[i + 1][0]) * (coordinates[i][0] * coordinates[i + 1][1] - coordinates[i + 1][0] * coordinates[i][1]);
            c[1] += (coordinates[i][1] + coordinates[i + 1][1]) * (coordinates[i][0] * coordinates[i + 1][1] - coordinates[i + 1][0] * coordinates[i][1]);
        }
        var a = this.area(poly);
        c[0] /= a * 6;
        c[1] /= a * 6;
        return c;
    }

    d3Map(features, filterUpdated) {        
        const {zoomEnabled, ***REMOVED***, mapPosition, editing, mapType} = this.props;
        const breaks = this.getBreaks()
        const container = d3.select(this.getMapId())       
        let svg = container.select('svg')        
        if (svg.empty()) {
            svg = container.append('svg')            
        } else {          
            svg.selectAll("*").remove()
        }
        svg.attr("style", function (d) {
            return `background-color:${***REMOVED***};`
        })
        svg.attr("width", this.getWidth())
        svg.attr("height", this.props.height - 100)
    
        
        if (this.mapPosition) {            
            svg.transition()
            .duration(300)
            .call(this.zoom.transform, d3.zoomIdentity
                .translate(this.mapPosition.x, this.mapPosition.y)
                .scale(this.mapPosition.k))
        }
       
        if (!this.mapPosition && mapPosition && mapPosition.x && mapPosition.y && mapPosition.k) {            
            svg.transition()
                .duration(300)
                .call(this.zoom.transform, d3.zoomIdentity
                    .translate(mapPosition.x, mapPosition.y)
                    .scale(mapPosition.k))
        }           
           
        
        if (zoomEnabled || editing) {
            svg.call(this.zoom)
        } else {
            svg.on("dblclick.zoom", null);
        }         
       
        svg.append("g").selectAll("path")
            .data(features)
            .enter().append("path")
            .attr("fill", d => this.fillColor(d, breaks))
            .attr("d", d3.geoPath().projection(this.projection))
            .attr("class", d => this.classColor(d))           
            .on("mouseover", mapType !== 'POINTS_MAP' ? this.showTooltip : null )
            .on("mousemove", mapType !== 'POINTS_MAP' ? this.mousemove : null)
            .on("mouseout", mapType !== 'POINTS_MAP' ? this.mouseout : null)       
            
            const center = this.getCenter(features, filterUpdated)
            if (center) {                
                  svg.transition()
                    .call(this.zoom.scaleTo, 6)                 
            }                 
           
    }

    getAvg() {
        const {***REMOVED***} = this.props;
        return ***REMOVED***.nationalData.value;
    }

    selectedMeasureChanged(selected) {
        if (this.state.***REMOVED*** != selected) {
            this.setState({***REMOVED***: selected})
        }
    }

    getFilters() {
        const {***REMOVED***} = this.props;
        const results = {}
        if (***REMOVED***) {
            const keys = Object.keys(***REMOVED***)
            keys.forEach(k => {
                const selected = ***REMOVED***[k];
                if (selected) {
                    results[k] = Array.isArray(selected) ? selected.join(" ,") : selected
                }
            })
        }
        return results
    }

    getHighlightedLocationData() {
        const {***REMOVED***, ***REMOVED***} = this.props;
        let ***REMOVED*** = ***REMOVED***.locationsData;
        if (***REMOVED***.measures && ***REMOVED***.measures.length > 1) {
            ***REMOVED*** = ***REMOVED***.locationsData.filter(d => d.measure === this.***REMOVED***());
        }

        const dataItem = ***REMOVED***.find(d => d.label === ***REMOVED***);
        return dataItem
    }

    getHighlightedLocationColor(data) {
        const breaks = this.getBreaks()
        const {***REMOVED***} = this.props;
        const value = data ? data.value : null;
        if (value != null) {
            const breakItem = breaks.find(item => {
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

            return (breakItem && breakItem.color) ? breakItem.color : ***REMOVED***;
        }

        return ***REMOVED***;

    }

    render() {
        const {
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
            highlightedLocLabelFormat
        } = this.props;

        const ***REMOVED*** = this.getAvg()
        const filters = this.getFilters()
        const ***REMOVED*** = this.getHighlightedLocationData()

        const ***REMOVED*** = {
            ***REMOVED***: this.getHighlightedLocationColor(***REMOVED***),
            color: ***REMOVED***,
            fontSize: ***REMOVED*** + 'px'
        }
        if (editing) {
            ***REMOVED***.marginTop = "25px"
        }
        return (
            <div className="map component" ref={this.mapContainer}>
                {/*editing &&
                    <div className="edit-mode-message"><p> You can drag the map or zoom using the zoom toolbar. The position of the map is saved when you save the page.</p></div>
             */}
                <Container fluid className={"footnote "}>
                    {
                        <Grid columns={2}>
                            {app != 'csv' && ***REMOVED*** &&
                                <Grid.Column textAlign={"left"} width={4}>
                                    <div className="national-average-div">
                                        <span className="national-avg-label">{***REMOVED***}</span><span
                                        className="national-avg-value">{formatContent(valueFormat, {value: ***REMOVED***}, intl)}</span>
                                    </div>
                                </Grid.Column>
                            }
                            <Grid.Column textAlign={"right"} width={app != 'csv' && ***REMOVED*** ? 12 : 16}>
                                <Legend ***REMOVED***={this.getBreaks()}
                                        ***REMOVED***={formatContent(legendTitle, {...filters}, intl)}
                                        ***REMOVED***={this.state.***REMOVED***}
                                        {...this.props} />
                            </Grid.Column>
                        </Grid>}
                    <div className="measure-selector">
                        <ul>
                            {***REMOVED*** &&
                                <li><span className="label">{***REMOVED***}</span></li>
                            }
                            {***REMOVED*** && ***REMOVED***.measures && ***REMOVED***.measures.length > 1 &&
                                ***REMOVED***.measures.map(measure => {
                                    return (<li onClick={this.selectedMeasureChanged.bind(this, measure)}>
                                        <input
                                            checked={this.***REMOVED***() === measure}
                                            type="radio"
                                            value={measure}/>
                                        <label>{***REMOVED***.***REMOVED***[measure] || measure}</label>
                                    </li>)
                                })
                            }
                        </ul>

                    </div>
            </Container>
              <div className={"map wrapper scaling-svg-container " + unique}
                     style={{height: (this.props.height - 100) + 'px'}}>
                    {***REMOVED*** && ***REMOVED***.value &&
                        <div className="highlighted-loc-info" style={***REMOVED***}>
                           <span> {formatContent(highlightedLocLabelFormat, {
                                value: ***REMOVED***.value,
                                locationName: ***REMOVED***.label,
                                measureName: ***REMOVED***.measure
                            }, intl)}
                            </span>
                        </div>
                    }

                {(editing || zoomEnabled) && <div className="control panel ignore">
                    <div className="zoom plus" onClick={this.onZoomIn}><Icon name='plus' size='large'/></div>
                    <div className="zoom minus" onClick={this.onZoomOut}><Icon name='minus' size='large'/></div>
                    <Popup content={<***REMOVED*** id="map.reset.tooltip" ***REMOVED***="Reset zoom"/>}
                           trigger={<div className="reset" onClick={this.onReset}>
                               <Icon name='repeat' size='large'/></div>}/>
                </div>}
                </div> 
            </div>)
    }
}


export default injectIntl(Map)
