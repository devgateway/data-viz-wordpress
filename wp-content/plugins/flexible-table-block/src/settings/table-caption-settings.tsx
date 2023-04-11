/**
 * External dependencies
 */
import type { Property, Properties } from 'csstype';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	Button,
	ButtonGroup,
	TextControl,
	// @ts-ignore: has no exported member
	__experimentalUnitControl as UnitControl,
	// @ts-ignore: has no exported member
	__experimentalUseCustomUnits as ***REMOVED***,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { FONT_SIZE_UNITS, TEXT_ALIGNMENT_CONTROLS, CAPTION_SIDE_CONTROLS } from '../constants';
import { ***REMOVED*** } from '../controls';
import { ***REMOVED*** } from '../utils/style-converter';
import { pickPadding } from '../utils/style-picker';
import { updatePadding } from '../utils/style-updater';
import { ***REMOVED*** } from '../utils/helper';
import type { ***REMOVED***, ***REMOVED***, ***REMOVED*** } from '../***REMOVED***';
import type { ***REMOVED*** } from '../utils/style-picker';

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

	const ***REMOVED*** = ( value: Property.FontSize ) => {
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

	const onChangeSide = ( value: ***REMOVED*** ) => {
		setAttributes( { captionSide: value } );
	};

	const onChangeAlign = ( value: ***REMOVED*** ) => {
		const newStylesObj = {
			...***REMOVED***,
			textAlign: value === ***REMOVED***.textAlign ? undefined : value,
		};
		setAttributes( { captionStyles: ***REMOVED***( newStylesObj ) } );
	};

	const ***REMOVED*** = () => {
		setAttributes( {
			captionSide: 'bottom',
			captionStyles: undefined,
		} );
	};

	return (
		<>
			<BaseControl
				id="flexible-table-block-caption-clear-settings"
				className="ftb-reset-settings-control"
			>
				<Button variant="link" isDestructive onClick={ ***REMOVED*** }>
					{ __( 'Clear caption settings', 'flexible-table-block' ) }
				</Button>
			</BaseControl>
			<BaseControl
				id="flexible-table-block-caption-font-size"
				label={ __( 'Caption font size', 'flexible-table-block' ) }
				className="ftb-font-size-control"
			>
				<UnitControl
					id="flexible-table-block-caption-font-size"
					value={ ***REMOVED***?.fontSize }
					units={ fontSizeUnits }
					min="0"
					onChange={ ***REMOVED*** }
				/>
			</BaseControl>
			<BaseControl
				id="flexible-table-block-caption-line-height"
				className="ftb-line-height-control"
			>
				<TextControl
					label={ __( 'Caption line height', 'flexible-table-block' ) }
					autoComplete="off"
					onChange={ ***REMOVED*** }
					step={ 0.1 }
					type="number"
					value={ ***REMOVED***?.lineHeight || '' }
					min={ 0 }
				/>
			</BaseControl>
			<***REMOVED***
				id="flexible-table-block-caption-padding"
				label={ __( 'Caption padding', 'flexible-table-block' ) }
				values={ pickPadding( ***REMOVED*** ) }
				onChange={ ***REMOVED*** }
			/>
			<BaseControl id="flexible-table-block-caption-side">
				<div aria-labelledby="flexible-table-block-caption-side-heading" role="region">
					<span id="flexible-table-block-caption-side-heading" className="ftb-base-control-label">
						{ __( 'Caption position', 'flexible-table-block' ) }
					</span>
					<ButtonGroup className="ftb-button-group">
						{ CAPTION_SIDE_CONTROLS.map( ( { label, value } ) => (
							<Button
								key={ value }
								label={ label }
								variant={ captionSide === value ? 'primary' : undefined }
								onClick={ () => onChangeSide( value ) }
							>
								{ label }
							</Button>
						) ) }
					</ButtonGroup>
				</div>
			</BaseControl>
			<BaseControl id="flexible-table-block-caption-align">
				<div aria-labelledby="flexible-table-block-caption-align-heading" role="region">
					<span id="flexible-table-block-caption-align-heading" className="ftb-base-control-label">
						{ __( 'Caption text alignment', 'flexible-table-block' ) }
					</span>
					<ButtonGroup className="ftb-button-group">
						{ TEXT_ALIGNMENT_CONTROLS.map( ( { icon, label, value } ) => {
							return (
								<Button
									key={ value }
									label={ label }
									variant={ value === ***REMOVED***?.textAlign ? 'primary' : 'secondary' }
									icon={ icon }
									onClick={ () => onChangeAlign( value ) }
								/>
							);
						} ) }
					</ButtonGroup>
				</div>
			</BaseControl>
		</>
	);
}
