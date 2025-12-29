import {useBlockProps} from '@wordpress/block-editor';
import {InnerBlocks} from '@wordpress/editor'; // or wp.editor
const SaveComponent = (props) => {
    const {
        attributes: {
            measures,
            height,
            dimension1,
            app,
            csv,
            format,
            filters,
            group,
            noDataMsg,
            dvzProxyDatasetId,
            fontSize,
            textColor,
            waitForFilters,
            noDataText,            
            backGroundColor,
            manualColors = '{}',
            enableManualColors = false,
            manualColorsMode = 'dimension',
            defaultBarColor,
            barBackgroundColor,
            labelPosition,
            valuePosition,
            labelWidth,
            labelHeight,
            labelFormat,
            showMeasureLabels,
            sorting,
            sortDirection,
            topN,
            barSizeCriteria,
            barSizeUseGroup,
            mainMeasure,
            enableCustomMeasureFormats
        }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'grouped-bars viz-component'
    });

    const levels = [dimension1]
    const source = levels.filter(l => l != 'none' && l != null).join('/')
    return (
        <div {...blockProps}
             data-component={"groupedbars"}
             data-height={height}
             data-source={source}
             data-app={app}
             data-csv={csv}
             data-dvz-proxy-dataset-id={dvzProxyDatasetId}
             data-measures={encodeURIComponent(JSON.stringify(measures))}
             data-dimension1={dimension1}
             data-format={encodeURIComponent(JSON.stringify(format))}
             data-group={group}
             data-filters={encodeURIComponent(JSON.stringify(filters))}
             data-no-data-message={noDataMsg}
             data-font-size={fontSize}
             data-text-color={encodeURIComponent(textColor)}
             data-wait-for-filters={waitForFilters}
             data-no-data-text={noDataText}
             data-back-ground-color={encodeURIComponent(backGroundColor)}           
             data-manual-colors={encodeURIComponent(enableManualColors ? (manualColors || '{}') : '{}')}
             data-enable-manual-colors={enableManualColors}
             data-manual-colors-mode={manualColorsMode}
             data-default-bar-color={encodeURIComponent(defaultBarColor)}
             data-bar-background-color={encodeURIComponent(barBackgroundColor)}
            data-label-position={labelPosition}
            data-value-position={valuePosition}
            data-label-width={labelWidth}
            data-label-height={labelHeight}
            data-label-format={encodeURIComponent(labelFormat)}
            data-show-measure-labels={showMeasureLabels}
            data-sorting={sorting}
            data-sort-direction={sortDirection}
            data-top-n={topN}
            data-bar-size-criteria={barSizeCriteria}
            data-bar-size-use-group={barSizeUseGroup}
            data-enable-custom-measure-formats={enableCustomMeasureFormats}
            data-main-measure={encodeURIComponent(mainMeasure || '')}>
            <InnerBlocks.Content/>
        </div>
    );
}

export default SaveComponent