import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';

registerBlockType(BLOCKS_NS + '/data-filters-apply',
    {
        title: __('Apply Button', 'wp-react-blocks-plugin'),
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
            label: {
                type: 'String',
                default: "Apply"
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
