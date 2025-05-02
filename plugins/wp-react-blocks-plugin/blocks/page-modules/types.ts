import { ComponentWithSettingsProps, ComponentWithSettingsState } from "@dg-data-viz/wp-commons";

export type PageModulesBlockAttributes = {
    count: number;
    height: number;
    previewMode: 'Desktop' | 'Mobile';
    width: number;
    navLabel: string;
    topTopLabel: string;
}

export interface PageModulesBlockState extends ComponentWithSettingsState {
    previewMode: 'Desktop' | 'Mobile';
}

export interface PageModulesBlockProps extends ComponentWithSettingsProps {
    attributes: PageModulesBlockAttributes;
    ***REMOVED***: (value: boolean) => void;
    setAttributes: (attributes: Partial<PageModulesBlockAttributes>) => void;
    previewMode: 'Desktop' | 'Mobile';
}