import {PanelBody, PanelRow, ***REMOVED***} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import Format from "../charts/Format.jsx";
import {togglePanel} from "./Util";


const CSVConfig = ({attributes: {csv, panelStatus, measures}, setAttributes}) => {


    const ***REMOVED*** = (format) => {
        
        setAttributes({measures: {csv: {format}}})

    }


    return (
        [<PanelBody title={__("CSV Configuration")}
                    initialOpen={panelStatus["csv_cfg"]}
                    onToggle={e => togglePanel("csv_cfg",panelStatus,setAttributes)}>
            <PanelRow>
                <***REMOVED***
                    label={__("CSV Data")}
                    value={csv}
                    onChange={(csv) => setAttributes({csv})}
                />
            </PanelRow>

            <Format
                format={measures["csv"] ? measures["csv"].format : {}}
                ***REMOVED***={format => {
                    ***REMOVED***(format)
                }}>
            </Format>
        </PanelBody>
        ]
    )

}

export default CSVConfig