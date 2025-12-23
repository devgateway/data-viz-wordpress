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
            defaultBarColor,
            barBackgroundColor,
            labelPosition,
            valuePosition,
            labelWidth,
            labelHeight,
            labelFormat,
            sorting,
            sortDirection,
            topN,
            barSizeCriteria,
            mainMeasure

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
             data-manual-colors={encodeURIComponent(manualColors || '{}')}
             data-default-bar-color={encodeURIComponent(defaultBarColor)}
             data-bar-background-color={encodeURIComponent(barBackgroundColor)}
            data-label-position={labelPosition}
            data-value-position={valuePosition}
            data-label-width={labelWidth}
            data-label-height={labelHeight}
            data-label-format={encodeURIComponent(labelFormat)}
            data-sorting={sorting}
            data-sort-direction={sortDirection}
            data-top-n={topN}
            data-bar-size-criteria={barSizeCriteria}
            data-main-measure={encodeURIComponent(mainMeasure || '')}>
            <InnerBlocks.Content/>
        </div>
    );
}

export default SaveComponent