import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from "../icons";


***REMOVED***(process.env.BLOCKS_NS+'/back-to-top',
    {
        title: __('Back To Top','dg'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            buttonLabel: {
                type: 'string',
                default: "BACK TO THE TOP",
            },
            height: {
                type: 'Numeric',
                default: 100,
            },
            width: {
                type: 'Numeric',
                default: 100,
            },
            ***REMOVED***: {
                type: 'string',
                default: "#ecb040",
            },
            fontColor: {
                type: 'string',
                default: "#fff",
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
