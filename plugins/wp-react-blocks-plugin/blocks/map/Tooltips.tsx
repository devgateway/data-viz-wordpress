import React from 'react';
import { __ } from '@wordpress/i18n';
import {
    Button,
    PanelBody,
    PanelRow,
    SelectControl,
    TextareaControl,
    RangeControl,
    ToggleControl,
} from '@wordpress/components';
import { Component } from '@wordpress/element';

interface TooltipsProps {
    attributes: {
        customTooltips: { location: string; tooltip: string }[];
        app: string;
        tooltipFormat: string;
        showTooltip: boolean;
        showNoDataTooltip: boolean;
        tooltipTheme: string;
        tooltipFontSize: number;
    };
    setAttributes: (attributes: any) => void;
    locations?: { value: string; label: string }[];
}


export default class Tooltips extends Component<TooltipsProps> {
    constructor(props: TooltipsProps) {
        super(props);
        this.addCustomTooltip = this.addCustomTooltip.bind(this)
        this.removeCustomTooltip = this.removeCustomTooltip.bind(this)
    }

    setFieldData(field: string, value: string, idx: number) {
        const { attributes: { customTooltips }, setAttributes } = this.props
        const newCustomTooltip = customTooltips.slice()
        newCustomTooltip[idx][field] = value;
        setAttributes({ customTooltips: newCustomTooltip });
    }

    addCustomTooltip() {
        const { attributes: { customTooltips }, setAttributes } = this.props
        let index = customTooltips.length;
        const newCustomTooltip = { location: '', tooltip: '' }
        let newCustomTooltips = customTooltips.slice()
        newCustomTooltips.push(newCustomTooltip)
        setAttributes({ customTooltips: newCustomTooltips })
    }

    removeCustomTooltip() {
        const { attributes: { customTooltips }, setAttributes } = this.props
        let newCustomTooltips = customTooltips.slice(0, -1)
        setAttributes({ customTooltips: newCustomTooltips })
    }

    render() {
        const { setAttributes, attributes: { customTooltips, app, tooltipFormat, showTooltip, showNoDataTooltip, tooltipTheme, tooltipFontSize }, locations } = this.props;
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
                                checked={showNoDataTooltip}
                                onChange={() => setAttributes({ showNoDataTooltip: !showNoDataTooltip })} />

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
                                value={tooltipFontSize}
                                onChange={(tooltipFontSize) => setAttributes({ tooltipFontSize })}
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
                            <TextareaControl
                                label={__("Tooltip Format")}
                                value={tooltipFormat}
                                onChange={(tooltipFormat) => setAttributes({ tooltipFormat })}
                            />
                        </PanelRow>
                        <PanelBody initialOpen={false} title={__("Custom Tooltips")}>
                            {customTooltips.map((f, index) => {
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

                                        {<TextareaControl label={__("Tooltip text")}
                                            value={f.tooltip} onChange={value => this.setFieldData('tooltip', value, index)} />}
                                    </PanelBody>)
                            })}
                            <PanelRow>
                                <Button variant="link" onClick={this.addCustomTooltip}>{__("Add Custom Tooltip")}</Button>
                                <Button variant="link" onClick={this.removeCustomTooltip}>{__("Remove Custom Tooltip")}</Button>
                            </PanelRow>
                        </PanelBody>
                    </>
                }
            </PanelBody>
        ]
    }
}