import Immutable, { Record } from 'immutable'
import ***REMOVED*** from "./reducer";
import { ***REMOVED***, ThunkAction, Action } from '@reduxjs/toolkit';

const initialState: Immutable.Map<string, any> = Immutable.Map()

const ***REMOVED*** = () => {
    return ***REMOVED***()
}


export const store  = ***REMOVED***({
    reducer: ***REMOVED***() ,
    ***REMOVED***: initialState,
    middleware: (***REMOVED***) => ***REMOVED***({
        ***REMOVED***: false,
        ***REMOVED***: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = Record<ReturnType<typeof store.getState>>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
