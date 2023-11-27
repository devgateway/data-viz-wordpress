import {Component} from "@wordpress/element";
import {__} from '@wordpress/i18n';
import {Button, PanelBody, PanelRow, SelectControl, ToggleControl} from '@wordpress/components';
import ChartMeasures from './ChartMeasures.jsx'
import DataFilters from "./DataFilters";

const defaultFormat = {
    "style": "percent",
    "minimumFractionDigits": 1,
    "maximumFractionDigits": 1,
    "currency": "USD"
}


/*let types = [
    {label: 'Bar', value: 'bar', supports: {singleMeasure: false, ***REMOVED***: false}},
    {label: 'Pie', value: 'pie', supports: {singleMeasure: true, ***REMOVED***: false}},
    {label: 'Line', value: 'line', supports: {singleMeasure: false, ***REMOVED***: true}},
    {label: 'Map', value: 'map', supports: {singleMeasure: true, ***REMOVED***: false}}]*/

export class APIConfig extends Component {
    constructor(props) {
        super(props);

        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)

        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.onCustomLabelToggleChange = this.onCustomLabelToggleChange.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.onUseCustomAxisFormatChange = this.onUseCustomAxisFormatChange.bind(this)
        //this.onCustomMeasureFieldChange = this.onCustomMeasureFieldChange.bind(this)

        this.state = {
            measures: [],
            dimensions: [],
            filters: [],
            categories: []
        }
    }

    ***REMOVED***(prevState) {

        const {setAttributes} = this.props
        setAttributes({measures: [], filters: []})
    }


    ***REMOVED***(prevProps) {

        const {setAttributes, attributes: {type, dimension2, types, measures, app}} = this.props
        const {attributes: {type: prevType, dimension2: ***REMOVED***}} = prevProps
        const ***REMOVED*** = types.filter(t => t.value === prevType).length > 0 ? types.filter(t => t.value === prevType)[0] : null


        if (type != prevType) {
        }

        if (dimension2 != ***REMOVED***) {

            //TODO ensure only one measure remains selected when selecting a second dimensions
            const uMs = Object.assign({}, measures)
            if (dimension2 != 'none') {

                let i = 0; //the idea is to keep one selected
                if (uMs[app]) {
                    const selected = Object.keys(uMs[app]).map(k => uMs[app][k].selected).length
                    if (selected > 1) {
                        Object.keys(uMs[app]).forEach(k => {

                            if (uMs[app][k].selected) {
                                uMs[app][k].prevSelected = true  //can be used to recover measures
                                uMs[app][k].selected = i > 0 ? false : true
                            } else {
                                uMs[app][k].prevSelected = false
                            }

                            i++
                        })
                    }

                }

                setAttributes({measures: uMs})
            }
            if (dimension2 == 'none' && uMs[app]) {
                Object.keys(uMs[app]).forEach(k => {
                    if (uMs[app][k].prevSelected) {
                        uMs[app][k].selected = true  //can be used to recover measures
                        uMs[app][k].prevSelected = false
                    }
                })
                setAttributes({measures: uMs})
            }
        }

    }


    ***REMOVED***(value) {

        const {setAttributes, attributes: {app, measures}} = this.props
        const uMs = Object.assign({}, measures)
        if (!uMs[app]) {
            uMs[app] = {}
        }

        Object.keys(uMs[app]).forEach(k => uMs[app][k].selected = false) //single selection all other should be unselected

        if (uMs[app][value]) {
            uMs[app][value].selected = uMs[app][value].selected ? false : true
        } else {
            uMs[app][value] = {selected: true, format: defaultFormat}
        }
        setAttributes({measures: uMs})        
    }


    ***REMOVED***(format, field) {        
        const {setAttributes, attributes: {app, measures}} = this.props
        const uMs = Object.assign({}, {...measures})
        if (!uMs[app]) {            
            uMs[app] = {***REMOVED***: false, format: format, customFormat: format, selected: false}
        }

        uMs[app][field] = format
        setAttributes({measures: uMs})
    }

    onUseCustomAxisFormatChange(value) {        
        const {setAttributes, attributes: {app, measures}} = this.props
        const uMs = Object.assign({}, {...measures})
        if (uMs[app]) {
            uMs[app].***REMOVED*** = value
            setAttributes({ measures: uMs })
        }  else {
            uMs[app] = {***REMOVED***: false, format: defaultFormat, customFormat: defaultFormat, selected: false, ***REMOVED***: value}
            setAttributes({ measures: uMs })
        }
    }
    /*
    onCustomMeasureFieldChange(measureName, field, value) {
        
        const {setAttributes, attributes: {measures}} = this.props
        const uMs = Object.assign({}, {...measures})

        if (uMs[measureName]) {
            uMs[measureName][field] = value
        } else {
            uMs[measureName] = {***REMOVED***: false, field: value, selected: false}
        }

        setAttributes({measures: uMs})
    }
    */
    ***REMOVED***(value) {
        const {setAttributes, attributes: {app, measures}} = this.props
        const uMs = Object.assign({}, measures)
        if (!uMs[app]) {
            uMs[app] = {}
        }

        if (uMs[app][value]) {
            uMs[app][value].selected = uMs[app][value].selected ? false : true
        } else {
            uMs[app][value] = {selected: true, format: defaultFormat}
        }

        setAttributes({measures: uMs})
    }

    onCustomLabelToggleChange(value) {
        const {setAttributes, attributes: {app, measures}} = this.props
        const uMs = Object.assign({}, measures)
       
        if (uMs[app] && uMs[app][value]) {
            uMs[app][value].***REMOVED*** = uMs[app][value].***REMOVED*** ? false : true
            setAttributes({measures: uMs})
        }        
    }

    ***REMOVED***(value, customLabel) {
        const {setAttributes, attributes: {app, measures}} = this.props
        const uMs = Object.assign({}, measures)
       
        if (uMs[app] && uMs[app][value] && uMs[app][value].***REMOVED***) {
            uMs[app][value].customLabel = customLabel
            setAttributes({measures: uMs})
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
            allDimensions,
            allFilters,
            allMeasures,
            setAttributes, attributes: {
                measures,
                filters,
                dimension1,
                dimension2,
                type,
                types
            }
        } = this.props


        const currentType = types.filter(t => t.value === type).length > 0 ? types.filter(t => t.value === type)[0] : null

        return (
            [<PanelBody initialOpen={false} title={__(type == 'map' ? 'Fields' : `Dimensions`)}>
                <PanelRow>
                    <SelectControl
                        label={__(type == 'map' ? 'Matching Field' : 'First Dimension')}
                        value={[dimension1]} // e.g: value = [ 'a', 'c' ]
                        onChange={(value) => {
                            setAttributes({dimension1: value, dimension2: value == 'none' ? 'none' : dimension2})
                        }}
                        options={allDimensions}
                    />
                </PanelRow>
                {(type != 'line') &&<PanelRow>
                    <SelectControl
                        label={__(type == 'map' ? 'Breakdown Field' : 'Second Dimension')}
                        value={[dimension2]} // e.g: value = [ 'a', 'c' ]
                        onChange={(value) => {
                            setAttributes({dimension2: value})
                        }}
                        options={allDimensions}
                        disabled={dimension1 == 'none'}
                    />
                </PanelRow>}
            </PanelBody>,
                <ChartMeasures
                    ***REMOVED***={this.***REMOVED***}
                    onUseCustomAxisFormatChange={this.onUseCustomAxisFormatChange}
                    ***REMOVED***={this.***REMOVED***}
                    ***REMOVED***={this.***REMOVED***}
                    onCustomLabelToggleChange={this.onCustomLabelToggleChange}
                    ***REMOVED***={this.***REMOVED***}
                    {...this.props}
                    currentType={currentType}/>,

                <DataFilters {...this.props}/>
            ]
        )
    }

}


export default APIConfig;
