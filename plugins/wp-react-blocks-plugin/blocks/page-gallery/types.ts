import { ***REMOVED*** } from "@wordpress/blocks";

export interface PageGalleryAttributes {
    height: number;
    style: string;
    columns: number;
}

export interface PageGalleryBlockProps extends ***REMOVED***<PageGalleryAttributes> {
    isSelected: boolean;
    attributes: PageGalleryAttributes;
    ***REMOVED***: (active: boolean) => void;
    setAttributes: (attributes: Partial<PageGalleryAttributes>) => void;
    src?: string;
}
