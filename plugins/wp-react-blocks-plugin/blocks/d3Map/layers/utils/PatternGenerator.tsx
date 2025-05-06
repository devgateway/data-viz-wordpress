import React from 'react';
import {__} from '@wordpress/i18n';
import CSVPatternGenerator from './CSVPatternGenerator';
import AppPatternGenerator from "./AppPatternGenerator";

interface PatternGeneratorProps {
    app: string;
    csv?: string;
    allCategories: any;
    allDimensions: any;
    onChangeProperty: (property: string, value: any) => void;
    patterns: any;
    patternDiscriminator: string;
    patternDiscriminatorLabel?: string;
    defaultFillColor: string;
}

const Patterns = (props: PatternGeneratorProps) => {
    const {app, csv} = props
    if (app === "csv" && csv !== undefined) {
        return <CSVPatternGenerator {...props} csv={csv} />
    } else {
        return <AppPatternGenerator {...props} patternDiscriminatorLabel={props.patternDiscriminatorLabel} />
    }
}


export default Patterns;