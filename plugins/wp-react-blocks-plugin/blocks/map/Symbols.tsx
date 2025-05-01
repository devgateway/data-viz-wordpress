import React from 'react';
import { Component } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import {
    Button,
    PanelBody,
    PanelRow,
    TextControl,
    SelectControl,
    ToggleControl
} from '@wordpress/components';

interface MapSymbol {
    label?: string;
    image?: string;
    values?: string;
    field?: string;
    location?: string;
    operation?: string;
}

interface MapSymbolsProps {
    mapSymbols?: MapSymbol[];
    locations: {
        label: string;
        value: string;
    }[];
    attributes: {
        mapSymbols?: MapSymbol[];
    };
    setAttributes: (attributes: any) => void;
}

export default class MapSymbols extends Component<MapSymbolsProps> {
    constructor(props: MapSymbolsProps) {
        super(props);
        this.addMapSymbol = this.addMapSymbol.bind(this)
        this.removeMapSymbol = this.removeMapSymbol.bind(this)
    }

    setFieldData(field: string, value: string, idx: number) {
        const { mapSymbols, setAttributes } = this.props
        const newMapSymbol = mapSymbols?.slice();
        if (newMapSymbol) {
            newMapSymbol[idx][field] = value;
            setAttributes({ mapSymbols: newMapSymbol });
        }
    }

    addMapSymbol() {
        const { attributes: { mapSymbols }, setAttributes } = this.props
        let index = mapSymbols?.length || 0;
        const newMapSymbol: MapSymbol = { operation: "equals", field: "location" }
        let newMapSymbols = mapSymbols?.slice();
        if (newMapSymbols) {
            newMapSymbols.push(newMapSymbol)
            setAttributes({ mapSymbols: newMapSymbols })
        }
    }

    removeMapSymbol(f) {
        const { attributes: { mapSymbols }, setAttributes } = this.props
        let newMapSymbols = mapSymbols?.slice(0, -1)
        if (newMapSymbols) {
            setAttributes({ mapSymbols: newMapSymbols })
        }
    }

    render() {
        const { attributes: { mapSymbols }, locations } = this.props;

        return [<PanelBody initialOpen={false} title={__("Symbols")}>
            {mapSymbols?.map((f, index) => {
                return (
                    <PanelBody initialOpen={true} title={__(`Symbol: ${f.label ? f.label : ''}`)}>
                        {<TextControl value={f.label || ''} label={__("Label")}
                            onChange={value => this.setFieldData('label', value, index)} />}

                        <PanelRow>
                            <SelectControl

                                label={__('Symbol')}
                                value={f.image as "tobocco_v2.svg" | ""}
                                onChange={(value) => {
                                    this.setFieldData('image', value, index)
                                }}
                                options={[{ value: '', label: 'None' }, { value: 'tobocco_v2.svg', label: 'Tobacco Leaf' }]}
                            />
                        </PanelRow>
                        <PanelBody initialOpen={true} title={__("Locations")}>
                            {locations && locations.map(loc => {
                                {
                                    const valuesArray = f.values ? f.values.split(',') : []
                                    const matches = valuesArray.filter(v => v.trim().toLowerCase() == loc.value.trim().toLowerCase())

                                    return (
                                        <PanelRow>
                                            <ToggleControl
                                                label={loc.label}
                                                checked={matches.length > 0}
                                                onChange={() => {
                                                    const values = f.values ? f.values.split(',') : []
                                                    if (values.includes(loc.value)) {
                                                        values.splice(values.indexOf(loc.value), 1)
                                                    } else {
                                                        values.push(loc.value)
                                                    }
                                                    this.setFieldData('values', values.join(','), index)
                                                }} />
                                        </PanelRow>
                                    )
                                }
                            })
                            }
                        </PanelBody>

                    </PanelBody>)
            })}
            <PanelRow>
                <Button variant='link' onClick={this.addMapSymbol}>{__("Add Map Symbol")}</Button>
                <Button variant="link" onClick={this.removeMapSymbol}>{__("Remove Map Symbol")}</Button>
            </PanelRow>
        </PanelBody>]
    }
}