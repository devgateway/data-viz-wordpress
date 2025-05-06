/**
 * External dependencies
 */
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
	Flex,
	FlexBlock,
	FlexItem,
	__experimentalGrid as Grid,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	__experimentalText as Text,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as ***REMOVED***,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

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
	label: string;
	help?: string;
	onChange: ( event: any ) => void;
	values: {
		topLeft?: Property.***REMOVED***;
		topRight?: Property.***REMOVED***;
		bottomRight?: Property.BorderBottomRightRadius;
		bottomLeft?: Property.BorderBottomLeftRadius;
	};
};

type ValuesKey = keyof typeof DEFAULT_VALUES;
type ***REMOVED*** = keyof typeof MAX_BORDER_RADIUS;

export default function ***REMOVED***( {
	label = __( 'Border radius', 'flexible-table-block' ),
	help,
	onChange,
	values: valuesProp,
}: Props ) {
	const values = {
		...DEFAULT_VALUES,
		...valuesProp,
	};
	const instanceId = useInstanceId( ***REMOVED***, 'ftb-border-radius-control' );
	const headingId = `${ instanceId }-heading`;

	const isMixed = ! (
		values.topLeft === values.topRight &&
		values.topLeft === values.bottomRight &&
		values.topLeft === values.bottomLeft
	);

	const ***REMOVED*** = ***REMOVED***( { ***REMOVED***: BORDER_RADIUS_UNITS } );

	const [ isLinked, setIsLinked ] = useState< boolean >( true );
	const [ corner, setCorner ] = useState< CornerValue | undefined >( undefined );

	const linkedLabel: string = isLinked
		? __( 'Unlink sides', 'flexible-table-block' )
		: __( 'Link sides', 'flexible-table-block' );

	const ***REMOVED***: string = isMixed ? __( 'Mixed', 'flexible-table-block' ) : '';
	const allInputValue: string | 0 = isMixed ? '' : values.topLeft;

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

	const ***REMOVED*** = ( inputValue: string | undefined ) => {
		if ( inputValue ) {
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
		} else {
			onChange( {
				topLeft: undefined,
				topRight: undefined,
				bottomRight: undefined,
				bottomLeft: undefined,
			} );
		}
	};

	const ***REMOVED*** = ( inputValue: string | undefined, targetCorner: CornerValue ) => {
		if ( inputValue ) {
			const [ , unit ] = parseUnit( inputValue );
			const ***REMOVED*** = ***REMOVED***( inputValue, {
				maxNum: MAX_BORDER_RADIUS[ unit as ***REMOVED*** ],
			} );

			onChange( {
				...values,
				[ targetCorner ]: ***REMOVED***,
			} );
		} else {
			onChange( {
				...values,
				[ targetCorner ]: undefined,
			} );
		}
	};

	return (
		<BaseControl className="ftb-border-radius-control" help={ help } __nextHasNoMarginBottom>
			<VStack aria-labelledby={ headingId } role="group">
				<Flex>
					<Text id={ headingId } upperCase size="11" weight="500" as={ FlexBlock }>
						{ label }
					</Text>
					<FlexItem>
						<Button variant="secondary" onClick={ handleOnReset } size="small">
							{ __( 'Reset', 'flexible-table-block' ) }
						</Button>
					</FlexItem>
				</Flex>
				<HStack alignment="center" justify="space-between" style={ { minHeight: '40px' } }>
					<HStack justify="start">
						<CornerIndicatorControl corners={ corner === undefined ? undefined : [ corner ] } />
						{ isLinked && (
							<div>
								<UnitControl
									***REMOVED***
									label={ __( 'All', 'flexible-table-block' ) }
									placeholder={ ***REMOVED*** }
									onChange={ ***REMOVED*** }
									value={ allInputValue }
									units={ ***REMOVED*** }
									min={ 0 }
									size="__unstable-large"
									__unstableInputWidth="100px"
								/>
							</div>
						) }
					</HStack>
					<Button
						label={ linkedLabel }
						onClick={ toggleLinked }
						icon={ isLinked ? link : linkOff }
						size="small"
					/>
				</HStack>
				{ ! isLinked && (
					<Grid gap={ 2 }>
						{ CORNER_CONTROLS.map( ( item ) => (
							<div key={ item.value }>
								<UnitControl
									aria-label={ item.label }
									value={ values[ item.value as ValuesKey ] }
									units={ ***REMOVED*** }
									min={ 0 }
									onFocus={ () => handleOnFocus( item.value ) }
									onChange={ ( value ) => ***REMOVED***( value, item.value ) }
									size="__unstable-large"
									style={ { marginBottom: 0 } }
								/>
							</div>
						) ) }
					</Grid>
				) }
			</VStack>
		</BaseControl>
	);
}
