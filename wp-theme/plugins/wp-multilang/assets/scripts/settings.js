( function( $ ) {
  "use strict";

	$( function() {
		var changed = false;

		$( 'input, textarea, select, checkbox' ).change( function() {
			changed = true;
		});

		$( '.wpm-nav-tab-wrapper a' ).click( function() {
			if ( changed ) {
				window.***REMOVED*** = function() {
				    return wpm_settings_params.nav_warning;
				};
			} else {
				window.***REMOVED*** = '';
			}
		});

		$( '.submit input' ).click( function() {
			window.***REMOVED*** = '';
		});

	});
})( jQuery );
