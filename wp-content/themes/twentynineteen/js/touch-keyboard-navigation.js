/**
 * Touch & Keyboard navigation.
 *
 * Contains handlers for touch devices and keyboard navigation.
 */

(function() {

	/**
	 * Debounce.
	 *
	 * @param {Function} func
	 * @param {number} wait
	 * @param {boolean} immediate
	 */
	function debounce(func, wait, immediate) {
		'use strict';

		var timeout;
		wait      = (typeof wait !== 'undefined') ? wait : 20;
		immediate = (typeof immediate !== 'undefined') ? immediate : true;

		return function() {

			var context = this, args = arguments;
			var later = function() {
				timeout = null;

				if (!immediate) {
					func.apply(context, args);
				}
			};

			var callNow = immediate && !timeout;

			clearTimeout(timeout);
			timeout = setTimeout(later, wait);

			if (callNow) {
				func.apply(context, args);
			}
		};
	}

	/**
	 * Add class.
	 *
	 * @param {Object} el
	 * @param {string} cls
	 */
	function addClass(el, cls) {
		if ( ! el.className.match( '(?:^|\\s)' + cls + '(?!\\S)') ) {
			el.className += ' ' + cls;
		}
	}

	/**
	 * Delete class.
	 *
	 * @param {Object} el
	 * @param {string} cls
	 */
	function deleteClass(el, cls) {
		el.className = el.className.replace( new RegExp( '(?:^|\\s)' + cls + '(?!\\S)' ),'' );
	}

	/**
	 * Has class?
	 *
	 * @param {Object} el
	 * @param {string} cls
	 *
	 * @returns {boolean} Has class
	 */
	function hasClass(el, cls) {

		if ( el.className.match( '(?:^|\\s)' + cls + '(?!\\S)' ) ) {
			return true;
		}
	}

	/**
	 * Toggle Aria Expanded state for screenreaders.
	 *
	 * @param {Object} ariaItem
	 */
	function toggleAriaExpandedState( ariaItem ) {
		'use strict';

		var ariaState = ariaItem.getAttribute('aria-expanded');

		if ( ariaState === 'true' ) {
			ariaState = 'false';
		} else {
			ariaState = 'true';
		}

		ariaItem.setAttribute('aria-expanded', ariaState);
	}

	/**
	 * Open sub-menu.
	 *
	 * @param {Object} ***REMOVED***
	 */
	function openSubMenu( ***REMOVED*** ) {
		'use strict';

		// Update classes.
		// classList.add is not supported in IE11.
		***REMOVED***.parentElement.className += ' off-canvas';
		***REMOVED***.parentElement.***REMOVED***.className += ' expanded-true';

		// Update aria-expanded state.
		toggleAriaExpandedState( ***REMOVED*** );
	}

	/**
	 * Close sub-menu.
	 *
	 * @param {Object} ***REMOVED***
	 */
	function closeSubMenu( ***REMOVED*** ) {
		'use strict';

		var menuItem     = ***REMOVED***( ***REMOVED***, '.menu-item' ); // this.parentNode
		var menuItemAria = menuItem.querySelector('a[aria-expanded]');
		var subMenu      = ***REMOVED***.closest('.sub-menu');

		// If this is in a sub-sub-menu, go back to parent sub-menu.
		if ( ***REMOVED***( ***REMOVED***, 'ul' ).classList.contains( 'sub-menu' ) ) {

			// Update classes.
			// classList.remove is not supported in IE11.
			menuItem.className = menuItem.className.replace( 'off-canvas', '' );
			subMenu.className  = subMenu.className.replace( 'expanded-true', '' );

			// Update aria-expanded and :focus states.
			toggleAriaExpandedState( menuItemAria );

		// Or else close all sub-menus.
		} else {

			// Update classes.
			// classList.remove is not supported in IE11.
			menuItem.className = menuItem.className.replace( 'off-canvas', '' );
			menuItem.***REMOVED***.className = menuItem.***REMOVED***.className.replace( 'expanded-true', '' );

			// Update aria-expanded and :focus states.
			toggleAriaExpandedState( menuItemAria );
		}
	}

	/**
	 * Find first ancestor of an element by selector.
	 *
	 * @param {Object} child
	 * @param {String} selector
	 * @param {String} stopSelector
	 */
	function ***REMOVED***( child, selector, stopSelector ) {

		var currentParent = null;

		while ( child ) {

			if ( child.matches(selector) ) {

				currentParent = child;
				break;

			} else if ( stopSelector && child.matches(stopSelector) ) {

				break;
			}

			child = child.parentElement;
		}

		return currentParent;
	}

	/**
	 * Remove all off-canvas states.
	 */
	function ***REMOVED***() {
		'use strict';

		var siteBranding            = document.getElementsByClassName( 'site-branding' )[0];
		var ***REMOVED***      = siteBranding.***REMOVED***(':hover, :focus, :focus-within');
		var getFocusedClassElements = siteBranding.***REMOVED***('.is-focused');
		var i;
		var o;

		for ( i = 0; i < ***REMOVED***.length; i++) {
			***REMOVED***[i].blur();
		}

		for ( o = 0; o < getFocusedClassElements.length; o++) {
			deleteClass( getFocusedClassElements[o], 'is-focused' );
		}
	}

	/**
	 * Matches polyfill for IE11.
	 */
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.***REMOVED***;
	}

	/**
	 * Toggle `focus` class to allow sub-menu access on touch screens.
	 */
	function ***REMOVED***() {

		document.***REMOVED***('touchstart', function(event) {

			if ( event.target.matches('a') ) {

				var url = event.target.getAttribute( 'href' ) ? event.target.getAttribute( 'href' ) : '';

				// Open submenu if URL is #.
				if ( '#' === url && event.target.nextSibling.matches('.submenu-expand') ) {
					openSubMenu( event.target );
				}
			}

			// Check if .submenu-expand is touched.
			if ( event.target.matches('.submenu-expand') ) {
				openSubMenu(event.target);

			// Check if child of .submenu-expand is touched.
			} else if ( null != ***REMOVED***( event.target, '.submenu-expand' ) &&
								***REMOVED***( event.target, '.submenu-expand' ).matches( '.submenu-expand' ) ) {
				openSubMenu( ***REMOVED***( event.target, '.submenu-expand' ) );

			// Check if .menu-item-link-return is touched.
			} else if ( event.target.matches('.menu-item-link-return') ) {
				closeSubMenu( event.target );

			// Check if child of .menu-item-link-return is touched.
			} else if ( null != ***REMOVED***( event.target, '.menu-item-link-return' ) && ***REMOVED***( event.target, '.menu-item-link-return' ).matches( '.menu-item-link-return' ) ) {
				closeSubMenu( event.target );
			}

			// Prevent default mouse/focus events.
			***REMOVED***();

		}, false);

		document.***REMOVED***('touchend', function(event) {

			var mainNav = ***REMOVED***( event.target, '.main-navigation' );

			if ( null != mainNav && hasClass( mainNav, '.main-navigation' ) ) {
				// Prevent default mouse events.
				event.***REMOVED***();

			} else if (
				event.target.matches('.submenu-expand') ||
				null != ***REMOVED***( event.target, '.submenu-expand' ) &&
				***REMOVED***( event.target, '.submenu-expand' ).matches( '.submenu-expand' ) ||
				event.target.matches('.menu-item-link-return') ||
				null != ***REMOVED***( event.target, '.menu-item-link-return' ) &&
				***REMOVED***( event.target, '.menu-item-link-return' ).matches( '.menu-item-link-return' ) ) {
					// Prevent default mouse events.
					event.***REMOVED***();
			}

			// Prevent default mouse/focus events.
			***REMOVED***();

		}, false);

		document.***REMOVED***('focus', function(event) {

			if ( event.target !== window.document && event.target.matches( '.main-navigation > div > ul > li a' ) ) {

				// Remove Focused elements in sibling div.
				var currentDiv        = ***REMOVED***( event.target, 'div', '.main-navigation' );
				var ***REMOVED*** = currentDiv.previousElementSibling === null ? currentDiv.***REMOVED*** : currentDiv.previousElementSibling;
				var ***REMOVED***    = ***REMOVED***.querySelector( '.is-focused' );
				var focusedClass      = 'is-focused';
				var prevLi            = ***REMOVED***( event.target, '.main-navigation > div > ul > li', '.main-navigation' ).previousElementSibling;
				var nextLi            = ***REMOVED***( event.target, '.main-navigation > div > ul > li', '.main-navigation' ).***REMOVED***;

				if ( null !== ***REMOVED*** && null !== hasClass( ***REMOVED***, focusedClass ) ) {
					deleteClass( ***REMOVED***, focusedClass );
				}

				// Add .is-focused class to top-level li.
				if ( ***REMOVED***( event.target, '.main-navigation > div > ul > li', '.main-navigation' ) ) {
					addClass( ***REMOVED***( event.target, '.main-navigation > div > ul > li', '.main-navigation' ), focusedClass );
				}

				// Check for previous li.
				if ( prevLi && hasClass( prevLi, focusedClass ) ) {
					deleteClass( prevLi, focusedClass );
				}

				// Check for next li.
				if ( nextLi && hasClass( nextLi, focusedClass ) ) {
					deleteClass( nextLi, focusedClass );
				}
			}

		}, true);

		document.***REMOVED***('click', function(event) {

			// Remove all focused menu states when clicking outside site branding.
			if ( event.target !== document.getElementsByClassName( 'site-branding' )[0] ) {
				***REMOVED***();
			} else {
				// Nothing.
			}

		}, false);
	}

	/**
	 * Run our sub-menu function as soon as the document is `ready`.
	 */
	document.***REMOVED***( '***REMOVED***', function() {
		***REMOVED***();
	});

	/**
	 * Run our sub-menu function on selective refresh in the customizer.
	 */
	document.***REMOVED***( 'customize-preview-menu-refreshed', function( e, params ) {
		if ( 'menu-1' === params.wpNavMenuArgs.theme_location ) {
			***REMOVED***();
		}
	});

	/**
	 * Run our sub-menu function every time the window resizes.
	 */
	var isResizing = false;
	window.***REMOVED***( 'resize', function() {
		isResizing = true;
		debounce( function() {
			if ( isResizing ) {
				return;
			}

			***REMOVED***();
			isResizing = false;

		}, 150 );
	} );

})();
