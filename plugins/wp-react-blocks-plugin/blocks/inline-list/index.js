import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { BLOCKS_NS, BLOCKS_CATEGORY, GenericIcon } from '@dg-data-viz/wp-commons';

***REMOVED***(`${BLOCKS_NS}/inline-list`,
    {
        title: __('Inline List'),
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

            showIcons: {
                type: 'boolean',
                default: false
            },
            colors: {
                type: "object",
                default: {color_0: '#FFFF', color_1: '#FFFF', color_2: '#FFFF'}
            },
            ***REMOVED***: {
                type: 'boolean',
                default: false
            },
            contentToggleHPosition: {
                type: 'Numeric',
                default: 50,
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
        }
        ,
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
