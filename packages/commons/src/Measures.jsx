import {__} from '@wordpress/i18n';
import {CheckboxControl, PanelBody, PanelRow, SelectControl, ToggleControl, TextControl} from '@wordpress/components';

import Format from './Format'
import {togglePanel} from "./Util";
import {getTranslation} from "./APIutils";

const defaultFormat = {
    "style": "percent",
    "minimumFractionDigits": 1,
    "maximumFractionDigits": 1,
    "currency": "USD"

}

const hasConfiguredDimension = (dimension) => dimension && dimension !== 'none'

const supportsMeasureSelectorInSingleMode = (type, dimension1, dimension2) =>
    ((type === 'line' || type === 'bar') && hasConfiguredDimension(dimension2)) ||
    (type === 'pie' && (hasConfiguredDimension(dimension1) || hasConfiguredDimension(dimension2)))

const isMeasureSelectorDrivenMultiMeasure = (type, dimension1, dimension2, enableMeasureSelector) =>
    supportsMeasureSelectorInSingleMode(type, dimension1, dimension2) && enableMeasureSelector === true

const isMultiMeasureMode = (type, dimension1, dimension2, multiMeasure, enableMeasureSelector) => {
    if (multiMeasure === true) {
        return true
    }

    if (isMeasureSelectorDrivenMultiMeasure(type, dimension1, dimension2, enableMeasureSelector)) {
        return true
    }

    if (['radar', 'bump', 'diverging', 'grouped-bars', 'scatter', 'intervalPlot', 'dumbbell'].includes(type)) {
        return true
    }

    if ((type === 'line' || type === 'bar') && !hasConfiguredDimension(dimension2)) {
        return true
    }

    if (type === 'pie' && !hasConfiguredDimension(dimension1) && !hasConfiguredDimension(dimension2)) {
        return true
    }

    return false
}

const isSingleMeasureMode = (type, dimension1, dimension2, multiMeasure, enableMeasureSelector) => {
    if (multiMeasure === false) {
        return true
    }

    if (isMeasureSelectorDrivenMultiMeasure(type, dimension1, dimension2, enableMeasureSelector)) {
        return false
    }

    if (['data-paragraph', 'sunburst', 'heatmap', 'waterfall', 'histogram'].includes(type)) {
        return true
    }

    if ((type === 'line' || type === 'bar') && hasConfiguredDimension(dimension2)) {
        return true
    }

    if (type === 'pie' && (hasConfiguredDimension(dimension1) || hasConfiguredDimension(dimension2))) {
        return true
    }

    return false
}

export const Measures = (props) => {
    const {
        onMeasuresChange,
        onFormatChange,
        onUseCustomAxisFormatChange,
        onSetSingleMeasure,
        onCustomLabelToggleChange,
        onCustomLabelChange,
        allMeasures,
        setAttributes,
        title,
        format,
        multiMeasure,
        attributes: {
            panelStatus,
            measures,
            dimension1,
            dimension2,
            type,
            app,
            enableMeasureSelector = false,
            measureSelectorLabel = 'Measure',
            defaultMeasure = '',
        }
    } = props


    const MToggle = ({measure}) => {
        const userMeasure = measures[app] ? measures[app][measure.value] : {}

        return (<ToggleControl
            label={getTranslation(measure)}
            checked={userMeasure ? userMeasure.selected : false}
            onChange={(value) => onMeasuresChange(measure.value)}/>)
    }

    const MCheckbox = ({measure}) => {
        const userMeasure = measures[app] ? measures[app][measure.value] : {}
        let isChecked
        if (measures instanceof Array) {
            isChecked = measures.includes(measure.value)
        } else {
            isChecked = userMeasure ? userMeasure.selected : false
        }

        return <CheckboxControl
            label={getTranslation(measure)}
            checked={isChecked}
            onChange={(value) => onSetSingleMeasure(measure.value)}/>
    }


    const MeasureOptions = ({measure, single}) => {
        return <PanelRow>
            {single && <MCheckbox measure={measure}></MCheckbox>}
            {!single && <MToggle measure={measure}></MToggle>}
        </PanelRow>

    }

    const countSelected = (g) => {
        if (measures[app]) {
            const mG = allMeasures.filter(f => getTranslation(f.group) === g)
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
            return allMeasures.filter(f => getTranslation(f.group) === g).length
        }

        return 0
    }

    const getSelectedMeasures = () => {
        if (measures[app] && allMeasures) {
            return Object.keys(measures[app]).filter(k => measures[app][k].selected).map(k => {
                return allMeasures.filter(m => m.value === k)[0]
            }).filter(m => m)
        }
        return []
    }


    const selectedMeasures = getSelectedMeasures()
    const resolvedFormat = measures?.[app]?.format || format || defaultFormat
    const resolvedCustomFormat = measures?.[app]?.customFormat || defaultFormat
    const resolvedUseCustomAxisFormat = measures?.[app]?.useCustomAxisFormat || false
    const selectorSupportedInMeasures = supportsMeasureSelectorInSingleMode(type, dimension1, dimension2)
    const selectorDrivenMultiMeasure = isMeasureSelectorDrivenMultiMeasure(type, dimension1, dimension2, enableMeasureSelector)

    const showMultiMeasureOptions = isMultiMeasureMode(type, dimension1, dimension2, multiMeasure, enableMeasureSelector)

    const showSingleMeasureOptions = isSingleMeasureMode(type, dimension1, dimension2, multiMeasure, enableMeasureSelector)

    const getMeasureDisplayLabel = (measure) => {
        const userMeasure = measures[app] ? measures[app][measure.value] : {}
        if (userMeasure?.customLabel && userMeasure.customLabel.trim().length > 0) {
            return userMeasure.customLabel.trim()
        }

        return getTranslation(measure)
    }

    const defaultMeasureOptions = [
        {value: '', label: __('First selected measure')},
        ...selectedMeasures.map(measure => ({
            value: measure.value,
            label: getMeasureDisplayLabel(measure)
        }))
    ]
    const selectedDefaultMeasure = selectedMeasures.some(measure => measure.value === defaultMeasure)
        ? defaultMeasure
        : ''

    return <><PanelBody title={title ? title : __("Measures")} initialOpen={panelStatus["MEASURES"]}
                        onToggle={e => togglePanel("MEASURES", panelStatus, setAttributes)}>

        {
            /*
             Multiple measures conditions

             Bar & Line:
                 no dimensions selected
                 one dimension is selected
                 -  not available when second dimension gets selected

             Pie:
                  no dimensions selected
                   -  not available when any dimension is selected
             */

            showMultiMeasureOptions && allMeasures && [...new Set(allMeasures.map(p => getTranslation(p.group)))].map(g => {
                    return (<PanelBody initialOpen={panelStatus[g]}
                                       onToggle={e => togglePanel(g, panelStatus, setAttributes)}
                                       title={`${g} (${countSelected(g)} / ${countTotal(g)} ) `}>
                            {allMeasures.filter(f => getTranslation(f.group) === g)
                                .map(m => <PanelRow>
                                    <MeasureOptions single={false} measure={m}></MeasureOptions>
                                </PanelRow>)}
                        </PanelBody>


                    )
                }
            )
        }


        {
        /*Single measure conditions

        Bar & Lie:
            2 dimensions selected
        Pie:
            any dimensions selected

        */
            showSingleMeasureOptions && allMeasures && [...new Set(allMeasures.map(p => getTranslation(p.group)))].map(g => {
                return (<PanelBody
                        initialOpen={panelStatus[g]}
                        onToggle={e => togglePanel(g, panelStatus, setAttributes)}
                        title={`${g} (${countSelected(g)} / ${countTotal(g)} ) `}>

                        {allMeasures.filter(f => getTranslation(f.group) === g)
                            .map(m => <PanelRow>
                                <MeasureOptions single={true} measure={m}></MeasureOptions>
                            </PanelRow>)}

                    </PanelBody>
                )
            })


        }

        {selectorSupportedInMeasures && (
            <PanelRow>
                <ToggleControl
                    label={__("Show Measure Selector")}
                    checked={enableMeasureSelector === true}
                    help={__("Allow selecting multiple measures and show a selector above the chart.")}
                    onChange={(value) => setAttributes({enableMeasureSelector: value})}
                />
            </PanelRow>
        )}

        {selectorSupportedInMeasures && enableMeasureSelector === true && (
            <>
                <PanelRow>
                    <TextControl
                        label={__("Measure Selector Label")}
                        value={measureSelectorLabel}
                        onChange={(value) => setAttributes({measureSelectorLabel: value})}
                    />
                </PanelRow>
                <PanelRow>
                    <SelectControl
                        label={__("Default Measure")}
                        value={selectedDefaultMeasure}
                        options={defaultMeasureOptions}
                        onChange={(value) => setAttributes({defaultMeasure: value})}
                    />
                </PanelRow>
            </>
        )}

        {
            (type == 'overlay') && allMeasures && <SelectControl
                label="Measure"
                value={selectedMeasures && selectedMeasures[0] ? selectedMeasures[0].value : null}
                options={[{value: '', label: 'Select Measure'}, ...allMeasures]}
                onChange={(measure) => onSetSingleMeasure(measure)}
                __nextHasNoMarginBottom
            />

        }


        {(type != 'overlay' && type != 'data-paragraph') && <PanelBody title={__("Format")} initialOpen={panelStatus["FORMAT"]}
                                           onToggle={e => togglePanel("FORMAT", panelStatus, setAttributes)}>
            <Format
                hiddenCustomAxisFormat={type == 'radar' || type == 'big-number' || type == 'data-paragraph' || type == 'grouped-bars'}
                format={resolvedFormat}
                customFormat={resolvedCustomFormat}
                useCustomAxisFormat={resolvedUseCustomAxisFormat}
                onFormatChange={(format, field) => {
                    onFormatChange(format, field)
                }}
                onUseCustomAxisFormatChange={value => {
                    onUseCustomAxisFormatChange(value)
                }}
            >
            </Format>
        </PanelBody>}

        {(type != 'overlay') && selectedMeasures && selectedMeasures.length > 0 &&
            <PanelBody title={__("Measure Label Customization")}
                       initialOpen={panelStatus["MEASURES_LABEL_CUSTOMIZATION"]}
                       onToggle={e => togglePanel("MEASURES_LABEL_CUSTOMIZATION", panelStatus, setAttributes)}>

                {selectedMeasures && [...new Set(selectedMeasures.map(p => getTranslation(p.group)))].map(g => {
                        return (<PanelBody initialOpen={panelStatus[g + "_LABEL_CUSTOMIZATION"]}
                                           onToggle={e => togglePanel(g + "_LABEL_CUSTOMIZATION", panelStatus, setAttributes)}
                                           title={`${g}`}>
                                {selectedMeasures.filter(f => getTranslation(f.group) === g)
                                    .map(m => {
                                        const userMeasure = measures[app] ? measures[app][m.value] : {}
                                        return (<><PanelRow><ToggleControl
                                            label={getTranslation(m)}
                                            checked={userMeasure ? userMeasure.hasCustomLabel : false}
                                            onChange={(value) => onCustomLabelToggleChange(m.value)}/> </PanelRow>
                                            {userMeasure.hasCustomLabel &&
                                                <PanelRow>
                                                    <TextControl label={__("Custom Label")}
                                                                 value={userMeasure ? userMeasure.customLabel : ""}
                                                                 onChange={(value) => onCustomLabelChange(m.value, value)}/>
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

    </PanelBody>
    </>
}

export default Measures;
