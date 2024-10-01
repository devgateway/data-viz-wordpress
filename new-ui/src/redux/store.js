import {***REMOVED***, compose, createStore} from 'redux'
import {***REMOVED***, ***REMOVED***} from 'history'
import Immutable from 'immutable'
import ***REMOVED***, { ***REMOVED***, ***REMOVED*** } from "./reducer";
import { ***REMOVED*** } from '@reduxjs/toolkit';

const useHash = process.env.REACT_APP_USE_HASH_LINKS === true;
export const history = useHash? ***REMOVED***():***REMOVED***()

const initialState = Immutable.Map()

const ***REMOVED*** = () => {
    return ***REMOVED***()
}


export const store  = ***REMOVED***({
    reducer: ***REMOVED***(),
    initialState,
    ***REMOVED***: initialState,
    middleware: (***REMOVED***) => ***REMOVED***().concat(***REMOVED***)
});

export const reduxHistory = ***REMOVED***(store);
