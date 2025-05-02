import React from 'react';
import { WrappedComponentAttributes } from './types';

const SaveComponent = (props: { attributes: WrappedComponentAttributes }) => {
    const {
        attributes: {
            params, name, height
        },
    } = props;


    const divStyles = {}

    return (
        <div style={divStyles}>
            <div
                data-name={name}
                data-height={height}
                className={"viz-component"}
                data-params={encodeURIComponent(JSON.stringify(params))}
                data-component={"wrapped"}>
            </div>

        </div>


    );
}


export default SaveComponent