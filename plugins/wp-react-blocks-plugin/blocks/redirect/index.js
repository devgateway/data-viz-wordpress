import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { BLOCKS_NS, BLOCKS_CATEGORY, GenericIcon } from '@dg-data-viz/wp-commons';

registerBlockType(BLOCKS_NS + '/redirect',
    {
        title: __('Redirect', 'dg'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes: {
            redirect_url: {
                type: 'string',
                default: ""
            },

          },
        edit: BlockEdit,
        save: BlockSave,
    }
);