/**
 * External dependencies
 */
import clsx from 'clsx';
import type { Properties } from 'csstype';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	***REMOVED***,
	BlockControls,
	useBlockProps,
	// @ts-ignore: has no exported member
	***REMOVED***,
} from '@wordpress/block-editor';
import { ***REMOVED***, PanelBody } from '@wordpress/components';
import { blockTable, justifyLeft } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import type { ***REMOVED*** } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';
import { CONTENT_JUSTIFY_CONTROLS } from './constants';
import { STORE_NAME, type StoreOptions } from './store';
import { TableSettings, ***REMOVED***, ***REMOVED*** } from './settings';
import { Table, ***REMOVED***, TableCaption } from './elements';
import {
	insertRow,
	deleteRow,
	insertColumn,
	deleteColumn,
	mergeCells,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	type VTable,
	type VSelectedLine,
	type ***REMOVED***,
} from './utils/table-state';
import { ***REMOVED*** } from './utils/style-converter';
import {
	tableRowAfter,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
} from './icons';
import type { ***REMOVED***, SectionName, ***REMOVED*** } from './***REMOVED***';

function TableEdit( props: ***REMOVED***< ***REMOVED*** > ) {
	const {
		attributes,
		setAttributes,
		isSelected: ***REMOVED***,
		// @ts-ignore: `***REMOVED***` prop is not exist at @types
		***REMOVED***,
	} = props;
	const { ***REMOVED***, tableStyles, captionStyles, captionSide } = attributes;
	const [ selectedCells, ***REMOVED*** ] = useState< ***REMOVED*** >( undefined );
	const [ selectedLine, ***REMOVED*** ] = useState< VSelectedLine >( undefined );

	const ***REMOVED***: Properties = ***REMOVED***( tableStyles );
	const ***REMOVED***: Properties = ***REMOVED***( captionStyles );
	const options = useSelect( ( select ) => {
		const { getOptions }: { getOptions: () => StoreOptions } = select( STORE_NAME );
		return getOptions();
	}, [] );
	const { ***REMOVED*** } = useDispatch( noticesStore );
	const ***REMOVED*** = ***REMOVED***();
	const ***REMOVED*** = ***REMOVED*** === 'contentOnly';

	// Release cell selection.
	useEffect( () => {
		if ( ! ***REMOVED*** ) {
			***REMOVED***( undefined );
			***REMOVED***( undefined );
		}
	}, [ ***REMOVED*** ] );

	// Create virtual table object with the cells placed in positions based on how they actually look.
	const vTable: VTable = ***REMOVED***( attributes );

	const onChangeContentJustification = ( value: ***REMOVED*** ) => {
		const newValue = ***REMOVED*** === value ? undefined : value;
		setAttributes( { ***REMOVED***: newValue } );
	};

	const onInsertRow = ( offset: number ) => {
		if ( ! selectedCells || selectedCells.length !== 1 ) {
			return;
		}

		const { sectionName, rowIndex, rowSpan } = selectedCells[ 0 ];

		// Calculate row index to be inserted considering rowspan of the selected cell.
		const ***REMOVED*** = offset === 0 ? rowIndex : rowIndex + offset + rowSpan - 1;

		const newVTable = insertRow( vTable, { sectionName, rowIndex: ***REMOVED*** } );

		setAttributes( ***REMOVED***( newVTable ) );
		***REMOVED***( undefined );
		***REMOVED***( undefined );
	};

	const onDeleteRow = () => {
		if ( ! selectedCells || selectedCells.length !== 1 ) {
			return;
		}

		const { sectionName, rowIndex } = selectedCells[ 0 ];

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

	const ***REMOVED*** = ( offset: number ) => {
		if ( ! selectedCells || selectedCells.length !== 1 ) {
			return;
		}

		const { vColIndex, colSpan } = selectedCells[ 0 ];

		// Calculate column index to be inserted considering colspan of the selected cell.
		const ***REMOVED*** = offset === 0 ? vColIndex : vColIndex + offset + colSpan - 1;

		const newVTable = insertColumn( vTable, { vColIndex: ***REMOVED*** } );

		setAttributes( ***REMOVED***( newVTable ) );
		***REMOVED***( undefined );
		***REMOVED***( undefined );
	};

	const ***REMOVED*** = () => {
		if ( ! selectedCells || selectedCells.length !== 1 ) {
			return;
		}

		const { vColIndex } = selectedCells[ 0 ];

		const newVTable = deleteColumn( vTable, { vColIndex } );
		setAttributes( ***REMOVED***( newVTable ) );
		***REMOVED***( undefined );
		***REMOVED***( undefined );
	};

	const onMergeCells = () => {
		const newVTable = mergeCells( vTable, selectedCells, options.merge_content );
		setAttributes( ***REMOVED***( newVTable ) );
		***REMOVED***( undefined );
		***REMOVED***( undefined );
	};

	const ***REMOVED*** = () => {
		const newVTable = ***REMOVED***( vTable, selectedCells );
		setAttributes( ***REMOVED***( newVTable ) );
		***REMOVED***( undefined );
		***REMOVED***( undefined );
	};

	const ***REMOVED*** = CONTENT_JUSTIFY_CONTROLS.map( ( { icon, label, value } ) => ( {
		icon,
		title: label,
		isActive: ***REMOVED*** === value,
		value,
		onClick: () => onChangeContentJustification( value ),
	} ) );

	const ***REMOVED*** = [
		{
			icon: ***REMOVED***,
			title: __( 'Insert row before', 'flexible-table-block' ),
			isDisabled: ( selectedCells || [] ).length !== 1,
			onClick: () => onInsertRow( 0 ),
		},
		{
			icon: tableRowAfter,
			title: __( 'Insert row after', 'flexible-table-block' ),
			isDisabled: ( selectedCells || [] ).length !== 1,
			onClick: () => onInsertRow( 1 ),
		},
		{
			icon: ***REMOVED***,
			title: __( 'Delete row', 'flexible-table-block' ),
			isDisabled: ( selectedCells || [] ).length !== 1,
			onClick: () => onDeleteRow(),
		},
		{
			icon: ***REMOVED***,
			title: __( 'Insert column before', 'flexible-table-block' ),
			isDisabled: ( selectedCells || [] ).length !== 1,
			onClick: () => ***REMOVED***( 0 ),
		},
		{
			icon: ***REMOVED***,
			title: __( 'Insert column after', 'flexible-table-block' ),
			isDisabled: ( selectedCells || [] ).length !== 1,
			onClick: () => ***REMOVED***( 1 ),
		},
		{
			icon: ***REMOVED***,
			title: __( 'Delete column', 'flexible-table-block' ),
			isDisabled: ( selectedCells || [] ).length !== 1,
			onClick: () => ***REMOVED***(),
		},
		{
			icon: ***REMOVED***,
			title: __( 'Split merged cells', 'flexible-table-block' ),
			isDisabled: ! selectedCells || ! ***REMOVED***( selectedCells ),
			onClick: () => ***REMOVED***(),
		},
		{
			icon: ***REMOVED***,
			title: __( 'Merge cells', 'flexible-table-block' ),
			isDisabled: ! selectedCells || ! ***REMOVED***( selectedCells ),
			onClick: () => onMergeCells(),
		},
	];

	const isEmpty: boolean = ! [ 'head', 'body', 'foot' ].filter(
		( sectionName ) => ! ***REMOVED***( vTable[ sectionName as SectionName ] )
	).length;

	const tablePlaceholderProps = useBlockProps();

	const ***REMOVED*** = useBlockProps( {
		className: clsx( `is-caption-side-${ captionSide }`, {
			[ `is-content-justification-${ ***REMOVED*** }` ]: ***REMOVED***,
			'show-dot-on-th': options.show_dot_on_th,
			'show-control-button': options.show_control_button,
			'is-content-only': ***REMOVED***,
		} ),
	} );

	const tableProps = {
		attributes,
		setAttributes,
		isSelected: ***REMOVED***,
		options,
		vTable,
		***REMOVED***,
		selectedCells,
		***REMOVED***,
		selectedLine,
		***REMOVED***,
		***REMOVED***,
	};

	const ***REMOVED*** = {
		attributes,
		setAttributes,
		vTable,
		***REMOVED***,
		***REMOVED***,
		***REMOVED***,
	};

	const tableCellSettingsProps = {
		setAttributes,
		vTable,
		selectedCells,
	};

	const tableCellSettingsLabel: string =
		selectedCells && selectedCells.length > 1
			? __( 'Multi cells settings', 'flexible-table-block' )
			: __( 'Cell settings', 'flexible-table-block' );

	const ***REMOVED*** = {
		attributes,
		setAttributes,
		***REMOVED***,
		***REMOVED***,
		***REMOVED***,
		***REMOVED***,
		isSelected: ***REMOVED***,
	};

	const tableCaptionSettingProps = {
		attributes,
		setAttributes,
		***REMOVED***,
	};

	return (
		<>
			{ isEmpty && (
				<div { ...tablePlaceholderProps }>
					<***REMOVED*** { ...props } />
				</div>
			) }
			{ ! isEmpty && (
				<figure { ...***REMOVED*** }>
					{ ! ***REMOVED*** && (
						<>
							<BlockControls group="block">
								<***REMOVED***
									label={ __( 'Change table justification', 'flexible-table-block' ) }
									icon={
										( ***REMOVED*** &&
											***REMOVED***.find(
												( control ) => control.value === ***REMOVED***
											)?.icon ) ||
										justifyLeft
									}
									controls={ ***REMOVED*** }
								/>
								<***REMOVED***
									label={ __( 'Edit table', 'flexible-table-block' ) }
									icon={ blockTable }
									controls={ ***REMOVED*** }
								/>
							</BlockControls>
						</>
					) }
					<***REMOVED***>
						<PanelBody
							title={ __( 'Table settings', 'flexible-table-block' ) }
							initialOpen={ false }
						>
							<TableSettings { ...***REMOVED*** } />
						</PanelBody>
						{ selectedCells && !! selectedCells.length && (
							<PanelBody title={ tableCellSettingsLabel } initialOpen={ false }>
								<***REMOVED*** { ...tableCellSettingsProps } />
							</PanelBody>
						) }
						<PanelBody
							title={ __( 'Caption settings', 'flexible-table-block' ) }
							initialOpen={ false }
						>
							<***REMOVED*** { ...tableCaptionSettingProps } />
						</PanelBody>
					</***REMOVED***>
					{ 'top' === captionSide && <TableCaption { ...***REMOVED*** } /> }
					<Table { ...tableProps } />
					{ 'bottom' === captionSide && <TableCaption { ...***REMOVED*** } /> }
				</figure>
			) }
		</>
	);
}

export default TableEdit;
