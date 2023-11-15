import React from "react";

import {measuresMap, typesMap, ***REMOVED***} from './Utils'

export const PieData = (props) => {
    const {children, data, measures, locale, customLabels} = props
    const ***REMOVED*** = new Set()
    const ***REMOVED*** = new Set()
    const mMap = measuresMap(data)

    const varValues = {}
    
    if (data && data.children) {
        const values = []
        const tMap = typesMap(data)
        const keys = []
        data.children.forEach(d => {
            if (d.children) {
                d.children.forEach(d1 => {
                    const row = new Object()
                    const variables = new Object()
                    variables[d.type] = ***REMOVED***(tMap[d.type].items.filter(i => i.value === d.value)[0], locale) || d.value
                    variables[d1.type] = ***REMOVED***(tMap[d1.type].items.filter(i => i.value === d1.value)[0], locale) || d1.value

                    Object.keys(d1).forEach(k => {
                        variables[k] = d1[k]
                    })
                    row.id = ***REMOVED***(tMap[d.type].items.filter(i => i.value === d.value)[0], locale) + ' - ' + ***REMOVED***(tMap[d1.type].items.filter(i => i.value === d1.value)[0], locale)  //Male /African ect (dimension value)
                    keys.push(d.value + ' - ' + d1.value)
                    row.value = d1[measures[0]]
                    row.label = ***REMOVED***(tMap[d.type].items.filter(i => i.value === d.value)[0], locale) + ' - ' + ***REMOVED***(tMap[d1.type].items.filter(i => i.value === d1.value)[0], locale)  //Male /African ect (dimension value)
                    row.variables = variables
                    values.push(row)
                })
            } else {
                const category = tMap[d.type].items.filter(i => i.value === d.value)[0]                
                const row = new Object()
                const variables = new Object()
                variables[d.type] = ***REMOVED***(category, locale) || d.value
                Object.keys(data).forEach(k => {
                    variables[k] = d[k]
                })

                ***REMOVED***.add(tMap[d.type])
                row.id = ***REMOVED***(category, locale) || d.value
                row.label = ***REMOVED***(category, locale) || d.value
                row.position = category.position || 0
                row.value = d[measures[0]]
                row.variables = variables
                values.push(row)
            }

        })

        const options = {
            indexBy: 'id',
            keys: [],
            ***REMOVED***,
            ***REMOVED***,
            data: values.sort((d1, d2) => d2.value - d1.value),
            metadata: data.metadata
        }
        return React.Children.map(children, child => React.cloneElement(child, {options}))
    } else {


        const ***REMOVED*** = data.metadata.measures.filter(m => measures.includes(m.value))
        const values = []

        const variables = {}
        Object.keys(data).forEach(k => {
            variables[k] = data[k]
        })
        

        ***REMOVED***.forEach(m => {            
            let row = {}            
            row.type = "measure"
            row["***REMOVED***"] = m.value
            row["id"] =  customLabels[m.value] || ***REMOVED***(mMap[m.value], locale)
            row["position"] = m.position
            row["label"] = customLabels[m.value] || ***REMOVED***(mMap[m.value], locale)
            row["value"] = data[m.value]
            row.variables = variables
            values.push(row)
        })
 
        const options = {
            indexBy: 'id',
            keys: [],
            ***REMOVED***,
            ***REMOVED***,
            data: values.sort((d1, d2) => d2.value - d1.value),
            metadata: data.metadata
        }


        //No dimensions selected
        return React.Children.map(children, child => React.cloneElement(child, {options}))
    }
}

export default PieData