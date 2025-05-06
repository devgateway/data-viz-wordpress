import React from 'react';
import {***REMOVED***, PanelBody, PanelRow, RangeControl, TextControl, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/block-editor';

interface ***REMOVED*** {
    ***REMOVED***?: (value: boolean) => void;
    isSelected?: boolean;
    setAttributes: (attributes: any) => void;
    attributes: {
        leftLegend: string;
        offsetY: number;
        tickColor: string;
        tickRotation: number;
        ***REMOVED***: boolean;
        xLabelColor: string;
        barLabelColor: string;
        type: string;
        rightLegend: string;
        offsetRight: number;
        showRightAxis: boolean;
        bottomLegend: string;
        offsetBottom: number;
        showTickLine: boolean;
        ***REMOVED***: boolean;
        maxValue: string;
        fixedMinValue: string;
        fixedMaxValue: string;
        ***REMOVED***: number;
        ***REMOVED***: number;
        offsetText: number;
        minMaxClamp: boolean;
    };
}

const AxisConfig = (props: ***REMOVED***) => {

    const {
        ***REMOVED***,
        setAttributes,
        attributes: {
            leftLegend,
            offsetY,
            tickColor,
            tickRotation,
            ***REMOVED***,
            xLabelColor,
            barLabelColor,
            type,
            rightLegend,
            offsetRight,
            showRightAxis,
            bottomLegend,
            offsetBottom,
            showTickLine,
            ***REMOVED***,
            maxValue,
            fixedMinValue,
            fixedMaxValue,
            ***REMOVED***,
            ***REMOVED***,
            offsetText,
            minMaxClamp
        }
    } = props;


    return [<PanelBody initialOpen={false}   title={__("X Axis Settings")}>
        <PanelRow>
            <ToggleControl
                label={__("Highlight X Axis Line")}
                checked={***REMOVED***}
                onChange={(***REMOVED***) => setAttributes({***REMOVED***})}/>
        </PanelRow>
        <PanelRow>
            <ToggleControl
                label={__("Show X axis label lines")}
                checked={showTickLine === true}
                onChange={(value) => setAttributes({showTickLine: !showTickLine})}/>
        </PanelRow>
            {showTickLine && <PanelRow>
                <ToggleControl
                    label={__("Change Stick Color")}
                    checked={***REMOVED*** === true}
                    onChange={(value) => setAttributes({***REMOVED***: !***REMOVED***})}/>
            </PanelRow>}

            {showTickLine && ***REMOVED*** && <PanelRow>
                <***REMOVED***
                    title={__("Stick Color")}
                    colorSettings={[
                        {
                            value: ***REMOVED***(tickColor ? tickColor : "#FFFFFF"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({tickColor: ***REMOVED***(color)})
                                } else {
                                    setAttributes({tickColor: null})
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
            </PanelRow>}

            <PanelRow>
                <***REMOVED*** label={__("X Axis Text Rotation")} value={tickRotation}
                                    onChange={value => setAttributes({tickRotation: value})}/>
            </PanelRow>

            <PanelRow>
                <RangeControl
                    label={__('X Axis Text Offset')}
                    value={offsetText}
                    onChange={(offsetText) => setAttributes({ offsetText })}
                    min={-200}
                    max={200}
                />
            </PanelRow>

            <PanelRow>
                <***REMOVED***
                    title={__('X Axis Text Color')}
                    colorSettings={[
                        {
                            value: ***REMOVED***(xLabelColor ? xLabelColor : "#000000"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({xLabelColor: ***REMOVED***(color)})
                                } else {
                                    setAttributes({xLabelColor: null})
                                }
                            },
                            label: __("")
                        }
                    ]}
                />
            </PanelRow>
            {type=='bar'&& <PanelRow>
                <***REMOVED***
                    title={__('Bar Text Color')}
                    colorSettings={[
                        {
                            value: ***REMOVED***(barLabelColor ? barLabelColor : "#000000"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({barLabelColor: ***REMOVED***(color)})
                                } else {
                                    setAttributes({barLabelColor: null})
                                }
                            },
                            label: __("")
                        }
                    ]}
                />
            </PanelRow>}
            <PanelRow>
                        <TextControl
                            label={__('X Axis Title')}
                            value={bottomLegend}
                            onChange={(bottomLegend) => setAttributes({ bottomLegend })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <RangeControl
                            label={__('X Axis Title Offset')}
                            value={offsetBottom}
                            onChange={(offsetBottom) => setAttributes({ offsetBottom })}
                            min={-200}
                            max={200}
                        />
                    </PanelRow>
        {
            type === "bar" && <PanelRow>
                <RangeControl
                    label={__('Number of Intervals')}
                    value={***REMOVED***}
                    onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                    min={0}
                    max={50}
                />
            </PanelRow>
        }
        </PanelBody>,
        <PanelBody initialOpen={false}   title={__("Y Axis Settings")}>
            <PanelRow>
                <TextControl
                    label={__('Title')}
                    value={leftLegend}
                    onChange={(leftLegend) => setAttributes({ leftLegend })}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Left Axis Title Offset')}
                    value={offsetY}
                    onChange={(offsetY) => setAttributes({ offsetY })}
                    min={-500}
                    max={500}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Number of Intervals')}
                    value={***REMOVED***}
                    onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                    min={0}
                    max={50}
                />
            </PanelRow>
            <PanelRow>
            <ToggleControl
                label={__("Show Right Axis")}
                checked={showRightAxis}
                onChange={(showRightAxis) => setAttributes({showRightAxis})}/>
          </PanelRow>
            {showRightAxis &&
                <>
                    <PanelRow>
                        <TextControl
                            label={__('Right Axis Title')}
                            value={rightLegend}
                            onChange={(rightLegend) => setAttributes({ rightLegend })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <RangeControl
                            label={__('Right Axis Title Offset')}
                            value={offsetRight}
                            onChange={(offsetRight) => setAttributes({ offsetRight })}
                            min={-500}
                            max={500}
                        />
                    </PanelRow>
                </>
            }
              <PanelRow>
                <ToggleControl
                    label={__("Use Fixed Min & Max Values")}
                    checked={maxValue === "fixed"}
                    onChange={() => setAttributes({maxValue: (maxValue === "auto" ? "fixed" : "auto")})}/>

            </PanelRow>
            {maxValue === 'fixed' &&
                <>
                <PanelRow>
                <ToggleControl
                    label={__("Chop off Chart at Min & Max Values")}
                    checked={minMaxClamp === true}
                    onChange={() => setAttributes({minMaxClamp: !minMaxClamp})}/>
               </PanelRow>
                    <PanelRow>
                        <TextControl value={fixedMinValue} label={__("Min y-Axis Value")}
                                     onChange={(value) => setAttributes({fixedMinValue: value})} type="number"/>
                    </PanelRow>
                    <PanelRow>
                        <TextControl value={fixedMaxValue} label={__("Max y-Axis Value")}
                                     onChange={(value) => setAttributes({fixedMaxValue: value})} type="number"/>
                    </PanelRow>
                </>
            }
        </PanelBody>
    ]
}

export default AxisConfig
