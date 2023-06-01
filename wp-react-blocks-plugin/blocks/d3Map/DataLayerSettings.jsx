import {Component} from "@wordpress/element";
import {__} from '@wordpress/i18n';
import {
    Button,
    ***REMOVED***,
    PanelBody,
    PanelRow, RangeControl,
    SelectControl,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import Measures from './MapMeasures.jsx'
import Property from "./Property";

const ***REMOVED*** = ({param, index, options, ***REMOVED***}) => {
    const sortedOptions = options.sort(function (a, b) {
        var aLabel = a.label ? a.label.toLowerCase() : "";
        var bLabel = b.label ? b.label.toLowerCase() : "";
        return aLabel < bLabel ? -1 : aLabel > bLabel ? 1 : 0;
    });

    return <SelectControl onChange={(value) => {
        ***REMOVED***(value, index)
    }} value={param} options={sortedOptions}/>
}

const ***REMOVED*** = ({value, index, items, ***REMOVED***}) => {
    if (items) {
        const sortedItems = items.sort(function (a, b) {
            /*
                var aValue= a.value ? a.value.toLowerCase() : "";
                var bValue = b.value ? b.value.toLowerCase() : "";
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            */
            return a.position - b.position
        });
        return sortedItems.map(v => <PanelRow> <ToggleControl label={v.value} checked={value.indexOf(v.id) > -1}
                                                              onChange={e => {
                                                                  ***REMOVED***(v.id, index)
                                                              }}/></PanelRow>)
    } else {
        return null;
    }
}

export class ***REMOVED*** extends Component {
    constructor(props) {
        super(props);
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.addFilter = this.addFilter.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.removeFilter = this.removeFilter.bind(this)
        this.items = this.items.bind(this)

        this.state = {
            measures: [],
            dimensions: [],
            filters: [],
            categories: []
        }
    }

    ***REMOVED***(prevState) {

        const {***REMOVED***} = this.props
        ***REMOVED***("measures", [])
        ***REMOVED***("filters", [])

        //setAttributes({measures: [], filters: []})
    }

    ***REMOVED***(param, idx) {

        const {layer: {filters}, ***REMOVED***, allFilters} = this.props
        const newFilters = filters.slice()
        const selected = allFilters.filter(f => f.param === param)[0]
        newFilters[idx] = {...selected, value: []}
        // setAttributes({filters: newFilters})
        ***REMOVED***("filters", newFilters)


    }

    ***REMOVED***(value, idx) {

        const {layer: {filters}, ***REMOVED***} = this.props
        const selected = filters[idx]
        let values = selected.value
        if (values.indexOf(value) > -1) {
            values = values.filter(v => v != value)
        } else {
            values.push(value)
        }

        const newFilters = filters.slice()
        newFilters[idx].value = values
        // setAttributes({filters: newFilters})
        ***REMOVED***("filters", newFilters)
    }

    ***REMOVED***(value, idx) {

        const {layer: {filters}, ***REMOVED***} = this.props
        const selected = filters[idx]
        let values = selected.value
        values = value.split(",")
        const newFilters = filters.slice()
        newFilters[idx].value = values
        //setAttributes({filters: newFilters})
        ***REMOVED***("filters", newFilters)

    }

    addFilter() {

        const {layer: {filters}, ***REMOVED***, allFilters} = this.props
        let index = filters.length > allFilters.length ? allFilters.length : filters.length
        const newFilter = (allFilters && allFilters.length > 0) ? {
            ...allFilters[index],
            "value": []
        } : null
        let newFilters = filters.slice()
        newFilters.push(newFilter)
        //setAttributes({filters: newFilters})
        ***REMOVED***("filters", newFilters)
    }

    removeFilter(f) {

        const {layer: {filters}, ***REMOVED***, allFilters} = this.props
        let newFilters = filters.slice(0, -1)
        //setAttributes({filters: newFilters})
        ***REMOVED***("filters", newFilters)
    }


    ***REMOVED***(prevProps) {
        const {***REMOVED***, layer: {type, dimension2, types}} = this.props
        const {layer: {type: prevType, dimension2: ***REMOVED***}} = prevProps
    }


    ***REMOVED***(value) {

        const {***REMOVED***} = this.props
        //setAttributes({measures: [value]})
        ***REMOVED***("measures", [value])

    }

    ***REMOVED***(value) {

        const {***REMOVED***, attributes: {measures}} = this.props
        if (measures.indexOf(value) > -1) {
            //setAttributes({measures: measures.filter(d => d != value)})
            ***REMOVED***("measures", measures.filter(d => d != value))
        } else {
            //setAttributes({measures: [...measures, value]})
            ***REMOVED***("measures", [...measures, value])
        }
    }


    items(type) {

        const values = this.props.allCategories ? this.props.allCategories.filter(c => c.type === type) : []
        const cat = values.length > 0 ? values[0] : null
        let items = null
        if (type === 'Boolean') {
            items = [{"value": "Yes", id: true}, {"value": "No", id: false}]
        } else if (cat) {
            items = cat.items
        }
        return items

    }

    render() {
        const {
            ***REMOVED***,
            allDimensions,
            allFilters,
            allMeasures,
            features,
            layer: {
                measures,
                filters,
                ***REMOVED***,
                ***REMOVED***,
                type,
                ***REMOVED***,
                useShape,
                pointSize
            }
        } = this.props


        return (
            [
                <PanelBody title={"Join Attributes"}>
                    <Property property={"***REMOVED***"} type={"select"} ***REMOVED***={***REMOVED***}
                              features={features}
                              value={***REMOVED***}
                              title={"Shape Attribute"}>

                    </Property>
                    <PanelRow>
                        <SelectControl
                            label={'Api Attribute'}
                            value={[***REMOVED***]} // e.g: value = [ 'a', 'c' ]
                            onChange={(value) => {
                                debugger
                                ***REMOVED***("***REMOVED***", value)
                            }}
                            options={allDimensions}
                        />
                    </PanelRow>

                </PanelBody>
                ,
                <Measures
                    ***REMOVED***={this.***REMOVED***}
                    ***REMOVED***={this.***REMOVED***}
                    {...this.props} />
                ,

                <PanelBody initialOpen={false} title={__("Filters")}>
                    {filters.map((f, index) => {

                        return (
                            <PanelBody initialOpen={true} title={__(`Filter - ${f.label}`)}>
                                <***REMOVED*** param={f.param} index={index} options={allFilters}
                                                ***REMOVED***={this.***REMOVED***}/>
                                {<***REMOVED*** value={f.value} index={index} items={this.items(f.type)}
                                                    ***REMOVED***={this.***REMOVED***}/>}
                            </PanelBody>)
                    })}

                    <PanelRow>

                        <Button variant={"link"} onClick={this.addFilter}>{__("Add Filter")}</Button>
                        <Button variant={"link"} onClick={this.removeFilter}>{__("Remove")}</Button>
                    </PanelRow>
                </PanelBody>,
                <PanelBody title={"Data Render"}>
                    <PanelRow>
                        <ToggleControl
                            label="Centroid Point"
                            checked={***REMOVED***}
                            onChange={(value) => {
                                ***REMOVED***("***REMOVED***", value)
                            }}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Shape"
                            checked={useShape}
                            onChange={(value) => {
                                ***REMOVED***("useShape", value)
                            }}
                        />
                    </PanelRow>

                    <PanelRow>
                        <RangeControl
                            label="Point Size"
                            value={pointSize}
                            onChange={(value) => {
                                ***REMOVED***("pointSize", value)
                            }}
                            min={1}
                            max={10}
                        />
                    </PanelRow>

    </PanelBody>


    ]
    )
    }

}

export default ***REMOVED***;