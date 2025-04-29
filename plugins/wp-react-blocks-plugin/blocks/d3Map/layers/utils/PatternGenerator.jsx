import {
    ***REMOVED***, Button, PanelBody, PanelRow, RangeControl, SelectControl, TextControl
} from "@wordpress/components";
import {***REMOVED***} from "@wordpress/block-editor";
import {__} from '@wordpress/i18n';
import ***REMOVED*** from './***REMOVED***';
import ***REMOVED*** from "./***REMOVED***";
import Papa from 'papaparse'

const Patterns = (props) => {
    const {app} = props

    if (app == "csv") {
        return <***REMOVED*** {...props}/>
    } else {
        return <***REMOVED*** {...props}/>
    }
}


export default Patterns;