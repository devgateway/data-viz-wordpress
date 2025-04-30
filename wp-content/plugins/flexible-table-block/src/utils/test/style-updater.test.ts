/**
 * Internal dependencies
 */
import {
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
	updatePadding,
} from '../style-updater';

describe( 'style-updater', () => {
	describe( 'updatePadding', () => {
		it( 'should pass through if 2nd arg is undefined', () => {
			expect( updatePadding( { padding: '15px', color: 'red' }, undefined ) ).toStrictEqual( {
				padding: '15px',
				color: 'red',
			} );
		} );

		it( 'should remove padding props', () => {
			expect( updatePadding( { padding: '15px', color: 'red' }, {} ) ).toStrictEqual( {
				color: 'red',
			} );
		} );

		it( 'should return a long hand', () => {
			expect( updatePadding( {}, { top: '20px' } ) ).toStrictEqual( {
				paddingTop: '20px',
			} );
		} );

		it( 'should return a short hand', () => {
			expect(
				updatePadding( {}, { top: '20px', right: '20px', left: '20px', bottom: '20px' } )
			).toStrictEqual( {
				padding: '20px',
			} );
		} );

		it( 'should return a short hand 2value', () => {
			expect(
				updatePadding( {}, { top: '20px', right: '30px', left: '30px', bottom: '20px' } )
			).toStrictEqual( {
				padding: '20px 30px',
			} );
		} );

		it( 'should return a short hand 3value', () => {
			expect(
				updatePadding( {}, { top: '20px', right: '30px', left: '30px', bottom: '40px' } )
			).toStrictEqual( {
				padding: '20px 30px 40px',
			} );
		} );

		it( 'should return a short hand 4value', () => {
			expect(
				updatePadding( {}, { top: '20px', right: '30px', left: '40px', bottom: '50px' } )
			).toStrictEqual( {
				padding: '20px 30px 50px 40px',
			} );
		} );
	} );

	describe( '***REMOVED***', () => {
		it( 'should pass through if 2nd arg is undefined', () => {
			expect( ***REMOVED***( { borderWidth: '15px', color: 'red' }, undefined ) ).toStrictEqual(
				{
					borderWidth: '15px',
					color: 'red',
				}
			);
		} );

		it( 'should remove padding props', () => {
			expect( ***REMOVED***( { borderWidth: '15px', color: 'red' }, {} ) ).toStrictEqual( {
				color: 'red',
			} );
		} );

		it( 'should return a long hand', () => {
			expect( ***REMOVED***( {}, { top: '20px' } ) ).toStrictEqual( {
				***REMOVED***: '20px',
			} );
		} );

		it( 'should return a short hand', () => {
			expect(
				***REMOVED***( {}, { top: '20px', right: '20px', bottom: '20px', left: '20px' } )
			).toStrictEqual( {
				borderWidth: '20px',
			} );
		} );

		it( 'should return a short hand 2value', () => {
			expect(
				***REMOVED***( {}, { top: '20px', right: '30px', bottom: '20px', left: '30px' } )
			).toStrictEqual( {
				borderWidth: '20px 30px',
			} );
		} );

		it( 'should return a short hand 3value', () => {
			expect(
				***REMOVED***( {}, { top: '20px', right: '30px', left: '30px', bottom: '40px' } )
			).toStrictEqual( {
				borderWidth: '20px 30px 40px',
			} );
		} );

		it( 'should return a short hand 4value', () => {
			expect(
				***REMOVED***( {}, { top: '20px', right: '30px', left: '40px', bottom: '50px' } )
			).toStrictEqual( {
				borderWidth: '20px 30px 50px 40px',
			} );
		} );
	} );

	describe( '***REMOVED***', () => {
		it( 'should pass through if 2nd arg is undefined', () => {
			expect( ***REMOVED***( { borderColor: 'red', color: 'red' }, undefined ) ).toStrictEqual(
				{
					borderColor: 'red',
					color: 'red',
				}
			);
		} );

		it( 'should remove padding props', () => {
			expect( ***REMOVED***( { borderColor: 'red', color: 'red' }, {} ) ).toStrictEqual( {
				color: 'red',
			} );
		} );

		it( 'should return a long hand', () => {
			expect( ***REMOVED***( {}, { top: 'red' } ) ).toStrictEqual( {
				***REMOVED***: 'red',
			} );
		} );

		it( 'should return a short hand', () => {
			expect(
				***REMOVED***( {}, { top: 'red', right: 'red', left: 'red', bottom: 'red' } )
			).toStrictEqual( {
				borderColor: 'red',
			} );
		} );

		it( 'should return a short hand 2value', () => {
			expect(
				***REMOVED***( {}, { top: 'red', right: 'blue', left: 'blue', bottom: 'red' } )
			).toStrictEqual( {
				borderColor: 'red blue',
			} );
		} );

		it( 'should return a short hand 3value', () => {
			expect(
				***REMOVED***( {}, { top: 'red', right: 'blue', left: 'blue', bottom: 'yellow' } )
			).toStrictEqual( {
				borderColor: 'red blue yellow',
			} );
		} );

		it( 'should return a short hand 4value', () => {
			expect(
				***REMOVED***( {}, { top: 'red', right: 'blue', left: 'green', bottom: 'yellow' } )
			).toStrictEqual( {
				borderColor: 'red blue yellow green',
			} );
		} );
	} );

	describe( '***REMOVED***', () => {
		it( 'should pass through if 2nd arg is undefined', () => {
			expect(
				***REMOVED***( { borderStyle: 'solid', color: 'red' }, undefined )
			).toStrictEqual( {
				borderStyle: 'solid',
				color: 'red',
			} );
		} );

		it( 'should remove borderStyle props', () => {
			expect( ***REMOVED***( { borderStyle: 'solid', color: 'red' }, {} ) ).toStrictEqual( {
				color: 'red',
			} );
		} );

		it( 'should return a long hand', () => {
			expect( ***REMOVED***( {}, { top: 'solid' } ) ).toStrictEqual( {
				***REMOVED***: 'solid',
			} );
		} );

		it( 'should return a short hand', () => {
			expect(
				***REMOVED***( {}, { top: 'solid', right: 'solid', left: 'solid', bottom: 'solid' } )
			).toStrictEqual( {
				borderStyle: 'solid',
			} );
		} );

		it( 'should return a short hand 2value', () => {
			expect(
				***REMOVED***( {}, { top: 'solid', right: 'dotted', left: 'dotted', bottom: 'solid' } )
			).toStrictEqual( {
				borderStyle: 'solid dotted',
			} );
		} );

		it( 'should return a short hand 3value', () => {
			expect(
				***REMOVED***( {}, { top: 'solid', right: 'dotted', left: 'dotted', bottom: 'dashed' } )
			).toStrictEqual( {
				borderStyle: 'solid dotted dashed',
			} );
		} );

		it( 'should return a short hand 4value', () => {
			expect(
				***REMOVED***( {}, { top: 'solid', right: 'dotted', left: 'double', bottom: 'dashed' } )
			).toStrictEqual( {
				borderStyle: 'solid dotted dashed double',
			} );
		} );
	} );

	describe( '***REMOVED***', () => {
		it( 'should pass through if 2nd arg is undefined', () => {
			expect(
				***REMOVED***( { borderSpacing: '10px', color: 'red' }, undefined )
			).toStrictEqual( {
				borderSpacing: '10px',
				color: 'red',
			} );
		} );

		it( 'should remove borderSpacing props', () => {
			expect( ***REMOVED***( { borderSpacing: '10px', color: 'red' }, {} ) ).toStrictEqual( {
				color: 'red',
			} );
		} );

		it( 'should return one value', () => {
			expect( ***REMOVED***( {}, { vertical: '10px', horizontal: '10px' } ) ).toStrictEqual( {
				borderSpacing: '10px',
			} );
		} );

		it( 'should return two values', () => {
			expect( ***REMOVED***( {}, { vertical: '20px', horizontal: '10px' } ) ).toStrictEqual( {
				borderSpacing: '10px 20px',
			} );
		} );
	} );

	describe( '***REMOVED***', () => {
		it( 'should pass through if 2nd arg is undefined', () => {
			expect(
				***REMOVED***( { borderRadius: '15px', color: 'red' }, undefined )
			).toStrictEqual( {
				borderRadius: '15px',
				color: 'red',
			} );
		} );

		it( 'should remove borderRadius props', () => {
			expect( ***REMOVED***( { borderRadius: '15px', color: 'red' }, {} ) ).toStrictEqual( {
				color: 'red',
			} );
		} );

		it( 'should return a long hand', () => {
			expect( ***REMOVED***( {}, { topLeft: '20px' } ) ).toStrictEqual( {
				***REMOVED***: '20px',
			} );
		} );

		it( 'should return a short hand', () => {
			expect(
				***REMOVED***(
					{},
					{ topLeft: '20px', topRight: '20px', bottomRight: '20px', bottomLeft: '20px' }
				)
			).toStrictEqual( {
				borderRadius: '20px',
			} );
		} );

		it( 'should return a short hand 2value', () => {
			expect(
				***REMOVED***(
					{},
					{ topLeft: '20px', topRight: '30px', bottomRight: '20px', bottomLeft: '30px' }
				)
			).toStrictEqual( {
				borderRadius: '20px 30px',
			} );
		} );

		it( 'should return a short hand 3value', () => {
			expect(
				***REMOVED***(
					{},
					{ topLeft: '2px', topRight: '4px', bottomRight: '3px', bottomLeft: '4px' }
				)
			).toStrictEqual( {
				borderRadius: '2px 4px 3px',
			} );
		} );

		it( 'should return a short hand 4value', () => {
			expect(
				***REMOVED***(
					{},
					{ topLeft: '2px', topRight: '3px', bottomRight: '4px', bottomLeft: '5px' }
				)
			).toStrictEqual( {
				borderRadius: '2px 3px 4px 5px',
			} );
		} );
	} );
} );
