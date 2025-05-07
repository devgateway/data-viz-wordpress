import { Filter, Measure } from "@devgateway/dvz-wp-commons";

export interface DataLabelsAttributes {
    group: string;
    app: string;
    label: string;
    measures: string[];
    height: number;
    dimension1: string;
    format: string;
    filters: Filter[];
    panelStatus: string;
    valueType: string;
    noDataMsg?: string; // This has not been provided in the block edit component
}

export interface DataLabelsProps {
    isSelected: boolean;
    className: string;
    toggleSelection: (selected: boolean) => void;
    setAttributes: (attributes: Partial<DataLabelsAttributes>) => void;
    attributes: DataLabelsAttributes;
}