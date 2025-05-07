import React from 'react';
import {PanelBody, PanelRow, SelectControl, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {ChartColors, ChartLegends, Format } from '@devgateway/dvz-wp-commons';
import AxisConfig from '../config/AxisConfig';
import Labels from "./Labels";
import Papa from 'papaparse'


const RadarChart = (props) => {
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
            enableGridX
        }
    } = props;

    let ***REMOVED***: {value: string, label: string}[] = []
    if (app == 'csv') {
        const data = Papa.parse(csv, {header: true, dynamicTyping: true});
        ***REMOVED***.push({value: '', label: ''})
        data.meta?.fields?.forEach((field, i) => {
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

    return [<PanelBody initialOpen={false} title={__("Radar Options")}>
        <PanelBody initialOpen={false} title={__("Layout")}>
            <PanelRow>
                <ToggleControl
                    label={__("Grouped")}
                    checked={groupMode === "grouped"}
                    onChange={() => setAttributes({groupMode: (groupMode === "grouped" ? "stacked" : "grouped")})}/>
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label={__("Show Line Points")}
                    checked={showPoints}
                    onChange={() => setAttributes({showPoints: !showPoints})}/>
            </PanelRow>
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
                            value={***REMOVED***}
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
                                    value={***REMOVED***}
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
                                    value={***REMOVED***}
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
        <PanelBody initialOpen={false} title={__("Colors")}>
            <ChartColors {...props}></ChartColors>
        </PanelBody>
        <AxisConfig {...props}></AxisConfig>
        <Labels {...props}></Labels>
        <ChartLegends {...props}></ChartLegends>
    </PanelBody>]
}

export default RadarChart