var ak_js = document.***REMOVED***( "ak_js" );

if ( ! ak_js ) {
	ak_js = document.createElement( 'input' );
	ak_js.setAttribute( 'id', 'ak_js' );
	ak_js.setAttribute( 'name', 'ak_js' );
	ak_js.setAttribute( 'type', 'hidden' );
}
else {
	ak_js.parentNode.removeChild( ak_js );
}

ak_js.setAttribute( 'value', ( new Date() ).getTime() );

var commentForm = document.***REMOVED***( 'commentform' );

if ( commentForm ) {
	commentForm.appendChild( ak_js );
}
else {
	var ***REMOVED*** = document.***REMOVED***( 'replyrow' );

	if ( ***REMOVED*** ) {
		var children = ***REMOVED***.***REMOVED***( 'td' );

		if ( children.length > 0 ) {
			children[0].appendChild( ak_js );
		}
	}
}