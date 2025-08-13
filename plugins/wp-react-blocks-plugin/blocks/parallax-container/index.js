import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from "../icons";


***REMOVED***(process.env.BLOCKS_NS + '/parallax-container',
    {
        title: __('Parallaxed Post List', "dg"),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            panelStatus: {
                type: "Object",
                default: {}
            },
            horizontal: {
                type: 'boolean',
                default: false,
            },
            count: {
                type: 'numeric',
                default: 7,
            },
            scrolls: {
                type: 'numeric',
                default: 7,
            },
            position: {
                type: 'string',
                default: "middle",
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

            configuration: {
                type: 'array',
                default: [],
            }


        },
        edit: BlockEdit,
        save: BlockSave
    }
)
;
