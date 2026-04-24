import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { BLOCKS_NS } from '@devgateway/dvz-wp-commons';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";


registerBlockType(BLOCKS_NS + '/big-filter',
    {
        title: __('Big Filter', 'dg'),
        icon: "database",
        category: 'wp-customizer-react-blocks',
        apiVersion: 2,
        attributes: {
            type: {
                type: 'string',
                default: "big-filter",
            },
            group: {
                type: 'String',
                default: 'default',
            },
            parent: {
                type: 'String',
                default: '',
            },
            blockName: {
                type: 'String',
                default: 'New Big Number',
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
            height: {
                type: 'number',
                default: 120,
            },
            app: {
                type: 'String',
                default: "csv"
            },
            csv: {
                type: "String",
                default: "Amount \n20000"
            },
            dimension1: {
                type: 'String',
                default: 'none'
            },

            dimension2: {
                type: 'String',
                default: 'none'
            },
            measures: {
                type: "Object",
                default: {
                    csv: {
                        format: {
                            style: "percent",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        },
                        customFormat: {
                            style: "percent",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        },
                        useCustomAxisFormat: false
                    },
                }
            },

            filters: {
                type: "Array",
                default: []
            },
            dvzProxyDatasetId: {
                type: 'String',
                default: ""
            },
            types: {
                type: "Array",
                default: [{ label: 'Big Number', value: 'big-number', supports: { singleMeasure: true, singleDimension: false } }]
            },
            nColumns: {
                type: 'Numeric',
                default: 5
            },

            numberFontSize: {
                type: 'Numeric',
                default: 24
            },
            numberColor: {
                type: 'string',
                default: "#aaaf23ff",
            },
            labelColor: {
                type: 'string',
                default: "#3a62f0ff",
            },
            backgroundColor: {
                type: 'string',
                default: "#ebecefff",
            },

            unselectedNumberColor: {
                type: 'string',
                default: "#5a5d68",
            },
            unselectedLabelColor: {
                type: 'string',
                default: "#5a5d68",
            },

            unselectedBackgroundColor: {
                type: 'string',
                default: "#ebecefff",
            },



            labelFontSize: {
                type: 'Numeric',
                default: 14
            },

            sort: {
                type: 'string',
                default: "alpha",
            },
            order: {
                type: 'string',
                default: "asc",
            },
            waitForFilters: {
                type: "Boolean",
                default: false
            },
            showZeroValues: {
                type: "Boolean",
                default: false
            },
            disabledNumberColor: {
                type: 'string',
                default: "#5a5d68",
            },
            disabledLabelColor: {
                type: 'string',
                default: "#5a5d68",
            },

        },

        edit: BlockEdit,
        save: BlockSave,
    }
);

