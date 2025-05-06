import { ***REMOVED*** } from "@wordpress/blocks";

export interface NewTimeLineAttributes {
    fontSize: string;
    fontColor: string;
    count: number;
    type: string;
    taxonomy: string;
    categories: string[];
    height: number;
    config: ***REMOVED***[];
    marginLeft: number;
    marginBottom: number;
    marginRight: number;
    marginTop: number;
    titleWidth: number;
    subtitleWidth: number;
    lineWidth: number;
    lineColor: string;
    position: string;
    panelStatus: boolean;
}

export interface ***REMOVED*** {
    circleColor: string;
    lineColor: string;
    labelColor: string;
    titleColor: string;
    size: number;
    ***REMOVED***: number;
    titleOffset: number;
    ***REMOVED***: number;
    readMoreLabel: string;
    position: string;
    ***REMOVED***?: string;
}

export interface NewTimeLineBlockProps extends ***REMOVED***<NewTimeLineAttributes> {
    isSelected: boolean;
    app: string;
    attributes: NewTimeLineAttributes;
    ***REMOVED***: (active: boolean) => void;
    setAttributes: (attributes: Partial<NewTimeLineAttributes>) => void;
}