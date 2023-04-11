/**
 * External dependencies
 */
import type { Properties } from 'csstype';

/**
 * Internal dependencies
 */
import { pickBy, omit, mapValues } from 'lodash';
import { ***REMOVED*** } from './helper';
import type { CornerProps, ***REMOVED*** } from './style-picker';

function getCssPropertyWithFourDirection(
	property: keyof Properties,
	top: string,
	right: string,
	bottom: string,
	left: string
): Properties {
	if ( top === right && top === bottom && top === left ) {
		return {
			[ property ]: top,
		};
	}

	if ( top === bottom && left === right ) {
		return {
			[ property ]: `${ top } ${ left }`,
		};
	}

	if ( left === right ) {
		return {
			[ property ]: `${ top } ${ left } ${ bottom }`,
		};
	}

	return {
		[ property ]: `${ top } ${ right } ${ bottom } ${ left }`,
	};
}

/**
 * Update padding style of styles object.
 *
 * @param  styles Styles object.
 * @param  values padding values object.
 * @return  New Styles object.
 */
export function updatePadding(
	styles: Properties,
	values: Partial< ***REMOVED*** > | undefined
): Properties {
	if ( ! values ) return styles;

	const ***REMOVED*** = 'padding';
	const { top, right, bottom, left } = mapValues( pickBy( values ), ( value ) =>
		***REMOVED***( value )
	);
	const newValues = {
		paddingTop: top,
		paddingRight: right,
		paddingBottom: bottom,
		paddingLeft: left,
	};

	const newStyles = omit( styles, [ ***REMOVED***, ...Object.keys( newValues ) ] );

	if ( ! top || ! right || ! bottom || ! right ) {
		return pickBy( {
			...newStyles,
			...newValues,
		} );
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection( ***REMOVED***, top, right, bottom, left ),
	};
}

/**
 * Update border-width style of styles object.
 *
 * @param  styles Styles object.
 * @param  values border-width values object.
 * @return  New Styles object.
 */
export function ***REMOVED***(
	styles: Properties,
	values: Partial< ***REMOVED*** > | undefined
): Properties {
	if ( ! values ) return styles;

	const ***REMOVED*** = 'borderWidth';
	const { top, right, bottom, left } = mapValues( pickBy( values ), ( value ) =>
		***REMOVED***( value )
	);

	const newValues = {
		***REMOVED***: top,
		***REMOVED***: right,
		***REMOVED***: bottom,
		***REMOVED***: left,
	};

	const newStyles = omit( styles, [ ***REMOVED***, ...Object.keys( newValues ) ] );

	if ( ! top || ! right || ! bottom || ! right ) {
		return pickBy( {
			...newStyles,
			...newValues,
		} );
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection( ***REMOVED***, top, right, bottom, left ),
	};
}

/**
 * Update border-style style of styles object.
 *
 * @param  styles Styles object.
 * @param  values border-style values object.
 * @return New Styles object.
 */
export function ***REMOVED***(
	styles: Properties,
	values: Partial< ***REMOVED*** > | undefined
): Properties {
	if ( ! values ) return styles;

	const ***REMOVED*** = 'borderStyle';
	const { top, right, bottom, left } = pickBy( values );
	const newValues = {
		***REMOVED***: top,
		***REMOVED***: right,
		***REMOVED***: bottom,
		***REMOVED***: left,
	};

	const newStyles = omit( styles, [ ***REMOVED***, ...Object.keys( newValues ) ] );

	if ( ! top || ! right || ! bottom || ! right ) {
		return pickBy( {
			...newStyles,
			...newValues,
		} );
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection( ***REMOVED***, top, right, bottom, left ),
	};
}

/**
 * Update border-scoloryle style of styles object.
 *
 * @param  styles Styles object.
 * @param  values border-color values object.
 * @return New Styles object.
 */
export function ***REMOVED***(
	styles: Properties,
	values: Partial< ***REMOVED*** > | undefined
): Properties {
	if ( ! values ) return styles;

	const ***REMOVED*** = 'borderColor';
	const { top, right, bottom, left } = pickBy( values );
	const newValues = {
		***REMOVED***: top,
		***REMOVED***: right,
		***REMOVED***: bottom,
		***REMOVED***: left,
	};

	const newStyles = omit( styles, [ ***REMOVED***, ...Object.keys( newValues ) ] );

	if ( ! top || ! right || ! bottom || ! right ) {
		return pickBy( {
			...newStyles,
			...newValues,
		} );
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection( ***REMOVED***, top, right, bottom, left ),
	};
}

/**
 * Update border-spacing style of styles object.
 *
 * @param  styles            Styles object.
 * @param  values            border-spacing values object.
 * @param  values.horizontal
 * @param  values.vertical
 * @return New Styles object.
 */
export function ***REMOVED***(
	styles: Properties,
	values: { horizontal?: string; vertical?: string } | undefined
): Properties {
	if ( ! values ) return styles;

	const newStyles = omit( styles, [ 'borderSpacing' ] );
	const { horizontal, vertical } = mapValues( pickBy( values ), ( value ) =>
		***REMOVED***( value )
	);

	if ( horizontal === undefined && vertical === undefined ) {
		return newStyles;
	}
	if ( horizontal === vertical ) {
		return {
			...newStyles,
			borderSpacing: horizontal,
		};
	}

	return {
		...newStyles,
		borderSpacing: `${ horizontal } ${ vertical }`,
	};
}

/**
 * Update border-radius style of styles object.
 *
 * @param  styles Styles object.
 * @param  values border-radius values object.
 * @return  New Styles object.
 */
export function ***REMOVED***(
	styles: Properties,
	values: Partial< CornerProps > | undefined
): Properties {
	if ( ! values ) return styles;

	const ***REMOVED*** = 'borderRadius';
	const { topLeft, topRight, bottomRight, bottomLeft } = mapValues( pickBy( values ), ( value ) =>
		***REMOVED***( value )
	);

	const newValues = {
		***REMOVED***: topLeft,
		***REMOVED***: topRight,
		borderBottomRightRadius: bottomRight,
		borderBottomLeftRadius: bottomLeft,
	};

	const newStyles = omit( styles, [ ***REMOVED***, ...Object.keys( newValues ) ] );

	if ( ! topLeft || ! topRight || ! bottomRight || ! bottomLeft ) {
		return pickBy( {
			...newStyles,
			...newValues,
		} );
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection(
			***REMOVED***,
			topLeft,
			topRight,
			bottomRight,
			bottomLeft
		),
	};
}
