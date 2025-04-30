/* global twentyseventeenScreenReaderText */
(function( $ ) {

	// Variables and DOM Caching.
	var $body = $( 'body' ),
		$customHeader = $body.find( '.custom-header' ),
		$branding = $customHeader.find( '.site-branding' ),
		$navigation = $body.find( '.navigation-top' ),
		$navWrap = $navigation.find( '.wrap' ),
		$navMenuItem = $navigation.find( '.menu-item' ),
		$menuToggle = $navigation.find( '.menu-toggle' ),
		$***REMOVED*** = $body.find( '.menu-scroll-down' ),
		$sidebar = $body.find( '#secondary' ),
		$entryContent = $body.find( '.entry-content' ),
		$formatQuote = $body.find( '.format-quote blockquote' ),
		isFrontPage = $body.hasClass( '***REMOVED***-front-page' ) || $body.hasClass( 'home blog' ),
		***REMOVED*** = 'site-navigation-fixed',
		***REMOVED***,
		navigationOuterHeight,
		navPadding,
		***REMOVED***,
		***REMOVED***,
		***REMOVED***,
		headerOffset,
		menuTop = 0,
		resizeTimer;

	// Ensure the sticky navigation doesn't cover current focused links.
	$( 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [***REMOVED***]', '.site-content-contain' ).filter( ':visible' ).on( 'focus', function() {
		if ( $navigation.hasClass( 'site-navigation-fixed' ) ) {
			var ***REMOVED*** = $( window ).scrollTop(),
				***REMOVED*** = $navigation.height(),
				itemScrollTop = $( this ).offset().top,
				offsetDiff = itemScrollTop - ***REMOVED***;

			// Account for Admin bar.
			if ( $( '#wpadminbar' ).length ) {
				offsetDiff -= $( '#wpadminbar' ).height();
			}

			if ( offsetDiff < ***REMOVED*** ) {
				$( window ).scrollTo( itemScrollTop - ( ***REMOVED*** + 50 ), 0 );
			}
		}
	});

	// Set properties of navigation.
	function setNavProps() {
		***REMOVED***      = $navigation.height();
		navigationOuterHeight = $navigation.outerHeight();
		navPadding            = parseFloat( $navWrap.css( 'padding-top' ) ) * 2;
		***REMOVED***     = $navMenuItem.outerHeight() * 2;
		***REMOVED***        = navPadding + ***REMOVED***;
		***REMOVED***       = ***REMOVED*** <= ***REMOVED***;
	}

	// Make navigation 'stick'.
	function ***REMOVED***() {

		// Make sure we're not on a mobile screen.
		if ( 'none' === $menuToggle.css( 'display' ) ) {

			// Make sure the nav isn't taller than two rows.
			if ( ***REMOVED*** ) {

				// When there's a custom header image or video, the header offset includes the height of the navigation.
				if ( isFrontPage && ( $body.hasClass( 'has-header-image' ) || $body.hasClass( 'has-header-video' ) ) ) {
					headerOffset = $customHeader.innerHeight() - navigationOuterHeight;
				} else {
					headerOffset = $customHeader.innerHeight();
				}

				// If the scroll is more than the custom header, set the fixed class.
				if ( $( window ).scrollTop() >= headerOffset ) {
					$navigation.addClass( ***REMOVED*** );
				} else {
					$navigation.removeClass( ***REMOVED*** );
				}

			} else {

				// Remove 'fixed' class if nav is taller than two rows.
				$navigation.removeClass( ***REMOVED*** );
			}
		}
	}

	// Set margins of branding in header.
	function ***REMOVED***() {
		if ( 'none' === $menuToggle.css( 'display' ) ) {

			// The margin should be applied to different elements on front-page or home vs interior pages.
			if ( isFrontPage ) {
				$branding.css( 'margin-bottom', navigationOuterHeight );
			} else {
				$customHeader.css( 'margin-bottom', navigationOuterHeight );
			}

		} else {
			$customHeader.css( 'margin-bottom', '0' );
			$branding.css( 'margin-bottom', '0' );
		}
	}

	// Set icon for quotes.
	function setQuotesIcon() {
		$( twentyseventeenScreenReaderText.quote ).prependTo( $formatQuote );
	}

	// Add 'below-entry-meta' class to elements.
	function ***REMOVED***( param ) {
		var sidebarPos, ***REMOVED***;

		if ( ! $body.hasClass( 'has-sidebar' ) ||
			typeof $sidebar === 'undefined' ||
			$sidebar.length < 1 || (
			$body.hasClass( 'search' ) ||
			$body.hasClass( 'single-attachment' ) ||
			$body.hasClass( 'error404' ) ||
			$body.hasClass( '***REMOVED***-front-page' )
		) ) {
			return;
		}

		sidebarPos       = $sidebar.offset();
		***REMOVED*** = sidebarPos.top + ( $sidebar.height() + 28 );

		$entryContent.find( param ).each( function() {
			var $element = $( this ),
				elementPos = $element.offset(),
				elementPosTop = elementPos.top;

			// Add 'below-entry-meta' to elements below the entry meta.
			if ( elementPosTop > ***REMOVED*** ) {
				$element.addClass( 'below-entry-meta' );
			} else {
				$element.removeClass( 'below-entry-meta' );
			}
		});
	}

	/*
	 * Test if inline SVGs are supported.
	 * @link https://github.com/Modernizr/Modernizr/
	 */
	function ***REMOVED***() {
		var div = document.createElement( 'div' );
		div.innerHTML = '<svg/>';
		return 'http://www.w3.org/2000/svg' === ( 'undefined' !== typeof SVGRect && div.firstChild && div.firstChild.namespaceURI );
	}

	/**
	 * Test if an iOS device.
	*/
	function checkiOS() {
		return /iPad|iPhone|iPod/.test(navigator.userAgent) && ! window.MSStream;
	}

	/*
	 * Test if background-attachment: fixed is supported.
	 * @link http://stackoverflow.com/questions/14115080/detect-support-for-background-attachment-fixed
	 */
	function supportsFixedBackground() {
		var el = document.createElement('div'),
			isSupported;

		try {
			if ( ! ( '***REMOVED***' in el.style ) || checkiOS() ) {
				return false;
			}
			el.style.***REMOVED*** = 'fixed';
			isSupported = ( 'fixed' === el.style.***REMOVED*** );
			return isSupported;
		}
		catch (e) {
			return false;
		}
	}

	// Fire on document ready.
	$( function() {

		// If navigation menu is present on page, setNavProps and ***REMOVED***.
		if ( $navigation.length ) {
			setNavProps();
			***REMOVED***();
		}

		// If 'Scroll Down' arrow in present on page, calculate scroll offset and bind an event handler to the click event.
		if ( $***REMOVED***.length ) {

			if ( $( 'body' ).hasClass( 'admin-bar' ) ) {
				menuTop -= 32;
			}
			if ( $( 'body' ).hasClass( 'blog' ) ) {
				menuTop -= 30; // The div for latest posts has no space above content, add some to account for this.
			}
			if ( ! $navigation.length ) {
				navigationOuterHeight = 0;
			}

			$***REMOVED***.on( 'click', function( e ) {
				e.***REMOVED***();
				$( window ).scrollTo( '#primary', {
					duration: 600,
					offset: { top: menuTop - navigationOuterHeight }
				});
			});
		}

		***REMOVED***();
		setQuotesIcon();
		***REMOVED***( 'blockquote.alignleft, blockquote.alignright' );
		if ( true === ***REMOVED***() ) {
			document.***REMOVED***.className = document.***REMOVED***.className.replace( /(\s*)no-svg(\s*)/, '$1svg$2' );
		}

		if ( true === supportsFixedBackground() ) {
			document.***REMOVED***.className += ' background-fixed';
		}
	} );

	// If navigation menu is present on page, adjust it on scroll and screen resize.
	if ( $navigation.length ) {

		// On scroll, we want to stick/unstick the navigation.
		$( window ).on( 'scroll', function() {
			***REMOVED***();
			***REMOVED***();
		});

		// Also want to make sure the navigation is where it should be on resize.
		$( window ).on( 'resize', function() {
			setNavProps();
			setTimeout( ***REMOVED***, 500 );
		});
	}

	$( window ).on( 'resize', function() {
		clearTimeout( resizeTimer );
		resizeTimer = setTimeout( function() {
			***REMOVED***( 'blockquote.alignleft, blockquote.alignright' );
		}, 300 );
		setTimeout( ***REMOVED***, 1000 );
	});

	// Add header video class after the video is loaded.
	$( document ).on( 'wp-custom-header-video-loaded', function() {
		$body.addClass( 'has-header-video' );
	});

})( jQuery );
