import {Button, PanelBody, PanelRow, RangeControl, TextControl} from "@wordpress/components";
import {***REMOVED***} from "@wordpress/block-editor";
import {__} from '@wordpress/i18n';

var ss = require('simple-statistics')
const ***REMOVED*** = ({***REMOVED***, breaks = [], ***REMOVED***, ***REMOVED***, showSize}) => {


    const add = () => {
        const ***REMOVED*** = breaks.filter(b => b.type == 'lessThan')
        let ***REMOVED*** = breaks.filter(b => b.type == 'graterThan')
        if (***REMOVED***.length === 0) {
            ***REMOVED*** = [{
                start: 0,
                end: 1,
                color: ***REMOVED***,
                borderColor: ***REMOVED***,
                size: 1,
                type: 'graterThan'
            }]
        }
        const newBreaks = [...***REMOVED***]
        newBreaks.push({
            start: 0,
            end: 1,
            color: ***REMOVED***,
            borderColor: ***REMOVED***,
            size: 1,
            type: 'lessThan'
        })
        //keep grater than break at the end
        ***REMOVED***("breaks", [...newBreaks, ...***REMOVED***])
    }

    const update = (property, index, value) => {
        const ***REMOVED*** = breaks.filter(b => b.type == 'lessThan')
        let ***REMOVED*** = breaks.filter(b => b.type == 'graterThan')
        const newBreaks = [...***REMOVED***]
        newBreaks[index][property] = value

        ***REMOVED***[0].end = ***REMOVED***[***REMOVED***.length - 1].end

        ***REMOVED***("breaks", [...newBreaks, ...***REMOVED***])
    }

    const remove = (index) => {
        let ***REMOVED*** = breaks.filter(b => b.type == 'graterThan')
        let ***REMOVED*** = breaks.filter(b => b.type == 'lessThan')
        const newBreaks = [...***REMOVED***]
        newBreaks.splice(index, 1)
        debugger;
        if (newBreaks.length > 0) {
            ***REMOVED***[0].end = ***REMOVED***[newBreaks.length - 1].end
        }
        if (newBreaks.length == 0) {
            ***REMOVED*** = []
        }


        ***REMOVED***("breaks", [...newBreaks, ...***REMOVED***])
    }

    const ***REMOVED*** = (property, value) => {
        const ***REMOVED*** = breaks.filter(b => b.type == 'graterThan')[0]
        const ***REMOVED*** = breaks.filter(b => b.type == 'lessThan')
        ***REMOVED***[property] = value
        ***REMOVED***("breaks", [...***REMOVED***, ***REMOVED***])
    }

    debugger;
    return <>

        <PanelRow>
            <Button  variant="primary" onClick={e => add()}>Add Break</Button>
        </PanelRow>
        {breaks.map((br, index) => {
                if (br.type == 'lessThan') {
                    return <PanelBody initialOpen={false} title={"Less than (" + br.end + ")"}>
                        <PanelRow>
                            <TextControl
                                type={"Number"}
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

                        <***REMOVED***
                            title={__(`Fill Color`)}
                            colorSettings={[{
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
                            <TextControl
                                label="Size"
                                value={2}
                                onChange={(value) => {
                                    ***REMOVED***("size", value)
                                }}
                                step={1}
                                min={0}
                                max={200}
                            />
                        </PanelRow>}
                        <PanelRow>
                            <***REMOVED***
                                title={__(`Fill Color`)}
                                colorSettings={[{
                                    value: ***REMOVED***,
                                    onChange: (fillColor) => {
                                        ***REMOVED***("color", fillColor)
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


export default ***REMOVED***;