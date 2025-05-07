import { Category, Dimension, Measure } from "@devgateway/dvz-wp-commons";

export interface MobileConfigSectionProps<T> {
    setAttributes: (attributes: any) => void;
    layout?: string;
    attributes: {
        mobileCustomization: T;
    };
}

export interface MarginMobileCustomization {
    marginBottom: number;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
}
export interface MarginSectionProps extends MobileConfigSectionProps<MarginMobileCustomization> {}

export interface PaddingMobileCustomization {
    barPadding: number;
    barInnerPadding: number;
}
export interface PaddingSectionProps extends MobileConfigSectionProps<PaddingMobileCustomization> {
    attributes: {
        mobileCustomization: PaddingMobileCustomization;
        barPadding: number;
        barInnerPadding: number;
    }
}

export interface TitleMobileCustomization {
    showXAxisTitle: boolean;
    showYAxisTitle: boolean;
    showRightAxisTitle: boolean;
}

export interface TitleSectionProps extends MobileConfigSectionProps<TitleMobileCustomization> {
}

export interface IntervalsMobileCustomization {
    yAxisTickValues: number[];
    xAxisTickValues: number[];
    chartLayoutOverride: boolean;
    yAxisIntervalUserModified: boolean;
    xAxisIntervalUserModified: boolean;
}

export interface IntervalsSectionProps extends MobileConfigSectionProps<IntervalsMobileCustomization> {
    attributes: {
        mobileCustomization: IntervalsMobileCustomization;
        yAxisTickValues: number[];
        xAxisTickValues: number[];
        chartLayoutOverride: boolean;
        layout?: string;
    }
}

type MobileCustomization = {
    showCustomization: boolean;
    labels: any;
} | MarginMobileCustomization | PaddingMobileCustomization | TitleMobileCustomization | IntervalsMobileCustomization;


export interface MobileConfigAttributes {
    type: string;
    mobileCustomization: MobileCustomization;
    csv: any;
    app: string;
    measures: Measure[];
    dimension1: string;
    yAxisTickValues: number[];
    xAxisTickValues: number[];
    tickRotation: number;
}

export interface MobileConfigProps {
    allMeasures: Measure[];
    allCategories: Category[];
    allDimensions: Dimension[];
    setAttributes: (attributes: Partial<MobileConfigAttributes>) => void;
    attributes: MobileConfigAttributes;
}