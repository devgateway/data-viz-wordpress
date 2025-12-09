import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons/index.js'

registerBlockType(process.env.BLOCKS_NS + '/groupedbars',
    {
        title: __('Grouped Bars'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            type: {
                type: 'string',
                default: "big-number",
            },
            group: {
                type: 'String',
                default: 'default',
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
            height: {
                type: 'Numeric',
                default: 120,
            },
            app: {
                type: 'String',
                default: "csv"
            },
            dimension1: {
                type: 'String',
                default: 'none'
            },
            csv: {
                type: "String",
                default: "Year,Amount \n2019,20000 \n2018,10000"
            },           
            params: {
                type: Object,
                default: {}
            },
            format: {
                type: Object,
                default: {
                    "style": "decimal",
                    "minimumFractionDigits": 0,
                    "maximumFractionDigits": 0,
                    "currency": "USD"
                }
            },
            
            measures: {
                type: "Array",
                default: []
            },
            _measures: {},
            filters: {
                type: "Array",
                default: []
            },
            dvzProxyDatasetId: {
                type: 'String',
                default: ""
            },
            types: {
                type: "Array",
                default: [
                  {label: 'Big Number', value: 'big-number', supports: {singleMeasure: true, singleDimension: false}}
                ]
            },
            textColor: {
                type: 'string',
                default: "#5a5d68",
            },
           
            fontSize: {
                type: 'Numeric',
                default: 14
            },
            defaultBarColor: {
                type: 'string',
                default: "#3182ce"
            },
            barBackgroundColor: {
                type: 'string',
                default: "#e0e0e0"
            },
            waitForFilters: {
                type: "Boolean",
                default: false
            },
            noDataText: {
                type: 'string',
                default: '-'
            },
            manualColors: {
                type: 'string',
                default: '{}' 
            },
            labelPosition: {
                type: 'string',
                default: 'top'
            },
            labelWidth: {
                type: 'Numeric',
                default: 30
            },
            labelHeight: {
                type: 'Numeric',
                default: 32
            },
            valuePosition: {
                type: 'string',
                default: 'top'
            },
            labelFormat: {
                type: 'string',
                default: '{value}'
            },
            sorting: {
                type: 'string',
                default: 'none'
            },
            sortDirection: {
                type: 'string',
                default: 'asc'
            },
            topN : {
                type: 'Numeric',
                default:  null
            },
        },
        edit: BlockEdit,
        save: BlockSave
    }
);

