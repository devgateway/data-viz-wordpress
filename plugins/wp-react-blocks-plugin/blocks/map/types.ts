import { BlockEditWithAPIMetadataState, Category, Dimension, Filter, Measure, Taxonomy } from "@devgateway/dvz-wp-commons";
import { BlockEditProps } from "@wordpress/blocks";

export interface SettingsAttributes {
    height?: number;
    app?: string;
    nationalAverageLabel?: string;
    zoomEnabled?: boolean;
    mapCenter?: string;
    mapLabelShowValue?: boolean;
    showTooltip?: boolean;
    measureSelectorLabel?: string;
    valueFormat?: string;
    showOverallValue?: boolean;
    showNoDataLabel?: boolean;
    group?: string;
    tooltipTheme?: string;
    labelFontColor?: string | null;
    labelFontWeight?: string;
    labelFontSize?: number;
    legendFontSize?: number;
    legendFontWeight?: string;
    legendTitle?: string;
    tooltipFontSize?: number;
    showAdminUnitLabel?: "ifUnitHasData" | "doNotShow" | "showAll";
    highlightedLocation?: string;
    showNoDataTooltip?: boolean;
    pointLabelColor?: string | null;
    pointLabelFormat?: string;
    highlightedLocLabelFormat?: string;
    labelsExclusionList?: string;
    noDataText?: string;
    panelStatus?: Record<string, boolean>;
}
export interface SettingsProps {
    attributes: SettingsAttributes;
    setAttributes: (attributes: Partial<SettingsAttributes>) => void;
    locations: { value: string; label: string }[];

}

export interface LegendBreak {
    min: number;
    max: number;
    color?: string;
    label?: string;
    measure?: string;
    filters?: Filter[];
}

export interface LegendBreaksAttributes {
    legendBreaks: LegendBreak[];
    showLegendLabels?: boolean;
    measures?: string[];
    autoGenerateBreaks?: boolean;
    numberOfBreaks?: number;
    colorScheme?: string;
    csv?: string;
    mapNoDataColor?: string;
    mapBoundaryColor?: string;
    mapFocusBoundaryColor?: string;
    mapContainerBgColor?: string;
    showNoDataLegendItem?: boolean;
    defaultPointColor?: string | null;
}

export interface LegendBreaksProps {
    allMeasures: Measure[];
    app: string;
    attributes: LegendBreaksAttributes;
    setAttributes: (attributes: Partial<LegendBreaksAttributes>) => void;
    locations: { value: string; label: string }[];
}

export interface Type {
    label: string;
    value: string;
    supports: {
        singleMeasure: boolean;
        singleDimension: boolean;
    };
}
export interface APIConfigAttributes {
    measures: string[];
    filters: Filter[];
    categories: string[];
    types: Type[];
    dimension1: string;
    dimension2: string;
    type: string;
}

export interface APIConfigState {
    measures: Measure[];
    dimensions: Dimension[];
    filters: Filter[];
    categories: Category[];
}

export interface APIConfigProps {
    allMeasures: Measure[];
    allFilters: Filter[];
    allCategories: Category[];
    allDimensions: Dimension[];
    allApps: string[];
    app?: string;
    attributes: APIConfigAttributes;
    setAttributes: (attributes: Partial<APIConfigAttributes>) => void;
}


export interface MapBlockAttributes {
    height: number;
    app: string;
    nationalAverageLabel: string;
    zoomEnabled: boolean;
    mapCenter: string;
    mainLayerId: string;
    mapFile: string;
    mapType: string;
    mapStyle: string;
    mapPosition: string;
    taxonomy: string;
    mappingField: string;
    mapLabelField: string;
    csv: string;
    enabledLayers: {id: string, index: number}[];
    dimension1: string;
    dimension2: string;
    dimension3: string;
    legendBreaks: LegendBreak[];
    aggregationFormula: string;
    zoomLevelToShowPoints: number;
    defaultPointColor: string | null;
    zoomOnFilter: boolean;
    zoomOnFilterField: string;
    showShadingLayerLabels: 'ifUnitHasData' | 'doNotShow' | 'showAll';
    showAdminUnitLabels: 'ifUnitHasData' | 'doNotShow' | 'showAll';
    dvzProxyDatasetId: string;
    filters: Filter[];
    fileType: string;
    measures: string[];
    pointLabelColor: string | null;
    pointLabelFormat: string;
    showNoDataLegendItem: boolean;
    highlightedLocLabelFormat?: string;
    mapLabelShowValue: boolean;
    showTooltip: boolean;
    measureSelectorLabel: string;
    valueFormat: string;
    showOverallValue: boolean;
    autoGenerateBreaks: boolean;
    numberOfBreaks: number;
    colorScheme: string;

    // Below this point, these attributes are not used in the block edit, but are used in the block save
    showNoDataLabel?: boolean;
    group?: string;
    mapSymbols?: any[];
    tooltipTheme?: string;
    labelFontColor?: string | null;
    labelFontWeight?: string;
    labelFontSize?: number;
    legendFontSize?: number;
    legendFontWeight?: string;
    customTooltips?: any[];
    formatStyle?: string;
    decimals?: number;
    currency?: string;
    tooltipFontSize?: number;
    showAdminUnitLabel?: 'ifUnitHasData' | 'doNotShow' | 'showAll';
    mapNoDataColor?: string;
    mapBoundaryColor?: string;
    mapFocusBoundaryColor?: string;
    highlightedLocation?: string;
    tooltipFormat?: string;
    showNoDataTooltip?: boolean;
    mapContainerBgColor?: string;
    type?: string;
    dataSourceText?: string;
    dataSourceLabel?: string;
    legendTitle?: string;
    showLegendLabels?: boolean;
    hasMultipleMeasures?: boolean;
    enableSummaryView?: boolean;
    customMeasureLabels?: any[];
    labelsExclusionList?: string;
    noDataText?: string;
}

export interface MapBlockProps extends BlockEditProps<MapBlockAttributes> {
    attributes: MapBlockAttributes;
    toggleSelection: (value: boolean) => void;
    setAttributes: (attributes: Partial<MapBlockAttributes>) => void;
    locations: { value: string; label: string }[];
}

export interface MapBlockState extends BlockEditWithAPIMetadataState {
    measures?: Measure[];
    taxonomyValues: Taxonomy[];
    types: string;
    taxonomies: Taxonomy[] | null;
    loading: boolean;
    mapFiles?: {value: string, label: string}[];
    layerData?: any;
    locations?: { value: string, label: string }[];
}