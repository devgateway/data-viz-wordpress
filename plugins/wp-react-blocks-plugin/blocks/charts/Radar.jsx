import {PanelBody, PanelRow, RangeControl, SelectControl, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import { ChartColors, ChartLegends} from '@devgateway/dvz-wp-commons'


const RadarChart = (props) => {
    const {
        setAttributes, attributes: {
            radarCurve,
            radarFillOpacity,
            radarBorderWidth,
            radarGridLevels,
            radarGridShape,
            radarGridLabelOffset,
            radarEnableDots,
            radarDotSize,
            radarEnableDotLabel,
            radarDotLabelOffset,
        }
    } = props;

    return [<PanelBody initialOpen={false} title={__("Radar Options")}>
        <PanelBody initialOpen={false} title={__("Shape & Grid")}>
            <PanelRow>
                <SelectControl
                    label={__('Curve')}
                    value={radarCurve}
                    onChange={(value) => setAttributes({radarCurve: value})}
                    options={[
                        {value: 'linearClosed', label: __('Linear')},
                        {value: 'cardinalClosed', label: __('Cardinal')},
                        {value: 'catmullRomClosed', label: __('Catmull-Rom')},
                        {value: 'basisClosed', label: __('Basis')},
                    ]}
                />
            </PanelRow>
            <PanelRow>
                <SelectControl
                    label={__('Grid Shape')}
                    value={radarGridShape}
                    onChange={(value) => setAttributes({radarGridShape: value})}
                    options={[
                        {value: 'circular', label: __('Circular')},
                        {value: 'linear', label: __('Polygon')},
                    ]}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Grid Levels')}
                    value={Number(radarGridLevels) || 1}
                    onChange={(value) => setAttributes({radarGridLevels: value || 1})}
                    min={1}
                    max={12}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Grid Label Offset')}
                    value={Number(radarGridLabelOffset) || 0}
                    onChange={(value) => setAttributes({radarGridLabelOffset: value || 0})}
                    min={-100}
                    max={100}
                />
            </PanelRow>
        </PanelBody>
        <PanelBody initialOpen={false} title={__("Series & Dots")}>
            <PanelRow>
                <RangeControl
                    label={__('Area Fill Opacity')}
                    value={Number(radarFillOpacity) || 0}
                    onChange={(value) => setAttributes({radarFillOpacity: value ?? 0})}
                    min={0}
                    max={1}
                    step={0.05}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Border Width')}
                    value={Number(radarBorderWidth) || 0}
                    onChange={(value) => setAttributes({radarBorderWidth: value || 0})}
                    min={0}
                    max={10}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label={__("Enable Dots")}
                    checked={radarEnableDots === true}
                    onChange={(value) => setAttributes({radarEnableDots: value})}/>
            </PanelRow>
            {radarEnableDots === true && (
                <>
                    <PanelRow>
                        <RangeControl
                            label={__('Dot Size')}
                            value={Number(radarDotSize) || 0}
                            onChange={(value) => setAttributes({radarDotSize: value || 0})}
                            min={0}
                            max={24}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label={__("Enable Dot Labels")}
                            checked={radarEnableDotLabel === true}
                            onChange={(value) => setAttributes({radarEnableDotLabel: value})}/>
                    </PanelRow>
                    {radarEnableDotLabel === true && (
                        <PanelRow>
                            <RangeControl
                                label={__('Dot Label Offset')}
                                value={Number(radarDotLabelOffset) || 0}
                                onChange={(value) => setAttributes({radarDotLabelOffset: value || 0})}
                                min={-40}
                                max={40}
                            />
                        </PanelRow>
                    )}
                </>
            )}
        </PanelBody>
        <PanelBody initialOpen={false} title={__("Colors")}>
            <ChartColors {...props}></ChartColors>
        </PanelBody>
        <ChartLegends {...props}></ChartLegends>
    </PanelBody>]
}

export default RadarChart