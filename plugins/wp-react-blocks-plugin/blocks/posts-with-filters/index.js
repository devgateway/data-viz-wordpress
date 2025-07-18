import { __ } from '@wordpress/i18n';
import { ***REMOVED*** } from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { GenericIcon } from "@devgateway/dvz-wp-commons";


***REMOVED***(process.env.BLOCKS_NS + '/posts-with-filters',
    {
        title: __('Posts with Filters', "dg"),
        icon: GenericIcon,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            className: {
                type: "string",
                default: ""
            },
            height: {
                type: "number",
                default: 300
            },
            ***REMOVED***: {
                type: "boolean",
                default: false
            },
            postsPerPage: {
                type: "number",
                default: 10
            },
            showFilters: {
                type: "boolean",
                default: false
            },
            ***REMOVED***: {
                type: "boolean",
                default: false
            },
            ***REMOVED***: {
                type: "boolean",
                default: false
            },
            categories: {
                type: "array",
                default: []
            },
            ***REMOVED***: {
                type: "string",
                default: "All Categories"
            },
            ***REMOVED***: {
                type: "boolean",
                default: false
            },
            ***REMOVED***: {
                type: "number",
                default: null
            },
            ***REMOVED***: {
                type: "string",
                default: "All Countries"
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
