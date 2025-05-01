import { ComponentWithSettingsState, Menu } from "@dg-data-viz/wp-commons";
import { ***REMOVED*** } from "@wordpress/blocks";

export interface ***REMOVED*** {
    app: string;
    label: string;
    group: string;
    ***REMOVED***: any;
    height: number;
    icon: string | null;
    name: string;
    showIcons: boolean;
    showLabels: boolean;
    icon_media_id: number | null;
}

export interface ***REMOVED*** extends ***REMOVED***<***REMOVED***> {
    isSelected: boolean;
    app: string;
    attributes: ***REMOVED***;
    ***REMOVED***: (active: boolean) => void;
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
}

export interface ***REMOVED*** extends ComponentWithSettingsState {
    menus: {label: string, value: string}[];
}
