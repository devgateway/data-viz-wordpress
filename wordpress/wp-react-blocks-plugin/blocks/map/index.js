import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import Generic from "../icons";

***REMOVED***(process.env.BLOCKS_NS+'/map',
    {
        title: __('Data Map'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            height: {
                type: 'Numeric',
                default: 500
            },
            ***REMOVED***: {
                type: 'String',
                default: "Source"
            },
            ***REMOVED***: {
                type: 'String',
                default: "NIDS"
            },
            source: {
                type: 'string',
                default: '',
            },
            dimension1: {
                type: 'String',
                default: 'zone'
            },
            dimension2: {
                type: 'String',
                default: 'gender'
            },
            app: {
                type: 'String',
                default: "csv"
            },
            measures: {
                type: "Array",
                default: ["***REMOVED***"]
            },
            filters: {
                type: "Array",
                default: []
            },

            csv: {
                type: "String",
                default: ""
            },
            ***REMOVED***: {
                type: "String",
                default: "National Prevalence Avg"
            },
            legendTitle: {
                type: "String",
                default: "Tobacco Prevalence Rate"
            },
            types: {
                type: "Array",
                default: [{label: 'Map', value: 'map', supports: {singleMeasure: false, ***REMOVED***: false}}]
            },
            ***REMOVED***:{
                type:'Boolean',
                default: false
            },
            legendBreaks: {
                type: "Array",
                default: [{ min: 0, max: 2.99, color: '#66A3D9', label: '', filters: []}, { min: 3, max: 4.99, color: '#BC91D9', label: '', filters: []}, { min: 5, color: '#F26363', label: '', filters: []}]
            },
            ***REMOVED***: {
                type:'Boolean',
                default: false
            },
            zoomEnabled:{
                type:'Boolean',
                default: false
            },
            mapFile: {
                type: "String",
                default: ''
            },
            enabledLayers: {
                type: "Array",
                default:[]
            },
            mainLayerId: {
                type: "String",
                default: ""
            },
            mappingField: {
                type: "String",
                default: "zone"
            },
            mapLabelField: {
                type: "String",
                default: "zone"
            },
            ***REMOVED***: {
                type:'Boolean',
                default: false
            },
            mapCenter:{
                type: "String",
                default: "NGA"
            },
            ***REMOVED***:{
                type:'Boolean',
                default: false
            },
            showTooltip:{
                type:'Boolean',
                default: true
            },
            ***REMOVED***: {
                type: "String",
                default: ""
            },
            valueFormat:{
                type: "String",
                default: "%({value},2)"
            },
            ***REMOVED***:{
                type:'Boolean',
                default: false
            },
            ***REMOVED***: {
                type:'Boolean',
                default: false
            },
            ***REMOVED***:{
                type: 'Numeric',
                default: 5
            },
            colorScheme: {
                type: 'string',
                default: 'reds'
            },
            ***REMOVED***: {
                type:'Boolean',
                default: false
            },
            group: {
                type: 'String',
                default: 'default',
            },
            mapSymbols:{
                type: 'Array',
                default: []
            },
            tooltipTheme: {
                type: 'String',
                default: 'map-tooltip-dark',
            },
            ***REMOVED***: {
                type: 'String',
                default: ***REMOVED***("#595959"),
            },
            labelFontSize: {
                type: 'Numeric',
                default: 12,
            },
            ***REMOVED***: {
                type: 'String',
                default: 'normal',
            },
            ***REMOVED***:{
                type: 'Numeric',
                default: 12,
            },
            ***REMOVED***:{
                type: 'String',
                default: 'normal',
            },
            ***REMOVED***: {
                type: "Array",
                default: []
            },
            formatStyle: {
                type: "String",
                "style": "percent",
            },
            decimals: {
                type: "Numeric",
                default: 2
            },
            currency: {
                type: "String",
                default: "USD"
            },
            ***REMOVED***:{
                type: 'Numeric',
                default: 14,
            },
            ***REMOVED***: {
                type: "String",
                default: "ifUnitHasData"
            },
            showShadingLayerLabels: {
                type: "String",
                default: "showAll"
            },
            ***REMOVED***: {
                type: 'String',
                default: ***REMOVED***("#f8f8f8"),
            },
            ***REMOVED***: {
                type: 'String',
                default: ***REMOVED***("#000"),
            },
            mapFocusBoundaryColor: {
                type: 'String',
                default: ***REMOVED***("#000"),
            },
            ***REMOVED***:{
                type: "String",
                default: ""
            },
            highlightedLocLabelFormat:{
                type: "String",
                default: "{locationName} - Score: #({value},2)"
            },
            tooltipFormat:{
                type: "String",
                default: "{locationName} %({value},2) \n {label}: %({value},2)"
            },
            ***REMOVED***: {
                type:'Boolean',
                default: false
            },
            ***REMOVED***: {
                type: 'String',
                default: ***REMOVED***("#fff"),
            },
            mapPosition: {
                type: 'String',
                default: '{}'
            },
            type: {
                type: 'string',
                default: "media",
            },
            taxonomy: {
                type: 'string',
                default: "none",
            },
            fileType: {
                type: 'string',
                default: "none",
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
            ***REMOVED***:{
                type: "String",
                default: "%({value},2)"
            },
            ***REMOVED***: {
                type: 'String',
                default: ***REMOVED***("#FFF"),
            },
            ***REMOVED***: {
                type: 'String',
                default: ***REMOVED***("#FFFF00"),
            },
            mapType: {
                type: 'String',
                default: ""
            },
            ***REMOVED***: {
                type:'Boolean',
                default: false
            },
            ***REMOVED***: {
                type: 'String',
                default: "COUNT"
            },
            zoomLevelToShowPoints:{
                type: "Numeric",
                default: 2
            },
            zoomOnFilter: {
                type:'Boolean',
                default: false
            },
            ***REMOVED***: {
                type: 'String',
                default: "name"
            },
            ***REMOVED***: {
                type: 'String',
                default: ""
            },
            noDataText: {
                type: 'String',
                default: "No Data"
            },
            ***REMOVED***: {
                type: "Object",
                default: {}
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
