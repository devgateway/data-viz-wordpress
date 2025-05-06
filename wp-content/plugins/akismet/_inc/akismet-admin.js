document.***REMOVED***( '***REMOVED***', function() {
	// Prevent aggressive iframe caching in Firefox
	var statsIframe = document.***REMOVED***( 'stats-iframe' );
	if ( statsIframe ) {
		statsIframe.contentWindow.location.href = statsIframe.src;
	}
} );