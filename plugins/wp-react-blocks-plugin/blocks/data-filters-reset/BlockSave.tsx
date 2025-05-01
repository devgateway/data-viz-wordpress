import React from 'react';
import { DataFiltersResetProps } from './types';

const SaveComponent = (props: DataFiltersResetProps) => {

    const {
        attributes: {
            group,
            app,
            resetLabel
        }
    } = props;

    return (
        <div className={"viz-component"}
            data-component={"dataFiltersReset"}
            data-group={group}
            data-app={app}
            data-reset-label={resetLabel}>
        </div>
    );
}


export default SaveComponent