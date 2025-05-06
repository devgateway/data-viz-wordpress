export interface InlineListAttributes {
    count: number;
    type: string;
    taxonomy: string;
    categories: string[];
    height: number;
    width: number;
    colors: string;
    showIcons: boolean;
    showContentToggle: boolean;
    contentToggleHPosition?: number;
    panelStatus: string;
}

export interface InlineListProps {
    attributes: InlineListAttributes;
    setAttributes: (attributes: Partial<InlineListAttributes>) => void;
    className: string;
    isSelected: boolean;
    toggleSelection: (value: boolean) => void;
}