import { Wp_Types } from "@dg-data-viz/wp-commons";

import { SearchResults } from "@dg-data-viz/wp-commons";

import { ComponentWithSettingsProps } from "@dg-data-viz/wp-commons";
import { BlockInstance } from "@wordpress/blocks";

export interface PdfButtonAttributes {
    linkTarget: string;
    placeholder: string;
    rel: string;
    style: React.CSSProperties;
    text: string;
    url: string;
    width: number;

    // These are used in the Save component but not in the Edit component
    fontSize: number;
    isSelected: boolean;
    title: string;
}

export interface PdfButtonState {
    types: Wp_Types[];
    results: SearchResults;
}


export interface PdfButtonProps extends ComponentWithSettingsProps {
    attributes: PdfButtonAttributes;
    setAttributes: (attributes: Partial<PdfButtonAttributes>) => void;
    className: string;
    isSelected: boolean;
    toggleSelection: (value: boolean) => void;
    onReplace: (value: BlockInstance<{ [k: string]: any; }>[]) => void;
    mergeBlocks: (value: boolean) => void;
}