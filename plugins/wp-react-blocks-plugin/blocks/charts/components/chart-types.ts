import { Application, Category, Dimension, Measure } from "@devgateway/dvz-wp-commons";

export interface BarChartAttributes {
    scheme: string;
    app: string;
    measures: string[];
    dimension1: string;
    dimension2: string;
    layout: string;
    groupMode: string;
    reverse: boolean;
    colorBy: string;
    lineLayerEnabled: boolean;
    valueScale: string;
    maxValue: string;
    swap: boolean;
    csv: string;
    fixedMaxValue: string;
    fixedMinValue: string;
    barPadding: number;
    barLabelPosition: string;
    showGrid: boolean;
    includeOverall: boolean;
    overallLabel: string;
    barInnerPadding: number;
    highlightXAxisLine?: boolean;
    showTickLine?: boolean;
    showRightAxis?: boolean;
    hiddenBars: string[];
    format: string;
    showGroupTotal: boolean;
    groupTotalMeasure: string;
    groupTotalLabel?: string;
    groupTotalFormat?: string;
    groupTotalLabelOffset?: number;
    groupTotalOffset?: number;
    enableGridX: boolean;
    enableGridY: boolean;
    sort: string;
    sortReverse: boolean;
}

export interface BarChartProps {
    apps: Application[];
    setAttributes: (attributes: Partial<BarChartAttributes>) => void;
    attributes: BarChartAttributes;
    allDimensions: Dimension[];
    allMeasures: Measure[];
    allCategories: Category[];
}