import { ***REMOVED***, ***REMOVED*** } from '../style-converter';

describe( 'style-converter', () => {
	describe( '***REMOVED***', () => {
		it( 'should convert inline style to object', () => {
			expect(
				***REMOVED***( `
				background: red;
				border-radius: 10px;
				border-right: 1px solid blue;
			` )
			).toStrictEqual( {
				background: 'red',
				borderRadius: '10px',
				borderRight: '1px solid blue',
			} );
		} );
	} );

	describe( '***REMOVED***', () => {
		it( 'should convert object to inline', () => {
			expect(
				***REMOVED***( {
					background: 'red',
					borderRadius: '10px',
					borderRight: '1px solid blue',
				} )
			).toBe( 'background:red;border-radius:10px;border-right:1px solid blue;' );
		} );
	} );
} );
