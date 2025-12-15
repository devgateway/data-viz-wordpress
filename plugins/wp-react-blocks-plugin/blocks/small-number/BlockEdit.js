import {InspectorControls, PanelColorSettings, useBlockProps, RichText} from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
    ResizableBox,
    SelectControl,
    TextControl,
    FontSizePicker,
    __experimentalText as Text,
    TextareaControl,
    ToggleControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithAPIMetadata, SizeConfig} from '@devgateway/dvz-wp-commons'

import {togglePanel} from '@devgateway/dvz-wp-commons';;
import {Measures} from '@devgateway/dvz-wp-commons';
import {DataFilters} from '@devgateway/dvz-wp-commons';
import {isSupersetAPI} from '@devgateway/dvz-wp-commons';
import Format from "../charts/Format.jsx";


// This BlockEdit can work both as a standalone block edit and as a HOC wrapper for core/paragraph
class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount()
    }

    render() {
        const {
            className, isSelected,
            toggleSelection, setAttributes,
            attributes: {
                measures,
                height,
                app,
                format,
                filters,
                group,
                panelStatus,
                dvzProxyDatasetId,                
                numberFontSize,
                numberColor,                
                csv,
                type,
                waitForFilters,
            noDataText,
            textTemplate
           }
        } = this.props;


        const  datasets = [{label: 'Select Dataset', value: '0'}]
        if (this.state.datasets) {
            this.state.datasets.forEach(d => {
                datasets.push({label: d.label, value: d.id})
            })
        }

        let params = {}
        filters.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
        const inlineStyles = {
            display: 'inline',
            color: numberColor,
            fontSize: (numberFontSize || 14) + 'px',
            lineHeight: '1',
            verticalAlign: 'baseline'
        }

        console.log("this.state.measures", this.state.measures)

       return ([isSelected && (
           <InspectorControls>
               <Panel header={__("Chart Configuration")}>
                   <PanelBody
                       panelStatus={panelStatus['GROUP']}
                       onToggle={e => togglePanel("GROUP", panelStatus, setAttributes)}
                       title={__("Group")}>
                       <PanelRow>
                           <TextControl
                               label={__('Name')}
                               value={group}
                               onChange={(group) => setAttributes({ group })}
                           />
                       </PanelRow>
                         <PanelRow>
                                <ToggleControl
                                    label={__('Wait For Filters')}
                                    checked={waitForFilters}
                                    onChange={() => setAttributes({waitForFilters:!waitForFilters})}
                                />
                            </PanelRow>	
                   </PanelBody>
                   <SizeConfig setAttributes={setAttributes} panelStatus={panelStatus}
                       height={height}></SizeConfig>

                   <>
                       <PanelBody initialOpen={false} title={__("API & Source")}>
                           <PanelRow>
                               <SelectControl
                                   value={[app]}
                                   onChange={(app) => {
                                       setAttributes({
                                           app: app
                                       })
                                   }}
                                   options={this.state.apps}
                               />
                           </PanelRow>


                            {isSupersetAPI(app, this.state.apps) && <PanelRow>
                                    <SelectControl
                                        label={__('Datasets')}
                                        value={[dvzProxyDatasetId]}
                                        onChange={(newDatasetId) => {
                                            setAttributes({
                                                dvzProxyDatasetId: newDatasetId
                                            })

                                            this.loadMetadata(app, newDatasetId)
                                        }}
                                        options={datasets}
                                    />
                                </PanelRow>
                                }
                       </PanelBody>


                         {app != 'csv' &&
                                <Measures
                                    title={__(`Measure`)}
                                    onSetSingleMeasure={value => {
                                        setAttributes({measures: [value]})
                                    }}
                                    onFormatChange={value => {
                                        setAttributes({format: value})
                                    }}
                                    allMeasures={this.state.measures}
                                    format={format}
                                    measures={measures}
                                    {...this.props}/>
                            }


                       {app == 'csv' &&
                           <>
                               <PanelBody initialOpen={false} title={__("CSV Configuration")}
                                   onToggle={e => togglePanel("csv_cfg", panelStatus, setAttributes)}>
                                   <PanelRow>
                                       <TextareaControl
                                           label={__("CSV Data")}
                                           value={csv}
                                           onChange={(csv) => setAttributes({ csv })}
                                       />
                                   </PanelRow>

                                   <Format
                                       hiddenCustomAxisFormat={type == 'radar' || type == 'small-number'}
                                       format={format}
                                       customFormat={{}}
                                       useCustomAxisFormat={false}
                                       onFormatChange={(newFormat, field) => {
                                           console.log("newFormat", newFormat)
                                           setAttributes({ format: newFormat })
                                       }}
                                       onUseCustomAxisFormatChange={value => {
                                       }}
                                   >
                                   </Format>
                               </PanelBody>
                           </>
                       }

                       <DataFilters
                           allFilters={this.state.filters}
                           allCategories={this.state.categories}
                           {...this.props} />

                   </>
                   <PanelBody title={__('Paragraph Template')} initialOpen={true}>
                        <PanelRow>
                            <TextareaControl
                                label={__('Text Template')}
                                help={__('Use variables like {{value}} or {{measure}} coming from the API.')}
                                value={textTemplate}
                                onChange={(textTemplate) => setAttributes({ textTemplate })}
                            />
                        </PanelRow>
                    </PanelBody>
                   <PanelBody title={__('Settings')} initialOpen={false}>                       
                        <PanelRow>
                           <TextControl
                               label={__('No Data Text')}
                               value={noDataText}
                               onChange={(noDataText) => setAttributes({ noDataText })}
                           />
                       </PanelRow>
                       <PanelRow>
                           <Text>{__("Number Font Size")}</Text>
                       </PanelRow>
                       <FontSizePicker
                           fontSizes={[]}
                           value={numberFontSize}
                           fallbackFontSize={14}
                           onChange={(newFontSize) => {
                               setAttributes({ numberFontSize: newFontSize })
                           }}
                       />
                     
                       <PanelColorSettings title={__('Color Settings')}
                           colorSettings={[
                               {
                                   value: numberColor,
                                   onChange: (color) => {
                                       setAttributes({ numberColor: color })
                                   },
                                   label: __("Number Color")
                               }                               
                           ]}
                       />
                   </PanelBody>
               </Panel>
           </InspectorControls>),
           (
           <div className={className}>
                        {this.state.react_ui_url && <iframe ref={this.iframe} style={inlineStyles} scrolling={"no"}
                                                            src={this.state.react_ui_url + "/embeddable/smallnumber?"}/>}

                    </div>
              )]
        );

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps({
        style: {
            display: 'inline',
            verticalAlign: 'baseline'
        }
    });
    return <span {...blockProps}><BlockEdit {...props}/></span>;
}
export default Edit;
