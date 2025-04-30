import { Measure } from "@dg-data-viz/wordpress-commons";
import { Filter } from "@dg-data-viz/wordpress-commons";

export interface ***REMOVED*** {
    className: string;
    isSelected: boolean;
    ***REMOVED***: (selected: boolean) => void;
    setAttributes: (attributes: any) => void;
    attributes: {
        measures: Measure[];
        height: number;
        app: string;
        format: string;
        filters: Filter[];
        group: string;
        panelStatus: Record<string, boolean>;
        ***REMOVED***: string;
        label: string;
        ***REMOVED***: number;
        ***REMOVED***: number;
        labelFontSize: number;
        textColor: string;
        dimension1: string;
        ***REMOVED***: boolean;
        csv: string;
        type: string;
        noDataMsg?: string;
    };
}