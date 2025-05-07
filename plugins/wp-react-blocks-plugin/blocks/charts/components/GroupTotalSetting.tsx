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
        groupTotalFormat: string;
        groupTotalMeasure: string;
        groupTotalLabelOffset: number;
        groupTotalLabel: string;
        groupTotalFixedPosition: boolean;
    }
}
const Settings = ({
    setAttributes, allMeasures,
    attributes: {
        app,
        csv,
        groupTotalFormat,
        groupTotalMeasure,
        groupTotalLabelOffset,
        groupTotalLabel,
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
                    value={groupTotalMeasure}
                    onChange={(value) => {
                        setAttributes({ groupTotalMeasure: value })
                    }}
                    options={allMeasures ? allMeasures.map(({ value, label }) => ({ label, value })) : []}
                />}
            {(app == "csv") &&
                <SelectControl
                    label={__('Measure')}
                    value={groupTotalMeasure}
                    onChange={(value) => {
                        setAttributes({ groupTotalMeasure: value })
                    }}
                    options={data && data.meta.fields ? data.meta.fields.map((k) => ({ label: k, value: k })) : []}
                />}
        </PanelRow>
        <Format title={__("Group Total Format")}
            format={groupTotalFormat}
            onFormatChange={groupTotalFormat => {

                setAttributes({ groupTotalFormat })
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
                resetFallbackValue={0}
                step={5}
                min={-250}
                max={250}
            />
        </PanelRow>
        <PanelRow>
            <TextControl value={groupTotalLabel} label={__("Label")}
                onChange={(value) => setAttributes({ groupTotalLabel: value })} type="text" />
        </PanelRow>

    </PanelBody>
}

export default Settings