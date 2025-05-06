/**
 * External dependencies
 */
import type { Properties } from 'csstype';
import type { Dispatch, ***REMOVED*** } from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, RichText } from '@wordpress/block-editor';
import { createBlock, type BlockInstance } from '@wordpress/blocks';
import { ToolbarButton } from '@wordpress/components';
import { caption as captionIcon } from '@wordpress/icons';
import { useState, useEffect, useCallback } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';

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
	isSelected?: boolean;
};

export default function TableCaption( {
	attributes,
	setAttributes,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	isSelected,
}: Props ) {
	const { caption = '' } = attributes;
	const prevCaption = usePrevious( caption );
	const ***REMOVED*** = RichText.isEmpty( caption );
	const ***REMOVED*** = RichText.isEmpty( prevCaption || '' );
	const [ showCaption, ***REMOVED*** ] = useState( ! ***REMOVED*** );

	const onChange = ( value: string | undefined ) => setAttributes( { caption: value } );

	useEffect( () => {
		if ( ! ***REMOVED*** && ***REMOVED*** ) {
			***REMOVED***( true );
		}
	}, [ ***REMOVED***, ***REMOVED*** ] );

	useEffect( () => {
		if ( ! isSelected && ***REMOVED*** ) {
			***REMOVED***( false );
		}
	}, [ isSelected, ***REMOVED*** ] );

	const ref = useCallback(
		( node: any ) => {
			if ( node && ***REMOVED*** ) {
				node?.focus();
			}
		},
		[ ***REMOVED*** ]
	);

	return (
		<>
			{ isSelected && (
				<BlockControls group="block">
					<ToolbarButton
						onClick={ () => {
							***REMOVED***( ! showCaption );
							if ( showCaption && caption ) {
								onChange( undefined );
							}
						} }
						icon={ captionIcon }
						isPressed={ showCaption }
						label={
							showCaption
								? __( 'Remove caption', 'flexible-table-block' )
								: __( 'Add caption', 'flexible-table-block' )
						}
					/>
				</BlockControls>
			) }
			{ showCaption && ( ! RichText.isEmpty( caption ) || isSelected ) && (
				<RichText
					aria-label={ __( 'Table caption text', 'flexible-table-block' ) }
					placeholder={ __( 'Add caption', 'flexible-table-block' ) }
					tagName="figcaption"
					style={ ***REMOVED*** }
					value={ caption }
					ref={ ref }
					onChange={ onChange }
					onFocus={ () => {
						***REMOVED***( undefined );
						***REMOVED***( undefined );
					} }
					// @ts-ignore: `__unstableOnSplitAtEnd` prop is not exist at @types
					__unstableOnSplitAtEnd={ () => ***REMOVED***( createBlock( 'core/paragraph' ) ) }
				/>
			) }
		</>
	);
}
