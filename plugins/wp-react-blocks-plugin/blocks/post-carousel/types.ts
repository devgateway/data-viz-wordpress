import { BlockEditWithFiltersProps } from "@dg-data-viz/wp-commons";

export interface PostCarouselAttributes {
    count,
    type: string;
    taxonomy: string;
    categories: string;
    height: number;
    autoSwitch: boolean;
    interval: number;
    panelStatus: boolean;
}

export interface PostCarouselBlockProps extends BlockEditWithFiltersProps {
    attributes: PostCarouselAttributes;
    setAttributes: (attributes: Partial<PostCarouselAttributes>) => void;
    className: string;
    isSelected: boolean;
    toggleSelection: (value: boolean) => void;
}