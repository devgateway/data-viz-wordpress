import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Chart} from '../icons/index.js'

***REMOVED***(process.env.BLOCKS_NS + '/chart',
    {
        title: __('Data Chart'),
        icon: Chart,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            height: {
                type: 'number',
                default: 500,
            },

            type: {
                type: 'string',
                default: "bar",
            },
            source: {
                type: 'string',
                default: '',
            },
            bottomLegend: {
                type: 'string',
                default: "",
            }
            ,
            leftLegend: {
                type: 'string',
                default: "Left Legends",
            },
            scheme: {
                type: 'string',
                default: 'nivo'
            },

            colorBy: {
                type: 'String',
                default: 'index'
            },
            dimension1: {
                type: 'String',
                default: 'none'
            },

            dimension2: {
                type: 'String',
                default: 'none'
            },

            dimension3: {
                type: 'String',
                default: 'none'
            },

            groupMode: {
                type: 'String',
                default: 'grouped',
            },
            group: {
                type: 'String',
                default: 'default',
            },
            mode: {
                type: 'String',
                default: "chart"
            },


            dualMode: {
                type: "Boolean",
                default: false
            },
            ***REMOVED***: {
                type: 'String',
                default: "Info Graphic"
            },
            ***REMOVED***: {
                type: 'String',
                default: "Chart"
            },
            ***REMOVED***: {
                type: 'String',
                default: "Source"
            },
            dataSource: {
                type: 'String',
                default: "NIDS"
            },

            ***REMOVED***: {
                type: 'String',
                default: "top"
            },
            marginLeft: {
                type: 'Numeric',
                default: 50
            },
            marginTop: {
                type: 'Numeric',
                default: 25
            },
            marginBottom: {
                type: 'Numeric',
                default: 25
            },
            marginRight: {
                type: 'Numeric',
                default: 25
            },
            showLegends: {
                type: 'boolean',
                default: true
            },
            legendLabel: {
                type: 'String',
                default: ''
            },
            app: {
                type: 'String',
                default: "csv"
            },
            datasetId: {
                type: 'String',
                default: ""
            },
            params: {
                type: Object,
                default: {}
            },
            format: {
                type: Object,
                default: {
                    "style": "percent",
                    "minimumFractionDigits": 1,
                    "maximumFractionDigits": 1,
                    "currency": "USD"
                }
            },
            ***REMOVED***: {
                type: Object,
                default: {
                    "style": "percent",
                    "minimumFractionDigits": 1,
                    "maximumFractionDigits": 1,
                    "currency": "USD"
                }

            },
            groupTotalFixedPosition: {
                type: "Boolean",
                default: false
            },
            ***REMOVED***: {
                type: 'Numeric',
                default: 0
            },
            tickRotation: {
                type: 'Numeric',
                default: 0
            },
            offsetText: {
                type: "Numeric",
                default: 0
            },
            tickColor: {
                type: "String",
                default: ***REMOVED***("#FFFFFF")
            },
            ***REMOVED***: {
                type: 'Numeric',
                default: 10
            },
            ***REMOVED***: {
                type: 'Numeric',
                default: 10
            },
            xLabelColor: {
                type: "String",
                default: ***REMOVED***("#000000")
            },
            barLabelColor: {
                type: "String",
                default: ***REMOVED***("#000000")
            },
            keys: {
                type: "Array",
                default: []
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
                        ***REMOVED***: false
                    },
                }
            },

            _measures: {},
            filters: {
                type: "Array",
                default: []
            },
            csv: {
                type: "String",
                default: "Key1,Key2,Key3,Key4 \nIndex1,12,13,14 \nIndex2,22,23,34 \nIndex3,32,33,34"
            },
            startAngle: {
                type: "Numeric",
                default: 0
            },
            tooltipHTML: {
                type: "String",
                default: "{value}"
            },
            tooltip: {
                type: "String",
                default: "{value}"
            },
            endAngle: {
                type: "Numeric",
                default: 360
            },
            layout: {
                type: "String",
                default: "vertical"
            },
            reverse: {
                type: "Boolean",
                default: false
            },
            ***REMOVED***: {
                type: "Boolean",
                default: false
            },

            ***REMOVED***: {
                type: "Boolean",
                default: false
            },
            ***REMOVED***: {
                type: "String",
                default: "",
            },
            ***REMOVED***: {
                type: "String",
                default: "",
            },

            useCheckBoxBackground: {
                type: "Boolean",
                default: true
            },
            offsetY: {
                type: "Numeric",
                default: -40
            },
            groupTotalLabelOffset: {
                type: "Numeric",
                default: 0
            },
            ***REMOVED***: {
                type: "String",
                default: ***REMOVED***("#000000")
            },

            overlays: {
                type: 'Array',
                default: []
            },

            ***REMOVED***: {
                type: "String",
                default: ""
            },
            csvLineColor: {
                type: "String",
                default: ***REMOVED***("#000000")
            },
            ***REMOVED***: {
                type: "String",
                default: "{x} - #({y},2)"
            },
            csvLineTitle: {
                type: "String",
                default: "Overlay"
            },
            ***REMOVED***: {
                type: "Boolean",
                default: false
            },
            valueScale: {
                type: 'String',
                default: 'linear'
            },
            maxValue: {
                type: 'String',
                default: 'auto'
            },
            fixedMinValue: {
                type: 'Numeric',
                default: 0
            },
            fixedMaxValue: {
                type: 'Numeric',
                default: 0
            },
            swap: {
                type: 'Boolean',
                default: false
            },
            noDataMessage: {
                type: 'String',
                default: "No data matches your selection.",
            },
            types: {
                type: "Array",
                default: [
                    {label: 'Bar', value: 'bar', supports: {singleMeasure: false, ***REMOVED***: false}},
                    {label: 'Pie', value: 'pie', supports: {singleMeasure: false, ***REMOVED***: false}},
                    {label: 'Line', value: 'line', supports: {singleMeasure: false, ***REMOVED***: true}},
                    {label: 'Radar', value: 'radar', supports: {singleMeasure: true, ***REMOVED***: true}}
                ]
            },
            barColor: {
                type: "String",
                default: ***REMOVED***("#000000")
            },
            ***REMOVED***: {
                type: 'Boolean',
                default: false
            },

            manualColors: {
                type: 'Object',
                default: {}
            },
            barPadding: {
                type: 'Numeric',
                default: 0.15
            },
            ***REMOVED***: {
                type: "String",
                default: "middle"
            },
            ***REMOVED***: {
                type: "String",
                default: "none"
            },
            showGrid: {
                type: 'Boolean',
                default: true
            },
            ***REMOVED***: {
                type: 'Boolean',
                default: false
            },
            overallLabel: {
                type: "String",
                default: "Overall"
            },
            ***REMOVED***: {
                type: "Boolean",
                default: true
            },
            ***REMOVED***: {
                type: 'Numeric',
                default: 0.7
            },
            ***REMOVED***: {
                type: "Boolean",
                default: false
            },
            showTickLine: {
                type: "Boolean",
                default: false
            },
            showRightAxis: {
                type: "Boolean",
                default: false
            },
            offsetRight: {
                type: "Numeric",
                default: 40
            },
            rightLegend: {
                type: 'string',
                default: "Right Legend",
            },
            offsetBottom: {
                type: "Numeric",
                default: 40
            },
            hiddenBars: {
                type: "Array",
                default: []
            },

            enableArea: {
                type: "Boolean",
                default: false
            },
            ***REMOVED***: {
                type: 'string',
                default: "DEFAULT"
            },
            ***REMOVED***: {
                type: 'string',
                default: ""
            },
            ***REMOVED***: {
                type: 'string',
                default: ""
            },
            showPoints: {
                type: "Boolean",
                default: true
            },
            ***REMOVED***: {
                type: "Array",
                default: []
            },
            centerLabel: {
                type: 'string',
                default: ""
            },
            centerLabelFontWeight: {
                type: 'String',
                default: 'normal'
            },
            ***REMOVED***: {
                type: 'Numeric',
                default: 12
            },
            showArcLabels: {
                type: "Boolean",
                default: true
            },
            ***REMOVED***: {
                type: "Boolean",
                default: false
            },
            slicePadding: {
                type: "Numeric",
                default: 1
            },
            ***REMOVED***: {
                type: "Numeric",
                default: 0
            },
            ***REMOVED***: {
                type: "Numeric",
                default: 0
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
            tooltipEnableMarkdown: {
                type: 'Boolean',
                default: false
            },
            enableGridY: {
                type: 'Boolean',
                default: true
            },
            enableGridX: {
                type: 'Boolean',
                default: false
            },
            minMaxClamp: {
                type: 'Boolean',
                default: false
            },
            ***REMOVED***: {
                type: 'Object',
                default: {
                    ***REMOVED***: false,
                    labels: {
                        xAxis: {},
                        yAxis: {}
                    },
                    xAxisDisabled: false,
                    tickRotation: 0,
                    ***REMOVED***: 0,
                    yAxisIntervalUserModified: false,
                    ***REMOVED***: false,
                    marginLeft: 50,
                    marginTop: 25,
                    marginBottom: 25,
                    marginRight: 25,
                    ***REMOVED***: true,
                    ***REMOVED***: true,
                    ***REMOVED***: true
                }
            },
            reverseLegend: {
                type: 'Boolean',
                default: false
            },
            sort: {
                type: 'string',
                default: '',
            },
            ***REMOVED***: {
                type: 'string',
                default: 'none',
            },
            sortReverse: {
                type: 'Boolean',
                default: false
            },
            radarCurve: {
                type: 'string',
                default: 'linearClosed'
            },
            ***REMOVED***: {
                type: 'Numeric',
                default: 0.25
            },
            ***REMOVED***: {
                type: 'Numeric',
                default: 1
            },
            ***REMOVED***: {
                type: 'Numeric',
                default: 7
            },
            ***REMOVED***: {
                type: 'string',
                default: 'circular'
            },
            ***REMOVED***: {
                type: 'Numeric',
                default: 36
            },
            ***REMOVED***: {
                type: 'Boolean',
                default: true
            },
            radarDotSize: {
                type: 'Numeric',
                default: 6
            },
            ***REMOVED***: {
                type: 'Boolean',
                default: false

            },
            ***REMOVED***: {
                type: 'Numeric',
                default: -12
            }            
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
