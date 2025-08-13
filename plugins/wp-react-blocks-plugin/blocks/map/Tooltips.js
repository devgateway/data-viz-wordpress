import { Component } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import {
    Button,
    PanelBody,
    PanelRow,
    SelectControl,
    ***REMOVED***,
    RangeControl,
    ToggleControl
} from '@wordpress/components';

export default class Tooltips extends Component {
    constructor(props) {
        super(props);
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
    }

    setFieldData(field, value, idx) {
        const { attributes: { ***REMOVED*** }, setAttributes } = this.props
        const ***REMOVED*** = ***REMOVED***.slice()
        ***REMOVED***[idx][field] = value;
        setAttributes({ ***REMOVED***: ***REMOVED*** });
    }

    ***REMOVED***() {
        const { attributes: { ***REMOVED*** }, setAttributes } = this.props
        let index = ***REMOVED***.length;
        const ***REMOVED*** = {}
        let ***REMOVED*** = ***REMOVED***.slice()
        ***REMOVED***.push(***REMOVED***)
        setAttributes({ ***REMOVED***: ***REMOVED*** })
    }

    ***REMOVED***(f) {
        const { attributes: { ***REMOVED*** }, setAttributes } = this.props
        let ***REMOVED*** = ***REMOVED***.slice(0, -1)
        setAttributes({ ***REMOVED***: ***REMOVED*** })
    }

    render() {
        const { setAttributes, attributes: { ***REMOVED***, app, tooltipFormat, showTooltip, ***REMOVED***, tooltipTheme, ***REMOVED***}, locations } = this.props;
        return [
            <PanelBody initialOpen={false} title={__("Tooltips")}>
                <PanelRow>
                        <ToggleControl
                            label="Show tooltip"
                            checked={showTooltip}
                            onChange={() => setAttributes({ showTooltip: !showTooltip })} />

                    </PanelRow>
               {showTooltip &&
                   <>
                     <PanelRow>
                        <ToggleControl
                            label="Show 'No Data' tooltip"
                            checked={***REMOVED***}
                            onChange={() => setAttributes({ ***REMOVED***: !***REMOVED*** })} />
                            
                     </PanelRow>
                       <PanelRow>
                           <SelectControl
                               style={{ width: 100 }}
                               label={__('Tooltip theme')}
                               value={[tooltipTheme]}
                               onChange={(tooltipTheme) => {
                                   setAttributes({ tooltipTheme })
                               }}
                               options={[{ label: "Dark", value: "map-tooltip-dark" }, { label: "Light", value: "map-tooltip-light" }]}>

                           </SelectControl>
                       </PanelRow>
                       <PanelRow>
                           <RangeControl
                               label={__('Tooltip Font Size')}
                               value={***REMOVED***}
                               onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })}
                               min={0}
                               max={20} />
                       </PanelRow>
                       <PanelRow>
                            <span style={{"font-size":"11px"}}>Location -> { '{locationName}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{"font-size":"11px"}}>Field Label -> { '{label}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{"font-size":"11px"}}>Measure Label -> { '{measureLabel}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{"font-size":"11px"}}>Field Value -> { '{value}'}</span>
                        </PanelRow>
                        <PanelRow>
                            <span style={{"font-size":"11px"}}>All variables/columns that start with an _ in csv</span>
                        </PanelRow>
                <PanelRow>
                <***REMOVED***
                    label={__("Tooltip Format")}
                    value={tooltipFormat}
                     onChange={(tooltipFormat) => setAttributes({tooltipFormat})}
                />
            </PanelRow>
            <PanelBody initialOpen={false} title={__("Custom Tooltips")}>
            {***REMOVED***.map((f, index) => {
                return (
                    <PanelBody initialOpen={true} title={__(`Custom Tooltip for: ${f.location ? f.location : ''}`)}>
                        {<SelectControl
                            style={{ width: 150 }}
                            label={__('Location to Match')}
                            value={[f.location]}
                            onChange={(value) => {
                                this.setFieldData('location', value, index)
                            }}
                            options={locations ? [{value:'', label: 'Select Location'}, ...locations] : []}>
                        </SelectControl>}

                        {<***REMOVED*** label={__("Tooltip text")}
                            value={f.tooltip} onChange={value => this.setFieldData('tooltip', value, index)} />}
                    </PanelBody>)
            })}
            <PanelRow>
                <Button isLink onClick={this.***REMOVED***}>{__("Add Custom Tooltip")}</Button>
                <Button isLink onClick={this.***REMOVED***}>{__("Remove Custom Tooltip")}</Button>
            </PanelRow>
        </PanelBody>
                   </>
               }       
        </PanelBody>
        ]
    }
}