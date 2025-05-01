export interface DataFiltersApplyProps {
    isSelected: boolean;
    setAttributes: (attributes: any) => void;
    attributes: {
        group: string;
        app: string;
        label: string;
    };
}
