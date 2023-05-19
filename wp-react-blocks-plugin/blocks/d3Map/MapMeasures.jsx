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
        title,
        panelStatus,
        layer: {
            measures,
            dimension1,
            dimension2,
            type,
            app
        }
    } = props


    const MToggle = ({measure}) => {
        const userMeasure = measures[app] ? measures[app][measure.value] : {}

        return (<ToggleControl
            label={***REMOVED***(measure)}
            checked={userMeasure ? userMeasure.selected : false}
            onChange={(value) => ***REMOVED***(measure.value)}/>)
    }

    const MCheckbox = ({measure}) => {
        const userMeasure = measures[app] ? measures[app][measure.value] : {}
        return <***REMOVED***
            label={***REMOVED***(measure)}
            checked={userMeasure ? userMeasure.selected : false}
            onChange={(value) => ***REMOVED***(measure.value)}/>
    }


    const ***REMOVED*** = ({measure, single}) => {
        return <PanelRow>
            {single && <MCheckbox measure={measure}></MCheckbox>}
            {!single && <MToggle measure={measure}></MToggle>}
        </PanelRow>

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
                            <***REMOVED*** single={true} measure={m}></***REMOVED***>
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