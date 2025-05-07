import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { GenericIcon } from "@devgateway/dvz-wp-commons";
import { BLOCKS_NS, BLOCKS_CATEGORY } from "@devgateway/dvz-wp-commons";

***REMOVED***(BLOCKS_NS + '/new-d3-map',
    {
        title: __('D3 Map'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {

            height: {
                type: 'Numeric',
                default: 500
            },
            width: {
                type: 'Numeric',
                default: 1024
            },
            group: {
                type: 'string',
                default: 'default',
            },
            projection: {
                type: 'string',
                default: 'geoMercator',
            },

            layers: {
                type: "Array",
                default: []
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
            ***REMOVED***: {
                type: "string",
                default: "#347ba2"
            },
            mapPosition: {
                type: "Object",
                default: {}
            },
            zoomEnabled: {
                type: "Boolean",
                default: true
            },
            ***REMOVED***: {
                type: "Boolean",
                default: false
            }          
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);