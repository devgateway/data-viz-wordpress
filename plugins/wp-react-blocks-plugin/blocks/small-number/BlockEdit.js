import {
    InspectorControls,
    PanelColorSettings,
    useBlockProps,
    RichText
} from '@wordpress/block-editor';

import {
    Panel,
    PanelBody,
    PanelRow,
    SelectControl,
    TextControl,
    FontSizePicker,
    __experimentalText as Text,
    ToggleControl,
    BaseControl
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';

import {
    BlockEditWithAPIMetadata,
    SizeConfig,
    togglePanel,
    Measures,
    DataFilters,
    isSupersetAPI
} from '@devgateway/dvz-wp-commons';

import Format from "../charts/Format.jsx";


const AutoGrowTextarea = ({ label, help, value, onChange, placeholder }) => {
    const ref = useRef(null);

    const resize = () => {
        const el = ref.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    };

    useEffect(() => {
        resize();
    }, [value]);

    return (
        <BaseControl label={label} help={help}>
            <textarea
                ref={ref}
                value={value || ''}
                placeholder={placeholder}
                rows={1}
                onInput={resize}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    resize: 'none',
                    overflow: 'hidden',
                    minHeight: '2.2em',
                    lineHeight: '1.4',
                    padding: '6px 8px',
                    boxSizing: 'border-box',
                    borderRadius: '4px',
                    fontSize: '13px'
                }}
            />
        </BaseControl>
    );
};


// -------------------------------
// Main BlockEdit class
// -------------------------------
class BlockEdit extends BlockEditWithAPIMetadata {

    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        const {
            isSelected,
            setAttributes,
            attributes: {
                measures,
                height,
                app,
                format,
                filters,
                group,
                panelStatus,
                dvzProxyDatasetId,
                numberFontSize,
                numberColor,
                csv,
                type,
                waitForFilters,
                noDataText,
                textTemplate
            }
        } = this.props;

        const datasets = [{ label: 'Select Dataset', value: '0' }];
        if (this.state.datasets) {
            this.state.datasets.forEach(d => {
                datasets.push({ label: d.label, value: d.id });
            });
        }

        const inlineStyles = {
            display: 'inline',
            color: numberColor,
            fontSize: (numberFontSize || 14) + 'px',
            lineHeight: '1',
            verticalAlign: 'baseline'
        };

        return ([
            isSelected && (
                <InspectorControls key="inspector">
                    <Panel header={__("Chart Configuration")}>

                        <PanelBody
                            title={__("Group")}
                            panelStatus={panelStatus['GROUP']}
                            onToggle={() => togglePanel("GROUP", panelStatus, setAttributes)}
                        >
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
                                    onChange={() =>
                                        setAttributes({ waitForFilters: !waitForFilters })
                                    }
                                />
                            </PanelRow>
                        </PanelBody>

                        <SizeConfig
                            setAttributes={setAttributes}
                            panelStatus={panelStatus}
                            height={height}
                        />

                        <PanelBody initialOpen={false} title={__("API & Source")}>
                            <PanelRow>
                                <SelectControl
                                    value={[app]}
                                    onChange={(app) => setAttributes({ app })}
                                    options={this.state.apps}
                                />
                            </PanelRow>

                            {isSupersetAPI(app, this.state.apps) && (
                                <PanelRow>
                                    <SelectControl
                                        label={__('Datasets')}
                                        value={[dvzProxyDatasetId]}
                                        onChange={(newDatasetId) => {
                                            setAttributes({ dvzProxyDatasetId: newDatasetId });
                                            this.loadMetadata(app, newDatasetId);
                                        }}
                                        options={datasets}
                                    />
                                </PanelRow>
                            )}
                        </PanelBody>

                        {app !== 'csv' && (
                            <Measures
                                title={__(`Measure`)}
                                onSetSingleMeasure={value =>
                                    setAttributes({ measures: [value] })
                                }
                                onFormatChange={value =>
                                    setAttributes({ format: value })
                                }
                                allMeasures={this.state.measures}
                                format={format}
                                measures={measures}
                                {...this.props}
                            />
                        )}

                        {app === 'csv' && (
                            <PanelBody
                                initialOpen={false}
                                title={__("CSV Configuration")}
                                onToggle={() => togglePanel("csv_cfg", panelStatus, setAttributes)}
                            >
                                <PanelRow>
                                    <BaseControl label={__("CSV Data")}>
                                        <textarea
                                            value={csv || ''}
                                            onChange={(e) => setAttributes({ csv: e.target.value })}
                                            style={{ width: '100%', minHeight: '120px' }}
                                        />
                                    </BaseControl>
                                </PanelRow>

                                <Format
                                    hiddenCustomAxisFormat={type === 'radar' || type === 'small-number'}
                                    format={format}
                                    customFormat={{}}
                                    useCustomAxisFormat={false}
                                    onFormatChange={(newFormat) => setAttributes({ format: newFormat })}
                                    onUseCustomAxisFormatChange={() => {}}
                                />
                            </PanelBody>
                        )}

                        <DataFilters
                            allFilters={this.state.filters}
                            allCategories={this.state.categories}
                            {...this.props}
                        />

                        {/* Inspector input (auto-growing) stays here */}
                        <PanelBody title={__('Paragraph Template')} initialOpen={true}>
                            <PanelRow>
                                <AutoGrowTextarea
                                    label={__('Text Template')}
                                    help={__(
                                        'You can use basic HTML (e.g. <b>, <i>, <span>) and variables like {{value}}, {{rawValue}}, {{measure}}.'
                                    )}
                                    value={textTemplate}
                                    onChange={(val) => setAttributes({ textTemplate: val })}
                                    placeholder={__('Type your paragraph template…')}
                                />
                            </PanelRow>
                        </PanelBody>

                        <PanelBody title={__('Settings')} initialOpen={false}>
                            <PanelRow>
                                <TextControl
                                    label={__('No Data Text')}
                                    value={noDataText}
                                    onChange={(noDataText) => setAttributes({ noDataText })}
                                />
                            </PanelRow>

                            <PanelRow>
                                <Text>{__("Number Font Size")}</Text>
                            </PanelRow>

                            <FontSizePicker
                                value={numberFontSize}
                                fallbackFontSize={14}
                                onChange={(newFontSize) =>
                                    setAttributes({ numberFontSize: newFontSize })
                                }
                            />

                            <PanelColorSettings
                                title={__('Color Settings')}
                                colorSettings={[
                                    {
                                        value: numberColor,
                                        onChange: (color) => setAttributes({ numberColor: color }),
                                        label: __("Number Color")
                                    }
                                ]}
                            />
                        </PanelBody>

                    </Panel>
                </InspectorControls>
            ),

            // -------------------------------
            // UPDATED PREVIEW AREA
            // - Adds a paragraph-like editor that auto-expands
            // -------------------------------
            <div key="preview">
                {/* Existing iframe preview 
                {this.state.react_ui_url && (
                    <iframe
                        ref={this.iframe}
                        style={inlineStyles}
                        scrolling="no"
                        src={this.state.react_ui_url + "/embeddable/smallnumber?"}
                    />
                )}*/}

               <RichText
                    tagName="p"
                    className="dvz-text-template-preview"
                    value={textTemplate || ''}
                    allowedFormats={[]} // keep it plain-ish
                    placeholder={__('Type your paragraph…')}
                    onChange={(val) => setAttributes({ textTemplate: val })}
                />
            </div>
        ]);
    }
}


// -------------------------------
// Wrapper Edit export
// -------------------------------
const Edit = (props) => {
    const blockProps = useBlockProps({
        // Let the preview paragraph behave naturally (block flow)
        style: {
            verticalAlign: 'baseline'
        }
    });

    return (
        <div {...blockProps}>
            <BlockEdit {...props} />
        </div>
    );
};

export default Edit;
