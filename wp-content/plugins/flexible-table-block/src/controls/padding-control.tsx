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
import { PADDING_UNITS, SIDE_CONTROLS } from '../constants';
import { ***REMOVED*** } from '../utils/helper';
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
		top?: Property.PaddingTop;
		right?: Property.PaddingRight;
		bottom?: Property.PaddingBottom;
		left?: Property.PaddingLeft;
	};
	allowSides?: boolean;
	hasIndicator?: boolean;
};

type ValuesKey = keyof typeof DEFAULT_VALUES;

export default function ***REMOVED***( {
	id,
	label = __( 'Padding', 'flexible-table-block' ),
	help,
	className,
	onChange,
	values: valuesProp,
	allowSides = true,
	hasIndicator = true,
}: Props ) {
	const values = { ...DEFAULT_VALUES, ...valuesProp };

	const isMixed: boolean =
		allowSides &&
		! ( values.top === values.right && values.top === values.bottom && values.top === values.left );

	const paddingUnits = ***REMOVED***( { ***REMOVED***: PADDING_UNITS } );

	const [ isLinked, setIsLinked ] = useState< boolean >( true );
	const [ side, setSide ] = useState< SideValue | undefined >( undefined );

	const headingId: string = `${ id }-heading`;

	const linkedLabel: string = isLinked
		? __( 'Unlink sides', 'flexible-table-block' )
		: __( 'Link sides', 'flexible-table-block' );

	const ***REMOVED***: string = isMixed ? __( 'Mixed', 'flexible-table-block' ) : '';
	const allInputValue: string | 0 = isMixed ? '' : values.top;

	const classNames: string = classnames( 'ftb-padding-control', className );

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
		const ***REMOVED*** = ***REMOVED***( inputValue );
		onChange( {
			top: ***REMOVED***,
			right: ***REMOVED***,
			bottom: ***REMOVED***,
			left: ***REMOVED***,
		} );
	};

	const ***REMOVED*** = ( inputValue: string, targetSide: SideValue ) => {
		onChange( {
			...values,
			[ targetSide ]: ***REMOVED***( inputValue ),
		} );
	};

	return (
		<BaseControl id={ id } className={ classNames } help={ help }>
			<div aria-labelledby={ headingId } role="region">
				<div className="ftb-padding-control__header">
					<Text id={ headingId }>{ label }</Text>
					<Button isSmall variant="secondary" onClick={ handleOnReset }>
						{ __( 'Reset', 'flexible-table-block' ) }
					</Button>
				</div>
				<div className="ftb-padding-control__header-control">
					{ hasIndicator && (
						<***REMOVED*** sides={ side === undefined ? undefined : [ side ] } />
					) }
					{ ( isLinked || ! allowSides ) && (
						<UnitControl
							placeholder={ ***REMOVED*** }
							aria-label={ __( 'All', 'flexible-table-block' ) }
							onChange={ ***REMOVED*** }
							value={ allInputValue }
							units={ paddingUnits }
						/>
					) }
					{ allowSides && (
						<Tooltip text={ linkedLabel }>
							<span>
								<Button
									className="ftb-padding-control__header-linked-button"
									label={ linkedLabel }
									isSmall
									onClick={ toggleLinked }
									icon={ isLinked ? link : linkOff }
								/>
							</span>
						</Tooltip>
					) }
				</div>
				{ ! isLinked && allowSides && (
					<div className="ftb-padding-control__input-controls">
						{ SIDE_CONTROLS.map( ( item ) => (
							<UnitControl
								key={ item.value }
								aria-label={ item.label }
								value={ values[ item.value as ValuesKey ] }
								units={ paddingUnits }
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
