import {***REMOVED***} from 'redux-immutable';
import {connectRouter} from 'connected-react-router/immutable'
import {intlReducer} from 'react-intl-redux'
import {wordpress} from "@devgateway/wp-react-lib"
import {reducers} from '../embeddable'

const ***REMOVED*** = (history) => ***REMOVED***({
    router: connectRouter(history),
    wordpress,
    ...reducers,
    intl: intlReducer
})


export default ***REMOVED***
