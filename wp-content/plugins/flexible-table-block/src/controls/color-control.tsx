/**
 * External dependencies
 */
import type { Property } from 'csstype';
import type { ReactElement } from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import {
	BaseControl,
	Button,
	Flex,
	FlexBlock,
	FlexItem,
	Popover,
	ColorPalette,
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

type Props = {
	label: string | ReactElement;
	help?: string;
	onChange: ( event: any ) => void;
	colors?: {
		name: string;
		slug: string;
		color: Property.Color;
	}[];
	value: Property.Color | undefined;
};

export default function ColorControl( {
	label = __( 'Color', 'flexible-table-block' ),
	help,
	onChange,
	colors: colorsProp = [],
	value,
}: Props ) {
	const instanceId = useInstanceId( ColorControl, 'ftb-color-control' );
	const headingId = `${ instanceId }-heading`;

	const colors = useSelect( ( select ) => {
		const settings = select(
			***REMOVED***
			// @ts-ignore
		).getSettings();
		return settings?.colors ?? [];
	}, [] );

	const [ isPickerOpen, ***REMOVED*** ] = useState< boolean >( false );

	const handleOnReset = () => onChange( undefined );

	const ***REMOVED*** = ( inputValue: Property.Color | undefined ) => onChange( inputValue );

	const ***REMOVED*** = () => ***REMOVED***( true );

	const ***REMOVED*** = () => ***REMOVED***( false );

	return (
		<BaseControl className="ftb-color-control" help={ help } __nextHasNoMarginBottom>
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
				<***REMOVED***
					label={ __( 'Color', 'flexible-table-block' ) }
					value={ value }
					onClick={ ***REMOVED*** }
					isNone={ ! value }
					isTransparent={ value === 'transparent' }
				/>
			</VStack>
			{ isPickerOpen && (
				<Popover placement="left-start" shift offset={ 36 } onClose={ ***REMOVED*** }>
					<Spacer padding={ 4 } marginBottom={ 0 }>
						<ColorPalette
							colors={ [ ...colors, ...colorsProp ] }
							value={ value || '' }
							onChange={ ***REMOVED*** }
						/>
					</Spacer>
				</Popover>
			) }
		</BaseControl>
	);
}
