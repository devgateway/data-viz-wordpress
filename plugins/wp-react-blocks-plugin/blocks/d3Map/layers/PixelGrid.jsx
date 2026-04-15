import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
    Button,
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    TextareaControl,
    ToggleControl,
} from '@wordpress/components';
import Measures from './utils/MapMeasures.jsx';
import GradientGenerator from './utils/GradientGenerator.jsx';
import Format from '../../charts/Format.jsx';
import { isSupersetAPI } from '@devgateway/dvz-wp-commons';

/**
 * Editor settings panel for the Pixel Grid layer type.
 * Mirrors the Data shape layer's app → dataset → dimension flow.
 */
class PixelGridLayer extends Component {
    constructor(props) {
        super(props);
        this.onMeasuresChange = this.onMeasuresChange.bind(this);
        this.onSetSingleMeasure = this.onSetSingleMeasure.bind(this);
        this.onFormatChange = this.onFormatChange.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.updateFilterParam = this.updateFilterParam.bind(this);
        this.updateFilterValue = this.updateFilterValue.bind(this);
    }

    onMeasuresChange(value) {
        const { layer: { measures = [] }, onChangeProperty } = this.props;
        const nextMeasures = measures.includes(value)
            ? measures.filter(m => m !== value)
            : [...measures, value];
        onChangeProperty('measures', nextMeasures);
    }

    onSetSingleMeasure(value) {
        this.props.onChangeProperty('measures', [value]);
    }

    onFormatChange(format) {
        this.props.onChangeProperty('format', format);
    }

    addFilter() {
        const { layer: { filters = [] }, onChangeProperty, allFilters = [] } = this.props;
        const index = filters.length > allFilters.length ? allFilters.length : filters.length;
        const newFilter = allFilters.length > 0 ? { ...allFilters[index], value: [] } : null;
        if (newFilter) onChangeProperty('filters', [...filters, newFilter]);
    }

    removeFilter() {
        const { layer: { filters = [] }, onChangeProperty } = this.props;
        onChangeProperty('filters', filters.slice(0, -1));
    }

    updateFilterParam(param, idx) {
        const { layer: { filters = [] }, onChangeProperty, allFilters = [] } = this.props;
        const selected = allFilters.find(f => f.param === param);
        const newFilters = filters.slice();
        newFilters[idx] = { ...selected, value: [] };
        onChangeProperty('filters', newFilters);
    }

    updateFilterValue(value, idx) {
        const { layer: { filters = [] }, onChangeProperty } = this.props;
        const newFilters = filters.slice();
        const current = newFilters[idx].value || [];
        newFilters[idx] = {
            ...newFilters[idx],
            value: current.includes(value) ? current.filter(v => v !== value) : [...current, value],
        };
        onChangeProperty('filters', newFilters);
    }

    render() {
        const {
            layer,
            layer: {
                app = 'none',
                dvzProxyDatasetId = '',
                latField = 'none',
                lonField = 'none',
                measures = [],
                filters = [],
                pixelSizeDeg = 0.05,
                opacity = 0.8,
                gradientScheme = 'greens',
                gradientReverse = false,
                gradientStartColor,
                gradientEndColor,
                tooltip = 'Value: {value}',
                format = {},
                customMeasuresLabels = {},
            },
            onChangeProperty,
            allMeasures = [],
            allDimensions = [],
            allFilters = [],
            allDatasets = [],
            apps = [],
            attributes,
            setAttributes,
        } = this.props;

        // Auto-populate customMeasuresLabels for any selected measure that doesn't yet have a label,
        // mirroring the same pattern used by the Data shape layer.
        // Batch all missing labels into a single update to avoid each call overwriting the previous one.
        if (app !== 'csv' && allMeasures && allMeasures.length > 0) {
            const missingLabels = {};
            measures.forEach(measureValue => {
                if (!customMeasuresLabels[measureValue] || customMeasuresLabels[measureValue] === '') {
                    const found = allMeasures.find(m => m.value === measureValue);
                    if (found) {
                        missingLabels[measureValue] = found.label;
                    }
                }
            });
            if (Object.keys(missingLabels).length > 0) {
                onChangeProperty('customMeasuresLabels', {
                    ...customMeasuresLabels,
                    ...missingLabels,
                });
            }
        }

        const isSuperSet = isSupersetAPI(app, apps);

        // Dimension options for lat/lon dropdowns
        const dimOptions = [
            { label: __('— Select field —', 'dg'), value: 'none' },
            ...allDimensions.map(d => ({ label: d.label || d.value, value: d.value })),
        ];

        return (
            <>
                {/* ── Data Source ─────────────────────────────────────────── */}
                <PanelBody title={__('Data Source', 'dg')} initialOpen={true}>

                    {/* App selector */}
                    <PanelRow>
                        <SelectControl
                            label={__('App', 'dg')}
                            help={__('Data source application', 'dg')}
                            value={app}
                            options={apps}
                            onChange={value => onChangeProperty('app', value)}
                        />
                    </PanelRow>

                    {/* Dataset selector — only for Superset proxy */}
                    {isSuperSet && (
                        <PanelRow>
                            <SelectControl
                                label={__('Dataset', 'dg')}
                                value={dvzProxyDatasetId}
                                options={allDatasets}
                                onChange={value => onChangeProperty('dvzProxyDatasetId', value)}
                            />
                        </PanelRow>
                    )}

                    {/* Latitude field */}
                    <PanelRow>
                        <SelectControl
                            label={__('Latitude field', 'dg')}
                            help={__('Dimension that contains the pixel centre latitude', 'dg')}
                            value={latField}
                            options={dimOptions}
                            onChange={value => onChangeProperty('latField', value)}
                        />
                    </PanelRow>

                    {/* Longitude field */}
                    <PanelRow>
                        <SelectControl
                            label={__('Longitude field', 'dg')}
                            help={__('Dimension that contains the pixel centre longitude', 'dg')}
                            value={lonField}
                            options={dimOptions}
                            onChange={value => onChangeProperty('lonField', value)}
                        />
                    </PanelRow>

                    {/* Tooltip template */}
                    <PanelRow>
                        <TextareaControl
                            label={__('Tooltip', 'dg')}
                            help={__('Use {value}, {lat}, {lon} or any API key. e.g. Yield: {value}', 'dg')}
                            value={tooltip}
                            rows={4}
                            onChange={value => onChangeProperty('tooltip', value)}
                        />
                    </PanelRow>

                    {/* Available variables hint */}
                    {allMeasures.length > 0 && allMeasures.map(m => (
                        <PanelRow key={m.value}>
                            <p style={{ marginTop: '8px', fontSize: '12px', color: 'rgb(117,117,117)' }}>
                                {'{' + m.value + '}'}
                            </p>
                        </PanelRow>
                    ))}
                </PanelBody>

                {/* ── Measures ────────────────────────────────────────────── */}
                {app && app !== 'none' && app !== 'csv' && (
                    <Measures
                        layer={layer}
                        allMeasures={allMeasures}
                        onMeasuresChange={this.onMeasuresChange}
                        onFormatChange={this.onFormatChange}
                        onSetSingleMeasure={this.onSetSingleMeasure}
                        attributes={attributes}
                        setAttributes={setAttributes}
                    />
                )}

                {/* ── Filters ─────────────────────────────────────────────── */}
                {app && app !== 'none' && app !== 'csv' && (
                    <PanelBody title={__('Filters', 'dg')} initialOpen={false}>
                        {filters.map((f, index) => (
                            <PanelBody key={index} initialOpen={false} title={__(`Filter – ${f.label}`, 'dg')}>
                                <SelectControl
                                    value={f.param}
                                    options={allFilters}
                                    onChange={value => this.updateFilterParam(value, index)}
                                />
                                {allFilters
                                    .find(af => af.param === f.param)
                                    ?.items
                                    ?.map(item => (
                                        <PanelRow key={item.id}>
                                            <ToggleControl
                                                label={item.value}
                                                checked={(f.value || []).includes(item.id)}
                                                onChange={() => this.updateFilterValue(item.id, index)}
                                            />
                                        </PanelRow>
                                    ))}
                            </PanelBody>
                        ))}
                        <PanelRow>
                            <Button variant="link" onClick={this.addFilter}>{__('Add Filter', 'dg')}</Button>
                            <Button variant="link" onClick={this.removeFilter}>{__('Remove', 'dg')}</Button>
                        </PanelRow>
                    </PanelBody>
                )}

                {/* ── Pixel Appearance ────────────────────────────────────── */}
                <PanelBody title={__('Pixel Appearance', 'dg')} initialOpen={false}>
                    <PanelRow>
                        <RangeControl
                            label={__('Pixel size (degrees)', 'dg')}
                            help={__('Match this to the data grid resolution — default 0.05°.', 'dg')}
                            value={pixelSizeDeg}
                            onChange={value => onChangeProperty('pixelSizeDeg', value)}
                            min={0.01}
                            max={1}
                            step={0.01}
                        />
                    </PanelRow>
                    <PanelRow>
                        <RangeControl
                            label={__('Opacity', 'dg')}
                            value={opacity}
                            onChange={value => onChangeProperty('opacity', value)}
                            min={0}
                            max={1}
                            step={0.05}
                        />
                    </PanelRow>
                </PanelBody>

                {/* ── Gradient Color ──────────────────────────────────────── */}
                <PanelBody title={__('Gradient Color', 'dg')} initialOpen={false}>
                    <GradientGenerator
                        gradientScheme={gradientScheme}
                        gradientReverse={gradientReverse}
                        gradientStartColor={gradientStartColor}
                        gradientEndColor={gradientEndColor}
                        onChangeProperty={onChangeProperty}
                    />
                </PanelBody>

                {/* ── Number Format ───────────────────────────────────────── */}
                <PanelBody title={__('Number Format', 'dg')} initialOpen={false}>
                    <Format
                        format={format}
                        onFormatChange={this.onFormatChange}
                    />
                </PanelBody>
            </>
        );
    }
}

export default PixelGridLayer;

