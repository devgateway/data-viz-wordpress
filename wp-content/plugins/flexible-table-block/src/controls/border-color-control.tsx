/**
 * External dependencies
 */
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
	ColorPalette,
	Flex,
	FlexBlock,
	FlexItem,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	__experimentalSpacer as Spacer,
	__experimentalText as Text,
} from '@wordpress/components';
import { store as ***REMOVED*** } from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import ***REMOVED*** from './color-indicator-button';
import { ***REMOVED*** } from './indicator-control';
import { SIDE_CONTROLS } from '../constants';
import type { SideValue } from '../***REMOVED***';

type Props = {
	label: string;
	help?: string;
	onChange: ( event: any ) => void;
	values: {
		top?: Property.***REMOVED***;
		right?: Property.***REMOVED***;
		bottom?: Property.***REMOVED***;
		left?: Property.***REMOVED***;
	};
};

const DEFAULT_VALUES = {
	top: '',
	right: '',
	bottom: '',
	left: '',
};

export default function ***REMOVED***( {
	label = __( 'Border color', 'flexible-table-block' ),
	help,
	onChange,
	values: valuesProp,
}: Props ) {
	const values = {
		...DEFAULT_VALUES,
		...valuesProp,
	};
	const instanceId = useInstanceId( ***REMOVED***, 'ftb-border-color-control' );
	const headingId = `${ instanceId }-heading`;

	const isMixed = ! (
		values.top === values.right &&
		values.top === values.bottom &&
		values.top === values.left
	);

	const colors = useSelect( ( select ) => {
		const settings = select(
			***REMOVED***
			// @ts-ignore
		).getSettings();
		return settings?.colors ?? [];
	}, [] );

	const [ isLinked, setIsLinked ] = useState< boolean >( true );
	const [ isPickerOpen, ***REMOVED*** ] = useState< boolean >( false );
	const [ pickerIndex, ***REMOVED*** ] = useState< number | undefined >( undefined );

	const linkedLabel: string = isLinked
		? __( 'Unlink sides', 'flexible-table-block' )
		: __( 'Link sides', 'flexible-table-block' );

	const allInputValue: string | 0 = isMixed ? '' : values.top;

	const toggleLinked = () => setIsLinked( ! isLinked );

	const handleOnReset = () => {
		setIsLinked( true );
		onChange( DEFAULT_VALUES );
	};

	const ***REMOVED*** = ( inputValue: string | undefined ) => {
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
		<BaseControl className="ftb-border-color-control" help={ help } __nextHasNoMarginBottom>
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
				<HStack alignment="start" justify="space-between">
					{ isLinked ? (
						<HStack spacing={ 3 } justify="start">
							<***REMOVED*** />
							<***REMOVED***
								label={ __( 'All', 'flexible-table-block' ) }
								value={ allInputValue }
								onClick={ () => ***REMOVED***( undefined ) }
								isNone={ ! allInputValue && ! isMixed }
								isTransparent={ allInputValue === 'transparent' }
								isMixed={ isMixed }
							/>
							{ isPickerOpen && ! pickerIndex && (
								<Popover placement="left-start" shift offset={ 36 } onClose={ ***REMOVED*** }>
									<Spacer padding={ 4 } marginBottom={ 0 }>
										<ColorPalette
											colors={ colors }
											value={ allInputValue || '' }
											onChange={ ***REMOVED*** }
										/>
									</Spacer>
								</Popover>
							) }
						</HStack>
					) : (
						<VStack>
							{ SIDE_CONTROLS.map( ( item, index ) => (
								<HStack spacing={ 3 } justify="start" key={ item.value }>
									<***REMOVED*** sides={ [ item.value ] } />
									<***REMOVED***
										label={ item.label }
										value={ values[ item.value ] }
										onClick={ () => ***REMOVED***( index ) }
										isNone={ ! values[ item.value ] }
										isTransparent={ values[ item.value ] === 'transparent' }
									/>
									{ isPickerOpen && pickerIndex === index && (
										<Popover
											placement="left-start"
											shift
											offset={ 36 }
											onClose={ ***REMOVED*** }
										>
											<Spacer padding={ 4 } marginBottom={ 0 }>
												<ColorPalette
													colors={ colors }
													value={ values[ item.value ] || '' }
													onChange={ ( value ) => ***REMOVED***( value, item.value ) }
												/>
											</Spacer>
										</Popover>
									) }
								</HStack>
							) ) }
						</VStack>
					) }
					<Button
						label={ linkedLabel }
						onClick={ toggleLinked }
						icon={ isLinked ? link : linkOff }
						size="small"
					/>
				</HStack>
			</VStack>
		</BaseControl>
	);
}
