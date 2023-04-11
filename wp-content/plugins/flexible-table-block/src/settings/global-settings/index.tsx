/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
// @ts-ignore: has no exported member
import { store as coreStore } from '@wordpress/core-data';
import { Button, Spinner } from '@wordpress/components';
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
		( select ) => select( STORE_NAME ).getOptions(),
		[]
	);

	const ***REMOVED***: boolean = useSelect(
		( select ) =>
			// @ts-ignore
			select( coreStore ).canUser( 'create', 'users' ),
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
			<div className="ftb-global-setting">
				<Button icon={ help } variant="link" onClick={ () => ***REMOVED***( true ) }>
					{ __( 'Help', 'flexible-table-block' ) }
				</Button>
				{ ! isGlobalSettingLoaded && <Spinner /> }
				{ isGlobalSettingLoaded && ***REMOVED*** && (
					<Button
						icon={ cog }
						iconSize="20"
						variant="primary"
						onClick={ () => setIsSettingModalOpen( true ) }
					>
						{ __( 'Global setting', 'flexible-table-block' ) }
					</Button>
				) }
			</div>
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
