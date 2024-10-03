import React from 'react';
import { ***REMOVED*** } from './types';


const ***REMOVED*** = (props: ***REMOVED***) => { 
    const {mapType} = props
    if (mapType == 'POINTS_MAP') {
        return pointsMap(props)
    } else {
        return defaultMap(props)
    }   
}
const pointsMap = (props) => {
    const { children, data, ***REMOVED***, ***REMOVED***} = props;

    const ***REMOVED***: any = {
        locationsData: [],
        nationalData: {},
        measures: [],
        ***REMOVED***: {}
    }

    const ***REMOVED*** = data.meta.fields.findIndex((f, i) => {
        return i > 2 && !f.startsWith('_');
    })

    const ***REMOVED***: any[] = []
    if (data && data.data && data.meta.fields && data.meta.fields.length >= 2) {

        /// create summary of data
        data.data.forEach(item => {
            const newItem : any = {
                label: item[data.meta.fields[0]],
                lat: item[data.meta.fields[1]],
                lng: item[data.meta.fields[2]],
                value: item[data.meta.fields[***REMOVED***]] || 1,
                measure: data.meta.fields[***REMOVED***]
            }

            const variables = {}
            if (***REMOVED*** && !***REMOVED***.measures.includes(data.meta.fields[***REMOVED***])) {
                ***REMOVED***.measures.push(data.meta.fields[***REMOVED***])
            }

            if (data.meta.fields.length > ***REMOVED***) {
                newItem.children = []
                for (let i = ***REMOVED*** + 1; i <= data.meta.fields.length; i++) {
                    const columnName = data.meta.fields[i]
                    const value = item[data.meta.fields[i]]
                    if (columnName) {
                        if (columnName.trim().startsWith("_")) {
                            variables[columnName] = value;
                        } else {
                            if (value != null) {
                                if (***REMOVED***) {
                                    const measureData: { label: any; value: any; measure: any; variables?: any } = { 
                                        label: item[data.meta.fields[0]], 
                                        value: value, 
                                        measure: data.meta.fields[i] 
                                    }
                                    measureData.variables = variables;
                                    ***REMOVED***.push(measureData);
                                    if (!***REMOVED***.measures.includes(data.meta.fields[i])) {
                                        ***REMOVED***.measures.push(data.meta.fields[i])
                                    }
                                } else {
                                    newItem.children.push({ label: data.meta.fields[i], value: value });
                                }
                            }
                        }
                    }
                }
            }

            newItem.variables = variables;
            ***REMOVED***.push(newItem);
        })

        //count, sum
        const summaryData: any[]= []
        ***REMOVED***.forEach(locData => {            
            let summaryItem = summaryData.find(s => s.label == locData.label)
            if (!summaryItem) {
                summaryItem = { label: locData.label, value: ***REMOVED*** == 'COUNT' ? 1 : (locData.value ? locData.value : 0) }
                summaryData.push(summaryItem)
            } else {
                if (***REMOVED*** == 'COUNT') {
                    ++summaryItem.value
                } else if (***REMOVED*** == 'SUM') {
                    summaryItem.value += locData.value
                }
            }
        })
        
        ***REMOVED***.pointsData = ***REMOVED***
        ***REMOVED***.locationsData = summaryData        
        ***REMOVED***.nationalData.value = 0;
    }

    return React.Children.map(children, child => React.cloneElement(child, { ***REMOVED***: ***REMOVED***, ***REMOVED***: data.***REMOVED*** }))
}

const defaultMap = (props) => {
    const { children, data, ***REMOVED*** } = props;

    const ***REMOVED*** : any = {
        locationsData: [],
        nationalData: {},
        measures: [],
        ***REMOVED***: {}
    }

    const ***REMOVED*** = data.meta.fields.findIndex((f, i) => {
        return i != 0 && !f.startsWith('_');
    })

    if (data && data.data && data.meta.fields && data.meta.fields.length >= 2) {
        data.data.forEach(item => {
            const newItem : any = {
                label: item[data.meta.fields[0]],
                value: item[data.meta.fields[***REMOVED***]],
                measure: data.meta.fields[***REMOVED***]
            }
            const variables = {}
            if (***REMOVED*** && !***REMOVED***.measures.includes(data.meta.fields[***REMOVED***])) {
                ***REMOVED***.measures.push(data.meta.fields[***REMOVED***])
            }

            if (data.meta.fields.length > ***REMOVED***) {                
                newItem.children = []
                for (let i = ***REMOVED*** + 1; i <= data.meta.fields.length; i++) {
                    const columnName = data.meta.fields[i]
                    const value = item[data.meta.fields[i]]
                    
                    if (columnName) {
                        if (columnName.trim().startsWith("_")) {
                            variables[columnName] = value;
                        } else {
                            //if (value != null) {
                                if (***REMOVED***) {
                                    const measureData: { label: any; value: any; measure: any; variables?: any } = { label: item[data.meta.fields[0]], value: value, measure: data.meta.fields[i] }
                                    measureData.variables = variables;
                                    ***REMOVED***.locationsData.push(measureData);
                                    if (!***REMOVED***.measures.includes(data.meta.fields[i])) {
                                        ***REMOVED***.measures.push(data.meta.fields[i])
                                    }
                                } else {
                                    newItem.children.push({ label: data.meta.fields[i], value: value });
                                }
                           // }
                        }
                    }
                }
            }

            newItem.variables = variables;
            ***REMOVED***.locationsData.push(newItem);
        })

        ***REMOVED***.nationalData.value = 0;
    }

    return React.Children.map(children, child => React.cloneElement(child, { ***REMOVED***: ***REMOVED***, ***REMOVED***: data.***REMOVED*** }))
}

export default ***REMOVED***;