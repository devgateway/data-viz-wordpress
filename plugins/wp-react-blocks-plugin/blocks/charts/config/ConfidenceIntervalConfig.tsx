import React from 'react';
import { Component } from "@wordpress/element";
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

interface ConfidenceIntervalConfigProps {
    app: any;
    series: any;
    setAttributes: (attributes: any) => void;
    attributes: {
        confidenceIntervals: any;
    };
}

export default class ConfidenceIntervalConfig extends Component<ConfidenceIntervalConfigProps> {
    constructor(props: ConfidenceIntervalConfigProps) {
        super(props);
    }

    setFieldData(serieId: string, serieLabel: string, dataField: string, value: string) {
        const { attributes: { confidenceIntervals }, setAttributes } = this.props
        const newConfidenceIntervals = confidenceIntervals.slice()
        let current = newConfidenceIntervals.filter(c => c.serieId == serieId)[0]
        if (!current) {
            current = { serieId, serieLabel }
            current[dataField] = value
            newConfidenceIntervals.push(current)
        }
        current[dataField] = value
        setAttributes({ confidenceIntervals: newConfidenceIntervals });
    }

    render() {
        const {
            app,
            series,
            setAttributes,
            attributes: {
                confidenceIntervals
            }
        } = this.props;

        return [
            <PanelBody initialOpen={false} title={__("Confidence Intervals")}>
                {series && series.map(s => {
                    const current = confidenceIntervals.filter(c => c.serieId == s.id)[0]

                    return (<>
                        <PanelRow> <label>{s.value} </label></PanelRow>
                        <PanelRow>
                            <span><TextControl
                                label={__("Low")}
                                value={current && current.low ? parseFloat(current.low) : ""}
                                onChange={(value) =>
                                    this.setFieldData(s.id, s.value, 'low', value)
                                }
                                type="number"
                            />
                            </span>
                            <span>

                            </span>
                            <span style={{ marginLeft: "10px" }}>
                                <TextControl
                                    label={__("High")}
                                    value={current && current.high ? parseFloat(current.high) : ""}
                                    onChange={(value) => this.setFieldData(s.id, s.value, 'high', value)}
                                    type="number"
                                />
                            </span>
                        </PanelRow></>)
                })}
            </PanelBody>
        ]
    }
}

