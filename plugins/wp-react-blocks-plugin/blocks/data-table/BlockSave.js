import { useBlockProps } from '@wordpress/block-editor';
const SaveComponent = (props) => {
	const {
		attributes: {
			app,
			csv,
			dvzProxyDatasetId,
			dimension1,
			dimension2,
			dimensionLabel,
			dimensionLabel2,
			measures,
			filters,
			group,
			waitForFilters,
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
	} = props;
	const blockProps = useBlockProps.save({
		className: 'data-table viz-component',
	});
	const levels = [dimension1, dimension2];
	const source = levels
		.filter(
			(level) => level !== 'none' && level !== null && level !== undefined,
		)
		.join('/');
	return (
		<div
			{...blockProps}
			data-component="datatable"
			data-app={app}
			data-csv={csv}
			data-dvz-proxy-dataset-id={dvzProxyDatasetId}
			data-source={source}
			data-dimension1={dimension1}
			data-dimension2={dimension2}
			data-dimension-label={dimensionLabel}
			data-dimension2-label={dimensionLabel2}
			data-measures={encodeURIComponent(JSON.stringify(measures))}
			data-filters={encodeURIComponent(JSON.stringify(filters))}
			data-group={group}
			data-wait-for-filters={waitForFilters}
			data-height={height}
			data-font-size={fontSize}
			data-header-bg-color={encodeURIComponent(headerBgColor)}
			data-header-text-color={encodeURIComponent(headerTextColor)}
			data-striped-rows={stripedRows}
			data-border-style={borderStyle}
			data-no-data-text={noDataText}
			data-show-export-button={showExportButton}
			data-export-file-name={exportFileName}
			data-default-sort-column={defaultSortColumn}
			data-default-sort-direction={defaultSortDirection}
		></div>
	);
};
export default SaveComponent;
