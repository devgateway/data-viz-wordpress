import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
    Button,
    PanelBody,
    PanelRow,
    SelectControl,
    ToggleControl,
} from "@wordpress/components";
import {Measures} from "./Measures";

const defaultFormat = {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    currency: "USD",
};

export const FilterSelector = ({ param, index, options, onUpdateFilterParam }) => {
    const sortedOptions = options.sort(function (a, b) {
        var aLabel = a.label ? a.label.toLowerCase() : "";
        var bLabel = b.label ? b.label.toLowerCase() : "";
        return aLabel < bLabel ? -1 : aLabel > bLabel ? 1 : 0;
    });

    return (
        <SelectControl
            onChange={(value) => {
                onUpdateFilterParam(value, index);
            }}
            value={param}
            options={sortedOptions}
        />
    );
};

export const CategoricalFilter = ({ value, index, items, onUpdateFilterValue }) => {
    if (items) {
        const sortedItems = items.sort(function (a, b) {
            if (a.position !== undefined && b.position !== undefined && a.position !== b.position) {
                return a.position - b.position;
            }

            let aValue = a.value ? a.value.toLowerCase() : "";
            let bValue = b.value ? b.value.toLowerCase() : "";
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        });
        return sortedItems.map((v) => (
            <PanelRow>
                {" "}
                <ToggleControl
                    label={v.value}
                    checked={value.indexOf(v.id) > -1}
                    onChange={(e) => {
                        onUpdateFilterValue(v.id, index);
                    }}
                />
            </PanelRow>
        ));
    } else {
        return null;
    }
};

/*let types = [
    {label: 'Bar', value: 'bar', supports: {singleMeasure: false, singleDimension: false}},
    {label: 'Pie', value: 'pie', supports: {singleMeasure: true, singleDimension: false}},
    {label: 'Line', value: 'line', supports: {singleMeasure: false, singleDimension: true}},
    {label: 'Map', value: 'map', supports: {singleMeasure: true, singleDimension: false}}]*/

const supportsMeasureSelectorInSingleMode = (type, dimension1, dimension2) =>
    ((type === "line" || type === "bar") && dimension2 !== "none") ||
    (type === "pie" && (dimension1 !== "none" || dimension2 !== "none"));

const isSingleMeasureMode = (type, dimension1, dimension2) =>
    type === "data-paragraph" ||
    supportsMeasureSelectorInSingleMode(type, dimension1, dimension2);

export class APIConfig extends Component {
    constructor(props) {
        super(props);

        this.onMeasuresChange = this.onMeasuresChange.bind(this);
        this.onSetSingleMeasure = this.onSetSingleMeasure.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.updateFilterParam = this.updateFilterParam.bind(this);
        this.updateFilterValue = this.updateFilterValue.bind(this);
        this.setFilterValue = this.setFilterValue.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.items = this.items.bind(this);

        this.onFormatChange = this.onFormatChange.bind(this);
        this.onCustomLabelToggleChange = this.onCustomLabelToggleChange.bind(this);
        this.onCustomLabelChange = this.onCustomLabelChange.bind(this);
        this.onUseCustomAxisFormatChange =
            this.onUseCustomAxisFormatChange.bind(this);
        //this.onCustomMeasureFieldChange = this.onCustomMeasureFieldChange.bind(this)

        this.state = {
            measures: [],
            dimensions: [],
            filters: [],
            categories: [],
        };
    }

    cleanSelection(prevState) {
        const { setAttributes } = this.props;
        setAttributes({ measures: [], filters: [] });
    }

    updateFilterParam(param, idx) {
        const {
            attributes: { filters },
            setAttributes,
            allFilters,
        } = this.props;
        const newFilters = filters.slice();
        const selected = allFilters.filter((f) => f.param === param)[0];
        newFilters[idx] = { ...selected, value: [] };
        setAttributes({ filters: newFilters });
    }

    updateFilterValue(value, idx) {
        const {
            attributes: { filters },
            setAttributes,
            allFilters,
        } = this.props;
        const selected = filters[idx];
        let values = selected.value;
        if (values.indexOf(value) > -1) {
            values = values.filter((v) => v != value);
        } else {
            values.push(value);
        }

        const newFilters = filters.slice();
        newFilters[idx].value = values;
        setAttributes({ filters: newFilters });
    }

    setFilterValue(value, idx) {
        const {
            attributes: { filters },
            setAttributes,
            allFilters,
        } = this.props;
        const selected = filters[idx];
        let values = selected.value;
        values = value.split(",");
        const newFilters = filters.slice();
        newFilters[idx].value = values;
        setAttributes({ filters: newFilters });
    }

    addFilter() {
        const {
            attributes: { filters },
            setAttributes,
            allFilters,
        } = this.props;
        let index =
            filters.length > allFilters.length ? allFilters.length : filters.length;
        const newFilter =
            allFilters && allFilters.length > 0
                ? {
                    ...allFilters[index],
                    value: [],
                }
                : null;
        let newFilters = filters.slice();
        newFilters.push(newFilter);
        setAttributes({ filters: newFilters });
    }

    removeFilter(f) {
        const {
            attributes: { filters },
            setAttributes,
            allFilters,
        } = this.props;
        let newFilters = filters.slice(0, -1);
        setAttributes({ filters: newFilters });
    }

    componentDidUpdate(prevProps) {
        const {
            setAttributes,
            allMeasures,
            attributes: {
                type,
                colorBy,
                dimension1,
                dimension2,
                types,
                measures,
                app,
                enableMeasureSelector,
            },
        } = this.props;
        const {
            attributes: {
                type: prevType,
                dimension1: prevDimension1,
                dimension2: prevDimension2,
                enableMeasureSelector: prevEnableMeasureSelector,
            },
        } = prevProps;
        const prevTypeObject =
            types.filter((t) => t.value === prevType).length > 0
                ? types.filter((t) => t.value === prevType)[0]
                : null;

        const singleMeasureModeChanged =
            type !== prevType ||
            dimension1 !== prevDimension1 ||
            dimension2 !== prevDimension2 ||
            enableMeasureSelector !== prevEnableMeasureSelector;

        if (singleMeasureModeChanged && measures?.[app] && allMeasures?.length > 0) {
            const selectorEnabledForCurrentMode =
                enableMeasureSelector === true &&
                supportsMeasureSelectorInSingleMode(type, dimension1, dimension2);

            const inSingleMeasureMode = isSingleMeasureMode(type, dimension1, dimension2);
            const nextMeasures = JSON.parse(JSON.stringify(measures));
            const appMeasures = nextMeasures[app] || {};
            const measureKeys = allMeasures.map((measure) => measure.value);
            const selectedMeasureKeys = measureKeys.filter(
                (key) => appMeasures[key]?.selected,
            );
            let changed = false;

            if (inSingleMeasureMode && !selectorEnabledForCurrentMode) {
                selectedMeasureKeys.forEach((key, index) => {
                    if (index === 0) {
                        if (appMeasures[key]?.selected !== true) {
                            appMeasures[key].selected = true;
                            changed = true;
                        }
                    } else if (appMeasures[key]) {
                        if (appMeasures[key].selected !== false) {
                            appMeasures[key].selected = false;
                            changed = true;
                        }
                        if (appMeasures[key].prevSelected !== true) {
                            appMeasures[key].prevSelected = true;
                            changed = true;
                        }
                    }
                });
            } else {
                measureKeys.forEach((key) => {
                    if (appMeasures[key]?.prevSelected) {
                        appMeasures[key].selected = true;
                        appMeasures[key].prevSelected = false;
                        changed = true;
                    }
                });
            }

            if (changed) {
                setAttributes({ measures: nextMeasures });
            }
        }
    }

    onSetSingleMeasure(value) {
        const {
            setAttributes,
            attributes: { app, measures },
        } = this.props;
        const uMs = Object.assign({}, measures);
        if (!uMs[app]) {
            uMs[app] = {};
        }

        Object.keys(uMs[app])
            .filter((k) => typeof uMs[app][k] !== "boolean")
            .forEach((k) => (uMs[app][k].selected = false)); //single selection all other should be unselected

        if (uMs[app][value]) {
            uMs[app][value].selected = uMs[app][value].selected ? false : true;
        } else {
            uMs[app][value] = { selected: true, format: uMs[app].format || defaultFormat };
        }
        setAttributes({ measures: uMs });
    }

    onFormatChange(format, field) {
        const {
            setAttributes,
            attributes: { app, measures },
        } = this.props;
        const uMs = Object.assign({}, { ...measures });
        if (!uMs[app]) {
            uMs[app] = {
                allowSelection: false,
                format: format,
                customFormat: format,
                selected: false,
            };
        }

        uMs[app][field] = format;
        setAttributes({ measures: uMs });
    }

    onUseCustomAxisFormatChange(value) {
        const {
            setAttributes,
            attributes: { app, measures },
        } = this.props;
        const uMs = Object.assign({}, { ...measures });
        if (uMs[app]) {
            uMs[app].useCustomAxisFormat = value;
            setAttributes({ measures: uMs });
        } else {
            uMs[app] = {
                allowSelection: false,
                format: defaultFormat,
                customFormat: defaultFormat,
                selected: false,
                useCustomAxisFormat: value,
            };
            setAttributes({ measures: uMs });
        }
    }
    /*
      onCustomMeasureFieldChange(measureName, field, value) {

          const {setAttributes, attributes: {measures}} = this.props
          const uMs = Object.assign({}, {...measures})

          if (uMs[measureName]) {
              uMs[measureName][field] = value
          } else {
              uMs[measureName] = {allowSelection: false, field: value, selected: false}
          }

          setAttributes({measures: uMs})
      }
      */
    onMeasuresChange(value) {
        const {
            setAttributes,
            attributes: { app, measures },
        } = this.props;
        const uMs = Object.assign({}, measures);
        if (!uMs[app]) {
            uMs[app] = {};
        }

        if (uMs[app][value]) {
            uMs[app][value].selected = uMs[app][value].selected ? false : true;
        } else {
            uMs[app][value] = { selected: true, format: uMs[app].format || defaultFormat };
        }

        setAttributes({ measures: uMs });
    }

    onCustomLabelToggleChange(value) {
        const {
            setAttributes,
            attributes: { app, measures },
        } = this.props;
        const uMs = Object.assign({}, measures);

        if (uMs[app] && uMs[app][value]) {
            uMs[app][value].hasCustomLabel = uMs[app][value].hasCustomLabel
                ? false
                : true;
            setAttributes({ measures: uMs });
        }
    }

    onCustomLabelChange(value, customLabel) {
        const {
            setAttributes,
            attributes: { app, measures },
        } = this.props;
        const uMs = Object.assign({}, measures);

        if (uMs[app] && uMs[app][value] && uMs[app][value].hasCustomLabel) {
            uMs[app][value].customLabel = customLabel;
            setAttributes({ measures: uMs });
        }
    }

    items(type) {
        const values = this.props.allCategories
            ? this.props.allCategories.filter((c) => c.type === type)
            : [];
        const cat = values.length > 0 ? values[0] : null;
        let items = null;
        if (type === "Boolean") {
            items = [
                { value: "Yes", id: true },
                { value: "No", id: false },
            ];
        } else if (cat) {
            items = cat.items;
        }
        return items;
    }

    render() {
        const {
            allDimensions,
            allFilters,
            allMeasures,
            setAttributes,
            attributes: { measures, filters, dimension1, dimension2, type, types },
        } = this.props;

        const currentType =
            types.filter((t) => t.value === type).length > 0
                ? types.filter((t) => t.value === type)[0]
                : null;

        return [
            <PanelBody
                initialOpen={false}
                title={__(type == "map" ? "Fields" : `Dimensions`)}
            >
                <PanelRow>
                    <SelectControl
                        label={__(type == "map" ? "Matching Field" : "First Dimension")}
                        value={[dimension1]} // e.g: value = [ 'a', 'c' ]
                        onChange={(value) => {
                            setAttributes({
                                dimension1: value,
                                dimension2: value == "none" ? "none" : dimension2,
                            });
                        }}
                        options={allDimensions}
                    />
                </PanelRow>
                {!['radar'].includes(type) && (
                    <PanelRow>
                        <SelectControl
                            label={__(type == "map" ? "Breakdown Field" : "Second Dimension")}
                            value={[dimension2]} // e.g: value = [ 'a', 'c' ]
                            onChange={(value) => {
                                setAttributes({ dimension2: value });
                            }}
                            options={allDimensions}
                            disabled={dimension1 == "none"}
                        />
                    </PanelRow>
                )}
            </PanelBody>,
            <Measures
                onFormatChange={this.onFormatChange}
                onUseCustomAxisFormatChange={this.onUseCustomAxisFormatChange}
                onSetSingleMeasure={this.onSetSingleMeasure}
                onMeasuresChange={this.onMeasuresChange}
                onCustomLabelToggleChange={this.onCustomLabelToggleChange}
                onCustomLabelChange={this.onCustomLabelChange}
                {...this.props}
                currentType={currentType}
            />,

            <>
                <PanelBody initialOpen={false} title={__("Filters")}>
                    {filters.map((f, index) => {
                        return (
                            <PanelBody initialOpen={true} title={__(`Filter - ${f.label}`)}>
                                <FilterSelector
                                    param={f.param}
                                    index={index}
                                    options={allFilters}
                                    onUpdateFilterParam={this.updateFilterParam}
                                />
                                {
                                    <CategoricalFilter
                                        value={f.value}
                                        index={index}
                                        items={this.items(f.type)}
                                        onUpdateFilterValue={this.updateFilterValue}
                                    />
                                }
                            </PanelBody>
                        );
                    })}

                    <PanelRow>
                        <Button variant={"link"} onClick={this.addFilter}>
                            {__("Add Filter")}
                        </Button>
                        <Button variant={"link"} onClick={this.removeFilter}>
                            {__("Remove")}
                        </Button>
                    </PanelRow>
                </PanelBody>
            </>,
        ];
    }
}

export default APIConfig;
