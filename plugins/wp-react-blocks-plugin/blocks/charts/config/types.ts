import { Category, Dimension, Measure } from "@dg-data-viz/wp-commons";

export interface MobileConfigSectionProps<T> {
    setAttributes: (attributes: any) => void;
    layout?: string;
    attributes: {
        ***REMOVED***: T;
    };
}

export interface MarginMobileCustomization {
    marginBottom: number;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
}
export interface ***REMOVED*** extends MobileConfigSectionProps<MarginMobileCustomization> {}

export interface PaddingMobileCustomization {
    barPadding: number;
    ***REMOVED***: number;
}
export interface ***REMOVED*** extends MobileConfigSectionProps<PaddingMobileCustomization> {
    attributes: {
        ***REMOVED***: PaddingMobileCustomization;
        barPadding: number;
        ***REMOVED***: number;
    }
}

export interface TitleMobileCustomization {
    ***REMOVED***: boolean;
    ***REMOVED***: boolean;
    ***REMOVED***: boolean;
}

export interface ***REMOVED*** extends MobileConfigSectionProps<TitleMobileCustomization> {
}

export interface IntervalsMobileCustomization {
    ***REMOVED***: number[];
    ***REMOVED***: number[];
    ***REMOVED***: boolean;
    yAxisIntervalUserModified: boolean;
    xAxisIntervalUserModified: boolean;
}

export interface IntervalsSectionProps extends MobileConfigSectionProps<IntervalsMobileCustomization> {
    attributes: {
        ***REMOVED***: IntervalsMobileCustomization;
        ***REMOVED***: number[];
        ***REMOVED***: number[];
        ***REMOVED***: boolean;
        layout?: string;
    }
}

type ***REMOVED*** = {
    ***REMOVED***: boolean;
    labels: any;
} | MarginMobileCustomization | PaddingMobileCustomization | TitleMobileCustomization | IntervalsMobileCustomization;


export interface MobileConfigAttributes {
    type: string;
    ***REMOVED***: ***REMOVED***;
    csv: any;
    app: string;
    measures: Measure[];
    dimension1: string;
    ***REMOVED***: number[];
    ***REMOVED***: number[];
    tickRotation: number;
}

export interface ***REMOVED*** {
    allMeasures: Measure[];
    allCategories: Category[];
    allDimensions: Dimension[];
    setAttributes: (attributes: Partial<MobileConfigAttributes>) => void;
    attributes: MobileConfigAttributes;
}