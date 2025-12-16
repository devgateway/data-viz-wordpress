import {useBlockProps, InnerBlocks} from '@wordpress/block-editor';
const SaveComponent = (props) => {
    const {attributes: {
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
            csv,
            waitForFilters,
            noDataText,
            textTemplate
        }
    } = props;

    const blockProps = useBlockProps.save({
        className: 'small-number',
        
    });

    

    const levels = [dimension1]
    const source = levels.filter(l => l != 'none' && l != null).join('/')
  

    return (
        <span
           {...blockProps} className={"viz-component"}
             data-component={"smallnumber"}
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
             data-wait-for-filters={waitForFilters}
             data-no-data-text={noDataText}
             data-text-template={encodeURIComponent(textTemplate)}
             >
            <InnerBlocks.Content></InnerBlocks.Content>
        </span>
    );
}

export default SaveComponent