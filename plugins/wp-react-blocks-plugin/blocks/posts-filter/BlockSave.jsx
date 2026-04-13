import React from 'react';

const SaveComponent = (props) => {
    const {
        attributes: {
            group,
            placeholder,
            allLabel,
            alphabeticalSort,
            ascOrder,
            noneLabel,
            useSingleColumn,
            enableTextSearch,
            allNoneSameBehaviour,
            autoApply,
            closeOnSelect,
            filterType,
            showNoDataOption,
            taxonomy,
            categories,
            isCountryFilter,
            isYearFilter,
            selectedYear,
            type,
            defaultValues,
            wordpressSource,
            wordpressSourceType,
        }
    } = props;

    const divClass = {};
    const divStyles = {};


    return (
        <div className={"viz-component"}
            data-component={"postsFilter"}
            data-alphabetical-sort={alphabeticalSort}
            data-asc-order={ascOrder}
            data-group={group}
            data-placeholder={placeholder}
            data-all-label={allLabel}
            data-none-label={noneLabel}
            data-use-single-column={useSingleColumn}
            data-enable-text-search={enableTextSearch}
            data-filter-type={filterType}
            data-show-no-data-option={showNoDataOption}
            data-close-on-select={closeOnSelect}
            data-all-none-same-behaviour={allNoneSameBehaviour}
            data-auto-apply={autoApply}
            data-taxonomy={taxonomy}
            data-categories={categories.toString()}
            data-is-country-filter={isCountryFilter}
            data-is-year-filter={isYearFilter}
            data-selected-year={selectedYear}
            data-type={type}
            data-default-values={encodeURIComponent(JSON.stringify(defaultValues))}
            data-wordpress-source={wordpressSource}
            data-wordpress-source-type={wordpressSourceType}>
        </div>
    );
};


export default SaveComponent;
