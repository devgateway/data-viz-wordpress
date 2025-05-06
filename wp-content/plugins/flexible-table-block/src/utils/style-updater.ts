/**
 * External dependencies
 */
import type { Properties } from 'csstype';

/**
 * Internal dependencies
 */
import { ***REMOVED***, ***REMOVED*** } from './helper';
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
 * @param styles Styles object.
 * @param values padding values object.
 * @return  New Styles object.
 */
export function updatePadding(
	styles: Properties,
	values: Partial< ***REMOVED*** > | undefined
): Properties {
	if ( ! values ) {
		return styles;
	}

	const top = values.top ? ***REMOVED***( values.top ) : undefined;
	const right = values.right ? ***REMOVED***( values.right ) : undefined;
	const bottom = values.bottom ? ***REMOVED***( values.bottom ) : undefined;
	const left = values.left ? ***REMOVED***( values.left ) : undefined;

	const { padding, paddingTop, paddingRight, paddingBottom, paddingLeft, ...newStyles } = styles;

	if ( ! top || ! right || ! bottom || ! left ) {
		return {
			...newStyles,
			...***REMOVED***( {
				paddingTop: top,
				paddingRight: right,
				paddingBottom: bottom,
				paddingLeft: left,
			} ),
		};
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection( 'padding', top, right, bottom, left ),
	};
}

/**
 * Update border-width style of styles object.
 *
 * @param styles Styles object.
 * @param values border-width values object.
 * @return  New Styles object.
 */
export function ***REMOVED***(
	styles: Properties,
	values: Partial< ***REMOVED*** > | undefined
): Properties {
	if ( ! values ) {
		return styles;
	}

	const top = values.top ? ***REMOVED***( values.top ) : undefined;
	const right = values.right ? ***REMOVED***( values.right ) : undefined;
	const bottom = values.bottom ? ***REMOVED***( values.bottom ) : undefined;
	const left = values.left ? ***REMOVED***( values.left ) : undefined;

	const {
		borderWidth,
		***REMOVED***,
		***REMOVED***,
		***REMOVED***,
		***REMOVED***,
		...newStyles
	} = styles;

	if ( ! top || ! right || ! bottom || ! left ) {
		return {
			...newStyles,
			...***REMOVED***( {
				***REMOVED***: top,
				***REMOVED***: right,
				***REMOVED***: bottom,
				***REMOVED***: left,
			} ),
		};
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection( 'borderWidth', top, right, bottom, left ),
	};
}

/**
 * Update border-style style of styles object.
 *
 * @param styles Styles object.
 * @param values border-style values object.
 * @return New Styles object.
 */
export function ***REMOVED***(
	styles: Properties,
	values: Partial< ***REMOVED*** > | undefined
): Properties {
	if ( ! values ) {
		return styles;
	}

	const top = values.top ?? undefined;
	const right = values.right ?? undefined;
	const bottom = values.bottom ?? undefined;
	const left = values.left ?? undefined;

	const {
		borderStyle,
		***REMOVED***,
		***REMOVED***,
		***REMOVED***,
		***REMOVED***,
		...newStyles
	} = styles;

	if ( ! top || ! right || ! bottom || ! left ) {
		return {
			...newStyles,
			...***REMOVED***( {
				***REMOVED***: top,
				***REMOVED***: right,
				***REMOVED***: bottom,
				***REMOVED***: left,
			} ),
		};
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection( 'borderStyle', top, right, bottom, left ),
	};
}

/**
 * Update border-color style of styles object.
 *
 * @param styles Styles object.
 * @param values border-color values object.
 * @return New Styles object.
 */
export function ***REMOVED***(
	styles: Properties,
	values: Partial< ***REMOVED*** > | undefined
): Properties {
	if ( ! values ) {
		return styles;
	}

	const top = values.top ?? undefined;
	const right = values.right ?? undefined;
	const bottom = values.bottom ?? undefined;
	const left = values.left ?? undefined;

	const {
		borderColor,
		***REMOVED***,
		***REMOVED***,
		***REMOVED***,
		***REMOVED***,
		...newStyles
	} = styles;

	if ( ! top || ! right || ! bottom || ! left ) {
		return {
			...newStyles,
			...***REMOVED***( {
				***REMOVED***: top,
				***REMOVED***: right,
				***REMOVED***: bottom,
				***REMOVED***: left,
			} ),
		};
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection( 'borderColor', top, right, bottom, left ),
	};
}

/**
 * Update border-spacing style of styles object.
 *
 * @param styles            Styles object.
 * @param values            border-spacing values object.
 * @param values.horizontal
 * @param values.vertical
 * @return New Styles object.
 */
export function ***REMOVED***(
	styles: Properties,
	values: { horizontal?: string; vertical?: string } | undefined
): Properties {
	if ( ! values ) {
		return styles;
	}

	const { borderSpacing, ...newStyles } = styles;

	const horizontal = values.horizontal ? ***REMOVED***( values.horizontal ) : undefined;
	const vertical = values.vertical ? ***REMOVED***( values.vertical ) : undefined;

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
 * @param styles Styles object.
 * @param values border-radius values object.
 * @return  New Styles object.
 */
export function ***REMOVED***(
	styles: Properties,
	values: Partial< CornerProps > | undefined
): Properties {
	if ( ! values ) {
		return styles;
	}

	const topLeft = values?.topLeft ? ***REMOVED***( values.topLeft ) : undefined;
	const topRight = values?.topRight ? ***REMOVED***( values.topRight ) : undefined;
	const bottomRight = values?.bottomRight ? ***REMOVED***( values.bottomRight ) : undefined;
	const bottomLeft = values?.bottomLeft ? ***REMOVED***( values.bottomLeft ) : undefined;

	const {
		borderRadius,
		***REMOVED***,
		***REMOVED***,
		borderBottomRightRadius,
		borderBottomLeftRadius,
		...newStyles
	} = styles;

	if ( ! topLeft || ! topRight || ! bottomRight || ! bottomLeft ) {
		return {
			...newStyles,
			...***REMOVED***( {
				***REMOVED***: topLeft,
				***REMOVED***: topRight,
				borderBottomRightRadius: bottomRight,
				borderBottomLeftRadius: bottomLeft,
			} ),
		};
	}

	return {
		...newStyles,
		...getCssPropertyWithFourDirection(
			'borderRadius',
			topLeft,
			topRight,
			bottomRight,
			bottomLeft
		),
	};
}
