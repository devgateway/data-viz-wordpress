import { useBlockProps } from '@wordpress/block-editor';
const SaveComponent = (props) => {
    const {
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
            height,
            fontSize,
            headerBgColor,
            headerTextColor,
            stripedRows,
            borderStyle,
            noDataText,
        },
    } = props;
    const blockProps = useBlockProps.save({
        className: 'data-table viz-component',
    });
    const levels = [dimension1];
    const source = levels.filter((l) => l !== 'none' && l != null).join('/');
    return (
        <div
            {...blockProps}
            data-component={"datatable"}
            data-app={app}
            data-csv={csv}
            data-dvz-proxy-dataset-id={dvzProxyDatasetId}
            data-source={source}
            data-dimension1={dimension1}
            data-dimension-label={dimensionLabel}
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
        >
        </div>
    );
};
export default SaveComponent;
