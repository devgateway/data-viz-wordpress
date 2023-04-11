import React from 'react';



export default class Legend extends React.Component {
    constructor(props) {
        super(props)
    }

    formatNumber(value) {      
      const {intl, format} = this.props;
      return intl.formatNumber(format.style === 'percent' ? value / 100 : value, {
        style: format.style,
        notation: format.notation,
        maximumFractionDigits: format.maximumFractionDigits,
        ***REMOVED***: 0,
        currency: format.currency
      })
    }

    render() {
        const {***REMOVED***, ***REMOVED***, ***REMOVED***, symbols, ***REMOVED***,
           ***REMOVED***, ***REMOVED***, intl, numberFormat, ***REMOVED***, ***REMOVED***} = this.props;
        const legendStyle={fontSize: ***REMOVED*** + 'px', fontWeight: ***REMOVED***}        
        
        return (
            <div>
                 <div className="legend">
                     <ul>
                       <li>
                       <span className="legend-title">
                       {***REMOVED*** && ***REMOVED***.length > 0 ? ***REMOVED*** : ""}
                       </span>
                       {***REMOVED***.length > 0 &&
                       <span className="vertical-spacer">|</span>
                        }
                       </li>
                      
                    {***REMOVED*** && ***REMOVED***.map((range, i) => {
                       return (<li key={'lg' +i}>
                               <span className="symbol" style= {{***REMOVED***: range.color}}>
                               </span>
                               {***REMOVED*** && !***REMOVED*** &&
                                 <span className="legend-label" style={legendStyle}>{range.label}</span>
                               }
                               {(!***REMOVED*** || ***REMOVED***) && range.min != null && range.max != null &&
                                 <span className="legend-label" style={legendStyle}>{this.formatNumber(range.min)} - {this.formatNumber(range.max)}</span>
                               }

                              {(!***REMOVED*** || ***REMOVED***) && range.min == null && range.max != null &&
                                <span className="legend-label" style={legendStyle}> &lt; {this.formatNumber(range.max)}</span>
                               }

                               {(!***REMOVED*** || ***REMOVED***) && range.min != null && range.max == null &&
                                <span className="legend-label" style={legendStyle}> &gt; {this.formatNumber(range.min)} </span>                        
                               }

                           </li>)
                    })}
                    {***REMOVED*** &&
                    <li>
                    <span className="symbol" style= {{***REMOVED***: ***REMOVED***}}>
                               </span>
                    <span className="legend-label" style={legendStyle}>No Data</span>                        
                    </li>
                    }
                   {symbols && symbols.map((symbol,i) => {                     
                      return (<li key={'k'+i}>
                        <span className="vertical-spacer">|</span>  
                        {symbol.image &&
                        <img style={{width:"40px", height:"40px", marginTop:"-8px", marginRight:"-4px"}}src={"/" + symbol.image}></img>
                        }
                        <span className="legend-label" style={legendStyle}>{symbol.label ?  symbol.label : ""}</span></li>)          
                      })

                    }
                    </ul>
                    </div>
            </div>)
    }
}
