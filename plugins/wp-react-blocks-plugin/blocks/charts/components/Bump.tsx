import React from 'react';
import {PanelBody, PanelRow, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {ChartColors, ChartLegends} from '@devgateway/dvz-wp-commons';
import AxisConfig from '../config/AxisConfig';

interface ***REMOVED*** {
    setAttributes: (attributes: any) => void;
    attributes: any;
}
const BumpOptions = (props: ***REMOVED***) => {
    const {setAttributes, attributes: {groupMode, colorBy}} = props;
    return [

        <PanelBody initialOpen={false}   title={__("Bump Options")}>
            <ChartColors {...props}></ChartColors>
            <ChartLegends {...props}></ChartLegends>
            {colorBy === "id" && <AxisConfig {...props}></AxisConfig>}


        </PanelBody>

    ]
}

export default BumpOptions