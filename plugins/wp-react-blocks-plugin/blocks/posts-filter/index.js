import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';

registerBlockType(BLOCKS_NS + '/posts-filter',
    {
        title: __('Posts Filter'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            group: {
                type: 'String',
                default: "default",
            },
            placeholder: {
                type: 'String',
                default: "All Options"
            },
            allLabel: {
                type: 'String',
                default: "Select All",
            },
            alphabeticalSort: {
                type: 'Boolean',
                default: true
            },
            ascOrder: {
                type: 'Boolean',
                default: true,
            },
            noneLabel: {
                type: 'String',
                default: "Select None",
            },
            useSingleColumn: {
                type: 'Boolean',
                default: false
            },
            enableTextSearch: {
                type: 'Boolean',
                default: false
            },
            allNoneSameBehaviour: {
                type: 'Boolean',
                default: false
            },
            autoApply: {
                type: 'Boolean',
                default: true
            },
            closeOnSelect: {
                type: 'Boolean',
                default: true
            },
            filterType: {
                type: 'String',
                default: 'single-select'
            },
            showNoDataOption: {
                type: 'Boolean',
                default: true
            },
            taxonomy: {
                type: 'string',
                default: null,
            },
            categories: {
                type: 'array',
                default: [],
            },
            type: {
                type: 'string',
                default: null,
            },
            isCountryFilter: {
                type: 'boolean',
                default: false
            },
            isYearFilter: {
                type: 'boolean',
                default: false
            },
            selectedYear: {
                type: 'number',
                default: null
            },
            defaultValues: {
                type: 'array',
                default: [],
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
