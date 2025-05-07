import { BlockEditWithAPIMetadataProps } from "@devgateway/dvz-wp-commons";
import { BlockEditProps } from "@wordpress/blocks";

export interface MeasureGroup {
    label: string,
    format: any,
    leftTitle: string,
    rightTitle: string,
    customTooltip: string,
}
export interface MeasureAttributes {
    app: string,
    label: string,
    format: any,
    leftTitle: string,
    rightTitle: string,
    customTooltip: string,
    measuresGroups: MeasureGroup[],
    group: string,
}

export interface MeasureBlockProps extends BlockEditProps<MeasureAttributes> {
    isSelected: boolean,
    app: string,
    attributes: MeasureAttributes,
    setAttributes: (attributes: Partial<MeasureAttributes>) => void,
}