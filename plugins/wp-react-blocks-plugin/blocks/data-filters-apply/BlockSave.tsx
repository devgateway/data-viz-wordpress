import { DataFiltersApplyProps } from './types';
import React from 'react';

const SaveComponent = (props: DataFiltersApplyProps) => {

    const {
        attributes: {
            group,
            app,
            label
        }
    } = props;


    return (
        <div className={"viz-component"}
            data-component={"***REMOVED***"}
            data-group={group}
            data-app={app}
            data-label={label}>
        </div>
    );
}



export default SaveComponent