import React from 'react';
import {***REMOVED***, ***REMOVED***, useBlockProps} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, RangeControl, ResizableBox, TextControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {***REMOVED***, BlockEditWithFiltersState} from '@devgateway/dvz-wp-commons';
import { VerticalFeaturedTabsProps } from './types';



class BlockEdit extends ***REMOVED***<VerticalFeaturedTabsProps, BlockEditWithFiltersState> {
    constructor(props: VerticalFeaturedTabsProps) {
        super(props);
    }

    onChangeColor(i: number, value: string | undefined) {
        if (!value) {
            return;
        }
        const {
            setAttributes,
            attributes: {
                colors
            },
        } = this.props;

        const newColors = Object.assign({}, colors)
        newColors["color_" + i] = value

        setAttributes({"colors": newColors})
    }

    ***REMOVED***() {
        if (this.unsubscribe) {
            this.unsubscribe()
        }
    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        const ***REMOVED*** = this.state?.previewMode
        if (***REMOVED*** !== prevState.previewMode) {
            this.props.setAttributes({previewMode: ***REMOVED***})
        }
    }

    render() {
        const {
            className, isSelected,
            ***REMOVED***,
            setAttributes,
            attributes: {
                count,
                type,
                taxonomy,
                categories,
                height,
                colors,
                readMoreLabel,
                coverWidth,
                previewMode
            },
        } = this.props;

        const colorsParams = Object.keys(colors).map(k => colors[k]).join(",")
        const queryString = `editing=true&data-type=${type}&data-taxonomy=${taxonomy}&data-categories=${categories}&data-items=${count}&data-height=${height}&data-color=${***REMOVED***(colorsParams)}&data-read-more-label=${readMoreLabel}&data-preview-mode=${previewMode}`
        const divStyles = {height: `${height}px`, width: "100%"}
        return (
            <div>

                <***REMOVED***>
                    <Panel header={__("Tabs Configuration")}>
                        <PanelBody title={__("Items & Labels")}>
                            <PanelRow>
                                <RangeControl
                                    label="Items"
                                    value={count}
                                    onChange={(count) => setAttributes({count})}
                                    min={1}
                                    max={10}
                                />

                            </PanelRow>

                            <PanelRow>
                                <RangeControl
                                    label="Cover Size"
                                    value={coverWidth}
                                    onChange={(coverWidth) => setAttributes({coverWidth})}
                                    min={50}
                                    max={500}
                                />
                            </PanelRow>
                        </PanelBody>
                        {this.renderFilters()}
                        <PanelBody title={__("Colors")}>
                            {new Array(count).fill(1).map((v, i) =>
                                <PanelRow key={i}>
                                    <***REMOVED***
                                        title={__(`Color Settings  ${i + 1}`)}
                                        colorSettings={[
                                            {
                                                value: colors[`color_${i}`],
                                                onChange: (colorValue) => this.onChangeColor(i, colorValue),
                                                label: __('Background Color'),
                                            }
                                        ]}
                                    >

                                    </***REMOVED***>
                                </PanelRow>
                            )}

                        </PanelBody>

                    </Panel>

                </***REMOVED***>

                <ResizableBox
                    size={{height}}
                    style={{"margin": "auto", width: "100%"}}
                    minHeight="50"
                    minWidth="50"
                    enable={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(event, direction, elt, delta) => {
                        const newHeight = parseInt(String(height)) + parseInt(String(delta.height));
                        setAttributes({
                            height: newHeight,
                        });
                        ***REMOVED***(true);
                    }}
                    onResizeStart={() => {
                        ***REMOVED***(false);
                    }}>

                <div style={divStyles}>
                        {this.state.react_ui_url&&<iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                                 src={this.state.react_ui_url + "/embeddable/verticalTabs"}/>}

                    </div>
                </ResizableBox>
            </div>
        );

    }
}


const Edit = (props) => {
    const blockProps = useBlockProps({className: 'wp-react-component'});
    return <div {...blockProps}><BlockEdit {...props}/></div>;

}
export default Edit;

