import { PanelRow, Label, PanelBody, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const Tooltip = (props) => {

    function repeat(times) {
        return function (...args) {
            return cook(...args).repeat(times);
        };
    }

    function cook(strs, ...substs) {
        return substs.reduce(
            (prev, cur, i) => prev + cur + strs[i + 1],
            strs[0]
        );
    }



    const { setAttributes, attributes: { tooltipHTML, dimension1, dimension2, dimension3, measures }, allMeasures, allDimensions, type } = props;

    return [
        <PanelBody title={__("Variables")}>
            <div>
                {allDimensions.filter(d => (d.value === dimension1 || d.value === dimension2 || d.value === dimension3))
                    .map(d => <PanelRow>
                        <span style={{ "font-size": "11px" }}>{d.label} -&gt; {"{"}{d.value}{"}"}</span>
                    </PanelRow>)}
            </div>
            <div>
                {allMeasures
                    .map(m => <PanelRow>
                        <span style={{ "font-size": "11px" }}>{m.label} -&gt; {"{"}{m.value}{"}"}</span>
                    </PanelRow>)}
            </div>
            {dimension1 == "none" && dimension2 == "none" &&
                <PanelRow>
                    <span style={{ "font-size": "11px" }}>Corresponding Population -&gt; {"{"}populationValue{"}"}</span>
                </PanelRow>
            }
            {type === "pie" &&
                <>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Value Percent -&gt; {'{valuePercent}'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Category -&gt; {'{category}'}</span>
                    </PanelRow>
                </>
            }
            {type === "sunburst" &&
                <>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Label -&gt; {'{label}'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Value -&gt; {'{value}'} or {'#(value)'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Path -&gt; {'{path}'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Depth -&gt; {'{depth}'}</span>
                    </PanelRow>
                </>
            }
            {type === "scatter" &&
                <>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Point Label -&gt; {'{label}'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Series -&gt; {'{series}'} / {'{seriesDisplay}'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>X Value -&gt; {'{x}'} or {'#(x)'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Y Value -&gt; {'{y}'} or {'#(y)'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Bubble Size -&gt; {'{size}'} or {'#(size)'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Axis Labels -&gt; {'{xLabel}'}, {'{yLabel}'}, {'{sizeLabel}'}</span>
                    </PanelRow>
                </>
            }
            {type === "heatmap" &&
                <>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Row Label -&gt; {'{rowLabel}'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Column Label -&gt; {'{columnLabel}'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Value -&gt; {'{value}'} or {'#(value)'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Measure Label -&gt; {'{measureLabel}'}</span>
                    </PanelRow>
                </>
            }
            {type === "intervalPlot" &&
                <>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Label -&gt; {'{label}'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Center / Expected -&gt; {'{value}'} or {'#(value)'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Low / High -&gt; {'{low}'}, {'{high}'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Measure Labels -&gt; {'{centerLabel}'}, {'{lowLabel}'}, {'{highLabel}'}</span>
                    </PanelRow>
                </>
            }
        </PanelBody>,
        <PanelRow>
            <TextareaControl
                label={__("Tooltip")}
                value={tooltipHTML}
                help={__("You can use variables {var_name}")}
                onChange={(tooltipHTML) => setAttributes({ tooltipHTML })}
                rows={10}
            />
        </PanelRow>];
};
