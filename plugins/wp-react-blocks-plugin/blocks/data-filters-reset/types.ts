export interface DataFiltersResetProps {
    isSelected: boolean;
    setAttributes: (attributes: any) => void;
    attributes: {
        group: string;
        app: string;
        resetLabel: string;
    };
}
