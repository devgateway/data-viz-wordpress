import {PanelBody, PanelRow, RangeControl, TextControl, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import { ChartColors, ChartLegends } from '@devgateway/dvz-wp-commons';
import AxisConfig from './AxisConfig.jsx';

const ScatterOptions = (props) => {
    const {
        setAttributes,
        attributes: {
            scatterMinSize,
            scatterMaxSize,
            scatterShowLabels,
            scatterConnectPoints,
            scatterPointOpacity,
            scatterReferenceX,
            scatterReferenceY,
            scatterReferenceXLabel,
            scatterReferenceYLabel,
            scatterQuadrantTopLeftLabel,
            scatterQuadrantTopRightLabel,
            scatterQuadrantBottomLeftLabel,
            scatterQuadrantBottomRightLabel,
        },
    } = props;

    const showQuadrantLabels = scatterReferenceX !== '' && scatterReferenceY !== '';

    return [<PanelBody initialOpen={false} title={__("Scatter Options")}>
        <PanelBody initialOpen={false} title={__("Points & Labels")}>
            <PanelRow>
                <RangeControl
                    label={__('Min Point Size')}
                    value={scatterMinSize}
                    onChange={(value) => setAttributes({scatterMinSize: value || 1})}
                    min={1}
                    max={40}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Max Point Size')}
                    value={scatterMaxSize}
                    onChange={(value) => setAttributes({scatterMaxSize: value || 1})}
                    min={1}
                    max={80}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Point Opacity')}
                    value={scatterPointOpacity}
                    onChange={(value) => setAttributes({scatterPointOpacity: value ?? 0.85})}
                    min={0.1}
                    max={1}
                    step={0.05}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label={__("Show Point Labels")}
                    checked={scatterShowLabels === true}
                    onChange={(value) => setAttributes({scatterShowLabels: value})}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label={__("Connect Points")}
                    checked={scatterConnectPoints === true}
                    onChange={(value) => setAttributes({scatterConnectPoints: value})}
                />
            </PanelRow>
        </PanelBody>

        <PanelBody initialOpen={false} title={__("Quadrants & Guides")}>
            <PanelRow>
                <TextControl
                    label={__('Vertical Reference (X)')}
                    value={scatterReferenceX}
                    onChange={(value) => setAttributes({scatterReferenceX: value})}
                    help={__('Numeric value for the vertical guide line.')}
                />
            </PanelRow>
            <PanelRow>
                <TextControl
                    label={__('Vertical Reference Label')}
                    value={scatterReferenceXLabel}
                    onChange={(value) => setAttributes({scatterReferenceXLabel: value})}
                />
            </PanelRow>
            <PanelRow>
                <TextControl
                    label={__('Horizontal Reference (Y)')}
                    value={scatterReferenceY}
                    onChange={(value) => setAttributes({scatterReferenceY: value})}
                    help={__('Numeric value for the horizontal guide line.')}
                />
            </PanelRow>
            <PanelRow>
                <TextControl
                    label={__('Horizontal Reference Label')}
                    value={scatterReferenceYLabel}
                    onChange={(value) => setAttributes({scatterReferenceYLabel: value})}
                />
            </PanelRow>
            {showQuadrantLabels && (
                <>
                    <PanelRow>
                        <TextControl
                            label={__('Top Left Quadrant Label')}
                            value={scatterQuadrantTopLeftLabel}
                            onChange={(value) => setAttributes({scatterQuadrantTopLeftLabel: value})}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Top Right Quadrant Label')}
                            value={scatterQuadrantTopRightLabel}
                            onChange={(value) => setAttributes({scatterQuadrantTopRightLabel: value})}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Bottom Left Quadrant Label')}
                            value={scatterQuadrantBottomLeftLabel}
                            onChange={(value) => setAttributes({scatterQuadrantBottomLeftLabel: value})}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label={__('Bottom Right Quadrant Label')}
                            value={scatterQuadrantBottomRightLabel}
                            onChange={(value) => setAttributes({scatterQuadrantBottomRightLabel: value})}
                        />
                    </PanelRow>
                </>
            )}
        </PanelBody>

        <PanelBody initialOpen={false} title={__("Examples & Presets")}>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('Scatter / Quadrant')}</strong><br />
                    {__('Use 2 measures: first = X, second = Y.')}<br />
                    {__('Use 1 dimension for point labels, optional 2nd dimension for series.')}
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('Bubble')}</strong><br />
                    {__('Use 3 measures: X, Y, then Size.')}
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('Frontier')}</strong><br />
                    {__('Enable “Connect Points” and use a series dimension or naturally ordered point labels.')}
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('CSV example')}</strong><br />
                    <code>label,x,y,size,series</code><br />
                    <code>County A,12,48,120,Scenario 1</code><br />
                    <code>County B,18,52,180,Scenario 1</code>
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('Default tooltip')}</strong><br />
                    <code>{'<strong>{label}</strong><br/>{xLabel}: #(x)<br/>{yLabel}: #(y)<br/>Series: {seriesDisplay}'}</code>
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('Bubble tooltip example')}</strong><br />
                    <code>{'<strong>{label}</strong><br/>{xLabel}: #(x)<br/>{yLabel}: #(y)<br/>{sizeLabel}: #(size)'}</code>
                </span>
            </PanelRow>
        </PanelBody>

        <PanelBody initialOpen={false} title={__("Colors")}>
            <ChartColors {...props}></ChartColors>
        </PanelBody>
        <AxisConfig {...props}></AxisConfig>
        <ChartLegends {...props}></ChartLegends>
    </PanelBody>];
};

export default ScatterOptions;

