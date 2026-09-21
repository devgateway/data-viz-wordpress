import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

const ATTRIBUTE_NAME = 'twgClasses';

function addTwgAttribute( settings ) {
	settings.attributes = {
		...settings.attributes,
		[ ATTRIBUTE_NAME ]: {
			type: 'string',
			default: '',
		},
	};

	return settings;
}

const withTwgInspectorControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, setAttributes, isSelected } = props;

		if ( ! ( ATTRIBUTE_NAME in attributes ) ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && (
					<InspectorControls>
						<PanelBody
							title={ __( 'Tailwind Classes', 'tailwind-gutenberg' ) }
							initialOpen={ false }
						>
							<TextControl
								label={ __( 'Classes', 'tailwind-gutenberg' ) }
								value={ attributes[ ATTRIBUTE_NAME ] || '' }
								onChange={ ( value ) =>
									setAttributes( { [ ATTRIBUTE_NAME ]: value } )
								}
							/>
						</PanelBody>
					</InspectorControls>
				) }
			</Fragment>
		);
	};
}, 'withTwgInspectorControl' );

function applyTwgExtraProps( extraProps, _blockType, attributes ) {
	const classes = attributes && attributes[ ATTRIBUTE_NAME ];

	if ( classes ) {
		extraProps.className = classnames( extraProps.className, classes );
	}

	return extraProps;
}

addFilter( 'blocks.registerBlockType', 'twg/attributes', addTwgAttribute );
addFilter( 'editor.BlockEdit', 'twg/inspector', withTwgInspectorControl );
addFilter( 'blocks.getSaveContent.extraProps', 'twg/extra-props', applyTwgExtraProps );
