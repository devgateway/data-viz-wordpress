import React from "react";
import { ColorPalette, ***REMOVED***, ***REMOVED***, useBlockProps } from '@wordpress/block-editor';
import {
    __experimentalNumberControl as NumberControl,
    __experimentalText as Text,
    Button,
    ButtonGroup,
    ***REMOVED***,
    Panel,
    PanelBody,
    PanelRow,
    RangeControl,
    ResizableBox,
    TextControl
} from '@wordpress/components'
import { __ } from '@wordpress/i18n';
import { useSetting, ***REMOVED***, BlockEditWithFiltersState, SizeConfig } from '@dg-data-viz/wp-commons';
import apiFetch from '@wordpress/api-fetch';
import { NewTimeLineAttributes, ***REMOVED*** } from "./types";
import { NewTimeLineBlockProps } from "./types";

const COLORS = ["#6acbd5", "#fcb535", "#f79132", "#e54957", "#0e5583", "#2fb2e4", "#fcb535"]
const FontSelector = (props: {
    setAttributes: (attributes: Partial<NewTimeLineAttributes>) => void;
    attributes: {
        fontSize: string;
    };
}) => {

    const {
        setAttributes,
        attributes: {
            fontSize
        },
    } = props;
    return <***REMOVED***
        fontSizes={[]}
        value={fontSize}
        ***REMOVED***={14}
        onChange={(newFontSize) => {
            if (newFontSize) {
                setAttributes({ fontSize: newFontSize.toString() })
            }
        }}
    />
}

class BlockEdit extends ***REMOVED***<NewTimeLineBlockProps, BlockEditWithFiltersState> {

    constructor(props: NewTimeLineBlockProps) {
        super(props);
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.onLoadPosts = this.onLoadPosts.bind(this)
    }


    onLoadPosts() {
        const {
            ***REMOVED***,
            setAttributes,
            attributes: {
                fontColor,
                count,
                type,
                taxonomy,
                categories,
                height = 450,
                config,
            },
        } = this.props;



        // path: '/wp/v2/' + taxonomy + '?per_page=100',
        let url = "/wp/v2/" + (type ? type : 'posts')

        url += (categories ? (taxonomy ? '?' + taxonomy : '&categories') + "=" + (categories ? categories : "") : '') //ids


        apiFetch({ path: url }).then((data) => {
            // alert(data)
        })
    }

    ***REMOVED***(checked: boolean, value: string) {
        super.***REMOVED***(checked, value)
    }

    render() {
        const {
            ***REMOVED***,
            setAttributes,
            attributes: {
                lineWidth,
                position,
                config,
                count,
                type,
                lineColor,
                taxonomy,
                categories,
                height = 450,
                marginLeft,
                marginBottom,
                marginRight,
                marginTop,
                fontSize,
                titleWidth,
                subtitleWidth
            },
        } = this.props;

        const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}&data-height=${height}&data-config=${***REMOVED***(JSON.stringify(config))}&data-csv-line-color=${***REMOVED***(lineColor)}&data-position=${position}&data-line-width=${lineWidth}&data-margin-left=${marginLeft}&data-margin-top=${marginTop}&data-margin-right=${marginRight}&data-margin-bottom=${marginBottom}&data-font-size=${fontSize}&data-title-width=${titleWidth}&data-subtitle-width=${subtitleWidth}`
        const divStyles = { height: height + 'px', width: '100%' }


        const newConfig: ***REMOVED***[] = []
        if (count) {
            Array.from(Array(count).keys()).forEach(i => {
                if (!config[i]) {
                    newConfig.push({
                        circleColor: COLORS[i] || "#000000",
                        lineColor: COLORS[i] || "#000000",
                        labelColor: "#000000",
                        titleColor: COLORS[i] || "#000000",
                        size: 10,
                        ***REMOVED***: 20,
                        titleOffset: (i % 2 > 0) ? 120 : -120,
                        ***REMOVED***: 100,
                        position: (i % 2 > 0) ? "bottom" : "top",
                        readMoreLabel: "read more"
                    })
                } else {
                    newConfig.push(Object.assign({}, config[i]))
                };
            })
        }



        return (
            <div>
                <***REMOVED***>
                    <Panel header={__("Settings")}>
                        <SizeConfig initialOpen={false} setAttributes={setAttributes} height={height} panelStatus={this.props.attributes.panelStatus}></SizeConfig>


                        {
                            this.renderFilters()
                        }


                        <PanelBody title={__("Settings")}>

                            <PanelRow>
                                <NumberControl
                                    ***REMOVED***={true}
                                    onChange={(count) => {
                                        if (count) {
                                            setAttributes({ count: parseInt(count) })
                                        }
                                        setAttributes({ config: newConfig })
                                    }}
                                    shiftStep={1}
                                    min={1}
                                    max={10}
                                    value={count}
                                    label={__("Items")} />
                            </PanelRow>
                            <PanelRow>
                                <Text>{__("Position")}</Text>
                            </PanelRow>

                            <PanelRow>
                                <Button variant={position == 'top' ? 'primary' : 'secondary'}
                                    onClick={e => {
                                        setAttributes({ position: "top" })
                                    }}>
                                    {__("Top")}
                                </Button>

                                <Button variant={position == 'middle' ? 'primary' : 'secondary'}
                                    onClick={e => {
                                        setAttributes({ position: "middle" })
                                    }}>
                                    {__("Middle")}
                                </Button>

                                <Button variant={position == 'bottom' ? 'primary' : 'secondary'}
                                    onClick={e => {
                                        setAttributes({ position: "bottom" })
                                    }}>
                                    {__("Bottom")}
                                </Button>
                            </PanelRow>

                            <PanelRow>
                                <RangeControl
                                    label={__('Line Width')}
                                    value={lineWidth}
                                    onChange={(lineWidth) => {
                                        setAttributes({ lineWidth })
                                    }}
                                    min={0}
                                    max={10}
                                />
                            </PanelRow>

                            <PanelRow>
                                <Text>{__("Font Size")}</Text>
                            </PanelRow>
                            <PanelRow>
                                <FontSelector {...this.props}></FontSelector>
                            </PanelRow>

                            <PanelRow>
                                <Text>{__("Line Color")}</Text>
                            </PanelRow>

                            <PanelRow>
                                <Text>{__("Line Color")}</Text>
                                <ColorPalette
                                    value={lineColor}
                                    onChange={(value) => setAttributes({ lineColor: value })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label={__('Title Width')}
                                    value={titleWidth}
                                    onChange={(titleWidth) => {
                                        setAttributes({ titleWidth })
                                    }}
                                    min={0}
                                    max={400}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label={__('Subtitle Width')}
                                    value={subtitleWidth}
                                    onChange={(subtitleWidth) => {
                                        setAttributes({ subtitleWidth })
                                    }}
                                    min={0}
                                    max={400}
                                />
                            </PanelRow>

                        </PanelBody>
                        <PanelBody title={__("Margin Configuration")}>
                            <PanelRow>
                                <RangeControl
                                    label={__('Margin Bottom')}
                                    value={marginBottom}
                                    onChange={(marginBottom) => setAttributes({ marginBottom })}
                                    min={0}
                                    max={300}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label={__('Margin Left')}
                                    value={marginLeft}
                                    onChange={(marginLeft) => setAttributes({ marginLeft })}
                                    min={0}
                                    max={300}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label={__('Margin Right')}
                                    value={marginRight}
                                    onChange={(marginRight) => setAttributes({ marginRight })}
                                    min={0}
                                    max={300}
                                />
                            </PanelRow>
                            <PanelRow>
                                <RangeControl
                                    label={__('Margin Top')}
                                    value={marginTop}
                                    onChange={(marginTop) => setAttributes({ marginTop })}
                                    min={0}
                                    max={300}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Points Configuration")}>
                            {count && Array.from(Array(count).keys()).map(i => {
                                return <PanelBody title={__("Point") + " - (" + (i + 1) + ")"}>
                                    <PanelRow>
                                        <RangeControl
                                            label={__('Circle Size')}
                                            value={newConfig[i].size}
                                            onChange={(size) => {
                                                newConfig[i].size = size || 0
                                                setAttributes({ config: newConfig })
                                            }}
                                            min={0}
                                            max={100}
                                        />
                                    </PanelRow>


                                    <PanelRow>
                                        <RangeControl
                                            label={__('Subtitle Offset')}
                                            value={newConfig[i].***REMOVED***}
                                            onChange={(offset) => {
                                                newConfig[i].***REMOVED*** = offset || 0
                                                setAttributes({ config: newConfig })
                                            }}
                                            min={-height}
                                            max={height}

                                        />
                                    </PanelRow>
                                    <PanelRow>
                                        <RangeControl
                                            label={__('Title Offset')}
                                            value={newConfig[i].titleOffset}
                                            onChange={(offset) => {
                                                newConfig[i].titleOffset = offset || 0
                                                setAttributes({ config: newConfig })
                                            }}
                                            min={-height}
                                            max={height}

                                        />
                                    </PanelRow>
                                    <PanelRow>
                                        <TextControl
                                            label={__('Read more label')}
                                            value={newConfig[i].readMoreLabel}
                                            onChange={(readMoreLabel) => {
                                                newConfig[i].readMoreLabel = readMoreLabel
                                                setAttributes({ config: newConfig })
                                            }}
                                        />
                                    </PanelRow>
                                    <PanelRow>
                                        <RangeControl
                                            label={__('Connector Line Height')}
                                            value={newConfig[i].***REMOVED***}
                                            onChange={(***REMOVED***) => {
                                                newConfig[i].***REMOVED*** = ***REMOVED*** || 0
                                                setAttributes({ config: newConfig })
                                            }}
                                            min={0}
                                            max={height}

                                        />
                                    </PanelRow>
                                    <PanelRow>
                                        <Text>{__("Connector line direction")}</Text>
                                    </PanelRow>
                                    <PanelRow >
                                        <ButtonGroup>
                                            <Button variant={newConfig[i].position == 'top' ? 'primary' : 'secondary'}
                                                onClick={e => {
                                                    newConfig[i].position = "top"
                                                    setAttributes({ config: newConfig })
                                                }}>
                                                {__("Top")}
                                            </Button>

                                            <Button variant={newConfig[i].position == 'bottom' ? 'primary' : 'secondary'}
                                                onClick={e => {
                                                    newConfig[i].position = "bottom"
                                                    setAttributes({ config: newConfig })
                                                }}>
                                                {__("Bottom")}
                                            </Button>
                                        </ButtonGroup>
                                        <br></br>
                                    </PanelRow>

                                    <***REMOVED*** title={__('Color Settings')}
                                        colorSettings={[
                                            {
                                                value: newConfig[i].circleColor,
                                                onChange: (color) => {
                                                    if (color) {
                                                        newConfig[i].circleColor = color
                                                        setAttributes({ config: newConfig })
                                                    }
                                                }, label: __("Circle Color")
                                            },
                                            {
                                                value: newConfig[i].labelColor,
                                                onChange: (color) => {
                                                    if (color) {
                                                        newConfig[i].labelColor = color
                                                        setAttributes({ config: newConfig })
                                                    }
                                                }, label: __("Subtitle Color")
                                            },
                                            {
                                                value: newConfig[i].titleColor,
                                                onChange: (color) => {
                                                    if (color) {
                                                        newConfig[i].titleColor = color
                                                        setAttributes({ config: newConfig })
                                                    }
                                                }, label: __("Title Color")
                                            },
                                            {
                                                value: newConfig[i].lineColor,
                                                onChange: (color) => {
                                                    if (color) {
                                                        newConfig[i].lineColor = color
                                                        setAttributes({ config: newConfig })
                                                    }
                                                }, label: __("Connector Line Color")
                                            }
                                        ]}
                                    />


                                </PanelBody>
                            })}
                        </PanelBody>

                    </Panel>
                </***REMOVED***>


                <ResizableBox
                    size={{ height }}
                    style={{ "margin": "auto", width: "100%" }}
                    minHeight="50"
                    enable={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: true,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(event, direction, elt, delta) => {
                        setAttributes({
                            height: parseInt(String(height)) + parseInt(String(delta.height)),
                        });
                        ***REMOVED***(true);
                    }}
                    onResizeStart={() => {
                        ***REMOVED***(false);
                    }}>
                    <div style={divStyles}>
                        {this.state.react_ui_url && <iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                            src={this.state.react_ui_url + "/embeddable/newTimeLine"} />}
                    </div>
                </ResizableBox>


            </div>
        )
            ;

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps({ className: 'wp-react-component' });
    const colorsFeature = useSetting('custom-font-sizes');
    const ***REMOVED*** = useSetting('editor-font-sizes');

    return <div {...blockProps}><BlockEdit {...props} /></div>;

}
export default Edit;


