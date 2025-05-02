import { ComponentWithSettingsProps } from "@dg-data-viz/wp-commons";

export interface ShowcaseFormBlockAttributes {
    organization: string;
    name: string;
    email: string;
    country: string;
    message: string;
    submitLabel: string;
    resetLabel: string;
    successMessage: string;
    failureMessage: string;
    width: number;
    height: number;
    alignment: string;
    customBackgroundColor: string;
    backgroundColor: string;
}

export interface ShowcaseFormBlockProps extends ComponentWithSettingsProps {
    attributes: ShowcaseFormBlockAttributes;
    setAttributes: (attributes: Partial<ShowcaseFormBlockAttributes>) => void;
    className: string;
    src: string;
    backgroundColor: {
        color: string;
        class: string;
    };
    setBackgroundColor: (value: string | undefined, index: number | undefined) => void;
    toggleSelection: (value: boolean) => void;
}