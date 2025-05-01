import React from 'react';
import { ***REMOVED*** } from './types';

const SaveComponent = (props: { attributes: ***REMOVED*** }) => {

    const {
        attributes: {
            ***REMOVED***,
            group,
            label,
            app,
        }
    } = props;


    return (
        <div className={"viz-component"}
            data-component={"measures"}
            data-app={app}
            data-label={label}
            data-group={group}
            data-measures-groups={***REMOVED***(JSON.stringify(***REMOVED***))}>
        </div>
    );
}


export default SaveComponent