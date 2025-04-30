/**
 * External dependencies
 */
import type { Property, Properties } from 'csstype';
import type { Dispatch, ***REMOVED*** } from 'react';

/**
 * WordPress dependencies
 */
import { __, _x, sprintf } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
	Button,
	Flex,
	SelectControl,
	ToggleControl,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as ***REMOVED***,
	__experimentalToggleGroupControl as ***REMOVED***,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	STORE_NAME,
	TABLE_WIDTH_UNITS,
	BORDER_COLLAPSE_CONTROLS,
	STICKY_CONTROLS,
} from '../constants';
import {
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
} from '../controls';
import {
	toggleSection,
	***REMOVED***,
	type VTable,
	type ***REMOVED***,
	type VSelectedLine,
} from '../utils/table-state';
import { ***REMOVED*** } from '../utils/style-converter';
import {
	pickPadding,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	type CornerProps,
	type ***REMOVED***,
	type CrossProps,
} from '../utils/style-picker';
import {
	updatePadding,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
} from '../utils/style-updater';
import type { StickyValue, ***REMOVED*** } from '../***REMOVED***';
import type { StoreOptions } from '../store';

const PERCENTAGE_WIDTHS = [ 25, 50, 75, 100 ];

type Props = {
	attributes: ***REMOVED***;
	setAttributes: ( attrs: Partial< ***REMOVED*** > ) => void;
	vTable: VTable;
	***REMOVED***: Dispatch< ***REMOVED***< ***REMOVED*** > >;
	***REMOVED***: Dispatch< ***REMOVED***< VSelectedLine > >;
	***REMOVED***: Properties;
};

export default function TableSettings( {
	attributes,
	setAttributes,
	vTable,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
}: Props ) {
	const { ***REMOVED***, ***REMOVED***, isScrollOnPc, ***REMOVED***, sticky, head, foot } =
		attributes;

	const options = useSelect( ( select ) => {
		const { getOptions }: { getOptions: () => StoreOptions } = select( STORE_NAME );
		return getOptions();
	}, [] );

	const ***REMOVED*** = ***REMOVED***( { ***REMOVED***: TABLE_WIDTH_UNITS } );

	const [ ***REMOVED***, ***REMOVED*** ] = parseQuantityAndUnitFromRawValue(
		***REMOVED***?.width
	);
	const [ parsedMaxWidthQuantity, ***REMOVED*** ] = parseQuantityAndUnitFromRawValue(
		***REMOVED***?.maxWidth
	);
	const [ parsedMinWidthQuantity, ***REMOVED*** ] = parseQuantityAndUnitFromRawValue(
		***REMOVED***?.minWidth
	);

	const onChangeHasFixedLayout = () => {
		setAttributes( { ***REMOVED***: ! ***REMOVED*** } );
	};

	const onChangeIsStackedOnMobile = () => {
		setAttributes( { ***REMOVED***: ! ***REMOVED*** } );
	};

	const ***REMOVED*** = () => {
		setAttributes( { isScrollOnPc: ! isScrollOnPc } );
	};

	const onChangeIsScrollOnMobile = () => {
		setAttributes( { ***REMOVED***: ! ***REMOVED*** } );
	};

	const ***REMOVED*** = ( value: string ) => {
		const ***REMOVED*** = ( _value: any ): _value is StickyValue => {
			return ! value || STICKY_CONTROLS.some( ( control ) => control.value === _value );
		};
		if ( ***REMOVED***( value ) ) {
			setAttributes( { sticky: 'none' === value ? undefined : value } );
		}
	};

	const onToggleHeaderSection = () => {
		const newVTable = toggleSection( vTable, 'head' );
		setAttributes( ***REMOVED***( newVTable ) );
		***REMOVED***( undefined );
		***REMOVED***( undefined );
	};

	const onToggleFooterSection = () => {
		const newVTable = toggleSection( vTable, 'foot' );
		setAttributes( ***REMOVED***( newVTable ) );
		***REMOVED***( undefined );
		***REMOVED***( undefined );
	};

	const onChangeWidth = ( value: Property.Width | undefined ) => {
		const newStylesObj = {
			...***REMOVED***,
			width: value,
		};
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = ( value: Property.MaxWidth | undefined ) => {
		const newStylesObj = {
			...***REMOVED***,
			maxWidth: value,
		};
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = ( value: Property.MinWidth | undefined ) => {
		const newStylesObj = {
			...***REMOVED***,
			minWidth: value,
		};
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = ( values: Partial< ***REMOVED*** > ) => {
		const newStylesObj = updatePadding( ***REMOVED***, values );
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = ( values: Partial< ***REMOVED*** > ) => {
		const newStylesObj = ***REMOVED***( ***REMOVED***, values );
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = ( values: Partial< CornerProps > ) => {
		const newStylesObj = ***REMOVED***( ***REMOVED***, values );
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = ( values: Partial< ***REMOVED*** > ) => {
		const newStylesObj = ***REMOVED***( ***REMOVED***, values );
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = ( values: Partial< ***REMOVED*** > ) => {
		const newStylesObj = ***REMOVED***( ***REMOVED***, values );
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
	};

	const onChangeBorderCollapse = ( value: string | number | undefined ) => {
		const ***REMOVED*** = ( _value: any ): _value is Properties[ '***REMOVED***' ] => {
			return ! value || BORDER_COLLAPSE_CONTROLS.some( ( control ) => control.value === _value );
		};
		if ( ***REMOVED***( value ) ) {
			const ***REMOVED*** = ***REMOVED***?.***REMOVED*** === value ? undefined : value;
			const borderSpacing =
				'separate' === ***REMOVED*** ? ***REMOVED***?.borderSpacing : undefined;
			const newStylesObj = {
				...***REMOVED***,
				***REMOVED***,
				borderSpacing,
			};
			setAttributes( {
				tableStyles: ***REMOVED***( newStylesObj ),
			} );
		}
	};

	const onChangeBorderSpacing = ( values: Partial< CrossProps > ) => {
		const newStylesObj = ***REMOVED***( ***REMOVED***, values );
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = () => {
		setAttributes( {
			***REMOVED***: false,
			isScrollOnPc: false,
			***REMOVED***: false,
			***REMOVED***: false,
			sticky: undefined,
			tableStyles: undefined,
		} );
	};

	return (
		<>
			<Spacer marginBottom="4" as={ Flex } justify="end">
				<Button variant="link" isDestructive onClick={ ***REMOVED*** }>
					{ __( 'Clear table settings', 'flexible-table-block' ) }
				</Button>
			</Spacer>
			<ToggleControl
				label={ __( 'Header section', 'flexible-table-block' ) }
				checked={ !! ( head && head.length ) }
				onChange={ onToggleHeaderSection }
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Footer section', 'flexible-table-block' ) }
				checked={ !! ( foot && foot.length ) }
				onChange={ onToggleFooterSection }
				__nextHasNoMarginBottom
			/>
			<hr />
			<ToggleControl
				label={ __( 'Fixed width table cells', 'flexible-table-block' ) }
				checked={ !! ***REMOVED*** }
				onChange={ onChangeHasFixedLayout }
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Scroll on desktop view', 'flexible-table-block' ) }
				className="ftb-toggle-control"
				checked={ !! isScrollOnPc }
				help={
					options.breakpoint &&
					sprintf(
						/* translators: %d is replaced with the number of breakpoint. */
						__( 'When the screen width is %dpx or more.', 'flexible-table-block' ),
						Math.abs( options.breakpoint ) + 1
					)
				}
				onChange={ ***REMOVED*** }
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Scroll on mobile view', 'flexible-table-block' ) }
				className="ftb-toggle-control"
				checked={ !! ***REMOVED*** }
				help={
					options.breakpoint &&
					sprintf(
						/* translators: %d is replaced with the number of breakpoint. */
						__( 'When the screen width is %dpx or less.', 'flexible-table-block' ),
						options.breakpoint
					)
				}
				onChange={ onChangeIsScrollOnMobile }
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Stack on mobile', 'flexible-table-block' ) }
				className="ftb-toggle-control"
				checked={ !! ***REMOVED*** }
				help={
					options.breakpoint &&
					sprintf(
						/* translators: %d is replaced with the number of breakpoint. */
						__( 'When the screen width is %dpx or less.', 'flexible-table-block' ),
						options.breakpoint
					)
				}
				onChange={ onChangeIsStackedOnMobile }
				__nextHasNoMarginBottom
			/>
			<SelectControl
				label={ __( 'Fixed control', 'flexible-table-block' ) }
				value={ sticky }
				options={ STICKY_CONTROLS.map( ( { label, value } ) => {
					return { label, value };
				} ) }
				help={
					***REMOVED*** &&
					sticky &&
					__(
						'Fixed control is only enabled for desktop view because "Stack on mobile" is enabled.',
						'flexible-table-block'
					)
				}
				onChange={ ***REMOVED*** }
				size="__unstable-large"
				__nextHasNoMarginBottom
			/>
			<hr />
			<HStack alignment="start">
				<UnitControl
					label={ __( 'Table width', 'flexible-table-block' ) }
					value={ ***REMOVED***?.width }
					units={ ***REMOVED*** }
					disabled={ ***REMOVED***?.width === 'auto' }
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
				label={ __( 'Table percentage width', 'flexible-table-block' ) }
				isBlock
				value={
					***REMOVED***?.width === 'auto' ||
					( ***REMOVED*** &&
						PERCENTAGE_WIDTHS.includes( ***REMOVED*** ) &&
						***REMOVED*** === '%' )
						? ***REMOVED***?.width
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
				<ToggleGroupControlOption
					label={ _x( 'auto', 'width', 'flexible-table-block' ) }
					value="auto"
				/>
			</***REMOVED***>
			<HStack alignment="start">
				<UnitControl
					label={ __( 'Table max width', 'flexible-table-block' ) }
					value={ ***REMOVED***?.maxWidth }
					units={ ***REMOVED*** }
					disabled={ ***REMOVED***?.maxWidth === 'none' }
					min={ 0 }
					onChange={ ***REMOVED*** }
					size="__unstable-large"
					__unstableInputWidth="calc(50% - 8px)"
				/>
				<Button variant="secondary" size="small" onClick={ () => ***REMOVED***( undefined ) }>
					{ __( 'Reset', 'flexible-table-block' ) }
				</Button>
			</HStack>
			<***REMOVED***
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				***REMOVED***
				label={ __( 'Table percentage max width', 'flexible-table-block' ) }
				isBlock
				value={
					***REMOVED***?.maxWidth === 'none' ||
					( parsedMaxWidthQuantity &&
						PERCENTAGE_WIDTHS.includes( parsedMaxWidthQuantity ) &&
						***REMOVED*** === '%' )
						? ***REMOVED***?.maxWidth
						: undefined
				}
				onChange={ ( value ) => ***REMOVED***( value as Property.MaxWidth ) }
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
				<ToggleGroupControlOption
					label={ _x( 'none', 'width', 'flexible-table-block' ) }
					value="none"
				/>
			</***REMOVED***>
			<HStack alignment="start">
				<UnitControl
					label={ __( 'Table min width', 'flexible-table-block' ) }
					value={ ***REMOVED***?.minWidth }
					units={ ***REMOVED*** }
					min={ 0 }
					onChange={ ***REMOVED*** }
					size="__unstable-large"
					__unstableInputWidth="calc(50% - 8px)"
				/>
				<Button variant="secondary" size="small" onClick={ () => ***REMOVED***( undefined ) }>
					{ __( 'Reset', 'flexible-table-block' ) }
				</Button>
			</HStack>
			<***REMOVED***
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				***REMOVED***
				label={ __( 'Table percentage min width', 'flexible-table-block' ) }
				isBlock
				value={
					parsedMinWidthQuantity &&
					PERCENTAGE_WIDTHS.includes( parsedMinWidthQuantity ) &&
					***REMOVED*** === '%'
						? ***REMOVED***?.minWidth
						: undefined
				}
				onChange={ ( value ) => ***REMOVED***( value as Property.MinWidth ) }
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
			<***REMOVED***
				label={ __( 'Table padding', 'flexible-table-block' ) }
				help={ __(
					'Table padding is only enabled when "Cell Borders" is set to "Separate".',
					'flexible-table-block'
				) }
				values={ pickPadding( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<hr />
			<***REMOVED***
				label={ __( 'Table border radius', 'flexible-table-block' ) }
				values={ ***REMOVED***( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				label={ __( 'Table border width', 'flexible-table-block' ) }
				help={ __(
					'Table border width is only enabled when "Cell Borders" is set to "Separate".',
					'flexible-table-block'
				) }
				values={ ***REMOVED***( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				label={ __( 'Table border style', 'flexible-table-block' ) }
				values={ ***REMOVED***( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				label={ __( 'Table border color', 'flexible-table-block' ) }
				values={ ***REMOVED***( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<hr />
			<***REMOVED***
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label={ __( 'Cell borders', 'flexible-table-block' ) }
				value={ ***REMOVED***?.***REMOVED*** }
				***REMOVED***
				onChange={ onChangeBorderCollapse }
			>
				{ BORDER_COLLAPSE_CONTROLS.map( ( { icon, label, value } ) => (
					<ToggleGroupControlOptionIcon
						key={ value }
						label={ label }
						value={ value }
						icon={ icon }
					/>
				) ) }
			</***REMOVED***>
			{ 'separate' === ***REMOVED***?.***REMOVED*** && (
				<***REMOVED***
					label={ __( 'Border spacing', 'flexible-table-block' ) }
					values={ ***REMOVED***( ***REMOVED*** ) }
					onChange={ onChangeBorderSpacing }
				/>
			) }
		</>
	);
}
