import {
	InspectorControls,
	PanelColorSettings,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	PanelRow,
	ResizableBox,
	SelectControl,
	TextControl,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	BlockEditWithAPIMetadata,
	SizeConfig,
	DataFilters,
	Format,
	getTranslation,
	isSupersetAPI,
	togglePanel,
} from '@devgateway/dvz-wp-commons';
import Papa from 'papaparse';

const defaultFormat = {
	style: 'decimal',
	minimumFractionDigits: 0,
	maximumFractionDigits: 2,
	currency: 'USD',
};

const buildSortToken = (type, value) => `${type}:${value}`;

class BlockEdit extends BlockEditWithAPIMetadata {
	constructor(props) {
		super(props);
		this.onMeasuresChange = this.onMeasuresChange.bind(this);
		this.onDimensionChange = this.onDimensionChange.bind(this);
		this.onCustomLabelToggleChange = this.onCustomLabelToggleChange.bind(this);
		this.onCustomLabelChange = this.onCustomLabelChange.bind(this);
		this.onMeasureOrderChange = this.onMeasureOrderChange.bind(this);
		this.updateMeasureFormat = this.updateMeasureFormat.bind(this);
		this.syncMeasureLabelsFromMetadata =
			this.syncMeasureLabelsFromMetadata.bind(this);
	}

	componentDidMount() {
		super.componentDidMount();
	}

	componentDidUpdate(prevProps, prevState) {
		super.componentDidUpdate(prevProps, prevState);
		this.syncMeasureLabelsFromMetadata();
	}

	getCsvMetadata(csv) {
		const parsed = Papa.parse(csv || '', {
			header: true,
			dynamicTyping: true,
			skipEmptyLines: true,
		});
		const headers = Array.isArray(parsed?.meta?.fields)
			? parsed.meta.fields.filter((header) => header)
			: [];
		const rows = Array.isArray(parsed?.data) ? parsed.data : [];
		const numericHeaders = headers.filter((header) => {
			const values = rows
				.map((row) => row?.[header])
				.filter(
					(value) => value !== '' && value !== null && value !== undefined,
				);
			return (
				values.length > 0 &&
				values.every(
					(value) => typeof value === 'number' && !Number.isNaN(value),
				)
			);
		});
		return { headers, numericHeaders };
	}

	getAvailableDimensions() {
		const {
			attributes: { app, csv },
		} = this.props;
		if (app === 'csv') {
			const { headers } = this.getCsvMetadata(csv);
			return [
				{ label: __('None'), value: 'none' },
				...headers.map((header) => ({ label: header, value: header })),
			];
		}
		return this.state.dimensions || [{ label: __('None'), value: 'none' }];
	}

	getMetadataMeasures() {
		const {
			attributes: { app, csv },
		} = this.props;
		if (app === 'csv') {
			const { numericHeaders } = this.getCsvMetadata(csv);
			return numericHeaders.map((header) => ({
				label: header,
				value: header,
				group: __('Measures'),
			}));
		}
		return Array.isArray(this.state.measures)
			? this.state.measures.filter((measure) => measure?.value)
			: [];
	}

	getNextMeasureOrder(appMeasures = {}) {
		const usedOrders = Object.values(appMeasures)
			.map((config) => parseInt(config?.order, 10))
			.filter((order) => Number.isFinite(order));
		return (usedOrders.length > 0 ? Math.max(...usedOrders) : 0) + 1;
	}

	updateMeasureConfig(measureKey, updater) {
		const {
			setAttributes,
			attributes: { app, measures = {} },
		} = this.props;
		const nextMeasures = { ...measures };
		const nextAppMeasures = { ...(nextMeasures[app] || {}) };
		const currentConfig = nextAppMeasures[measureKey] || {};
		const updatedConfig =
			typeof updater === 'function'
				? updater(currentConfig, nextAppMeasures)
				: { ...currentConfig, ...updater };
		nextAppMeasures[measureKey] = updatedConfig;
		nextMeasures[app] = nextAppMeasures;
		setAttributes({ measures: nextMeasures });
	}

	getDimensionOptions(fieldName, options, selectedDimensions) {
		const currentValue = selectedDimensions[fieldName];
		return options.filter((option) => {
			if (option.value === 'none') {
				return true;
			}
			if (option.value === currentValue) {
				return true;
			}
			return !Object.entries(selectedDimensions).some(
				([key, value]) => key !== fieldName && value === option.value,
			);
		});
	}

	syncMeasureLabelsFromMetadata() {
		const {
			setAttributes,
			attributes: { app, measures = {}, dimension1, dimension2 },
		} = this.props;
		const metadataMeasures = this.getMetadataMeasures();
		if (metadataMeasures.length === 0) {
			return;
		}
		const selectedDimensions = [dimension1, dimension2].filter(
			(dimension) => dimension && dimension !== 'none',
		);
		const labelsByMeasure = metadataMeasures.reduce((acc, measure) => {
			if (measure?.value) {
				acc[measure.value] = measure.label || measure.value;
			}
			return acc;
		}, {});
		const currentAppMeasures = measures[app];
		let nextAppMeasures = currentAppMeasures
			? Object.entries(currentAppMeasures).reduce(
					(acc, [measureKey, config]) => {
						if (!labelsByMeasure[measureKey] || !config) {
							return acc;
						}
						acc[measureKey] = { ...config };
						return acc;
					},
					{},
			  )
			: null;
		let changed = false;
		if (currentAppMeasures) {
			const currentMeasureKeys = Object.keys(currentAppMeasures);
			const nextMeasureKeys = nextAppMeasures
				? Object.keys(nextAppMeasures)
				: [];
			if (currentMeasureKeys.length !== nextMeasureKeys.length) {
				changed = true;
			}
		}
		if (!nextAppMeasures || Object.keys(nextAppMeasures).length === 0) {
			nextAppMeasures = metadataMeasures.reduce((acc, measure, index) => {
				acc[measure.value] = {
					selected: !selectedDimensions.includes(measure.value),
					format: { ...defaultFormat },
					label: labelsByMeasure[measure.value],
					order: index + 1,
				};
				return acc;
			}, {});
			changed = true;
		}
		Object.entries(nextAppMeasures).forEach(([measureKey, config], index) => {
			const label = labelsByMeasure[measureKey];
			if (!config || !label) {
				return;
			}
			if (!config.format) {
				nextAppMeasures[measureKey] = {
					...nextAppMeasures[measureKey],
					format: { ...defaultFormat },
				};
				changed = true;
			}
			if (!Number.isFinite(parseInt(config.order, 10))) {
				nextAppMeasures[measureKey] = {
					...nextAppMeasures[measureKey],
					order: index + 1,
				};
				changed = true;
			}
			if (config.label !== label) {
				nextAppMeasures[measureKey] = { ...nextAppMeasures[measureKey], label };
				changed = true;
			}
			if (selectedDimensions.includes(measureKey) && config.selected) {
				nextAppMeasures[measureKey] = {
					...nextAppMeasures[measureKey],
					selected: false,
				};
				changed = true;
			}
		});
		if (changed) {
			setAttributes({ measures: { ...measures, [app]: nextAppMeasures } });
		}
	}

	onMeasuresChange(value) {
		const {
			setAttributes,
			attributes: { app, measures = {} },
		} = this.props;
		const nextMeasures = { ...measures };
		const nextAppMeasures = { ...(nextMeasures[app] || {}) };
		const selectedMeasure = this.getMetadataMeasures().find(
			(measure) => measure.value === value,
		);
		const measureLabel = selectedMeasure?.label || value;
		if (nextAppMeasures[value]) {
			nextAppMeasures[value] = {
				...nextAppMeasures[value],
				selected: !nextAppMeasures[value].selected,
				label: measureLabel,
				format: nextAppMeasures[value].format || { ...defaultFormat },
				order: Number.isFinite(parseInt(nextAppMeasures[value].order, 10))
					? parseInt(nextAppMeasures[value].order, 10)
					: this.getNextMeasureOrder(nextAppMeasures),
			};
		} else {
			nextAppMeasures[value] = {
				selected: true,
				format: { ...defaultFormat },
				label: measureLabel,
				order: this.getNextMeasureOrder(nextAppMeasures),
			};
		}
		nextMeasures[app] = nextAppMeasures;
		setAttributes({ measures: nextMeasures });
	}

	onDimensionChange(fieldName, value) {
		const {
			setAttributes,
			attributes: { dimension1, dimension2 },
		} = this.props;
		const nextDimensions = {
			dimension1,
			dimension2,
			[fieldName]: value,
		};
		if (nextDimensions.dimension1 === 'none') {
			nextDimensions.dimension2 = 'none';
		}
		const seen = new Set();
		['dimension1', 'dimension2'].forEach((key) => {
			const dimensionValue = nextDimensions[key];
			if (!dimensionValue || dimensionValue === 'none') {
				return;
			}
			if (seen.has(dimensionValue)) {
				nextDimensions[key] = 'none';
				return;
			}
			seen.add(dimensionValue);
		});
		setAttributes(nextDimensions);
	}

	onCustomLabelToggleChange(value) {
		this.updateMeasureConfig(value, (currentConfig) => ({
			...currentConfig,
			hasCustomLabel: !currentConfig?.hasCustomLabel,
		}));
	}

	onCustomLabelChange(value, customLabel) {
		this.updateMeasureConfig(value, (currentConfig) => ({
			...currentConfig,
			customLabel,
		}));
	}

	onMeasureOrderChange(value, nextOrder) {
		const parsedOrder = parseInt(nextOrder, 10);
		this.updateMeasureConfig(value, (currentConfig, currentMeasures) => ({
			...currentConfig,
			order:
				Number.isFinite(parsedOrder) && parsedOrder > 0
					? parsedOrder
					: currentConfig?.order || this.getNextMeasureOrder(currentMeasures),
		}));
	}

	updateMeasureFormat(value, newFormat) {
		this.updateMeasureConfig(value, (currentConfig) => ({
			...currentConfig,
			format: newFormat || { ...defaultFormat },
		}));
	}

	getDefaultSortOptions(selectedMeasures) {
		const {
			attributes: {
				dimension1,
				dimension2,
				dimensionLabel,
				dimensionLabel2,
			},
		} = this.props;
		const hasPivotLayout =
			dimension1 &&
			dimension1 !== 'none' &&
			dimension2 &&
			dimension2 !== 'none' &&
			selectedMeasures.length === 1;
		const options = [{ label: __('None'), value: '' }];

		if (dimension1 && dimension1 !== 'none') {
			options.push({
				label: `${__('Row')} · ${dimensionLabel || dimension1}`,
				value: buildSortToken('dimension', dimension1),
			});
		}

		if (!hasPivotLayout && dimension2 && dimension2 !== 'none') {
			options.push({
				label: `${__('Row')} · ${dimensionLabel2 || dimension2}`,
				value: buildSortToken('dimension', dimension2),
			});
		}

		if (!hasPivotLayout) {
			selectedMeasures.forEach(({ key, label }) => {
				options.push({
					label: `${__('Column')} · ${label}`,
					value: buildSortToken('measure', key),
				});
			});
		}

		return {
			options,
			hasPivotLayout,
		};
	}

	renderMeasureSelectionPanel(
		availableMeasures,
		selectedDimensions,
		app,
		measures,
		panelStatus,
		setAttributes,
	) {
		if (!availableMeasures || availableMeasures.length === 0) {
			return (
				<PanelBody initialOpen={false} title={__('Measures (columns)')}>
					<p style={{ margin: 0, color: '#50575e' }}>
						{__('No numeric measures were found for the current source.')}
					</p>
				</PanelBody>
			);
		}
		const groupedMeasures = availableMeasures.reduce((acc, measure) => {
			const groupLabel = getTranslation(measure.group || __('Measures'));
			if (!acc[groupLabel]) {
				acc[groupLabel] = [];
			}
			acc[groupLabel].push(measure);
			return acc;
		}, {});
		const appMeasures = measures?.[app] || {};
		return (
			<PanelBody
				initialOpen={panelStatus.MEASURES}
				title={__('Measures (columns)')}
				onToggle={() => togglePanel('MEASURES', panelStatus, setAttributes)}
			>
				<p style={{ margin: '0 0 12px', color: '#50575e' }}>
					{__(
						'Choose which numeric columns to display. Measure order and number formatting can be customized below.',
					)}
				</p>
				{Object.entries(groupedMeasures).map(([groupLabel, groupMeasures]) => (
					<PanelBody key={groupLabel} initialOpen={false} title={groupLabel}>
						{groupMeasures.map((measure) => {
							const measureConfig = appMeasures[measure.value] || {};
							const isDisabled = selectedDimensions.includes(measure.value);
							return (
								<PanelRow key={measure.value}>
									<ToggleControl
										label={getTranslation(measure)}
										checked={!!measureConfig.selected}
										disabled={isDisabled}
										help={
											isDisabled
												? __('This field is already used as a dimension.')
												: undefined
										}
										onChange={() => this.onMeasuresChange(measure.value)}
									/>
								</PanelRow>
							);
						})}
					</PanelBody>
				))}
			</PanelBody>
		);
	}

	renderSelectedMeasureCustomization(selectedMeasures) {
		if (!selectedMeasures.length) {
			return null;
		}
		return (
			<PanelBody
				initialOpen={false}
				title={__('Selected Measure Customization')}
			>
				{selectedMeasures.map(({ key, label, config }) => (
					<PanelBody key={key} initialOpen={false} title={label}>
						<PanelRow>
							<TextControl
								label={__('Column Order')}
								type="number"
								min={1}
								value={config?.order || ''}
								onChange={(value) => this.onMeasureOrderChange(key, value)}
								help={__('Lower numbers are shown first.')}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__('Use Custom Column Label')}
								checked={!!config?.hasCustomLabel}
								onChange={() => this.onCustomLabelToggleChange(key)}
							/>
						</PanelRow>
						{config?.hasCustomLabel && (
							<PanelRow>
								<TextControl
									label={__('Custom Label')}
									value={config?.customLabel || ''}
									onChange={(value) => this.onCustomLabelChange(key, value)}
								/>
							</PanelRow>
						)}
						<Format
							hiddenCustomAxisFormat={true}
							format={config?.format || { ...defaultFormat }}
							customFormat={{}}
							useCustomAxisFormat={false}
							onFormatChange={(newFormat) =>
								this.updateMeasureFormat(key, newFormat)
							}
							onUseCustomAxisFormatChange={() => {}}
						/>
					</PanelBody>
				))}
			</PanelBody>
		);
	}

	render() {
		const {
			className,
			isSelected,
			toggleSelection,
			setAttributes,
			attributes: {
				app,
				csv,
				dvzProxyDatasetId,
				dimension1,
				dimension2,
				dimensionLabel,
				dimensionLabel2,
				measures,
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
				showExportButton,
				exportFileName,
				defaultSortColumn,
				defaultSortDirection,
			},
		} = this.props;
		const datasets = [{ label: __('Select Dataset'), value: '0' }];
		if (this.state.datasets) {
			this.state.datasets.forEach((d) => {
				datasets.push({ label: d.label, value: d.id });
			});
		}
		const availableDimensions = this.getAvailableDimensions();
		const availableMeasures = this.getMetadataMeasures();
		const selectedDimensions = [dimension1, dimension2].filter(
			(dimension) => dimension && dimension !== 'none',
		);
		const appMeasures = measures?.[app] || {};
		const selectedMeasures = Object.entries(appMeasures)
			.filter(
				([measureKey, config]) =>
					config?.selected && !selectedDimensions.includes(measureKey),
			)
			.map(([measureKey, config], index) => {
				const metadataMeasure = availableMeasures.find(
					(measure) => measure.value === measureKey,
				);
				return {
					key: measureKey,
					config,
					order: Number.isFinite(parseInt(config?.order, 10))
						? parseInt(config.order, 10)
						: index + 1,
					label:
						config?.hasCustomLabel && config?.customLabel
							? config.customLabel
							: config?.label || metadataMeasure?.label || measureKey,
				};
			})
			.sort(
				(left, right) =>
					left.order - right.order || left.label.localeCompare(right.label),
			);
		const { options: defaultSortOptions, hasPivotLayout } =
			this.getDefaultSortOptions(selectedMeasures);
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
									onChange={(nextGroup) => setAttributes({ group: nextGroup })}
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
						<PanelBody initialOpen={false} title={__('API & Source')}>
							<PanelRow>
								<SelectControl
									label={__('Data Source')}
									value={app}
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
										value={dvzProxyDatasetId}
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
										label={__('Paste CSV data')}
										value={csv}
										onChange={(nextCsv) => setAttributes({ csv: nextCsv })}
										rows={8}
									/>
								</PanelRow>
								<p style={{ margin: 0, color: '#4a5568', fontSize: '12px' }}>
									{__(
										'First row must be headers. Numeric columns become available as measures and any column can be used as a dimension.',
									)}
								</p>
							</PanelBody>
						)}
						<PanelBody initialOpen={false} title={__('Dimensions (rows)')}>
							{availableDimensions.length <= 1 && (
								<p style={{ margin: 0, color: '#4a5568', fontSize: '12px' }}>
									{__(
										'No dimensions are available for the current source yet.',
									)}
								</p>
							)}
							<PanelRow>
								<SelectControl
									label={__('Dimension 1')}
									value={dimension1}
									onChange={(value) =>
										this.onDimensionChange('dimension1', value)
									}
									options={this.getDimensionOptions(
										'dimension1',
										availableDimensions,
										{ dimension1, dimension2 },
									)}
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									label={__('Dimension 2')}
									value={dimension2}
									disabled={dimension1 === 'none'}
									onChange={(value) =>
										this.onDimensionChange('dimension2', value)
									}
									options={this.getDimensionOptions(
										'dimension2',
										availableDimensions,
										{ dimension1, dimension2 },
									)}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__('Dimension 1 Header Label')}
									value={dimensionLabel}
									onChange={(value) => setAttributes({ dimensionLabel: value })}
									help={__(
										'Optional label shown in the first dimension column header.',
									)}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__('Dimension 2 Header Label')}
									value={dimensionLabel2}
									disabled={dimension2 === 'none'}
									onChange={(value) =>
										setAttributes({ dimensionLabel2: value })
									}
									help={__(
										'Optional label shown in the second dimension column header.',
									)}
								/>
							</PanelRow>
							<PanelRow>
								<p style={{ margin: 0, color: '#4a5568', fontSize: '12px' }}>
									{__(
										'You can use one or two dimensions. When exactly one measure is selected, Dimension 2 becomes dynamic columns in the table; otherwise it remains a second grouping column.',
									)}
								</p>
							</PanelRow>
						</PanelBody>
						{this.renderMeasureSelectionPanel(
							availableMeasures,
							selectedDimensions,
							app,
							measures,
							panelStatus,
							setAttributes,
						)}
						{this.renderSelectedMeasureCustomization(selectedMeasures)}
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
									onChange={(value) =>
										setAttributes({ fontSize: parseInt(value) || 14 })
									}
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
							<PanelRow>
								<ToggleControl
									label={__('Show Export CSV Button')}
									checked={showExportButton}
									onChange={() =>
										setAttributes({ showExportButton: !showExportButton })
									}
									help={__(
										'Adds a frontend button that exports the currently displayed table as CSV.',
									)}
								/>
							</PanelRow>
							<PanelRow>
								<TextControl
									label={__('Export Filename')}
									value={exportFileName}
									onChange={(value) => setAttributes({ exportFileName: value })}
									help={__(
										'Optional filename for the CSV download. The .csv extension is added automatically.',
									)}
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									label={__('Default Sort Column')}
									value={defaultSortColumn}
									onChange={(value) =>
										setAttributes({
											defaultSortColumn: value,
											defaultSortDirection: value
												? defaultSortDirection === 'none'
													? 'asc'
													: defaultSortDirection
												: 'none',
										})
									}
									options={defaultSortOptions}
									help={__(
										'Choose which visible column should be applied as the initial sort on load.',
									)}
								/>
							</PanelRow>
							<PanelRow>
								<SelectControl
									label={__('Default Sort Direction')}
									value={defaultSortColumn ? defaultSortDirection : 'none'}
									disabled={!defaultSortColumn}
									onChange={(value) =>
										setAttributes({ defaultSortDirection: value })
									}
									options={[
										{ label: __('None'), value: 'none' },
										{ label: __('Ascending'), value: 'asc' },
										{ label: __('Descending'), value: 'desc' },
									]}
									help={__(
										'Sets the initial sort order before the user clicks a header.',
									)}
								/>
							</PanelRow>
							{hasPivotLayout && (
								<PanelRow>
									<p style={{ margin: 0, color: '#4a5568', fontSize: '12px' }}>
										{__(
											'In pivot layout, only the row dimension can be pre-sorted because the value columns are generated dynamically from the data.',
										)}
									</p>
								</PanelRow>
							)}
						</PanelBody>
						<PanelColorSettings
							title={__('Header Colors')}
							initialOpen={false}
							colorSettings={[
								{
									value: headerBgColor,
									onChange: (color) =>
										setAttributes({ headerBgColor: color || '#f0f4f8' }),
									label: __('Header Background'),
								},
								{
									value: headerTextColor,
									onChange: (color) =>
										setAttributes({ headerTextColor: color || '#2d3748' }),
									label: __('Header Text'),
								},
							]}
						/>
					</Panel>
				</InspectorControls>
			),
			<ResizableBox
				key="block-preview"
				size={{ height }}
				style={{ margin: 'auto', width: '100%' }}
				minHeight="180"
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
				}}
			>
				<div className={className}>
					{this.state.react_ui_url ? (
						<iframe
							ref={this.iframe}
							title={__('Data Table Preview')}
							style={divStyles}
							scrolling="yes"
							src={this.state.react_ui_url + '/embeddable/datatable?'}
						/>
					) : (
						<div
							style={{
								...divStyles,
								padding: '12px',
								background: '#f9fafb',
								borderRadius: '6px',
							}}
						>
							<strong style={{ fontSize: '13px', color: '#4a5568' }}>
								{__('📊 Loading data table preview…')}
							</strong>
						</div>
					)}
				</div>
			</ResizableBox>,
		];
	}
}

const Edit = (props) => {
	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
			<BlockEdit {...props} />
		</div>
	);
};

export default Edit;
