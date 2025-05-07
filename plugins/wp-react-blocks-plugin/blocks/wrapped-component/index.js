import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { GenericIcon } from '@devgateway/dvz-wp-commons';
import { BLOCKS_NS, BLOCKS_CATEGORY } from '@devgateway/dvz-wp-commons';


registerBlockType(`${BLOCKS_NS}/wrapped-component`,
    {
        title: __('Wrapped Component', "dg"),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes: {
            panelStatus: {
                type: "Object",
                default: {}
            },
            name: {
                type: 'string',
                default: "none",
            },
            attr: {
                type: 'array',
                default: [],

            },
            height: {
                type: 'Numeric',
                default: 500,
            },
        },

        edit: BlockEdit,
        save: BlockSave
    }
)
;
