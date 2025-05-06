import React from 'react';
import {PanelRow, RangeControl, TextControl, SelectControl, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';

interface SortProps {
    ***REMOVED***: () => void;
    setAttributes: (attributes: any) => void;
    options: {label: string; value: string}[];
    attributes: {
        app: string;
        sort: string;
        sortReverse: boolean;
    };
}

const Sort = (props: SortProps) => {
    const {
        ***REMOVED***,
        setAttributes,
        attributes: {app, sort, sortReverse}
    } = props;

    if (app != 'CSV') {
        return [<PanelRow>
            <SelectControl
                label={__('Sort Data: ', "dg")}
                value={sort}
                onChange={(sort) => {
                    setAttributes({sort})

                }}
                options={props.options || [{label: __('Default', "dg"), value: 'default'}, {
                    label: __('***REMOVED*** ', "dg"),
                    value: '***REMOVED***'

                }, 
                {label: __('By Date ', "dg"), value: 'date'},
                {label: __('Value ', "dg"), value: 'values'}]}
            />
        </PanelRow>,
            <PanelRow>
                <ToggleControl
                    label={__('Reverse Sort ', "dg")}
                    value={sortReverse as any}
                    onChange={(sortReverse) => {
                        setAttributes({sortReverse})

                    }}
                    checked={sortReverse}

                />
            </PanelRow>

        ]
    }
    return []
}

export default Sort


