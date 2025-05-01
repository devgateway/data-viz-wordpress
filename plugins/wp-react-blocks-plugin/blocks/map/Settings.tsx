import React from "react"
import { Component } from "@wordpress/element"
import { ***REMOVED*** } from '@wordpress/block-editor'
import { PanelBody, PanelRow, SelectControl, TextControl, ToggleControl, Button, ButtonGroup, RangeControl, ***REMOVED*** } from '@wordpress/components'
import { __ } from '@wordpress/i18n';
import { SizeConfig } from '../commons/index'
import Format from "./Format"
import { SettingsProps } from "./types";

export default class Settings extends Component<SettingsProps> {
    constructor(props: SettingsProps) {
        super(props);
    }
    render() {
        const { setAttributes, attributes: {
            height,
            app,
            ***REMOVED***,
            zoomEnabled,
            mapCenter,
            ***REMOVED***,
            showTooltip,
            ***REMOVED***,
            valueFormat,
            ***REMOVED***,
            ***REMOVED***,
            group,
            tooltipTheme,
            ***REMOVED***,
            ***REMOVED***,
            labelFontSize,
            ***REMOVED***,
            ***REMOVED***,
            legendTitle,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            highlightedLocLabelFormat,
            ***REMOVED***,
            noDataText
        },
            locations
        } = this.props;

        return (<PanelBody initialOpen={false} title={__("Settings")}>
            <PanelRow> <TextControl
                label={__('Group Name')}
                value={group || ''}
                onChange={(group) => setAttributes({ group })}
            />
            </PanelRow>
            <SizeConfig initialOpen={true} setAttributes={setAttributes} height={height} panelStatus={this.props.attributes.panelStatus}></SizeConfig>
            <PanelBody title={__("Labels")} initialOpen={false}>
                <PanelRow>
                    <TextControl
                        label={__('Measure Selector Label')}
                        value={***REMOVED*** || ''}
                        onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                    />
                </PanelRow>
                {(***REMOVED*** || showTooltip) &&
                    <PanelRow>
                        <TextControl
                            placeholder={__('#({value},2,{measure})')}
                            label={__('Map Label')}
                            value={valueFormat || ''}
                            onChange={(valueFormat) => setAttributes({ valueFormat })}
                        />
                    </PanelRow>
                }
                <PanelRow>
                    <SelectControl
                        label={__('Show Admin Unit Label')}
                        value={***REMOVED***}
                        onChange={(value) => {
                            setAttributes({ ***REMOVED***: value })
                        }}
                        options={[{ label: 'Only if admin unit has data', value: 'ifUnitHasData' }, { label: 'Do not show', value: 'doNotShow' }, { label: 'Show All', value: 'showAll' }]} />
                </PanelRow>
                {(***REMOVED*** == 'ifUnitHasData' || ***REMOVED*** == 'showAll') &&
                    <PanelRow>
                        <***REMOVED***
                            label={__("Do not show these labels(use comma to separate) ")}
                            value={***REMOVED*** || ''}
                            onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                        />
                    </PanelRow>
                }
                <PanelRow>
                    <ToggleControl
                        label="Map Label: Show Value"
                        checked={***REMOVED***}
                        onChange={() => setAttributes({ ***REMOVED***: !***REMOVED*** })} />
                </PanelRow>
                <PanelRow>
                    <ToggleControl
                        label='Show "No Data" Label'
                        checked={***REMOVED***}
                        onChange={() => setAttributes({ ***REMOVED***: !***REMOVED*** })} />
                </PanelRow>
                <PanelRow>
                    <RangeControl
                        label={__('Font Size')}
                        value={labelFontSize}
                        onChange={(labelFontSize) => setAttributes({ labelFontSize })}
                        min={0}
                        max={20}
                    />
                </PanelRow>
                <PanelRow>
                    <ButtonGroup>
                        <Button variant={***REMOVED*** == 'lighter' ? 'primary' : 'secondary'}
                            onClick={e => setAttributes({ ***REMOVED***: "lighter" })}>
                            {__("Lighter")}
                        </Button>
                        <Button variant={***REMOVED*** == 'normal' ? 'primary' : 'secondary'}
                            onClick={e => setAttributes({ ***REMOVED***: "normal" })}>
                            {__("Normal")}
                        </Button>
                        <Button variant={***REMOVED*** == 'bold' ? 'primary' : 'secondary'}
                            onClick={e => setAttributes({ ***REMOVED***: "bold" })}>
                            {__("Bold")}
                        </Button>
                    </ButtonGroup>
                </PanelRow>
                <PanelRow>
                    <***REMOVED***
                        title={__('Label font color')}
                        colorSettings={[
                            {
                                value: ***REMOVED***(***REMOVED*** ? ***REMOVED*** : "#f0f0f1"),
                                onChange: (color) => {
                                    if (color) {
                                        setAttributes({ ***REMOVED***: ***REMOVED***(color) })
                                    } else {
                                        setAttributes({ ***REMOVED***: null })
                                    }
                                },
                                label: __("")
                            }
                        ]}

                    />
                </PanelRow>
            </PanelBody>
            <PanelBody title={__("Point Settings")} initialOpen={false}><PanelRow>
                <***REMOVED***
                    title={__('Label font color')}
                    colorSettings={[
                        {
                            value: ***REMOVED***(***REMOVED*** ? ***REMOVED*** : "#f0f0f1"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({ ***REMOVED***: ***REMOVED***(color) })
                                } else {
                                    setAttributes({ ***REMOVED***: null })
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
            </PanelRow>
                <PanelRow>
                    <TextControl
                        placeholder={__('#({value},2)')}
                        label={__('Point Label')}
                        value={***REMOVED*** || ''}
                        onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                    />
                </PanelRow>
            </PanelBody>
            <PanelBody title={__("Legend")} initialOpen={false}>
                <PanelRow>
                    <TextControl
                        label={__('Legend Title')}
                        value={legendTitle || ''}
                        onChange={(legendTitle) => setAttributes({ legendTitle })}
                    />
                </PanelRow>
                <PanelRow>
                    <RangeControl
                        label={__('Legend Font Size')}
                        value={***REMOVED***}
                        onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                        min={0}
                        max={20} />
                </PanelRow>
                <PanelRow>
                    <ButtonGroup>
                        <label style={{ fontSize: '13px' }} className="components-base-control__label">Font Weight </label> <br></br>
                        <Button variant={***REMOVED*** == 'lighter' ? 'primary' : 'secondary'}
                            onClick={e => setAttributes({ ***REMOVED***: "lighter" })}>
                            {__("Lighter")}
                        </Button>
                        <Button variant={***REMOVED*** == 'normal' ? 'primary' : 'secondary'}
                            onClick={e => setAttributes({ ***REMOVED***: "normal" })}>
                            {__("Normal")}
                        </Button>
                        <Button variant={***REMOVED*** == 'bold' ? 'primary' : 'secondary'}
                            onClick={e => setAttributes({ ***REMOVED***: "bold" })}>
                            {__("Bold")}
                        </Button>
                    </ButtonGroup>
                </PanelRow>
            </PanelBody >
            <Format {...this.props}></Format>
            <PanelRow>
                <ToggleControl
                    label="Zoom & Pan Enabled"
                    checked={zoomEnabled}
                    onChange={() => setAttributes({ zoomEnabled: !zoomEnabled })}
                />
            </PanelRow>
            {app != 'csv' &&
                <>
                    <PanelRow>
                        <ToggleControl
                            label="Show Overall/National Value"
                            checked={***REMOVED***}
                            onChange={() => setAttributes({ ***REMOVED***: !***REMOVED*** })}
                        />
                    </PanelRow>
                    {***REMOVED*** &&
                        <PanelRow>
                            <TextControl
                                label={__('Overall Average Label')}
                                value={***REMOVED*** || ''}
                                onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                            />
                        </PanelRow>
                    }
                </>
            }

            {locations &&
                <PanelRow>
                    <SelectControl
                        label={__('Highlighted Location')}
                        value={***REMOVED***}
                        onChange={(value) => {
                            setAttributes({ ***REMOVED***: value })
                        }}
                        options={[{ label: 'None', value: '' }, ...locations]} />
                </PanelRow>
            }

            {***REMOVED*** &&
                <PanelRow>
                    <TextControl
                        placeholder={__('{locationName} - Score: #({value},2)')}
                        label={__('Highlighted Location Label')}
                        value={highlightedLocLabelFormat || ''}
                        onChange={(highlightedLocLabelFormat) => setAttributes({ highlightedLocLabelFormat })}
                    />
                </PanelRow>
            }

        </PanelBody>
        )
    }
}