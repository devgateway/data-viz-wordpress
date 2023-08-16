import React from "react";
import {***REMOVED***, measuresMap, typesMap} from "./Utils";


const getOptionsNoDimension = (props) => {
    const {data, measures, swap, dimensions, locale, customLabels} = props
    let options = {}
    const ***REMOVED*** = dimensions.filter(f => f != '')
    const ***REMOVED*** = new Set()
    if (***REMOVED***.length == 0 && data) {
        const mMap = measuresMap(data)
        const categories = new Set()
        let keys = new Set()
        let series = []
        let indexBy
        if (data.metadata && data.metadata.measures) {
            const ***REMOVED*** = data.metadata.measures.filter(m => measures.includes(m.value)).sort((aMeasure, bMeasure) => {
                if (aMeasure.position != null && bMeasure.position != null && aMeasure.position != bMeasure.position) {
                   return aMeasure.position - bMeasure.position
                }   
                   
                return 0
            })
            series = []
            indexBy = "measure"
            categories.add("measure")

            const variables = {}
            Object.keys(data).forEach(k => {
                variables[k] = data[k]
            })

            ***REMOVED***.forEach(m => {
                let row = {}
                const label = customLabels[m.value] || ***REMOVED***(mMap[m.value], locale)
                row.type = "measure"
                row["***REMOVED***"] = m.value
                row["measure"] = label
                row[label] = data[m.value]
                row.variables = variables
                series.push(row)
                keys.add(label)
                ***REMOVED***.add(mMap[m.value])
            })

            options = {
                categories,
                indexBy,
                keys: Array.from(keys),
                ***REMOVED***,
                data: series
            }
        }
    }

    return options;
}
const ***REMOVED*** = (props) => {
    const {data, measures, dimensions, overallLabel} = props
    if (dimensions.length == 1 && data.children) {
        let overallAdded = data.children.filter(c => c.value == overallLabel).length > 0
        if (!overallAdded) {
            const overallData = {}
            overallData.type = dimensions[0];
            overallData.value = overallLabel;
            overallData.label = overallLabel;
            Object.keys(data).forEach(k => {
                if (!["children", "metadata", "type", "value"].includes(k)) {
                    overallData[k] = data[k];
                }
            })

            data.children = [overallData, ...data.children]
        }
    } else if (dimensions.length == 2 && data.children) {
        data.children.forEach(d => {
            let overallAdded = d.children.filter(c => c.value == overallLabel).length > 0
            if (!overallAdded) {
                const overallData = {}
                overallData.type = dimensions[1];
                overallData.value = overallLabel;
                overallData.label = overallLabel;

                Object.keys(d).forEach(k => {
                    if (!["children", "metadata", "type", "value"].includes(k)) {
                        overallData[k] = d[k];
                    }
                })

                d.children = [overallData, ...d.children]
            }
        })
    }

    return data;
}

const ***REMOVED*** = (props) => {
    let options = {}
    const {data, measures, swap, dimensions, ***REMOVED***, locale, customLabels, colorBy, hiddenBars} = props   
    const ***REMOVED*** = dimensions.filter(f => f != '')
    const ***REMOVED*** = data.metadata.measures.filter(m => measures.includes(m.value)).sort((aMeasure, bMeasure) => {
        if (aMeasure.position != null && bMeasure.position != null && aMeasure.position != bMeasure.position) {
           return aMeasure.position - bMeasure.position
        }   
           
        return 0
    })

    if (***REMOVED*** && measures.length == 1) {
        ***REMOVED***(props)
    }
    if (***REMOVED***.length == 0 && data) {
        options = getOptionsNoDimension(props);
    } else if (data && data.children && ***REMOVED***.length > 0) {
        const mMap = measuresMap(data)
        const tMap = typesMap(data)
        const ***REMOVED*** = new Set()
        const ***REMOVED*** = new Set()
        let keys = new Set()
        let series = []
        let indexBy

        if (swap && (***REMOVED***.length == 1 && measures.length > 0)) {            
            indexBy = 'measure'
            ***REMOVED***.forEach(measure => {  
                const row = {}                
                row["measure"] = customLabels[measure.value] || ***REMOVED***(mMap[measure.value], locale)// measureLabel(mMap, m)
                ***REMOVED***.add(mMap[measure.value])
                data.children.forEach(d => {
                    const value = ***REMOVED***(tMap[d.type].items.filter(i => i.value === d.value)[0], locale) || d.value
                    const variables = {}
                    Object.keys(d).forEach(k => {
                        variables[k] = d[k]
                    })
                    variables[d.type] = d.value.toString()
                    row['variables'] = variables
                    ***REMOVED***.add(tMap[d.type])
                    row[value] = d[measure.value]
                    keys.add(value)
                })

                series.push({...row})
            })

        } else {

            indexBy = data.children[0].type
            let total = 0;          
            data.children.forEach(d => {
                const variables = {}
                const row = {}
                row[d.type] =  ***REMOVED***(tMap[d.type] && tMap[d.type].items ? tMap[d.type].items.filter(i => i.value === d.value)[0] : d.value, locale) || d.value
                Object.keys(d).forEach(k => {
                    variables[k] = d[k]
                })

                ***REMOVED***.add(tMap[d.type])
                variables[d.type] = d.value.toString()
                ***REMOVED***.map(m => {                     
                    const label = customLabels[m.value] || ***REMOVED***(mMap[m.value], locale)
                    row[label] = d[m.value];
                    ***REMOVED***.add(mMap[m.value])
                    keys.add(label)
                })

                series.push({...row, variables, parent_variables: variables})
            })


        }

         options = {
            metadata: data.metadata,
            indexBy,
            ***REMOVED***,
            ***REMOVED***,
            keys: Array.from(keys),
            data: hiddenBars && series ? series.filter(s => hiddenBars.indexOf(s[indexBy]) == -1) : series//series
        }

    }


    return React.Children.map(props.children, child => React.cloneElement(child, {options}))

}
const ***REMOVED*** = (props) => {
    const {data, measures, ***REMOVED***, dimensions, hiddenBars, colorBy, locale, customLabels} = props
    const ***REMOVED*** = dimensions.filter(f => f != '')
    let options = {}
    if (***REMOVED***) {
        ***REMOVED***(props)
    }

    if (***REMOVED***.length == 0 && data) {
        options = getOptionsNoDimension(props);
    } else if (data && data.children && ***REMOVED***.length > 0) {
        const mMap = measuresMap(data)
        const tMap = typesMap(data)
        const field = measures[0];
        const ***REMOVED*** = new Set()
        // const ***REMOVED*** = new Set()
        let keys = new Set()
        const series = []
        const vals = []
        const indexBy = data.children[0].type
        let total = 0;
        let variables
        let parentValue;
        data.children.forEach(d => {
            const row = {variables: {}}
            parentValue = ***REMOVED***(tMap[d.type] && tMap[d.type].items ? tMap[d.type].items.filter(i => i.value === d.value)[0] : d.value, locale) || d.value
            row[d.type] = parentValue
            row[parentValue] = d[field];
            variables = new Object()
            //variables[d.type] = d.value
            variables[d.type] = parentValue
            row.parent_variables = variables

            Object.keys(d).forEach(k => {
                variables[k] = d[k]
            })

            ***REMOVED***.add(tMap[d.type])
            // ***REMOVED***.add(mMap[field])

            if (!d.children) {
                keys.add(parentValue)
            }
            if (d.children) { //level 2
                d.children.forEach(d1 => {


                    variables = new Object()
                    ***REMOVED***.add(tMap[d1.type])

                    const value = ***REMOVED***(tMap[d1.type] && tMap[d1.type].items ? tMap[d1.type].items.filter(i => i.value === d1.value)[0] : d1.value, locale) || d1.value

                    variables[d.type] = parentValue
                    variables[d1.type] = value
                    Object.keys(d1).forEach(k => {
                        variables[k] = d1[k]
                    })
                    row.variables[value] = variables
                    keys.add(value)
                    total += d1[field]
                    vals.push(d1[field])
                    row[value] = d1[field]
                })
            } else {
                const variables = new Object()
                variables[d.type] = parentValue
                ***REMOVED***.add(tMap[d.type])
                Object.keys(data).forEach(k => {
                    variables[k] = d[k]
                })
                row.variables = variables
            }
            series.push(row)
        })


        options = {
            metadata: data.metadata,
            ***REMOVED***,

            indexBy,
            keys: (colorBy == "index") ? Array.from(keys) : Array.from(keys).filter(k => hiddenBars.indexOf(k) == -1),
            data: (colorBy == "id") ? series : series.filter(s => hiddenBars.indexOf(s[indexBy]) == -1)
        }
    }


    return <>
        {React.Children.map(props.children, child => React.cloneElement(child, {options}))}</>
}

const BarData = (props) => {
    const {data, measures, dimensions} = props
   const copyData = JSON.parse(JSON.stringify(data))
    if (dimensions.length === 1) {
        return <***REMOVED*** {...props} data={copyData}></***REMOVED***>
    } else {
        return <***REMOVED*** {...props} data={copyData}></***REMOVED***>
    }
}


export default BarData