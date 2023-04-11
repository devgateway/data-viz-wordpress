/**
 * Internal dependencies
 */
import type {
	STICKY_CONTROLS,
	CAPTION_SIDE_CONTROLS,
	CELL_TAG_CONTROLS,
	CELL_SCOPE_CONTROLS,
	TEXT_ALIGNMENT_CONTROLS,
	VERTICAL_ALIGNMENT_CONTROLS,
	CORNER_CONTROLS,
	DIRECTION_CONTROLS,
	SIDE_CONTROLS,
	BORDER_STYLE_CONTROLS,
	CONTENT_JUSTIFY_CONTROLS,
	BORDER_COLLAPSE_CONTROLS,
} from './constants';

// Controls Attributes value types
export type StickyValue = typeof STICKY_CONTROLS[ number ][ 'value' ];
export type ***REMOVED*** = typeof CAPTION_SIDE_CONTROLS[ number ][ 'value' ];
export type CellTagValue = typeof CELL_TAG_CONTROLS[ number ][ 'value' ];
export type ***REMOVED*** = typeof CELL_SCOPE_CONTROLS[ number ][ 'value' ];
export type ***REMOVED*** = typeof TEXT_ALIGNMENT_CONTROLS[ number ][ 'value' ];
export type ***REMOVED*** = typeof VERTICAL_ALIGNMENT_CONTROLS[ number ][ 'value' ];
export type CornerValue = typeof CORNER_CONTROLS[ number ][ 'value' ];
export type ***REMOVED*** = typeof DIRECTION_CONTROLS[ number ][ 'value' ];
export type SideValue = typeof SIDE_CONTROLS[ number ][ 'value' ];
export type ***REMOVED*** = typeof BORDER_STYLE_CONTROLS[ number ][ 'value' ];
export type ***REMOVED*** = typeof CONTENT_JUSTIFY_CONTROLS[ number ][ 'value' ];
export type ***REMOVED*** = typeof BORDER_COLLAPSE_CONTROLS[ number ][ 'value' ];

// Table section name types
export type SectionName = 'head' | 'body' | 'foot';

// Table attributes
export type ***REMOVED*** = Record< SectionName, Row[] >;

// Table row attributes
export interface Row {
	cells: Cell[];
}

// Table cell attributes
export interface Cell {
	content: string;
	styles?: string;
	tag: CellTagValue;
	className?: string;
	id?: string;
	headers?: string;
	scope?: ***REMOVED***;
	rowSpan?: string;
	colSpan?: string;
}

// Block attributes
export interface ***REMOVED*** extends ***REMOVED*** {
	***REMOVED***: ***REMOVED*** | undefined;
	***REMOVED***: boolean;
	isScrollOnPc: boolean;
	***REMOVED***: boolean;
	***REMOVED***: boolean;
	sticky: StickyValue | undefined;
	tableStyles?: string;
	captionStyles?: string;
	captionSide: ***REMOVED***;
	caption: string;
}

// Core Table Block attributes
export interface CoreTableBlockAttributes {
	head: {
		cells: CoreTableCell[];
	}[];
	body: {
		cells: CoreTableCell[];
	}[];
	foot: {
		cells: CoreTableCell[];
	}[];
	***REMOVED***: boolean;
	caption: string;
}

export interface CoreTableCell {
	content: string;
	tag: CellTagValue;
	rowspan?: string;
	colspan?: string;
}
