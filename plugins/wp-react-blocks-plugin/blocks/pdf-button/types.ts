import { Wp_Types } from "@devgateway/dvz-wp-commons";

import { SearchResults } from "@devgateway/dvz-wp-commons";

import { ComponentWithSettingsProps } from "@devgateway/dvz-wp-commons";
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