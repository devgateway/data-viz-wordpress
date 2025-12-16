import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons/index.js'
// Keep Paragraph behavior unchanged; Small Number is a separate block

registerBlockType(process.env.BLOCKS_NS + '/small-number',
    {
        title: __('Small Number'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        supports: {
            __experimentalInline: true,
            html: false
        },
        attributes: {
            type: {
                type: 'string',
                default: "big-number",
            },
            group: {
                type: 'string',
                default: 'default',
            },
            panelStatus: {
                type: 'object',
                default: {}
            },
            height: {
                type: 'number',
                default: 32,
            },
            app: {
                type: 'string',
                default: "csv"
            },
            csv: {
                type: 'string',
                default: "Amount \n20000"
            },    
            params: {
                type: 'object',
                default: {}
            },
            format: {
                type: 'object',
                default: {
                    "style": "decimal",
                    "minimumFractionDigits": 0,
                    "maximumFractionDigits": 0,
                    "currency": "USD"
                }
            },
            measures: {
                type: 'array',
                default: []
            },
            _measures: {},
            filters: {
                type: 'array',
                default: []
            },
            dvzProxyDatasetId: {
                type: 'string',
                default: ""
            },
            types: {
                type: 'array',
                default: [
                  {label: 'Big Number', value: 'big-number', supports: {singleMeasure: true, singleDimension: false}}
                ]
            },           
            numberFontSize: {
                type: 'Numeric',
                default: 24
            },
            numberColor: {
                type: 'string',
                default: "#5a5d68",
            },
            waitForFilters: {
                type: 'boolean',
                default: false
            },
            noDataText: {
                type: 'string',
                default: '-'
            },
            textTemplate: {
                type: 'string',
                default: '{{value}}'
            }
        },

        edit: BlockEdit,
        save: BlockSave,
    }
);

