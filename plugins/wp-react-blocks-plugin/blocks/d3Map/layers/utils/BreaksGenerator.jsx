import {Button, ButtonGroup, PanelBody, PanelRow, RangeControl, TextControl} from "@wordpress/components";
import {***REMOVED***} from "@wordpress/block-editor";
import {__} from '@wordpress/i18n';

var ss = require('simple-statistics')
const ***REMOVED*** = ({
                             ***REMOVED***, breaks = [], ***REMOVED***, ***REMOVED***, showSize, app,
                             csv, ***REMOVED***,
                             ***REMOVED***,
                             measures,
                             filters,
                             format,
                             ***REMOVED***
                         }) => {


    const prettyRound = (value, digits = 1) => {
        if (value === 0) return 0;
        const d = Math.ceil(Math.log10(Math.abs(value)));
        const power = digits - d;
        const magnitude = Math.pow(10, power);
        return Math.round(value * magnitude) / magnitude;
    }
    const DEFAULT_POINT_SIZE = 8;
    const generate = (pretty, nBreaks = 4) => {
        //eslint-disable-next-line
        debugger;

        const newBreaks = []
        const queryString = filters.map(f => f.param + "=" + f.value.map(v => v).toString()).join('&')

        fetch(`/api/${app}/stats/${***REMOVED***}?***REMOVED***=${***REMOVED***}&${queryString}`).then(response => response.json()).then(data => {

            let values = []
            if (***REMOVED***) {
                values = data.children.flatMap(d => d.children).map(d => d[measures[0]])
            } else {
                values = data.children.map(d => d[measures[0]])
            }


            const numBreaks = Math.min(nBreaks, values.length);
            const clusters = ss.ckmeans(values, numBreaks);
            //const naturalBreaks = clusters.map(cluster => cluster[0]);
            const naturalBreaks = clusters.map((cluster,index) => {
                if (index === 0 && cluster.length > 1 && cluster[0] !== cluster[1]) {
                    return pretty ? prettyRound(cluster[1]) : cluster[1]
                }
                return pretty ? prettyRound(cluster[0]) : cluster[0]
            });
            //naturalBreaks.push(clusters[clusters.length - 1].slice(-1)[0]);

            naturalBreaks.push(pretty ? prettyRound(clusters[clusters.length - 1].slice(-1)[0]) : clusters[clusters.length - 1].slice(-1)[0]);

            //eslint-disable-next-line
            debugger;
            for (let i = 0; i < naturalBreaks.length - 2; i++) {

                newBreaks.push({
                    end: naturalBreaks[i],
                    color: breaks && breaks[i] && breaks[i].color ? breaks[i].color : ***REMOVED***,
                    borderColor: breaks && breaks[i] && breaks[i].borderColor ? naturalBreaks[i].borderColor : ***REMOVED***,
                    size: breaks && breaks[i] && breaks[i].size ? breaks[i].size : DEFAULT_POINT_SIZE,
                    type: 'lessThan'
                });
            }

            const ***REMOVED*** = breaks.filter(b => b.type == 'graterThan')
            let color = ***REMOVED***
            let borderColor = ***REMOVED***

            let size = DEFAULT_POINT_SIZE
            debugger;

            if (***REMOVED***.length > 0) {
                color = ***REMOVED***[0].color
                borderColor = ***REMOVED***[0].borderColor
                size = ***REMOVED***[0].size
            }

            newBreaks.push({
                end: naturalBreaks[naturalBreaks.length - 1],
                color: color,
                borderColor: borderColor,
                size: size,
                type: 'graterThan'
            })
            ***REMOVED***("breaks", [...newBreaks])
        });


    }
    const add = () => {
        //eslint-disable-next-line
        debugger;
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
            size: DEFAULT_POINT_SIZE,
            type: 'lessThan'
        })
        //keep grater than break at the end
        ***REMOVED***("breaks", [...newBreaks, ...***REMOVED***])
    }

    const update = (property, index, value) => {
        //eslint-disable-next-line
        debugger;
        const ***REMOVED*** = breaks.filter(b => b.type == 'lessThan')
        let ***REMOVED*** = breaks.filter(b => b.type == 'graterThan')
        const newBreaks = [...***REMOVED***]
        newBreaks[index][property] = value
        ***REMOVED***[0].end = ***REMOVED***[***REMOVED***.length - 1].end
        ***REMOVED***("breaks", [...newBreaks, ...***REMOVED***])
    }

    const remove = (index) => {
        //eslint-disable-next-line
        debugger;
        let ***REMOVED*** = breaks.filter(b => b.type == 'graterThan')
        let ***REMOVED*** = breaks.filter(b => b.type == 'lessThan')
        const newBreaks = [...***REMOVED***]
        newBreaks.splice(index, 1)

        if (newBreaks.length > 0) {
            ***REMOVED***[0].end = ***REMOVED***[newBreaks.length - 1].end
        }
        if (newBreaks.length == 0) {
            ***REMOVED*** = []
        }


        ***REMOVED***("breaks", [...newBreaks, ...***REMOVED***])
    }

    const ***REMOVED*** = (property, value) => {
        //eslint-disable-next-line
        debugger;
        const ***REMOVED*** = breaks.filter(b => b.type == 'graterThan')[0]
        const ***REMOVED*** = breaks.filter(b => b.type == 'lessThan')
        ***REMOVED***[property] = value
        ***REMOVED***("breaks", [...***REMOVED***, ***REMOVED***])
    }

    /*
      format: {
        "style": "percent",
        "minimumFractionDigits": 1,
        "maximumFractionDigits": 1,
        "currency": "USD",
    },
    *
    * */
    //TODO: Take locale from current page language
    const numberFormat = {
        style: (format.style === 'compacted') ? 'decimal' : format.style,
        notation: (format.style === 'compacted') ? 'compact' : "standard",
        currency: format.currency,
        minimumFractionDigits: parseInt(format.minimumFractionDigits),
        maximumFractionDigits: parseInt(format.maximumFractionDigits)
    }
    const formatter = new Intl.NumberFormat('en-US', numberFormat);

    return <>

        <PanelRow>
            <ButtonGroup>
                <Button variant="secondary" onClick={e => add()}>Add Custom Break</Button>
                <Button variant="secondary" onClick={e => generate()}>Generate Natural Breaks</Button>
                <Button variant="secondary" onClick={e => generate(true)}>Generate Pretty Numbers</Button>
            </ButtonGroup>
        </PanelRow>
        {breaks.map((br, index) => {
                if (br.type == 'lessThan') {
                    return <PanelBody initialOpen={false} title={<div>
                        <div style={{
                            width: "15px",
                            height: "15px",
                            ***REMOVED***: br.color,
                            border: '1px solid #000',
                            float: "left",
                            marginRight: "5px"
                        }}></div>
                        <span>Less than</span>
                        <div style={{marginLeft: "20px"}}>{formatter.format(br.end)}</div>

                    </div>}>
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
                                clearable: true,
                                enableAlpha: true,
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
                    return <PanelBody initialOpen={false} title={<div>
                        <div style={{
                            width: "15px",
                            height: "15px",
                            ***REMOVED***: br.color,
                            border: '1px solid #000',
                            float: "left",
                            marginRight: "5px"
                        }}></div>
                        <span> Grater than </span>
                        <div style={{marginLeft: "20px"}}>{formatter.format(br.end)}</div>
                    </div>}>
                        {showSize && <PanelRow>
                            <RangeControl
                                label="Size"
                                value={br.size}
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
                                    value: br.color,
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