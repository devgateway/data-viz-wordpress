import { BlockEditProps } from "@wordpress/blocks";

export interface NewTimeLineAttributes {
    fontSize: string;
    fontColor: string;
    count: number;
    type: string;
    taxonomy: string;
    categories: string[];
    height: number;
    config: NewTimeLineConfig[];
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

export interface NewTimeLineConfig {
    circleColor: string;
    lineColor: string;
    labelColor: string;
    titleColor: string;
    size: number;
    subtitleOffset: number;
    titleOffset: number;
    connectorLineHeight: number;
    readMoreLabel: string;
    position: string;
    tooltipFontColor?: string;
}

export interface NewTimeLineBlockProps extends BlockEditProps<NewTimeLineAttributes> {
    isSelected: boolean;
    app: string;
    attributes: NewTimeLineAttributes;
    toggleSelection: (active: boolean) => void;
    setAttributes: (attributes: Partial<NewTimeLineAttributes>) => void;
}