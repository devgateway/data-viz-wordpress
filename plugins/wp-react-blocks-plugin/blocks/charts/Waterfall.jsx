import {PanelBody, PanelRow} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import AxisConfig from './AxisConfig.jsx';

const WaterfallOptions = (props) => {
    return [<PanelBody initialOpen={false} title={__("Waterfall Options")}>
        <PanelBody initialOpen={false} title={__("Examples & Presets")}>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('API mapping')}</strong><br />
                    {__('Use 1 dimension for the step labels.')}<br />
                    {__('Use 1 measure for the step change / amount. Positive values go up and negative values go down.')}
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('CSV example')}</strong><br />
                    <code>label,value,type</code><br />
                    <code>Current retained supply,120,total</code><br />
                    <code>Scenario production gain,35,increase</code><br />
                    <code>Remaining gap,-18,decrease</code>
                </span>
            </PanelRow>
            <PanelRow>
                <span style={{fontSize: '11px'}}>
                    <strong>{__('Default tooltip')}</strong><br />
                    <code>{'<strong>{label}</strong><br/>Start: #(start)<br/>Change: #(value)<br/>End: #(end)'}</code>
                </span>
            </PanelRow>
        </PanelBody>

        <AxisConfig {...props}></AxisConfig>
    </PanelBody>];
};

export default WaterfallOptions;

