import {***REMOVED***, ***REMOVED***, useBlockProps} from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
    ResizableBox,
    SelectControl,
    TextControl,
    ***REMOVED***,
    __experimentalText as Text,
    ToggleControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithAPIMetadata, SizeConfig} from '../commons/index'
import ***REMOVED*** from "../commons/***REMOVED***";
import {togglePanel} from "../commons/Util";
import Measures from "../commons/Measures";
import DataFilters from "../commons/DataFilters";
import {isSupersetAPI} from "../commons/APIutils";
import {DEFAULT_FORMAT_SETTINGS} from '../commons/Constants';

class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
    }

    ***REMOVED***() {
        super.***REMOVED***()
    }

    render() {
        const {
            className, isSelected,
            ***REMOVED***, setAttributes,
            attributes: {
                measures,
                height,
                app,
                format,
                filters,
                group,
                panelStatus,
                ***REMOVED***,
                label,
                ***REMOVED***,
                ***REMOVED***,                
                labelFontSize,   
                textColor,          
                dimension1,
                ***REMOVED***     
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
        const divStyles = {height: height + 'px', width: '100%'}

        return ([isSelected && (
            <***REMOVED***>
                <Panel header={__("Chart Configuration")}>
                    <PanelBody
                      panelStatus={panelStatus['GROUP']}
                      onToggle={e => togglePanel("GROUP", panelStatus, setAttributes)}
                      title={__("Group")}>
                        <PanelRow>
                            <TextControl
                              label={__('Name')}
                              value={group}
                              onChange={(group) => setAttributes({group})}
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


                             {isSupersetAPI(app, this.state.apps) &&   <PanelRow>
                                                                    <SelectControl
                                                                        label={__('Datasets')}
                                                                        value={[***REMOVED***]}
                                                                        onChange={(newDatasetId)   => {
                                                                            setAttributes({
                                                                                ***REMOVED***: newDatasetId
                                                                            })
                                                                            
                                                                            this.loadMetadata(app, newDatasetId)
                                                                        }}
                                                                        options={datasets}
                                                                    />
                                                                  </PanelRow>
                                                                }
                        </PanelBody>
                        
                        {app != 'csv' &&
                           <PanelBody initialOpen={false} title={__("Dimensions")}>
                               <PanelRow>
                                   <SelectControl
                                       label={__("First Dimension")}
                                       value={[dimension1]} 
                                       onChange={(value) => {
                                           setAttributes({
                                               dimension1: value
                                           });
                                       }}
                                       options={this.state.dimensions}
                                   />
                               </PanelRow>
                           </PanelBody>
                         }
                      
                        {app != 'csv' &&  
                          <Measures
                              title={__(`Measure`)}
                              ***REMOVED***={value => {
                                  setAttributes({measures: [value]})
                              }}
                              ***REMOVED***={value => {
                                  setAttributes({format: value})
                              }}
                              allMeasures={this.state.measures}
                              format={format}
                              measures={measures}                              
                              {...this.props}/>
                        }

                       

                        <DataFilters
                          allFilters={this.state.filters}
                          allCategories={this.state.categories}
                          {...this.props}/>

                    </>
                    <PanelBody title={__('Settings')} initialOpen={false}>
                        <PanelRow>
                            <ToggleControl label={__('Show Percentage Change')}
                                             checked={***REMOVED***}
                                             onChange={(***REMOVED***) => setAttributes({***REMOVED***})}/>
                            </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('Label')}
                                value={label}
                                onChange={(label) => setAttributes({ label })}
                            />
                        </PanelRow>
                        <PanelRow>
                            <Text>{__("Big Number Font Size")}</Text>
                        </PanelRow>
                        <***REMOVED***
                            fontSizes={[]}
                            value={***REMOVED***}
                            ***REMOVED***={14}
                            onChange={(newFontSize) => {
                                setAttributes({ ***REMOVED***: newFontSize })
                            }}
                        />
                         <PanelRow>
                            <Text>{__("Percent Change Font Size")}</Text>
                        </PanelRow>
                        <***REMOVED***
                            fontSizes={[]}
                            value={***REMOVED***}
                            ***REMOVED***={14}
                            onChange={(newFontSize) => {
                                setAttributes({ ***REMOVED***: newFontSize })
                            }}
                        />
                        <PanelRow>
                            <Text>{__("Label Font Size")}</Text>
                        </PanelRow>
                        <***REMOVED***
                            fontSizes={[]}
                            value={labelFontSize}
                            ***REMOVED***={14}
                            onChange={(newFontSize) => {
                                setAttributes({ labelFontSize: newFontSize })
                            }}
                        />

                        <***REMOVED*** title={__('Color Settings')}
                            colorSettings={[
                                {
                                    value: textColor,
                                    onChange: (color) => {
                                        setAttributes({ textColor: color })
                                    },
                                    label: __("Text Color")
                                }                               
                            ]}
                        />
                    </PanelBody>
                </Panel>
            </***REMOVED***>),
              (<ResizableBox
                  size={{height}}
                  style={{"margin": "auto", width: "100%"}}
                  minHeight="0"
                  minWidth="50"
                  enable={{
                      top: false,
                      right: false,
                      bottom: true,
                      left: false,
                      topRight: false,
                      bottomRight: false,
                      bottomLeft: false,
                      topLeft: false,
                  }}
                  onResizeStop={(event, direction, elt, delta) => {
                      setAttributes({
                          height: parseInt(height + delta.height, 10),
                      });
                      ***REMOVED***(true);
                  }}
                  onResizeStart={() => {
                      ***REMOVED***(false);
                  }}>

                    <div className={className}>
                        {this.state.react_ui_url && <iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                                                            src={this.state.react_ui_url + "/embeddable/***REMOVED***?"}/>}

                    </div>
                </ResizableBox>
              )]
        );

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps();
    return <div {...blockProps}><BlockEdit {...props}/></div>;
}
export default Edit;
