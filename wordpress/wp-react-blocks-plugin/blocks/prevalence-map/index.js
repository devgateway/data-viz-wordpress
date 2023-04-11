import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import {
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    useBlockProps,
    withColors
} from '@wordpress/block-editor';
import {Panel, ResizableBox} from '@wordpress/components';
import {Generic} from "../icons";

const EditComponent = (props) => {

    const {
        ***REMOVED***,
        ***REMOVED***,
        ***REMOVED***,
        setAttributes,
        attributes: {
            width,
            height,
            alignment
        },
    } = props;

     const blockProps = useBlockProps({className: 'wp-react-component'});
    const ***REMOVED*** = newAlignment => {
        props.setAttributes({alignment: newAlignment});
    };
    let divClass;
    let divStyles = {"text-align":alignment};
    if (***REMOVED*** != undefined) {
        if (***REMOVED***.class != undefined) {
            divClass = ***REMOVED***.class;
        } else {
            divStyles['background-color'] = ***REMOVED***.color;
        }
    }

    return (
        <div>
            <***REMOVED***>
                <Panel header="Block Settings">
                    <***REMOVED***
                        title={__('Color settings',"dg")}
                        colorSettings={[
                            {
                                value: ***REMOVED***.color,
                                onChange: ***REMOVED***,
                                label: __('Background color',"dg")
                            },
                        ]}
                    />
                    {/*
                    <PanelBody title="Alignment"  initialOpen={true}>
                        <PanelRow>
                            <***REMOVED***
                                label={"Alignment"}
                                value={alignment}
                                onChange={***REMOVED***}
                            />
                        </PanelRow>
                    </PanelBody>
                       */}
                </Panel>
            </***REMOVED***>
            <div {...blockProps} >
                <ResizableBox
                    size={{
                        height,
                        width,
                    }}
                    style={{"margin":"auto"}}
                    minHeight="50"
                    minWidth="50"
                    enable={{
                        top: false,
                        right: true,
                        bottom: true,
                        left: false,
                        topRight: false,
                        bottomRight: true,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    onResizeStop={(event, direction, elt, delta) => {
                        setAttributes({
                            height: parseInt(height + delta.height, 10),
                            width: parseInt(width + delta.width, 10),
                        });
                        ***REMOVED***(true);
                    }}
                    onResizeStart={() => {
                        ***REMOVED***(false);
                    }}
                >
                    <div className={divClass} style={{...divStyles, width, height}}>

                        {this.state.react_ui_url&&<iframe scrolling={"no"} style={{width, height}}
                                 src={process.env.EMBEDDABLE_URI + "/map"}/>}
                    </div>
                </ResizableBox>
            </div>

        </div>
    );
}

const SaveComponent = (props) => {
    const {setAttributes} = props;
    const {
        width,
        height,
        customBackgroundColor,
        ***REMOVED***,
    } = props.attributes;

    const divClass = ***REMOVED***('background-color', ***REMOVED***);
    const divStyles = {width, height, "background-color": customBackgroundColor};

    return (<div className={divClass} style={divStyles}>
            <div width={width} height={height} className={"tcdi-component"} data-component={"map"}></div>
        </div>


    );
}
***REMOVED***(process.env.BLOCKS_NS+'/illicit-map', {
    title: __('Illicit Map',"dg"),
    icon: Generic,
    category: process.env.BLOCKS_CATEGORY,
    attributes: {
        width: {
            type: 'Numeric',
            default: 900,
        },
        height: {
            type: 'Numeric',
            default: 400,
        },
        ***REMOVED***: {
            type: 'string'
        },

    },
    edit: withColors('***REMOVED***', {textColor: 'color'})(EditComponent),
    save: SaveComponent,
});
