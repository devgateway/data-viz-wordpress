import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { BLOCKS_CATEGORY, BLOCKS_NS, GenericIcon } from '@devgateway/dvz-wp-commons';

***REMOVED***(`${BLOCKS_NS}/featured-tabs`,
    {
        title: __('Featured Tabs'),
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
            height: {
                type: 'Numeric',
                default: 500,
            },
            readMoreLabel:{
                type:"String",
                default:"READ More"
            },
            useScrolls: {
                type: "boolean",
                default: false
            },
            colors: {
                type: "object",
                default: {color_0: '#FFFF', color_1: '#FFFF', color_2: '#FFFF'}
            },
            previewMode: {
                type: "string",
                default: "Desktop"
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
