import { ***REMOVED*** } from "@wordpress/blocks";

export interface ***REMOVED*** {
    label: string;
    placeholder: string;
    ***REMOVED***: string;
    ***REMOVED***: string;
    alignment: string;
    list: string;
    tag: string;
}

export interface ***REMOVED*** extends ***REMOVED***<***REMOVED***> {
    isSelected: boolean;
    ***REMOVED***: {
        color: string;
        class: string;
    };
    src?: any;
    ***REMOVED***: (color: string) => void;
    app?: string;
    attributes: ***REMOVED***;
    ***REMOVED***: (active: boolean) => void;
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
}