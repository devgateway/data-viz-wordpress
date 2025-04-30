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
	Flex,
	FlexBlock,
	SelectControl,
	TextControl,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	__experimentalToggleGroupControl as ***REMOVED***,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as ***REMOVED***,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
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
import {
	***REMOVED***,
	updateCells,
	type VTable,
	type ***REMOVED***,
} from '../utils/table-state';
import { ***REMOVED*** } from '../utils/style-converter';
import {
	pickPadding,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	type CornerProps,
	type ***REMOVED***,
} from '../utils/style-picker';
import { ***REMOVED*** } from '../utils/helper';
import type {
	CellTagValue,
	***REMOVED***,
	SectionName,
	***REMOVED***,
} from '../***REMOVED***';

const PERCENTAGE_WIDTHS = [ 25, 50, 75, 100 ];

type Props = {
	setAttributes: ( attrs: Partial< ***REMOVED*** > ) => void;
	vTable: VTable;
	selectedCells: ***REMOVED***;
};

export default function ***REMOVED***( { setAttributes, vTable, selectedCells = [] }: Props ) {
	const ***REMOVED*** = ***REMOVED***( { ***REMOVED***: CELL_WIDTH_UNITS } );
	const fontSizeUnits = ***REMOVED***( { ***REMOVED***: FONT_SIZE_UNITS } );

	if ( ! selectedCells.length ) {
		return null;
	}

	const { sectionName, rowIndex, vColIndex } = selectedCells[ 0 ];

	const targetCell = vTable[ sectionName as SectionName ][ rowIndex ].cells[ vColIndex ];

	if ( ! targetCell ) {
		return null;
	}

	const ***REMOVED*** = selectedCells.reduce( ( result: CellTagValue[], selectedCell ) => {
		const { tag } =
			vTable[ selectedCell.sectionName ][ selectedCell.rowIndex ].cells[ selectedCell.vColIndex ];
		if ( ! result.includes( tag ) ) {
			result.push( tag );
		}
		return result;
	}, [] );

	const cellStylesObj = ***REMOVED***( targetCell.styles );
	const [ ***REMOVED***, ***REMOVED*** ] = parseQuantityAndUnitFromRawValue(
		cellStylesObj?.width
	);

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

	const ***REMOVED*** = ( value: string | undefined ) => {
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

	const onChangeWidth = ( value: string | number | undefined ) => {
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

	const ***REMOVED*** = ( value: string | number | undefined ) => {
		***REMOVED***( {
			styles: { textAlign: value === cellStylesObj.textAlign ? undefined : value },
		} );
	};

	const onChangeVerticalAlign = ( value: string | number | undefined ) => {
		***REMOVED***( {
			styles: { verticalAlign: value === cellStylesObj.verticalAlign ? undefined : value },
		} );
	};

	const onChangeTag = ( value: string | number | undefined ) => {
		const isAllowedTag = ( _value: any ): _value is CellTagValue => {
			return CELL_TAG_CONTROLS.some( ( control ) => control.value === _value );
		};
		if ( isAllowedTag( value ) ) {
			***REMOVED***( { tag: value, id: undefined, headers: undefined, scope: undefined } );
		}
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
		***REMOVED***( { scope: 'none' === value ? undefined : value } );
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
			<Spacer marginBottom="4" as={ Flex } justify="end">
				<Button variant="link" isDestructive onClick={ ***REMOVED*** }>
					{ __( 'Clear cell settings', 'flexible-table-block' ) }
				</Button>
			</Spacer>
			<Spacer marginBottom="4" as={ Flex }>
				<FlexBlock>
					<UnitControl
						label={ __( 'Cell font size', 'flexible-table-block' ) }
						value={ cellStylesObj?.fontSize }
						units={ fontSizeUnits }
						min={ 0 }
						onChange={ ***REMOVED*** }
						size="__unstable-large"
					/>
				</FlexBlock>
				<FlexBlock>
					<TextControl
						label={ __( 'Cell line height', 'flexible-table-block' ) }
						value={ cellStylesObj?.lineHeight || '' }
						autoComplete="off"
						type="number"
						step={ 0.1 }
						min={ 0 }
						onChange={ ***REMOVED*** }
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
				</FlexBlock>
			</Spacer>
			<HStack alignment="start">
				<UnitControl
					label={ __( 'Cell width', 'flexible-table-block' ) }
					value={ cellStylesObj?.width }
					units={ ***REMOVED*** }
					min={ 0 }
					onChange={ onChangeWidth }
					size="__unstable-large"
					__unstableInputWidth="calc(50% - 8px)"
				/>
				<Button variant="secondary" size="small" onClick={ () => onChangeWidth( undefined ) }>
					{ __( 'Reset', 'flexible-table-block' ) }
				</Button>
			</HStack>
			<***REMOVED***
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				***REMOVED***
				label={ __( 'Cell percentage width', 'flexible-table-block' ) }
				isBlock
				value={
					***REMOVED*** &&
					PERCENTAGE_WIDTHS.includes( ***REMOVED*** ) &&
					***REMOVED*** === '%'
						? cellStylesObj?.width
						: undefined
				}
				onChange={ ( value ) => onChangeWidth( value as Property.Width ) }
			>
				{ PERCENTAGE_WIDTHS.map( ( perWidth ) => {
					return (
						<ToggleGroupControlOption
							key={ perWidth }
							label={ `${ perWidth }%` }
							value={ `${ perWidth }%` }
						/>
					);
				} ) }
			</***REMOVED***>
			<hr />
			<ColorControl
				label={ __( 'Cell text color', 'flexible-table-block' ) }
				value={ cellStylesObj.color }
				onChange={ onChangeColor }
			/>
			<ColorControl
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
				label={ __( 'Cell padding', 'flexible-table-block' ) }
				values={ pickPadding( cellStylesObj ) }
				onChange={ ***REMOVED*** }
			/>
			<hr />
			<***REMOVED***
				label={ __( 'Cell border radius', 'flexible-table-block' ) }
				values={ ***REMOVED***( cellStylesObj ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				label={ __( 'Cell border width', 'flexible-table-block' ) }
				values={ ***REMOVED***( cellStylesObj ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				label={ __( 'Cell border style', 'flexible-table-block' ) }
				values={ ***REMOVED***( cellStylesObj ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				label={ __( 'Cell border color', 'flexible-table-block' ) }
				values={ ***REMOVED***( cellStylesObj ) }
				onChange={ ***REMOVED*** }
			/>
			<hr />
			<BaseControl id="flexible-table-block-cell-text-align" __nextHasNoMarginBottom>
				<div aria-labelledby="flexible-table-block-cell-text-align-heading" role="group">
					<span
						id="flexible-table-block-cell-text-align-heading"
						className="ftb-base-control-label"
					>
						{ __( 'Cell alignment', 'flexible-table-block' ) }
					</span>
					<Flex style={ { marginBottom: '-16px' } } justify="start" align="start">
						<***REMOVED***
							***REMOVED***
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={ __( 'Text alignment', 'flexible-table-block' ) }
							value={ cellStylesObj?.textAlign }
							***REMOVED***
							onChange={ ***REMOVED*** }
						>
							{ TEXT_ALIGNMENT_CONTROLS.map( ( { icon, label, value } ) => (
								<ToggleGroupControlOptionIcon
									key={ value }
									value={ value }
									icon={ icon }
									label={ label }
								/>
							) ) }
						</***REMOVED***>
						<***REMOVED***
							***REMOVED***
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={ __( 'Vertical alignment', 'flexible-table-block' ) }
							value={ cellStylesObj?.verticalAlign }
							***REMOVED***
							onChange={ onChangeVerticalAlign }
						>
							{ VERTICAL_ALIGNMENT_CONTROLS.map( ( { icon, label, value } ) => (
								<ToggleGroupControlOptionIcon
									key={ value }
									value={ value }
									icon={ icon }
									label={ label }
								/>
							) ) }
						</***REMOVED***>
					</Flex>
				</div>
			</BaseControl>
			<hr />
			<***REMOVED***
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label={ __( 'Cell tag', 'flexible-table-block' ) }
				value={ targetCell.tag }
				isBlock
				onChange={ onChangeTag }
			>
				{ CELL_TAG_CONTROLS.map( ( { label, value } ) => (
					<ToggleGroupControlOption key={ value } value={ value } label={ label } />
				) ) }
			</***REMOVED***>
			<TextControl
				label={ __( 'Cell CSS class(es)', 'flexible-table-block' ) }
				autoComplete="off"
				value={ targetCell.className || '' }
				onChange={ onChangeClass }
				help={ __( 'Separate multiple classes with spaces.', 'flexible-table-block' ) }
				__nextHasNoMarginBottom
				__next40pxDefaultSize
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
							__nextHasNoMarginBottom
							__next40pxDefaultSize
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
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
					{ ***REMOVED***.includes( 'th' ) && (
						<SelectControl
							label={ createInterpolateElement(
								__( '<code>scope</code> attribute', 'flexible-table-block' ),
								{ code: <code /> }
							) }
							value={ targetCell.scope }
							options={ CELL_SCOPE_CONTROLS.map( ( { label, value } ) => {
								return { label, value };
							} ) }
							onChange={ ( value ) => onChangeScope( value as ***REMOVED*** ) }
							size="__unstable-large"
							__nextHasNoMarginBottom
						/>
					) }
				</>
			) }
		</>
	);
}
