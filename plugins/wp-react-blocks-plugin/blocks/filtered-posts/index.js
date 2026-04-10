import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';

registerBlockType(BLOCKS_NS + '/filteredposts',
    {
        title: __('Filtered Posts'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            group: {
                type: 'string',
                default: 'default'
            },
            numberOfColumns: {
                type: 'number',
                default: 3
            },
            type: {
                type: 'string',
                default: null
            },
            taxonomy: {
                type: 'string',
                default: null
            },
            categories: {
                type: 'array',
                default: []
            },
            height: {
                type: 'number',
                default: 300
            },
            postHeight: {
                type: 'number',
                default: 240
            },
            postWidth: {
                type: 'number',
                default: 420
            },
            numberOfItemsPerPage: {
                type: 'number',
                default: 10
            },
            enableSorting: {
                type: 'boolean',
                default: false
            },
            sortingTaxonomy: {
                type: 'string',
                default: null
            },
            sortFirstBy: {
                type: 'string',
                default: 'none'
            },
            wordpressSource: {
                type: 'string',
                default: ''
            },
            wordpressSourceType: {
                type: 'string',
                default: 'internal'
            },
            noDataMsg: {
                type: 'string',
                default: 'No posts found'
            },
            clearFilterMsg: {
                type: 'string',
                default: 'Clear Filter'
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
