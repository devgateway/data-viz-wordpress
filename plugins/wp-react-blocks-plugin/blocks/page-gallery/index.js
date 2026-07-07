import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {RangeControl, Panel, PanelBody, PanelRow, TextControl, ToggleControl} from '@wordpress/components';
import {registerBlockType} from '@wordpress/blocks';
import {ResizableBox} from '@wordpress/components';
import {BlockEditWithFilters, GenericIcon, BLOCKS_CATEGORY, BLOCKS_NS } from '@devgateway/dvz-wp-commons';
import {__} from '@wordpress/i18n';

const EditComponent = (props) => {
    const {attributes: {height,style,columns}, toggleSelection, setAttributes, iframeRef} = props;
    const urlParams = new URLSearchParams(window.location.search);
    const parent = urlParams.get('post');
    const blockProps = useBlockProps({className: 'wp-react-component'});
    const divClass = ""
    const divStyles = {height: height + 'px', width: '100%'}
    return (
        <div>
            <InspectorControls>
                <Panel>
                    <PanelBody>
                        <PanelRow>
                            <RangeControl
                                label={__('Columns',"dg")}
                                value={columns}
                                onChange={(columns) => setAttributes({columns})}
                                min={1}
                                max={10}
                            />
                        </PanelRow>
                    </PanelBody>
                </Panel>
            </InspectorControls>
            <ResizableBox
                size={{height}}
                style={{"margin": "auto", width: "100%"}}
                minHeight="200"
                minWidth="500"
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
                }}
            >
                <div {...blockProps} >

                    {
                        props.src && <iframe
                            ref={iframeRef}
                            style={{...divStyles}} className={divClass}
                            scrolling={"no"}
                            src={props.src + "?data-parent=" + parent}/>
                    }


                </div>
            </ResizableBox>
        </div>
    );
}
const SaveComponent = (props) => {
    const {attributes: {height,style,columns}, toggleSelection, setAttributes} = props;
    const urlParams = new URLSearchParams(window.location.search);

    const parent = urlParams.get('post');

    const divClass = {}
    const divStyles = {}
    return (<div className={divClass} style={divStyles}>
            <div data-style={style} data-parent={parent} data-columns={columns} data-height={height}  className={"viz-component"} data-component={"pageGallery"}></div>
        </div>


    );
}


class EditWithSettings extends BlockEditWithFilters {
    render() {
        return <EditComponent
            iframeRef={this.iframe}
            src={this.state.react_ui_url + "/embeddable/pagegallery"} {...this.props}></EditComponent>
    }
}

registerBlockType(BLOCKS_NS + '/page-gallery',
    {
        title: __('Child Pages Gallery',"dg"),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes: {
            columns: {
                type: 'Numeric',
                default: 2,
            },
            height: {
                type: "number",
                default: 400
            }



        }
        ,
        edit: EditWithSettings,
        save: SaveComponent,
    }
)
;
