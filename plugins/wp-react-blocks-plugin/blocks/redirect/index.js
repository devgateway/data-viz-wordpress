import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons'

***REMOVED***(process.env.BLOCKS_NS + '/redirect',
    {
        title: __('Redirect'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
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