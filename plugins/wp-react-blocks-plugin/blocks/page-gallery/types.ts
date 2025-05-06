import { BlockEditProps } from "@wordpress/blocks";

export interface PageGalleryAttributes {
    height: number;
    style: string;
    columns: number;
}

export interface PageGalleryBlockProps extends BlockEditProps<PageGalleryAttributes> {
    isSelected: boolean;
    attributes: PageGalleryAttributes;
    toggleSelection: (active: boolean) => void;
    setAttributes: (attributes: Partial<PageGalleryAttributes>) => void;
    src?: string;
}
