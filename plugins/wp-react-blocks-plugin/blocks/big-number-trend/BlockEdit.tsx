import React from 'react';
import { ***REMOVED***, ***REMOVED***, useBlockProps } from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
    ResizableBox,
    SelectControl,
    TextControl,
    ***REMOVED***,
    __experimentalText as Text,
    ToggleControl,
    ***REMOVED***
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
    BlockEditWithAPIMetadata,
    SizeConfig,
    Measures,
    DataFilters,
    isSupersetAPI,
    Format,
    togglePanel,
} from '@devgateway/dvz-wp-commons';
import { ***REMOVED*** } from './types';

class BlockEdit extends BlockEditWithAPIMetadata<***REMOVED***, any> {
    constructor(props: ***REMOVED***) {
        super(props);
    }

    ***REMOVED***() {
        super.***REMOVED***()
    }

    render() {
        const {
            className, isSelected,
            ***REMOVED***, setAttributes,
            attributes: {
                measures,
                height,
                app,
                format,
                filters,
                group,
                panelStatus,
                ***REMOVED***,
                label,
                ***REMOVED***,
                ***REMOVED***,
                labelFontSize,
                textColor,
                dimension1,
                ***REMOVED***,
                csv,
                type
            }
        } = this.props;


        const datasets = [{ label: 'Select Dataset', value: '0' }]
        if (this.state.datasets) {
            this.state.datasets.forEach(d => {
                datasets.push({ label: d.label, value: d.id })
            })
        }

        let params = {}
        filters.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
        const divStyles = { height: height + 'px', width: '100%' }

        return ([isSelected && (
            <***REMOVED***>
                <Panel header={__("Chart Configuration")}>
                    <PanelBody
                        initialOpen={panelStatus['GROUP']}
                        opened={panelStatus['GROUP']}
                        onToggle={e => togglePanel("GROUP", panelStatus, setAttributes)}
                        title={__("Group")}>
                        <PanelRow>
                            <TextControl
                                label={__('Name')}
                                value={group}
                                onChange={(group) => setAttributes({ group })}
                            />
                        </PanelRow>
                    </PanelBody>
                    <SizeConfig
                        setAttributes={setAttributes}
                        panelStatus={panelStatus}
                        height={height}
                        initialOpen={panelStatus['SIZE']}
                    />

                    <>
                        <PanelBody initialOpen={false} title={__("API & Source")}>
                            <PanelRow>
                                <SelectControl
                                    multiple={false}
                                    value={app}
                                    onChange={(app) => {
                                        setAttributes({
                                            app: app
                                        })
                                    }}
                                    options={this.state.apps}
                                />
                            </PanelRow>


                            {isSupersetAPI(app, this.state.apps) && <PanelRow>
                                <SelectControl
                                    multiple={false}
                                    label={__('Datasets')}
                                    value={***REMOVED***}
                                    onChange={(newDatasetId) => {
                                        setAttributes({
                                            ***REMOVED***: newDatasetId
                                        })

                                        this.loadMetadata(app, newDatasetId)
                                    }}
                                    options={datasets}
                                />
                            </PanelRow>
                            }
                        </PanelBody>

                        {app != 'csv' &&
                            <PanelBody initialOpen={false} title={__("Dimensions")}>
                                <PanelRow>
                                    <SelectControl
                                        multiple={false}
                                        label={__("First Dimension")}
                                        value={dimension1}
                                        onChange={(value) => {
                                            setAttributes({
                                                dimension1: value
                                            });
                                        }}
                                        options={this.state.dimensions}
                                    />
                                </PanelRow>
                            </PanelBody>
                        }
                        {app == 'csv' &&
                            <>
                                <PanelBody initialOpen={false} title={__("CSV Configuration")}
                                    onToggle={e => togglePanel("csv_cfg", panelStatus, setAttributes)}>
                                    <PanelRow>
                                        <***REMOVED***
                                            label={__("CSV Data")}
                                            value={csv}
                                            onChange={(csv) => setAttributes({ csv })}
                                        />
                                    </PanelRow>

                                    <Format
                                        hiddenCustomAxisFormat={type == 'radar' || type == 'big-number'}
                                        format={format}
                                        customFormat={{}}
                                        ***REMOVED***={false}
                                        ***REMOVED***={(newFormat, field) => {
                                            console.log("newFormat", newFormat)
                                            setAttributes({ format: newFormat })
                                        }}
                                        onUseCustomAxisFormatChange={value => {
                                        }}
                                    >
                                    </Format>
                                </PanelBody>
                            </>
                        }

                        {app != 'csv' &&
                            <Measures
                                {...this.props}
                                title={__(`Measure`)}
                                ***REMOVED***={value => {
                                    setAttributes({ measures: [value] })
                                }}
                                ***REMOVED***={value => {
                                    setAttributes({ format: value })
                                }}
                                allMeasures={this.state.measures}
                                format={format}
                                attributes={{
                                    measures,
                                    app,
                                    panelStatus,
                                    dimension1,
                                    type
                                }}
                            />
                        }



                        <DataFilters
                            allFilters={this.state.filters}
                            allCategories={this.state.categories}
                            {...this.props} />

                    </>
                    <PanelBody title={__('Settings')} initialOpen={false}>
                        <PanelRow>
                            <ToggleControl label={__('Show Percentage Change')}
                                checked={***REMOVED***}
                                onChange={(***REMOVED***) => setAttributes({ ***REMOVED*** })} />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('Label')}
                                value={label}
                                onChange={(label) => setAttributes({ label })}
                            />
                        </PanelRow>
                        <PanelRow>
                            <Text>{__("Big Number Font Size")}</Text>
                        </PanelRow>
                        <***REMOVED***
                            fontSizes={[]}
                            value={***REMOVED***}
                            ***REMOVED***={14}
                            onChange={(newFontSize) => {
                                setAttributes({ ***REMOVED***: newFontSize })
                            }}
                        />
                        <PanelRow>
                            <Text>{__("Percent Change Font Size")}</Text>
                        </PanelRow>
                        <***REMOVED***
                            fontSizes={[]}
                            value={***REMOVED***}
                            ***REMOVED***={14}
                            onChange={(newFontSize) => {
                                setAttributes({ ***REMOVED***: newFontSize })
                            }}
                        />
                        <PanelRow>
                            <Text>{__("Label Font Size")}</Text>
                        </PanelRow>
                        <***REMOVED***
                            fontSizes={[]}
                            value={labelFontSize}
                            ***REMOVED***={14}
                            onChange={(newFontSize) => {
                                setAttributes({ labelFontSize: newFontSize })
                            }}
                        />

                        <***REMOVED*** title={__('Color Settings')}
                            colorSettings={[
                                {
                                    value: textColor,
                                    onChange: (color) => {
                                        setAttributes({ textColor: color })
                                    },
                                    label: __("Text Color")
                                }
                            ]}
                        />
                    </PanelBody>
                </Panel>
            </***REMOVED***>),
        (<ResizableBox
            size={{ height }}
            style={{ "margin": "auto", width: "100%" }}
            minHeight="0"
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
                setAttributes({
                    height: parseInt(String(height), 10) + parseInt(String(delta.height), 10),
                });
                ***REMOVED***(true);
            }}
            onResizeStart={() => {
                ***REMOVED***(false);
            }}>

            <div className={className}>
                {this.state.react_ui_url && <iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                    src={this.state.react_ui_url + "/embeddable/***REMOVED***?"} />}

            </div>
        </ResizableBox>
        )]
        );

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps();
    return <div {...blockProps}><BlockEdit {...props} /></div>;
}
export default Edit;
