import {__} from '@wordpress/i18n';
import {***REMOVED***, PanelBody, PanelRow, ToggleControl} from '@wordpress/components';
import {***REMOVED***} from "../commons/APIutils";


const Measures = (props) => {
    const {
        currentType,
        ***REMOVED***,
        ***REMOVED***,
        allMeasures,
        setAttributes,
        attributes: {
            measures,
            dimension2,
        }
    } = props


    const MeasureToggle = ({measure}) => {
        return (<ToggleControl
            label={measure.label}
            checked={measures.indexOf(measure.value) > -1}
            onChange={(value) => ***REMOVED***(measure.value)}/>)
    }
    const ***REMOVED*** = ({measure}) => {
        return <***REMOVED***
            label={measure.label}
            checked={measures.indexOf(measure.value) > -1}
            onChange={(value) => ***REMOVED***(measure.value)}/>
    }

      
    return <PanelBody initialOpen={false} title={__("Measures")}>
              {
            [...new Set(allMeasures.map(p => ***REMOVED***(p.group)))].map(g => {
                    return (<PanelBody title={g}>
                            {allMeasures.filter(f => ***REMOVED***(f.group) === g).map(m => <PanelRow><***REMOVED***
                                measure={m}></***REMOVED***></PanelRow>)}
                        </PanelBody>
                    )
                }
            )
            }
    </PanelBody>
}


export default Measures