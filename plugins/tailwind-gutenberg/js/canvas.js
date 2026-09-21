const IFRAME_SELECTOR = 'iframe[name="editor-canvas"]';
const MARKER_ATTRIBUTE = 'data-twg-canvas';

// Preflight is intentionally excluded: it resets margins/borders and would
// visibly wreck the editor chrome outside the canvas.
const CANVAS_THEME_CSS = `@import "tailwindcss/theme" layer(theme);
@import "tailwindcss/utilities" layer(utilities);`;

function injectIntoIframe( iframe ) {
	const doc = iframe.contentDocument;

	if (
		! doc ||
		! doc.head ||
		doc.head.querySelector( `script[${ MARKER_ATTRIBUTE }]` )
	) {
		return;
	}

	const themeStyle = doc.createElement( 'style' );
	themeStyle.setAttribute( 'type', 'text/tailwindcss' );
	themeStyle.textContent = CANVAS_THEME_CSS;
	doc.head.appendChild( themeStyle );

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
