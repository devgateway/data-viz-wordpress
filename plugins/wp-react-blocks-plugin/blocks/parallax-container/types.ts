import { BlockEditWithFiltersState, Categories, ComponentWithSettingsProps, Post } from "@dg-data-viz/wp-commons";

export type ParallaxContainerConfiguration = {
    offset: number;
    speed: number;
    sticky: boolean;
    stickyStart: number;
    stickyEnd: number;
    title?: string;
}

export interface ParallaxContainerBlockAttributes {
    taxonomy: string;
    categories: Categories;
    height: number;
    width: number;
    configuration: ParallaxContainerConfiguration[];
    type: string;
    count: number;
    horizontal: boolean;
    panelStatus: string;
    scrolls: number;
    config: ParallaxContainerConfiguration[];
}

export interface ParallaxContainerBlockState extends BlockEditWithFiltersState {
    previewMode: 'Desktop' | 'Mobile';
    posts: Post[];
}

export interface ParallaxContainerBlockProps extends ComponentWithSettingsProps {
    attributes: ParallaxContainerBlockAttributes;
    ***REMOVED***: (value: boolean) => void;
    setAttributes: (attributes: Partial<ParallaxContainerBlockAttributes>) => void;
    previewMode: 'Desktop' | 'Mobile';
   
}