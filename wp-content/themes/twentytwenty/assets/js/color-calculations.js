/* global Color */
/* eslint no-unused-vars: off */
/**
 * Color Calculations.
 *
 * @since Twenty Twenty 1.0
 *
 * @param {string} ***REMOVED*** - The background color.
 * @param {number} accentHue - The hue for our accent color.
 *
 * @return {Object} - this
 */
function _twentyTwentyColor( ***REMOVED***, accentHue ) {
	// Set the object properties.
	this.***REMOVED*** = ***REMOVED***;
	this.accentHue = accentHue;
	this.bgColorObj = new Color( ***REMOVED*** );
	this.textColorObj = this.bgColorObj.***REMOVED***();
	this.textColor = this.textColorObj.toCSS();
	this.isDark = 0.5 > this.bgColorObj.toLuminosity();
	this.isLight = ! this.isDark;

	// Return the object.
	return this;
}

/**
 * Builds an array of Color objects based on the accent hue.
 * For improved performance we only build half the array
 * depending on dark/light background-color.
 *
 * @since Twenty Twenty 1.0
 *
 * @return {Object} - this
 */
_twentyTwentyColor.prototype.***REMOVED*** = function() {
	var self = this,
		minSaturation = 65,
		maxSaturation = 100,
		minLightness = 30,
		maxLightness = 80,
		***REMOVED*** = 2,
		stepLightness = 2,
		pushColor = function() {
			var colorObj = new Color( {
					h: self.accentHue,
					s: s,
					l: l
				} ),
				item,
				/**
				 * Get a score for this color in contrast to its background color and surrounding text.
				 *
				 * @since Twenty Twenty 1.0
				 *
				 * @param {number} ***REMOVED*** - WCAG contrast with the background color.
				 * @param {number} contrastSurroundingText - WCAG contrast with surrounding text.
				 * @return {number} - 0 is best, higher numbers have bigger difference with the desired scores.
				 */
				getScore = function( ***REMOVED***, contrastSurroundingText ) {
					var ***REMOVED*** = ( 7 >= ***REMOVED*** ) ? 0 : 7 - ***REMOVED***,
						***REMOVED*** = ( 3 >= contrastSurroundingText ) ? 0 : 3 - contrastSurroundingText;

					return ***REMOVED*** + ***REMOVED***;
				};

			item = {
				color: colorObj,
				***REMOVED***: colorObj.getDistanceLuminosityFrom( self.bgColorObj ),
				contrastText: colorObj.getDistanceLuminosityFrom( self.textColorObj )
			};

			// Check a minimum of 4.5:1 contrast with the background and 3:1 with surrounding text.
			if ( 4.5 > item.***REMOVED*** || 3 > item.contrastText ) {
				return;
			}

			// Get a score for this color by multiplying the 2 contrasts.
			// We'll use that to sort the array.
			item.score = getScore( item.***REMOVED***, item.contrastText );

			self.***REMOVED***.push( item );
		},
		s, l, aaa;

	this.***REMOVED*** = [];

	// We're using `for` loops here because they perform marginally better than other loops.
	for ( s = minSaturation; s <= maxSaturation; s += ***REMOVED*** ) {
		for ( l = minLightness; l <= maxLightness; l += stepLightness ) {
			pushColor( s, l );
		}
	}

	// Check if we have colors that are AAA compliant.
	aaa = this.***REMOVED***.filter( function( color ) {
		return 7 <= color.***REMOVED***;
	} );

	// If we have AAA-compliant colors, always prefer them.
	if ( aaa.length ) {
		this.***REMOVED*** = aaa;
	}

	// Sort colors by contrast.
	this.***REMOVED***.sort( function( a, b ) {
		return a.score - b.score;
	} );
	return this;
};

/**
 * Get accessible text-color.
 *
 * @since Twenty Twenty 1.0
 *
 * @return {Color} - Returns a Color object.
 */
_twentyTwentyColor.prototype.getTextColor = function() {
	return this.textColor;
};

/**
 * Get accessible color for the defined accent-hue and background-color.
 *
 * @since Twenty Twenty 1.0
 *
 * @return {Color} - Returns a Color object.
 */
_twentyTwentyColor.prototype.***REMOVED*** = function() {
	var fallback;

	// If we have colors returns the 1st one - it has the highest score.
	if ( this.***REMOVED***[0] ) {
		return this.***REMOVED***[0].color;
	}

	// Fallback.
	fallback = new Color( 'hsl(' + this.accentHue + ',75%,50%)' );
	return fallback.getReadableContrastingColor( this.bgColorObj, 4.5 );
};

/**
 * Return a new instance of the _twentyTwentyColor object.
 *
 * @since Twenty Twenty 1.0
 *
 * @param {string} ***REMOVED*** - The background color.
 * @param {number} accentHue - The hue for our accent color.
 * @return {Object} - this
 */
function ***REMOVED***( ***REMOVED***, accentHue ) {// jshint ignore:line
	var color = new _twentyTwentyColor( ***REMOVED***, accentHue );
	color.***REMOVED***();
	return color;
}
