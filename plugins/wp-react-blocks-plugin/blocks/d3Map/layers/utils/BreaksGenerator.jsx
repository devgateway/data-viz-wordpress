import {Button, ButtonGroup, PanelBody, PanelRow, RangeControl, TextControl} from "@wordpress/components";
import {PanelColorSettings} from "@wordpress/block-editor";
import {__} from '@wordpress/i18n';

var ss = require('simple-statistics')
const BreaksGenerator = ({
                             onChangeProperty, breaks = [], defaultFillColor, defaultBorderColor, showSize, app,
                             csv, apiJoinAttribute,
                             dvzProxyDatasetId,
                             measures,
                             filters,
                             format,
                             hasSecondDimension
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

        const newBreaks = []
        const queryString = filters.map(f => f.param + "=" + f.value.map(v => v).toString()).join('&')

        fetch(`/api/${app}/stats/${apiJoinAttribute}?dvzProxyDatasetId=${dvzProxyDatasetId}&${queryString}`).then(response => response.json()).then(data => {

            let values = []
            if (hasSecondDimension) {
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
            for (let i = 0; i < naturalBreaks.length - 2; i++) {

                newBreaks.push({
                    end: naturalBreaks[i],
                    color: breaks && breaks[i] && breaks[i].color ? breaks[i].color : defaultFillColor,
                    borderColor: breaks && breaks[i] && breaks[i].borderColor ? naturalBreaks[i].borderColor : defaultBorderColor,
                    size: breaks && breaks[i] && breaks[i].size ? breaks[i].size : DEFAULT_POINT_SIZE,
                    type: 'lessThan'
                });
            }

            const currentGraterThan = breaks.filter(b => b.type == 'graterThan')
            let color = defaultFillColor
            let borderColor = defaultBorderColor

            let size = DEFAULT_POINT_SIZE

            if (currentGraterThan.length > 0) {
                color = currentGraterThan[0].color
                borderColor = currentGraterThan[0].borderColor
                size = currentGraterThan[0].size
            }

            newBreaks.push({
                end: naturalBreaks[naturalBreaks.length - 1],
                color: color,
                borderColor: borderColor,
                size: size,
                type: 'graterThan'
            })
            onChangeProperty("breaks", [...newBreaks])
        });


    }
    const add = () => {
        //eslint-disable-next-line
        const lessThanBreaks = breaks.filter(b => b.type == 'lessThan')
        let graterThanBreaks = breaks.filter(b => b.type == 'graterThan')

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
            size: DEFAULT_POINT_SIZE,
            type: 'lessThan'
        })
        //keep grater than break at the end
        onChangeProperty("breaks", [...newBreaks, ...graterThanBreaks])
    }

    const update = (property, index, value) => {
        //eslint-disable-next-line
        const lessThanBreaks = breaks.filter(b => b.type == 'lessThan')
        let graterThanBreaks = breaks.filter(b => b.type == 'graterThan')
        const newBreaks = [...lessThanBreaks]
        newBreaks[index][property] = value
        graterThanBreaks[0].end = lessThanBreaks[lessThanBreaks.length - 1].end
        onChangeProperty("breaks", [...newBreaks, ...graterThanBreaks])
    }

    const remove = (index) => {
        //eslint-disable-next-line
        let graterThanBreaks = breaks.filter(b => b.type == 'graterThan')
        let lessThanBreaks = breaks.filter(b => b.type == 'lessThan')
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

    const updateGraterThan = (property, value) => {
        //eslint-disable-next-line
        const graterThanBreak = breaks.filter(b => b.type == 'graterThan')[0]
        const lessThanBreaks = breaks.filter(b => b.type == 'lessThan')
        graterThanBreak[property] = value
        onChangeProperty("breaks", [...lessThanBreaks, graterThanBreak])
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
                            backgroundColor: br.color,
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

                        <PanelColorSettings
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
                            backgroundColor: br.color,
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
                                    updateGraterThan("size", value)
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