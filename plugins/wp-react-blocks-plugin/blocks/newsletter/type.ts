import { BlockEditProps } from "@wordpress/blocks";

export interface NewsletterAttributes {
    label: string;
    placeholder: string;
    successMessage: string;
    failureMessage: string;
    alignment: string;
    list: string;
    tag: string;
}

export interface NewsletterBlockProps extends BlockEditProps<NewsletterAttributes> {
    isSelected: boolean;
    backgroundColor: {
        color: string;
        class: string;
    };
    src?: any;
    setBackgroundColor: (color: string) => void;
    app?: string;
    attributes: NewsletterAttributes;
    toggleSelection: (active: boolean) => void;
    setAttributes: (attributes: Partial<NewsletterAttributes>) => void;
}