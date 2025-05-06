import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { BLOCKS_NS, BLOCKS_CATEGORY, GenericIcon } from '@dg-data-viz/wp-commons';

***REMOVED***(BLOCKS_NS + '/datalabel',
    {
        title: __('Data Label'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
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
            dimension1: {
                type: 'String',
                default: 'none'
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
            valueType: {
                type: 'String',
                default: 'first'
            }
        },

        edit: BlockEdit,
        save: BlockSave,
    }
);

