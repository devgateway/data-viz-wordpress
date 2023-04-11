import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import Generic from "../icons";

***REMOVED***(process.env.BLOCKS_NS + '/filter',
    {
        title: __('Data Filter'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {

            placeHolder: {
                type: 'String',
                default: ""
            },
            type: {
                type: 'String',
                default: ""
            },
            param: {
                type: 'String',
                default: ""
            },
            app: {
                type: 'String',
                default: "csv",
            },
            group: {
                type: 'String',
                default: "default",
            },
            icon: {
                type: 'String',
                default: "filter",
            },
            csvField: {
                type: 'String',
                default: "",
            },
            csvValue: {
                type: 'String',
                default: "",
            },
            isRange: {
                type: 'Boolean',
                default: false
            },
            allLabel: {
                type: 'String',
                default: "Select All",
            },
            noneLabel: {
                type: 'String',
                default: "Select None",
            },
            startLabel: {
                type: 'String',
                default: "Start",
            },
            endLabel: {
                type: 'String',
                default: "End",
            },
            ***REMOVED***: {
                type: 'Boolean',
                default: false
            },
            ***REMOVED***: {
                type: 'Boolean',
                default: false 
            },
            ***REMOVED***: {
                type: 'Boolean',
                default: true 
            },
            filterType: {
                type: 'String',
                default: 'multi-select'
            },
            defaultValues: {
                type: 'String',
                default: ""
            },
            ***REMOVED***:{
                type: 'String',
                default: "DEFAULT_VALUE_INPUT"
            },
            ***REMOVED***: {
                type: 'String',
                default: "Yes",
            },
            ***REMOVED***: {
                type: 'String',
                default: "No",
            },
            hiddenFilters: {
                type: "Array",
                default: []
            },
            ***REMOVED***:{
                type: 'Boolean',
                default: false 
            },
            closeOnSelect:{
                type: 'Boolean',
                default: false 
            }

        },
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
