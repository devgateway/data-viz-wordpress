import {***REMOVED***, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {***REMOVED***, ***REMOVED***} from 'history'
import {***REMOVED***} from 'connected-react-router/immutable'
import Immutable from 'immutable'
import ***REMOVED*** from "./reducer";

const useHash = process.env.REACT_APP_USE_HASH_LINKS.toLowerCase() === "true"
export const history = useHash? ***REMOVED***():***REMOVED***()


const initialState = Immutable.Map()

let reducer = null;
let store = null

const ***REMOVED*** = () => {
    if (!reducer) {
        reducer = ***REMOVED***(history)
    }
    return reducer
}


export default function getStore() {

    if (!store) {

        store = createStore(
            ***REMOVED***(), // root reducer with router state
            initialState,
            compose(
                ***REMOVED***(
                    ***REMOVED***(history), thunk // for dispatching history actions
                    // ... other middlewares ...
                )
            )
        )
    }

    return store
}
