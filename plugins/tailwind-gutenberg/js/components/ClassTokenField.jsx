import {
	FormTokenField,
	ToggleControl,
	TextareaControl,
} from '@wordpress/components';
import { useCallback, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

// One shared worker for every block's token field, created lazily on first
// use so the ~3,000-entry index is never fetched until someone actually
// needs autocomplete.
let worker = null;
let requestCounter = 0;
const pendingRequests = new Map();

function getWorker() {
	if ( worker || ! window.twgEditorData ) {
		return worker;
	}

	worker = new window.Worker( window.twgEditorData.workerUrl );
	worker.postMessage( {
		type: 'init',
		indexUrl: window.twgEditorData.classIndexUrl,
		maxResults: window.twgEditorData.suggestLimit,
	} );

	worker.addEventListener( 'message', ( event ) => {
		const { requestId, results } = event.data;
		const resolve = pendingRequests.get( requestId );

		if ( resolve ) {
			pendingRequests.delete( requestId );
			resolve( results );
		}
	} );

	return worker;
}

function queryWorker( query ) {
	const instance = getWorker();

	if ( ! instance ) {
		return Promise.resolve( [] );
	}

	const requestId = ++requestCounter;

	return new Promise( ( resolve ) => {
		pendingRequests.set( requestId, resolve );
		instance.postMessage( { type: 'query', query, requestId } );
	} );
}

export default function ClassTokenField( { value, onChange } ) {
	const [ suggestions, setSuggestions ] = useState( [] );
	const [ declaration, setDeclaration ] = useState( '' );
	const [ isRaw, setIsRaw ] = useState( false );
	const debounceRef = useRef();

	const tokens = value ? value.trim().split( /\s+/ ).filter( Boolean ) : [];

	const handleInputChange = useCallback( ( input ) => {
		window.clearTimeout( debounceRef.current );

		const query = input.trim();

		if ( ! query ) {
			setSuggestions( [] );
			setDeclaration( '' );
			return;
		}

		debounceRef.current = window.setTimeout( async () => {
			const results = await queryWorker( query );

			setSuggestions( results.map( ( r ) => r.c ) );
			setDeclaration( results.find( ( r ) => r.c === query )?.d || '' );
		}, 150 );
	}, [] );

	const handleChange = ( nextTokens ) => {
		onChange( nextTokens.join( ' ' ) );
		setSuggestions( [] );
		setDeclaration( '' );
	};

	if ( isRaw ) {
		return (
			<>
				<TextareaControl
					__nextHasNoMarginBottom
					label={ __( 'Classes', 'tailwind-gutenberg' ) }
					value={ value || '' }
					onChange={ onChange }
					help={ __(
						'Space-separated Tailwind classes.',
						'tailwind-gutenberg'
					) }
				/>
				<span style={{ marginBottom: '8px' }}></span>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Paste raw', 'tailwind-gutenberg' ) }
					checked={ isRaw }
					onChange={ setIsRaw }
				/>
			</>
		);
	}

	return (
		<>
			<FormTokenField
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				__experimentalShowHowTo={ false }
				__experimentalAutoSelectFirstMatch
				label={ __( 'Classes', 'tailwind-gutenberg' ) }
				value={ tokens }
				suggestions={ suggestions }
				onChange={ handleChange }
				onInputChange={ handleInputChange }
				tokenizeOnSpace
			/>
			{ declaration && (
				<p className="twg-declaration-preview">{ declaration }</p>
			) }
			<span style={{ marginBottom: '8px' }}></span>
			<ToggleControl
				__nextHasNoMarginBottom
				label={ __( 'Paste raw', 'tailwind-gutenberg' ) }
				checked={ isRaw }
				onChange={ setIsRaw }
			/>
		</>
	);
}
