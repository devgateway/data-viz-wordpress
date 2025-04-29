import React from 'react';
import {PanelBody, PanelRow, ***REMOVED***} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import Format from "./Format";
import {togglePanel} from "./Util";

const defaultFormat = {
    "style": "percent",
    "minimumFractionDigits": 1,
    "maximumFractionDigits": 1,
    "currency": "USD"     
}

export const CSVConfig = ({attributes: {csv, panelStatus, measures, type}, setAttributes}) => {

    const ***REMOVED*** = (format, field) => {           
        const app = "csv"
        const uMs = measures ? JSON.parse(JSON.stringify(measures)) : {}
        if (!uMs[app]) {
            uMs[app] = {***REMOVED***: false, format: Object.assign({}, defaultFormat), customFormat: Object.assign({}, {...defaultFormat}), selected: false}
        }     
        uMs[app][field] = format
        setAttributes({measures: uMs})

        
    }

   const onUseCustomAxisFormatChange = (value) =>{
        const app = "csv"
        const uMs = measures ? JSON.parse(JSON.stringify(measures)) : {}
        if (uMs[app]) {
            uMs[app].***REMOVED*** = value

            if (!uMs[app].customFormat) {
                uMs[app].customFormat = Object.assign({}, {...defaultFormat})
            } 
            setAttributes({ measures: uMs })
        }  else {
            uMs[app] = {***REMOVED***: false, format: Object.assign({}, {...defaultFormat}), customFormat: Object.assign({}, {...defaultFormat}), selected: false}
            uMs[app].***REMOVED*** = value
            setAttributes({ measures: uMs })
        }

    }

    return (
        [<PanelBody initialOpen={false} title={__("CSV Configuration")}
                    onToggle={e => togglePanel("csv_cfg",panelStatus,setAttributes)}>
            <PanelRow>
                <***REMOVED***
                    label={__("CSV Data")}
                    value={csv}
                    onChange={(csv) => setAttributes({csv})}
                />
            </PanelRow>

            <Format
                hiddenCustomAxisFormat={type=='radar' || type=='big-number'}              
                format={measures["csv"] && measures["csv"].format ? measures["csv"].format : {}}
                customFormat={measures["csv"] && measures["csv"].customFormat ? measures["csv"].customFormat : {}}
                ***REMOVED***={measures["csv"] ? measures["csv"].***REMOVED*** : false}
                ***REMOVED***={(newFormat, field) => {
                    ***REMOVED***(newFormat, field)
                }}
                onUseCustomAxisFormatChange = {value => {
                    onUseCustomAxisFormatChange(value)
                }}
                >
            </Format>
        </PanelBody>
        ]
    )

}

export default CSVConfig