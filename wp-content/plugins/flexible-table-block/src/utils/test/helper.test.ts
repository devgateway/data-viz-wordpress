import { parseCssValue, parseUnit, ***REMOVED***, toInteger } from '../helper';

describe( 'helper', () => {
	describe( 'parseCssValue', () => {
		it( 'should return array with four values', () => {
			expect( parseCssValue( '' ) ).toStrictEqual( [ '', '', '', '' ] );
			expect( parseCssValue( '10px' ) ).toStrictEqual( [ '10px', '10px', '10px', '10px' ] );
			expect( parseCssValue( '10px 20em' ) ).toStrictEqual( [ '10px', '20em', '10px', '20em' ] );
			expect( parseCssValue( '10px 20em 30.11%' ) ).toStrictEqual( [
				'10px',
				'20em',
				'30.11%',
				'20em',
			] );
			expect( parseCssValue( '10px 20em 30.11% 40CM' ) ).toStrictEqual( [
				'10px',
				'20em',
				'30.11%',
				'40cm',
			] );
		} );
	} );

	describe( '***REMOVED***', () => {
		it( 'should not change the correct value', () => {
			expect( ***REMOVED***( '10px' ) ).toBe( '10px' );
			expect( ***REMOVED***( '10%' ) ).toBe( '10%' );
		} );

		it( 'should remove the unit for zero', () => {
			expect( ***REMOVED***( '0px' ) ).toBe( '0' );
			expect( ***REMOVED***( '0%' ) ).toBe( '0' );
		} );

		it( 'should return lowercase unit', () => {
			expect( ***REMOVED***( '10PX' ) ).toBe( '10px' );
			expect( ***REMOVED***( '10CM' ) ).toBe( '10cm' );
		} );

		it( 'should return empty string if it is not a number or minus value', () => {
			expect( ***REMOVED***( '' ) ).toBe( '' );
			expect( ***REMOVED***( '-10rem' ) ).toBe( '' );
			expect( ***REMOVED***( 'red' ) ).toBe( '' );
		} );

		it( 'should return minNum option value if minNum option is set', () => {
			expect( ***REMOVED***( '10px', { minNum: 40 } ) ).toBe( '40px' );
			expect( ***REMOVED***( '20.11%', { minNum: 40 } ) ).toBe( '40%' );
		} );

		it( 'should return maxNum option value if maxNum option is set', () => {
			expect( ***REMOVED***( '40em', { maxNum: 10 } ) ).toBe( '10em' );
			expect( ***REMOVED***( '20.11px', { maxNum: 10 } ) ).toBe( '10px' );
		} );

		it( 'should return truncated value', () => {
			expect( ***REMOVED***( '10.11111111px' ) ).toBe( '10.1111px' );
		} );

		it( 'should return truncated value if precision option is set', () => {
			expect( ***REMOVED***( '10.11111111em', { precision: 6 } ) ).toBe( '10.111111em' );
		} );

		it( 'should return sanitized value if multiple option is set', () => {
			expect( ***REMOVED***( '10.11111111CM', { maxNum: 10 } ) ).toBe( '10cm' );
		} );
	} );

	describe( 'parseUnit', () => {
		it( 'should return taple', () => {
			expect( parseUnit( '10px' ) ).toStrictEqual( [ 10, 'px' ] );
			expect( parseUnit( '10%' ) ).toStrictEqual( [ 10, '%' ] );
		} );

		it( 'should return lowercase unit', () => {
			expect( parseUnit( '10PX' ) ).toStrictEqual( [ 10, 'px' ] );
			expect( parseUnit( '10CM' ) ).toStrictEqual( [ 10, 'cm' ] );
		} );

		it( 'should return zero if it is not a number.', () => {
			expect( parseUnit( 'red' ) ).toStrictEqual( [ 0, '' ] );
		} );
	} );

	describe( 'toInteger', () => {
		it( 'should return numbers as numbers', () => {
			expect( toInteger( 10 ) ).toStrictEqual( 10 );
			expect( toInteger( 2.71828 ) ).toStrictEqual( 2 );
		} );

		it( 'should convert string to number', () => {
			expect( toInteger( '20' ) ).toStrictEqual( 20 );
			expect( toInteger( '3.1415' ) ).toStrictEqual( 3 );
		} );

		it( 'should return the default value, if falsy is passed.', () => {
			expect( toInteger( '', 1 ) ).toStrictEqual( 1 );
			expect( toInteger( undefined, 5 ) ).toStrictEqual( 5 );
			expect( toInteger( 0, 5 ) ).toStrictEqual( 5 );
		} );
	} );
} );
