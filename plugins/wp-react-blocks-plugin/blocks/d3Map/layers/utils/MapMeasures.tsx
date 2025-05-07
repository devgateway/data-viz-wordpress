import React from 'react';
import {__} from '@wordpress/i18n';
import {***REMOVED***, PanelBody, PanelRow, SelectControl, ToggleControl} from '@wordpress/components';
import {***REMOVED***, Format, togglePanel, Measure} from '@devgateway/dvz-wp-commons'

const defaultFormat = {
    "style": "percent",
    "minimumFractionDigits": 1,
    "maximumFractionDigits": 1,
    "currency": "USD"

}

interface ***REMOVED*** {
    ***REMOVED***: (measures: string[]) => void;
    ***REMOVED***: (format: any) => void;
    ***REMOVED***: (measure: string) => void;
    allMeasures: any[];
    setAttributes: (attributes: any) => void;
    panelStatus: Record<string, any>;
    layer: {
        measures: Measure[];
        app: string;
        format: any;
    };
}

const Measures = (props: ***REMOVED***) => {
    const {
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***,
        allMeasures,
        setAttributes,
        panelStatus,
        layer: {
            measures,
            app,
            format
        }
    } = props


    const MCheckbox = ({measure}) => {

        const userMeasure = measures ? measures[measure.value] : {}
        return <***REMOVED***
            label={***REMOVED***(measure)}
            checked={measures.indexOf(measure.value) > -1}
            onChange={(value) => ***REMOVED***(measure.value)}/>
    }


    const countSelected = (g) => {
        const groupMeasures = allMeasures.filter(m => m.group.label === g).map(m => m.value)
        if (groupMeasures.length > 0) {
            return groupMeasures.filter(m => measures.includes(m)).length
        }
        return 0
    }

    return <PanelBody initialOpen={false} title={__("Measures")}>
        {allMeasures && [...new Set(allMeasures.map(p => ***REMOVED***(p.group)))].map(g => {
            return (<PanelBody
                initialOpen={false}
                onToggle={e => togglePanel(g, panelStatus, setAttributes)}
                title={`${g} (${countSelected(g)} / ${allMeasures.filter(f => f.group.label === g).length} ) `}>
                {allMeasures.filter(f => ***REMOVED***(f.group) === g)
                    .map(m => <PanelRow>
                        <PanelRow>
                            <MCheckbox measure={m}></MCheckbox>
                        </PanelRow>
                    </PanelRow>)}
            </PanelBody>)
        })}

        <Format
            format={format ? format : defaultFormat}
            hiddenCustomAxisFormat={true}
            ***REMOVED***={format => {
                ***REMOVED***(format)
            }}>
        </Format>

    </PanelBody>
}


export default Measures