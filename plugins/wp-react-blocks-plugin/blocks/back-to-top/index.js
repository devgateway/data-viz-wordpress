import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';


registerBlockType(BLOCKS_NS+'/back-to-top',
    {
        title: __('Back To Top','dg'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
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
            backgroundColor: {
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
