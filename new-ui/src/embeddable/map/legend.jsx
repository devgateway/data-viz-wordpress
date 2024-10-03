import React from 'react';

const Legend = ({ 
  ***REMOVED***, 
  ***REMOVED***, 
  ***REMOVED***, 
  symbols, 
  ***REMOVED***,
  ***REMOVED***, 
  ***REMOVED***, 
  intl, 
  format,
  ***REMOVED***, 
  ***REMOVED***, 
  noDataText
}) => {
  const legendStyle = { fontSize: `${***REMOVED***}px`, fontWeight: ***REMOVED*** };

  const formatNumber = (value) => {
    return intl.formatNumber(format.style === 'percent' ? value / 100 : value, {
      style: format.style,
      notation: format.notation,
      maximumFractionDigits: format.maximumFractionDigits,
      ***REMOVED***: 0,
      currency: format.currency
    });
  };

  return (
    <div>
      <div className="legend">
        <ul>
          <li>
            <span className="legend-title">
              {***REMOVED*** && ***REMOVED***.length > 0 ? ***REMOVED*** : ""}
            </span>
            {***REMOVED***.length > 0 && <span className="vertical-spacer">|</span>}
          </li>
          
          {***REMOVED*** && ***REMOVED***.map((range, i) => (
            <li key={`lg${i}`}>
              <span className="symbol" style={{ ***REMOVED***: range.color }}></span>
              {***REMOVED*** && !***REMOVED*** && (
                <span className="legend-label" style={legendStyle}>{range.label}</span>
              )}
              {(!***REMOVED*** || ***REMOVED***) && range.min != null && range.max != null && (
                <span className="legend-label" style={legendStyle}>{formatNumber(range.min)} - {formatNumber(range.max)}</span>
              )}
              {(!***REMOVED*** || ***REMOVED***) && range.min == null && range.max != null && (
                <span className="legend-label" style={legendStyle}> &lt; {formatNumber(range.max)}</span>
              )}
              {(!***REMOVED*** || ***REMOVED***) && range.min != null && range.max == null && (
                <span className="legend-label" style={legendStyle}> &gt; {formatNumber(range.min)} </span>
              )}
            </li>
          ))}
          
          {***REMOVED*** && (
            <li>
              <span className="symbol" style={{ ***REMOVED***: ***REMOVED*** }}></span>
              <span className="legend-label" style={legendStyle}>{noDataText}</span>
            </li>
          )}
          
          {symbols && symbols.map((symbol, i) => (
            <li key={`k${i}`}>
              <span className="vertical-spacer">|</span>
              {symbol.image && (
                <img 
                  style={{width:"40px", height:"40px", marginTop:"-8px", marginRight:"-4px"}}
                  src={`/${symbol.image}`}
                  alt=""
                />
              )}
              <span className="legend-label" style={legendStyle}>{symbol.label || ""}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Legend;
