export interface ChildPagesNavigatorProps {
    className: string;
    isSelected: boolean;
    toggleSelection: (selected: boolean) => void;
    setAttributes: (attributes: any) => void;
    attributes: {
        name: string;
        height: number;
        title: string;
        showIcons: boolean;
        showLabels: boolean;
    };
}