#!/usr/bin/env node
// Generates assets/class-index.json: a static suggestion index built by
// actually compiling every candidate utility name with Tailwind's real
// compiler and keeping only the ones that produce output. This is slow
// (thousands of theme-driven candidates) and its output is committed, so
// it only runs at build/dev time, never per-request.
import { compile } from 'tailwindcss';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import zlib from 'node:zlib';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const OUTPUT_PATH = path.join( __dirname, '..', 'assets', 'class-index.json' );

const STYLESHEET_MAP = {
	tailwindcss: 'tailwindcss/index.css',
	'tailwindcss/preflight': 'tailwindcss/preflight.css',
	'tailwindcss/preflight.css': 'tailwindcss/preflight.css',
	'tailwindcss/theme': 'tailwindcss/theme.css',
	'tailwindcss/theme.css': 'tailwindcss/theme.css',
	'tailwindcss/utilities': 'tailwindcss/utilities.css',
	'tailwindcss/utilities.css': 'tailwindcss/utilities.css',
};

function resolvePath( specifier ) {
	return fileURLToPath( import.meta.resolve( specifier ) );
}

async function loadStylesheet( id ) {
	const target = STYLESHEET_MAP[ id ];

	if ( ! target ) {
		throw new Error( `generate-index: cannot resolve "${ id }"` );
	}

	const filePath = resolvePath( target );

	return {
		path: filePath,
		base: path.dirname( filePath ),
		content: readFileSync( filePath, 'utf8' ),
	};
}

const themeCss = readFileSync( resolvePath( 'tailwindcss/theme.css' ), 'utf8' );

function extractThemeKeys( prefix, excludePrefixes = [] ) {
	const pattern = new RegExp( `--${ prefix }-([a-zA-Z0-9-]+):`, 'g' );
	const keys = new Set();
	let match;

	while ( ( match = pattern.exec( themeCss ) ) ) {
		if ( ! excludePrefixes.some( ( p ) => match[ 1 ].startsWith( p ) ) ) {
			keys.add( match[ 1 ] );
		}
	}

	return Array.from( keys );
}

const COLORS = extractThemeKeys( 'color' );
const RADII = extractThemeKeys( 'radius' );
const FONT_SIZES = extractThemeKeys( 'text', [ 'shadow-' ] );
const FONT_WEIGHTS = extractThemeKeys( 'font-weight' );
const SHADOWS = extractThemeKeys( 'shadow' );

// Tailwind v4's spacing scale is open-ended (calc(var(--spacing) * N) for
// any N), so this is the documented default set of named steps rather
// than something introspectable from the theme file.
const SPACING = [
	'0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',
	'8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36',
	'40', '44', '48', '52', '56', '60', '64', '72', '80', '96',
];

const NAMESPACES = [
	{ prefixes: [ 'bg' ], values: COLORS },
	{ prefixes: [ 'text' ], values: COLORS },
	{ prefixes: [ 'border' ], values: COLORS },
	{ prefixes: [ 'ring' ], values: COLORS },
	{ prefixes: [ 'fill' ], values: COLORS },
	{ prefixes: [ 'stroke' ], values: COLORS },
	{ prefixes: [ 'decoration' ], values: COLORS },
	{ prefixes: [ 'text' ], values: FONT_SIZES },
	{ prefixes: [ 'font' ], values: FONT_WEIGHTS },
	{
		prefixes: [
			'rounded', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l',
			'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl',
		],
		values: RADII,
	},
	{ prefixes: [ 'shadow' ], values: SHADOWS },
	{
		prefixes: [ 'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py' ],
		values: SPACING,
	},
	{
		prefixes: [ 'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my' ],
		values: SPACING,
	},
	{
		prefixes: [ 'w', 'h', 'min-w', 'min-h', 'max-w', 'max-h', 'size' ],
		values: SPACING,
	},
	{ prefixes: [ 'gap', 'gap-x', 'gap-y' ], values: SPACING },
	{
		prefixes: [ 'top', 'right', 'bottom', 'left', 'inset', 'inset-x', 'inset-y' ],
		values: SPACING,
	},
];

const STATIC_UTILITIES = [
	'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid',
	'inline-grid', 'hidden', 'contents',
	'static', 'relative', 'absolute', 'fixed', 'sticky',
	'flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse',
	'flex-wrap', 'flex-nowrap', 'flex-1', 'flex-auto', 'flex-initial', 'flex-none',
	'items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch',
	'justify-start', 'justify-end', 'justify-center', 'justify-between',
	'justify-around', 'justify-evenly',
	'overflow-auto', 'overflow-hidden', 'overflow-visible', 'overflow-scroll',
	'truncate', 'text-ellipsis', 'text-clip',
	'italic', 'not-italic', 'underline', 'overline', 'line-through', 'no-underline',
	'uppercase', 'lowercase', 'capitalize', 'normal-case',
	'text-left', 'text-center', 'text-right', 'text-justify',
	'cursor-pointer', 'cursor-default', 'cursor-not-allowed', 'cursor-wait',
	'select-none', 'select-text', 'select-all', 'select-auto',
	'border', 'border-0', 'border-2', 'border-4', 'border-8',
	'w-full', 'w-screen', 'h-full', 'h-screen', 'w-auto', 'h-auto',
];

function buildCandidateList() {
	const candidates = new Set( STATIC_UTILITIES );

	for ( const { prefixes, values } of NAMESPACES ) {
		for ( const prefix of prefixes ) {
			for ( const value of values ) {
				candidates.add( `${ prefix }-${ value }` );
			}
		}
	}

	return Array.from( candidates );
}

// Selectors never contain literal braces, and Tailwind emits one utility
// per top-level `.class { ... }` block (occasionally wrapped in an
// @supports/@media guard), so a brace-matching regex is enough here
// without a full CSS parser.
function extractDeclarations( css ) {
	const declarations = new Map();
	const pattern = /\.((?:[^\s{.]|\\.)+)\s*\{([^}]*)\}/g;
	let match;

	while ( ( match = pattern.exec( css ) ) ) {
		const className = match[ 1 ].replace( /\\/g, '' );
		const declaration = match[ 2 ].trim().replace( /\s+/g, ' ' );

		if ( ! declarations.has( className ) && declaration ) {
			declarations.set( className, declaration );
		}
	}

	return declarations;
}

async function main() {
	const candidates = buildCandidateList();

	const { build } = await compile( '@import "tailwindcss";', {
		base: path.dirname( resolvePath( 'tailwindcss/package.json' ) ),
		loadStylesheet,
		loadModule: async () => {
			throw new Error( 'generate-index: plugins are not supported' );
		},
	} );

	const css = build( candidates );
	const declarations = extractDeclarations( css );

	const entries = candidates
		.filter( ( c ) => declarations.has( c ) )
		.sort()
		.map( ( c ) => ( { c, d: declarations.get( c ) } ) );

	mkdirSync( path.dirname( OUTPUT_PATH ), { recursive: true } );
	writeFileSync( OUTPUT_PATH, JSON.stringify( entries ) );

	const gzipSize = zlib.gzipSync( JSON.stringify( entries ) ).length;

	console.log(
		`generate-index: wrote ${ entries.length } entries ` +
			`(${ candidates.length - entries.length } candidates produced no output), ` +
			`${ Math.round( gzipSize / 1024 ) } KB gzipped`
	);
}

main();
