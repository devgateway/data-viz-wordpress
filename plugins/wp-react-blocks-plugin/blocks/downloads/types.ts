export interface ***REMOVED*** {
    color: string | null;
    type: string;
    height: number;
    checkPng: boolean;
    checkJpg: boolean;
    buttonLabel: string;
    defaultFormat: string;
    pngLabel: string;
    jpgLabel: string;
    pngText: string;
    jpgText: string;
    title: string;
    useTitle: boolean;
    sectionTitle: string;
    style: string;
    fontSize: string;
    fontClass: string;
    tooltip: string;
    ***REMOVED***: string;
    ***REMOVED***: boolean;
    ***REMOVED***: number;
    ***REMOVED***: number;
    ***REMOVED***: number;
}

export interface ***REMOVED*** {
    isSelected: boolean;
    className: string;
    fontSizes: {id: string, size: string, slug: string}[];
    ***REMOVED***: (selected: boolean) => void;
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
    attributes: ***REMOVED***;
}