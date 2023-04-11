/**
 * External dependencies
 */
import type { Properties } from 'csstype';
import type { Dispatch, ***REMOVED*** } from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import type { BlockInstance } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import type { ***REMOVED*** } from '../***REMOVED***';
import type { ***REMOVED***, VSelectedLine } from '../utils/table-state';

type Props = {
	attributes: ***REMOVED***;
	setAttributes: ( attrs: Partial< ***REMOVED*** > ) => void;
	***REMOVED***: ( blocks: BlockInstance[] ) => void;
	***REMOVED***: Dispatch< ***REMOVED***< VSelectedLine > >;
	***REMOVED***: Dispatch< ***REMOVED***< ***REMOVED*** > >;
	***REMOVED***: Properties;
};

export default function TableCaption( {
	attributes,
	setAttributes,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
}: Props ) {
	const { caption } = attributes;

	const onChange = ( value: string ) => setAttributes( { caption: value } );

	return (
		<RichText
			aria-label={ __( 'Table caption text', 'flexible-table-block' ) }
			placeholder={ __( 'Add caption', 'flexible-table-block' ) }
			tagName="figcaption"
			style={ ***REMOVED*** }
			value={ caption }
			onChange={ onChange }
			// @ts-ignore: `***REMOVED***` prop is not exist at @types
			***REMOVED***={ () => {
				***REMOVED***( undefined );
				***REMOVED***( undefined );
			} }
			// @ts-ignore: `__unstableOnSplitAtEnd` prop is not exist at @types
			__unstableOnSplitAtEnd={ () => ***REMOVED***( createBlock( 'core/paragraph' ) ) }
		/>
	);
}
