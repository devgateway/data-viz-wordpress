import React from 'react';
import { ***REMOVED*** } from './types';


const MapDataFrame: React.FC<***REMOVED***> = ({children, data, measures, ***REMOVED*** }) => {
    
    const ***REMOVED***: any  = {
        locationsData: [],
        nationalData: {},
        ***REMOVED***: {}
    }

    data.metadata.measures.forEach(m => {
        if (***REMOVED*** && ***REMOVED***[m.value] && ***REMOVED***[m.value].***REMOVED*** && ***REMOVED***[m.value].customLabel) {
            ***REMOVED***.***REMOVED***[m.value] = ***REMOVED***[m.value].customLabel;
        } else {

            ***REMOVED***.***REMOVED***[m.value] = m.label;
        }


    })

    const measuresArray = measures.split(",");
    if (data && data.children) {
        data.children.forEach(item => {
            measuresArray.forEach(measure => {
                const newItem = {
                    ...item,
                    label: item.value,
                    value: item[measure],
                    measure: measure

                }


                if (item.children) {
                    newItem.children = []
                    item.children.forEach(child => {
                        newItem.children.push({...child, label: child.value, value: child[measure]});
                    })
                }

                ***REMOVED***.locationsData.push(newItem);
            })
        })

        ***REMOVED***.measures = measuresArray.length > 1 ? measuresArray : null;
        ***REMOVED***.nationalData.value = data[measures];
    }

    return React.Children.map(children, child => {
        if (React.***REMOVED***(child)) {
            return React.cloneElement(child as React.ReactElement<{ ***REMOVED***?: any }>, { ***REMOVED***: ***REMOVED*** });
        }
        return child; // Return unchanged if not a valid React element
    });
}

export default MapDataFrame;