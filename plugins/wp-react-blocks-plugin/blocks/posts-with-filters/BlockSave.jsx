import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/editor';

const BlockSave = (props) => {
  const {
    attributes: {
      className,
      height,
      showPagination,
      postsPerPage,
      showFilters,
      showDateFilter,
      showCategoryFilter,
      categories,
      categoryPlaceholder,
      showCountryFilter,
      countryCategory,
      countryPlaceholder,
    }
  } = props;
  const blockProps = useBlockProps.save({
    className: 'viz component posts-with-filters'
  });
  return (
    <div
      {...blockProps}
      className={"viz-component"}
      data-component={"postswithFilters"}
      data-height={height}
      data-show-pagination={showPagination}
      data-show-posts-per-page={postsPerPage}
      data-show-filters={showFilters}
      data-show-date-filter={showDateFilter}
      data-show-category-filter={showCategoryFilter}
      data-categories={encodeURIComponent(JSON.stringify(categories))}
      data-category-placeholder={categoryPlaceholder}
      data-show-country-filter={showCountryFilter}
      data-country-category={countryCategory}
      data-country-placeholder={countryPlaceholder}
    >
      <InnerBlocks.Content />
    </div>
  );
};

export default BlockSave;