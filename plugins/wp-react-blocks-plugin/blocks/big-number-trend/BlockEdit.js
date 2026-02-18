import { InspectorControls, MediaUpload, PanelColorSettings, useBlockProps } from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
    ResizableBox,
    SelectControl,
    TextControl,
    FontSizePicker,
    __experimentalText as Text,
    ToggleControl,
    TextareaControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockEditWithAPIMetadata, SizeConfig } from '@devgateway/dvz-wp-commons'
import { CSVSourceConfig } from '@devgateway/dvz-wp-commons';
import { togglePanel } from '@devgateway/dvz-wp-commons';
import { Measures } from '@devgateway/dvz-wp-commons';
import { DataFilters } from '@devgateway/dvz-wp-commons';
import { isSupersetAPI } from '@devgateway/dvz-wp-commons';
import Format from "../charts/Format.jsx";


class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount()
    }

    render() {
        const {
            className, isSelected,
            toggleSelection, setAttributes,
            attributes: {
                iconImage,
                iconDown,
                iconUp,
                styleOption,
                measures,
                height,
                app,
                format,
                filters,
                group,
                panelStatus,
                dvzProxyDatasetId,
                label,
                bigNumberFontSize,
                percentFontSize,
                labelFontSize,
                textColor,
                numberColor,
                percentColor,
                backGroundColor,
                dimension1,
                showPercentageChange,
                csv,
                type,
                waitForFilters,
                noDataText,
                showTooltip,
                tooltipText,
                tooltipStyle
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
        const divStyles = { height: height + 10 + 'px', width: '100%' }

        return ([isSelected && (
            <InspectorControls>

                <Panel header={__("Chart Configuration")}>
                    <PanelBody
                        panelStatus={panelStatus['GROUP']}
                        onToggle={e => togglePanel("GROUP", panelStatus, setAttributes)}
                        title={__("Group")}>
                        <PanelRow>
                            <TextControl
                                label={__('Name')}
                                value={group}
                                onChange={(group) => setAttributes({ group })}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={__('Wait For Filters')}
                                checked={waitForFilters}
                                onChange={() => setAttributes({ waitForFilters: !waitForFilters })}
                            />
                        </PanelRow>
                    </PanelBody>
                    <SizeConfig setAttributes={setAttributes} panelStatus={panelStatus}
                        height={height}></SizeConfig>

                    <>
                        <PanelBody initialOpen={false} title={__("API & Source")}>
                            <PanelRow>
                                <SelectControl
                                    value={[app]}
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
                                    label={__('Datasets')}
                                    value={[dvzProxyDatasetId]}
                                    onChange={(newDatasetId) => {
                                        setAttributes({
                                            dvzProxyDatasetId: newDatasetId
                                        })

                                        this.loadMetadata(app, newDatasetId)
                                    }}
                                    options={datasets}
                                />
                            </PanelRow>
                            }
                        </PanelBody>

                        {app != 'csv' && <PanelBody initialOpen={false} title={__("Dimensions")}>
                            <PanelRow>
                                <SelectControl
                                    label={__("First Dimension")}
                                    value={[dimension1]}
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
                                        <TextareaControl
                                            label={__("CSV Data")}
                                            value={csv}
                                            onChange={(csv) => setAttributes({ csv })}
                                        />
                                    </PanelRow>

                                    <Format
                                        hiddenCustomAxisFormat={type == 'radar' || type == 'big-number'}
                                        format={format}
                                        customFormat={{}}
                                        useCustomAxisFormat={false}
                                        onFormatChange={(newFormat, field) => {
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

                                multiMeasure={false}
                                title={__(`Measure`)}
                                onSetSingleMeasure={value => {
                                    setAttributes({ measures: [value] })
                                }}
                                onFormatChange={value => {
                                    setAttributes({ format: value })
                                }}
                                allMeasures={this.state.measures}
                                format={format}
                                measures={measures}
                                {...this.props} />
                        }


                        <DataFilters
                            allFilters={this.state.filters}
                            allCategories={this.state.categories}
                            {...this.props} />

                    </>


                    <PanelBody title={__('Settings')} initialOpen={false}>
                        <PanelRow>
                            <ToggleControl
                                label={__("Alternative Style")}
                                checked={styleOption === "alternative"}
                                onChange={(isAlternative) =>
                                    setAttributes({
                                        styleOption: isAlternative ? "alternative" : "classic",
                                    })
                                }
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl label={__('Show Percentage Change')}
                                checked={showPercentageChange}
                                onChange={(showPercentageChange) => setAttributes({ showPercentageChange })} />

                        </PanelRow>
                        <PanelRow>
                            <Text>{__("Main Image")}</Text>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ iconImage: media.url })}
                                allowedTypes={["image"]}
                                value={iconImage}
                                render={({ open }) => (
                                    <button onClick={open} className="components-button is-secondary">
                                        {iconImage
                                            ? __("Change Icon")
                                            : __("Select Icon")}
                                    </button>
                                )}
                            />
                        </PanelRow>
                        {iconImage && (
                            <PanelRow>
                                <img
                                    src={iconImage}
                                    alt={__("Selected Image")}
                                    style={{ maxWidth: "100%" }}
                                />
                                <button
                                    onClick={() => setAttributes({ iconImage: "" })}
                                    className="components-button is-destructive"
                                >
                                    {__("Remove Main Image")}
                                </button>
                            </PanelRow>
                        )}


                        <PanelRow>
                            <Text>{__("Icon Up")}</Text>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ iconUp: media.url })}
                                allowedTypes={["image"]}
                                value={iconImage}
                                render={({ open }) => (
                                    <button onClick={open} className="components-button is-secondary">
                                        {iconImage
                                            ? __("Change Icon")
                                            : __("Select Icon")}
                                    </button>
                                )}
                            />
                        </PanelRow>
                        {iconUp && (
                            <PanelRow>
                                <img
                                    src={iconUp}
                                    alt={__("Selected icon")}
                                    style={{ maxWidth: "100%" }}
                                />
                                <button
                                    onClick={() => setAttributes({ iconUp: "" })}
                                    className="components-button is-destructive"
                                >
                                    {__("Remove Up Icon")}
                                </button>
                            </PanelRow>
                        )}
                        <PanelRow>
                            <Text>{__("Icon Down")}</Text>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ iconDown: media.url })}
                                allowedTypes={["image"]}
                                value={iconImage}
                                render={({ open }) => (
                                    <button onClick={open} className="components-button is-secondary">
                                        {iconImage
                                            ? __("Change Icon")
                                            : __("Select Icon")}
                                    </button>
                                )}
                            />
                        </PanelRow>
                        {iconDown && (
                            <PanelRow>
                                <img
                                    src={iconDown}
                                    alt={__("Selected icon")}
                                    style={{ maxWidth: "100%" }}
                                />
                                <button
                                    onClick={() => setAttributes({ iconDown: "" })}
                                    className="components-button is-destructive"
                                >
                                    {__("Remove Down Icon")}
                                </button>
                            </PanelRow>
                        )}




                        <PanelRow>
                            <TextControl
                                label={__('No Data Text')}
                                value={noDataText}
                                onChange={(noDataText) => setAttributes({ noDataText })}
                            />
                        </PanelRow>


                        <PanelRow>
                            <Text>{__("Big Number Font Size")}</Text>
                        </PanelRow>
                        <FontSizePicker
                            fontSizes={[]}
                            value={bigNumberFontSize}
                            fallbackFontSize={14}
                            onChange={(newFontSize) => {
                                setAttributes({ bigNumberFontSize: newFontSize })
                            }}
                        />
                        <PanelRow>
                            <Text>{__("Percent Change Font Size")}</Text>
                        </PanelRow>
                        <FontSizePicker
                            fontSizes={[]}
                            value={percentFontSize}
                            fallbackFontSize={14}
                            onChange={(newFontSize) => {
                                setAttributes({ percentFontSize: newFontSize })
                            }}
                        />


                        <PanelRow>
                            <TextareaControl
                                label={__('Label Text')}
                                value={label}

                                onChange={(label) => setAttributes({ label })}
                                help={__("You can use variables {var_name}")}
                                rows={5}
                            />
                        </PanelRow>
                        {app != 'csv' &&
                            <PanelRow>

                                <div style={{ "font-weight": "bold", "font-size": "11px" }}>Variables:<br></br></div>
                                <div>
                                    {this.state.dimensions &&
                                        this.state.dimensions.filter(d => (d.value === dimension1))
                                            .map(d => <PanelRow>
                                                <span style={{
                                                    "font-size": "11px",
                                                    "margin-left": "20px"
                                                }}>{d.label} -&gt; {"{"}{d.value}{"}"}</span>
                                            </PanelRow>)}
                                </div>

                            </PanelRow>
                        }
                        <PanelRow>
                            <Text>{__("Label Font Size")}</Text>
                        </PanelRow>
                        <FontSizePicker
                            fontSizes={[]}
                            value={labelFontSize}
                            fallbackFontSize={14}
                            onChange={(newFontSize) => {
                                setAttributes({ labelFontSize: newFontSize })
                            }}
                        />
                        <PanelColorSettings
                            title={__('Color Settings')}
                            colorSettings={[
                                {
                                    value: textColor, // Label color value

                                    onChange: (color) => {
                                        setAttributes({ textColor: color }); // Update label color
                                    },
                                    label: __("Label Color") // Label for the color picker
                                },
                                {
                                    value: numberColor, // Number color value
                                    onChange: (color) => {
                                        setAttributes({ numberColor: color }); // Update number color
                                    },
                                    label: __("Number Color") // Label for the color picker
                                },
                                {
                                    value: percentColor, // Percent color value
                                    onChange: (color) => {
                                        setAttributes({ percentColor: color }); // Update percent color
                                    },
                                    label: __("Percent Color") // Label for the color picker
                                },
                                {
                                    value: backGroundColor, // Percent color value
                                    clearable: true,
                                    enableAlpha: true,
                                    onChange: (color) => {
                                        setAttributes({ backGroundColor: color }); // Update percent color
                                    },
                                    label: __("Back Ground Color") // Label for the color picker
                                }
                            ]}
                        />
                        <PanelBody
                            initialOpen={false}
                            panelStatus={panelStatus['TOOLTIP']}
                            onToggle={e => togglePanel("TOOLTIP", panelStatus, setAttributes)}
                            title={__("Tooltip")}
                        >
                            <PanelRow>
                                <ToggleControl
                                    label={__('Show Tooltip')}
                                    checked={!!showTooltip}
                                    onChange={() => setAttributes({ showTooltip: !showTooltip })}
                                />
                            </PanelRow>
                            {showTooltip && (
                                <PanelRow>
                                    <TextareaControl
                                        label={__('Tooltip Text')}
                                        value={tooltipText}
                                        onChange={(tooltipText) => setAttributes({ tooltipText })}
                                        rows={4}
                                    />
                                </PanelRow>
                            )}
                            {showTooltip && (
                                <PanelRow>
                                    <SelectControl
                                        label={__('Tooltip Style')}
                                        value={tooltipStyle || 'light'}
                                        onChange={(value) => setAttributes({ tooltipStyle: value })}
                                        options={[
                                            { label: __('Dark'), value: 'dark' },
                                            { label: __('Light'), value: 'light' }
                                        ]}
                                    />
                                </PanelRow>
                            )}
                            {showTooltip && (
                                <>
                                    <PanelRow>
                                        <div style={{ "font-weight": "bold", "font-size": "11px" }}>
                                            {__('Available Variables:')}
                                        </div>
                                    </PanelRow>
                                    <PanelRow>
                                        <div style={{ "font-size": "11px", "margin-left": "20px" }}>
                                            {__('Current Year')}: {"{current_year}"}
                                        </div>
                                    </PanelRow>
                                    <PanelRow>
                                        <div style={{ "font-size": "11px", "margin-left": "20px" }}>
                                            {__('Previous Year')}: {"{previous_year}"}
                                        </div>
                                    </PanelRow>
                                    <PanelRow>
                                        <div style={{ "font-size": "11px", "margin-left": "20px" }}>
                                            {__('Current Value')}: {"{current_value}"}
                                        </div>
                                    </PanelRow>
                                    <PanelRow>
                                        <div style={{ "font-size": "11px", "margin-left": "20px" }}>
                                            {__('Previous Value')}: {"{previous_value}"}
                                        </div>
                                    </PanelRow>
                                    <PanelRow>
                                        <div style={{ "font-size": "11px", "margin-left": "20px" }}>
                                            {__('Percent Change')}: {"{percent_change}"}
                                        </div>
                                    </PanelRow>
                                </>
                            )}
                        </PanelBody>
                    </PanelBody>
                </Panel>
            </InspectorControls>),
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
                    height: parseInt(height + delta.height, 10),
                });
                toggleSelection(true);
            }}
            onResizeStart={() => {
                toggleSelection(false);
            }}>

            <div className={className}>
                {this.state.react_ui_url && <iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                    src={this.state.react_ui_url + "/embeddable/bignumbertrend?"} />}

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
