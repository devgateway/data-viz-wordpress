import { BlockEditProps } from "@wordpress/blocks";

export interface PrevalenceMapAttributes {
    width: number;
    height: number;
    alignment: string;
    customBackgroundColor: string;
    backgroundColor: string;
}

export interface PrevalenceMapBlockProps extends BlockEditProps<PrevalenceMapAttributes> {
    attributes: PrevalenceMapAttributes;
    setAttributes: (attributes: Partial<PrevalenceMapAttributes>) => void;
    className: string;
    isSelected: boolean;
    toggleSelection: (value: boolean) => void;
    backgroundColor: {
        color: string;
        class: string;
    };
    setBackgroundColor: (value: string | undefined, index: number | undefined) => void;
}