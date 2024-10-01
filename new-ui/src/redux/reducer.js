import {***REMOVED***} from 'redux-immutable';
// import {connectRouter} from 'connected-react-router/immutable'
// import {intlReducer} from 'react-intl-redux'
import {wordpress} from "@devgateway/wp-react-lib"
// import {reducers} from '../embeddable/'
import { createReduxHistoryContext } from "redux-first-history";
import { ***REMOVED*** } from "history";

const {
    ***REMOVED***,
    createReduxHistoryEnhancer,
    ***REMOVED***,
    routerReducer
} =
    createReduxHistoryContext({
        history: ***REMOVED***(),
    })

const ***REMOVED*** = () => ***REMOVED***({
    router: routerReducer,
    wordpress,
    // intl: intlReducer
});

export { ***REMOVED***, createReduxHistoryEnhancer, ***REMOVED*** };
export default ***REMOVED***
