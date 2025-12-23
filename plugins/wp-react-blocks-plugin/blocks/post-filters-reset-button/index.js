import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';

registerBlockType(BLOCKS_NS + '/postsfiltersreset',
    {
        title: __('Posts Filters Reset Button'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            group: {
                type: 'string',
                default: 'default'
            },
            resetLabel: {
                type: 'string',
                default: 'Reset Filters'
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
