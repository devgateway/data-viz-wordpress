import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { BLOCKS_CATEGORY, BLOCKS_NS, GenericIcon } from '@dg-data-viz/wp-commons';

registerBlockType(BLOCKS_NS + '/measures',
    {
        title: __('Measures'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            app: {
                type: 'String',
                default: "csv",
            },
            label: {
                type: 'String',
                default: "My Measures"
            },
            measuresGroups: {
                type: 'object',
                default: {}
            },
            group: {
                type: 'String',
                default: ''
            },
        },
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
