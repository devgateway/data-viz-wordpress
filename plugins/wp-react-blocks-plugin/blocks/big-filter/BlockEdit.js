import { InspectorControls, PanelColorSettings, useBlockProps } from '@wordpress/block-editor';
import {
    __experimentalNumberControl as NumberControl,
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
import { __ } from '@wordpress/i18n';
import { BlockEditWithAPIMetadata, SizeConfig } from "@devgateway/dvz-wp-commons";
import { togglePanel } from "@devgateway/dvz-wp-commons";
import { Measures } from "@devgateway/dvz-wp-commons";
import { DataFilters } from "@devgateway/dvz-wp-commons";
import { isSupersetAPI } from "@devgateway/dvz-wp-commons";
import { APIConfig } from "@devgateway/dvz-wp-commons";
import { setFilter, setInitialFilters } from "@devgateway/dvz-wp-commons";
import { useSelect } from '@wordpress/data';

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
            bigFilterBlocks,
            attributes: {
                dimension1,
                height,
                app,
                sort,
                order,
                showZeroValues,
                filters,
                blockName,
                group,
                parent,
                panelStatus,
                dvzProxyDatasetId,
                numberFontSize,
                numberColor,
                backgroundColor,
                labelFontSize,
                labelColor,
                nColumns,

                unselectedBackgroundColor,

                unselectedLabelColor,
                unselectedNumberColor

            }
        } = this.props;




        const datasets = [{ label: 'Select Dataset', value: '0' }]
        if (this.state.datasets) {
            this.state.datasets.forEach(d => {
                datasets.push({ label: d.label, value: d.id })
            })
        }

        let params = {}
        filters.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
        const divStyles = { height: height + 'px', width: '100%' }

        return ([isSelected && (
            <InspectorControls>
                <Panel header={__("Chart Configuration")}>
                    <PanelBody
                        panelStatus={panelStatus['GROUP']}
                        onToggle={e => togglePanel("GROUP", panelStatus, setAttributes)}
                        title={__("Connections")}>
                        <PanelRow>
                            <TextControl
                                label={__('Name')}
                                value={blockName}
                                help={__('Name of the block to be use as parent')}
                                onChange={(blockName) => setAttributes({ blockName })}
                            />
                        </PanelRow>
                        <PanelRow>
                            <SelectControl
                                label={__('Parent')}
                                value={[parent]}
                                onChange={(parent) => {
                                    setAttributes({
                                        parent
                                    })
                                }}
                                options={[{ label: __("None"), value: "" }, ...bigFilterBlocks]}
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('Group')}
                                value={group}
                                help={__('Group to identify related filters and charts')}
                                onChange={(group) => setAttributes({ group })}
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
                        {app != 'csv' && <APIConfig
                            allDimensions={this.state.dimensions}
                            allFilters={this.state.filters}
                            allMeasures={this.state.measures}
                            allCategories={this.state.categories}
                            allApps={this.state.apps}
                            {...this.props}>
                        </APIConfig>}

                        {app == 'csv' && <PanelBody><PanelRow><p>CSV Not supported yet</p></PanelRow></PanelBody>}

                    </>
                    <PanelBody title={__('Settings')} initialOpen={false}>
                        <PanelRow>
                            <SelectControl
                                label={__('Sort By')}
                                value={sort}
                                onChange={(sort) => {
                                    setAttributes({ sort })
                                }}
                                options={[
                                    { label: 'Alphabetically', value: "alpha" },
                                    { label: 'Value', value: "value" }
                                ]}
                            />
                        </PanelRow>
                        <PanelRow>
                            <SelectControl
                                label={__('Order')}
                                value={order}
                                onChange={(order) => {
                                    setAttributes({ order })
                                }}
                                options={[
                                    { label: 'Ascending', value: "asc" },
                                    { label: 'Descending', value: "desc" }
                                ]}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={__('Show Zero Values')}
                                help={__('Display items with zero values in the filter')}
                                checked={showZeroValues}
                                onChange={(showZeroValues) => setAttributes({ showZeroValues })}
                            />
                        </PanelRow>

                        <PanelRow>
                            <NumberControl
                                min={1}
                                max={100}
                                step={1}
                                value={nColumns}
                                onChange={v => {
                                    setAttributes({ nColumns: v })
                                }}
                                label={__('Columns')}
                            ></NumberControl>
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
                        <PanelRow>
                            <Text>{__("Label Font Size")}</Text>
                        </PanelRow>
                        <FontSizePicker
                            fontSizes={[]}
                            value={labelFontSize}
                            fallbackFontSize={14}
                            onChange={(newFontSize) => {
                                setAttributes({ labelFontSize: newFontSize })
                            }}
                        />

                        <PanelColorSettings title={__('Selected Color Settings')}
                            colorSettings={[
                                {
                                    value: numberColor,
                                    onChange: (color) => {
                                        setAttributes({ numberColor: color })
                                    },
                                    label: __("Number Color")
                                },
                                {
                                    value: labelColor,
                                    onChange: (color) => {
                                        setAttributes({ labelColor: color })
                                    },
                                    label: __("Label Color")
                                },
                                {
                                    value: backgroundColor,
                                    onChange: (color) => {
                                        setAttributes({ backgroundColor: color })
                                    },
                                    label: __("Background Color")
                                },
                            ]}
                        />


                        <PanelColorSettings title={__('Unselected Color Settings')}
                            colorSettings={[
                                {
                                    value: unselectedNumberColor,
                                    onChange: (color) => {
                                        setAttributes({ unselectedNumberColor: color })
                                    },
                                    label: __("Number Color")
                                },
                                {
                                    value: unselectedLabelColor,
                                    onChange: (color) => {
                                        setAttributes({ unselectedLabelColor: color })
                                    },
                                    label: __("Label Color")
                                },
                                {
                                    value: unselectedBackgroundColor,
                                    onChange: (color) => {
                                        setAttributes({ unselectedBackgroundColor: color })
                                    },
                                    label: __("Background Color")
                                },
                            ]}
                        />
                    </PanelBody>
                </Panel>
            </InspectorControls>),
        (<ResizableBox
            size={{ height }}
            style={{ "margin": "auto", width: "100%" }}
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
                    src={this.state.react_ui_url + "/embeddable/bigFilter?"} />}

            </div>
        </ResizableBox>
        )]
        );
    }
}

const Edit = (props) => {


    // Get all blocks of a specific type (e.g., 'alive/big-filter')
    const bigFilterBlocks = useSelect((select) => {
        const { getBlocks } = select('core/block-editor');
        // Get all blocks in the editor
        const allBlocks = getBlocks();

        // Filter recursively if you need to look inside nested blocks (like columns or groups)
        const findBlocksRecursive = (blocks) => {
            let found = [];
            blocks.forEach(block => {
                if (block.name === 'alive/big-filter' && block.clientId !== props.clientId) {
                    found.push({
                        type: block.attributes.type,
                        label: block.attributes.blockName + "(" + block.attributes.dimension1 + ")",
                        value: block.attributes.blockName
                    });
                }
                if (block.innerBlocks && block.innerBlocks.length > 0) {
                    found = [...found, ...findBlocksRecursive(block.innerBlocks)];
                }
            });
            return found;
        };
        return findBlocksRecursive(allBlocks);
    }, [props.clientId]);

    const blockProps = useBlockProps();

    return <div {...blockProps}><BlockEdit {...props} bigFilterBlocks={bigFilterBlocks} /></div>;
}
export default Edit;
