import { Measure } from "@dg-data-viz/wordpress-commons";
import { Filter } from "@dg-data-viz/wordpress-commons";

export interface BigNumberTrendProps {
    className: string;
    isSelected: boolean;
    toggleSelection: (selected: boolean) => void;
    setAttributes: (attributes: any) => void;
    attributes: {
        measures: Measure[];
        height: number;
        app: string;
        format: string;
        filters: Filter[];
        group: string;
        panelStatus: Record<string, boolean>;
        dvzProxyDatasetId: string;
        label: string;
        bigNumberFontSize: number;
        percentFontSize: number;
        labelFontSize: number;
        textColor: string;
        dimension1: string;
        showPercentageChange: boolean;
        csv: string;
        type: string;
        noDataMsg?: string;
    };
}