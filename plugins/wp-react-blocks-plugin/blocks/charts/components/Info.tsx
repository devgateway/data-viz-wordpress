import React from 'react';
import {AnglePickerControl, PanelBody, PanelRow, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import { Format, ChartColors, ChartLegends } from "@dg-data-viz/wp-commons";

interface InfoProps {
    setAttributes: (attributes: any) => void;
    attributes: {
        figure: string
        app: string
    };
}

const Info = (props: InfoProps) => {
    const {setAttributes, attributes: {figure}} = props;
    return [<PanelBody initialOpen={false}   title={__("Inf Graphic Options")}>

        <PanelRow>
            <SelectControl
                label={__('Figure')}
                value={figure as "male" | "female"}
                onChange={(value) => {
                    setAttributes({figure: value})
                }}
                options={[
                    {label: 'Male', value: 'male'},
                    {label: 'Female', value: 'female'},
                ]}
            />
        </PanelRow>

        <ChartColors {...props as any}></ChartColors>

        <Format {...props as any}></Format>
    </PanelBody>]
}

export default Info;