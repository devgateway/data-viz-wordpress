import { BlockEditWithAPIMetadataProps } from "@devgateway/dvz-wp-commons";

export interface WrappedComponentAttributes {
    name: string;
    attr: {
        name: string;
        value: string;
    }[];
    app: string;
    height: number;
    params: {
        name: string;
        value: string;
    }[];
}

export interface WrappedComponentProps extends BlockEditWithAPIMetadataProps {
    attributes: WrappedComponentAttributes;
    setAttributes: (attributes: Partial<WrappedComponentAttributes>) => void;
    className: string;
    src: string;
    ***REMOVED***: (value: boolean) => void;
    isSelected: boolean;
    app: string;
}