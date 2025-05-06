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

export interface ***REMOVED*** {
    isSelected: boolean;
    className: string;
    ***REMOVED***: (selected: boolean) => void;
    setAttributes: (attributes: Partial<FeaturedTabsAttributes>) => void;
    attributes: FeaturedTabsAttributes;
}