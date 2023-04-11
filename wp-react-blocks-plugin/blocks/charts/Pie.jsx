import {
    ***REMOVED***,
    Button,
    ButtonGroup,
    PanelBody,
    PanelRow,
    RangeControl,
    ***REMOVED***,
    ToggleControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import Colors from "./Colors.jsx"
import Legends from "./Legends.jsx";

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
            ***REMOVED***
        }
    } = props;

    
    return [<PanelBody initialOpen={false} title={__("Pie Options")}>
        <Colors {...props}></Colors>
        <PanelRow title={"Start Angle"}>
            <***REMOVED*** value={startAngle} onChange={value => setAttributes({startAngle: value})}/>
        </PanelRow>
        <PanelRow title={"End Angle"}>
            <***REMOVED*** value={endAngle} onChange={value => setAttributes({endAngle: value})}/>
        </PanelRow>
        <PanelRow>
            <RangeControl
                label={__('Slice Padding')}
                value={slicePadding}
                ***REMOVED***={1}
                onChange={(slicePadding) => setAttributes({slicePadding})}
                step={0.5}
                min={0}
                max={20}/>
        </PanelRow>

        <PanelRow>
            <ToggleControl
                label={__("Show Slice Labels")}
                checked={showArcLabels}
                onChange={() => setAttributes({showArcLabels: !showArcLabels})}/>
        </PanelRow>
        <PanelRow>
            <ToggleControl
                label={__("Show Link Labels")}
                checked={***REMOVED***}
                onChange={() => setAttributes({***REMOVED***: !***REMOVED***})}/>
        </PanelRow>
        <Legends {...props}></Legends>


        <PanelBody initialOpen={false} title={__("Center Label")}>
            <PanelBody initialOpen={false} title={__("Variables")}>
                <PanelRow>
                    <span style={{"font-size": "11px"}}>Total Value -> {'{totalValue}'}</span>
                </PanelRow>
            </PanelBody>
            <PanelRow>
                <***REMOVED***
                    label={__("Label")}
                    value={centerLabel}
                    help={__("You can use variables {var_name}.")}
                    onChange={(centerLabel) => setAttributes({centerLabel})}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Font Size')}
                    value={***REMOVED***}
                    onChange={(***REMOVED***) => setAttributes({***REMOVED***})}
                    min={0}
                    max={100}
                />
            </PanelRow>
            <PanelRow>
                <ButtonGroup>
                    <Button isPrimary={centerLabelFontWeight == 'lighter'}
                            isSecondary={centerLabelFontWeight != 'lighter'}
                            onClick={e => setAttributes({centerLabelFontWeight: "lighter"})}>
                        {__("Lighter")}
                    </Button>
                    <Button isPrimary={centerLabelFontWeight == 'normal'}
                            isSecondary={centerLabelFontWeight != 'normal'}
                            onClick={e => setAttributes({centerLabelFontWeight: "normal"})}>
                        {__("Normal")}
                    </Button>
                    <Button isPrimary={centerLabelFontWeight == 'bold'} isSecondary={centerLabelFontWeight != 'bold'}
                            onClick={e => setAttributes({centerLabelFontWeight: "bold"})}>
                        {__("Bold")}
                    </Button>
                </ButtonGroup>
            </PanelRow>

            <PanelRow>
                <RangeControl
                    label={__('X Offset')}
                    value={***REMOVED***}
                    onChange={(***REMOVED***) => setAttributes({***REMOVED***})}
                    min={-100}
                    max={300}
                />
            </PanelRow>

            <PanelRow>
                <RangeControl
                    label={__('Y Offset')}
                    value={***REMOVED***}
                    onChange={(***REMOVED***) => setAttributes({***REMOVED***})}
                    min={-100}
                    max={300}
                />
            </PanelRow>
        </PanelBody>


    </PanelBody>]
}

export default PieOptions