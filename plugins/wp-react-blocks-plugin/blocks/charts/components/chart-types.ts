import { Application, Category, Dimension, Measure } from "@dg-data-viz/wp-commons";

export interface ***REMOVED*** {
    scheme: string;
    app: string;
    measures: string[];
    dimension1: string;
    dimension2: string;
    layout: string;
    groupMode: string;
    reverse: boolean;
    colorBy: string;
    ***REMOVED***: boolean;
    valueScale: string;
    maxValue: string;
    swap: boolean;
    csv: string;
    fixedMaxValue: string;
    fixedMinValue: string;
    barPadding: number;
    ***REMOVED***: string;
    showGrid: boolean;
    ***REMOVED***: boolean;
    overallLabel: string;
    ***REMOVED***: number;
    ***REMOVED***?: boolean;
    showTickLine?: boolean;
    showRightAxis?: boolean;
    hiddenBars: string[];
    format: string;
    ***REMOVED***: boolean;
    ***REMOVED***: string;
    ***REMOVED***?: string;
    ***REMOVED***?: string;
    groupTotalLabelOffset?: number;
    ***REMOVED***?: number;
    enableGridX: boolean;
    enableGridY: boolean;
    sort: string;
    sortReverse: boolean;
}

export interface BarChartProps {
    apps: Application[];
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
    attributes: ***REMOVED***;
    allDimensions: Dimension[];
    allMeasures: Measure[];
    allCategories: Category[];
}