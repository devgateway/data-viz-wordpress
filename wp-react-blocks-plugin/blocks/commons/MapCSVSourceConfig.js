import {PanelBody, PanelRow, ToggleControl, ***REMOVED***, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';


const CSVConfig = ({attributes:{app,  csv, ***REMOVED***, ***REMOVED***},setAttributes}) => {

    return (
        [<PanelBody initialOpen={false} title={__("CSV Configuration")}>
            <PanelRow>
                <ToggleControl
                    label="Has Multiple Measures"
                    checked={***REMOVED***}
                    onChange={() => setAttributes({ ***REMOVED***: !***REMOVED*** })}
                />
            </PanelRow>               
            <PanelRow>
                <***REMOVED***
                    label={__("CSV Data")}
                    value={csv}
                    onChange={(csv) => setAttributes({ csv })}
                />
            </PanelRow>
        </PanelBody>     
        ]
    )

}

export default CSVConfig