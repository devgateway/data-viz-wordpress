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
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            previewHeight: null
        };
        this.onEmbedMessage = this.onEmbedMessage.bind(this);
    }

    componentDidMount() {
        super.componentDidMount();
        window.addEventListener('message', this.onEmbedMessage);
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.onEmbedMessage);
    }

    onEmbedMessage(event) {
        try {
            const data = event.data || {};
            if (data.type === 'dvz-embed-height' && data.id === this.props.clientId) {
                const next = Math.max(60, Math.min(parseInt(data.height || 0, 10), 2000));
                if (Number.isFinite(next) && next !== this.state.previewHeight) {
                    this.setState({ previewHeight: next });
                }
            }
        } catch (e) {
            // ignore
        }
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
                textTemplate,
                showPreview
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

        const iframeStyles = {
            width: '100%',
            border: '0',
            // Prefer explicit block height; else use autoHeight message; else fallback
            height: (height && Number(height) > 0)
                ? `${Number(height)}px`
                : (this.state.previewHeight
                    ? `${this.state.previewHeight}px`
                    : `${Math.max(80, (numberFontSize || 14) * 4)}px`)
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
                                onToggle={() => togglePanel("csv_cfg", panelStatus, setAttributes)}>
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
                                    hiddenCustomAxisFormat={type === 'radar' || type === 'data-paragraph'}
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
                                        'Use HTML and Tooltip-style variables: {field}, #(field,2) for number, %(field,2) for percent, #C(field,2) for compact.'
                                    )}
                                    value={textTemplate}
                                    onChange={(val) => setAttributes({ textTemplate: val })}
                                    placeholder={__('Type your paragraph template…')}
                                />
                            </PanelRow>

                            <PanelRow>
                                <Text>
                                    {__("Available measure variables:")}
                                    <ul>
                                        {Array.isArray(this.state.measures) && this.state.measures.map((m, idx) => (
                                            <li key={idx}>{"{" + m.value + "}"}</li>
                                        ))}
                                    </ul>
                                </Text>
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

                        <PanelBody title={__('Preview')} initialOpen={false}>
                            <PanelRow>
                                <ToggleControl
                                    label={__('Show Embeddable Preview')}
                                    checked={!!showPreview}
                                    onChange={() => setAttributes({ showPreview: !showPreview })}
                                />
                            </PanelRow>
                        </PanelBody>

                    </Panel>
                </InspectorControls>
            ),

            // -------------------------------
            // UPDATED PREVIEW AREA
            // - Adds a paragraph-like editor that auto-expands
            // -------------------------------
            <div key="preview">   
             <RichText
                    tagName="p"
                    className="dvz-text-template-preview"
                    value={textTemplate || ''}
                    allowedFormats={[
                        'core/bold',
                        'core/italic',
                        'core/strikethrough',
                        'core/link',
                        'viz/text-color'                      
                    ]}
                    placeholder={__('Type your paragraph…')}
                    onChange={(val) => setAttributes({ textTemplate: val })}
                />    
                {showPreview && this.state.react_ui_url && (
                    <div style={{ marginTop: '8px' }}>
                    <iframe
                        ref={this.iframe}
                        style={iframeStyles}
                        scrolling="yes"
                        src={
                            this.state.react_ui_url +
                            "/embeddable/dataparagraph?"
                        }
                    />            
                    </div>
                )}
            </div>
        ]);
    }
}


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
