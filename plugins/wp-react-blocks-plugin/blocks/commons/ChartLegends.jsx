import {
    Button,
    ButtonGroup,
    PanelBody,
    PanelRow,
    RangeControl,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/block-editor';

const ChartLegends = (props) => {
    const {
        setAttributes, attributes: {
            showLegends, ***REMOVED***, marginLeft,
            marginRight,
            marginBottom,
            marginTop,
            legendLabel,
            ***REMOVED***,
            useCheckBoxBackground,
            ***REMOVED***,
            reverseLegend,
            ***REMOVED***,
            numberOfLegendColumns
        }
    } = props;

    return [
        <PanelBody initialOpen={false}   title={__("Margins")}>
            <PanelRow>
                <RangeControl
                    label={__('Margin Bottom (Space between chart area and bottom border)')}
                    value={marginBottom}
                    onChange={(marginBottom) => setAttributes({marginBottom})}
                    min={0}
                    max={500}
                />
            </PanelRow>

            <PanelRow>
                <RangeControl
                    label={__('Margin Left (Space between chart area and left border)')}
                    value={marginLeft}
                    ***REMOVED***={0}
                    onChange={(marginLeft) => setAttributes({marginLeft})}
                    step={1}
                    min={0}
                    max={500}/>
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Margin Right')}
                    value={marginRight}
                    onChange={(marginRight) => setAttributes({marginRight})}
                    min={0}
                    max={500}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Margin Top')}
                    value={marginTop}
                    onChange={(marginTop) => setAttributes({marginTop})}
                    min={0}
                    max={500}
                />
            </PanelRow>
        </PanelBody>,
        <PanelBody initialOpen={false}   title={__("Legends")}>

            <PanelRow>
                <ToggleControl
                    label={__("Show Legends")}
                    checked={showLegends}
                    onChange={() => setAttributes({showLegends: !showLegends})}
                />
            </PanelRow>
            {showLegends && <PanelRow>
                <ToggleControl
                    label={__("Show Legends in Columns")}
                    checked={***REMOVED***}
                    onChange={() => setAttributes({***REMOVED***: !***REMOVED***})}/>
            </PanelRow>}
            {showLegends && ***REMOVED*** && <PanelRow>
                <TextControl
                    label={__('Number of Legend Columns')}
                    value={numberOfLegendColumns}
                    onChange={(numberOfLegendColumns) => setAttributes({numberOfLegendColumns})}
                    type="number"
                    min={1}
                    max={10}/>  
            </PanelRow>}
           
            {showLegends &&
                <PanelRow>
                    <ToggleControl
                        label={__("Reverse legend order")}
                        checked={reverseLegend}
                        onChange={() => setAttributes({ reverseLegend: !reverseLegend })}
                    />
                </PanelRow>
            }
            {showLegends && <PanelRow>
                <ToggleControl label={__("Use Label Background")} checked={***REMOVED***}
                               onChange={e => setAttributes({***REMOVED***: !***REMOVED***})}></ToggleControl>

            </PanelRow>
            }
            {showLegends && <PanelRow>
                <ToggleControl label={__("Use Checkbox Background")} checked={useCheckBoxBackground}
                               onChange={e => setAttributes({useCheckBoxBackground: !useCheckBoxBackground})}></ToggleControl>

            </PanelRow>

            }
           
             {showLegends && <PanelRow>
                <ButtonGroup>
                    <Button isPrimary={***REMOVED*** == 'left'} isSecondary={***REMOVED*** != 'left'}
                            onClick={e => setAttributes({***REMOVED***: "left"})}>
                        {__("Left")}
                    </Button>
                    <Button isPrimary={***REMOVED*** == 'top'}
                            isSecondary={***REMOVED*** != 'top'}
                            onClick={e => setAttributes({***REMOVED***: "top"})}>
                        {__("Top")}
                    </Button>
                    <Button isPrimary={***REMOVED*** == 'right'}
                            isSecondary={***REMOVED*** != 'right'}
                            onClick={e => setAttributes({***REMOVED***: "right"})}>
                        {__("Right")}
                    </Button>
                    <Button isPrimary={***REMOVED*** == 'bottom'}
                            isSecondary={***REMOVED*** != 'bottom'}
                            onClick={e => setAttributes({***REMOVED***: "bottom"})}>
                        {__("Bottom")}
                    </Button>
                </ButtonGroup>

            </PanelRow>}
            {showLegends && <PanelRow>
                <TextControl
                    label={__('Legends Title')}
                    value={legendLabel}
                    onChange={(legendLabel) => setAttributes({legendLabel})}
                />
            </PanelRow>
            }
            {showLegends && <PanelRow>
                <***REMOVED***
                    title={__('Legends text color')}
                    colorSettings={[
                        {
                            value: ***REMOVED***(***REMOVED*** ? ***REMOVED*** : "#000000"),

                            onChange: (color) => {

                                if (color) {
                                    setAttributes({***REMOVED***: ***REMOVED***(color)})
                                } else {
                                    setAttributes({***REMOVED***: null})
                                }
                            },

                            label: __("")
                        }
                    ]}

                /> </PanelRow>}

            
        </PanelBody>,

    ]
}

export default ChartLegends