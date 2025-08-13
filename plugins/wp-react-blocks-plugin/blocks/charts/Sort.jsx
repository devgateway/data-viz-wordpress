import {PanelRow, RangeControl, TextControl, SelectControl, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import ***REMOVED*** from "../commons/APIutils";

const Sort = (props) => {
    const {
        setAttributes,
        allCategories,
        attributes: {
            sort,
            sortReverse,
            dimension1,
            dimension2,
            ***REMOVED***,
            sortReverseSecondDimension,
            type

        }
    } = props;


    //The following code will be used to sort stacked bar's slices https://devgateway.atlassian.net/browse/TCDIKE-767
    let ***REMOVED*** = []
    debugger;
    if (dimension2 && allCategories) {

        const target = allCategories.find(d => d.type == dimension2)

        if (target && target.items) {
            debugger;
            ***REMOVED*** = ***REMOVED***(target.items)
                .map(item => {
                    return ({label: "Value of " + item.label, value: item.value})
                })
        }


    }


    let ***REMOVED***;

    if (type == 'line') {
        ***REMOVED*** = [
            {label: __('Default', "dg"), value: 'default'},
            {label: __('***REMOVED*** ', "dg"), value: '***REMOVED***'},
            {label: __('By Date ', "dg"), value: 'date'}
        ];

    } else {
        ***REMOVED*** = [
            {label: __('Default', "dg"), value: 'default'},
            {label: __('***REMOVED*** ', "dg"), value: '***REMOVED***'},
            {label: __('By Date ', "dg"), value: 'date'},
            {label: __('Value (Group/Bar/Total)', "dg"), value: 'values'},
            ...***REMOVED***

        ];
    }


    if (dimension1 != 'none') {
        return (<>
            <PanelRow>
                <SelectControl
                    label={__('Group Sort: ', "dg")}
                    value={[sort]}
                    onChange={(sort) => {
                        setAttributes({sort})

                    }}
                    options={props.options || ***REMOVED***}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label={__('Reverse Sort ', "dg")}
                    value={[sortReverse]}
                    onChange={(sortReverse) => {
                        setAttributes({sortReverse})
                    }}
                    checked={sortReverse}
                />
            </PanelRow>
            {dimension2 != 'none' && <>
                <PanelRow>
                    <SelectControl
                        label={__('Bar/Slice Sort: ', "dg")}
                        value={[***REMOVED***]}
                        onChange={(***REMOVED***) => {
                            setAttributes({***REMOVED***})

                        }}
                        options={props.options ||
                            [{label: __('Default', "dg"), value: 'default'},
                                {label: __('***REMOVED*** ', "dg"), value: '***REMOVED***'},
                                {label: __('By Date ', "dg"), value: 'date'}

                            ]

                        }
                    />
                </PanelRow>
                <PanelRow>
                    <ToggleControl
                        label={__('Reverse Sort Second Dimension', "dg")}
                        value={[sortReverseSecondDimension]}
                        onChange={(sortReverseSecondDimension) => {
                            setAttributes({sortReverseSecondDimension})
                        }}
                        checked={sortReverseSecondDimension}
                    />
                </PanelRow>
            </>}
        </>)
    }
    return []
}

export default Sort


