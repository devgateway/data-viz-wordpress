import {__} from '@wordpress/i18n';
import {***REMOVED***, PanelBody, PanelRow, SelectControl, ToggleControl} from '@wordpress/components';

import Format from '../charts/Format.jsx'
import {togglePanel} from "../commons/Util";
import {***REMOVED***} from "../commons/APIutils";

const defaultFormat = {
    "style": "percent",
    "minimumFractionDigits": 1,
    "maximumFractionDigits": 1,
    "currency": "USD"

}

const Measures = (props) => {
    const {
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***,
        allMeasures,
        setAttributes,
        panelStatus,
        layer: {
            measures,
            app
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
        if (measures[app]) {
            const mG = allMeasures.filter(f => ***REMOVED***(f.group) === g)
            let count = 0
            Object.keys(measures[app]).filter(l => mG.map(m => m.value).indexOf(l) > -1).forEach(k => {
                if (measures[app][k].selected) {
                    count++
                }
            })
            return count
        }
        return 0
    }
    const countTotal = (g) => {
        if (g) {
            return allMeasures.filter(f => f.group.label === g.label).length
        }

        return 0
    }

    return <PanelBody title={__("Measures")}>
        {allMeasures && [...new Set(allMeasures.map(p => ***REMOVED***(p.group)))].map(g => {
                return (<PanelBody
                    onToggle={e => togglePanel(g, panelStatus, setAttributes)}
                    title={`${g} (${countSelected(g)} / ${allMeasures.filter(f => f.group === g).length} ) `}>
                    {allMeasures.filter(f => ***REMOVED***(f.group) === g)
                        .map(m => <PanelRow>
                            <PanelRow>
                                <MCheckbox measure={m}></MCheckbox>
                            </PanelRow>
                        </PanelRow>)}
                </PanelBody>)
            })}

        <Format
            format={measures[app] && measures[app].format ? measures[app].format : defaultFormat}
            ***REMOVED***={format => {
                ***REMOVED***(format)
            }}>
        </Format>

    </PanelBody>
}


export default Measures