import { ComponentWithSettingsState } from "@dg-data-viz/wp-commons";
import { ***REMOVED*** } from "@wordpress/blocks";

export interface ***REMOVED*** {
    redirect_url: string;
}

export interface ***REMOVED*** extends ComponentWithSettingsState {
    results: any[];
    search: string;
}

export interface ***REMOVED*** extends ***REMOVED***<***REMOVED***> {
    attributes: ***REMOVED***;
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
    className: string;
    isSelected: boolean;
    ***REMOVED***: (value: boolean) => void;
}