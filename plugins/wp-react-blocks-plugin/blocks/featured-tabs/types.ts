export interface FeaturedTabsAttributes {
    count: number;
    type: string;
    taxonomy: string;
    categories: string;
    height: number;
    colors: Record<string, string>;
    useScrolls: boolean;
    readMoreLabel: string;
    previewMode: string;
}

export interface FeaturedTabsProps {
    isSelected: boolean;
    className: string;
    toggleSelection: (selected: boolean) => void;
    setAttributes: (attributes: Partial<FeaturedTabsAttributes>) => void;
    attributes: FeaturedTabsAttributes;
}