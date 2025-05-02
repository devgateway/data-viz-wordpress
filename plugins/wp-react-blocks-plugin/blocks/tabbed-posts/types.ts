import { ComponentWithSettingsProps, BlockEditWithFiltersState } from "@dg-data-viz/wp-commons";

export interface TabbedPostsBlockAttributes {
    panelStatus: boolean;
    count: number;
    type: string;
    taxonomy: string;
    categories: string[];
    height: number;
    theme: string;
    useScrolls: boolean;
    showIcons: boolean;
    useLabels: boolean;
    previewMode: string;
    width: number;
    showLabels: boolean;
}

export interface TabbedPostsBlockState extends BlockEditWithFiltersState {
    previewMode: string;
}

export interface TabbedPostsBlockProps extends ComponentWithSettingsProps {
    attributes: TabbedPostsBlockAttributes;
    setAttributes: (attributes: Partial<TabbedPostsBlockAttributes>) => void;
    className: string;
    src: string;
    backgroundColor: {
        color: string;
        class: string;
    };
    isSelected: boolean;
    toggleSelection: (value: boolean) => void;
}