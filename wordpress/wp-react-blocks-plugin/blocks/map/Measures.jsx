import {__} from '@wordpress/i18n';
import {***REMOVED***, PanelBody, PanelRow, ToggleControl, TextControl} from '@wordpress/components';
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
            ***REMOVED***
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

    const onCustomLabelToggleChange = (measure) => {
        let newCustomMeasureLabels = {...***REMOVED***}
        if (newCustomMeasureLabels[measure]) {
            newCustomMeasureLabels[measure].***REMOVED*** = !newCustomMeasureLabels[measure].***REMOVED***
        } else {
            newCustomMeasureLabels[measure] = {***REMOVED***: true, customLabel: ""}
        }
        setAttributes({***REMOVED***: newCustomMeasureLabels})
    }

    const ***REMOVED*** = (measure, value) => {
        let newCustomMeasureLabels = {...***REMOVED***}
        if (newCustomMeasureLabels[measure]) {
            newCustomMeasureLabels[measure].customLabel = value
        } else {
            newCustomMeasureLabels[measure] = {***REMOVED***: true, customLabel: value}
        }
        setAttributes({***REMOVED***: newCustomMeasureLabels})
    }


    return <><PanelBody initialOpen={false} title={__("Measures")}>
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
        {measures && measures.length > 0 &&
        <PanelBody initialOpen={false} title={__("Measure Label Customization")}>    {
            [...new Set(allMeasures.filter(p => measures && measures.indexOf(p.value) != -1).map(p => ***REMOVED***(p.group)))].map(g => {
                return (<PanelBody title={g}>
                    {allMeasures.filter(f => ***REMOVED***(f.group) === g && measures && measures.indexOf(f.value) != -1).map(m =>
                        <>
                            <PanelRow>
                                <ToggleControl
                                    label={***REMOVED***(m)}
                                    checked={***REMOVED*** && ***REMOVED***[m.value] ? ***REMOVED***[m.value].***REMOVED*** : false}
                                    onChange={(value) => onCustomLabelToggleChange(m.value)} /> </PanelRow>
                            {***REMOVED*** && ***REMOVED***[m.value] && ***REMOVED***[m.value].***REMOVED*** &&
                                <PanelRow>
                                    <TextControl label={__("Custom Label")} value={***REMOVED*** && ***REMOVED***[m.value] ? ***REMOVED***[m.value].customLabel : ""} onChange={(value) => ***REMOVED***(m.value, value)} />
                                </PanelRow>}
                        </>)}
                </PanelBody>
                )
            }
            )
        }
        </PanelBody>
       }
    </>
}


export default Measures