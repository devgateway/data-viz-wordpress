import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import { GenericIcon } from "@devgateway/dvz-wp-commons";


registerBlockType(process.env.BLOCKS_NS + '/posts-with-filters',
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
            showPagination: {
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
            showDateFilter: {
                type: "boolean",
                default: false
            },
            showCategoryFilter: {
                type: "boolean",
                default: false
            },
            categories: {
                type: "array",
                default: []
            },
            categoryPlaceholder: {
                type: "string",
                default: "All Categories"
            },
            showCountryFilter: {
                type: "boolean",
                default: false
            },
            countryCategory: {
                type: "number",
                default: null
            },
            countryPlaceholder: {
                type: "string",
                default: "All Countries"
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
