export interface ***REMOVED*** {
    count: number;
    type: string;
    taxonomy: string;
    categories: string[];
    height: number;
    width: number;
    colors: string;
    showIcons: boolean;
    ***REMOVED***: boolean;
    contentToggleHPosition?: number;
    panelStatus: string;
}

export interface ***REMOVED*** {
    attributes: ***REMOVED***;
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
    className: string;
    isSelected: boolean;
    ***REMOVED***: (value: boolean) => void;
}