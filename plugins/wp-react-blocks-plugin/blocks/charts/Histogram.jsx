import {PanelBody, PanelRow} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {ChartColors, ChartLegends} from '@devgateway/dvz-wp-commons';
import AxisConfig from './AxisConfig.jsx';

const HistogramOptions = (props) => {
    return [<PanelBody initialOpen={false} title={__("Histogram Options")}>
        <PanelBody initialOpen={false} title={__("Examples & Presets")}>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('API mapping')}</strong><br />
                    {__('Use 1 dimension for the observations / records.')}<br />
                    {__('Use 1 measure for the numeric value that should be binned.')}<br />
                    {__('Optional second dimension can be used as a series / comparison grouping when available.')}
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('CSV example')}</strong><br />
                    <code>label,value,series,weight</code><br />
                    <code>Pixel 1,3.2,Scenario A,1</code><br />
                    <code>Pixel 2,4.1,Scenario A,1</code>
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('Default tooltip')}</strong><br />
                    <code>{'<strong>{series}</strong><br/>{binStart} – {binEnd}<br/>Count: #(value)'}</code>
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

export default HistogramOptions;

