import React from 'react';

const BlockSave = (props) => {
    const {
        attributes: {
            group,
            numberOfItemsPerPage
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
        ></div>
    );
};

export default BlockSave;