import {PanelBody, PanelRow, SelectControl, ToggleControl} from '@wordpress/components';
import React, {useEffect} from 'react'
import {__} from '@wordpress/i18n';
import ChartColors from "../commons/ChartColors.jsx"
import ChartLegends from '../commons/ChartLegends.jsx'
import AxisConfig from './AxisConfig.jsx'
import Labels from "./Labels.jsx"
import Format from "./Format.jsx"
import Papa from 'papaparse'
import Sort from "./Sort.jsx"


const LineOptions = (props) => {
    const {
        allMeasures,
        setAttributes, attributes: {
            measures,
            app,
            dimension1,
            dimension2,
            layout,
            format,
            groupMode,
            reverse,
            colorBy,
            ***REMOVED***,
            valueScale,
            maxValue,
            swap,
            csv,
            fixedMaxValue,
            fixedMinValue,
            barPadding,
            ***REMOVED***,
            showGrid,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            showTickLine,
            showRightAxis,
            enableArea,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            showPoints,
            enableGridY,
            enableGridX,
            lineCurve
        }
    } = props;


    let ***REMOVED*** = []
    if (app == 'csv') {
        const data = Papa.parse(csv, {header: true, dynamicTyping: true});
        ***REMOVED***.push({value: '', label: ''})
        data.meta.fields.forEach((field, i) => {
            if (i !== 0) {
                ***REMOVED***.push({value: field, label: field})
            }
        })
    } else {
        if (allMeasures && measures && measures[app]) {
            const list = allMeasures.filter(measure => {
                return (measures[app][measure.value] && measures[app][measure.value].selected)
            }).map(m => {
                return {value: m.value, label: m.group + ' - ' + m.label}
            }).sort((a, b) => {
                return (a.label > b.label) ? 1 : -1
            })

            ***REMOVED*** = [{value: '', label: ''}, ...list]
        }
    }

    return [<PanelBody initialOpen={false}   title={__("Line Options")}>
        <PanelBody initialOpen={false}   title={__("Layout")}>
        <PanelRow>
            <ToggleControl
                label={__("Grouped")}
                checked={groupMode === "grouped"}
                onChange={() => setAttributes({groupMode: (groupMode === "grouped" ? "stacked" : "grouped")})}/>
        </PanelRow>
        {app !== "csv" && <Sort {...props} ></Sort>}
        <PanelRow>
            <ToggleControl
                label={__("Show Line Points")}
                checked={showPoints}
                onChange={() => setAttributes({showPoints: !showPoints})}/>
        </PanelRow>
        { showPoints && <Labels {...props}></Labels>}
        <PanelRow>
            <ToggleControl
                label={__("Enable Y Grid Lines")}
                checked={enableGridY}
                onChange={() => setAttributes({enableGridY: !enableGridY})}/>
        </PanelRow>
		<PanelRow>
            <ToggleControl
                label={__("Enable X Grid Lines")}
                checked={enableGridX}
                onChange={() => setAttributes({enableGridX: !enableGridX})}/>
        </PanelRow>
            <PanelRow>
                <SelectControl
                    label={__('Curve')}
                    value={[lineCurve]}
                    onChange={(lineCurve) => {
                        setAttributes({lineCurve})
                    }}
                    options={[
                        {value: "basis", label: "basis"},
                        {value: "cardinal", label: "cardinal"},
                        {value: "catmullRom", label: "catmullRom"},
                        {value: "linear", label: "linear"},
                        {value: "monotoneX", label: "monotoneX"},
                        {value: "monotoneY", label: "monotoneY"},
                        {value: "natural", label: "natural"},
                        {value: "step", label: "step"},
                        {value: "stepAfter", label: "stepAfter"},
                        {value: "stepBefore", label: "stepBefore"}

                    ]}
                />
            </PanelRow>
        <PanelRow>
            <ToggleControl
                label={__("Enable Area")}
                checked={enableArea}
                onChange={() => setAttributes({enableArea: !enableArea})}/>
        </PanelRow>
        {enableArea &&
            <>
                <PanelRow>
                    <SelectControl
                        label={__('Shading Criteria')}
                        value={[***REMOVED***]}
                        onChange={(***REMOVED***) => {
                            setAttributes({***REMOVED***})
                        }}
                        options={[{value: "DEFAULT", label: "default"}, {
                            value: "CUSTOM_BETWEEN_TWO_LINES",
                            label: "Custom (Shade area between lines)"
                        }]}
                    />
                </PanelRow>
                {***REMOVED*** == "CUSTOM_BETWEEN_TWO_LINES" &&
                    <>
                        <PanelRow>
                            <SelectControl
                                style={{width: 150}}
                                label={__('Area Lower Bound')}
                                value={[***REMOVED***]}
                                onChange={(***REMOVED***) => {
                                    setAttributes({***REMOVED***})
                                }}
                                options={***REMOVED***}
                            />
                        </PanelRow>
                        <PanelRow>
                            <SelectControl
                                style={{width: 150}}
                                label={__('Area Upper Bound')}
                                value={[***REMOVED***]}
                                onChange={(***REMOVED***) => {
                                    setAttributes({***REMOVED***})
                                }}
                                options={***REMOVED***}
                            />
                        </PanelRow>
                    </>
                }
            </>
        }
        </PanelBody>
        <PanelBody initialOpen={false}   title={__("Colors")}>
        <ChartColors {...props}></ChartColors>
        </PanelBody>
        <AxisConfig {...props}></AxisConfig>
        <ChartLegends {...props}></ChartLegends>
    </PanelBody>]
}

export default LineOptions
