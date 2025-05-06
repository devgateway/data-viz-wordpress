import { Filter, Measure } from "@dg-data-viz/wp-commons";

export interface ***REMOVED*** {
    param: string;
    index: number;
    options: { label: string, value: string }[] | null;
    ***REMOVED***: (value: string, index: number) => void;
}

export interface CategoricalFilterProps {
    value: any[];
    index: number;
    items: { value: string, id: any, position?: number }[] | null;
    ***REMOVED***: (value: any[], index: number) => void;
}


export interface ***REMOVED*** {
    id: number;
    name: string;
    app: string;
    group: string;
    mapPosition: string;
    dimension1: string;
    dimension2: string;
    measures: Measure[];
    filters: Filter[];
    csv: string;
    file: string;
    opacity: number;
    fillColor: string;
    markFillColor: string;
    ***REMOVED***: string;
    borderColor: string;
    ***REMOVED***: string;
    ***REMOVED***: string;
    markSizeScale: number;
    ***REMOVED***: number;
    ***REMOVED***: number;
    labelColor: string;
    ***REMOVED***: string;
    labelFontSize: number;
    labelFilter: any[];
    labelSettings: Record<string, any>;
    labelField: string;
    type: string;
    useBreaks: boolean;
    usePattern: boolean;
    pointStyleBy: string;
    format: {
        style: string;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        currency: string;
    };
    ***REMOVED***: string;
    ***REMOVED***: string;
    ***REMOVED***: boolean;
    ***REMOVED***: string;
    patternDiscriminatorLabel: string | null;
    patterns: any[];
    ***REMOVED***: any[];
    tooltip: string;
    breaks: any[];
    ***REMOVED***: Record<string, any>;
    visible: boolean;
    ***REMOVED***: string;
    flowOrigin: string;
    ***REMOVED***: string;
    ***REMOVED***: string;
    offsetPixels: number;
    layers: any;
    projection: string;
    panelStatus: Record<string, boolean>;
    height: number;
    width: number;
    ***REMOVED***: string;
    ***REMOVED***: boolean;
    zoomEnabled: boolean;
}


export interface D3MapProps {
    attributes: ***REMOVED***;
    setAttributes: (attributes: ***REMOVED***) => void;
    className: string;
    isSelected: boolean;
    ***REMOVED***: () => void;
}