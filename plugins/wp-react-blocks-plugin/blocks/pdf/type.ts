import { ComponentWithSettingsProps, ComponentWithSettingsState, SearchResults, Wp_Types } from "@dg-data-viz/wp-commons";

export interface PdfBlockAttributes {
    url: string;
    type: string;
    subtype: string;
    title: string;
    buttonLabel: string;
    height: number;
    fileName: string;

    // Below this, the attributes do not exist in the block edit
    pdfLabel: string;
}

export interface PdfBlockState extends ComponentWithSettingsState {
    types: Wp_Types[];
    results: SearchResults;
}

export interface PdfBlockProps extends ComponentWithSettingsProps {
    attributes: PdfBlockAttributes;
    setAttributes: (attributes: Partial<PdfBlockAttributes>) => void;
    className: string;
    isSelected: boolean;
    toggleSelection: (value: boolean) => void;
}