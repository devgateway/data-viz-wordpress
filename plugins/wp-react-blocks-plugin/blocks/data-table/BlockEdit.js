import { InspectorControls, PanelColorSettings, useBlockProps } from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
    SelectControl,
    TextControl,
    TextareaControl,
    ToggleControl,
    __experimentalText as Text,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
    BlockEditWithAPIMetadata,
    SizeConfig,
    Measures,
    DataFilters,
    isSupersetAPI,
    togglePanel,
} from '@devgateway/dvz-wp-commons';
const defaultFormat = {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currency: 'USD',
};
class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
        this.onMeasuresChange = this.onMeasuresChange.bind(this);
        this.onCustomLabelToggleChange = this.onCustomLabelToggleChange.bind(this);
        this.onCustomLabelChange = this.onCustomLabelChange.bind(this);
        this.syncMeasureLabelsFromMetadata = this.syncMeasureLabelsFromMetadata.bind(this);
    }
    componentDidMount() {
        super.componentDidMount();
    }
    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);
        this.syncMeasureLabelsFromMetadata();
    }
    syncMeasureLabelsFromMetadata() {
        const {
            setAttributes,
            attributes: { app, measures },
        } = this.props;
        const metadataMeasures = this.state.measures || [];
        if (app === 'csv' || !measures?.[app] || metadataMeasures.length === 0) {
            return;
        }
        const labelsByMeasure = metadataMeasures.reduce((acc, measure) => {
            if (measure?.value) {
                acc[measure.value] = measure.label || measure.value;
            }
            return acc;
        }, {});
        let changed = false;
        const updatedMeasures = Object.assign({}, measures);
        updatedMeasures[app] = Object.assign({}, updatedMeasures[app]);
        Object.entries(updatedMeasures[app]).forEach(([measureKey, config]) => {
            const label = labelsByMeasure[measureKey];
            if (!config || !label || config.label === label) {
                return;
            }
            updatedMeasures[app][measureKey] = { ...config, label };
            changed = true;
        });
        if (changed) {
            setAttributes({ measures: updatedMeasures });
        }
    }
    onMeasuresChange(value) {
        const { setAttributes, attributes: { app, measures } } = this.props;
        const uMs = Object.assign({}, measures);
        const selectedMeasure = (this.state.measures || []).find((measure) => measure.value === value);
        const measureLabel = selectedMeasure?.label || value;
        if (!uMs[app]) uMs[app] = {};
        if (uMs[app][value]) {
            uMs[app][value].selected = !uMs[app][value].selected;
            if (measureLabel && uMs[app][value].label !== measureLabel) {
                uMs[app][value].label = measureLabel;
            }
        } else {
            uMs[app][value] = { selected: true, format: defaultFormat, label: measureLabel };
        }
        setAttributes({ measures: uMs });
    }
    onCustomLabelToggleChange(value) {
        const { setAttributes, attributes: { app, measures } } = this.props;
        const uMs = Object.assign({}, measures);
        if (uMs[app] && uMs[app][value]) {
            uMs[app][value].hasCustomLabel = !uMs[app][value].hasCustomLabel;
            setAttributes({ measures: uMs });
        }
    }
    onCustomLabelChange(value, customLabel) {
        const { setAttributes, attributes: { app, measures } } = this.props;
        const uMs = Object.assign({}, measures);
        if (uMs[app] && uMs[app][value] && uMs[app][value].hasCustomLabel) {
            uMs[app][value].customLabel = customLabel;
            setAttributes({ measures: uMs });
        }
    }
    render() {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                csv,
                dvzProxyDatasetId,
                dimension1,
                dimensionLabel,
                measures,
                filters,
                group,
                waitForFilters,
                panelStatus,
                height,
                fontSize,
                headerBgColor,
                headerTextColor,
                stripedRows,
                borderStyle,
                noDataText,
            },
        } = this.props;
        const datasets = [{ label: __('Select Dataset'), value: '0' }];
        if (this.state.datasets) {
            this.state.datasets.forEach((d) => {
                datasets.push({ label: d.label, value: d.id });
            });
        }
        const divStyles = { height: height + 'px', width: '100%' };
        return [
            isSelected && (
                <InspectorControls key="inspector">
                    <Panel header={__('Table Configuration')}>
                        <PanelBody
                            title={__('Group')}
                            initialOpen={false}
                            onToggle={() => togglePanel('GROUP', panelStatus, setAttributes)}
                        >
                            <PanelRow>
                                <TextControl
                                    label={__('Group Name')}
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
                        <SizeConfig
                            setAttributes={setAttributes}
                            panelStatus={panelStatus}
                            height={height}
                        />
                        <PanelBody initialOpen={false} title={__('API & Source')}>
                            <PanelRow>
                                <SelectControl
                                    label={__('Data Source')}
                                    value={[app]}
                                    onChange={(nextApp) => setAttributes({ app: nextApp })}
                                    options={[
                                        { label: __('CSV'), value: 'csv' },
                                        ...(this.state.apps
                                            ? this.state.apps.filter((a) => a.value !== 'csv')
                                            : []),
                                    ]}
                                />
                            </PanelRow>
                            {isSupersetAPI(app, this.state.apps) && (
                                <PanelRow>
                                    <SelectControl
                                        label={__('Dataset')}
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
                        {app === 'csv' && (
                            <PanelBody initialOpen={false} title={__('CSV Data')}>
                                <PanelRow>
                                    <TextareaControl
                                        label={__('Paste CSV (first column = dimension)')}
                                        value={csv}
                                        onChange={(nextCsv) => setAttributes({ csv: nextCsv })}
                                        rows={8}
                                    />
                                </PanelRow>
                                <Text variant="muted">
                                    {__('First row must be headers. Numeric columns become available as measures.')}
                                </Text>
                                <PanelRow>
                                    <TextControl
                                        label={__('Dimension Header Label')}
                                        value={dimensionLabel}
                                        onChange={(value) => setAttributes({ dimensionLabel: value })}
                                        help={__('Optional label shown in the table header for the first CSV column.')}
                                    />
                                </PanelRow>
                            </PanelBody>
                        )}
                        {app !== 'csv' && (
                            <PanelBody initialOpen={false} title={__('Dimension (rows)')}>
                                <PanelRow>
                                    <SelectControl
                                        label={__('Dimension')}
                                        value={[dimension1]}
                                        onChange={(value) => setAttributes({ dimension1: value })}
                                        options={this.state.dimensions || [{ label: __('None'), value: 'none' }]}
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <TextControl
                                        label={__('Dimension Header Label')}
                                        value={dimensionLabel}
                                        onChange={(value) => setAttributes({ dimensionLabel: value })}
                                        help={__('Optional label shown in the table header for the selected dimension.')}
                                    />
                                </PanelRow>
                            </PanelBody>
                        )}
                        {app !== 'csv' && (
                            <Measures
                                title={__('Measures (columns)')}
                                onMeasuresChange={this.onMeasuresChange}
                                onCustomLabelToggleChange={this.onCustomLabelToggleChange}
                                onCustomLabelChange={this.onCustomLabelChange}
                                onFormatChange={() => {}}
                                onUseCustomAxisFormatChange={() => {}}
                                onSetSingleMeasure={() => {}}
                                allMeasures={this.state.measures || []}
                                multiMeasure={true}
                                {...this.props}
                            />
                        )}
                        {app !== 'csv' && (
                            <DataFilters
                                allFilters={this.state.filters || []}
                                allCategories={this.state.categories || []}
                                onChange={() => {}}
                                {...this.props}
                            />
                        )}
                        <PanelBody initialOpen={false} title={__('Display')}>
                            <PanelRow>
                                <TextControl
                                    label={__('Font Size (px)')}
                                    type="number"
                                    value={fontSize}
                                    onChange={(value) => setAttributes({ fontSize: parseInt(value) || 14 })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    label={__('Striped Rows')}
                                    checked={stripedRows}
                                    onChange={() => setAttributes({ stripedRows: !stripedRows })}
                                />
                            </PanelRow>
                            <PanelRow>
                                <SelectControl
                                    label={__('Border Style')}
                                    value={borderStyle}
                                    onChange={(value) => setAttributes({ borderStyle: value })}
                                    options={[
                                        { label: __('Rows only'), value: 'rows' },
                                        { label: __('Full grid'), value: 'full' },
                                        { label: __('None'), value: 'none' },
                                    ]}
                                />
                            </PanelRow>
                            <PanelRow>
                                <TextControl
                                    label={__('No-data Text')}
                                    value={noDataText}
                                    onChange={(value) => setAttributes({ noDataText: value })}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelColorSettings
                            title={__('Header Colors')}
                            initialOpen={false}
                            colorSettings={[
                                {
                                    value: headerBgColor,
                                    onChange: (color) => setAttributes({ headerBgColor: color || '#f0f4f8' }),
                                    label: __('Header Background'),
                                },
                                {
                                    value: headerTextColor,
                                    onChange: (color) => setAttributes({ headerTextColor: color || '#2d3748' }),
                                    label: __('Header Text'),
                                },
                            ]}
                        />
                    </Panel>
                </InspectorControls>
            ),
            <div key="block-preview">
                <div style={{ ...divStyles, padding: '12px', background: '#f9fafb', borderRadius: '6px' }}>
                    <strong style={{ fontSize: '13px', color: '#4a5568' }}>
                        {__('📊 Data Table')}
                    </strong>
                    <div style={{ fontSize: '12px', color: '#718096', marginTop: '6px' }}>
                        {__('Source:')} <code>{app}</code>
                        {dimension1 && dimension1 !== 'none' && (
                            <> &nbsp;·&nbsp; {__('Dimension:')} <code>{dimensionLabel || dimension1}</code></>
                        )}
                    </div>
                    {measures && measures[app] && (
                        <div style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>
                            {__('Measures:')} {
                                Object.keys(measures[app])
                                    .filter((k) => measures[app][k] && measures[app][k].selected)
                                    .map((k) => {
                                        const measureConfig = measures[app][k];
                                        return measureConfig?.hasCustomLabel && measureConfig?.customLabel
                                            ? measureConfig.customLabel
                                            : (measureConfig?.label || k);
                                    })
                                    .join(', ') || __('(none selected)')
                            }
                        </div>
                    )}
                </div>
            </div>,
        ];
    }
}
const Edit = (props) => {
    const blockProps = useBlockProps();
    return <div {...blockProps}><BlockEdit {...props} /></div>;
}
export default Edit;
