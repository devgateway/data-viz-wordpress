import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { withColors} from '@wordpress/block-editor';
import { BLOCKS_NS, BLOCKS_CATEGORY, GenericIcon } from '@dg-data-viz/wp-commons';

***REMOVED***(BLOCKS_NS + '/showcase',
    {
        title: __('Showcase Form',"dg"),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes: {
            width: {
                type: 'string',
                default: "100%",
            }
            ,
            height: {
                type: 'string',
                default: "1200px",
            }
            ,
            ***REMOVED***: {
                type: 'string'
            },
            alignment: {type: 'string', default: 'center'},
            organization: {type: 'string', default: 'Organization'},
            name: {type: 'string', default: 'Name'},
            email: {type: 'string', default: 'Email'},
            country: {
                type: 'string', default: 'Country'
            },
            message: {type: 'string', default: 'Please write a message'},
            submitLabel: {type: 'string', default: 'Send'},
            resetLabel: {type: 'string', default: 'Reset'},
            ***REMOVED***: {type: 'string', default: "Thanks for submitting"},
            ***REMOVED***: {type: 'string', default: "Something didn't go well, please try again later"},
        },
        edit: withColors('***REMOVED***', {textColor: 'color'})(BlockEdit),
        save: BlockSave
    }
);
