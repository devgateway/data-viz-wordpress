/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	ViewBox,
	TopStroke,
	RightStroke,
	BottomStroke,
	LeftStroke,
	TopLeftStroke,
	***REMOVED***,
	***REMOVED***,
	***REMOVED***,
} from './styles';
import type { SideValue, CornerValue, ***REMOVED*** } from '../***REMOVED***';

export function ***REMOVED***( { sides }: { sides?: SideValue[] } ) {
	const top: boolean = ! sides || sides.includes( 'top' );
	const right: boolean = ! sides || sides.includes( 'right' );
	const bottom: boolean = ! sides || sides.includes( 'bottom' );
	const left: boolean = ! sides || sides.includes( 'left' );

	return (
		<ViewBox>
			<TopStroke isFocused={ top } />
			<RightStroke isFocused={ right } />
			<BottomStroke isFocused={ bottom } />
			<LeftStroke isFocused={ left } />
		</ViewBox>
	);
}

export function CornerIndicatorControl( { corners }: { corners?: CornerValue[] } ) {
	const topLeft = ! corners || corners.includes( 'topLeft' );
	const topRight = ! corners || corners.includes( 'topRight' );
	const bottomRight = ! corners || corners.includes( 'bottomRight' );
	const bottomLeft = ! corners || corners.includes( 'bottomLeft' );

	return (
		<ViewBox>
			<TopLeftStroke isFocused={ topLeft } />
			<***REMOVED*** isFocused={ topRight } />
			<***REMOVED*** isFocused={ bottomRight } />
			<***REMOVED*** isFocused={ bottomLeft } />
		</ViewBox>
	);
}

export function DirectionIndicatorControl( { directions }: { directions?: ***REMOVED***[] } ) {
	const horizontal = ! directions || directions.includes( 'horizontal' );
	const vertical = ! directions || directions.includes( 'vertical' );

	return (
		<ViewBox>
			<TopStroke isFocused={ vertical } />
			<RightStroke isFocused={ horizontal } />
			<BottomStroke isFocused={ vertical } />
			<LeftStroke isFocused={ horizontal } />
		</ViewBox>
	);
}
