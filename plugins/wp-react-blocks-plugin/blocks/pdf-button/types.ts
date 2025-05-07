import { Wp_Types } from "@devgateway/dvz-wp-commons";

import { SearchResults } from "@devgateway/dvz-wp-commons";

import { ComponentWithSettingsProps } from "@devgateway/dvz-wp-commons";
import { BlockInstance } from "@wordpress/blocks";

export interface ***REMOVED*** {
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

export interface ***REMOVED*** {
    types: Wp_Types[];
    results: SearchResults;
}


export interface ***REMOVED*** extends ComponentWithSettingsProps {
    attributes: ***REMOVED***;
    setAttributes: (attributes: Partial<***REMOVED***>) => void;
    className: string;
    isSelected: boolean;
    ***REMOVED***: (value: boolean) => void;
    onReplace: (value: BlockInstance<{ [k: string]: any; }>[]) => void;
    mergeBlocks: (value: boolean) => void;
}