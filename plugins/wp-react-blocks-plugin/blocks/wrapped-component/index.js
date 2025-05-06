import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { GenericIcon } from '@dg-data-viz/wp-commons';
import { BLOCKS_NS, BLOCKS_CATEGORY } from '@dg-data-viz/wp-commons';


***REMOVED***(`${BLOCKS_NS}/wrapped-component`,
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
