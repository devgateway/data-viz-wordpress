/* global twentyseventeenScreenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */

(function( $ ) {
	var masthead, menuToggle, ***REMOVED***, ***REMOVED***;

	function ***REMOVED***( container ) {

		// Add dropdown toggle that displays child menu items.
		var ***REMOVED*** = $( '<button />', { 'class': 'dropdown-toggle', 'aria-expanded': false })
			.append( twentyseventeenScreenReaderText.icon )
			.append( $( '<span />', { 'class': 'screen-reader-text', text: twentyseventeenScreenReaderText.expand }) );

		container.find( '.menu-item-has-children > a, .page_item_has_children > a' ).after( ***REMOVED*** );

		// Set the active submenu dropdown toggle button initial state.
		container.find( '.current-menu-ancestor > button' )
			.addClass( 'toggled-on' )
			.attr( 'aria-expanded', 'true' )
			.find( '.screen-reader-text' )
			.text( twentyseventeenScreenReaderText.collapse );
		// Set the active submenu initial state.
		container.find( '.current-menu-ancestor > .sub-menu' ).addClass( 'toggled-on' );

		container.find( '.dropdown-toggle' ).click( function( e ) {
			var _this = $( this ),
				***REMOVED*** = _this.find( '.screen-reader-text' );

			e.***REMOVED***();
			_this.toggleClass( 'toggled-on' );
			_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );

			_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );

			***REMOVED***.text( ***REMOVED***.text() === twentyseventeenScreenReaderText.expand ? twentyseventeenScreenReaderText.collapse : twentyseventeenScreenReaderText.expand );
		});
	}

	***REMOVED***( $( '.main-navigation' ) );

	masthead       = $( '#masthead' );
	menuToggle     = masthead.find( '.menu-toggle' );
	***REMOVED*** = masthead.find( '.main-navigation' );
	***REMOVED*** = masthead.find( '.main-navigation > div > ul' );

	// Enable menuToggle.
	(function() {

		// Return early if menuToggle is missing.
		if ( ! menuToggle.length ) {
			return;
		}

		// Add an initial value for the attribute.
		menuToggle.attr( 'aria-expanded', 'false' );

		menuToggle.on( 'click.***REMOVED***', function() {
			***REMOVED***.toggleClass( 'toggled-on' );

			$( this ).attr( 'aria-expanded', ***REMOVED***.hasClass( 'toggled-on' ) );
		});
	})();

	// Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
	(function() {
		if ( ! ***REMOVED***.length || ! ***REMOVED***.children().length ) {
			return;
		}

		// Toggle `focus` class to allow submenu access on tablets.
		function toggleFocusClassTouchScreen() {
			if ( 'none' === $( '.menu-toggle' ).css( 'display' ) ) {

				$( document.body ).on( 'touchstart.***REMOVED***', function( e ) {
					if ( ! $( e.target ).closest( '.main-navigation li' ).length ) {
						$( '.main-navigation li' ).removeClass( 'focus' );
					}
				});

				***REMOVED***.find( '.menu-item-has-children > a, .page_item_has_children > a' )
					.on( 'touchstart.***REMOVED***', function( e ) {
						var el = $( this ).parent( 'li' );

						if ( ! el.hasClass( 'focus' ) ) {
							e.***REMOVED***();
							el.toggleClass( 'focus' );
							el.siblings( '.focus' ).removeClass( 'focus' );
						}
					});

			} else {
				***REMOVED***.find( '.menu-item-has-children > a, .page_item_has_children > a' ).unbind( 'touchstart.***REMOVED***' );
			}
		}

		if ( 'ontouchstart' in window ) {
			$( window ).on( 'resize.***REMOVED***', toggleFocusClassTouchScreen );
			toggleFocusClassTouchScreen();
		}

		***REMOVED***.find( 'a' ).on( 'focus.***REMOVED*** blur.***REMOVED***', function() {
			$( this ).parents( '.menu-item, .page_item' ).toggleClass( 'focus' );
		});
	})();
})( jQuery );
