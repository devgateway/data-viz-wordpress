import React from 'react';
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
import {PanelColorSettings} from '@wordpress/block-editor';

export type LegendPosition = 'left' | 'top' | 'right' | 'bottom';

export type LegendProps = {
    legendPosition: LegendPosition;
    setAttributes: (attributes: {
        showLegends: boolean;
        legendPosition: LegendPosition;
        marginLeft: number;
        marginRight: number;
        marginBottom: number;
        marginTop: number;
        legendLabel: string;
        useLabelBackground: boolean;
        useCheckBoxBackground: boolean;
        legendLabelColor: string | null;
        reverseLegend: boolean;
    }) => void;

    attributes: {
        showLegends: boolean;
        legendPosition: LegendPosition;
        marginLeft: number;
        marginRight: number;
        marginBottom: number;
        marginTop: number;
        legendLabel: string;
        useLabelBackground: boolean;
        useCheckBoxBackground: boolean;
        legendLabelColor: string;
        reverseLegend: boolean;
    }
}


const ChartLegends = (props: LegendProps) => {
    const {
        setAttributes, legendPosition, attributes
    } = props;

    const {
        showLegends,
        marginLeft,
        marginRight,
        marginBottom,
        marginTop,
        legendLabel,
        useLabelBackground,
        useCheckBoxBackground,
        legendLabelColor,
        reverseLegend
    } = attributes;

    return [
        <PanelBody initialOpen={false}   title={__("Margins")}>
            <PanelRow>
                <RangeControl
                    label={__('Margin Bottom (Space between chart area and bottom border)')}
                    value={marginBottom}
                    onChange={(marginBottom) => {
                        if (marginBottom) {
                            setAttributes({...attributes, marginBottom})
                        }
                    }}
                    min={0}
                    max={500}
                />
            </PanelRow>

            <PanelRow>
                <RangeControl
                    label={__('Margin Left (Space between chart area and left border)')}
                    value={marginLeft}
                    initialPosition={0}
                    onChange={(marginLeft) => {
                        if (marginLeft) {
                            setAttributes({...attributes, marginLeft})
                        }
                    }}
                    step={1}
                    min={0}
                    max={500}/>
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Margin Right')}
                    value={marginRight}
                    onChange={(marginRight) => {
                        if (marginRight) {
                            setAttributes({...attributes, marginRight})
                        }
                    }}
                    min={0}
                    max={500}
                />
            </PanelRow>
            <PanelRow>
                <RangeControl
                    label={__('Margin Top')}
                    value={marginTop}
                    onChange={(marginTop) => {
                        if (marginTop) {
                            setAttributes({...attributes, marginTop})
                        }
                    }}
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
                    onChange={() => setAttributes({...attributes, showLegends: !showLegends})}
                />
            </PanelRow>
           
            {showLegends &&
                <PanelRow>
                    <ToggleControl
                        label={__("Reverse legend order")}
                        checked={reverseLegend}
                        onChange={() => setAttributes({...attributes, reverseLegend: !reverseLegend })}
                    />
                </PanelRow>
            }
            {showLegends && <PanelRow>
                <ToggleControl label={__("Use Label Background")} checked={useLabelBackground}
                               onChange={() => setAttributes({...attributes, useLabelBackground: !useLabelBackground})}></ToggleControl>

            </PanelRow>
            }
            {showLegends && <PanelRow>
                <ToggleControl label={__("Use Checkbox Background")} checked={useCheckBoxBackground}
                               onChange={() => setAttributes({...attributes, useCheckBoxBackground: !useCheckBoxBackground})}></ToggleControl>

            </PanelRow>

            }
           
             {showLegends && <PanelRow>
                <ButtonGroup>
                    <Button variant={legendPosition == 'left' ? 'primary' : 'secondary'}
                            onClick={() => setAttributes({...attributes, legendPosition: "left"})}>
                        {__("Left")}
                    </Button>
                    <Button variant={legendPosition == 'top' ? 'primary' : 'secondary'}
                            onClick={() => setAttributes({...attributes, legendPosition: "top"})}>
                        {__("Top")}
                    </Button>
                    <Button variant={legendPosition == 'right' ? 'primary' : 'secondary'}
                            onClick={() => setAttributes({...attributes, legendPosition: "right"})}>
                        {__("Right")}
                    </Button>
                    <Button variant={legendPosition == 'bottom' ? 'primary' : 'secondary'}
                            onClick={() => setAttributes({...attributes, legendPosition: "bottom"})}>
                        {__("Bottom")}
                    </Button>
                </ButtonGroup>

            </PanelRow>}
            {showLegends && <PanelRow>
                <TextControl
                    label={__('Legends Title')}
                    value={legendLabel}
                    onChange={(legendLabel) => setAttributes({...attributes, legendLabel})}
                />
            </PanelRow>
            }
            {showLegends && <PanelRow>
                <PanelColorSettings
                    title={__('Legends text color')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(legendLabelColor ? legendLabelColor : "#000000"),

                            onChange: (color) => {

                                if (color) {
                                    setAttributes({...attributes, legendLabelColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({...attributes, legendLabelColor: null})
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