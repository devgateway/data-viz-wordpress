import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Container, Icon } from "semantic-ui-react";
import { cleanFilter } from "../reducers/data";


const FiltersResetComponent = (props) => {
    const {
        ***REMOVED***,
        ***REMOVED***,
        "data-group": group,
        onClean,
        "data-app": app = "csv",
        "data-reset-label": resetLabel = "Reset All Filters"
    } = props


    const enabled = React.useMemo(() => {
        return Object.keys(***REMOVED***).some(k => {
            const initialValues = ***REMOVED***[k];
            const appliedValues = ***REMOVED***[k] || [];
            const ***REMOVED*** = appliedValues.filter(v => v !== Number.MIN_SAFE_INTEGER);

            if (***REMOVED***.length === 0) {
                return false;
            }

            // If initial value is MIN_SAFE_INTEGER and we have a single applied filter, enable reset
            if (initialValues.length === 1 && 
                initialValues[0] === Number.MIN_SAFE_INTEGER && 
                ***REMOVED***.length > 0) {
                return true;
            }
            
            // Check if arrays have different lengths or different values
            const res = initialValues.length !== ***REMOVED***.length && 
                !initialValues.every(v => ***REMOVED***.includes(v));
            console.log("res", res)
            return res;
        });
    }, [***REMOVED***, ***REMOVED***]);



    return (
        <Container fluid={true} className={`data-filters-reset ignore ${enabled ? '' : "disabled"}`} onClick={e => onClean({ app, group })}>
            <span>{resetLabel}</span>
            <span><Icon name="undo alternate" className="custom-undo-icon" /></span>
        </Container>
    );
};


const ***REMOVED*** = (state, ownProps) => {
    const {
        "data-group": group,
        "data-app": app = "csv",
    } = ownProps


    return {
        ***REMOVED***: state.getIn(['data', 'filters', app, group]) ? state.getIn(['data', 'filters', app, group]).toJS() : {},
        ***REMOVED***: state.getIn(['data', 'filters', 'initial', app, group]) ? state.getIn(['data', 'filters', 'initial', app, group]).toJS() : {},
    }
}
const ***REMOVED*** = {
    onClean: cleanFilter
};

export default connect(***REMOVED***, ***REMOVED***)(FiltersResetComponent)