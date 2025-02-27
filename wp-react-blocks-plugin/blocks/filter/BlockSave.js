const SaveComponent = (props) => {

    const {
        attributes: {
            placeHolder,
            type,
            param,
            app,
            icon,
            group,
            csvField,
            csvValue,
            isRange,
            allLabel,
            filters,
            noneLabel,
            startLabel,
            endLabel,
            ***REMOVED***,
            ***REMOVED***,
            filterType,
            defaultValues,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            hiddenFilters,
            ***REMOVED***,
            closeOnSelect,
            ***REMOVED***,
            ascOrder,
            ***REMOVED***,
            datasetId
        }
    } = props;

    const divClass = {}
    const divStyles = {}


    return (<div className={"viz-component"}
                 data-component={"filter"}
                 data-app={app}
                 data-dataset-id={datasetId}
                 data-icon={icon}
                 data-alphabetical-sort={***REMOVED***}
                 data-asc-order={ascOrder}
                 data-type={type}
                 data-group={group}
                 data-param={param}
                 data-csv-field={csvField}
                 data-csv-value={csvValue}
                 data-place-holder={placeHolder}
                 data-is-range={isRange}
                 data-all-label={allLabel}
                 data-none-label={noneLabel}
                 data-start-label={startLabel}
                 data-end-label={endLabel}
                 data-use-single-column={***REMOVED***}
                 data-enable-text-search={***REMOVED***}
                 data-filter-type={filterType}
                 data-default-values={defaultValues}
                 data-filters={***REMOVED***(JSON.stringify(filters))}
                 data-show-no-data-option={***REMOVED***}
                 data-default-value-criteria={***REMOVED***}
                 data-boolean-true-label={***REMOVED***}
                 data-boolean-false-label={***REMOVED***}
                 data-hidden-filters={***REMOVED***(JSON.stringify(hiddenFilters))}
                 data-close-on-select={closeOnSelect}
                 data-use-filter-items={***REMOVED***}
                 data-all-none-same-behaviour={***REMOVED***}>
                 data-all-none-same-behaviour={***REMOVED***}>
    </div>);
}


export default SaveComponent
