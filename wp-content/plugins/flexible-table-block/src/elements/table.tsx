/**
 * External dependencies
 */
import clsx from 'clsx';
import type { Properties } from 'csstype';
import type { Dispatch, ***REMOVED***, MouseEvent, KeyboardEvent } from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import {
	RichText,
	// @ts-ignore: has no exported member
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { plus, trash, chevronRight, chevronDown } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { CELL_ARIA_LABEL } from '../constants';
import {
	insertRow,
	deleteRow,
	insertColumn,
	deleteColumn,
	toRectangledSelectedCells,
	toVirtualRows,
	***REMOVED***,
	***REMOVED***,
	type VTable,
	type VCell,
	type VRow,
	type VSelectedLine,
	type ***REMOVED***,
} from '../utils/table-state';
import { ***REMOVED*** } from '../utils/style-converter';

import type { SectionName, CellTagValue, ***REMOVED*** } from '../***REMOVED***';
import type { StoreOptions } from '../store';

function TSection( props: any ) {
	const { name, ...restProps } = props;
	const TagName = `t${ name }`;
	return <TagName { ...restProps } />;
}

function Cell( props: any ) {
	const { name, ...restProps } = props;
	const TagName: CellTagValue = name;
	return <TagName { ...restProps } />;
}

type Props = {
	attributes: ***REMOVED***;
	setAttributes: ( attrs: Partial< ***REMOVED*** > ) => void;
	isSelected: boolean;
	options: StoreOptions;
	vTable: VTable;
	***REMOVED***: Properties;
	selectedCells: ***REMOVED***;
	***REMOVED***: Dispatch< ***REMOVED***< ***REMOVED*** > >;
	selectedLine: VSelectedLine;
	***REMOVED***: Dispatch< ***REMOVED***< VSelectedLine > >;
	***REMOVED***: boolean;
};

export default function Table( {
	attributes,
	setAttributes,
	isSelected,
	options,
	vTable,
	***REMOVED***,
	selectedCells,
	***REMOVED***,
	selectedLine,
	***REMOVED***,
	***REMOVED***,
}: Props ) {
	const { ***REMOVED***, ***REMOVED***, sticky } = attributes;

	const colorProps = useColorProps( attributes );

	const [ isSelectMode, ***REMOVED*** ] = useState< boolean >( false );

	// Manage rendering status as state since some processing may be performed before rendering components.
	const [ isReady, setIdReady ] = useState< boolean >( false );
	useEffect( () => setIdReady( true ), [] );

	const tableRef = useRef( null );
	const { ***REMOVED*** } = useDispatch( noticesStore );

	let isTabMove: boolean = false;

	const isRowSelected = selectedLine && 'sectionName' in selectedLine && 'rowIndex' in selectedLine;
	const ***REMOVED*** = selectedLine && 'vColIndex' in selectedLine;

	const onInsertRow = ( sectionName: SectionName, rowIndex: number ) => {
		const newVTable = insertRow( vTable, { sectionName, rowIndex } );
		setAttributes( ***REMOVED***( newVTable ) );
		***REMOVED***( undefined );
		***REMOVED***( undefined );
	};

	const onDeleteRow = ( sectionName: SectionName, rowIndex: number ) => {
		// Do not allow tbody to be empty for table with thead /tfoot sections.
		if (
			sectionName === 'body' &&
			vTable.body.length === 1 &&
			( ! ***REMOVED***( vTable.head ) || ! ***REMOVED***( vTable.foot ) )
		) {
			// @ts-ignore
			***REMOVED***(
				__( 'The table body must have one or more rows.', 'flexible-table-block' ),
				{
					id: 'flexible-table-block-body-row',
					type: 'snackbar',
				}
			);
			return;
		}

		const newVTable = deleteRow( vTable, { sectionName, rowIndex } );
		setAttributes( ***REMOVED***( newVTable ) );
		***REMOVED***( undefined );
		***REMOVED***( undefined );
	};

	const ***REMOVED*** = ( vTargetCell: VCell, offset: number ) => {
		// Calculate column index to be inserted considering colspan of the target cell.
		const vColIndex =
			offset === 0
				? vTargetCell.vColIndex
				: vTargetCell.vColIndex + offset + vTargetCell.colSpan - 1;

		const newVTable = insertColumn( vTable, { vColIndex } );
		setAttributes( ***REMOVED***( newVTable ) );
		***REMOVED***( undefined );
		***REMOVED***( undefined );
	};

	const ***REMOVED*** = ( vColIndex: number ) => {
		const newVTable = deleteColumn( vTable, { vColIndex } );
		setAttributes( ***REMOVED***( newVTable ) );
		***REMOVED***( undefined );
		***REMOVED***( undefined );
	};

	const ***REMOVED*** = ( sectionName: SectionName ) => {
		***REMOVED***(
			vTable[ sectionName ].reduce( ( cells: VCell[], row ) => {
				return cells.concat( row.cells.filter( ( cell ) => ! cell.isHidden ) );
			}, [] )
		);
		***REMOVED***( undefined );
	};

	const onSelectRow = ( sectionName: SectionName, rowIndex: number ) => {
		if (
			isRowSelected &&
			selectedLine.sectionName === sectionName &&
			selectedLine.rowIndex === rowIndex
		) {
			***REMOVED***( undefined );
			***REMOVED***( undefined );
		} else {
			***REMOVED***( { sectionName, rowIndex } );
			***REMOVED***(
				vTable[ sectionName ].reduce( ( cells: VCell[], row ) => {
					return cells.concat(
						row.cells.filter( ( cell ) => cell.rowIndex === rowIndex && ! cell.isHidden )
					);
				}, [] )
			);
		}
	};

	const ***REMOVED*** = ( vColIndex: number ) => {
		if ( ***REMOVED*** && selectedLine.vColIndex && selectedLine.vColIndex === vColIndex ) {
			***REMOVED***( undefined );
			***REMOVED***( undefined );
		} else {
			const vRows = toVirtualRows( vTable );

			***REMOVED***(
				vRows.reduce(
					( cells: VCell[], row ) =>
						cells.concat(
							row.cells.filter( ( cell ) => cell.vColIndex === vColIndex && ! cell.isHidden )
						),
					[]
				)
			);

			***REMOVED***( { vColIndex } );
		}
	};

	const ***REMOVED*** = ( content: string, targetCell: VCell ) => {
		// If inline highlight is applied to the RichText, this process is performed before rendering the component, causing a warning error.
		// Therefore, nothing is performed if the component has not yet been rendered.
		if ( ! isReady ) {
			return;
		}

		const { sectionName, rowIndex: ***REMOVED***, vColIndex: ***REMOVED*** } = targetCell;
		***REMOVED***( [ { ...targetCell, ***REMOVED***: true } ] );

		const newVTable = {
			...vTable,
			[ sectionName ]: vTable[ sectionName ].map( ( row, rowIndex ) => {
				if ( rowIndex !== ***REMOVED*** ) {
					return { cells: row.cells.filter( ( cell ) => ! cell.isHidden ) };
				}
				return {
					cells: row.cells.map( ( cell, vColIndex ) => {
						if ( rowIndex !== ***REMOVED*** || vColIndex !== ***REMOVED*** ) {
							return cell;
						}
						return {
							...cell,
							content,
						};
					} ),
				};
			} ),
		};
		setAttributes( ***REMOVED***( newVTable ) );
	};

	// Monitor pressed key to determine whether multi-select mode or range-select mode.
	// Also the next cell will be focused if tab key navigation is enabled.
	const onKeyDown = ( event: KeyboardEvent ) => {
		const { key } = event;

		if ( key === 'Shift' || key === 'Control' || key === 'Meta' ) {
			// range-select mode or multi-select mode.
			***REMOVED***( true );
		} else if ( key === 'Tab' && options.tab_move && tableRef.current ) {
			const ***REMOVED*** =
				( event.target as HTMLElement ).closest( '.wp-block-flexible-table-block-table' ) !== null;

			if ( ! ***REMOVED*** ) {
				return;
			}
			// Focus on the next cell.
			isTabMove = true;

			const tableElement: HTMLElement = tableRef.current;
			const { ownerDocument } = tableElement;
			const { activeElement } = ownerDocument;

			const activeCell = tableElement.querySelector(
				'th.is-selected > [***REMOVED***="true"], td.is-selected > [***REMOVED***="true"]'
			);
			const ***REMOVED*** =
				activeElement && activeElement.closest( '.components-popover' ) !== null;
			const ***REMOVED*** = !! ownerDocument.querySelector( '.block-editor-link-control' );

			if ( ! activeCell || ***REMOVED*** || ***REMOVED*** ) {
				return;
			}

			const tabbableNodes = tableElement.***REMOVED***(
				'th > [***REMOVED***="true"], td > [***REMOVED***="true"]'
			);

			const ***REMOVED*** = [].slice.call( tabbableNodes );
			const ***REMOVED*** = ***REMOVED***.findIndex(
				( element: Node ) => element === activeCell
			);

			if ( ***REMOVED*** === -1 ) {
				return;
			}

			let nextCellIndex = event.shiftKey ? ***REMOVED*** - 1 : ***REMOVED*** + 1;

			if ( nextCellIndex < 0 ) {
				nextCellIndex = ***REMOVED***.length - 1;
			} else if ( nextCellIndex >= ***REMOVED***.length ) {
				nextCellIndex = 0;
			}

			const ***REMOVED***: HTMLElement = ***REMOVED***[ nextCellIndex ];

			if ( ! ***REMOVED*** ) {
				return;
			}

			event.***REMOVED***();
			***REMOVED***( false );
			***REMOVED***.focus();

			// Select all text if the next cell is not empty.
			const selection = ownerDocument.getSelection();
			const range = ownerDocument.createRange();

			if ( selection && ***REMOVED***.innerText.trim().length ) {
				range.***REMOVED***( ***REMOVED*** );
				selection.***REMOVED***();
				selection.addRange( range );
			}
		}
	};

	const onKeyUp = ( event: KeyboardEvent ) => {
		const { key } = event;

		if ( key === 'Shift' || key === 'Control' || key === 'Meta' ) {
			const ***REMOVED*** =
				( event.target as HTMLElement ).closest( '.wp-block-flexible-table-block-table' ) !== null;

			if ( ! ***REMOVED*** ) {
				return;
			}

			***REMOVED***( false );
		}
	};

	const onClickCell = ( event: MouseEvent, clickedCell: VCell ) => {
		const { shiftKey, ctrlKey, metaKey } = event;
		const ***REMOVED*** =
			( event.target as HTMLElement ).closest( '.wp-block-flexible-table-block-table' ) !== null;

		if ( ! ***REMOVED*** ) {
			return;
		}

		const { sectionName, rowIndex, vColIndex } = clickedCell;

		if ( shiftKey ) {
			// Range select.
			if ( ! selectedCells ) {
				***REMOVED***( [ { ...clickedCell, ***REMOVED***: true } ] );
			} else {
				const fromCell = selectedCells.find( ( { ***REMOVED*** } ) => ***REMOVED*** );

				if ( ! fromCell ) {
					return;
				}

				if ( fromCell.sectionName !== sectionName ) {
					// @ts-ignore
					***REMOVED***(
						__( 'Cannot select range cells from difference sections.', 'flexible-table-block' ),
						{
							id: 'flexible-table-block-range-sections',
							type: 'snackbar',
						}
					);
					return;
				}
				***REMOVED***( toRectangledSelectedCells( vTable, { fromCell, toCell: clickedCell } ) );
			}
		} else if ( ctrlKey || metaKey ) {
			// Multple select.
			const ***REMOVED*** = selectedCells ? [ ...selectedCells ] : [];
			const ***REMOVED*** = ***REMOVED***.findIndex( ( cell ) => {
				return (
					cell.sectionName === sectionName &&
					cell.rowIndex === rowIndex &&
					cell.vColIndex === vColIndex
				);
			} );

			if ( ***REMOVED***.length && sectionName !== ***REMOVED***[ 0 ].sectionName ) {
				// @ts-ignore
				***REMOVED***(
					__( 'Cannot select multi cells from difference sections.', 'flexible-table-block' ),
					{
						id: 'flexible-table-block-multi-sections',
						type: 'snackbar',
					}
				);
				return;
			}

			if ( ***REMOVED*** === -1 ) {
				***REMOVED***.push( clickedCell );
			} else {
				***REMOVED***.splice( ***REMOVED***, 1 );
			}

			***REMOVED***( ***REMOVED*** );
		} else {
			// Select cell for the first time.
			***REMOVED***( [ { ...clickedCell, ***REMOVED***: true } ] );
		}
	};

	// Remove cells from the virtual table that are not needed for dom rendering.
	const ***REMOVED*** = Object.keys( vTable ).reduce( ( result: any, sectionName ) => {
		if ( ***REMOVED***( vTable[ sectionName as SectionName ] ) ) {
			return result;
		}
		return {
			...result,
			[ sectionName ]: vTable[ sectionName as SectionName ].map( ( row ) => ( {
				cells: row.cells.filter( ( cell ) => ! cell.isHidden ),
			} ) ),
		};
	}, {} );

	if ( ! ***REMOVED*** ) {
		return null;
	}

	const ***REMOVED*** = Object.keys( ***REMOVED*** ) as SectionName[];

	return (
		// eslint-disable-next-line jsx-a11y/no-***REMOVED***-element-interactions
		<table
			className={ clsx( colorProps.className, {
				'has-fixed-layout': ***REMOVED***,
				'is-stacked-on-mobile': ***REMOVED***,
				[ `is-sticky-${ sticky }` ]: sticky,
			} ) }
			style={ { ...***REMOVED***, ...colorProps.style } }
			ref={ tableRef }
			onKeyDown={ onKeyDown }
			onKeyUp={ onKeyUp }
		>
			{ ***REMOVED***.map( ( sectionName: SectionName, sectionIndex ) => (
				<TSection name={ sectionName } key={ sectionIndex }>
					{ ***REMOVED***[ sectionName ].map( ( row: VRow, rowIndex: number ) => (
						<tr key={ rowIndex }>
							{ row.cells.map( ( cell: VCell ) => {
								const {
									content,
									tag,
									className,
									id,
									headers,
									scope,
									styles,
									rowSpan,
									colSpan,
									vColIndex,
								} = cell;

								// Whether or not the current cell is included in the selected cells.
								const ***REMOVED*** = ( selectedCells || [] ).some(
									( targetCell ) =>
										targetCell.sectionName === sectionName &&
										targetCell.rowIndex === rowIndex &&
										targetCell.vColIndex === vColIndex
								);

								const cellStylesObj = ***REMOVED***( styles );

								return (
									<Cell
										key={ vColIndex }
										name={ tag }
										className={ clsx( className, { 'is-selected': ***REMOVED*** } ) }
										rowSpan={ rowSpan > 1 ? rowSpan : undefined }
										colSpan={ colSpan > 1 ? colSpan : undefined }
										style={ cellStylesObj }
										id={ id }
										headers={ headers }
										scope={ scope }
										onClick={ ( event: MouseEvent ) => onClickCell( event, cell ) }
									>
										{ isSelected &&
											! ***REMOVED*** &&
											options.show_label_on_section &&
											rowIndex === 0 &&
											vColIndex === 0 && (
												<Button
													className="ftb-table-cell-label"
													tabIndex={ options.focus_control_button ? 0 : -1 }
													variant="primary"
													onClick={ ( event: MouseEvent ) => {
														***REMOVED***( sectionName );
														event.***REMOVED***();
													} }
												>
													{ `t${ sectionName }` }
												</Button>
											) }
										{ isSelected && ! ***REMOVED*** && options.show_control_button && (
											<>
												{ rowIndex === 0 && vColIndex === 0 && (
													<Button
														className={ clsx( 'ftb-row-before-inserter', {
															'ftb-row-before-inserter--has-prev-section': sectionIndex > 0,
														} ) }
														label={ __( 'Insert row before', 'flexible-table-block' ) }
														tabIndex={ options.focus_control_button ? 0 : -1 }
														icon={ plus }
														iconSize={ 18 }
														onClick={ ( event: MouseEvent ) => {
															onInsertRow( sectionName, rowIndex );
															event.***REMOVED***();
														} }
													/>
												) }
												{ vColIndex === 0 && (
													<>
														<Button
															className="ftb-row-selector"
															label={ __( 'Select row', 'flexible-table-block' ) }
															tabIndex={ options.focus_control_button ? 0 : -1 }
															icon={ chevronRight }
															iconSize={ 16 }
															variant={
																isRowSelected &&
																selectedLine.sectionName === sectionName &&
																selectedLine.rowIndex === rowIndex
																	? 'primary'
																	: undefined
															}
															onClick={ ( event: MouseEvent ) => {
																onSelectRow( sectionName, rowIndex );
																event.***REMOVED***();
															} }
														/>
														{ isRowSelected &&
															selectedLine.sectionName === sectionName &&
															selectedLine.rowIndex === rowIndex && (
																<Button
																	className="ftb-row-deleter"
																	label={ __( 'Delete row', 'flexible-table-block' ) }
																	tabIndex={ options.focus_control_button ? 0 : -1 }
																	icon={ trash }
																	iconSize={ 20 }
																	onClick={ ( event: MouseEvent ) => {
																		onDeleteRow( sectionName, rowIndex );
																		event.***REMOVED***();
																	} }
																/>
															) }
													</>
												) }
												{ sectionIndex === 0 && rowIndex === 0 && vColIndex === 0 && (
													<Button
														className="ftb-column-before-inserter"
														label={ __( 'Insert column before', 'flexible-table-block' ) }
														tabIndex={ options.focus_control_button ? 0 : -1 }
														icon={ plus }
														iconSize={ 18 }
														onClick={ ( event: MouseEvent ) => {
															***REMOVED***( cell, 0 );
															event.***REMOVED***();
														} }
													/>
												) }
												{ sectionIndex === 0 && rowIndex === 0 && (
													<>
														<Button
															className="ftb-column-selector"
															label={ __( 'Select column', 'flexible-table-block' ) }
															tabIndex={ options.focus_control_button ? 0 : -1 }
															icon={ chevronDown }
															iconSize={ 18 }
															variant={
																***REMOVED*** && selectedLine.vColIndex === vColIndex
																	? 'primary'
																	: undefined
															}
															onClick={ ( event: MouseEvent ) => {
																***REMOVED***( vColIndex );
																event.***REMOVED***();
															} }
														/>
														{ ***REMOVED*** && selectedLine.vColIndex === vColIndex && (
															<Button
																className="ftb-column-deleter"
																label={ __( 'Delete column', 'flexible-table-block' ) }
																tabIndex={ options.focus_control_button ? 0 : -1 }
																icon={ trash }
																iconSize={ 20 }
																onClick={ ( event: MouseEvent ) => {
																	***REMOVED***( vColIndex );
																	event.***REMOVED***();
																} }
															/>
														) }
													</>
												) }
												{ vColIndex === 0 && (
													<Button
														className={ clsx( 'ftb-row-after-inserter', {
															'ftb-row-after-inserter--has-next-section':
																sectionIndex < Object.keys( ***REMOVED*** ).length - 1 &&
																rowIndex + rowSpan - 1 === ***REMOVED***[ sectionName ].length - 1,
														} ) }
														label={ __( 'Insert row after', 'flexible-table-block' ) }
														tabIndex={ options.focus_control_button ? 0 : -1 }
														icon={ plus }
														iconSize={ 18 }
														onClick={ ( event: MouseEvent ) => {
															onInsertRow( sectionName, rowIndex + rowSpan );
															event.***REMOVED***();
														} }
													/>
												) }
											</>
										) }
										<RichText
											key={ vColIndex }
											value={ content }
											onChange={ ( value ) => ***REMOVED***( value, cell ) }
											{ ...( ( ! isSelectMode || isTabMove ) && {
												onFocus: () => {
													isTabMove = false;
													***REMOVED***( undefined );
													***REMOVED***( [ { ...cell, ***REMOVED***: true } ] );
												},
											} ) }
											aria-label={ CELL_ARIA_LABEL[ sectionName as SectionName ] }
										/>
										{ isSelected &&
											! ***REMOVED*** &&
											options.show_control_button &&
											sectionIndex === 0 &&
											rowIndex === 0 && (
												<Button
													className="ftb-column-after-inserter"
													label={ __( 'Insert column after', 'flexible-table-block' ) }
													tabIndex={ options.focus_control_button ? 0 : -1 }
													icon={ plus }
													iconSize={ 18 }
													onClick={ ( event: MouseEvent ) => {
														***REMOVED***( cell, 1 );
														event.***REMOVED***();
													} }
												/>
											) }
									</Cell>
								);
							} ) }
						</tr>
					) ) }
				</TSection>
			) ) }
		</table>
	);
}
