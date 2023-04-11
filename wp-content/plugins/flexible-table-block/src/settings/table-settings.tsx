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
	BaseControl,
	Button,
	ButtonGroup,
	SelectControl,
	ToggleControl,
	// @ts-ignore: has no exported member
	__experimentalUnitControl as UnitControl,
	// @ts-ignore: has no exported member
	__experimentalUseCustomUnits as ***REMOVED***,
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
import { toggleSection, ***REMOVED*** } from '../utils/table-state';
import { ***REMOVED*** } from '../utils/style-converter';
import {
	pickPadding,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
} from '../utils/style-picker';
import {
	updatePadding,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
} from '../utils/style-updater';
import { ***REMOVED*** } from '../utils/helper';
import type { VTable, ***REMOVED***, VSelectedLine } from '../utils/table-state';
import type { CornerProps, ***REMOVED***, CrossProps } from '../utils/style-picker';
import type { StickyValue, ***REMOVED***, ***REMOVED*** } from '../***REMOVED***';
import type { StoreOptions } from '../store';

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

	const options: StoreOptions = useSelect( ( select ) => select( STORE_NAME ).getOptions(), [] );

	const ***REMOVED*** = ***REMOVED***( { ***REMOVED***: TABLE_WIDTH_UNITS } );

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

	const ***REMOVED*** = ( value: StickyValue ) => {
		setAttributes( { sticky: 'none' === value ? undefined : value } );
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

	const onChangeWidth = ( value: Property.Width ) => {
		const newStylesObj = {
			...***REMOVED***,
			width: value,
		};
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = ( value: Property.MaxWidth ) => {
		const newStylesObj = {
			...***REMOVED***,
			maxWidth: value,
		};
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = ( value: Property.MinWidth ) => {
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

	const onChangeBorderCollapse = ( value: ***REMOVED*** ) => {
		const ***REMOVED*** = ***REMOVED***?.***REMOVED*** === value ? undefined : value;
		const borderSpacing = 'separate' === ***REMOVED*** ? ***REMOVED***?.borderSpacing : undefined;
		const newStylesObj = {
			...***REMOVED***,
			***REMOVED***,
			borderSpacing,
		};
		setAttributes( { tableStyles: ***REMOVED***( newStylesObj ) } );
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
			<BaseControl
				id="flexible-table-block-table-clear-settings"
				className="ftb-reset-settings-control"
			>
				<Button variant="link" isDestructive onClick={ ***REMOVED*** }>
					{ __( 'Clear table settings', 'flexible-table-block' ) }
				</Button>
			</BaseControl>
			<ToggleControl
				label={ __( 'Header section', 'flexible-table-block' ) }
				checked={ !! ( head && head.length ) }
				onChange={ onToggleHeaderSection }
			/>
			<ToggleControl
				label={ __( 'Footer section', 'flexible-table-block' ) }
				checked={ !! ( foot && foot.length ) }
				onChange={ onToggleFooterSection }
			/>
			<hr />
			<ToggleControl
				label={ __( 'Fixed width table cells', 'flexible-table-block' ) }
				checked={ !! ***REMOVED*** }
				onChange={ onChangeHasFixedLayout }
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
						options.breakpoint + 1
					)
				}
				onChange={ ***REMOVED*** }
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
						'Fixed control is only enable for desktop view because "Stack on mobile" is enabled.',
						'flexible-table-block'
					)
				}
				onChange={ ***REMOVED*** }
			/>
			<hr />
			<BaseControl
				id="flexible-table-block-table-width"
				label={ __( 'Table width', 'flexible-table-block' ) }
				className="ftb-width-control"
			>
				<UnitControl
					id="flexible-table-block-table-width"
					value={ ***REMOVED***?.width }
					units={ ***REMOVED*** }
					disabled={ ***REMOVED***?.width === 'auto' }
					min="0"
					onChange={ onChangeWidth }
				/>
				<ButtonGroup
					aria-label={ __( 'Table percentage width', 'flexible-table-block' ) }
					className="ftb-percent-group"
				>
					{ [ 25, 50, 75, 100 ].map( ( perWidth ) => {
						const isPressed = ***REMOVED***?.width === `${ perWidth }%`;
						return (
							<Button
								key={ perWidth }
								variant={ isPressed ? 'primary' : undefined }
								isSmall
								onClick={ () =>
									onChangeWidth( isPressed ? '' : ***REMOVED***( `${ perWidth }%` ) )
								}
							>
								{ `${ perWidth }%` }
							</Button>
						);
					} ) }
					<Button
						variant={ ***REMOVED***?.width === 'auto' ? 'primary' : undefined }
						isSmall
						onClick={ () => onChangeWidth( ***REMOVED***?.width === 'auto' ? '' : 'auto' ) }
					>
						{ __( 'auto', 'flexible-table-block' ) }
					</Button>
				</ButtonGroup>
			</BaseControl>
			<BaseControl
				id="flexible-table-block-table-max-width"
				label={ __( 'Table max width', 'flexible-table-block' ) }
				className="ftb-width-control"
			>
				<UnitControl
					id="flexible-table-block-table-max-width"
					value={ ***REMOVED***?.maxWidth }
					units={ ***REMOVED*** }
					disabled={ ***REMOVED***?.maxWidth === 'none' }
					min="0"
					onChange={ ***REMOVED*** }
				/>
				<ButtonGroup
					aria-label={ __( 'Table percentage max width' ) }
					className="ftb-percent-group"
				>
					{ [ 25, 50, 75, 100 ].map( ( perWidth ) => {
						const isPressed = ***REMOVED***?.maxWidth === `${ perWidth }%`;
						return (
							<Button
								key={ perWidth }
								variant={ isPressed ? 'primary' : undefined }
								isSmall
								onClick={ () =>
									***REMOVED***( isPressed ? '' : ***REMOVED***( `${ perWidth }%` ) )
								}
							>
								{ `${ perWidth }%` }
							</Button>
						);
					} ) }
					<Button
						variant={ ***REMOVED***?.maxWidth === 'none' ? 'primary' : undefined }
						isSmall
						onClick={ () => ***REMOVED***( ***REMOVED***?.maxWidth === 'none' ? '' : 'none' ) }
					>
						{ _x( 'none', 'width', 'flexible-table-block' ) }
					</Button>
				</ButtonGroup>
			</BaseControl>
			<BaseControl
				id="flexible-table-block-table-min-width"
				label={ __( 'Table min width', 'flexible-table-block' ) }
				className="ftb-width-control"
			>
				<UnitControl
					id="flexible-table-block-table-min-width"
					value={ ***REMOVED***?.minWidth }
					units={ ***REMOVED*** }
					min="0"
					onChange={ ***REMOVED*** }
				/>
				<ButtonGroup
					aria-label={ __( 'Table percentage min width' ) }
					className="ftb-percent-group"
				>
					{ [ 25, 50, 75, 100 ].map( ( perWidth ) => {
						const isPressed = ***REMOVED***?.minWidth === `${ perWidth }%`;
						return (
							<Button
								key={ perWidth }
								variant={ isPressed ? 'primary' : undefined }
								isSmall
								onClick={ () => ***REMOVED***( isPressed ? '' : `${ perWidth }%` ) }
							>
								{ `${ perWidth }%` }
							</Button>
						);
					} ) }
				</ButtonGroup>
			</BaseControl>
			<hr />
			<***REMOVED***
				id="flexible-table-block-table-padding"
				label={ __( 'Table padding', 'flexible-table-block' ) }
				help={ __(
					'Table padding is only enable when "Cell Borders" is set to "Separate".',
					'flexible-table-block'
				) }
				values={ pickPadding( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<hr />
			<***REMOVED***
				id="flexible-table-block-table-border-radius"
				label={ __( 'Table border radius', 'flexible-table-block' ) }
				values={ ***REMOVED***( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				id="flexible-table-block-table-border-width"
				label={ __( 'Table border width', 'flexible-table-block' ) }
				help={ __(
					'Table border width is only enable when "Cell Borders" is set to "Separate".',
					'flexible-table-block'
				) }
				values={ ***REMOVED***( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				id="flexible-table-block-table-border-style"
				label={ __( 'Table border style', 'flexible-table-block' ) }
				values={ ***REMOVED***( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				id="flexible-table-block-table-border-color"
				label={ __( 'Table border color', 'flexible-table-block' ) }
				values={ ***REMOVED***( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<hr />
			<BaseControl id="flexible-table-block-table-border-collapse">
				<div aria-labelledby="flexible-table-block-table-border-collapse-heading" role="region">
					<span
						id="flexible-table-block-table-border-collapse-heading"
						className="ftb-base-control-label"
					>
						{ __( 'Cell borders', 'flexible-table-block' ) }
					</span>
					<ButtonGroup className="ftb-button-group">
						{ BORDER_COLLAPSE_CONTROLS.map( ( { icon, label, value } ) => {
							return (
								<Button
									key={ value }
									variant={ value === ***REMOVED***?.***REMOVED*** ? 'primary' : 'secondary' }
									icon={ icon }
									onClick={ () => onChangeBorderCollapse( value ) }
								>
									{ label }
								</Button>
							);
						} ) }
					</ButtonGroup>
				</div>
			</BaseControl>
			{ 'separate' === ***REMOVED***?.***REMOVED*** && (
				<***REMOVED***
					id="flexible-table-block-table-border-spacing"
					label={ __( 'Border spacing', 'flexible-table-block' ) }
					values={ ***REMOVED***( ***REMOVED*** ) }
					onChange={ onChangeBorderSpacing }
				/>
			) }
		</>
	);
}
