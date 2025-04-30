import {useBlockProps} from '@wordpress/block-editor';
import {InnerBlocks} from '@wordpress/editor'; // or wp.editor
const SaveComponent = (props) => {
    const {attributes: {
            measures,
            height,
            scheme,
            dimension1,
            dimension2,
            dimension3,
            app,
            tooltipHTML,
            format,
            filters,
            layout,
            group,
            noDataMessage,
            ***REMOVED***,
            tooltipEnableMarkdown,
            csv,
            sort,
            nodeThickness,
            nodeOpacity,
            ***REMOVED***,
            ***REMOVED***,
            nodeSpacing,
            nodeHoverOthersOpacity,
            ***REMOVED***,
            ***REMOVED***,
            linkOpacity,
            ***REMOVED***,
            linkHoverOthersOpacity,
            linkContract,
            ***REMOVED***,
            enableLabels,
            labelPosition,
            labelPadding,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            showLegends,
            ***REMOVED***,
            marginLeft,
            marginRight,
            marginBottom,
            marginTop,
            legendLabel,
            ***REMOVED***,
            useCheckBoxBackground,
            ***REMOVED***,
            reverseLegend,
            manualColors,
            noDataMsg
        }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'sankey chart'
    });

    const levels = [dimension1, dimension2, dimension3]
    const source = levels.filter(l => l != 'none' && l != null).join('/')

    return (
        <div {...blockProps} className={"viz-component"}
             data-component={"sankeychart"}
             data-height={height}
             data-source={source}
             data-dimension1={dimension1}
             data-dimension2={dimension2}
             data-dimension3={dimension3}
             data-scheme={scheme}
             data-margin-left={marginLeft}
             data-margin-top={marginTop}
             data-margin-right={marginRight}
             data-margin-bottom={marginBottom}
             data-show-legends={showLegends}
             data-legend-position={***REMOVED***}
             data-app={app}
             data-measures={***REMOVED***(JSON.stringify(measures))}
             data-format={***REMOVED***(JSON.stringify(format))}
             data-tooltip-html={***REMOVED***(tooltipHTML)}
             data-layout={layout}
             data-group={group}
             data-filters={***REMOVED***(JSON.stringify(filters))}
             data-no-data-message={noDataMessage}
             data-legend-label={legendLabel}
             data-tooltip-enabled={***REMOVED***}
             data-use-label-background={***REMOVED***}
             data-use-check-box-background={useCheckBoxBackground}
             data-legend-label-color={***REMOVED***}
             data-tooltip-enable-markdown={tooltipEnableMarkdown}
             data-reverse-legend={reverseLegend}
             data-sort={sort}
             data-node-thickness={nodeThickness}
             data-node-opacity={nodeOpacity}
             data-node-hover-opacity={***REMOVED***}
             data-node-inner-padding={***REMOVED***}
             data-node-spacing={nodeSpacing}
             data-node-hover-others-opacity={nodeHoverOthersOpacity}
             data-node-border-width={***REMOVED***}
             data-node-border-radius={***REMOVED***}
             data-link-opacity={linkOpacity}
             data-link-hover-opacity={***REMOVED***}
             data-link-hover-others-opacity={linkHoverOthersOpacity}
             data-link-contract={linkContract}
             data-enable-link-gradient={***REMOVED***}
             data-enable-labels={enableLabels}
             data-label-position={labelPosition}
             data-label-padding={labelPadding}
             data-use-custom-label-color={***REMOVED***}
             data-label-text-color={***REMOVED***}
             data-label-orientation={***REMOVED***}
             data-manual-colors={***REMOVED***(JSON.stringify(manualColors))}
             data-no-data-message={noDataMsg}
             data-csv={csv}

>

            <InnerBlocks.Content/>
        </div>
    );
}

export default SaveComponent