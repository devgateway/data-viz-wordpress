import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { BLOCKS_CATEGORY, BLOCKS_NS, GenericIcon } from '@devgateway/dvz-wp-commons';

***REMOVED***(BLOCKS_NS + 'viz-components/pdf',
    {
        title: __('PDF Export', "dg"),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes: {
            buttonLabel: {
                type: 'string',
                default: "Download Prevalence Factsheet"
            },
            height: {
                type: 'Numeric',
                default: 200,
            },
            fileName: {
                type: 'string',
                default: 'export.pdf'
            },
            url: {
                type: 'string',
            },

            post: {
                type: 'boolean',
                default: true
            },
            page: {
                type: 'boolean',
                default: true
            },


        }
        ,
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
