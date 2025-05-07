import { ComponentWithSettingsProps } from "@devgateway/dvz-wp-commons";
import { ***REMOVED*** } from "../new-time-line/types";
export interface TimeLineBlockAttributes {
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
    fontSize: number;
    titleWidth: number;
    subtitleWidth: number;
    ***REMOVED***: boolean;
    ***REMOVED***: boolean;
    ***REMOVED***: boolean;
    ***REMOVED***: boolean;
    ***REMOVED***: number;
    titleHeight: number;
    lineColor: string;
    lineWidth: number;
    position: string;
    panelStatus: boolean;
}

export interface ***REMOVED*** extends ComponentWithSettingsProps {
    attributes: TimeLineBlockAttributes;
    setAttributes: (attributes: Partial<TimeLineBlockAttributes>) => void;
    className: string;
    src: string;
    ***REMOVED***: (value: boolean) => void;
}
