import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/editor'; // or wp.editor
const SaveComponent = (props) => {
    const { attributes: {
        measures,
        height,
        dimension1,
        app,
        format,
        filters,
        group,
        noDataMsg,
        dvzProxyDatasetId,
        numberFontSize,
        numberColor,
        labelFontSize,
        labelColor,
        label,
        groupLabel,
        groupLabelFontSize,
        groupLabelColor,

        csv,
        waitForFilters,
        noDataText,
        showZeroValues
    }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'big-number'
    });

    const levels = [dimension1]
    const source = levels.filter(l => l != 'none' && l != null).join('/')

    return (
        <div {...blockProps} className={"viz-component"}
            data-component={"bignumber"}
            data-dimension1={dimension1}
            data-height={height}
            data-source={source}
            data-app={app}
            data-csv={csv}
            data-dvz-proxy-dataset-id={dvzProxyDatasetId}
            data-measures={encodeURIComponent(JSON.stringify(measures))}
            data-format={encodeURIComponent(JSON.stringify(format))}
            data-group={group}
            data-filters={encodeURIComponent(JSON.stringify(filters))}
            data-no-data-message={noDataMsg}
            data-number-font-size={numberFontSize}
            data-number-color={encodeURIComponent(numberColor)}
            data-label-font-size={labelFontSize}
            data-label-color={encodeURIComponent(labelColor)}
            data-label={label}
            data-group-label={groupLabel}
            data-group-label-font-sizee={groupLabelFontSize}
            data-group-label-color={groupLabelColor}
            data-wait-for-filters={waitForFilters}
            data-no-data-text={noDataText}
            data-show-zero-values={showZeroValues}>

            <InnerBlocks.Content />
        </div>
    );
}

export default SaveComponent