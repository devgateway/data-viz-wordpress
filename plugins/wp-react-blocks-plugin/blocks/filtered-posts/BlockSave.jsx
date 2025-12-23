import React from 'react';

const BlockSave = (props) => {
    const {
        attributes: {
            group,
            numberOfColumns,
            type,
            taxonomy,
            categories,
            height,
            postWidth,
            postHeight,
            numberOfItemsPerPage,
            enableSorting,
            sortingTaxonomy,
            sortFirstBy,
        }
    } = props;
    return (
        <div
            className={"viz-component"}
            data-component={"filteredPosts"}
            data-group={group}
            data-type={type}
            data-number-of-columns={numberOfColumns}
            data-taxonomy={taxonomy}
            data-categories={encodeURIComponent(JSON.stringify(categories))}
            data-height={height}
            data-post-width={postWidth}
            data-post-height={postHeight}
            data-number-of-items-per-page={numberOfItemsPerPage}
            data-enable-sorting={enableSorting}
            data-sorting-taxonomy={sortingTaxonomy}
            data-sort-first-by={sortFirstBy}
        ></div>
    );
};

export default BlockSave;