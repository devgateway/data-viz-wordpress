import React from 'react';
import {__} from '@wordpress/i18n';
import ***REMOVED*** from './***REMOVED***';
import ***REMOVED*** from "./***REMOVED***";

interface PatternGeneratorProps {
    app: string;
    csv?: string;
    allCategories: any;
    allDimensions: any;
    ***REMOVED***: (property: string, value: any) => void;
    patterns: any;
    ***REMOVED***: string;
    patternDiscriminatorLabel?: string;
    ***REMOVED***: string;
}

const Patterns = (props: PatternGeneratorProps) => {
    const {app, csv} = props
    if (app === "csv" && csv !== undefined) {
        return <***REMOVED*** {...props} csv={csv} />
    } else {
        return <***REMOVED*** {...props} patternDiscriminatorLabel={props.patternDiscriminatorLabel} />
    }
}


export default Patterns;