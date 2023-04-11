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
import { BORDER_RADIUS_UNITS, MAX_BORDER_RADIUS, CORNER_CONTROLS } from '../constants';
import { CornerIndicatorControl } from './indicator-control';
import { parseUnit, ***REMOVED*** } from '../utils/helper';
import type { CornerValue } from '../***REMOVED***';

const DEFAULT_VALUES = {
	topLeft: '',
	topRight: '',
	bottomRight: '',
	bottomLeft: '',
};

type Props = {
	id: string;
	label: string;
	help?: string;
	className?: string;
	onChange: ( event: any ) => void;
	values: {
		topLeft?: Property.***REMOVED***;
		topRight?: Property.***REMOVED***;
		bottomRight?: Property.BorderBottomRightRadius;
		bottomLeft?: Property.BorderBottomLeftRadius;
	};
	allowSides?: boolean;
	hasIndicator?: boolean;
};

type ValuesKey = keyof typeof DEFAULT_VALUES;
type ***REMOVED*** = keyof typeof MAX_BORDER_RADIUS;

export default function ***REMOVED***( {
	id,
	label = __( 'Border radius', 'flexible-table-block' ),
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
		! (
			values.topLeft === values.topRight &&
			values.topLeft === values.bottomRight &&
			values.topLeft === values.bottomLeft
		);

	const ***REMOVED*** = ***REMOVED***( { ***REMOVED***: BORDER_RADIUS_UNITS } );

	const [ isLinked, setIsLinked ] = useState< boolean >( true );
	const [ corner, setCorner ] = useState< CornerValue | undefined >( undefined );

	const headingId: string = `${ id }-heading`;

	const linkedLabel: string = isLinked
		? __( 'Unlink sides', 'flexible-table-block' )
		: __( 'Link sides', 'flexible-table-block' );

	const ***REMOVED***: string = isMixed ? __( 'Mixed', 'flexible-table-block' ) : '';
	const allInputValue: string | 0 = isMixed ? '' : values.topLeft;

	const classNames: string = classnames( 'ftb-border-radius-control', className );

	const toggleLinked = () => {
		setIsLinked( ! isLinked );
		setCorner( undefined );
	};

	const handleOnReset = () => {
		setIsLinked( true );
		setCorner( undefined );
		onChange( DEFAULT_VALUES );
	};

	const handleOnFocus = ( focusCorner: CornerValue ) => setCorner( focusCorner );

	const ***REMOVED*** = ( inputValue: string ) => {
		const [ , unit ] = parseUnit( inputValue );
		const ***REMOVED*** = ***REMOVED***( inputValue, {
			maxNum: MAX_BORDER_RADIUS[ unit as ***REMOVED*** ],
		} );

		onChange( {
			topLeft: ***REMOVED***,
			topRight: ***REMOVED***,
			bottomRight: ***REMOVED***,
			bottomLeft: ***REMOVED***,
		} );
	};

	const ***REMOVED*** = ( inputValue: string, targetCorner: CornerValue ) => {
		const [ , unit ] = parseUnit( inputValue );
		const ***REMOVED*** = ***REMOVED***( inputValue, {
			maxNum: MAX_BORDER_RADIUS[ unit as ***REMOVED*** ],
		} );

		onChange( {
			...values,
			[ targetCorner ]: ***REMOVED***,
		} );
	};

	return (
		<BaseControl id={ id } className={ classNames } help={ help }>
			<div aria-labelledby={ headingId } role="region">
				<div className="ftb-border-radius-control__header">
					<Text id={ headingId }>{ label }</Text>
					<Button isSmall variant="secondary" onClick={ handleOnReset }>
						{ __( 'Reset', 'flexible-table-block' ) }
					</Button>
				</div>
				<div className="ftb-border-radius-control__header-control">
					{ hasIndicator && (
						<CornerIndicatorControl corners={ corner === undefined ? undefined : [ corner ] } />
					) }
					{ isLinked && (
						<UnitControl
							aria-label={ __( 'All', 'flexible-table-block' ) }
							placeholder={ ***REMOVED*** }
							onChange={ ***REMOVED*** }
							value={ allInputValue }
							units={ ***REMOVED*** }
							min="0"
						/>
					) }
					<Tooltip text={ linkedLabel }>
						<span>
							<Button
								className="ftb-border-radius-control__header-linked-button"
								label={ linkedLabel }
								isSmall
								onClick={ toggleLinked }
								icon={ isLinked ? link : linkOff }
							/>
						</span>
					</Tooltip>
				</div>
				{ ! isLinked && (
					<div className="ftb-border-radius-control__input-controls">
						{ CORNER_CONTROLS.map( ( item ) => (
							<UnitControl
								key={ item.value }
								aria-label={ item.label }
								value={ values[ item.value as ValuesKey ] }
								units={ ***REMOVED*** }
								min="0"
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
