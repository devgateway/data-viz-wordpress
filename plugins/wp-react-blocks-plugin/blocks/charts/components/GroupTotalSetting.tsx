import React from 'react';
import { PanelBody, PanelRow, RangeControl, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Measure, Format } from "@devgateway/dvz-wp-commons";
import Papa, { ParseResult } from "papaparse";

interface GroupTotalSettingProps {
    setAttributes: (attributes: any) => void;
    allMeasures: Measure[];
    attributes: {
        app: string;
        csv: string;
        ***REMOVED***: string;
        ***REMOVED***: string;
        groupTotalLabelOffset: number;
        ***REMOVED***: string;
        groupTotalFixedPosition: boolean;
    }
}
const Settings = ({
    setAttributes, allMeasures,
    attributes: {
        app,
        csv,
        ***REMOVED***,
        ***REMOVED***,
        groupTotalLabelOffset,
        ***REMOVED***,
        groupTotalFixedPosition
    }
}: GroupTotalSettingProps) => {

    let data: ParseResult<unknown> | null = null
    if (app == "csv" && csv) {
        data = Papa.parse(csv, { header: true, dynamicTyping: true });
    }


    return <PanelBody initialOpen={false} title={__("Group Settings")}>

        <PanelRow>
            {(app !== "csv") &&
                <SelectControl
                    label={__('Measure')}
                    value={***REMOVED***}
                    onChange={(value) => {
                        setAttributes({ ***REMOVED***: value })
                    }}
                    options={allMeasures ? allMeasures.map(({ value, label }) => ({ label, value })) : []}
                />}
            {(app == "csv") &&
                <SelectControl
                    label={__('Measure')}
                    value={***REMOVED***}
                    onChange={(value) => {
                        setAttributes({ ***REMOVED***: value })
                    }}
                    options={data && data.meta.fields ? data.meta.fields.map((k) => ({ label: k, value: k })) : []}
                />}
        </PanelRow>
        <Format title={__("Group Total Format")}
            format={***REMOVED***}
            ***REMOVED***={***REMOVED*** => {

                setAttributes({ ***REMOVED*** })
            }}>
        </Format>
        <PanelRow>
            <ToggleControl label={__("Fixed")} checked={groupTotalFixedPosition}
                onChange={(groupTotalFixedPosition) => {
                    setAttributes({ groupTotalFixedPosition })
                }} />
        </PanelRow>
        <PanelRow>
            <RangeControl
                label={__('Offset')}
                value={groupTotalLabelOffset}
                onChange={(groupTotalLabelOffset) => setAttributes({ groupTotalLabelOffset })}
                allowReset
                ***REMOVED***={0}
                step={5}
                min={-250}
                max={250}
            />
        </PanelRow>
        <PanelRow>
            <TextControl value={***REMOVED***} label={__("Label")}
                onChange={(value) => setAttributes({ ***REMOVED***: value })} type="text" />
        </PanelRow>

    </PanelBody>
}

export default Settings