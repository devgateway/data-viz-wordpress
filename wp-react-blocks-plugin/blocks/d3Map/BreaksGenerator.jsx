import {Button, PanelBody, PanelRow, RangeControl, TextControl} from "@wordpress/components";
import {***REMOVED***} from "@wordpress/block-editor";
import {__} from '@wordpress/i18n';

const ***REMOVED*** = ({***REMOVED***, breaks = [], ***REMOVED***,***REMOVED***}) => {

    const add = () => {
        const newBreaks = [...breaks]
        debugger;
        newBreaks.push({
            start: 0,
            end: 1,
            color: ***REMOVED***,
            borderColor: ***REMOVED***,
            size: .1
        })
        ***REMOVED***("breaks", newBreaks)
    }

    const update = (property, index , value ) => {
        const newBreaks = [...breaks]
        newBreaks[index][property] = value
        ***REMOVED***("breaks", newBreaks)
    }

    const remove = (index) => {
        debugger;
        const newBreaks = [...breaks]
        newBreaks.pop()
        ***REMOVED***("breaks", newBreaks)
    }

    return <>
        {breaks.map((br, index) => {
            return (<PanelBody title={"Break ("+br.start+"-"+br.end+")"}>
                <PanelRow>
                    <TextControl
                        type={"Number"}
                        label={__("Start", "dg")}
                        value={br.start}
                        onChange={(value) => update("start", index, value)}
                    />
                </PanelRow>
                <PanelRow>
                    <TextControl
                        type={"Number"}
                        label={__("End", "dg")}
                        value={br.end}
                        onChange={(value) => update("end", index, value)}
                    />
                </PanelRow>
                <PanelRow>
                    <RangeControl
                        label="Maker Base Size"
                        value={br.size}
                        onChange={(value) => {
                            update("size", index, value)
                        }}
                        step={0.5}
                        min={0}
                        max={10}
                    />
                </PanelRow>
                <PanelRow>
                    <***REMOVED***
                        title={__(`Fill Color`)}
                        colorSettings={[{
                            value: br.color,
                            onChange: (fillColor) => {
                                update("color", index, fillColor)
                            },

                        }]}
                    />
                    <***REMOVED***
                        title={__(`Border Color`)}
                        colorSettings={[{
                            value: br.borderColor,
                            onChange: (borderColor) => {
                                update("borderColor", index, borderColor)
                            },

                        }]}
                    />
                </PanelRow>
            </PanelBody>)
        })
        }


        <PanelRow>
            <Button isLink onClick={e => add()}>Add Break</Button>
            <Button isLink onClick={e => remove()}>Remove Break</Button>
        </PanelRow>
    </>
}


export default ***REMOVED***;