import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';

registerBlockType(BLOCKS_NS + '/posts-pagination',
    {
        title: __('Posts Pagination'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            group: {
                type: 'String',
                default: "default",
            },
            numberOfItemsPerPage: {
                type: 'number',
                default: 10,
            },
            wordpressSource: {
                type: 'string',
                default: ''
            },
            wordpressSourceType: {
                type: 'string',
                default: 'internal'
            },
            pageLabel: {
                type: 'string',
                default: 'Page'
            },
            ofLabel: {
                type: 'string',
                default: 'of'
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
