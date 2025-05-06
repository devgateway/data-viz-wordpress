import React from 'react';
import {
    ***REMOVED***,
    Button,
    ButtonGroup,
    PanelBody,
    PanelRow,
    RangeControl,
    ***REMOVED***,
    ToggleControl,
    __experimentalText as Text,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ChartColors, ChartLegends } from '@dg-data-viz/wp-commons';

const PieOptions = (props) => {

    const {
        setAttributes, attributes: {
            endAngle,
            startAngle,
            centerLabel,
            showArcLabels,
            format,
            ***REMOVED***,
            slicePadding,
            centerLabelFontWeight,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
        }
    } = props;


    return [<PanelBody initialOpen={false} title={__("Pie Options")}>
        <ChartColors {...props}></ChartColors>
        <PanelRow>
            <Text>{__("Start Angle")}</Text>
            <***REMOVED*** value={startAngle} onChange={value => setAttributes({ startAngle: value })} />
        </PanelRow>
        <PanelRow>
            <Text>{__("End Angle")}</Text>
            <***REMOVED*** value={endAngle} onChange={value => setAttributes({ endAngle: value })} />
        </PanelRow>
        <PanelRow>
            <RangeControl
                label={__('Slice Padding')}
                value={slicePadding}
                ***REMOVED***={1}
                onChange={(slicePadding) => setAttributes({ slicePadding })}
                step={0.5}
                min={0}
                max={20} />
        </PanelRow>

        <PanelRow>
            <ToggleControl
                label={__("Show Slice Labels")}
                checked={showArcLabels}
                onChange={() => setAttributes({ showArcLabels: !showArcLabels })} />
        </PanelRow>
        <PanelRow>
            <ToggleControl
                label={__("Show Link Labels")}
                checked={***REMOVED***}
                onChange={() => setAttributes({ ***REMOVED***: !***REMOVED*** })} />
        </PanelRow>

        <PanelRow>
            <ToggleControl
                label={__("Show Percentage")}
                checked={***REMOVED***}
                onChange={() => setAttributes({ ***REMOVED***: !***REMOVED*** })} />
        </PanelRow>

        <ChartLegends {...props}></ChartLegends>


        <PanelBody initialOpen={false} title={__("Center Label")}>
            <PanelBody initialOpen={false} title={__("Variables")}>
                <PanelRow>
                    <span style={{ fontSize: "11px" }}>Total Value -&gt; {'{totalValue}'}</span>
                </PanelRow>
            </PanelBody>
            <PanelRow>
                <***REMOVED***
                    label={__("Label")}
                    value={centerLabel}
                    help={__("You can use variables {var_name}.")}
                    onChange={(centerLabel) => setAttributes({ centerLabel })}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Font Size')}
                    value={***REMOVED***}
                    onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                    min={0}
                    max={100}
                />
            </PanelRow>
            <PanelRow>
                <ButtonGroup>
                    <Button variant={centerLabelFontWeight == 'lighter' ? 'primary' : 'secondary'}
                        onClick={e => setAttributes({ centerLabelFontWeight: "lighter" })}>
                        {__("Lighter")}
                    </Button>
                    <Button variant={centerLabelFontWeight == 'normal' ? 'primary' : 'secondary'}
                        onClick={e => setAttributes({ centerLabelFontWeight: "normal" })}>
                        {__("Normal")}
                    </Button>
                    <Button variant={centerLabelFontWeight == 'bold' ? 'primary' : 'secondary'}
                        onClick={e => setAttributes({ centerLabelFontWeight: "bold" })}>
                        {__("Bold")}
                    </Button>
                </ButtonGroup>
            </PanelRow>

            <PanelRow>
                <RangeControl
                    label={__('X Offset')}
                    value={***REMOVED***}
                    onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                    min={-100}
                    max={300}
                />
            </PanelRow>

            <PanelRow>
                <RangeControl
                    label={__('Y Offset')}
                    value={***REMOVED***}
                    onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                    min={-100}
                    max={300}
                />
            </PanelRow>
        </PanelBody>


    </PanelBody>]
}

export default PieOptions