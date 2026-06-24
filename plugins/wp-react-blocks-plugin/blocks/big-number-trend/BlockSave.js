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
            dvzProxyDatasetId,
            bigNumberFontSize,
            labelFontSize,
            percentFontSize,
            textColor,
            label,
            showPercentageChange,
            waitForFilters,
            noDataText,
            iconImage,
            iconUp,
            iconDown,
            styleOption,
            percentColor,
            numberColor,
            backGroundColor,
            showTooltip,
            tooltipText,
            tooltipStyle,
            percentChangeFormat
        }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'big-number-trend'
    });

    return (
        <div {...blockProps} className={"viz-component"}
             data-component={"bignumbertrend"}
             data-height={height}
             data-app={app}
             data-csv={csv}
             data-dvz-proxy-dataset-id={dvzProxyDatasetId}
             data-measures={encodeURIComponent(JSON.stringify(measures))}
             data-dimension1={dimension1}
             data-format={encodeURIComponent(JSON.stringify(format))}
             data-group={group}
             data-filters={encodeURIComponent(JSON.stringify(filters))}
             data-big-number-font-size={bigNumberFontSize}
             data-label-font-size={labelFontSize}
             data-percent-font-size={percentFontSize}
             data-text-color={encodeURIComponent(textColor)}
             data-number-color={encodeURIComponent(numberColor)}
             data-percent-color={encodeURIComponent(percentColor)}
             data-back-ground-color={backGroundColor}
             data-label={label}
             data-show-percentage-change={showPercentageChange}
             data-wait-for-filters={waitForFilters}
             data-no-data-text={noDataText}
             data-icon-image={iconImage}
             data-icon-up={iconUp}
             data-icon-down={iconDown}
             data-style-option={styleOption}
             data-show-tooltip={showTooltip}
             data-tooltip-text={tooltipText}
             data-tooltip-style={tooltipStyle}
             data-percent-change-format={encodeURIComponent(JSON.stringify(percentChangeFormat))}
        >
            <InnerBlocks.Content/>
        </div>
    );
}

export default SaveComponent