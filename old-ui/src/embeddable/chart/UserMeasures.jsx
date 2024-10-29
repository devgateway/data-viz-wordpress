import React from "react";

const UserMeasures = ({options, multiMeasure, userMeasures, ***REMOVED*** = [], ***REMOVED***, ***REMOVED***}) => {


    console.log("multiMeasure:" + multiMeasure)
    return <div className={"measures"}>
        <div className="label-item"><label>View data by:</label></div>
        {***REMOVED*** && userMeasures.map(u => {

            if (multiMeasure) {
                return (<div onClick={e => ***REMOVED***(u)}>
                    <div className={`measure item  ${***REMOVED***.indexOf(u) > -1 ? 'active' : ''}`}>
                        {***REMOVED*** && ***REMOVED***[u] && ***REMOVED***[u].overrrideMeasureLabel ?
                            ***REMOVED***[u].overrrideMeasureLabel :
                            (options.metadata ? options.metadata.measures.filter(f => f.value == u)[0].label : '')}
                    </div></div>)
            } else {
                return (<div className={`item single-select`} onClick={e => ***REMOVED***(u)}>
                    <label>
                        <input checked={***REMOVED***.indexOf(u) > -1}
                            type="radio"
                            value={***REMOVED***[u].overrrideMeasureLabel} />
                    </label>
                    <label > {***REMOVED*** && ***REMOVED***[u] && ***REMOVED***[u].overrrideMeasureLabel ?
                        ***REMOVED***[u].overrrideMeasureLabel :
                        (options.metadata ? options.metadata.measures.filter(f => f.value == u)[0].label : '')}</label>
                </div>)
            }

        }
        )
        }
    </div>
}


export default UserMeasures