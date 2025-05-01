import { Filter, Measure } from "@dg-data-viz/wp-commons";

export interface ***REMOVED*** {
    group: string;
    app: string;
    label: string;
    measures: string[];
    height: number;
    dimension1: string;
    format: string;
    filters: Filter[];
    panelStatus: string;
    valueType: string;
    noDataMsg?: string; // This has not been provided in the block edit component
}

export interface ***REMOVED*** {
    isSelected: boolean;
    className: string;
    ***REMOVED***: (selected: boolean) => void;
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
    attributes: ***REMOVED***;
}