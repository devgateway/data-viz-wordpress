import React from 'react';
import { Component } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import {
    Button,
    PanelBody,
    PanelRow,
    TextControl,
    ToggleControl,
    SelectControl
} from '@wordpress/components';
import { ***REMOVED*** } from '@wordpress/block-editor'
import Papa from 'papaparse'
import { LegendBreak, ***REMOVED*** } from './types';

const colorSchemes = [{ value: "blues", label: 'blues' },
{ value: "greens", label: 'greens' },
{ value: "greys", label: 'greys' },
{ value: "oranges", label: 'oranges' },
{ value: "purples", label: 'purples' },
{ value: "reds", label: 'reds' }];

export default class LegendBreaks extends Component<***REMOVED***> {
    constructor(props: ***REMOVED***) {
        super(props);
        this.setMinValue = this.setMinValue.bind(this)
        this.setMaxValue = this.setMaxValue.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
    }

    setMinValue(value: number, idx: number) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const ***REMOVED*** = legendBreaks.slice()
        ***REMOVED***[idx].min = value
        setAttributes({ legendBreaks: ***REMOVED*** })
    }

    setMaxValue(value: number, idx: number) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const ***REMOVED*** = legendBreaks.slice()
        ***REMOVED***[idx].max = value
        setAttributes({ legendBreaks: ***REMOVED*** })
    }

    setColor(color: string, idx: number) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const ***REMOVED*** = legendBreaks.slice()
        ***REMOVED***[idx].color = color ? ***REMOVED***(color) : undefined;
        setAttributes({ legendBreaks: ***REMOVED*** })
    }

    setFieldData(field: string, value: string, idx: number) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const ***REMOVED*** = legendBreaks.slice()
        ***REMOVED***[idx][field] = value;
        setAttributes({ legendBreaks: ***REMOVED*** });
    }

    ***REMOVED***() {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        let index = legendBreaks.length;
        const ***REMOVED***: LegendBreak = { min: 0, max: 0 }
        let ***REMOVED*** = legendBreaks.slice()
        ***REMOVED***.push(***REMOVED***)
        setAttributes({ legendBreaks: ***REMOVED*** })
    }

    ***REMOVED***() {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        let ***REMOVED*** = legendBreaks.slice(0, -1)
        setAttributes({ legendBreaks: ***REMOVED*** })
    }

    addFilter(idx: number) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const breaks = legendBreaks.slice()
        const currentBreak = breaks[idx];
        if (!currentBreak['filters']) {
            currentBreak['filters'] = []
        }
        // @ts-ignore
        currentBreak['filters'].push({})
        setAttributes({ legendBreaks: breaks });
    }

    removeFilters(idx: number) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const breaks = legendBreaks.slice()
        const currentBreak = breaks[idx];
        if (currentBreak['filters']) {
            currentBreak['filters'] = currentBreak['filters'].slice(0, -1)
        }
        setAttributes({ legendBreaks: breaks });
    }

    setFilterData(field: string, value: string, breakIndex: number, filterIndex: number) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const ***REMOVED*** = legendBreaks.slice()
        let filters = ***REMOVED***[breakIndex]['filters']
        if (filters) {
            filters[filterIndex][field] = value;
        }
        setAttributes({ legendBreaks: ***REMOVED*** });
    }

    render() {
        const { app, allMeasures, setAttributes, attributes: {
            legendBreaks,
            ***REMOVED***,
            measures,
            ***REMOVED***,
            ***REMOVED***,
            colorScheme,
            csv,
            ***REMOVED***,
            ***REMOVED***,
            mapFocusBoundaryColor,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***
        }
        } = this.props;

        const ***REMOVED***: { value: string; label: string }[] = []
        if (app == 'csv' && csv) {
            const data = Papa.parse(csv, { header: true, dynamicTyping: true });
            ***REMOVED***.push({ value: '', label: 'None' })
            data?.meta?.fields?.forEach((field, i) => {
                if (i > 0) {
                    if (!field.startsWith('_')) {
                        ***REMOVED***.push({ value: field, label: field })
                    }
                }
            })
        }

        return [<PanelBody initialOpen={false} title={__("Colors")}>
            <PanelRow>
                <***REMOVED***
                    title={__('Map Container Background Color')}
                    colorSettings={[
                        {
                            value: ***REMOVED***(***REMOVED*** ? ***REMOVED*** : "#fff"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({ ***REMOVED***: ***REMOVED***(color) })
                                } else {
                                    setAttributes({ ***REMOVED***: ***REMOVED***("#fff") })
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
            </PanelRow>
            <PanelRow>
                <***REMOVED***
                    title={__('No Data Color')}
                    colorSettings={[
                        {
                            value: ***REMOVED***(***REMOVED*** ? ***REMOVED*** : "#f8f8f8"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({ ***REMOVED***: ***REMOVED***(color) })
                                } else {
                                    setAttributes({ ***REMOVED***: ***REMOVED***("#f8f8f8") })
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
            </PanelRow>
            <PanelRow>
                <***REMOVED***
                    title={__('Boundary Color')}
                    colorSettings={[
                        {
                            value: ***REMOVED***(***REMOVED*** ? ***REMOVED*** : "#000"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({ ***REMOVED***: ***REMOVED***(color) })
                                } else {
                                    setAttributes({ ***REMOVED***: ***REMOVED***("#000") })
                                }
                            },
                            label: __("")
                        }
                    ]} />
            </PanelRow>
            <PanelRow>
                <***REMOVED***
                    title={__('Boundary Highlight Color')}
                    colorSettings={[
                        {
                            value: ***REMOVED***(mapFocusBoundaryColor ? mapFocusBoundaryColor : "#000"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({ mapFocusBoundaryColor: ***REMOVED***(color) })
                                } else {
                                    setAttributes({ mapFocusBoundaryColor: ***REMOVED***("#000") })
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
            </PanelRow>

            <PanelRow>
                <ToggleControl
                    label="Show 'No Data' legend item"
                    checked={***REMOVED***}
                    onChange={() => setAttributes({ ***REMOVED***: !***REMOVED*** })}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Auto-generate breaks based on available data"
                    checked={***REMOVED***}
                    onChange={() => setAttributes({ ***REMOVED***: !***REMOVED*** })}
                />
            </PanelRow>
            {***REMOVED*** &&
                <>
                    <PanelRow>
                        {<TextControl value={***REMOVED*** || 0} label={__("Number of breaks")}
                            onChange={(value) => setAttributes({ ***REMOVED***: parseInt(value) <= 10 ? parseInt(value) : ***REMOVED*** })}
                            max={10}
                            type="number" />}
                    </PanelRow>
                    <PanelRow>
                        <SelectControl
                            label={__('Color Scheme')}
                            value={colorScheme}
                            onChange={(value) => {
                                setAttributes({ colorScheme: value })
                            }}
                            options={colorSchemes}
                        />
                    </PanelRow>
                </>
            }

            {!***REMOVED*** &&
                <>
                    <PanelRow>
                        <ToggleControl
                            label="Show break labels instead of values"
                            checked={***REMOVED***}
                            onChange={() => setAttributes({ ***REMOVED***: !***REMOVED*** })}
                        />
                    </PanelRow>

                    {legendBreaks.map((f, index) => {
                        return (
                            <PanelBody initialOpen={true} title={__(`Break: ${f.min != null ? f.min : ''} - ${f.max != null ? f.max : ''}`)}>

                                {<TextControl
                                    value={f.min}
                                    label={__("Min")}
                                    onChange={value => this.setMinValue(parseInt(value), index)}
                                    type="number" />
                                }

                                {<TextControl
                                    value={f.max}
                                    label={__("Max")}
                                    onChange={value => this.setMaxValue(parseInt(value), index)}
                                    type="number"

                                />}

                                {<TextControl value={f.label || ''} label={__("Label")}
                                    onChange={value => this.setFieldData('label', value, index)} />}

                                <SelectControl label={__('Measure')}
                                    value={f.measure}
                                    onChange={(value) => {
                                        this.setFieldData('measure', value, index)
                                    }}
                                    options={app == 'csv' ? ***REMOVED*** : [{ value: '', label: 'None' }, ...allMeasures.filter(m => measures?.includes(m.value))]}
                                />

                                <***REMOVED***
                                    title={__('Color settings')}
                                    colorSettings={[
                                        {
                                            value: ***REMOVED***(f.color || ''),
                                            onChange: (color) => {
                                                if (color) {
                                                    this.setColor(color, index)
                                                }
                                            },
                                            label: __('Color')
                                        }
                                    ]}
                                />

                                <PanelBody title="Filters" initialOpen={false}>
                                    {f.filters && f.filters.map((filter, filterIndex) => {
                                        return (<> <PanelRow>
                                            <TextControl label={__("Field")} value={filter.field}
                                                onChange={(value) => {
                                                    this.setFilterData('field', value, index, filterIndex)
                                                }}></TextControl>
                                        </PanelRow>
                                            <PanelRow>
                                                <TextControl label={__("Value")} value={filter.values}
                                                    onChange={(value) => {
                                                        this.setFilterData('values', value, index, filterIndex)
                                                    }}></TextControl>
                                            </PanelRow>
                                            <hr></hr></>)
                                    })
                                    }
                                    <PanelRow>
                                        <Button variant='link' onClick={() => {
                                            this.addFilter(index)
                                        }}>{__("Add Filter")}</Button>
                                        <Button isLink onClick={() => {
                                            this.removeFilters(index)
                                        }}>{__("Remove Filter")}</Button>
                                    </PanelRow>
                                </PanelBody>

                            </PanelBody>)
                    })}
                    <PanelRow>
                        <Button isLink onClick={this.***REMOVED***}>{__("Add Break")}</Button>
                        <Button isLink onClick={this.***REMOVED***}>{__("Remove")}</Button>
                    </PanelRow>
                </>
            }
        </PanelBody>]
    }
}