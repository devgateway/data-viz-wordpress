import { Filter } from '@devgateway/dvz-wp-commons';

export interface FilterAttributes {
    group: string;
    placeHolder: string;
    param: string;
    app: string;
    csvValue: string;
    isRange: boolean;
    allLabel: string;
    alphabeticalSort: boolean;
    ascOrder: boolean;
    noneLabel: string;
    startLabel: string;
    endLabel: string;
    useSingleColumn: boolean;
    enableTextSearch: boolean;
    filterType: string;
    defaultValues: string | number;
    showNoDataOption: boolean;
    defaultValueCriteria: string;
    hiddenFilters: string[];
    allNoneSameBehaviour: boolean;
    autoApply: boolean;
    closeOnSelect: boolean;
    useFilterItems: boolean;
    dvzProxyDatasetId: string;
    type: string;
    icon: string;
    csvField: string;
    filters: Filter[];
    booleanTrueLabel: string;
    booleanFalseLabel: string;
    dimension1: string;
    dimension2: string;
}

export interface FilterProps {
    attributes: FilterAttributes;
    setAttributes: (attributes: Partial<FilterAttributes>) => void;
    className: string;
    isSelected: boolean;
}