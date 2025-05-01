import { Filter } from '@dg-data-viz/wp-commons';

export interface ***REMOVED*** {
    group: string;
    placeHolder: string;
    param: string;
    app: string;
    csvValue: string;
    isRange: boolean;
    allLabel: string;
    ***REMOVED***: boolean;
    ascOrder: boolean;
    noneLabel: string;
    startLabel: string;
    endLabel: string;
    ***REMOVED***: boolean;
    ***REMOVED***: boolean;
    filterType: string;
    defaultValues: string[] | number[];
    ***REMOVED***: boolean;
    ***REMOVED***: string;
    hiddenFilters: string[];
    ***REMOVED***: boolean;
    autoApply: boolean;
    closeOnSelect: boolean;
    ***REMOVED***: boolean;
    ***REMOVED***: string;
    type: string;
    icon: string;
    csvField: string;
    filters: Filter[];
    ***REMOVED***: string;
    ***REMOVED***: string;
}

export interface FilterProps {
    attributes: ***REMOVED***;
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
    className: string;
    isSelected: boolean;
}