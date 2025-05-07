import { ComponentWithSettingsProps } from "@devgateway/dvz-wp-commons";
import { NewTimeLineConfig } from "../new-time-line/types";
export interface TimeLineBlockAttributes {
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
    fontSize: number;
    titleWidth: number;
    subtitleWidth: number;
    enableTitlePopup: boolean;
    enableCirclePopup: boolean;
    enableDefaultPopup: boolean;
    closePopupOnMouseOut: boolean;
    subtitleHeight: number;
    titleHeight: number;
    lineColor: string;
    lineWidth: number;
    position: string;
    panelStatus: boolean;
}

export interface TimeLineBlockProps extends ComponentWithSettingsProps {
    attributes: TimeLineBlockAttributes;
    setAttributes: (attributes: Partial<TimeLineBlockAttributes>) => void;
    className: string;
    src: string;
    toggleSelection: (value: boolean) => void;
}
