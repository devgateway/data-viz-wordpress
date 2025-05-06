import { BlockEditWithAPIMetadataProps } from "@dg-data-viz/wp-commons";
import { ***REMOVED*** } from "@wordpress/blocks";

export interface MeasureGroup {
    label: string,
    format: any,
    leftTitle: string,
    rightTitle: string,
    customTooltip: string,
}
export interface ***REMOVED*** {
    app: string,
    label: string,
    format: any,
    leftTitle: string,
    rightTitle: string,
    customTooltip: string,
    ***REMOVED***: MeasureGroup[],
    group: string,
}

export interface ***REMOVED*** extends ***REMOVED***<***REMOVED***> {
    isSelected: boolean,
    app: string,
    attributes: ***REMOVED***,
    setAttributes: (attributes: Partial<***REMOVED***>) => void,
}