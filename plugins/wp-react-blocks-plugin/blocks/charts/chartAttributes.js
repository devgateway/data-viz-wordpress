export const CHART_ATTRIBUTES = {
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
    toggleInfoLabel: {
        type: 'String',
        default: "Info Graphic"
    },
    toggleChartLabel: {
        type: 'String',
        default: "Chart"
    },
    dataSourceLabel: {
        type: 'String',
        default: "Source"
    },
    dataSource: {
        type: 'String',
        default: "NIDS"
    },

    legendPosition: {
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
    showLegendsInColumns: {
        type: 'boolean',
        default: false
    },
    numberOfLegendColumns: {
        type: 'Numeric',
        default: 4
    },
    legendLabel: {
        type: 'String',
        default: ''
    },
    app: {
        type: 'String',
        default: "csv"
    },

    params: {
        type: Object,
        default: {}
    },
    dvzProxyDatasetId: {
        type: 'String',
        default: ""
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
    groupTotalFormat: {
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
    groupTotalOffset: {
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
        default: encodeURIComponent("#FFFFFF")
    },
    yAxisTickValues: {
        type: 'Numeric',
        default: 10
    },
    xAxisTickValues: {
        type: 'Numeric',
        default: 10
    },
    lineXAxisTickMode: {
        type: 'string',
        default: 'none'
    },
    lineXAxisTickCount: {
        type: 'Numeric',
        default: 10
    },
    lineXAxisTickEvery: {
        type: 'Numeric',
        default: 1
    },
    enableMeasureSelector: {
        type: 'Boolean',
        default: false
    },
    measureSelectorLabel: {
        type: 'String',
        default: 'Measure'
    },
    defaultMeasure: {
        type: 'String',
        default: ''
    },
    xLabelColor: {
        type: "String",
        default: encodeURIComponent("#000000")
    },
    barLabelColor: {
        type: "String",
        default: encodeURIComponent("#000000")
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
                useCustomAxisFormat: false
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
    useLabelBackground: {
        type: "Boolean",
        default: false
    },

    showGroupTotal: {
        type: "Boolean",
        default: false
    },
    groupTotalMeasure: {
        type: "String",
        default: "",
    },
    groupTotalLabel: {
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
    legendLabelColor: {
        type: "String",
        default: encodeURIComponent("#000000")
    },

    overlays: {
        type: 'Array',
        default: []
    },

    csvLineLayerData: {
        type: "String",
        default: ""
    },
    csvLineColor: {
        type: "String",
        default: encodeURIComponent("#000000")
    },
    csvLineTooltip: {
        type: "String",
        default: "{x} - #({y},2)"
    },
    csvLineTitle: {
        type: "String",
        default: "Overlay"
    },
    lineLayerEnabled: {
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
            {label: 'Bar', value: 'bar', supports: {singleMeasure: false, singleDimension: false}},
            {label: 'Pie', value: 'pie', supports: {singleMeasure: false, singleDimension: false}},
            {label: 'Line', value: 'line', supports: {singleMeasure: false, singleDimension: true}},
            {label: 'Radar', value: 'radar', supports: {singleMeasure: true, singleDimension: true}},
            {label: 'Bump', value: 'bump', supports: {singleMeasure: true, singleDimension: true}},
            {label: 'Waterfall', value: 'waterfall', supports: {singleMeasure: true, singleDimension: true}},
            {label: 'Dumbbell', value: 'dumbbell', supports: {singleMeasure: false, singleDimension: true}},
            {label: 'Histogram', value: 'histogram', supports: {singleMeasure: true, singleDimension: true}},
            {label: 'Scatter', value: 'scatter', supports: {singleMeasure: false, singleDimension: true}},
            {label: 'Heatmap', value: 'heatmap', supports: {singleMeasure: true, singleDimension: false}},
            {label: 'Sunburst', value: 'sunburst', supports: {singleMeasure: true, singleDimension: false}},
            {label: 'Interval Plot', value: 'intervalPlot', supports: {singleMeasure: false, singleDimension: true}},
            {label: 'Diverging', value: 'diverging', supports: {singleMeasure: false, singleDimension: true}}
        ]
    },
    barColor: {
        type: "String",
        default: encodeURIComponent("#000000")
    },
    overrideTickColor: {
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
    barLabelPosition: {
        type: "String",
        default: "middle"
    },
    lineLabelPosition: {
        type: "String",
        default: "none"
    },
    showGrid: {
        type: 'Boolean',
        default: true
    },
    includeOverall: {
        type: 'Boolean',
        default: false
    },
    overallLabel: {
        type: "String",
        default: "Overall"
    },
    tooltipEnabled: {
        type: "Boolean",
        default: true
    },
    barInnerPadding: {
        type: 'Numeric',
        default: 0.7
    },
    highlightXAxisLine: {
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
    areaShadingCriteria: {
        type: 'string',
        default: "DEFAULT"
    },
    areaLowerBound: {
        type: 'string',
        default: ""
    },
    areaUpperBound: {
        type: 'string',
        default: ""
    },
    showPoints: {
        type: "Boolean",
        default: true
    },
    confidenceIntervals: {
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
    centerLabelFontSize: {
        type: 'Numeric',
        default: 12
    },
    showArcLabels: {
        type: "Boolean",
        default: true
    },
    showArcLinkLabels: {
        type: "Boolean",
        default: false
    },
    slicePadding: {
        type: "Numeric",
        default: 1
    },
    centerLabelXOffset: {
        type: "Numeric",
        default: 0
    },
    centerLabelYOffset: {
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
    mobileCustomization: {
        type: 'Object',
        default: {
            showCustomization: false,
            labels: {
                xAxis: {},
                yAxis: {}
            },
            xAxisDisabled: false,
            mobileXAxisTextRotation: 0,
            tabletXAxisTextRotation: 0,
            xAxisTickValues: 10,
            xAxisIntervalUserModified: false,
            yAxisTickValues: 10,
            yAxisIntervalUserModified: false,
            chartLayoutOverride: false,
            marginLeft: 50,
            marginTop: 25,
            marginBottom: 25,
            marginRight: 25,
            showXAxisTitle: true,
            showYAxisTitle: true,
            showRightAxisTitle: true,
            barPadding: 0.15,
            barInnerPadding: 0.7,
            mobileYAxisLineHeight: 12,
            mobileMaxTickLength: 25,
            tabletYAxisLineHeight: 12,
            tabletMaxTickLength: 25,
            mobileXAxisTextRotationModified: false,
            tabletXAxisTextRotationModified: false,
            mobileMarginBottom: 25,
            mobileMarginLeft: 25,
            mobileMarginRight: 25,
            mobileMarginTop: 25,
            tabletMarginBottom: 25,
            tabletMarginLeft: 25,
            tabletMarginRight: 25,
            tabletMarginTop: 25
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
    sortSecondDimension: {
        type: 'string',
        default: 'none',
    },
    sortReverse: {
        type: 'Boolean',
        default: false
    },
    sortReverseSecondDimension: {
        type: 'Boolean',
        default: false
    },
    radarCurve: {
        type: 'string',
        default: 'linearClosed'
    },
    radarFillOpacity: {
        type: 'Numeric',
        default: 0.25
    },
    radarBorderWidth: {
        type: 'Numeric',
        default: 1
    },
    radarGridLevels: {
        type: 'Numeric',
        default: 7
    },
    radarGridShape: {
        type: 'string',
        default: 'circular'
    },
    radarGridLabelOffset: {
        type: 'Numeric',
        default: 36
    },
    radarEnableDots: {
        type: 'Boolean',
        default: true
    },
    radarDotSize: {
        type: 'Numeric',
        default: 6
    },
    radarEnableDotLabel: {
        type: 'Boolean',
        default: false

    },
    radarDotLabelOffset: {
        type: 'Numeric',
        default: -12
    },
    showPercentage: {
        type: 'Boolean',
        default: false
    },
    previewMode: {
        type: "string",
        default: "Desktop"
    },
    waitForFilters: {
        type: "Boolean",
        default: false
    },
    lineCurve: {
        type: "string",
        default: "linear"
    },
    scatterMinSize: {
        type: 'Numeric',
        default: 10
    },
    scatterMaxSize: {
        type: 'Numeric',
        default: 30
    },
    scatterShowLabels: {
        type: 'Boolean',
        default: false
    },
    scatterConnectPoints: {
        type: 'Boolean',
        default: false
    },
    scatterPointOpacity: {
        type: 'Numeric',
        default: 0.85
    },
    scatterReferenceX: {
        type: 'String',
        default: ''
    },
    scatterReferenceY: {
        type: 'String',
        default: ''
    },
    scatterReferenceXLabel: {
        type: 'String',
        default: ''
    },
    scatterReferenceYLabel: {
        type: 'String',
        default: ''
    },
    scatterQuadrantTopLeftLabel: {
        type: 'String',
        default: ''
    },
    scatterQuadrantTopRightLabel: {
        type: 'String',
        default: ''
    },
    scatterQuadrantBottomLeftLabel: {
        type: 'String',
        default: ''
    },
    scatterQuadrantBottomRightLabel: {
        type: 'String',
        default: ''
    },
};

