import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { BLOCKS_CATEGORY, BLOCKS_NS, GenericIcon } from '@devgateway/dvz-wp-commons';

***REMOVED***(BLOCKS_NS+'/post-carousel',
    {
        title: __('Posts Carousel',"dg"),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes: {
            count: {
                type: 'Numeric',
                default: 3,
            },
            type: {
                type: 'string',
                default: "posts",
            },
            taxonomy: {
                type: 'string',
                default: "none",
            },
            categories: {
                type: 'array',
                default: [],
            },
            height:{
                type: 'Numeric',
                default: 500,
            },
            autoSwitch:{
                type:'Boolean',
                default:false
            },
            interval:{
                type: 'Numeric',
                default: 10000,
            },
            panelStatus: {
                type: "Object",
                default: {}
            }
        },
        edit: BlockEdit,
        save: BlockSave
    }
)
;
