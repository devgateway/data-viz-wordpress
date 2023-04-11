/**
 * External dependencies
 */
import classnames from 'classnames';

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
import { BORDER_SPACING_UNITS, MAX_BORDER_SPACING, DIRECTION_CONTROLS } from '../constants';
import { DirectionIndicatorControl } from './indicator-control';
import { parseUnit, ***REMOVED*** } from '../utils/helper';
import type { ***REMOVED*** } from '../***REMOVED***';

const DEFAULT_VALUES = {
	horizontal: '',
	vertical: '',
};

type Props = {
	id: string;
	label: string;
	help?: string;
	className?: string;
	onChange: ( event: any ) => void;
	values: typeof DEFAULT_VALUES;
	allowSides?: boolean;
	hasIndicator?: boolean;
};

type ValuesKey = keyof typeof DEFAULT_VALUES;
type ***REMOVED*** = keyof typeof MAX_BORDER_SPACING;

export default function ***REMOVED***( {
	id,
	label = __( 'Border spacing', 'flexible-table-block' ),
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

	const isMixed: boolean = allowSides && ! ( values.horizontal === values.vertical );

	const ***REMOVED*** = ***REMOVED***( { ***REMOVED***: BORDER_SPACING_UNITS } );

	const [ isLinked, setIsLinked ] = useState< boolean >( true );
	const [ direction, setDirection ] = useState< ***REMOVED*** | undefined >( undefined );

	const headingId: string = `${ id }-heading`;

	const linkedLabel: string = isLinked
		? __( 'Unlink directions', 'flexible-table-block' )
		: __( 'Link directions', 'flexible-table-block' );

	const ***REMOVED***: string = isMixed ? __( 'Mixed', 'flexible-table-block' ) : '';
	const allInputValue: string | 0 = isMixed ? '' : values.horizontal;

	const classNames: string = classnames( 'ftb-border-spacing-control', className );

	const toggleLinked = () => {
		setIsLinked( ! isLinked );
		setDirection( undefined );
	};

	const handleOnReset = () => {
		setIsLinked( true );
		setDirection( undefined );
		onChange( DEFAULT_VALUES );
	};

	const handleOnFocus = ( ***REMOVED***: ***REMOVED*** ) => setDirection( ***REMOVED*** );

	const ***REMOVED*** = ( inputValue: string ) => {
		const [ , unit ] = parseUnit( inputValue );
		const ***REMOVED*** = ***REMOVED***( inputValue, {
			maxNum: MAX_BORDER_SPACING[ unit as ***REMOVED*** ],
		} );

		onChange( {
			horizontal: ***REMOVED***,
			vertical: ***REMOVED***,
		} );
	};

	const ***REMOVED*** = ( inputValue: string, ***REMOVED***: ***REMOVED*** ) => {
		const [ , unit ] = parseUnit( inputValue );
		const ***REMOVED*** = ***REMOVED***( inputValue, {
			maxNum: MAX_BORDER_SPACING[ unit as ***REMOVED*** ],
		} );

		onChange( {
			...values,
			[ ***REMOVED*** ]: ***REMOVED***,
		} );
	};

	return (
		<BaseControl id={ id } className={ classNames } help={ help }>
			<div aria-labelledby={ headingId } role="region">
				<div className="ftb-border-spacing-control__header">
					<Text id={ headingId }>{ label }</Text>
					<Button isSmall variant="secondary" onClick={ handleOnReset }>
						{ __( 'Reset', 'flexible-table-block' ) }
					</Button>
				</div>
				<div className="ftb-border-spacing-control__header-control">
					{ hasIndicator && (
						<DirectionIndicatorControl
							directions={ direction === undefined ? undefined : [ direction ] }
						/>
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
									className="ftb-border-spacing-control__header-linked-button"
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
					<div className="ftb-border-spacing-control__input-controls">
						{ DIRECTION_CONTROLS.map( ( item ) => (
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
