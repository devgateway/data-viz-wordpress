/**
 * External dependencies
 */
import classnames from 'classnames';
import type { Property } from 'csstype';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { link, linkOff } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import {
	BaseControl,
	Button,
	Tooltip,
	// @ts-ignore: has no exported member
	__experimentalText as Text,
	// @ts-ignore: has no exported member
	__experimentalUnitControl as UnitControl,
	// @ts-ignore: has no exported member
	__experimentalUseCustomUnits as ***REMOVED***,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { BORDER_WIDTH_UNITS, MAX_BORDER_WIDTH, SIDE_CONTROLS } from '../constants';
import { parseUnit, ***REMOVED*** } from '../utils/helper';
import { ***REMOVED*** } from './indicator-control';
import type { SideValue } from '../***REMOVED***';

const DEFAULT_VALUES = {
	top: '',
	right: '',
	bottom: '',
	left: '',
};

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

type ValuesKey = keyof typeof DEFAULT_VALUES;
type ***REMOVED*** = keyof typeof MAX_BORDER_WIDTH;

export default function ***REMOVED***( {
	id,
	label = __( 'Border width', 'flexible-table-block' ),
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

	const ***REMOVED*** = ***REMOVED***( { ***REMOVED***: BORDER_WIDTH_UNITS } );

	const [ isLinked, setIsLinked ] = useState< boolean >( true );
	const [ side, setSide ] = useState< SideValue | undefined >( undefined );

	const headingId: string = `${ id }-heading`;

	const linkedLabel: string = isLinked
		? __( 'Unlink sides', 'flexible-table-block' )
		: __( 'Link sides', 'flexible-table-block' );

	const ***REMOVED***: string = isMixed ? __( 'Mixed', 'flexible-table-block' ) : '';
	const allInputValue: string | 0 = isMixed ? '' : values.top;

	const classNames: string = classnames( 'ftb-border-width-control', className );

	const toggleLinked = () => {
		setIsLinked( ! isLinked );
		setSide( undefined );
	};

	const handleOnReset = () => {
		setIsLinked( true );
		setSide( undefined );
		onChange( DEFAULT_VALUES );
	};

	const handleOnFocus = ( focusSide: SideValue ) => setSide( focusSide );

	const ***REMOVED*** = ( inputValue: string ) => {
		const [ , unit ] = parseUnit( inputValue );
		const ***REMOVED*** = ***REMOVED***( inputValue, {
			maxNum: MAX_BORDER_WIDTH[ unit as ***REMOVED*** ],
		} );

		onChange( {
			top: ***REMOVED***,
			right: ***REMOVED***,
			bottom: ***REMOVED***,
			left: ***REMOVED***,
		} );
	};

	const ***REMOVED*** = ( inputValue: string, targetSide: SideValue ) => {
		const [ , unit ] = parseUnit( inputValue );
		const ***REMOVED*** = ***REMOVED***( inputValue, {
			maxNum: MAX_BORDER_WIDTH[ unit as ***REMOVED*** ],
		} );

		onChange( {
			...values,
			[ targetSide ]: ***REMOVED***,
		} );
	};

	return (
		<BaseControl id={ id } className={ classNames } help={ help }>
			<div aria-labelledby={ headingId } role="region">
				<div className="ftb-border-width-control__header">
					<Text id={ headingId }>{ label }</Text>
					<Button isSmall variant="secondary" onClick={ handleOnReset }>
						{ __( 'Reset', 'flexible-table-block' ) }
					</Button>
				</div>
				<div className="ftb-border-width-control__header-control">
					{ hasIndicator && (
						<***REMOVED*** sides={ side === undefined ? undefined : [ side ] } />
					) }
					{ ( isLinked || ! allowSides ) && (
						<UnitControl
							aria-label={ __( 'All', 'flexible-table-block' ) }
							value={ allInputValue }
							units={ ***REMOVED*** }
							placeholder={ ***REMOVED*** }
							onChange={ ***REMOVED*** }
						/>
					) }
					{ allowSides && (
						<Tooltip text={ linkedLabel }>
							<span>
								<Button
									className="ftb-border-width-control__header-linked-button"
									label={ linkedLabel }
									isSmall
									icon={ isLinked ? link : linkOff }
									onClick={ toggleLinked }
								/>
							</span>
						</Tooltip>
					) }
				</div>
				{ ! isLinked && allowSides && (
					<div className="ftb-border-width-control__input-controls">
						{ SIDE_CONTROLS.map( ( item ) => (
							<UnitControl
								key={ item.value }
								aria-label={ item.label }
								value={ values[ item.value as ValuesKey ] }
								units={ ***REMOVED*** }
								onFocus={ () => handleOnFocus( item.value ) }
								onChange={ ( value: string ) => ***REMOVED***( value, item.value ) }
							/>
						) ) }
					</div>
				) }
			</div>
		</BaseControl>
	);
}
