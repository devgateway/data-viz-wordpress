import {InspectorControls, PanelColorSettings, useBlockProps} from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
    ResizableBox,
    SelectControl,
    TextControl,
    FontSizePicker,
    __experimentalText as Text,
    ToggleControl,
    TextareaControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithAPIMetadata, SizeConfig} from '@devgateway/dvz-wp-commons'
import {CSVSourceConfig} from '@devgateway/dvz-wp-commons';
import {togglePanel} from '@devgateway/dvz-wp-commons';
import {Measures} from '@devgateway/dvz-wp-commons';
import {DataFilters} from '@devgateway/dvz-wp-commons';
import {isSupersetAPI} from '@devgateway/dvz-wp-commons';
import Format from "../charts/Format.jsx";
import {getTranslation} from '@devgateway/dvz-wp-commons';


class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount()        
    }

    decodeManualColors(manualColors) {
        if (!manualColors) return {};
        try {
            // if it's already decoded JSON, this will just work
            let raw = manualColors;

            // If it looks like URL-encoded JSON (starts with %7B = '{')
            if (typeof raw === 'string' && raw.trim().startsWith('%7B')) {
                raw = decodeURIComponent(raw);
            }
            
            return JSON.parse(raw);
        } catch (e) {
            console.warn('Failed to parse manualColors', manualColors, e);
            return {};
        }
    };

    catColors(){
    const {
        attributes: {
            app,
            dimension1,
            manualColors
        }             
    } = this.props;

   if (this.state.categories && dimension1 && dimension1 != 'none') {
        
        const colors = this.decodeManualColors(manualColors);
        colors[app] = colors[app] || {};
        
        const cat = this.state.categories.filter(d => d.type == dimension1)
            if (cat && cat.length > 0) {
                const list = cat[0].items.filter(c => c.code !== null && c.code !== undefined && c.code !== "").sort((a, b) => b.position - a.position).map(item => {
                    return <PanelColorSettings
                        key={item.code}
                        colorSettings={[{
                            value: colors[app][item.code] || (item.categoryStyle ? item.categoryStyle.color : "#3182ce"),
                            onChange: (color) => {
                                if (color) {
                                    this.updateColor(item.code, color)
                                } else {
                                    this.updateColor(item.code, item.categoryStyle ? item.categoryStyle.color : "#3182ce")
                                }
                            }, label: getTranslation(item)
                        }]}
                    />
                })
               
                return list
            } else {
                return null
            }
   }
   return null
}

updateColor(value, color) {
    const { setAttributes, attributes: { app, manualColors } } = this.props;

   const colorsObj = manualColors ? JSON.parse(manualColors) : {};
    colorsObj[app] = colorsObj[app] || {};
    colorsObj[app][value] = color; 

    setAttributes({ manualColors: JSON.stringify(colorsObj) });
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
                fontSize,
                textColor,
                backGroundColor,
                dimension1,                
                csv,
                type,
                waitForFilters,
                noDataText,
                defaultBarColor,
                barBackgroundColor,
                labelPosition,
                valuePosition,
                labelWidth,
                labelHeight,
                labelFormat
            }
        } = this.props;


        const datasets = [{label: 'Select Dataset', value: '0'}]
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
        const divStyles = {height: height+10 + 'px', width: '100%'}

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
                                    onChange={(group) => setAttributes({group})}
                                />
                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    label={__('Wait For Filters')}
                                    checked={waitForFilters}
                                    onChange={() => setAttributes({waitForFilters: !waitForFilters})}
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

                            {app != 'csv' && <PanelBody initialOpen={false} title={__("Dimensions")}>
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
                            {app == 'csv' &&
                                <>
                                    <PanelBody initialOpen={false} title={__("CSV Configuration")}
                                               onToggle={e => togglePanel("csv_cfg", panelStatus, setAttributes)}>
                                        <PanelRow>
                                            <TextareaControl
                                                label={__("CSV Data")}
                                                value={csv}
                                                onChange={(csv) => setAttributes({csv})}
                                            />
                                        </PanelRow>

                                        <Format
                                            hiddenCustomAxisFormat={type == 'radar' || type == 'grouped-bars'}
                                            format={format}
                                            customFormat={{}}
                                            useCustomAxisFormat={false}
                                            onFormatChange={(newFormat, field) => {
                                                console.log("newFormat", newFormat)
                                                setAttributes({format: newFormat})
                                            }}
                                            onUseCustomAxisFormatChange={value => {
                                            }}
                                        >
                                        </Format>
                                    </PanelBody>
                                </>
                            }

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


                            <DataFilters
                                allFilters={this.state.filters}
                                allCategories={this.state.categories}
                                {...this.props}/>

                        </>


                        <PanelBody title={__('Settings')} initialOpen={false}>              
                            <PanelRow>
                                <TextControl
                                    label={__('No Data Text')}
                                    value={noDataText}
                                    onChange={(noDataText) => setAttributes({noDataText})}
                                />
                            </PanelRow>

                            <PanelRow>
                                <Text>{__("Font Size")}</Text>
                            </PanelRow>
                            <FontSizePicker
                                fontSizes={[]}
                                value={fontSize}
                                fallbackFontSize={14}
                                onChange={(newFontSize) => {
                                    setAttributes({fontSize: newFontSize})
                                }}
                            />                          

                         
                            <PanelColorSettings
                                title={__('Color Settings')}
                                colorSettings={[
                                    {
                                        value: textColor, // Label color value

                                        onChange: (color) => {
                                            setAttributes({ textColor: color }); // Update label color
                                        },
                                        label: __("Text Color") // Label for the color picker
                                    },
                                    {
                                        value: backGroundColor, // Percent color value
                                        clearable: true,
                                        enableAlpha: true,
                                        onChange: (color) => {
                                            setAttributes({ backGroundColor: color }); // Update percent color
                                        },
                                        label: __("Back Ground Color") // Label for the color picker
                                    },
                                    {
                                        value: defaultBarColor, // Default Bar color value

                                        onChange: (color) => {
                                            setAttributes({ defaultBarColor: color }); // Update Default Bar color
                                        },
                                        label: __("Default Bar Color") // Label for the color picker
                                    },
                                    {
                                        value: barBackgroundColor, // Bar Background color value

                                        onChange: (color) => {
                                            setAttributes({ barBackgroundColor: color }); // Update Bar Background color
                                        },
                                        label: __("Bar Background Color") // Label for the color picker
                                    }
                                ]}
                            />
                            

                        <PanelBody title={__('Manual Colors')} initialOpen={false}></PanelBody>
                         {this.catColors()}
                        

                        <PanelBody title={__('Label Settings')} initialOpen={false}>
                            <PanelRow>
                                <SelectControl  
                                    label={__("Label Position")}
                                    value={labelPosition}
                                    options={[
                                        { label: 'Top', value: 'top' },
                                        { label: 'Left', value: 'left' }
                                    ]}
                                    onChange={(value) => {
                                        setAttributes({
                                            labelPosition: value
                                        });
                                    }}
                                />
                            </PanelRow>
                            <PanelRow>
                                <SelectControl  
                                    label={__("Value Position")}
                                    value={valuePosition}
                                    options={[
                                        { label: 'Top', value: 'top' },
                                        { label: 'Bar', value: 'bar' }
                                    ]}
                                    onChange={(value) => {
                                        setAttributes({
                                            valuePosition: value
                                        });
                                    }}
                                />
                            </PanelRow>

                            <PanelRow>
                                <TextControl
                                    label={__('Label Width (in %)')}
                                    type="number"
                                    value={labelWidth}
                                    onChange={(labelWidth) => setAttributes({labelWidth})}
                                    min={0} max={100} 
                                    step={1}
                                />
                            </PanelRow>
                            
                            <PanelRow>
                                <TextControl
                                    label={__('Label Height (in px)')}
                                    type="number"
                                    value={labelHeight}
                                    onChange={(labelHeight) => setAttributes({labelHeight})}
                                    min={0} 
                                    step={1}
                                />
                            </PanelRow>


                            <PanelRow>
                                <TextareaControl
                                    label={__('Label Format')}
                                    value={labelFormat}
                                    onChange={(labelFormat) => setAttributes({labelFormat})}
                                    rows={4}                                    
                                    
                                />
                            </PanelRow>
                           <PanelRow>
                                <Text>
                                    {__("Available measure variables:")}
                                    <ul>
                                        {Array.isArray(measures) && measures.map((m, idx) => (
                                            <li key={idx}>{"{" + m + "}"}</li>
                                        ))}
                                    </ul>
                                </Text>
                            </PanelRow>

                          </PanelBody>
                        </PanelBody>

                </Panel>
                </InspectorControls>),
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
                            toggleSelection(true);
                        }}
                        onResizeStart={() => {
                            toggleSelection(false);
                        }}>

                        <div className={className}>
                            {this.state.react_ui_url && <iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                                                                src={this.state.react_ui_url + "/embeddable/groupedbars?"}/>}

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
