import {***REMOVED***} from 'redux-immutable';
import {wordpress} from "@devgateway/wp-react-lib"
import {reducers} from '../embeddable'
import { createReduxHistoryContext } from "redux-first-history";
import { ***REMOVED*** } from "history";
import { intlReducer } from '@/lib/react-intl-redux';

const {
    ***REMOVED***,
    ***REMOVED***,
    routerReducer
} =
    createReduxHistoryContext({
        history: ***REMOVED***(),
    })

const ***REMOVED*** = () => ***REMOVED***({
    router: routerReducer,
    wordpress,
    ...reducers,
    // intl: intlReducer
});

export { ***REMOVED***, ***REMOVED*** };
export default ***REMOVED***
