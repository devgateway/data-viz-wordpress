import React from 'react';

const MapDataFrame = ({ children, data, measures }) => {
    debugger;
    const ***REMOVED*** = {
        locationsData: [],
        nationalData: {},
        ***REMOVED***:{}
    }
    
    data.metadata.measures.forEach(m=> {
        ***REMOVED***.***REMOVED***[m.value] = m.label;
    })

    const measuresArray = measures.split(",");
    if (data && data.children) {        
        data.children.forEach(item => {
            measuresArray.forEach(measure => {
                const newItem = {
                    label: item.value,
                    value: item[measure],
                    measure: measure
                }
                if (item.children) {
                    newItem.children = []
                    item.children.forEach(child => {
                        newItem.children.push({ label: child.value, value: child[measure] });
                    })
                }
    
                ***REMOVED***.locationsData.push(newItem);
            })           
        })

        ***REMOVED***.measures = measuresArray.length > 1 ? measuresArray : null;
        ***REMOVED***.nationalData.value = data[measures];       
    }
    
    return React.Children.map(children, child => React.cloneElement(child, { ***REMOVED***: ***REMOVED*** }))
}

export default MapDataFrame;