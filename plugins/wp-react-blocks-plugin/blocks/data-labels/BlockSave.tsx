import React from 'react';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { ***REMOVED*** } from './types';

const SaveComponent = (props: { attributes: ***REMOVED*** }) => {
    const { attributes: {
        measures,
        height,
        dimension1,
        app,
        format,
        filters,
        group,
        valueType,
        noDataMsg
    }
    } = props;
    const blockProps = useBlockProps.save({
        className: 'data label'
    });

    const levels = [dimension1]
    const source = levels.filter(l => l != 'none' && l != null).join('/')

    return (
        <div
            {...blockProps}
            className={"viz-component"}
            data-component={"datalabel"}
            data-height={height}
            data-source={source}
            data-dimension1={dimension1}
            data-app={app}
            data-measures={***REMOVED***(JSON.stringify(measures))}
            data-format={***REMOVED***(JSON.stringify(format))}
            data-group={group}
            data-filters={***REMOVED***(JSON.stringify(filters))}
            data-no-data-message={noDataMsg}
            data-value-type={valueType}
        >

            <InnerBlocks.Content />
        </div>
    );
}

export default SaveComponent