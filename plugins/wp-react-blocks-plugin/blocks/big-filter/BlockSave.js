import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/editor'; // or wp.editor
const SaveComponent = (props) => {
    const {
        attributes: {
            measures,
            height,
            dimension1,
            app,
            filters,
            group,
            blockName,
            parent,
            order,
            sort,
            showZeroValues,
            dvzProxyDatasetId,
            numberFontSize,

            labelFontSize,

            label,
            csv,
            waitForFilters,
            nColumns,


            numberColor,
            labelColor,
            backgroundColor,
            unselectedNumberColor,
            unselectedLabelColor,
            unselectedBackgroundColor

        }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'big-filter'
    });

    const levels = [dimension1]
    const source = levels.filter(l => l != 'none' && l != null).join('/')

    return (
        <div {...blockProps} className={"viz-component"}
            data-component={"bigFilter"}
            data-dimension1={dimension1}
            data-height={height}
            data-source={source}
            data-app={app}
            data-sort={sort}
            data-order={sort}
            data-csv={csv}
            data-dvz-proxy-dataset-id={dvzProxyDatasetId}
            data-measures={encodeURIComponent(JSON.stringify(measures))}
            data-group={group}
            data-parent={parent}
            data-block-name={blockName}
            data-filters={encodeURIComponent(JSON.stringify(filters))}
            data-n-columns={nColumns}
            data-number-font-size={numberFontSize}



            data-label-font-size={labelFontSize}

            data-background-color={encodeURIComponent(backgroundColor)}
            data-number-color={encodeURIComponent(numberColor)}
            data-label-color={encodeURIComponent(labelColor)}

            data-unselected-background-color={encodeURIComponent(unselectedBackgroundColor)}
            data-unselected-label-color={encodeURIComponent(unselectedLabelColor)}
            data-unselected-number-color={encodeURIComponent(unselectedNumberColor)}

            data-label={label}
            data-wait-for-filters={waitForFilters}
            data-show-zero-values={showZeroValues}
        >

            <InnerBlocks.Content />
        </div>
    );
}

export default SaveComponent