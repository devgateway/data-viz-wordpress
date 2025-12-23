import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';

registerBlockType(BLOCKS_NS + '/new-d3-map',
    {
        title: __('D3 Map'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {

            identifier: {
                type: 'Numeric',
                default: 0
            },
            k: {
                type: 'Numeric',
                default: 1
            },
            x: {
                type: 'Numeric',
                default: 1
            },
            y: {
                type: 'Numeric',
                default: 1
            },
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
            backGroundColor: {
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
            rotationEnabled: {
                type: "Boolean",
                default: false
            }   ,
            dvzProxyDatasetId: {
                type: 'String',
                default: ""
            },
            waitForFilters: {
                type: "Boolean",
                default: false
            },
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);