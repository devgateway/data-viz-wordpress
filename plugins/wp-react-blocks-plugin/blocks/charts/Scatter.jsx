import {PanelBody, PanelRow, RangeControl, SelectControl, TextControl, ToggleControl} from '@wordpress/components';
import {PanelColorSettings} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';
import { ChartColors, ChartLegends } from '@devgateway/dvz-wp-commons';
import AxisConfig from './AxisConfig.jsx';

const ScatterOptions = (props) => {
    const {
        setAttributes,
        attributes: {
            app,
            measures,
            scatterMinSize,
            scatterMaxSize,
            scatterShowLabels,
            scatterLabelPosition,
            scatterLabelColor,
            scatterLabelSize,
            scatterConnectPoints,
            scatterPointOpacity,
            scatterXMeasure,
            scatterYMeasure,
            scatterSizeMeasure,
            scatterColorMeasure,
            scatterReferenceX,
            scatterReferenceY,
            scatterReferenceXLabel,
            scatterReferenceYLabel,
            scatterQuadrantTopLeftLabel,
            scatterQuadrantTopRightLabel,
            scatterQuadrantBottomLeftLabel,
            scatterQuadrantBottomRightLabel,
            scatterXAxisLegendOffset,
            scatterYAxisLegendOffset,
        },
    } = props;

    const showQuadrantLabels = scatterReferenceX !== '' && scatterReferenceY !== '';
    const selectedMeasureConfig = measures?.[app] || {};
    const selectedMeasureOptions = (props.allMeasures || [])
        .filter((measure) => selectedMeasureConfig?.[measure.value]?.selected)
        .sort((left, right) => (left.position || 0) - (right.position || 0))
        .map((measure) => ({
            value: measure.value,
            label: `${measure.group || __('Measure')} - ${measure.label || measure.value}`,
        }));

    const axisMeasureOptions = [{label: __('Auto'), value: ''}, ...selectedMeasureOptions];
    const optionalMeasureOptions = [{label: __('None'), value: ''}, ...selectedMeasureOptions];

    const setScatterMeasure = (attributeName, value) => {
        setAttributes({[attributeName]: value || ''});
    };

    return [<PanelBody initialOpen={false} title={__("Scatter Options")}>
        <PanelBody initialOpen={false} title={__("Measure Mapping")}>
            <PanelRow>
                <SelectControl
                    label={__('X Axis Measure')}
                    value={scatterXMeasure || ''}
                    options={axisMeasureOptions}
                    onChange={(value) => setScatterMeasure('scatterXMeasure', value)}
                    help={__('If empty, the first selected measure is used.')}
                />
            </PanelRow>
            <PanelRow>
                <SelectControl
                    label={__('Y Axis Measure')}
                    value={scatterYMeasure || ''}
                    options={axisMeasureOptions}
                    onChange={(value) => setScatterMeasure('scatterYMeasure', value)}
                    help={__('If empty, the second selected measure is used.')}
                />
            </PanelRow>
            <PanelRow>
                <SelectControl
                    label={__('Bubble Size Measure')}
                    value={scatterSizeMeasure || ''}
                    options={optionalMeasureOptions}
                    onChange={(value) => setScatterMeasure('scatterSizeMeasure', value)}
                    help={__('Optional. Use a third measure for bubble size.')}
                />
            </PanelRow>
            <PanelRow>
                <SelectControl
                    label={__('Bubble Color Intensity Measure')}
                    value={scatterColorMeasure || ''}
                    options={optionalMeasureOptions}
                    onChange={(value) => setScatterMeasure('scatterColorMeasure', value)}
                    help={__('Optional. Example: color_weighted_roi_pct.')}
                />
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    {__('Scatter now uses each selected measure\'s format in axes and tooltips.')}
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    {__('Second dimension is kept for multi-series use (for example, points by county and series by scenario). If a chosen dimension matches a selected measure key, it is ignored to avoid Superset duplicate-label errors.')}
                </span>
            </PanelRow>
        </PanelBody>

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
            {scatterShowLabels && (
                <>
                    <PanelRow>
                        <SelectControl
                            label={__('Label Position')}
                            value={scatterLabelPosition || 'top-right'}
                            options={[
                                {label: __('Top Right'), value: 'top-right'},
                                {label: __('Top'), value: 'top'},
                                {label: __('Top Left'), value: 'top-left'},
                                {label: __('Right'), value: 'right'},
                                {label: __('Center'), value: 'center'},
                                {label: __('Left'), value: 'left'},
                                {label: __('Bottom Right'), value: 'bottom-right'},
                                {label: __('Bottom'), value: 'bottom'},
                                {label: __('Bottom Left'), value: 'bottom-left'},
                            ]}
                            onChange={(value) => setAttributes({scatterLabelPosition: value || 'top-right'})}
                        />
                    </PanelRow>
                    <PanelRow>
                        <PanelColorSettings
                            title={__('Label Color')}
                            colorSettings={[{
                                value: scatterLabelColor || '',
                                onChange: (color) => setAttributes({scatterLabelColor: color || ''}),
                                label: __('Label Color'),
                            }]}
                        />
                    </PanelRow>
                    <PanelRow>
                        <RangeControl
                            label={__('Label Size')}
                            value={Number(scatterLabelSize) || 11}
                            onChange={(value) => setAttributes({scatterLabelSize: Number(value) || 11})}
                            min={8}
                            max={24}
                        />
                    </PanelRow>
                </>
            )}
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
                <RangeControl
                    label={__('X Axis Label Offset')}
                    value={Number(scatterXAxisLegendOffset) || 56}
                    onChange={(value) => setAttributes({scatterXAxisLegendOffset: Number(value) || 56})}
                    min={20}
                    max={120}
                    help={__('Distance from axis ticks to axis title label (bottom axis).')}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Y Axis Label Offset')}
                    value={Number(scatterYAxisLegendOffset) || 60}
                    onChange={(value) => setAttributes({scatterYAxisLegendOffset: Number(value) || 60})}
                    min={20}
                    max={120}
                    help={__('Distance from axis ticks to axis title label (left axis).')}
                />
            </PanelRow>
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

