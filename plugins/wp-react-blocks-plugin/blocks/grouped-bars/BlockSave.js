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
            label,            
            waitForFilters,
            noDataText,            
            backGroundColor,
            manualColors = '{}',
            defaultBarColor,
            barBackgroundColor
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
             data-back-ground-color={backGroundColor}           
             data-manual-colors={encodeURIComponent(manualColors || '{}')}
             data-default-bar-color={defaultBarColor}
             data-bar-background-color={barBackgroundColor}
        >
            <InnerBlocks.Content/>
        </div>
    );
}

export default SaveComponent