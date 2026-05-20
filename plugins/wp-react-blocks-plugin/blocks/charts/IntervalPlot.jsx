import {PanelBody, PanelRow} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {ChartColors} from '@devgateway/dvz-wp-commons';
import AxisConfig from './AxisConfig.jsx';
import Sort from './Sort.jsx';

const IntervalPlotOptions = (props) => {
    return [<PanelBody initialOpen={false} title={__("Interval Plot Options")}>
        <PanelBody initialOpen={false} title={__("Examples & Presets")}>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('API mapping')}</strong><br />
                    {__('Use 1 dimension for labels.')}<br />
                    {__('Use 3 measures in order: Center, Low, High.')}
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('CSV example')}</strong><br />
                    <code>label,center,low,high</code><br />
                    <code>County A,250,210,290</code><br />
                    <code>County B,180,140,230</code>
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('Default tooltip')}</strong><br />
                    <code>{'<strong>{label}</strong><br/>{lowLabel}: #(low)<br/>{centerLabel}: #(value)<br/>{highLabel}: #(high)'}</code>
                </span>
            </PanelRow>
        </PanelBody>

        <PanelBody initialOpen={false} title={__("Colors")}>
            <ChartColors {...props}></ChartColors>
        </PanelBody>
        <PanelBody initialOpen={false} title={__("Sorting")}>
            <Sort
                {...props}
                options={[
                    {label: __('Default', 'dg'), value: 'default'},
                    {label: __('Alphabetically', 'dg'), value: 'alphabetically'},
                    {label: __('By Date', 'dg'), value: 'date'},
                    {label: __('Expected Value', 'dg'), value: 'values'},
                ]}
            />
        </PanelBody>
        <AxisConfig {...props}></AxisConfig>
    </PanelBody>];
};

export default IntervalPlotOptions;

