import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/editor';

const BlockSave = (props) => {
  const {
    attributes: {
      className,
      height,
      ***REMOVED***,
      postsPerPage,
      showFilters,
      ***REMOVED***,
      ***REMOVED***,
      categories,
      ***REMOVED***,
      ***REMOVED***,
      ***REMOVED***,
      ***REMOVED***,
    }
  } = props;
  const blockProps = useBlockProps.save({
    className: 'viz component posts-with-filters'
  });
  return (
    <div
      {...blockProps}
      className={"viz-component"}
      data-component={"***REMOVED***"}
      data-height={height}
      data-show-pagination={***REMOVED***}
      data-show-posts-per-page={postsPerPage}
      data-show-filters={showFilters}
      data-show-date-filter={***REMOVED***}
      data-show-category-filter={***REMOVED***}
      data-categories={***REMOVED***(JSON.stringify(categories))}
      data-category-placeholder={***REMOVED***}
      data-show-country-filter={***REMOVED***}
      data-country-category={***REMOVED***}
      data-country-placeholder={***REMOVED***}
    >
      <InnerBlocks.Content />
    </div>
  );
};

export default BlockSave;