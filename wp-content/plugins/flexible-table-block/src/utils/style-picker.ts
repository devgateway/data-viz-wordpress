/**
 * External dependencies
 */
import type { Properties } from 'csstype';

/**
 * Internal dependencies
 */
import { FourCssValues, parseCssValue } from './helper';

export interface ***REMOVED*** {
	top: string;
	right: string;
	bottom: string;
	left: string;
}

export interface CornerProps {
	topLeft: string;
	topRight: string;
	bottomRight: string;
	bottomLeft: string;
}

export interface CrossProps {
	horizontal: string;
	vertical: string;
}

/**
 * Pick padding style as object from style object.
 *
 * @param  stylesObj styles object.
 * @return padding styles object.
 */
export function pickPadding( stylesObj: Properties ): ***REMOVED*** {
	if ( stylesObj.padding ) {
		const paddingValues: FourCssValues = parseCssValue( stylesObj.padding );

		return {
			top: paddingValues[ 0 ],
			right: paddingValues[ 1 ],
			bottom: paddingValues[ 2 ],
			left: paddingValues[ 3 ],
		};
	}

	return {
		top: stylesObj?.paddingTop || '',
		right: stylesObj?.paddingRight || '',
		bottom: stylesObj?.paddingBottom || '',
		left: stylesObj?.paddingLeft || '',
	};
}

/**
 * Pick border-width style as object from style object.
 *
 * @param  stylesObj styles object.
 * @return border-width styles object.
 */
export function ***REMOVED***( stylesObj: Properties ): ***REMOVED*** {
	if ( stylesObj.borderWidth ) {
		const ***REMOVED***: FourCssValues = parseCssValue( stylesObj.borderWidth );

		return {
			top: ***REMOVED***[ 0 ],
			right: ***REMOVED***[ 1 ],
			bottom: ***REMOVED***[ 2 ],
			left: ***REMOVED***[ 3 ],
		};
	}

	return {
		top: stylesObj?.***REMOVED*** || '',
		right: stylesObj?.***REMOVED*** || '',
		bottom: stylesObj?.***REMOVED*** || '',
		left: stylesObj?.***REMOVED*** || '',
	};
}

/**
 * Pick border-color style as object from style object.
 *
 * @param  stylesObj styles object.
 * @return border-color styles object.
 */
export function ***REMOVED***( stylesObj: Properties ): ***REMOVED*** {
	if ( stylesObj.borderColor ) {
		const ***REMOVED***: FourCssValues = parseCssValue( stylesObj.borderColor );

		return {
			top: ***REMOVED***[ 0 ],
			right: ***REMOVED***[ 1 ],
			bottom: ***REMOVED***[ 2 ],
			left: ***REMOVED***[ 3 ],
		};
	}

	return {
		top: stylesObj?.***REMOVED*** || '',
		right: stylesObj?.***REMOVED*** || '',
		bottom: stylesObj?.***REMOVED*** || '',
		left: stylesObj?.***REMOVED*** || '',
	};
}

/**
 * Pick border-style style as object from style object.
 *
 * @param  stylesObj styles object.
 * @return border-style styles object.
 */
export function ***REMOVED***( stylesObj: Properties ): ***REMOVED*** {
	if ( stylesObj.borderStyle ) {
		const ***REMOVED***: FourCssValues = parseCssValue( stylesObj.borderStyle );

		return {
			top: ***REMOVED***[ 0 ],
			right: ***REMOVED***[ 1 ],
			bottom: ***REMOVED***[ 2 ],
			left: ***REMOVED***[ 3 ],
		};
	}

	return {
		top: stylesObj?.***REMOVED*** || '',
		right: stylesObj?.***REMOVED*** || '',
		bottom: stylesObj?.***REMOVED*** || '',
		left: stylesObj?.***REMOVED*** || '',
	};
}

/**
 * Pick border-radius style as object from style object.
 *
 * @param  stylesObj                         styles object.
 * @param  stylesObj.borderRadius
 * @param  stylesObj.***REMOVED***
 * @param  stylesObj.***REMOVED***
 * @param  stylesObj.borderBottomRightRadius
 * @param  stylesObj.borderBottomLeftRadius
 * @return border-radius styles object.
 */
export function ***REMOVED***( stylesObj: Properties ): CornerProps {
	if ( stylesObj.borderRadius ) {
		const ***REMOVED***: FourCssValues = parseCssValue( stylesObj.borderRadius );
		return {
			topLeft: ***REMOVED***[ 0 ],
			topRight: ***REMOVED***[ 1 ],
			bottomRight: ***REMOVED***[ 2 ],
			bottomLeft: ***REMOVED***[ 3 ],
		};
	}

	return {
		topLeft: stylesObj?.***REMOVED*** || '',
		topRight: stylesObj?.***REMOVED*** || '',
		bottomRight: stylesObj?.borderBottomRightRadius || '',
		bottomLeft: stylesObj?.borderBottomLeftRadius || '',
	};
}

/**
 * Pick border-spacing style as object from style object.
 *
 * @param  stylesObj styles object.
 * @return border-spacing styles object.
 */
export function ***REMOVED***( stylesObj: Properties ): CrossProps {
	const ***REMOVED***: FourCssValues = parseCssValue( stylesObj.borderSpacing || '' );

	return {
		horizontal: ***REMOVED***[ 0 ],
		vertical: ***REMOVED***[ 1 ],
	};
}
