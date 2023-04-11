import {useBlockProps} from '@wordpress/block-editor';

const SaveComponent = (props) => {

    const {
        attributes: {            
            type,
            height,
            ***REMOVED***,
            ***REMOVED***,
            dimension1,
            dimension2,
            measures,
            filters,
            app,
            csv,
            ***REMOVED***,
            legendTitle,
            legendBreaks,
            zoomEnabled,
            ***REMOVED***,
            mapFile,
            mainLayerId,
            mappingField,
            mapLabelField,
            ***REMOVED***,
            mapCenter,
            ***REMOVED***,
            showTooltip,
            ***REMOVED***,
            valueFormat,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            colorScheme,
            ***REMOVED***,
            group,
            mapSymbols,
            tooltipTheme,
            ***REMOVED***,
            ***REMOVED***,
            labelFontSize,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            formatStyle,
            decimals,
            currency,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            mapFocusBoundaryColor,
            ***REMOVED***,
            tooltipFormat,
            ***REMOVED***,
            ***REMOVED***,
            mapPosition,
            taxonomy,
            fileType,
            enabledLayers,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            highlightedLocLabelFormat,
            mapType,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            zoomLevelToShowPoints,
            zoomOnFilter,
            ***REMOVED***
        }
    } = props;
    
    const blockProps = useBlockProps.save({
        className: 'tcdi component map'
    });

    const levels = [dimension1, dimension2]
    const source = levels.filter(l => l != 'none' && l != null).join('/')
    const ***REMOVED*** = legendBreaks.filter(b => b.min || b.max);

    let params = {}
    filters.forEach(f => {
        if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
            params[f.param] = f.value
    })    

    return (
        <div {...blockProps}
            className={"tcdi-component"}
             data-component={"map"}
             data-group={group}
             data-height={height}             
             data-type={type}
             data-data-source-text={***REMOVED***}
             data-data-source-label={***REMOVED***}
             data-measures={Array.isArray(measures) ? measures.join(',') : []}
             data-app={app}
             data-source={source}   
             data-csv={***REMOVED***(csv)} 
             data-national-average-label={***REMOVED***}
             data-legend-title={legendTitle}
             data-legend-breaks={***REMOVED***(JSON.stringify(***REMOVED***))}
             data-zoom-enabled={zoomEnabled}
             data-show-legend-labels={***REMOVED***}
             data-map-file={mapFile}
             data-main-layer-id={mainLayerId}
             data-mapping-field={mappingField}
             data-map-label-field={mapLabelField}
             data-has-multiple-measures={***REMOVED***}
             data-map-center={mapCenter}
             data-map-label-show-value={***REMOVED***}
             data-show-tooltip={showTooltip}
             data-measure-selector-label={***REMOVED***}
             data-value-format={valueFormat}
             data-show-overall-value={***REMOVED***}
             data-auto-generate-breaks={***REMOVED***}
             data-number-of-breaks={***REMOVED***}
             data-color-scheme={colorScheme}
             data-show-no-data-label={***REMOVED***}
             data-tooltip-theme={tooltipTheme}
             data-label-font-weight={***REMOVED***}
             data-label-font-color={***REMOVED***}
             data-label-font-size={labelFontSize}
             data-legend-font-size={***REMOVED***}
             data-legend-font-weight={***REMOVED***}
             data-format-style={formatStyle}
             data-decimals={decimals}
             data-currency={currency}
             data-tooltip-font-size={***REMOVED***}
             data-map-symbols={***REMOVED***(JSON.stringify(mapSymbols))}
             data-filters={***REMOVED***(JSON.stringify(params))}
             data-custom-tooltips={***REMOVED***(JSON.stringify(***REMOVED***))}
             data-show-admin-unit-label={***REMOVED***}
             data-map-no-data-color={***REMOVED***}
             data-map-boundary-color={***REMOVED***}
             data-map-focus-boundary-color={mapFocusBoundaryColor}
             data-highlighted-location={***REMOVED***}
             data-tooltip-format={tooltipFormat}
             data-show-no-data-tooltip={***REMOVED***}
             data-map-container-bg-color={***REMOVED***}
             data-map-position={***REMOVED***(mapPosition)}
             data-taxonomy={taxonomy}
             data-file-type={fileType}
             data-dimension1={dimension1}
             data-dimension2={dimension2}
             data-enabled-layers={***REMOVED***(JSON.stringify(enabledLayers))}
             data-point-label-color={***REMOVED***}
             data-point-label-format={***REMOVED***}
             data-show-no-data-legend-item={***REMOVED***}
             data-highlighted-loc-label-format={highlightedLocLabelFormat}
             data-enable-summary-view={***REMOVED***}
             data-map-type={mapType}
             data-default-point-color={***REMOVED***}
             data-aggregation-formula={***REMOVED***}
             data-zoom-level-to-show-points={zoomLevelToShowPoints}
             data-zoom-on-filter={zoomOnFilter}
             data-zoom-on-filter-field={***REMOVED***}>  
        </div>
    );
}


export default SaveComponent