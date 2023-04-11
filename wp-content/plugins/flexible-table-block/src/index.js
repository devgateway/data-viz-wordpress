/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ***REMOVED*** } from '@wordpress/blocks';
import { ***REMOVED*** } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import './store';
import './style.scss';
import metadata from './block.json';
import example from './example';
import { blockIcon as icon } from './icons';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import deprecated from './deprecated';
import { ***REMOVED*** } from './settings';

// Register block.
const config = {
	title: __( 'Flexible Table', 'flexible-table-block' ),
	category: 'text',
	description: __( 'Create flexible configuration table.', 'flexible-table-block' ),
	icon,
	example,
	transforms,
	edit,
	save,
	deprecated,
	styles: [
		{
			name: 'stripes',
			label: __( 'Stripes', 'flexible-table-block' ),
		},
	],
};
***REMOVED***( metadata.name, config );

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name } = props;

		if ( name !== 'flexible-table-block/table' ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<>
				<***REMOVED***>
					<***REMOVED*** />
				</***REMOVED***>
				<BlockEdit { ...props } />
			</>
		);
	};
}, '***REMOVED***' );

addFilter(
	'editor.BlockEdit',
	'flexible-table-block/withInspectorControls',
	withInspectorControls
);
