import {***REMOVED***} from 'redux-immutable';
import {wordpress} from "@devgateway/wp-react-lib"
import {reducers} from '../embeddable'
import { intlReducer } from '@/lib/react-intl-redux';


const ***REMOVED*** = () => ***REMOVED***({
    wordpress,
    ...reducers,
    intl: intlReducer
});

export default ***REMOVED***
