import React from "react";
// TODO: TO BE REMOVED
import template from "string-template";



const ***REMOVED*** = /(\%)[\(]([A-z0-9,.]+)\)/gi
const ***REMOVED*** = /(\#)[\(]([A-z0-9,.]+)\)/gi
const ***REMOVED*** = /(\#C)[\(]([A-z0-9,.]+)\)/gi
const ***REMOVED*** = /(\$)[\(]([A-z0-9,.]+)\)/gi

const currencies = [
    {
        name: 'USD Dollar',
        code: 'USD',
        symbol: '$'
    },
    {
        name: 'Naira',
        code: 'NGN',
        symbol: '₦'
    },
    {
        name: 'South Africa Rand',
        code: 'ZAR',
        symbol: 'R'
    },
    {
        name: 'Ethiopian Birr',
        code: 'ETB',
        symbol: 'Br'
    },
    {
        name: 'Zambian Kwacha',
        code: 'ZMW',
        symbol: 'ZK'
    },
    {
        name: 'Kenyan Shilling',
        code: 'KES',
        symbol: 'KSh'
    }
]

const applyFormat = (expresion, str, style, isPercent, intl) => {
    let result;
    let str1 = str
    while ((result = expresion.exec(str)) !== null) {

        const arg = result[2]
        const format = (n, d = 2) => intl.formatNumber(isPercent ? n / 100 : n, {
            maximumFractionDigits: d,
            ...style,
        })
        
        const params = arg.split(",")
        const formatted = params.length > 0  && params[0] ? format.apply(this, params) : 'No Data';        
        str1 = str1.replaceAll(result[0], formatted)
    }
    
    return str1
}

const ***REMOVED*** = (expresion, str) => {
    let result
    let str1 = str
    while ((result = expresion.exec(str)) !== null) {
        if (result.length > 2) {
            const expression  = result[0]
            const ***REMOVED*** = result[2]                    
            const currency = currencies.find(c => processStringForComparison(c.code) == processStringForComparison(***REMOVED***) 
            || processStringForComparison(c.name) == processStringForComparison(***REMOVED***) 
            || processStringForComparison(c.symbol) == processStringForComparison(***REMOVED***))
            if (currency) {
                str1 = str1.replaceAll(expression, currency.symbol)
            }             
        }        
    }
    
    return str1
}

const processStringForComparison = (str) => {
    if (str) {
        return str.trim().toLowerCase();
    }

    return str;
}

export const formatContent = (tooltip, variables, intl) => {
    let str = template((tooltip), variables).replace(/(?:\r\n|\r|\n)/g, '<br>')
    str = applyFormat(***REMOVED***, str, {style: 'percent'}, true, intl)
    str = applyFormat(***REMOVED***, str, {style: 'decimal'}, false, intl)
    str = applyFormat(***REMOVED***, str, {notation: 'compact'}, false, intl)
    str = ***REMOVED***(***REMOVED***, str)

    return str
}


const MapTooltip = ({tooltip, variables, intl}) => {
    
    if (variables) {
        const str= formatContent(tooltip, variables, intl)
        return (
            <div className={"chart tooltip"} >
                <div dangerouslySetInnerHTML={{__html: str}}></div>
            </div>

        )
    } else {
        return <div></div>
    }
}

export default MapTooltip