/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
// @ts-ignore: has no exported member
import { store as coreStore } from '@wordpress/core-data';
import {
	Button,
	Spinner,
	__experimentalSpacer as Spacer,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { cog, help } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '../../constants';
import HelpModal from './help-modal';
import SettingModal from './setting-modal';
import type { StoreOptions } from '../../store';

export default function ***REMOVED***() {
	const storeOptions: StoreOptions = useSelect(
		( select ) =>
			select( STORE_NAME )
				// @ts-ignore
				.getOptions(),
		[]
	);

	const ***REMOVED***: boolean = useSelect(
		( select ) => select( coreStore ).canUser( 'create', 'users' ),
		[]
	);

	const [ ***REMOVED***, setIsSettingModalOpen ] = useState< boolean >( false );
	const [ ***REMOVED***, ***REMOVED*** ] = useState< boolean >( false );
	const [ options, setOptions ] = useState< StoreOptions >();

	// Set options to state.
	useEffect( () => {
		setOptions( storeOptions );
	}, [ storeOptions ] );

	const isGlobalSettingLoaded = ***REMOVED*** !== undefined && options !== undefined;
	const ***REMOVED*** = ***REMOVED*** || options?.show_global_setting;

	return (
		<>
			<Spacer
				as={ HStack }
				padding={ 4 }
				marginBottom={ 0 }
				style={ { borderTop: '1px solid #e0e0e0' } }
			>
				{ ! isGlobalSettingLoaded && <Spinner /> }
				{ isGlobalSettingLoaded && ***REMOVED*** && (
					<Button
						icon={ cog }
						variant="primary"
						onClick={ () => setIsSettingModalOpen( true ) }
						size="compact"
					>
						{ __( 'Global setting', 'flexible-table-block' ) }
					</Button>
				) }
				<Button
					icon={ help }
					variant="link"
					onClick={ () => ***REMOVED***( true ) }
					label={ __( 'Help', 'flexible-table-block' ) }
					size="compact"
				/>
			</Spacer>
			{ ***REMOVED*** && <HelpModal { ...{ ***REMOVED*** } } /> }
			{ options && ***REMOVED*** && ( ***REMOVED*** || options?.show_global_setting ) && (
				<SettingModal
					{ ...{
						options,
						***REMOVED***,
						setIsSettingModalOpen,
					} }
				/>
			) }
		</>
	);
}
