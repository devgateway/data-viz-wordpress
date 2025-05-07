import React, { useState } from 'react';
import { ***REMOVED***, useBlockProps } from '@wordpress/block-editor';
import {
    __experimentalDivider as Divider,
    Button,
    Panel,
    PanelBody,
    PanelRow,
    SelectControl,
    TextControl,
    ToggleControl,
    ***REMOVED***
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockEditWithAPIMetadata, BlockEditWithAPIMetadataState, Format, Group, Measure } from '@devgateway/dvz-wp-commons';
import { v4 as uuidv4 } from "uuid";
import { ***REMOVED*** } from './types';


const getGroups = (measures: Measure[]) => {
    let groups: Group[] = []
    if (measures) {
        groups = [...new Set(measures.map(m => m.group))]
    }
    return groups
}

const MToggle = (
    { onChange, checked, label }:
        { onChange: (checked: boolean) => void, checked: boolean, label: string }) => {

    return (<ToggleControl
        label={label}
        checked={checked}
        onChange={onChange} />)
}

interface GroupProps {
    app: string,
    allMeasures: Measure[],
    measures: Measure,
    idx: number,
    ***REMOVED***: boolean,
    label: string,
    format: any,
    leftTitle: string,
    rightTitle: string,
    customTooltip: string,
    onLabelChange: (idx: number, label: string) => void,
    ***REMOVED***: (idx: number, format: any) => void,
    ***REMOVED***: (idx: number, measure: string, selected: boolean) => void,
    ***REMOVED***: (idx: number, title: string) => void,
    ***REMOVED***: (idx: number, title: string) => void,
    onDefaultSelectedChanged: (idx: number, selected: boolean) => void,
    ***REMOVED***: (idx: number, fields: string) => void,
    onCustomTooltipChange: (idx: number, customTooltip: string) => void
}

const MeasureGroup = ({

    app,
    allMeasures,
    measures,
    idx,
    ***REMOVED***,
    label,
    format,
    leftTitle,
    rightTitle,
    customTooltip,
    onLabelChange,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    onDefaultSelectedChanged,
    ***REMOVED***,
    onCustomTooltipChange
}: GroupProps) => {
    const groups = getGroups(allMeasures)
    const [g, setG] = useState(groups[0])



    return (<PanelBody title={label ? label : __("New Group")}>
        <PanelRow>
            <TextControl
                label={""}
                value={label}
                onChange={label => onLabelChange(idx, label)}
            />
        </PanelRow>
        <PanelRow>
            <ToggleControl
                label="Default Selected"
                checked={***REMOVED***}
                onChange={() => onDefaultSelectedChanged(idx, !***REMOVED***)}
            />
        </PanelRow>

        {app != 'csv' && groups.map(g => {

            return (<PanelBody title={g.label}>{allMeasures.filter(m => m.group == g).map(m =>
                <PanelRow>
                    <MToggle label={m.label} checked={measures[m.value] && measures[m.value].selected}
                        onChange={value => ***REMOVED***(idx, m.value, value)}>

                    </MToggle>
                </PanelRow>
            )}
            </PanelBody>)

        })
        }
        {app == 'csv' && <PanelBody title={"Fields "}>
            <TextControl value={Object.keys(measures).join(',')} label={__("CSV Fields")}
                onChange={value => ***REMOVED***(idx, value)}></TextControl>

        </PanelBody>}
        <PanelBody title={__("Format")}>
            <Format format={format} ***REMOVED***={format => ***REMOVED***(idx, format)}></Format>

        </PanelBody>
        <PanelBody title={__("Legends")}>
            <PanelRow>
                <TextControl
                    label={__("Y Left Title")}
                    onChange={title => ***REMOVED***(idx, title)}
                    value={leftTitle}
                />

            </PanelRow>
            <PanelRow>
                <TextControl
                    label={__("Y Right Title")}
                    onChange={title => ***REMOVED***(idx, title)}
                    value={rightTitle}
                />
            </PanelRow>

        </PanelBody>
        <PanelBody initialOpen={false} title={__("Custom Tooltip")}>
            <PanelRow>
                <***REMOVED***
                    label={__("Tooltip")}
                    value={customTooltip}
                    help={__("This tooltip overrides the tooltip configured in the chart. You can use the dimensions and measures selected in the chart as variables e.g {var_name}.")}
                    onChange={(customTooltip) => onCustomTooltipChange(idx, customTooltip)}
                    rows={10}
                />
            </PanelRow>
        </PanelBody>
    </PanelBody>)

}


class BlockEdit extends BlockEditWithAPIMetadata<***REMOVED***, BlockEditWithAPIMetadataState> {

    constructor(props: ***REMOVED***) {
        super(props);
        this.addGroup = this.addGroup.bind(this)
        this.removeGroup = this.removeGroup.bind(this)
        this.onLabelChange = this.onLabelChange.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.onDefaultSelectedChanged = this.onDefaultSelectedChanged.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.***REMOVED*** = this.***REMOVED***.bind(this)
        this.onCustomTooltipChange = this.onCustomTooltipChange.bind(this)

    }

    removeGroup() {
        const {
            setAttributes,
            attributes: {
                ***REMOVED***,
                app,
            }
        } = this.props;


        const newGroups = { ...***REMOVED*** }
        newGroups[app].pop()

        setAttributes({ ***REMOVED***: newGroups })
    }

    addGroup() {

        const {
            setAttributes,
            attributes: {
                ***REMOVED***,
                app,
            }
        } = this.props;

        const newGroups = { ...***REMOVED*** }
        if (!newGroups[app]) {
            newGroups[app] = []
        }

        newGroups[app].push({
            idx: newGroups[app].length,
            label: "",
            measures: {},
            format: {
                "style": "percent",
                "minimumFractionDigits": 1,
                "maximumFractionDigits": 1,
                "currency": "USD",
                "customTooltip": ""
            }
        })
        setAttributes({ ***REMOVED***: newGroups })
    }

    onLabelChange(idx: number, label: string) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                ***REMOVED***,
            }
        } = this.props;
        const newGroups = { ...***REMOVED*** }
        newGroups[app][idx].label = label
        setAttributes({ ***REMOVED***: newGroups })
    }

    ***REMOVED***(idx: number, leftTitle: string) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                ***REMOVED***,
            }
        } = this.props;
        const newGroups = { ...***REMOVED*** }

        newGroups[app][idx].leftTitle = leftTitle
        setAttributes({ ***REMOVED***: newGroups })
    }

    ***REMOVED***(idx: number, rightTitle: string) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                ***REMOVED***,
            }
        } = this.props;
        const newGroups = { ...***REMOVED*** }

        newGroups[app][idx].rightTitle = rightTitle
        setAttributes({ ***REMOVED***: newGroups })
    }

    onCustomTooltipChange(idx: number, customTooltip: string) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                ***REMOVED***,
            }
        } = this.props;
        const newGroups = { ...***REMOVED*** }
        newGroups[app][idx].customTooltip = customTooltip
        setAttributes({ ***REMOVED***: newGroups })
    }

    ***REMOVED***(idx: number, format: any) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                ***REMOVED***,
            }
        } = this.props;
        const newGroups = { ...***REMOVED*** }
        newGroups[app][idx].format = format
        setAttributes({ ***REMOVED***: newGroups })
    }

    ***REMOVED***(idx: number, fields: string) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                ***REMOVED***,
            }
        } = this.props;
        const newGroups = { ...***REMOVED*** }

        newGroups[app][idx].measures = {}
        fields.split(",").forEach(measure => {

            newGroups[app][idx].measures[measure] = {}
            newGroups[app][idx].measures[measure] = { 'selected': true }
        })


        setAttributes({ ***REMOVED***: newGroups })

    }

    ***REMOVED***(idx: number, measure: string, selected: boolean) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                ***REMOVED***,
            }
        } = this.props;
        const newGroups = { ...***REMOVED*** }

        if (!newGroups[app][idx].measures[measure]) {
            newGroups[app][idx].measures[measure] = {}
        }

        newGroups[app][idx].measures[measure] = { selected }
        setAttributes({ ***REMOVED***: newGroups })

    }

    onDefaultSelectedChanged(idx: number, value: boolean) {
        const {
            setAttributes,
            attributes: {
                app,
                ***REMOVED***,
            }
        } = this.props;

        const newGroups = { ...***REMOVED*** }
        newGroups[app].forEach(g => g.***REMOVED*** = false)
        newGroups[app][idx].***REMOVED*** = value
        setAttributes({ ***REMOVED***: newGroups })
    }

    render() {
        const {
            isSelected,
            setAttributes,
            attributes: {
                group,
                label,
                ***REMOVED***,
                app,
            }
        } = this.props;
        const iframeStyles = { height: '65px', width: '100%' }
        const queryString = ``
        const ***REMOVED*** = ***REMOVED***[app] ? ***REMOVED***[app] : [];


        return ([isSelected && (<***REMOVED***>
            <Panel header={__("Measures Configuration")}>
                <PanelBody initialOpen={false} title={__("Group")}>
                    <PanelRow>
                        <TextControl
                            help={__('Use this field to set a shared key')}
                            label={__('Name')}
                            value={group == '' ? uuidv4() : group}
                            onChange={(group) => setAttributes({ group })}
                        />
                    </PanelRow>
                </PanelBody>
                <PanelBody initialOpen={false} title={__("API & Source")}>
                    <PanelRow>
                        <SelectControl
                            value={app}
                            onChange={(app) => {

                                setAttributes({ app: app })
                            }}
                            options={this.state.apps ? [...this.state.apps] : []}
                        />
                    </PanelRow>
                </PanelBody>

                <PanelBody initialOpen={false} title={__("Options")}>

                    <TextControl
                        label={__("Label")}
                        value={label}
                        onChange={label => setAttributes({ label })}
                    />
                </PanelBody>

                {app != 'csv' && <PanelBody initialOpen={false} title={__("Groups")}>

                    {this.state.measures && ***REMOVED***.map(g =>
                        <MeasureGroup
                            app={app}
                            ***REMOVED***={this.***REMOVED***}
                            ***REMOVED***={this.***REMOVED***}
                            onLabelChange={this.onLabelChange}
                            ***REMOVED***={this.***REMOVED***}
                            ***REMOVED***={this.***REMOVED***}
                            onDefaultSelectedChanged={this.onDefaultSelectedChanged}
                            onCustomTooltipChange={this.onCustomTooltipChange}
                            allMeasures={this.state.measures} {...g} />)}

                    <PanelRow>

                        <Button variant="link" onClick={this.addGroup}>{__("Add")}</Button>
                        <Button variant="link" onClick={this.removeGroup}>{__("Remove")}</Button>


                        <Divider />
                    </PanelRow>
                </PanelBody>}


                {app == 'csv' && <PanelBody initialOpen={false} title={__("Groups")}>

                    {***REMOVED***.map(g => <MeasureGroup
                        app={app}
                        ***REMOVED***={this.***REMOVED***}
                        ***REMOVED***={this.***REMOVED***}
                        onLabelChange={this.onLabelChange}
                        ***REMOVED***={this.***REMOVED***}
                        ***REMOVED***={this.***REMOVED***}
                        onDefaultSelectedChanged={this.onDefaultSelectedChanged}
                        onCustomTooltipChange={this.onCustomTooltipChange}
                        {...g} />
                    )}

                    <PanelRow>

                        <Button variant="link" onClick={this.addGroup}>{__("Add")}</Button>
                        <Button variant="link" onClick={this.removeGroup}>{__("Remove")}</Button>


                        <Divider />
                    </PanelRow>
                </PanelBody>}
            </Panel>
        </***REMOVED***>),

        (<div>

            {this.state.react_ui_url &&
                <iframe ref={this.iframe} scrolling={"no"} style={iframeStyles}
                    src={this.state.react_ui_url + "/embeddable/measures?" + queryString} />}
        </div>

        )
        ]
        );

    }
}


const Edit = (props) => {

    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return (<div {...blockProps}>
        <p className={"iframe container"}>
            <BlockEdit {...props} />
        </p>

    </div>)


}
export default Edit;
