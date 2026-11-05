import apiFetch from '@wordpress/api-fetch';
import { subscribe, select } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

const IFRAME_SELECTOR = 'iframe[name="editor-canvas"]';
const MARKER_ATTRIBUTE = 'data-twg-canvas';
const COMPILED_ATTRIBUTE = 'data-twg-compiled';

// Preflight is opt-in (off by default) since it resets margins/borders and
// would visibly wreck the editor chrome outside the canvas for most themes.
function buildCanvasCss() {
	const imports = window.twgCanvasData?.preflight
		? '@import "tailwindcss";'
		: '@import "tailwindcss/theme" layer(theme);\n@import "tailwindcss/utilities" layer(utilities);';

	return `${ imports }\n${ window.twgCanvasData?.themeCss || '' }`;
}

// @tailwindcss/browser only compiles classes it finds on elements actually
// in the DOM, so safelisted classes need a real (if hidden) element to
// live on rather than being handed to the compiler directly.
function injectSafelist( doc ) {
	const safelist = window.twgCanvasData?.safelist || [];

	if ( ! safelist.length ) {
		return;
	}

	const marker = doc.createElement( 'div' );
	marker.setAttribute( 'aria-hidden', 'true' );
	marker.setAttribute( 'data-twg-safelist', '1' );
	marker.style.display = 'none';
	marker.className = safelist.join( ' ' );
	doc.body.appendChild( marker );
}

// @tailwindcss/browser writes its compiled output into a <style> tag it
// creates itself, with no id or attribute to identify it by. It appends
// that tag to <head> synchronously as soon as it runs, so watching for the
// next plain <style> element added to <head> right after injection is the
// only way to get a handle on it.
function markCompiledStyleTag( doc ) {
	const observer = new window.MutationObserver( ( mutations ) => {
		for ( const mutation of mutations ) {
			for ( const node of mutation.addedNodes ) {
				if (
					node.tagName === 'STYLE' &&
					! node.hasAttribute( 'type' )
				) {
					node.setAttribute( COMPILED_ATTRIBUTE, '1' );
					observer.disconnect();
					return;
				}
			}
		}
	} );

	observer.observe( doc.head, { childList: true } );
}

function injectIntoIframe( iframe ) {
	const doc = iframe.contentDocument;

	if (
		! doc ||
		! doc.head ||
		! doc.body ||
		doc.head.querySelector( `script[${ MARKER_ATTRIBUTE }]` )
	) {
		// A missing head/body means the iframe document isn't ready yet
		// (e.g. mid-navigation right after a device-preview switch); since
		// nothing gets marked below, the observers retry on the next
		// mutation/load instead of half-completing the injection.
		return;
	}

	const themeStyle = doc.createElement( 'style' );
	themeStyle.setAttribute( 'type', 'text/tailwindcss' );
	themeStyle.textContent = buildCanvasCss();
	doc.head.appendChild( themeStyle );

	injectSafelist( doc );
	markCompiledStyleTag( doc );

	const script = doc.createElement( 'script' );
	script.setAttribute( MARKER_ATTRIBUTE, '1' );
	script.src = window.twgCanvasData.tailwindBrowserUrl;
	doc.head.appendChild( script );
}

function tryInject() {
	const iframe = document.querySelector( IFRAME_SELECTOR );

	if ( ! iframe ) {
		return;
	}

	try {
		injectIntoIframe( iframe );
	} catch ( error ) {
		// The iframe's document can be mid-navigation (e.g. right after a
		// device-preview switch recreates it); the observers below retry on
		// the next mutation/load, so failures here are silently dropped.
	}
}

function getCompiledCss() {
	const iframe = document.querySelector( IFRAME_SELECTOR );
	const style = iframe?.contentDocument?.head?.querySelector(
		`style[${ COMPILED_ATTRIBUTE }]`
	);

	return style?.textContent || '';
}

function uploadCompiledCss() {
	const css = getCompiledCss();

	if ( ! css ) {
		return;
	}

	apiFetch( {
		path: '/twg/v1/css',
		method: 'POST',
		data: { css },
	} ).catch( () => {
		// Best-effort: the editor preview already reflects the current
		// classes regardless of whether the frontend copy uploaded.
	} );
}

// Device-preview switches and other editor UI destroy and recreate the
// iframe, so a one-shot check at boot isn't enough.
new window.MutationObserver( tryInject ).observe( document.body, {
	childList: true,
	subtree: true,
} );

// iframe 'load' events don't bubble, so this has to be a capturing listener.
document.addEventListener(
	'load',
	( event ) => {
		if ( event.target.matches?.( IFRAME_SELECTOR ) ) {
			tryInject();
		}
	},
	true
);

tryInject();

let wasSaving = false;

subscribe( () => {
	const isSaving = select( editorStore ).isSavingPost();
	const isAutosaving = select( editorStore ).isAutosavingPost();

	if ( wasSaving && ! isSaving && ! isAutosaving ) {
		uploadCompiledCss();
	}

	wasSaving = isSaving;
} );
