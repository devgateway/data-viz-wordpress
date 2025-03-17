import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons/index.js'

***REMOVED***(process.env.BLOCKS_NS + '/bignumber',
    {
        title: __('Big Number'),
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
                type: 'number',
                default: 20,
            },
            app: {
                type: 'String',
                default: "csv"
            },

            params: {
                type: Object,
                default: {}
            },
            format: {
                type: Object,
                default: {
                    "style": "percent",
                    "minimumFractionDigits": 1,
                    "maximumFractionDigits": 1,
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
            ***REMOVED***: {
                type: 'String',
                default: ""
            },
            types: {
                type: "Array",
                default: [
                  {label: 'Big Number', value: 'big-number', supports: {singleMeasure: true, ***REMOVED***: false}}
                ]
            },
            label: {
                type: 'String',
                default: ""
            },
            ***REMOVED***: {
                type: 'Numeric',
                default: 14
            },
            numberColor: {
                type: 'string',
                default: "#a7a9ac",
            },
            labelFontSize: {
                type: 'Numeric',
                default: 14
            },
            labelColor: {
                type: 'string',
                default: "#a7a9ac",
            },
        },

        edit: BlockEdit,
        save: BlockSave,
    }
);

