import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';

registerBlockType(BLOCKS_NS + '/data-filters-reset',
    {
        title: __('Data Filters Reset'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            group: {
                type: 'String',
                default: "default"
            },
            app: {
                type: 'String',
                default: "csv"
            },
            resetLabel: {
                type: 'String',
                default: "Reset All Filters"
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
