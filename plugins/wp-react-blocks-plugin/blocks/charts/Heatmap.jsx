import {PanelBody, PanelRow} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {ChartColors, ChartLegends} from '@devgateway/dvz-wp-commons';
import AxisConfig from './AxisConfig.jsx';

const HeatmapOptions = (props) => {
    return [<PanelBody initialOpen={false} title={__("Heatmap Options")}>
        <PanelBody initialOpen={false} title={__("Examples & Presets")}>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('API mapping')}</strong><br />
                    {__('Use 2 dimensions: first = rows, second = columns.')}<br />
                    {__('Use 1 measure for the cell value / intensity.')}
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('CSV example')}</strong><br />
                    <code>row,column,value</code><br />
                    <code>County A,2024,12</code><br />
                    <code>County A,2025,18</code>
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('Default tooltip')}</strong><br />
                    <code>{'<strong>{rowLabel}</strong><br/>{columnLabel}<br/>{measureLabel}: #(value)'}</code>
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

export default HeatmapOptions;

