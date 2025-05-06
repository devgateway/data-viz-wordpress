import { Categories, ComponentWithSettingsProps } from "@dg-data-viz/wp-commons";

export interface VerticalFeaturedTabsAttributes {
    count: number;
    type: string;
    taxonomy: string;
    categories: Categories;
    height: number;
    colors: string[];
    readMoreLabel: string;
    coverWidth: number;
    previewMode: string;
}

export interface VerticalFeaturedTabsProps extends ComponentWithSettingsProps {
    attributes: VerticalFeaturedTabsAttributes;
    setAttributes: (attributes: Partial<VerticalFeaturedTabsAttributes>) => void;
    className: string;
    src: string;
    ***REMOVED***: (value: boolean) => void;
    isSelected: boolean;
}