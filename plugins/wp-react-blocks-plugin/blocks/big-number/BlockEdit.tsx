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
    ***REMOVED***
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
    BlockEditWithAPIMetadata,
    SizeConfig,
    togglePanel,
    Measures,
    DataFilters,
    isSupersetAPI,
    Filter,
    Measure,
    Format
} from '@devgateway/dvz-wp-commons'


interface ***REMOVED*** {
    className: string;
    isSelected: boolean;
    ***REMOVED***: (selected: boolean) => void;
    setAttributes: (attributes: any) => void;
    attributes: {
        measures: Measure[];
        height: number;
        app: string;
        format: string;
        filters: Filter[];
        group: string;
        panelStatus: Record<string, boolean>;
        ***REMOVED***: string;
        label: string;
        ***REMOVED***: number;
        numberColor: string;
        labelFontSize: number;
        labelColor: string;
        csv: string;
        type: string;
    };
}

class BlockEdit extends BlockEditWithAPIMetadata<***REMOVED***, any> {
    constructor(props) {
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
                numberColor,
                labelFontSize,
                labelColor,
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
                    <SizeConfig setAttributes={setAttributes} panelStatus={panelStatus}
                        height={height} initialOpen={panelStatus['GROUP']}></SizeConfig>

                    <>
                        <PanelBody initialOpen={false} title={__("API & Source")}>
                            <PanelRow>
                                <SelectControl
                                    value={app}
                                    multiple={false}
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


                        {app != 'csv' && <Measures
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
                                panelStatus: panelStatus,
                                measures: measures,
                                dimension1: '',
                                dimension2: '',
                                type: type,
                                app: app
                            }}
                            setAttributes={setAttributes}
                        />
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

                        <DataFilters
                            allFilters={this.state.filters}
                            allCategories={this.state.categories}
                            {...this.props} />

                    </>
                    <PanelBody title={__('Settings')} initialOpen={false}>
                        <PanelRow>
                            <TextControl
                                label={__('Label')}
                                value={label}
                                onChange={(label) => setAttributes({ label })}
                            />
                        </PanelRow>
                        <PanelRow>
                            <Text>{__("Number Font Size")}</Text>
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
                                    value: numberColor,
                                    onChange: (color) => {
                                        setAttributes({ numberColor: color })
                                    },
                                    label: __("Number Color")
                                },
                                {
                                    value: labelColor,
                                    onChange: (color) => {
                                        setAttributes({ labelColor: color })
                                    },
                                    label: __("Label Color")
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
                    src={this.state.react_ui_url + "/embeddable/bignumber?"} />}

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
