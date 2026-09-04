import React, { useState } from "react";
import { ComboboxControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export const DatasetSelector = (props) => {
    const {
        setAttributes,
        setState,
        loadMetadata,
        dvzProxyDatasetId,
        app,
        datasets
    } = props;
    const [ filterValue, setFilterValue ] = useState("");
    const selectedDataset = (datasets || []).find(dataset =>
        dataset.value.toString() === dvzProxyDatasetId?.toString()
    );
    const filteredOptions = (datasets || []).filter(dataset => {
        const searchValue = filterValue.toLowerCase();
        return dataset.label.toLowerCase().includes(searchValue) ||
            dataset.value.toString().toLowerCase().includes(searchValue);
    });

    return (
        <div style={{
            maxWidth: "100%",
            minWidth: 0,
            overflowWrap: "anywhere",
            width: "100%",
        }}>
            <ComboboxControl
                label={__("Datasets")}
                value={selectedDataset?.value || dvzProxyDatasetId || ""}
                style={{
                    maxWidth: "100%",
                    minWidth: 0,
                    overflowWrap: "anywhere",
                    width: "100%",
                }}
                onChange={(newDatasetId) => {
                    setAttributes({
                        dvzProxyDatasetId: newDatasetId,
                        dimension1: "none",
                        dimension2: "none",
                        dimension3: "none",
                        measures: [],
                    });
                    setState({
                        dimensions: [],
                        measures: [],
                        filters: [],
                        categories: [],
                    });
                    loadMetadata(app, newDatasetId);
                }}
                options={filteredOptions}
                onFilterValueChange={inputValue => {
                    setFilterValue(inputValue || "");
                }}
                help={__('Select the dataset from the API.')}
            />
        </div>
    )
}