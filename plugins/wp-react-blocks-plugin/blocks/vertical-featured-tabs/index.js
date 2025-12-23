import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';

registerBlockType(`${BLOCKS_NS}/vertical-tabs`,
    {
        title: __('Vertical Tabs'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes: {
            count: {
                type: 'Numeric',
                default: 3,
            },

            coverWidth: {
                type: 'Numeric',
                default: 50,
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
            clickToExpandLabel:{
                type:"String",
                default:"CLICK TO EXPAND"
            },
            colors: {
                type: "object",
                default: {color_0: '#FFFF', color_1: '#FFFF', color_2: '#FFFF'}
            },
            previewMode: {
                type: 'string',
                default: 'Desktop'
            }
        }
        ,
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
