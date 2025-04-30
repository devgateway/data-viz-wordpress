import {useBlockProps} from '@wordpress/block-editor';
import {InnerBlocks} from '@wordpress/editor'; // or wp.editor
const SaveComponent = (props) => {
    const {attributes: {
            measures,
            height,
            dimension1,
            app,
            csv,
            format,
            filters,
            group,            
            noDataMsg,
            ***REMOVED***,
            ***REMOVED***,
            labelFontSize,
            ***REMOVED***,
            textColor,            
            label,
            ***REMOVED***,
        }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'big-number-trend'
    });

    const levels = [dimension1]
    const source = levels.filter(l => l != 'none' && l != null).join('/')

    return (
        <div {...blockProps} className={"viz-component"}
             data-component={"***REMOVED***"}
             data-height={height}
             data-source={source}
             data-app={app}
             data-csv={csv}
             data-dvz-proxy-dataset-id={***REMOVED***}
             data-measures={***REMOVED***(JSON.stringify(measures))}
             data-dimension1={dimension1}
             data-format={***REMOVED***(JSON.stringify(format))}
             data-group={group}
             data-filters={***REMOVED***(JSON.stringify(filters))}
             data-no-data-message={noDataMsg}
             data-big-number-font-size={***REMOVED***}
             data-label-font-size={labelFontSize}
             data-percent-font-size={***REMOVED***}
             data-text-color={***REMOVED***(textColor)}            
             data-label={label}            
             data-show-percentage-change={***REMOVED***}>
            <InnerBlocks.Content/>
        </div>
    );
}

export default SaveComponent