import React from 'react'

const BlockSave = (props) => {
    const {
        attributes: {
            group,
            resetLabel,
        }
    } = props;
    return (
        <div
            className={"viz-component"}
            data-component={"postsFiltersReset"}
            data-group={group}
            data-reset-label={resetLabel}
        ></div>
    )
}

export default BlockSave