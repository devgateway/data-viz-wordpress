import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import BlockSaveV1 from "./BlockSaveV1"

import { GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY } from '@devgateway/dvz-wp-commons';

const oldAttributes = {

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
    filters: {
        type: "Array",
        default: []
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
    useSingleColumn: {
        type: 'Boolean',
        default: false
    },
    enableTextSearch: {
        type: 'Boolean',
        default: false
    },
    showNoDataOption: {
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
    defaultValueCriteria: {
        type: 'String',
        default: "DEFAULT_VALUE_INPUT"
    },
    booleanTrueLabel: {
        type: 'String',
        default: "Yes",
    },
    booleanFalseLabel: {
        type: 'String',
        default: "No",
    },
    hiddenFilters: {
        type: "Array",
        default: []
    },
    allNoneSameBehaviour: {
        type: 'Boolean',
        default: false
    },
    alphabeticalSort: {
        type: 'Boolean',
        default: true
    },
    ascOrder: {
        type: 'Boolean',
        default: true,
    },
    closeOnSelect: {
        type: 'Boolean',
        default: false
    },
    useFilterItems: {
        type: 'Boolean',
        default: true
    },
    dvzProxyDatasetId: {
        type: 'String',
        default: ""
    },
    autoApply: {
        type: 'Boolean',
        default: true
    },
    childFilter: {
        type: 'String',
        default: ""
    },
    childFilterParam: {
        type: 'String',
        default: ""
    },
    parentFilter: {
        type: 'String',
        default: ""
    },
    parentFilterParam: {
        type: 'String',
        default: ""
    }

}

const newAttributes = {
    ...oldAttributes,

    defaultTopNEnabled: {
        type: 'boolean',
        default: undefined
    },

    defaultTopNCount: {
        type: 'number',
        default: undefined
    },

    showAsButtons: {
        type: 'Boolean',
        default: false
    }
}



const deprecated = [
    {
        attributes: oldAttributes,

        migrate(attrs) {
            return {
                ...attrs,
                defaultTopNEnabled: false,
                defaultTopNCount: 3
            };
        },

        save: BlockSaveV1,
    },
];

registerBlockType(BLOCKS_NS + '/filter',
    {
        title: __('Data Filter'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: newAttributes,
        edit: BlockEdit,
        save: BlockSave,
        deprecated
    }
)