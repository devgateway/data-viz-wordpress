import { Filter, Measure } from "@devgateway/dvz-wp-commons";

export interface FilterSelectorProps {
    param: string;
    index: number;
    options: { label: string, value: string }[] | null;
    onUpdateFilterParam: (value: string, index: number) => void;
}

export interface CategoricalFilterProps {
    value: any[];
    index: number;
    items: { value: string, id: any, position?: number }[] | null;
    onUpdateFilterValue: (value: any[], index: number) => void;
}


export interface D3MapAttributes {
    id: number;
    name: string;
    app: string;
    group: string;
    mapPosition: string;
    dimension1: string;
    dimension2: string;
    measures: Measure[];
    filters: Filter[];
    csv: string;
    file: string;
    opacity: number;
    fillColor: string;
    markFillColor: string;
    markFillColor2: string;
    borderColor: string;
    markBorderColor: string;
    markBorderColor2: string;
    markSizeScale: number;
    markSizeScale2: number;
    markerLabelSize: number;
    labelColor: string;
    markLabelColor: string;
    labelFontSize: number;
    labelFilter: any[];
    labelSettings: Record<string, any>;
    labelField: string;
    type: string;
    useBreaks: boolean;
    usePattern: boolean;
    pointStyleBy: string;
    format: {
        style: string;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        currency: string;
    };
    featureJoinAttribute: string;
    apiJoinAttribute: string;
    useCentroidPoint: boolean;
    patternDiscriminator: string;
    patternDiscriminatorLabel: string | null;
    patterns: any[];
    pointDimensionStyles: any[];
    tooltip: string;
    breaks: any[];
    customMeasuresLabels: Record<string, any>;
    visible: boolean;
    flowValuesFrom: string;
    flowOrigin: string;
    flowDestination: string;
    dvzProxyDatasetId: string;
    offsetPixels: number;
    layers: any;
    projection: string;
    panelStatus: Record<string, boolean>;
    height: number;
    width: number;
    backGroundColor: string;
    rotationEnabled: boolean;
    zoomEnabled: boolean;
}


export interface D3MapProps {
    attributes: D3MapAttributes;
    setAttributes: (attributes: D3MapAttributes) => void;
    className: string;
    isSelected: boolean;
    toggleSelection: () => void;
}