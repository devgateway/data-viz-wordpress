import React from 'react';
import {PanelBody, PanelRow, ToggleControl, TextareaControl, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';


export type MapCSVSourceConfigProps = {
    attributes: {
        app: string;
        csv: string;
        hasMultipleMeasures: boolean;
        enableSummaryView: boolean;
    };
    setAttributes: (attributes: any) => void;
}
    
export const MapCSVSourceConfig = ({attributes:{app,  csv, hasMultipleMeasures, enableSummaryView},setAttributes}: MapCSVSourceConfigProps) => {

    return (
        [<PanelBody initialOpen={false} title={__("CSV Configuration")}>
            <PanelRow>
                <ToggleControl
                    label="Has Multiple Measures"
                    checked={hasMultipleMeasures}
                    onChange={() => setAttributes({ hasMultipleMeasures: !hasMultipleMeasures })}
                />
            </PanelRow>               
            <PanelRow>
                <TextareaControl
                    label={__("CSV Data")}
                    value={csv}
                    onChange={(csv) => setAttributes({ csv })}
                />
            </PanelRow>
        </PanelBody>     
        ]
    )

}

export default MapCSVSourceConfig