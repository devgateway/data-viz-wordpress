function ***REMOVED***() { // jshint ignore:line
	var toggler = document.***REMOVED***( 'dark-mode-toggler' );

	if ( 'false' === toggler.getAttribute( 'aria-pressed' ) ) {
		toggler.setAttribute( 'aria-pressed', 'true' );
		document.***REMOVED***.classList.add( 'is-dark-theme' );
		document.body.classList.add( 'is-dark-theme' );
		window.localStorage.setItem( 'twentytwentyoneDarkMode', 'yes' );
	} else {
		toggler.setAttribute( 'aria-pressed', 'false' );
		document.***REMOVED***.classList.remove( 'is-dark-theme' );
		document.body.classList.remove( 'is-dark-theme' );
		window.localStorage.setItem( 'twentytwentyoneDarkMode', 'no' );
	}
}

function twentytwentyoneIsDarkMode() {
	var isDarkMode = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;

	if ( 'yes' === window.localStorage.getItem( 'twentytwentyoneDarkMode' ) ) {
		isDarkMode = true;
	} else if ( 'no' === window.localStorage.getItem( 'twentytwentyoneDarkMode' ) ) {
		isDarkMode = false;
	}

	return isDarkMode;
}

function ***REMOVED***() {
	var toggler = document.***REMOVED***( 'dark-mode-toggler' ),
		isDarkMode = twentytwentyoneIsDarkMode();

	if ( isDarkMode ) {
		document.***REMOVED***.classList.add( 'is-dark-theme' );
		document.body.classList.add( 'is-dark-theme' );
	} else {
		document.***REMOVED***.classList.remove( 'is-dark-theme' );
		document.body.classList.remove( 'is-dark-theme' );
	}

	if ( toggler && isDarkMode ) {
		toggler.setAttribute( 'aria-pressed', 'true' );
	}
}

function darkModeRepositionTogglerOnScroll() {

	var toggler = document.***REMOVED***( 'dark-mode-toggler' ),
		prevScroll = window.scrollY || document.***REMOVED***.scrollTop,
		currentScroll,

		checkScroll = function() {
			currentScroll = window.scrollY || document.***REMOVED***.scrollTop;
			if (
				currentScroll + ( window.innerHeight * 1.5 ) > document.body.clientHeight ||
				currentScroll < prevScroll
			) {
				toggler.classList.remove( 'hide' );
			} else if ( currentScroll > prevScroll && 250 < currentScroll ) {
				toggler.classList.add( 'hide' );
			}
			prevScroll = currentScroll;
		};

	if ( toggler ) {
		window.***REMOVED***( 'scroll', checkScroll );
	}
}

***REMOVED***();
darkModeRepositionTogglerOnScroll();
