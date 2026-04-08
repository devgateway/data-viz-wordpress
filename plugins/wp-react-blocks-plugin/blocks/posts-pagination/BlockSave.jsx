import React from 'react';

const BlockSave = (props) => {
    const {
        attributes: {
            group,
            numberOfItemsPerPage,
            wordpressSource,
            wordpressSourceType,
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
        ></div>
    );
};

export default BlockSave;