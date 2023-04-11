/**
 * External dependencies
 */
import { get } from 'lodash';
import classnames from 'classnames';
import type { Property } from 'csstype';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { link, linkOff } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import {
	BaseControl,
	Button,
	Popover,
	Tooltip,
	***REMOVED***,
	ColorPalette,
	// @ts-ignore: has no exported member
	__experimentalText as Text,
} from '@wordpress/components';
import { store as ***REMOVED*** } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { ***REMOVED*** } from './indicator-control';
import { SIDE_CONTROLS } from '../constants';
import type { SideValue } from '../***REMOVED***';

type Props = {
	id: string;
	label: string;
	help?: string;
	className?: string;
	onChange: ( event: any ) => void;
	values: {
		top?: Property.***REMOVED***;
		right?: Property.***REMOVED***;
		bottom?: Property.***REMOVED***;
		left?: Property.***REMOVED***;
	};
	allowSides?: boolean;
	hasIndicator?: boolean;
};

const DEFAULT_VALUES = {
	top: '',
	right: '',
	bottom: '',
	left: '',
};

export default function ***REMOVED***( {
	id,
	label = __( 'Border color', 'flexible-table-block' ),
	help,
	className,
	onChange,
	values: valuesProp,
	allowSides = true,
	hasIndicator = true,
}: Props ) {
	const values = {
		...DEFAULT_VALUES,
		...valuesProp,
	};

	const isMixed: boolean =
		allowSides &&
		! ( values.top === values.right && values.top === values.bottom && values.top === values.left );

	const colors = useSelect( ( select ) => {
		const settings = select(
			***REMOVED***
			// @ts-ignore
		).getSettings();
		return get( settings, [ 'colors' ], [] );
	}, [] );

	const [ isLinked, setIsLinked ] = useState< boolean >( true );
	const [ isPickerOpen, ***REMOVED*** ] = useState< boolean >( false );
	const [ pickerIndex, ***REMOVED*** ] = useState< number | undefined >( undefined );

	const headingId: string = `${ id }-heading`;

	const linkedLabel: string = isLinked
		? __( 'Unlink sides', 'flexible-table-block' )
		: __( 'Link sides', 'flexible-table-block' );

	const allInputValue: string | 0 = isMixed ? '' : values.top;

	const classNames: string = classnames( 'ftb-border-color-control', className );

	const toggleLinked = () => setIsLinked( ! isLinked );

	const handleOnReset = () => {
		setIsLinked( true );
		onChange( DEFAULT_VALUES );
	};

	const ***REMOVED*** = ( inputValue: string ) => {
		onChange( {
			top: inputValue,
			right: inputValue,
			bottom: inputValue,
			left: inputValue,
		} );
	};

	const ***REMOVED*** = ( inputValue: string | undefined, targetSide: SideValue ) => {
		onChange( {
			...values,
			[ targetSide ]: inputValue,
		} );
	};

	const ***REMOVED*** = ( ***REMOVED***: number | undefined ) => {
		***REMOVED***( true );
		***REMOVED***( ***REMOVED*** );
	};

	const ***REMOVED*** = () => {
		***REMOVED***( false );
		***REMOVED***( undefined );
	};

	return (
		<BaseControl id={ id } className={ classNames } help={ help }>
			<div aria-labelledby={ headingId } role="region">
				<div className="ftb-border-color-control__header">
					<Text id={ headingId }>{ label }</Text>
					<Button isSmall variant="secondary" onClick={ handleOnReset }>
						{ __( 'Reset', 'flexible-table-block' ) }
					</Button>
				</div>
				<div className="ftb-border-color-control__controls">
					<div className="ftb-border-color-control__controls-inner">
						{ ( isLinked || ! allowSides ) && (
							<div className="ftb-border-color-control__controls-row">
								{ hasIndicator && <***REMOVED*** /> }
								<Button
									label={ __( 'All', 'flexible-table-block' ) }
									className={ classnames( 'ftb-border-color-control__indicator', {
										'ftb-border-color-control__indicator--none': ! allInputValue && ! isMixed,
										'ftb-border-color-control__indicator--mixed': isMixed,
										'ftb-border-color-control__indicator--transparent':
											allInputValue === 'transparent',
									} ) }
									onClick={ () => ***REMOVED***( undefined ) }
								>
									{ isMixed ? (
										__( 'Mixed', 'flexible-table-block' )
									) : (
										<***REMOVED*** colorValue={ allInputValue || '' } />
									) }
								</Button>
								{ isPickerOpen && ! pickerIndex && (
									<Popover
										className="ftb-border-color-control__popover"
										position="top right"
										onClose={ ***REMOVED*** }
									>
										<ColorPalette
											colors={ colors }
											value={ allInputValue || '' }
											onChange={ ***REMOVED*** }
										/>
									</Popover>
								) }
							</div>
						) }
						{ ! isLinked &&
							allowSides &&
							SIDE_CONTROLS.map( ( item, index ) => (
								<div className="ftb-border-color-control__controls-row" key={ index }>
									{ hasIndicator && <***REMOVED*** sides={ [ item.value ] } /> }
									<Button
										label={ item.label }
										className={ classnames( 'ftb-border-color-control__indicator', {
											'ftb-border-color-control__indicator--none': ! values[ item.value ],
											'ftb-border-color-control__indicator--transparent':
												values[ item.value ] === 'transparent',
										} ) }
										onClick={ () => ***REMOVED***( index ) }
									>
										<***REMOVED*** colorValue={ values[ item.value ] || '' } />
									</Button>
									{ isPickerOpen && pickerIndex === index && (
										<Popover
											className="ftb-border-color-control__popover"
											position="top right"
											onClose={ ***REMOVED*** }
										>
											<ColorPalette
												colors={ colors }
												value={ values[ item.value ] || '' }
												onChange={ ( value ) => ***REMOVED***( value, item.value ) }
											/>
										</Popover>
									) }
								</div>
							) ) }
					</div>
					{ allowSides && (
						<Tooltip text={ linkedLabel }>
							<span>
								<Button
									className="ftb-border-color-control__header-linked-button"
									label={ linkedLabel }
									isSmall
									onClick={ toggleLinked }
									icon={ isLinked ? link : linkOff }
								/>
							</span>
						</Tooltip>
					) }
				</div>
			</div>
		</BaseControl>
	);
}
