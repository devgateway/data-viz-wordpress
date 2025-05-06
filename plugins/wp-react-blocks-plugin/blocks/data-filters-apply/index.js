import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { BLOCKS_NS, BLOCKS_CATEGORY, GenericIcon } from '@dg-data-viz/wp-commons';

registerBlockType(BLOCKS_NS + '/data-filters-apply',
    {
        title: __('Apply Button', 'wp-react-blocks-plugin'),
        category: BLOCKS_CATEGORY,
        icon: GenericIcon,
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
