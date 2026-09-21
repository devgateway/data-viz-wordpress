/* eslint-env worker */
// Runs the ~3,000-entry class-index scan off the main thread so it never
// blocks typing. Communicates via postMessage: an {type:'init', indexUrl}
// message triggers the (one-time) index fetch, then each
// {type:'query', query, requestId} message gets a matching
// {requestId, results} reply.
const VARIANTS = [
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
	'hover',
	'focus',
	'focus-visible',
	'focus-within',
	'active',
	'visited',
	'disabled',
	'first',
	'last',
	'odd',
	'even',
	'group-hover',
	'group-focus',
	'peer-hover',
	'peer-focus',
	'dark',
];

const ARBITRARY_VALUE_PATTERN = /\[.+\]$/;

let indexPromise = null;
let maxResults = 50;

// The editor UI (FormTokenField) re-filters whatever list this returns by
// plain substring containment against the full typed text, so a fuzzy
// subsequence tier here would only ever be discarded downstream - ranking
// stops at prefix-vs-contains, which is also as far as the UI can display.
function rankUtilities( query, entries ) {
	const scored = [];

	for ( const entry of entries ) {
		let score;

		if ( entry.c.startsWith( query ) ) {
			score = 0;
		} else if ( entry.c.includes( query ) ) {
			score = 1;
		} else {
			continue;
		}

		scored.push( { entry, score } );
	}

	scored.sort(
		( a, b ) => a.score - b.score || a.entry.c.length - b.entry.c.length
	);

	return scored.slice( 0, maxResults ).map( ( r ) => r.entry );
}

self.addEventListener( 'message', async ( event ) => {
	const { type } = event.data;

	if ( type === 'init' ) {
		if ( event.data.maxResults ) {
			maxResults = event.data.maxResults;
		}
		indexPromise = fetch( event.data.indexUrl ).then( ( response ) =>
			response.json()
		);
		return;
	}

	if ( type !== 'query' ) {
		return;
	}

	const { query, requestId } = event.data;

	if ( ARBITRARY_VALUE_PATTERN.test( query ) ) {
		self.postMessage( { requestId, results: [] } );
		return;
	}

	// A query ending in ":" has nothing typed for its next segment yet, so
	// there's no useful utility search to run; offer every variant as a
	// starting point for that segment instead (including chaining, e.g.
	// "md:hover:").
	if ( query.endsWith( ':' ) ) {
		const results = VARIANTS.slice( 0, maxResults ).map( ( v ) => ( {
			c: `${ query }${ v }:`,
			d: '',
		} ) );
		self.postMessage( { requestId, results } );
		return;
	}

	const lastColon = query.lastIndexOf( ':' );
	const variantPrefix =
		lastColon === -1 ? '' : query.slice( 0, lastColon + 1 );
	const utilityQuery =
		lastColon === -1 ? query : query.slice( lastColon + 1 );

	const index = indexPromise ? await indexPromise : [];
	const matched = rankUtilities( utilityQuery, index );

	self.postMessage( {
		requestId,
		results: matched.map( ( entry ) => ( {
			c: variantPrefix + entry.c,
			d: entry.d,
		} ) ),
	} );
} );
