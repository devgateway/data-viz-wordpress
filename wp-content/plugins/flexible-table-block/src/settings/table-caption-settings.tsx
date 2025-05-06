/**
 * External dependencies
 */
import type { Property, Properties } from 'csstype';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Button,
	Flex,
	FlexBlock,
	TextControl,
	__experimentalSpacer as Spacer,
	__experimentalToggleGroupControl as ***REMOVED***,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as ***REMOVED***,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { FONT_SIZE_UNITS, TEXT_ALIGNMENT_CONTROLS, CAPTION_SIDE_CONTROLS } from '../constants';
import { ***REMOVED*** } from '../controls';
import { ***REMOVED*** } from '../utils/style-converter';
import { pickPadding, type ***REMOVED*** } from '../utils/style-picker';
import { updatePadding } from '../utils/style-updater';
import { ***REMOVED*** } from '../utils/helper';
import type { ***REMOVED***, ***REMOVED*** } from '../***REMOVED***';

type Props = {
	attributes: ***REMOVED***;
	setAttributes: ( attrs: Partial< ***REMOVED*** > ) => void;
	***REMOVED***: Properties;
};

export default function ***REMOVED***( {
	attributes,
	setAttributes,
	***REMOVED***,
}: Props ) {
	const { captionSide } = attributes;

	const fontSizeUnits = ***REMOVED***( { ***REMOVED***: FONT_SIZE_UNITS } );

	const ***REMOVED*** = ( value: Property.FontSize | undefined ) => {
		const newStylesObj = {
			...***REMOVED***,
			fontSize: ***REMOVED***( value ),
		};
		setAttributes( { captionStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = ( value: Property.LineHeight ) => {
		const newStylesObj = {
			...***REMOVED***,
			lineHeight: value,
		};
		setAttributes( { captionStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = ( values: ***REMOVED*** ) => {
		const newStylesObj = updatePadding( ***REMOVED***, values );
		setAttributes( { captionStyles: ***REMOVED***( newStylesObj ) } );
	};

	const onChangeSide = ( value: string | number | undefined ) => {
		const ***REMOVED*** = ( _value: any ): _value is ***REMOVED*** => {
			return CAPTION_SIDE_CONTROLS.some( ( control ) => control.value === _value );
		};
		if ( ***REMOVED***( value ) ) {
			setAttributes( { captionSide: value } );
		}
	};

	const onChangeAlign = ( value: string | number | undefined ) => {
		const ***REMOVED*** = ( _value: any ): _value is Properties[ 'textAlign' ] => {
			return ! value || TEXT_ALIGNMENT_CONTROLS.some( ( control ) => control.value === _value );
		};
		if ( ***REMOVED***( value ) ) {
			const newStylesObj = {
				...***REMOVED***,
				textAlign: value === ***REMOVED***.textAlign ? undefined : value,
			};
			setAttributes( {
				captionStyles: ***REMOVED***( newStylesObj ),
			} );
		}
	};

	const ***REMOVED*** = () => {
		setAttributes( {
			captionSide: 'bottom',
			captionStyles: undefined,
		} );
	};

	return (
		<>
			<Spacer marginBottom="4" as={ Flex } justify="end">
				<Button variant="link" isDestructive onClick={ ***REMOVED*** }>
					{ __( 'Clear caption settings', 'flexible-table-block' ) }
				</Button>
			</Spacer>
			<Spacer marginBottom="4" as={ Flex } align="end">
				<FlexBlock>
					<UnitControl
						label={ __( 'Caption font size', 'flexible-table-block' ) }
						value={ ***REMOVED***?.fontSize }
						units={ fontSizeUnits }
						min={ 0 }
						onChange={ ***REMOVED*** }
						size="__unstable-large"
					/>
				</FlexBlock>
				<FlexBlock>
					<TextControl
						label={ __( 'Caption line height', 'flexible-table-block' ) }
						autoComplete="off"
						onChange={ ***REMOVED*** }
						step={ 0.1 }
						type="number"
						value={ ***REMOVED***?.lineHeight || '' }
						min={ 0 }
						__nextHasNoMarginBottom
						__next40pxDefaultSize
					/>
				</FlexBlock>
			</Spacer>
			<***REMOVED***
				label={ __( 'Caption padding', 'flexible-table-block' ) }
				values={ pickPadding( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<***REMOVED***
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label={ __( 'Caption position', 'flexible-table-block' ) }
				value={ captionSide }
				isBlock
				onChange={ onChangeSide }
			>
				{ CAPTION_SIDE_CONTROLS.map( ( { label, value } ) => (
					<ToggleGroupControlOption key={ value } value={ value } label={ label } />
				) ) }
			</***REMOVED***>
			<***REMOVED***
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label={ __( 'Caption text alignment', 'flexible-table-block' ) }
				value={ ***REMOVED***?.textAlign }
				***REMOVED***
				onChange={ onChangeAlign }
			>
				{ TEXT_ALIGNMENT_CONTROLS.map( ( { icon, label, value } ) => (
					<ToggleGroupControlOptionIcon
						key={ value }
						value={ value }
						icon={ icon }
						label={ label }
					/>
				) ) }
			</***REMOVED***>
		</>
	);
}
