import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { code } from '@wordpress/icons';
import { dispatch } from '@wordpress/data';
import {
	useShortcut,
	store as keyboardShortcutsStore,
} from '@wordpress/keyboard-shortcuts';
import classnames from 'classnames';
import ClassTokenField from './components/ClassTokenField';

const ATTRIBUTE_NAME = 'twgClasses';
const SHORTCUT_NAME = 'twg/toggle-panel';

dispatch( keyboardShortcutsStore ).registerShortcut( {
	name: SHORTCUT_NAME,
	category: 'block',
	description: __(
		'Toggle the Tailwind Classes panel',
		'tailwind-gutenberg'
	),
	keyCombination: { modifier: 'primaryShift', character: 't' },
} );

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

// core/edit-post's sidebar action moved to core/editor across WP versions;
// try both rather than depending on either package being the one running.
function openBlockSidebar() {
	for ( const store of [ 'core/edit-post', 'core/editor' ] ) {
		const actions = dispatch( store );

		if ( typeof actions?.openGeneralSidebar === 'function' ) {
			actions.openGeneralSidebar( 'edit-post/block' );
			return;
		}
	}
}

const withTwgInspectorControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, setAttributes, isSelected } = props;
		const [ isPanelOpen, setIsPanelOpen ] = useState( false );

		useShortcut( SHORTCUT_NAME, ( event ) => {
			if ( ! isSelected ) {
				return;
			}

			event.preventDefault();
			openBlockSidebar();
			setIsPanelOpen( true );
		} );

		if ( ! ( ATTRIBUTE_NAME in attributes ) ) {
			return <BlockEdit { ...props } />;
		}

		const existingClassName = attributes.className || '';

		return (
			<Fragment>
				{ isSelected && (
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								icon={ code }
								label={ __(
									'Tailwind Classes',
									'tailwind-gutenberg'
								) }
								onClick={ () => {
									openBlockSidebar();
									setIsPanelOpen( true );
								} }
							/>
						</ToolbarGroup>
					</BlockControls>
				) }
				<BlockEdit { ...props } />
				{ isSelected && (
					<InspectorControls>
						<PanelBody
							title={ __(
								'Tailwind Classes',
								'tailwind-gutenberg'
							) }
							opened={ isPanelOpen }
							onToggle={ setIsPanelOpen }
						>
							{ existingClassName && (
								<p className="twg-existing-classes-note">
									{ __(
										'Already has classes from "Additional CSS Class(es)", managed separately:',
										'tailwind-gutenberg'
									) }{ ' ' }
									<code>{ existingClassName }</code>
								</p>
							) }
							<ClassTokenField
								value={ attributes[ ATTRIBUTE_NAME ] || '' }
								onChange={ ( value ) =>
									setAttributes( {
										[ ATTRIBUTE_NAME ]: value,
									} )
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

// Mirrors applyTwgExtraProps, but for the live editing canvas: getSaveContent
// only affects the serialized save() markup, not the DOM the block renders
// while being edited, so the canvas-side Tailwind compiler would never see
// these classes without also applying them here.
const withTwgListBlockClass = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			const classes =
				props.attributes && props.attributes[ ATTRIBUTE_NAME ];

			if ( ! classes ) {
				return <BlockListBlock { ...props } />;
			}

			return (
				<BlockListBlock
					{ ...props }
					className={ classnames( props.className, classes ) }
				/>
			);
		};
	},
	'withTwgListBlockClass'
);

addFilter( 'blocks.registerBlockType', 'twg/attributes', addTwgAttribute );
addFilter( 'editor.BlockEdit', 'twg/inspector', withTwgInspectorControl );
addFilter(
	'blocks.getSaveContent.extraProps',
	'twg/extra-props',
	applyTwgExtraProps
);
addFilter(
	'editor.BlockListBlock',
	'twg/list-block-class',
	withTwgListBlockClass
);
