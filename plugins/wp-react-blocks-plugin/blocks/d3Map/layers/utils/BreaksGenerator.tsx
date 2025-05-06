import React from 'react';
import {Button, PanelBody, PanelRow, RangeControl, TextControl} from "@wordpress/components";
import {PanelColorSettings} from "@wordpress/block-editor";
import {__} from '@wordpress/i18n';
import * as ss from 'simple-statistics';

interface BreaksGeneratorProps {
    onChangeProperty: (property: string, value: any) => void;
    breaks: any[];
    defaultFillColor: string;
    defaultBorderColor: string;
    showSize: boolean;
}

interface Break {
    start: number;
    end: number;
    color: string;
    borderColor: string;
    size: number;
    type: 'lessThan' | 'graterThan';
}


const BreaksGenerator = ({onChangeProperty, breaks = [], defaultFillColor, defaultBorderColor, showSize}: BreaksGeneratorProps) => {


    const add = () => {
        const lessThanBreaks: Break[] = breaks.filter(b => b.type == 'lessThan')
        let graterThanBreaks: Break[] = breaks.filter(b => b.type == 'graterThan')
        if (graterThanBreaks.length === 0) {
            graterThanBreaks = [{
                start: 0,
                end: 1,
                color: defaultFillColor,
                borderColor: defaultBorderColor,
                size: 1,
                type: 'graterThan'
            }]
        }
        const newBreaks = [...lessThanBreaks]
        newBreaks.push({
            start: 0,
            end: 1,
            color: defaultFillColor,
            borderColor: defaultBorderColor,
            size: 1,
            type: 'lessThan'
        })
        //keep grater than break at the end
        onChangeProperty("breaks", [...newBreaks, ...graterThanBreaks])
    }

    const update = (property, index, value) => {
        const lessThanBreaks = breaks.filter(b => b.type == 'lessThan')
        let graterThanBreaks = breaks.filter(b => b.type == 'graterThan')
        const newBreaks = [...lessThanBreaks]
        newBreaks[index][property] = value

        graterThanBreaks[0].end = lessThanBreaks[lessThanBreaks.length - 1].end

        onChangeProperty("breaks", [...newBreaks, ...graterThanBreaks])
    }

    const remove = (index: number) => {
        let graterThanBreaks: Break[] = breaks.filter(b => b.type == 'graterThan')
        let lessThanBreaks: Break[] = breaks.filter(b => b.type == 'lessThan')
        const newBreaks = [...lessThanBreaks]
        newBreaks.splice(index, 1)
        
        if (newBreaks.length > 0) {
            graterThanBreaks[0].end = lessThanBreaks[newBreaks.length - 1].end
        }
        if (newBreaks.length == 0) {
            graterThanBreaks = []
        }


        onChangeProperty("breaks", [...newBreaks, ...graterThanBreaks])
    }

    const updateGraterThan = (property: string, value: any) => {
        
        const graterThanBreak: Break[] = breaks.filter(b => b.type == 'graterThan')[0]
        const lessThanBreaks: Break[] = breaks.filter(b => b.type == 'lessThan')
        graterThanBreak[property] = value
        onChangeProperty("breaks", [...lessThanBreaks, graterThanBreak])
    }

    
    return <>

        <PanelRow>
            <Button variant="primary" onClick={e => add()}>Add Break</Button>
        </PanelRow>
        {breaks.map((br, index) => {
                if (br.type == 'lessThan') {
                    return <PanelBody initialOpen={false} title={"Less than (" + br.end + ")"}>
                        <PanelRow>
                            <TextControl
                                type={"number"}
                                label={__("Value", "dg")}
                                value={br.end}
                                onChange={(value) => update("end", index, value)}
                            />
                        </PanelRow>
                        {showSize && <PanelRow>
                            <RangeControl
                                label="Size"
                                value={br.size}
                                onChange={(value) => {
                                    update("size", index, value)
                                }}
                                step={1}
                                min={0}
                                max={200}
                            />
                        </PanelRow>}

                        <PanelColorSettings
                            title={__(`Fill Color`)}
                            colorSettings={[{
                                label: __(`Fill Color`),
                                value: br.color,
                                onChange: (fillColor) => {
                                    update("color", index, fillColor)
                                },
                            }]}
                        />


                        <PanelRow>
                            <Button variant="primary" onClick={e => remove(index)}>Remove This</Button>
                        </PanelRow>
                    </PanelBody>
                }

                if (br.type == 'graterThan') {
                    return <PanelBody initialOpen={false} title={"Grater than (" + br.end + ")"}>
                        {showSize && <PanelRow>
                            <RangeControl
                                label="Size"
                                value={br.size}
                                onChange={(value) => {
                                    updateGraterThan("size",  value)
                                }}
                                step={1}
                                min={0}
                                max={200}
                            />
                        </PanelRow>}
                        <PanelRow>
                            <PanelColorSettings
                                title={__(`Fill Color`)}
                                colorSettings={[{
                                    label: __(`Fill Color`),
                                    value: br.color,
                                    onChange: (fillColor) => {
                                        updateGraterThan("color", fillColor)
                                    },
                                }]}
                            />

                        </PanelRow>

                    </PanelBody>
                }
            }
        )}

    </>
}


export default BreaksGenerator;