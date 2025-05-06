/**
 * WordPress dependencies
 */
import { createBlock, store as blocksStore, type ***REMOVED*** } from '@wordpress/blocks';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { ***REMOVED***, toVirtualRows, ***REMOVED***, type VCell } from './utils/table-state';
import { ***REMOVED*** } from './utils/helper';
import type { ***REMOVED***, CoreTableCell, CoreTableBlockAttributes } from './***REMOVED***';

interface Transforms {
	readonly from: ReadonlyArray< ***REMOVED***< CoreTableBlockAttributes > >;
	readonly to: ReadonlyArray< ***REMOVED***< ***REMOVED*** > >;
}

const transforms: Transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/table' ],
			transform: ( attributes ) => {
				const { ***REMOVED***, head, body, foot, caption, style } = attributes;

				// Mapping rowspan and colspan properties.
				const ***REMOVED*** = ( section: { cells: CoreTableCell[] }[] ) => {
					if ( ! section.length ) {
						return section;
					}
					return section.map( ( row ) => {
						if ( ! row.cells.length ) {
							return row;
						}
						return {
							cells: row.cells.map( ( cell ) => {
								const { content, tag, colspan, rowspan } = cell;
								return {
									content,
									tag,
									colSpan: ***REMOVED***( colspan ),
									rowSpan: ***REMOVED***( rowspan ),
								};
							} ),
						};
					} );
				};

				return createBlock( 'flexible-table-block/table', {
					head: ***REMOVED***( head ),
					body: ***REMOVED***( body ),
					foot: ***REMOVED***( foot ),
					***REMOVED***,
					caption,
					style,
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/table' ],
			transform: ( attributes ) => {
				// Check if the core table block supports rowspan and colspan.
				const {
					// @ts-ignore
					getBlockType,
				} = select( blocksStore );
				const blockType = getBlockType( 'core/table' );
				const ***REMOVED*** =
					!! blockType.attributes.head.query.cells.query.rowspan &&
					!! blockType.attributes.head.query.cells.query.colspan;

				// Create virtual object array with the cells placed in positions based on how they actually look.
				let vTable = ***REMOVED***( attributes );

				// Find rowspan & colspan cells.
				const vRows = toVirtualRows( vTable );
				const ***REMOVED*** = vRows
					.reduce( ( cells: VCell[], row ) => cells.concat( row.cells ), [] )
					.filter( ( { rowSpan, colSpan } ) => rowSpan > 1 || colSpan > 1 );

				// Split the found rowspan and colspan cells If the core table block doesn't support it.
				if ( ***REMOVED***.length && ! ***REMOVED*** ) {
					***REMOVED***.forEach( ( cell ) => {
						vTable = ***REMOVED***( vTable, cell );
					} );
				}

				// Convert to core table block attributes.
				const ***REMOVED*** = Object.entries( vTable ).reduce(
					( ***REMOVED***: any, [ sectionName, section ] ) => {
						if ( ! section.length ) {
							return ***REMOVED***;
						}

						const newSection = section.map( ( { cells } ) => ( {
							cells: cells
								// Delete cells marked as deletion.
								.filter( ( cell ) => ! cell.isHidden )
								// Keep only the properties needed.
								.map( ( cell ) => ( {
									content: cell.content,
									tag: 'head' === cell.sectionName ? 'th' : 'td',
									rowspan: ***REMOVED*** ? ***REMOVED***( cell.rowSpan ) : undefined,
									colspan: ***REMOVED*** ? ***REMOVED***( cell.colSpan ) : undefined,
								} ) ),
						} ) );
						***REMOVED***[ sectionName ] = newSection;
						return ***REMOVED***;
					},
					{}
				);

				return createBlock( 'core/table', {
					...***REMOVED***,
					***REMOVED***: attributes.***REMOVED***,
					caption: attributes.caption,
					style: attributes.style,
				} );
			},
		},
	],
};

export default transforms;
