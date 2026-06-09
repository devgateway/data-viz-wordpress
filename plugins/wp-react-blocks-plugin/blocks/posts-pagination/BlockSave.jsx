import React from 'react';

const BlockSave = (props) => {
    const {
        attributes: {
            group,
            numberOfItemsPerPage,
            wordpressSource,
            wordpressSourceType,
            pageLabel,
            ofLabel,
        }
    } = props;

    const divClass = {};
    const divStyles = {};


    return (
        <div
            className={"viz-component"}
            data-component={"postsPagination"}
            data-group={group}
            data-number-of-items-per-page={numberOfItemsPerPage}
            data-wordpress-source={wordpressSource}
            data-wordpress-source-type={wordpressSourceType}
            data-page-label={pageLabel}
            data-of-label={ofLabel}
        ></div>
    );
};

export default BlockSave;