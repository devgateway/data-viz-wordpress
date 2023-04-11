import {***REMOVED***, useBlockProps} from '@wordpress/block-editor';
import {RangeControl, Panel, PanelBody, PanelRow, TextControl, ToggleControl} from '@wordpress/components';
import {***REMOVED***} from '@wordpress/blocks';
import {ResizableBox} from '@wordpress/components';
import Generic from "../icons";
import {***REMOVED***} from "../commons";
import {__} from '@wordpress/i18n';

const EditComponent = (props) => {
    const {attributes: {height,style,columns}, ***REMOVED***, setAttributes} = props;
    const urlParams = new ***REMOVED***(window.location.search);
    const parent = urlParams.get('post');
    const blockProps = useBlockProps({className: 'wp-react-component'});
    const queryString = `editing=true&data-parent=${parent}&data-style=${style}&data-height=${height}&data-columns=${columns}`;
    const divClass = ""
    const divStyles = {height: height + 'px', width: '100%'}
    return (
        <div>
            <***REMOVED***>
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
            </***REMOVED***>
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
                    ***REMOVED***(true);
                }}
                onResizeStart={() => {
                    ***REMOVED***(false);
                }}
            >
                <div {...blockProps} >

                    {
                        props.src && <iframe
                            style={{...divStyles}} className={divClass}
                            scrolling={"no"}
                            src={props.src + queryString}/>
                    }


                </div>
            </ResizableBox>
        </div>
    );
}
const SaveComponent = (props) => {
    const {attributes: {height,style,columns}, ***REMOVED***, setAttributes} = props;
    const urlParams = new ***REMOVED***(window.location.search);

    const parent = urlParams.get('post');

    const divClass = {}
    const divStyles = {}
    return (<div className={divClass} style={divStyles}>
            <div data-style={style} data-parent={parent} data-columns={columns} data-height={height}  className={"tcdi-component"} data-component={"pageGallery"}></div>
        </div>


    );
}


class ***REMOVED*** extends ***REMOVED*** {
    render() {
        return <EditComponent
            src={this.state.react_ui_url + "/embeddable/pagegallery?"} {...this.props}></EditComponent>
    }
}

***REMOVED***(process.env.BLOCKS_NS + '/page-gallery',
    {
        title: __('Child Pages Gallery',"dg"),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
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
        edit: ***REMOVED***,
        save: SaveComponent,
    }
)
;
