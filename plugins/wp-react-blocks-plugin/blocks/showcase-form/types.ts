import { ComponentWithSettingsProps } from "@dg-data-viz/wp-commons";

export interface ShowcaseFormBlockAttributes {
    organization: string;
    name: string;
    email: string;
    country: string;
    message: string;
    submitLabel: string;
    resetLabel: string;
    ***REMOVED***: string;
    ***REMOVED***: string;
    width: number;
    height: number;
    alignment: string;
    customBackgroundColor: string;
    ***REMOVED***: string;
}

export interface ShowcaseFormBlockProps extends ComponentWithSettingsProps {
    attributes: ShowcaseFormBlockAttributes;
    setAttributes: (attributes: Partial<ShowcaseFormBlockAttributes>) => void;
    className: string;
    src: string;
    ***REMOVED***: {
        color: string;
        class: string;
    };
    ***REMOVED***: (value: string | undefined, index: number | undefined) => void;
    ***REMOVED***: (value: boolean) => void;
}