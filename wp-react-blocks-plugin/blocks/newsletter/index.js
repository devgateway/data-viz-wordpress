import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import {
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    useBlockProps,
    withColors
} from '@wordpress/block-editor';
import {Generic} from '../icons/index.js'
import {Panel, PanelBody, PanelRow, TextControl} from '@wordpress/components';
import {***REMOVED***} from "../commons";

const EditComponent = (props) => {
    const {
        ***REMOVED***,
        ***REMOVED***,
        attributes: {
            label,
            placeholder,
            ***REMOVED***,
            ***REMOVED***,
            alignment,
            list,
            tag
        },
    } = props;

    let divClass;
    let divStyles = {"text-align": alignment, "padding": '5px'};


    if (***REMOVED*** != undefined) {
        if (***REMOVED***.class != undefined) {
            divClass = ***REMOVED***.class;
        } else {
            divStyles['background-color'] = ***REMOVED***.color;
        }
    }

    const blockProps = useBlockProps(
        {
            style: divStyles,
            className: divClass
        }
    );


    const queryString = `editing=true&label=${label}&list=${list}&tag=${tag}&placeholder=${placeholder}&***REMOVED***=${***REMOVED***}&***REMOVED***=${***REMOVED***}&alignment=${alignment}`;

    return (
        <div>
            <***REMOVED***>
                <Panel header="Block Settings">
                    <PanelBody>
                        <PanelRow>
                            <***REMOVED***
                                title={__('Color settings')}
                                colorSettings={[
                                    {
                                        value: ***REMOVED***.color,
                                        onChange: ***REMOVED***,
                                        label: __('Background color')
                                    },
                                ]}
                            />
                        </PanelRow>


                        <PanelRow>
                            <TextControl
                                value={list}
                                onChange={(list) => props.setAttributes({list})}
                                label={__("Mailchimp list id")}/>

                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                value={tag}
                                onChange={(tag) => props.setAttributes({tag})}
                                label={__("Country TAG")}/>

                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                value={placeholder}
                                onChange={(placeholder) => props.setAttributes({placeholder})}
                                label={__("Input Placeholder")}/>
                        </PanelRow>

                        <PanelRow>
                            <TextControl
                                value={label}
                                onChange={(label) => props.setAttributes({label})}
                                label={__("Submit Label")}/>
                        </PanelRow>
                        <PanelRow>
                            <TextControl

                                value={***REMOVED***}
                                onChange={(***REMOVED***) => props.setAttributes({***REMOVED***: ***REMOVED***})}
                                label={__("Success Message")}/>
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                value={***REMOVED***}
                                onChange={(***REMOVED***) => props.setAttributes({***REMOVED***: ***REMOVED***})}
                                label={__("Failure Message")}/>
                        </PanelRow>
                    </PanelBody>
                </Panel>

            </***REMOVED***>
            <div {...blockProps}  >
                <iframe  style={{width:'100%'}} scrolling={"no"}
                        src={props.src + queryString}/>

            </div>

        </div>
    );
}
const SaveComponent = (props) => {
    const {setAttributes} = props;
    const {
        customBackgroundColor,
        ***REMOVED***,
        alignment
    } = props.attributes;


    const divClass = ***REMOVED***('background-color', ***REMOVED***);

    const divStyles = {
        "background-color": customBackgroundColor,
        "text-align": alignment,
        "margin": 'auto'
    };
    const blockProps = useBlockProps.save(
        {
            style: divStyles,
            className: divClass
        }
    );
    return (<div {...blockProps}>
            <div {...props.attributes} className={"viz-component"} data-component={"newsletter"}></div>
        </div>


    );
}

class ***REMOVED*** extends ***REMOVED*** {
    render() {
        return <EditComponent
            src={this.state.react_ui_url + "/embeddable/newsletter?"} {...this.props}></EditComponent>
    }
}

***REMOVED***(process.env.BLOCKS_NS + '/newsletter',
    {
        title: __('Newsletter Form'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            label: {
                type: 'string',
                default: "Send",
            }
            ,
            placeholder: {
                type: 'string',
                default: "Enter your email",
            }
            ,
            ***REMOVED***: {type: 'string', default: "Thanks for submitting"},
            ***REMOVED***: {type: 'string', default: "Something didn't go well, please try again later"},
            list: {
                type: 'string',
                default: "",
            },
            tag: {
                type: 'string',
                default: "",
            }


        }
        ,
        edit: withColors('***REMOVED***', {textColor: 'color'})(***REMOVED***),
        save: SaveComponent,
    }
)
;
