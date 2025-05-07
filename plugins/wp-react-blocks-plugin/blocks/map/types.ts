import { BlockEditWithAPIMetadataState, Category, Dimension, Filter, Measure, Taxonomy } from "@devgateway/dvz-wp-commons";
import { ***REMOVED*** } from "@wordpress/blocks";

export interface ***REMOVED*** {
    height?: number;
    app?: string;
    ***REMOVED***?: string;
    zoomEnabled?: boolean;
    mapCenter?: string;
    ***REMOVED***?: boolean;
    showTooltip?: boolean;
    ***REMOVED***?: string;
    valueFormat?: string;
    ***REMOVED***?: boolean;
    ***REMOVED***?: boolean;
    group?: string;
    tooltipTheme?: string;
    ***REMOVED***?: string | null;
    ***REMOVED***?: string;
    labelFontSize?: number;
    ***REMOVED***?: number;
    ***REMOVED***?: string;
    legendTitle?: string;
    ***REMOVED***?: number;
    ***REMOVED***?: "ifUnitHasData" | "doNotShow" | "showAll";
    ***REMOVED***?: string;
    ***REMOVED***?: boolean;
    ***REMOVED***?: string | null;
    ***REMOVED***?: string;
    highlightedLocLabelFormat?: string;
    ***REMOVED***?: string;
    noDataText?: string;
    panelStatus?: Record<string, boolean>;
}
export interface SettingsProps {
    attributes: ***REMOVED***;
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
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
    ***REMOVED***?: boolean;
    measures?: string[];
    ***REMOVED***?: boolean;
    ***REMOVED***?: number;
    colorScheme?: string;
    csv?: string;
    ***REMOVED***?: string;
    ***REMOVED***?: string;
    mapFocusBoundaryColor?: string;
    ***REMOVED***?: string;
    ***REMOVED***?: boolean;
    ***REMOVED***?: string | null;
}

export interface ***REMOVED*** {
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
        ***REMOVED***: boolean;
    };
}
export interface ***REMOVED*** {
    measures: string[];
    filters: Filter[];
    categories: string[];
    types: Type[];
    dimension1: string;
    dimension2: string;
    type: string;
}

export interface ***REMOVED*** {
    measures: Measure[];
    dimensions: Dimension[];
    filters: Filter[];
    categories: Category[];
}

export interface ***REMOVED*** {
    allMeasures: Measure[];
    allFilters: Filter[];
    allCategories: Category[];
    allDimensions: Dimension[];
    allApps: string[];
    app?: string;
    attributes: ***REMOVED***;
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
}


export interface ***REMOVED*** {
    height: number;
    app: string;
    ***REMOVED***: string;
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
    ***REMOVED***: string;
    zoomLevelToShowPoints: number;
    ***REMOVED***: string | null;
    zoomOnFilter: boolean;
    ***REMOVED***: string;
    showShadingLayerLabels: 'ifUnitHasData' | 'doNotShow' | 'showAll';
    ***REMOVED***: 'ifUnitHasData' | 'doNotShow' | 'showAll';
    ***REMOVED***: string;
    filters: Filter[];
    fileType: string;
    measures: string[];
    ***REMOVED***: string | null;
    ***REMOVED***: string;
    ***REMOVED***: boolean;
    highlightedLocLabelFormat?: string;
    ***REMOVED***: boolean;
    showTooltip: boolean;
    ***REMOVED***: string;
    valueFormat: string;
    ***REMOVED***: boolean;
    ***REMOVED***: boolean;
    ***REMOVED***: number;
    colorScheme: string;

    // Below this point, these attributes are not used in the block edit, but are used in the block save
    ***REMOVED***?: boolean;
    group?: string;
    mapSymbols?: any[];
    tooltipTheme?: string;
    ***REMOVED***?: string | null;
    ***REMOVED***?: string;
    labelFontSize?: number;
    ***REMOVED***?: number;
    ***REMOVED***?: string;
    ***REMOVED***?: any[];
    formatStyle?: string;
    decimals?: number;
    currency?: string;
    ***REMOVED***?: number;
    ***REMOVED***?: 'ifUnitHasData' | 'doNotShow' | 'showAll';
    ***REMOVED***?: string;
    ***REMOVED***?: string;
    mapFocusBoundaryColor?: string;
    ***REMOVED***?: string;
    tooltipFormat?: string;
    ***REMOVED***?: boolean;
    ***REMOVED***?: string;
    type?: string;
    ***REMOVED***?: string;
    ***REMOVED***?: string;
    legendTitle?: string;
    ***REMOVED***?: boolean;
    ***REMOVED***?: boolean;
    ***REMOVED***?: boolean;
    ***REMOVED***?: any[];
    ***REMOVED***?: string;
    noDataText?: string;
}

export interface MapBlockProps extends ***REMOVED***<***REMOVED***> {
    attributes: ***REMOVED***;
    ***REMOVED***: (value: boolean) => void;
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
    locations: { value: string; label: string }[];
}

export interface MapBlockState extends BlockEditWithAPIMetadataState {
    measures?: Measure[];
    ***REMOVED***: Taxonomy[];
    types: string;
    taxonomies: Taxonomy[] | null;
    loading: boolean;
    mapFiles?: {value: string, label: string}[];
    layerData?: any;
    locations?: { value: string, label: string }[];
}