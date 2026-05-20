import {PanelBody, PanelRow} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {ChartColors} from '@devgateway/dvz-wp-commons';
import AxisConfig from './AxisConfig.jsx';
import Sort from './Sort.jsx';

const DumbbellOptions = (props) => {
    return [<PanelBody initialOpen={false} title={__("Dumbbell Options")}>
        <PanelBody initialOpen={false} title={__("Examples & Presets")}>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('API mapping')}</strong><br />
                    {__('Use 1 dimension for the comparison labels.')}<br />
                    {__('Use 2 measures in order: left endpoint, right endpoint.')}
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('CSV example')}</strong><br />
                    <code>label,current,projected</code><br />
                    <code>Maize,220,285</code><br />
                    <code>Beans,180,205</code>
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('Default tooltip')}</strong><br />
                    <code>{'<strong>{label}</strong><br/>{leftLabel}: #(left)<br/>{rightLabel}: #(right)<br/>Δ: #(delta)'}</code>
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
                    {label: __('By Difference', 'dg'), value: 'values'},
                ]}
            />
        </PanelBody>
        <AxisConfig {...props}></AxisConfig>
    </PanelBody>];
};

export default DumbbellOptions;

