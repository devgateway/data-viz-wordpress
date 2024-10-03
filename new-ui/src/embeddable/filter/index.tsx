import React, { LegacyRef, ***REMOVED***, useEffect, useRef, useState } from "react";
import { Checkbox, Container, Divider, Dropdown, DropdownProps, ***REMOVED***, Icon, Input, Label, Radio, Segment } from "semantic-ui-react";
import ***REMOVED*** from '../data/***REMOVED***'
import ***REMOVED*** from '../data/***REMOVED***'
import { connect } from "react-redux";
import { setFilter, ***REMOVED*** } from "../reducers/data";
import { injectIntl } from 'react-intl';

const FILTER_TYPE_MULTI_SELECT = 'multi-select';
const FILTER_TYPE_SINGLE_SELECT = 'single-select';


const NO_DATA = 'NO_DATA';
const DEFAULT_VALUE_INPUT = 'DEFAULT_VALUE_INPUT'
const LOWEST_VALUE = 'LOWEST_VALUE'
const HIGHEST_VALUE = 'HIGHEST_VALUE'


const ***REMOVED*** = (val) => {
    if (val instanceof Boolean) {
        return val
    } else {
        return val == "true"
    }
}

const toOptions = (items, locale) => items ? items.sort((a, b) => a.position - b.position).map(i => {
    const text = locale && i.labels && i.labels[locale.toUpperCase()] ? i.labels[locale.toUpperCase()] : i.value
    return ({
        key: i.id,
        value: i.id,
        text: text,
        icon: i.value.***REMOVED***(),
        position: i.position ? i.position : i.value,
    })
}) : []

const decode = (value) => {
    return ***REMOVED***(value)
}

const parse = (value) => {
    try {
        return JSON.parse(decode(value))

    } catch (error) {
        throw new Error("error parsing value:" + error);
    }

    return null
}

const ***REMOVED*** = (state, ownProps) => {
    const { app, group, param } = ownProps
    return {
        current: state.getIn(['data', 'filters', app, group, param]),
    }
}

const ***REMOVED*** = {
    onInit: ***REMOVED***, onChange: setFilter
};

interface ***REMOVED*** {
    isRange?: boolean,
    options: any[],
    ***REMOVED***?: boolean,
    ascOrder?: boolean
}

const ***REMOVED*** = (props: ***REMOVED***) => {

    const { isRange, options, ***REMOVED***, ascOrder } = props
    let sortedOptions: any [] = []
    if (***REMOVED***(***REMOVED***)) {
        sortedOptions = options.sort(function (a, b) {
            const aText = a.text ? a.text.toLowerCase() : "";
            const bText = b.text ? b.text.toLowerCase() : "";
            if (***REMOVED***(ascOrder)) {
                return aText < bText ? -1 : aText > bText ? 1 : 0;
            } else {
                return aText < bText ? 1 : aText > bText ? -1 : 0;
            }
        });
    } else {
        sortedOptions = options.sort(function (a, b) {
            return ***REMOVED***(ascOrder) ? a.position - b.position : b.position - a.position;
        });
    }

    const filterProps = { ...props, options: sortedOptions }

    if (isRange) {
        return <***REMOVED***  {...filterProps} />
    } else {
        return <***REMOVED*** {...filterProps} />
    }

}

export interface ListFilterDropDownProps {
    allLabel: string,
    noneLabel: string,
    placeholder: string,
    options: any[],
    app: string,
    group: string,
    param: string,
    current: any[],
    onChange: any,
    onInit: any,
    ***REMOVED***: boolean,
    ***REMOVED***: boolean,
    filterType: string,
    defaultValues: string,
    ***REMOVED***: boolean,
    ***REMOVED***: string,
    ***REMOVED***: boolean,
    closeOnSelect: boolean,
    hiddenFilters: any[]
}

const ***REMOVED*** = connect(***REMOVED***, ***REMOVED***)((props: ListFilterDropDownProps) => {

    const {
        allLabel,
        noneLabel,
        placeholder,
        options,
        app,
        group,
        param,
        current,
        onChange,
        onInit,
        ***REMOVED***,
        ***REMOVED***,
        filterType,
        defaultValues,
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***,
        closeOnSelect,
        hiddenFilters
    } = props

    const [searchFilter, ***REMOVED***] = useState("")
    const changeFilter = (value) => {
        let newValue: any[] = []
        if (filterType != FILTER_TYPE_SINGLE_SELECT && !closeOnSelect && current && current.indexOf(value) > -1) {
            newValue = current.filter(i => i !== value)
        } else if (filterType != FILTER_TYPE_SINGLE_SELECT && current && !closeOnSelect) {
            newValue = [...current, value]
        } else {
            newValue = [value]
        }

        onChange({ app, group, param, value: newValue })
        if (closeOnSelect && refContainer.current) {
            refContainer.current.close();
        }
    }
    const all = (value) => {
        const matchingItems = options.filter(o => {
            if (***REMOVED*** && searchText && searchText.trim().length > 0 && o.text) {
                return o.text.toLowerCase().includes(searchText.toLowerCase())
            }
            return true;
        })

        onChange({ app, group, param, value: matchingItems.map(v => v.value) })
        if (closeOnSelect && refContainer.current) {
            refContainer.current.close()
        }

    }
    const none = () => {
        const matchingItems = options.filter(o => {
            if (***REMOVED*** && searchText && searchText.trim().length > 0 && o.text) {
                return o.text.toLowerCase().includes(searchText.toLowerCase())
            }
            return true;
        })

        onChange({ app, group, param, value: ***REMOVED*** ? matchingItems.map(v => v.value) : [] })
        if (closeOnSelect && refContainer.current) {
            refContainer.current.close()
        }
    }

    const ***REMOVED*** = (searchText) => {
        setSearchText(searchText)
        const matchingItems = options.filter(o => {
            if (***REMOVED*** && searchText && searchText.trim().length > 0 && o.text) {
                return o.text.toLowerCase().includes(searchText.toLowerCase())
            }
            return true;
        })
        onChange({ app, group, param, value: matchingItems.map(v => v.value) })
    }

    useEffect(() => {
        if (!current) {

            const filterItems = options.map(o => o.value)
            if (filterType == FILTER_TYPE_MULTI_SELECT || filterType == "") {
                //if multiple select select all  elements
                onInit({ app, group, param, value: filterItems })
            } else {
                if (app == "csv") {
                    //if single select select base on default value criteria
                    let filterValues: any[] = []
                    if (***REMOVED*** === DEFAULT_VALUE_INPUT) {
                        filterValues = defaultValues ? defaultValues.split(',') : []
                    } else if (***REMOVED*** == LOWEST_VALUE) {
                        filterValues = filterItems.length > 0 ? [filterItems[0]] : []
                    } else if (***REMOVED*** == HIGHEST_VALUE) {
                        filterValues = filterItems.length > 0 ? [filterItems[filterItems.length - 1]] : []
                    }
                    onInit({ app, group, param, value: filterValues })
                } else {

                    onInit({ app, group, param, value: [filterItems[0]] })
                }
            }
        }

    }, [])

    const getSelected = () => {
        if (filterType == FILTER_TYPE_SINGLE_SELECT) {
            const selectedItem = current && current[0] ? options.filter(v => v.value == current[0])[0] : null
            return `${placeholder} ${selectedItem ? selectedItem.text : ""}`;
        } else {
            return `${placeholder} (${current ? current.filter(v => {
                if (v == Number.MIN_SAFE_INTEGER) {
                    return false
                }

                if (hiddenFilters && hiddenFilters.length > 0) {
                    return !(hiddenFilters.indexOf(v) != -1)
                }

                return true
            }).length : 0}/${options.filter(f => {
                if (hiddenFilters && hiddenFilters.length > 0) {
                    return !(hiddenFilters.indexOf(f.id) != -1)
                }
                return true
            }).length}) `
        }
    }
    const refContainer = useRef<DropdownProps>(null);
    const [searchText, setSearchText] = useState('')

    return (
        // @ts-ignore
        <Dropdown
            ref={refContainer as unknown as LegacyRef<***REMOVED***>}
            fluid
            text={getSelected()}
            scrolling={false}
            button
            icon={"angle down ignore"}
            multiple={true}
            search
            floating={false}
            className={`${current && current.length > 0 ? 'applied ' : ''}`}>

            <Dropdown.Menu>
                {filterType != FILTER_TYPE_SINGLE_SELECT && <>
                    <Segment>
                        <Dropdown.Item>
                            <Label basic onClick={all}>{allLabel}</Label> | <Label basic
                                onClick={none}>{noneLabel}</Label>
                        </Dropdown.Item>
                    </Segment>
                    {***REMOVED*** && <>
                        <Container>
                            <Dropdown.Item>


                                <div className="ui action input">
                                    <Input placeholder='Search...'>
                                        <input className="filter-search" value={searchText} onChange={e => {
                                            ***REMOVED***(e.target.value)
                                        }} />

                                        <Icon name='remove' link className="clear-icon ignore" onClick={e => {
                                            ***REMOVED***('')
                                        }}></Icon>
                                    </Input>
                                </div>
                            </Dropdown.Item>
                        </Container>
                        <Divider />
                    </>}

                </>}
                <br></br>
                <Container className={***REMOVED*** ? "dropdown-single-column" : ""}>
                    {options.filter(o => {
                        if (***REMOVED*** && searchText && searchText.trim().length > 0 && o.text) {
                            return o.text.toLowerCase().includes(searchText.toLowerCase())
                        }
                        return true;
                    }).map(({ value, text }) => (
                        <Dropdown.Item className={***REMOVED*** ? "dropdown-item-single-column" : ""}>
                            {filterType == FILTER_TYPE_SINGLE_SELECT && <Radio
                                checked={current && current.indexOf(value) > -1 ? true : false}
                                onChange={e => changeFilter(value)}
                                label={text} />}
                            {filterType == FILTER_TYPE_MULTI_SELECT && <Checkbox
                                checked={(current && current.indexOf(value) > -1) && !(options.length == current.length && ***REMOVED***) ? true : false}
                                onChange={e => changeFilter(value)}
                                label={text} />}
                        </Dropdown.Item>))}
                </Container>
            </Dropdown.Menu>

        </Dropdown>
    )
})

interface RangeFilterDropDownProps {
    placeholder: string,
    startLabel: string,
    endLabel: string,
    options: any[],
    app: string,
    group: string,
    param: string,
    current: any[],
    onChange: any
}

const ***REMOVED*** = connect(***REMOVED***, ***REMOVED***)(({
    placeholder,
    startLabel,
    endLabel,
    options,
    onChange,
    app,
    group,
    param,
    current
}: RangeFilterDropDownProps) => {

    const [start, setStart] = useState(options[0].position)
    const [end, setEnd] = useState(options[options.length - 1].position);

    useEffect(() => {
        const current = options.filter(v => (v.position > start || v.position === start) && (v.position < end || v.position === end)).map(o => o.value)
        onChange({ app, group, param, value: current })
    }, [start, end])

    const refContainer = useRef<DropdownProps>(null);

    return (<Dropdown

        ref={refContainer as unknown as LegacyRef<***REMOVED***>}
        fluid
        text={`${placeholder} (${current ? current.filter(v => v != Number.MIN_SAFE_INTEGER).length : 0}/${options.length})`}
        scrolling={false}
        button
        multiple={true}
        search
        floating={false}
        icon={"angle down ignore"}
        className={`${current && current.length > 0 ? 'applied ' : ''} range`}

    >
        <Dropdown.Menu>

            <Segment>
                <Dropdown.Item> <Label basic>{startLabel}</Label></Dropdown.Item>
            </Segment>
            <Container>

                {options.map(({ value, text, position }) => (<Dropdown.Item>
                    <Radio
                        disabled={position > end}
                        checked={start === position}
                        onChange={e => setStart(position)}
                        label={text} /></Dropdown.Item>))}
            </Container>
            <Segment>
                <Dropdown.Item> <Label basic>{endLabel}</Label></Dropdown.Item>
            </Segment>
            <Container>

                {options.map(({ value, text, position }) => (<Dropdown.Item>
                    <Radio
                        disabled={position < start}
                        checked={end === position}
                        onChange={e => setEnd(position)}
                        label={text} /></Dropdown.Item>))}
            </Container>
        </Dropdown.Menu>
    </Dropdown>)
})


const ***REMOVED*** = (props) => {

    const { data, type, ***REMOVED*** } = props
    const cat = data.filter(d => d.type === type)[0]
    const ***REMOVED*** = cat ? cat.items.filter(f => {
        if (!***REMOVED*** && f.code == NO_DATA) {
            return false
        }
        if (props.hiddenFilters && props.hiddenFilters.length > 0) {
            return !(props.hiddenFilters.indexOf(f.id) != -1)
        }
        return true
    }) : []
    const options = ***REMOVED*** ? toOptions(***REMOVED***, props.locale) : []
    return (
        <Container fluid={true} className={`filter`}>
            <***REMOVED*** {...props} options={options}></***REMOVED***>
        </Container>
    )
}


const BooleanFilter = connect(***REMOVED***, ***REMOVED***)((props: any) => {
    let idx = 0
    const options = [{
        key: "Yes", value: true, text: "Yes", position: idx++,
    }, {
        key: "No", value: false, text: "No", position: idx++,
    }]
    return (
        <Container fluid={true} className={`filter`}>
            <***REMOVED*** options={options} {...props} />
        </Container>
    )
})

const CSVFilter = (props) => {
    const { csvValue } = props
    let idx = 0
    const options = csvValue.split(',').map(o => {
        return {
            key: o, value: o, text: o, icon: o.***REMOVED***(), position: idx++,
        }
    })

    return <Container fluid={true} className={`filter`}>
        <***REMOVED*** options={options}  {...props} > </***REMOVED***>
    </Container>
}


const Filter = ({
    "data-group": group,
    "data-app": app,
    "data-param": param,
    "data-icon": icon,
    "data-type": type,
    "data-place-holder": placeholder,
    "data-is-range": isRange = "false",
    "data-all-label": allLabel,
    "data-none-label": noneLabel,
    "data-start-label": startLabel,
    "data-end-label": endLabel,
    "data-csv-value": csvValue,
    "data-filters": filters = [],
    "data-use-single-column": ***REMOVED*** = "false",
    "data-enable-text-search": ***REMOVED*** = "false",
    "data-filter-type": filterType,
    "data-default-values": defaultValues,
    "data-show-no-data-option": ***REMOVED*** = "true",
    "data-default-value-criteria": ***REMOVED*** = "DEFAULT_VALUE_INPUT",
    "data-hidden-filters": hiddenFilters = '[]',
    "data-all-none-same-behaviour": ***REMOVED*** = "false",
    "data-close-on-select": closeOnSelect = "false",
    "data-alphabetical-sort": ***REMOVED*** = "true",
    "data-asc-order": ascOrder = "true",
    intl,
}) => {


    const params = {}
    const ff = parse(filters) || {}

    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
    }

    const ***REMOVED*** = parse(hiddenFilters)
    let ***REMOVED***;
    if (filterType == null || filterType == "") {
        ***REMOVED*** = isRange === 'true' ? "range" : "multi-select";
    } else {
        ***REMOVED*** = filterType;
    }
    if (app === 'csv') {
        return <CSVFilter allLabel={allLabel} noneLabel={noneLabel}
            isRange={isRange === 'true'}
            csvValue={csvValue} app={app} group={group}
            icon={icon} placeholder={placeholder}
            startLabel={startLabel} endLabel={endLabel}
            param={param}
            ***REMOVED***={***REMOVED*** === 'true'}
            ***REMOVED***={***REMOVED*** === 'true'}
            filterType={***REMOVED***}
            defaultValues={defaultValues}
            ***REMOVED***={***REMOVED***}
            ***REMOVED***={***REMOVED*** === 'true'}
            closeOnSelect={closeOnSelect === 'true'}
            locale={intl.locale}
        />
    } else {

        if (app) {
            return (<***REMOVED***
                params={params}
                app={app}
                hiddenFilters={***REMOVED*** || []}>
                <***REMOVED***>
                    <Container fluid={true}>
                        {type === "Boolean" &&
                            <BooleanFilter startLabel={startLabel}
                                endLabel={endLabel}
                                allLabel={allLabel}
                                noneLabel={noneLabel}
                                isRange={***REMOVED***(isRange)}
                                app={app}
                                group={group}
                                icon={icon}
                                placeholder={placeholder}
                                param={param}
                                filterType={***REMOVED***}
                                defaultValues={defaultValues}
                                locale={intl.locale}>

                            </BooleanFilter>}
                        {type !== "Boolean" && <***REMOVED*** type={type}>
                            <***REMOVED***
                                startLabel={startLabel}
                                endLabel={endLabel} allLabel={allLabel}
                                noneLabel={noneLabel}
                                isRange={***REMOVED***(isRange)}
                                app={app} group={group}
                                icon={icon} placeholder={placeholder}
                                param={param}
                                ***REMOVED***={***REMOVED***}
                                ascOrder={ascOrder}
                                ***REMOVED***={***REMOVED***(***REMOVED***)}
                                ***REMOVED***={***REMOVED***(***REMOVED***)}
                                ***REMOVED***={***REMOVED***(***REMOVED***)}
                                filterType={***REMOVED***}
                                defaultValues={defaultValues}
                                ***REMOVED***={***REMOVED***}
                                hiddenFilters={***REMOVED*** || []}
                                ***REMOVED***={***REMOVED*** == "true"}
                                closeOnSelect={***REMOVED***(closeOnSelect)}
                                locale={intl.locale}>

                            </***REMOVED***>
                        </***REMOVED***>}

                    </Container>
                </***REMOVED***>
            </***REMOVED***>)
        } else {
            return null;
        }
    }
}


export default injectIntl(Filter)