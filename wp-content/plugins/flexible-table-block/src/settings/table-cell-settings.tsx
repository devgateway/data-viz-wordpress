/**
 * External dependencies
 */
import type { Property } from 'csstype';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import {
	BaseControl,
	Button,
	ButtonGroup,
	TextControl,
	// @ts-ignore: has no exported member
	__experimentalUnitControl as UnitControl,
	// @ts-ignore: has no exported member
	__experimentalUseCustomUnits as ***REMOVED***,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	FONT_SIZE_UNITS,
	CELL_WIDTH_UNITS,
	CELL_TAG_CONTROLS,
	CELL_SCOPE_CONTROLS,
	TEXT_ALIGNMENT_CONTROLS,
	VERTICAL_ALIGNMENT_CONTROLS,
} from '../constants';
import {
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	ColorControl,
} from '../controls';
import { ***REMOVED***, updateCells } from '../utils/table-state';
import { ***REMOVED*** } from '../utils/style-converter';
import {
	pickPadding,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
} from '../utils/style-picker';
import { ***REMOVED*** } from '../utils/helper';
import type {
	CellTagValue,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	SectionName,
	***REMOVED***,
} from '../***REMOVED***';
import type { VTable, ***REMOVED*** } from '../utils/table-state';
import type { CornerProps, ***REMOVED*** } from '../utils/style-picker';

type Props = {
	setAttributes: ( attrs: Partial< ***REMOVED*** > ) => void;
	vTable: VTable;
	selectedCells: ***REMOVED***;
};

export default function ***REMOVED***( { setAttributes, vTable, selectedCells = [] }: Props ) {
	const ***REMOVED*** = ***REMOVED***( { ***REMOVED***: CELL_WIDTH_UNITS } );
	const fontSizeUnits = ***REMOVED***( { ***REMOVED***: FONT_SIZE_UNITS } );

	if ( ! selectedCells.length ) return null;

	const { sectionName, rowIndex, vColIndex } = selectedCells[ 0 ];

	const targetCell = vTable[ sectionName as SectionName ][ rowIndex ].cells[ vColIndex ];

	if ( ! targetCell ) return null;

	const ***REMOVED***: ( 'th' | 'td' )[] = selectedCells.reduce(
		( result: CellTagValue[], selectedCell ) => {
			const { tag } =
				vTable[ selectedCell.sectionName ][ selectedCell.rowIndex ].cells[ selectedCell.vColIndex ];
			if ( ! result.includes( tag ) ) {
				result.push( tag );
			}
			return result;
		},
		[]
	);

	const cellStylesObj = ***REMOVED***( targetCell.styles );

	const ***REMOVED*** = ( state: {
		styles?: any;
		tag?: CellTagValue;
		className?: string;
		id?: string;
		headers?: string;
		scope?: ***REMOVED***;
	} ) => {
		const newVTable = updateCells( vTable, state, selectedCells );
		setAttributes( ***REMOVED***( newVTable ) );
	};

	const ***REMOVED*** = ( value: string ) => {
		***REMOVED***( { styles: { fontSize: ***REMOVED***( value ) } } );
	};

	const ***REMOVED*** = ( value: Property.LineHeight ) => {
		***REMOVED***( { styles: { lineHeight: value } } );
	};

	const onChangeColor = ( value: Property.Color ) => {
		***REMOVED***( { styles: { color: value } } );
	};

	const onChangeBackgroundColor = ( value: Property.***REMOVED*** ) => {
		***REMOVED***( { styles: { ***REMOVED***: value } } );
	};

	const onChangeWidth = ( value: Property.Width ) => {
		***REMOVED***( { styles: { width: ***REMOVED***( value ) } } );
	};

	const ***REMOVED*** = ( values: Partial< ***REMOVED*** > ) => {
		***REMOVED***( { styles: { padding: values } } );
	};

	const ***REMOVED*** = ( values: Partial< ***REMOVED*** > ) => {
		***REMOVED***( { styles: { borderWidth: values } } );
	};

	const ***REMOVED*** = ( values: Partial< CornerProps > ) => {
		***REMOVED***( { styles: { borderRadius: values } } );
	};

	const ***REMOVED*** = ( values: Partial< ***REMOVED*** > ) => {
		***REMOVED***( { styles: { borderStyle: values } } );
	};

	const ***REMOVED*** = ( values: Partial< ***REMOVED*** > ) => {
		***REMOVED***( { styles: { borderColor: values } } );
	};

	const ***REMOVED*** = ( value: ***REMOVED*** ) => {
		***REMOVED***( {
			styles: { textAlign: value === cellStylesObj.textAlign ? undefined : value },
		} );
	};

	const onChangeVerticalAlign = ( value: ***REMOVED*** ) => {
		***REMOVED***( {
			styles: { verticalAlign: value === cellStylesObj.verticalAlign ? undefined : value },
		} );
	};

	const onChangeTag = ( value: CellTagValue ) => {
		***REMOVED***( { tag: value, id: undefined, headers: undefined, scope: undefined } );
	};

	const onChangeClass = ( value: string ) => {
		***REMOVED***( { className: value !== '' ? value : undefined } );
	};

	const onChangeId = ( value: string ) => {
		***REMOVED***( { id: value !== '' ? value : undefined } );
	};

	const ***REMOVED*** = ( value: string ) => {
		***REMOVED***( { headers: value !== '' ? value : undefined } );
	};

	const onChangeScope = ( value: ***REMOVED*** ) => {
		***REMOVED***( { scope: value === targetCell.scope ? undefined : value } );
	};

	const ***REMOVED*** = () => {
		***REMOVED***( {
			styles: {
				fontSize: undefined,
				lineHeight: undefined,
				width: undefined,
				color: undefined,
				***REMOVED***: undefined,
				padding: { top: undefined, right: undefined, bottom: undefined, left: undefined },
				borderRadius: {
					topLeft: undefined,
					topRight: undefined,
					bottomRight: undefined,
					bottomLeft: undefined,
				},
				borderWidth: { top: undefined, right: undefined, bottom: undefined, left: undefined },
				borderStyle: { top: undefined, right: undefined, bottom: undefined, left: undefined },
				borderColor: { top: undefined, right: undefined, bottom: undefined, left: undefined },
				textAlign: undefined,
				verticalAlign: undefined,
			},
			className: undefined,
			id: undefined,
			headers: undefined,
			scope: undefined,
		} );
	};

	return (
		<>
			<BaseControl
				id="flexible-table-block-cell-clear-settings"
				className="ftb-reset-settings-control"
			>
				<Button variant="link" isDestructive onClick={ ***REMOVED*** }>
					{ __( 'Clear cell settings', 'flexible-table-block' ) }
				</Button>
			</BaseControl>
			<div className="ftb-base-control-row">
				<BaseControl
					id="flexible-table-block-cell-font-size"
					label={ __( 'Cell font size', 'flexible-table-block' ) }
					className="ftb-font-size-control"
				>
					<UnitControl
						id="flexible-table-block-cell-font-size"
						value={ cellStylesObj?.fontSize }
						units={ fontSizeUnits }
						min="0"
						onChange={ ***REMOVED*** }
					/>
				</BaseControl>
				<BaseControl id="flexible-table-block-cell-line-height" className="ftb-line-height-control">
					<TextControl
						label={ __( 'Cell line height', 'flexible-table-block' ) }
						value={ cellStylesObj?.lineHeight || '' }
						autoComplete="off"
						type="number"
						step={ 0.1 }
						min={ 0 }
						onChange={ ***REMOVED*** }
					/>
				</BaseControl>
			</div>
			<BaseControl
				id="flexible-table-block-cell-width"
				label={ __( 'Cell width', 'flexible-table-block' ) }
				className="ftb-width-control"
			>
				<UnitControl
					id="flexible-table-block-cell-width"
					aria-label={ __( 'Cell width', 'flexible-table-block' ) }
					value={ cellStylesObj?.width }
					units={ ***REMOVED*** }
					min="0"
					onChange={ onChangeWidth }
				/>
				<ButtonGroup
					aria-label={ __( 'Cell percentage width', 'flexible-table-block' ) }
					className="ftb-percent-group"
				>
					{ [ 25, 50, 75, 100 ].map( ( perWidth ) => {
						const isPressed = cellStylesObj?.width === `${ perWidth }%`;
						return (
							<Button
								key={ perWidth }
								variant={ isPressed ? 'primary' : undefined }
								isSmall
								onClick={ () => onChangeWidth( isPressed ? '' : `${ perWidth }%` ) }
							>
								{ `${ perWidth }%` }
							</Button>
						);
					} ) }
				</ButtonGroup>
			</BaseControl>
			<hr />
			<ColorControl
				id="flexible-table-block-cell-text-color"
				label={ __( 'Cell text color', 'flexible-table-block' ) }
				value={ cellStylesObj.color }
				onChange={ onChangeColor }
			/>
			<ColorControl
				id="flexible-table-block-cell-background-color"
				label={ __( 'Cell background color', 'flexible-table-block' ) }
				value={ cellStylesObj.***REMOVED*** }
				colors={ [
					{
						name: __( 'Transparent', 'flexible-table-block' ),
						slug: 'transparent',
						color: 'transparent',
					},
				] }
				onChange={ onChangeBackgroundColor }
			/>
			<hr />
			<***REMOVED***
				id="flexible-table-block-cell-padding"
				label={ __( 'Cell padding', 'flexible-table-block' ) }
				values={ pickPadding( cellStylesObj ) }
				onChange={ ***REMOVED*** }
			/>
			<hr />
			<***REMOVED***
				id="flexible-table-block-cell-border-radius"
				label={ __( 'Cell border radius', 'flexible-table-block' ) }
				values={ ***REMOVED***( cellStylesObj ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				id="flexible-table-block-cell-border-width"
				label={ __( 'Cell border width', 'flexible-table-block' ) }
				values={ ***REMOVED***( cellStylesObj ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				id="flexible-table-block-cell-border-style"
				label={ __( 'Cell border style', 'flexible-table-block' ) }
				values={ ***REMOVED***( cellStylesObj ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				id="flexible-table-block-cell-border-color"
				label={ __( 'Cell border color', 'flexible-table-block' ) }
				values={ ***REMOVED***( cellStylesObj ) }
				onChange={ ***REMOVED*** }
			/>
			<hr />
			<BaseControl id="flexible-table-block-cell-text-align">
				<div aria-labelledby="flexible-table-block-cell-text-align-heading" role="region">
					<span
						id="flexible-table-block-cell-text-align-heading"
						className="ftb-base-control-label"
					>
						{ __( 'Cell alignment', 'flexible-table-block' ) }
					</span>
					<div className="ftb-base-control-field-row">
						<ButtonGroup
							className="ftb-button-group"
							aria-label={ __( 'Text alignment', 'flexible-table-block' ) }
						>
							{ TEXT_ALIGNMENT_CONTROLS.map( ( { icon, label, value } ) => {
								return (
									<Button
										key={ value }
										label={ label }
										icon={ icon }
										variant={ value === cellStylesObj?.textAlign ? 'primary' : 'secondary' }
										onClick={ () => ***REMOVED***( value ) }
									/>
								);
							} ) }
						</ButtonGroup>
						<ButtonGroup
							className="ftb-button-group"
							aria-label={ __( 'Vertical alignment', 'flexible-table-block' ) }
						>
							{ VERTICAL_ALIGNMENT_CONTROLS.map( ( { icon, label, value } ) => {
								return (
									<Button
										key={ value }
										label={ label }
										icon={ icon }
										variant={ value === cellStylesObj?.verticalAlign ? 'primary' : 'secondary' }
										onClick={ () => onChangeVerticalAlign( value ) }
									/>
								);
							} ) }
						</ButtonGroup>
					</div>
				</div>
			</BaseControl>
			<hr />
			<BaseControl id="flexible-table-block-cell-tag">
				<div aria-labelledby="flexible-table-block-cell-tag-heading" role="region">
					<span id="flexible-table-block-cell-tag-heading" className="ftb-base-control-label">
						{ __( 'Cell tag', 'flexible-table-block' ) }
					</span>
					<ButtonGroup className="ftb-button-group">
						{ CELL_TAG_CONTROLS.map( ( { label, value } ) => {
							return (
								<Button
									key={ value }
									variant={ value === targetCell.tag ? 'primary' : 'secondary' }
									onClick={ () => onChangeTag( value ) }
								>
									{ label }
								</Button>
							);
						} ) }
					</ButtonGroup>
				</div>
			</BaseControl>
			<TextControl
				label={ __( 'Cell CSS class(es)', 'flexible-table-block' ) }
				autoComplete="off"
				value={ targetCell.className || '' }
				onChange={ onChangeClass }
				help={ __( 'Separate multiple classes with spaces.' ) }
			/>
			{ ***REMOVED***.length === 1 && (
				<>
					<hr />
					{ ***REMOVED***.includes( 'th' ) && (
						<TextControl
							label={ createInterpolateElement(
								__( '<code>id</code> attribute', 'flexible-table-block' ),
								{ code: <code /> }
							) }
							autoComplete="off"
							value={ targetCell.id || '' }
							onChange={ onChangeId }
						/>
					) }
					<TextControl
						label={ createInterpolateElement(
							__( '<code>headers</code> attribute', 'flexible-table-block' ),
							{ code: <code /> }
						) }
						autoComplete="off"
						value={ targetCell.headers || '' }
						onChange={ ***REMOVED*** }
					/>
					{ ***REMOVED***.includes( 'th' ) && (
						<BaseControl id="flexible-table-block-cell-scope">
							<div aria-labelledby="flexible-table-block-cell-scope-heading" role="region">
								<span
									id="flexible-table-block-cell-scope-heading"
									className="ftb-base-control-label"
								>
									{ createInterpolateElement(
										__( '<code>scope</code> attribute', 'flexible-table-block' ),
										{ code: <code /> }
									) }
								</span>
								<ButtonGroup className="ftb-button-group">
									{ CELL_SCOPE_CONTROLS.map( ( { label, value } ) => {
										return (
											<Button
												key={ value }
												variant={ value === targetCell.scope ? 'primary' : 'secondary' }
												onClick={ () => onChangeScope( value ) }
											>
												{ label }
											</Button>
										);
									} ) }
								</ButtonGroup>
							</div>
						</BaseControl>
					) }
				</>
			) }
		</>
	);
}
