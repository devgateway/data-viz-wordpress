import { ComponentWithSettingsState } from "@dg-data-viz/wp-commons";
import { BlockEditProps } from "@wordpress/blocks";

export interface RedirectAttributes {
    redirect_url: string;
}

export interface RedirectBlockState extends ComponentWithSettingsState {
    results: any[];
    search: string;
}

export interface RedirectBlockProps extends BlockEditProps<RedirectAttributes> {
    attributes: RedirectAttributes;
    setAttributes: (attributes: Partial<RedirectAttributes>) => void;
    className: string;
    isSelected: boolean;
    toggleSelection: (value: boolean) => void;
}