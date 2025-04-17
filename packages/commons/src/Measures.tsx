import React from 'react';
import { __ } from '@wordpress/i18n';
import { ***REMOVED***, PanelBody, PanelRow, SelectControl, ToggleControl, TextControl } from '@wordpress/components';

import Format from './Format'
import { togglePanel } from "./Util";
import { ***REMOVED*** } from "./APIutils";
import { Measure } from './types';

const defaultFormat = {
    "style": "percent",
    "minimumFractionDigits": 1,
    "maximumFractionDigits": 1,
    "currency": "USD"

}

export type MeasuresProps = {
    ***REMOVED***: (measure: string) => void;
    ***REMOVED***: (format: string, field: string) => void;
    onUseCustomAxisFormatChange: (value: boolean) => void;
    ***REMOVED***: (measure: string) => void;
    onCustomLabelToggleChange: (measure: string) => void;
    ***REMOVED***: (measure: string, value: string) => void;
    allMeasures: Measure[];
    setAttributes: (attributes: any) => void;
    title?: string;
    format?: any;
    currentType: string;
    attributes: {
        panelStatus?: any;
        measures: Measure[];
        dimension1: string;
        dimension2: string;
        type: string;
        app: string;
    }
}

export const Measures = (props: MeasuresProps) => {
    const {
        ***REMOVED***,
        ***REMOVED***,
        onUseCustomAxisFormatChange,
        ***REMOVED***,
        onCustomLabelToggleChange,
        ***REMOVED***,
        allMeasures,
        setAttributes,
        title,
        format,
        attributes: {
            panelStatus,
            measures,
            dimension1,
            dimension2,
            type,
            app
        }
    } = props


    const MToggle = ({ measure }) => {
        const userMeasure = measures[app] ? measures[app][measure.value] : {}

        return (<ToggleControl
            label={***REMOVED***(measure)}
            checked={userMeasure ? userMeasure.selected : false}
            onChange={(value) => ***REMOVED***(measure.value)} />)
    }

    const MCheckbox = ({ measure }) => {
        const userMeasure = measures[app] ? measures[app][measure.value] : {}
        let isChecked
        if (measures instanceof Array) {
            isChecked = measures.includes(measure.value)
        } else {
            isChecked = userMeasure ? userMeasure.selected : false
        }

        return <***REMOVED***
            label={***REMOVED***(measure)}
            checked={isChecked}
            onChange={(value) => ***REMOVED***(measure.value)} />
    }


    const ***REMOVED*** = ({ measure, single }) => {
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
            return allMeasures.filter(f => ***REMOVED***(f.group) === g).length
        }

        return 0
    }

    const ***REMOVED*** = () => {
        if (measures[app] && allMeasures) {
            return Object.keys(measures[app]).filter(k => measures[app][k].selected).map(k => {
                return allMeasures.filter(m => m.value === k)[0]
            }).filter(m => m)
        }
        return []
    }


    const ***REMOVED*** = ***REMOVED***()
    return <><PanelBody title={title ? title : __("Measures")} initialOpen={panelStatus["MEASURES"]}
        onToggle={e => togglePanel("MEASURES", panelStatus, setAttributes)}>

        {
            /*
             Multiple measures conditions

             Bar:
             no dimensions selected
             one dimension is selected
             -  not available when second dimension gets selected

             Line:
               - Always multi measure as measures represents line series, one dimension should always be selected

             Pie:
                  no dimensions selected
                   -  not available when any dimension is selected
             */

            ((type == 'line') || (type == 'radar') ||
                (type == 'bar' && dimension2 == 'none') ||
                (type == 'pie' && dimension1 == 'none' && dimension2 == 'none')) && allMeasures && [...new Set(allMeasures.map(p => ***REMOVED***(p.group)))].map(g => {
                    return (<PanelBody initialOpen={panelStatus[g]}
                        onToggle={e => togglePanel(g, panelStatus, setAttributes)}
                        title={`${g} (${countSelected(g)} / ${countTotal(g)} ) `}>
                        {allMeasures.filter(f => ***REMOVED***(f.group) === g)
                            .map(m => <PanelRow>
                                <***REMOVED*** single={false} measure={m}></***REMOVED***>
                            </PanelRow>)}
                    </PanelBody>


                    )
                }
                )
        }


        {
            /*Single measure conditions

        Bar:
               2 dimensions selected
         Line:
                never
         Pie:
              any dimensions selected

        */
            ((type == 'big-number') || (type == 'bar' && dimension2 != 'none') || (type == 'pie' && (dimension1 != 'none' || dimension2 != 'none'))) && allMeasures && [...new Set(allMeasures.map(p => ***REMOVED***(p.group)))].map(g => {
                return (<PanelBody
                    initialOpen={panelStatus[g]}
                    onToggle={e => togglePanel(g, panelStatus, setAttributes)}
                    title={`${g} (${countSelected(g)} / ${countTotal(g)} ) `}>

                    {allMeasures.filter(f => ***REMOVED***(f.group) === g)
                        .map(m => <PanelRow>
                            <***REMOVED*** single={true} measure={m}></***REMOVED***>
                        </PanelRow>)}

                </PanelBody>
                )
            })


        }

        {
            (type == 'overlay') && allMeasures && <SelectControl
                label="Measure"
                // @ts-ignore
                value={***REMOVED*** && ***REMOVED***[0] ? ***REMOVED***[0].value : null}
                options={[{ value: '', label: 'Select Measure' }, ...allMeasures]}
                onChange={(measure) => ***REMOVED***(measure)}
                __nextHasNoMarginBottom
            />

        }


        {(type != 'overlay') && <PanelBody title={__("Format")} initialOpen={panelStatus["FORMAT"]}
            onToggle={e => togglePanel("FORMAT", panelStatus, setAttributes)}>
            <Format
                hiddenCustomAxisFormat={type == 'radar' || type == 'big-number'}
                format={format || (measures[app] && measures[app].format ? measures[app].format : defaultFormat)}
                customFormat={measures[app] && measures[app].customFormat ? measures[app].customFormat : defaultFormat}
                ***REMOVED***={measures[app] ? measures[app].***REMOVED*** : false}
                ***REMOVED***={(format, field) => {
                    ***REMOVED***(format, field)
                }}
                onUseCustomAxisFormatChange={value => {
                    onUseCustomAxisFormatChange(value)
                }}
            >
            </Format>
        </PanelBody>}

    </PanelBody>
        {(type != 'overlay') && ***REMOVED*** && ***REMOVED***.length > 0 &&
            <PanelBody title={__("Measure Label Customization")}
                initialOpen={panelStatus["MEASURES_LABEL_CUSTOMIZATION"]}
                onToggle={e => togglePanel("MEASURES_LABEL_CUSTOMIZATION", panelStatus, setAttributes)}>

                {***REMOVED*** && [...new Set(***REMOVED***.map(p => ***REMOVED***(p.group)))].map(g => {
                    return (<PanelBody initialOpen={panelStatus[g + "_LABEL_CUSTOMIZATION"]}
                        onToggle={e => togglePanel(g + "_LABEL_CUSTOMIZATION", panelStatus, setAttributes)}
                        title={`${g}`}>
                        {***REMOVED***.filter(f => ***REMOVED***(f.group) === g)
                            .map(m => {
                                const userMeasure = measures[app] ? measures[app][m.value] : {}
                                return (<><PanelRow><ToggleControl
                                    label={***REMOVED***(m)}
                                    checked={userMeasure ? userMeasure.***REMOVED*** : false}
                                    onChange={(value) => onCustomLabelToggleChange(m.value)} /> </PanelRow>
                                    {userMeasure.***REMOVED*** &&
                                        <PanelRow>
                                            <TextControl label={__("Custom Label")}
                                                value={userMeasure ? userMeasure.customLabel : ""}
                                                onChange={(value) => ***REMOVED***(m.value, value)} />
                                        </PanelRow>
                                    }
                                </>)

                            })}
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