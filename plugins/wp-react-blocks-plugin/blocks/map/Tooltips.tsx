import React from 'react';
import { __ } from '@wordpress/i18n';
import {
    Button,
    PanelBody,
    PanelRow,
    SelectControl,
    ***REMOVED***,
    RangeControl,
    ToggleControl,
} from '@wordpress/components';
import { Component } from '@wordpress/element';

interface TooltipsProps {
    attributes: {
        ***REMOVED***: { location: string; tooltip: string }[];
        app: string;
        tooltipFormat: string;
        showTooltip: boolean;
        ***REMOVED***: boolean;
        tooltipTheme: string;
        ***REMOVED***: number;
    };
    setAttributes: (attributes: any) => void;
    locations?: { value: string; label: string }[];
}


export default class Tooltips extends Component<TooltipsProps> {
    constructor(props: TooltipsProps) {
        super(props);
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
    }

    setFieldData(field: string, value: string, idx: number) {
        const { attributes: { ***REMOVED*** }, setAttributes } = this.props
        const ***REMOVED*** = ***REMOVED***.slice()
        ***REMOVED***[idx][field] = value;
        setAttributes({ ***REMOVED***: ***REMOVED*** });
    }

    ***REMOVED***() {
        const { attributes: { ***REMOVED*** }, setAttributes } = this.props
        let index = ***REMOVED***.length;
        const ***REMOVED*** = { location: '', tooltip: '' }
        let ***REMOVED*** = ***REMOVED***.slice()
        ***REMOVED***.push(***REMOVED***)
        setAttributes({ ***REMOVED***: ***REMOVED*** })
    }

    ***REMOVED***() {
        const { attributes: { ***REMOVED*** }, setAttributes } = this.props
        let ***REMOVED*** = ***REMOVED***.slice(0, -1)
        setAttributes({ ***REMOVED***: ***REMOVED*** })
    }

    render() {
        const { setAttributes, attributes: { ***REMOVED***, app, tooltipFormat, showTooltip, ***REMOVED***, tooltipTheme, ***REMOVED*** }, locations } = this.props;
        return [
            <PanelBody initialOpen={false} title={__("Tooltips")}>
                <PanelRow>
                    <ToggleControl
                        label="Show tooltip"
                        checked={showTooltip}
                        onChange={() => setAttributes({ showTooltip: !showTooltip })} />

                </PanelRow>
                {showTooltip &&
                    <>
                        <PanelRow>
                            <ToggleControl
                                label="Show 'No Data' tooltip"
                                checked={***REMOVED***}
                                onChange={() => setAttributes({ ***REMOVED***: !***REMOVED*** })} />

                        </PanelRow>
                        <PanelRow>
                            <SelectControl
                                style={{ width: 100 }}
                                label={__('Tooltip theme')}
                                value={tooltipTheme as "map-tooltip-dark" | "map-tooltip-light"}
                                onChange={(tooltipTheme) => {
                                    setAttributes({ tooltipTheme })
                                }}
                                options={[{ label: "Dark", value: "map-tooltip-dark" }, { label: "Light", value: "map-tooltip-light" }]}>

                            </SelectControl>
                        </PanelRow>
                        <PanelRow>
                            <RangeControl
                                label={__('Tooltip Font Size')}
                                value={***REMOVED***}
                                onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                                min={0}
                                max={20} />
                        </PanelRow>
                        <PanelRow>
                            <span style={{ fontSize: "11px" }}>Location -&gt; {'{locationName}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{ fontSize: "11px" }}>Field Label -&gt; {'{label}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{ fontSize: "11px" }}>Measure Label -&gt; {'{measureLabel}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{ fontSize: "11px" }}>Field Value -&gt; {'{value}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{ fontSize: "11px" }}>All variables/columns that start with an _ in csv</span>
                        </PanelRow>
                        <PanelRow>
                            <***REMOVED***
                                label={__("Tooltip Format")}
                                value={tooltipFormat}
                                onChange={(tooltipFormat) => setAttributes({ tooltipFormat })}
                            />
                        </PanelRow>
                        <PanelBody initialOpen={false} title={__("Custom Tooltips")}>
                            {***REMOVED***.map((f, index) => {
                                return (
                                    <PanelBody initialOpen={true} title={__(`Custom Tooltip for: ${f.location ? f.location : ''}`)}>
                                        {<SelectControl
                                            style={{ width: 150 }}
                                            label={__('Location to Match')}
                                            value={f.location}
                                            onChange={(value) => {
                                                this.setFieldData('location', value, index)
                                            }}
                                            options={locations ? [{ value: '', label: 'Select Location' }, ...locations] : []}>
                                        </SelectControl>}

                                        {<***REMOVED*** label={__("Tooltip text")}
                                            value={f.tooltip} onChange={value => this.setFieldData('tooltip', value, index)} />}
                                    </PanelBody>)
                            })}
                            <PanelRow>
                                <Button variant="link" onClick={this.***REMOVED***}>{__("Add Custom Tooltip")}</Button>
                                <Button variant="link" onClick={this.***REMOVED***}>{__("Remove Custom Tooltip")}</Button>
                            </PanelRow>
                        </PanelBody>
                    </>
                }
            </PanelBody>
        ]
    }
}