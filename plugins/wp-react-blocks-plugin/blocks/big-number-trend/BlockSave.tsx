import React from 'react';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { BigNumberTrendProps } from './types';

const SaveComponent = (props: BigNumberTrendProps) => {
    const { attributes: {
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
        bigNumberFontSize,
        labelFontSize,
        percentFontSize,
        textColor,
        label,
        showPercentageChange,
    }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'big-number-trend'
    });

    const levels = [dimension1]
    const source = levels.filter(l => l != 'none' && l != null).join('/')

    return (
        <div
            {...blockProps}
            className={"viz-component"}
            data-component={"bignumbertrend"}
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
            data-big-number-font-size={bigNumberFontSize}
            data-label-font-size={labelFontSize}
            data-percent-font-size={percentFontSize}
            data-text-color={encodeURIComponent(textColor)}
            data-label={label}
            data-show-percentage-change={showPercentageChange}>
            <InnerBlocks.Content />
        </div>
    );
}

export default SaveComponent