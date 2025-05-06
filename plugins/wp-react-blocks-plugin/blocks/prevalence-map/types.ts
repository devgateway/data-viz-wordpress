import { ***REMOVED*** } from "@wordpress/blocks";

export interface PrevalenceMapAttributes {
    width: number;
    height: number;
    alignment: string;
    customBackgroundColor: string;
    ***REMOVED***: string;
}

export interface PrevalenceMapBlockProps extends ***REMOVED***<PrevalenceMapAttributes> {
    attributes: PrevalenceMapAttributes;
    setAttributes: (attributes: Partial<PrevalenceMapAttributes>) => void;
    className: string;
    isSelected: boolean;
    ***REMOVED***: (value: boolean) => void;
    ***REMOVED***: {
        color: string;
        class: string;
    };
    ***REMOVED***: (value: string | undefined, index: number | undefined) => void;
}