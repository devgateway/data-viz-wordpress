import React from 'react';
import { connect } from "react-redux";
import DataProvider from "../data/DataProvider";
import DataConsumer from "../data/DataConsumer";
import Map from './map';
import MapDataFrame from './MapDataFrame';
import ***REMOVED*** from './***REMOVED***';

const countries = [
    { label: 'KENYA', value: 'KEN', center: [35.8166634, 0.1], scale: 2000}, 
    { label: 'Nigeria', value: 'NGA', center: [7.491302, 9.072264], scale: 2000}, 
    { label: 'South Africa', value: 'ZAF', center: [24.676997, -28.48322], scale: 2000 },
    { label: 'West Africa', value: 'West Africa', center: [-7.293255, 13.905720], scale: 1500 },
    { label: 'Africa', value: 'Africa', center: [13.134227,-11.523088], scale: 550 },
    { label: 'Ethiopia', value: 'ETH', center: [35.8166634, 1.7], scale: 2000}, 
    { label: 'Zambia', value: 'ZMB', center: [26.459455, -14.668135], scale: 2000},
    { label: 'Democratic Republic of the Congo', value: 'DRC', center: [23.174338, -5.837475], scale: 1250},
    { label: 'World', value: 'World', center: [0, 20.050043], scale: 150}
]

const MapWrapper = (props) => {
    const {
        unique,
        editing,
        "data-filters": filters = '{}',
        "data-app": app = 'csv',
        "data-csv": csv = '',
        'data-dimension1': dimension1 = '',
        'data-dimension2': dimension2 = '',
        "data-measures": measures = '["***REMOVED***"]',
        "data-height": height = 600,
          width = 960,
        "data-data-source-text": ***REMOVED*** = 'NIDS',
        "data-data-source-label": ***REMOVED*** = 'Source',
        "data-national-average-label": ***REMOVED*** = 'National Prevalence Avg',
        "data-legend-title": legendTitle = 'Tobacco Prevalence Rate',
        "data-legend-breaks": legendBreaks = '[]',
        "data-zoom-enabled": zoomEnabled = false, 
        "data-show-legend-labels": ***REMOVED*** = false,
        "data-map-file": mapFile = 'africa-geojson-tanzania-others-en-v2.json',
        "data-mapping-field": mappingField = 'zone',
        "data-map-label-field": mapLabelField = "admin",
        "data-has-multiple-measures": ***REMOVED*** = "false",         
         topoJSONField = "collection",        
        'data-map-center': mapCenter = 'NGA', //country        
        "data-map-label-show-value": ***REMOVED*** = "false",
        "data-show-tooltip": showTooltip = "true",
        "data-measure-selector-label": ***REMOVED*** = "",
        "data-value-format": valueFormat = "",
        "data-show-overall-value": ***REMOVED*** = "false",        
        "data-auto-generate-breaks": ***REMOVED*** = "false",
        "data-number-of-breaks": ***REMOVED*** = 5,
        "data-scheme": colorScheme = "reds",
        "data-show-no-data-label": ***REMOVED*** = "false",
        "data-group": group = "default",
        "data-map-symbols": mapSymbols = '[]',
        "data-tooltip-theme": tooltipTheme = "map-tooltip-dark",
        "data-label-font-size": labelFontSize = 12,
        "data-label-font-weight" :***REMOVED*** = "normal",
        "data-label-font-color": ***REMOVED*** = "#595959",
        "data-legend-font-size": ***REMOVED*** = 12,
        "data-legend-font-weight" : ***REMOVED*** = "normal",
        "data-custom-tooltips" : ***REMOVED*** = '[]',
        'data-format-style': style = "decimal",
        "data-decimals": decimals = "2",
        'data-currency': currency = "",
        'data-tooltip-font-size': ***REMOVED*** = 14,
        'data-show-admin-unit-label': ***REMOVED*** = "showAll",
        'data-map-no-data-color': ***REMOVED*** = '#f8f8f8',
        'data-map-boundary-color': ***REMOVED*** = '#000',
        'data-map-focus-boundary-color': mapFocusBoundaryColor = '#000',
        'data-highlighted-location': ***REMOVED*** = '',
        'data-tooltip-format' : tooltipFormat = '{locationName} %({value},2) \n {label}: %({value},2)',
        'data-show-no-data-tooltip': ***REMOVED*** = "false",
        'data-map-container-bg-color': ***REMOVED*** = '#fff',
        'data-map-position': mapPosition = '{}',
        "data-main-layer-id": mainLayerId = '',
        'data-enabled-layers': enabledLayers,
        'data-point-label-color': ***REMOVED*** = '#fff',
        'data-point-label-format': ***REMOVED*** = '{locationName} %({value},2)',
        'data-show-no-data-legend-item': ***REMOVED*** = false,
        'data-highlighted-loc-label-format': highlightedLocLabelFormat = "{locationName} - Score: #({value},2)",
        'data-enable-summary-view': ***REMOVED*** = "false",
        'data-map-type': mapType = "DEFAULT",
        'data-default-point-color': ***REMOVED*** = '#FFFF00',
        'data-aggregation-formula': ***REMOVED*** = 'COUNT',
        'data-zoom-level-to-show-points': zoomLevelToShowPoints = 2,
        'data-zoom-on-filter': zoomOnFilter =  "false",
        'data-zoom-on-filter-field': ***REMOVED*** = "",
        'data-no-data-text': noDataText = "No Data",
        'data-labels-exclusion-list': ***REMOVED*** = "",
        'data-custom-measure-labels': ***REMOVED*** = "{}",
        'data-show-shading-layer-labels': showShadingLayerLabels = "ifUnitHasData",
    } = props  

    const decode = (value) => {
        if (editing) {
            return value
        }
        return ***REMOVED***(value)
    }

    const parse = (value) => {
        try {
            return JSON.parse(decode(value))
        } catch (error) {
            console.error("error parsing value:" + value)
        } 
    }

    const getBreaks = (legendBreaks) => {
        let ***REMOVED*** = parse(legendBreaks) || []
        ***REMOVED*** = ***REMOVED***.map((b) => {
            if (b.min) {
                b.min =  parseFloat(b.min);
            }
            
            if (b.max) {
                b.max =  parseFloat(b.max);
            }    
    
            b.color = ***REMOVED***(b.color);
            return b;    
        })

        return ***REMOVED***;
    }

    const getFilters = (filters) => {
        const ff = parse(filters)  || []  
        let params = {};
        if (ff && ff.forEach) {
            ff.forEach(f => {
                if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                    params[f.param] = f.value
            })
        } else {
            params = ff;
        }

        return params
    }

    const numberFormat = {
        style: (style === 'compacted') ? 'decimal' : style,
        notation: (style === 'compacted') ? 'compact' : "standard",
        currency: currency,
        minimumFractionDigits: parseInt(decimals),
        maximumFractionDigits: parseInt(decimals)
    }

    let layers = parse(enabledLayers) || []
    layers = layers.map(l => {
        l.bgColor = ***REMOVED***(l.bgColor)
        l.fontColor = ***REMOVED***(l.fontColor)
        return l
    })
    
    const country = countries.find(c => c.value === mapCenter)   

    const ***REMOVED*** = ***REMOVED*** == true || ***REMOVED*** == "true"    

    const levels = [dimension1, dimension2]
    const source = levels.filter(l => l != 'none' && l != null).join('/')

    const mapProps = {
        unique,
        editing,
        source: '/' + mapFile,
        center: country.center,
        scale: country.scale,
        measures,
        legendTitle,
        height,
        width,
        topoJSONField,
        mappingField,
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***,
        legendBreaks: getBreaks(legendBreaks),
        mapLabelField,
        zoomEnabled: zoomEnabled == true || zoomEnabled == "true",
        ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
        ***REMOVED***,
        app,
        ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
        showTooltip: (showTooltip == true || showTooltip == "true"),
        ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
        ***REMOVED***,
        valueFormat,
        ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
        ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
        ***REMOVED***,
        colorScheme,
        group,
        symbols: parse(mapSymbols) || [],
        tooltipTheme,
        labelFontSize,
        ***REMOVED***: ***REMOVED***(***REMOVED***),
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***: parse(***REMOVED***) || [],
        format: numberFormat,
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***:***REMOVED***(***REMOVED***),
        ***REMOVED***: ***REMOVED***(***REMOVED***),
        mapFocusBoundaryColor: ***REMOVED***(mapFocusBoundaryColor),
        ***REMOVED***,
        tooltipFormat: tooltipFormat,
        ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
        fields: source.split("/"),
        ***REMOVED***: ***REMOVED***(***REMOVED***),
        mapPosition: parse(mapPosition),
        mainLayerId,
        enabledLayers: layers,
        ***REMOVED***: ***REMOVED***(***REMOVED***),
        ***REMOVED***,
        ***REMOVED***: ***REMOVED*** == true || ***REMOVED*** == "true",
        highlightedLocLabelFormat,
        mapType,
        ***REMOVED***: ***REMOVED***(***REMOVED***),
        zoomLevelToShowPoints,
        zoomOnFilter : zoomOnFilter == true || zoomOnFilter == "true",
        ***REMOVED***: ***REMOVED***,
        noDataText,
        ***REMOVED***: ***REMOVED***.split(',').map(l => l.trim()),
        showShadingLayerLabels
    } 
      
    const measureLabels = parse(***REMOVED***) || {}
    const DataFrame = app === "csv" ? ***REMOVED*** : MapDataFrame;   
    const measuresCSV = editing ? (parse(measures) || []).join(',') : measures    
    return (<DataProvider 
        params={getFilters(filters)}
        app={app}
        csv={***REMOVED***(csv)}
        group={group}
        editing={editing}
        store={[app, unique, ...source.split("/")]} source={source}>
        <DataConsumer>
            <DataFrame measures={measuresCSV} ***REMOVED*** = {***REMOVED***} mapType={mapType} ***REMOVED***={***REMOVED***} ***REMOVED***={measureLabels}>
                <Map  {...mapProps} />
            </DataFrame>
        </DataConsumer>

    </DataProvider>);

};

const ***REMOVED*** = (state, ownProps) => {
    return {}
}

const ***REMOVED*** = {};

export default connect(***REMOVED***, ***REMOVED***)(MapWrapper)
