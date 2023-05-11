import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import Generic from "../icons";

***REMOVED***(process.env.BLOCKS_NS + '/child-pages-menu',
    {
        title: __('Child Pages Menu'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            title: {
                type: 'String',
                default: ""
            },
            parent:{
                type: 'Numeric',
                default: null
            },
            height:{
                type: 'Numeric',
                default: 500
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
