import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {
    getColorClassName,
    InspectorControls,
    PanelColorSettings,
    useBlockProps,
    withColors
} from '@wordpress/block-editor';
import {GenericIcon, BLOCKS_NS, BLOCKS_CATEGORY} from '@devgateway/dvz-wp-commons';
import {Panel, PanelBody, PanelRow, TextControl} from '@wordpress/components';
import {BlockEditWithFilters} from '@devgateway/dvz-wp-commons';

const EditComponent = (props) => {
    const {
        backgroundColor,
        setBackgroundColor,
        iframeRef,
        attributes: {
            label,
            placeholder,
            successMessage,
            failureMessage,
            alignment,
            list,
            tag
        },
    } = props;

    let divClass;
    let divStyles = {"text-align": alignment, "padding": '5px'};


    if (backgroundColor != undefined) {
        if (backgroundColor.class != undefined) {
            divClass = backgroundColor.class;
        } else {
            divStyles['background-color'] = backgroundColor.color;
        }
    }

    const blockProps = useBlockProps(
        {
            style: divStyles,
            className: divClass
        }
    );

    return (
        <div>
            <InspectorControls>
                <Panel header="Block Settings">
                    <PanelBody>
                        <PanelRow>
                            <PanelColorSettings
                                title={__('Color settings')}
                                colorSettings={[
                                    {
                                        value: backgroundColor.color,
                                        onChange: setBackgroundColor,
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

                                value={successMessage}
                                onChange={(successMessage) => props.setAttributes({successMessage: successMessage})}
                                label={__("Success Message")}/>
                        </PanelRow>
                        <PanelRow>
                            <TextControl
                                value={failureMessage}
                                onChange={(failureMessage) => props.setAttributes({failureMessage: failureMessage})}
                                label={__("Failure Message")}/>
                        </PanelRow>
                    </PanelBody>
                </Panel>

            </InspectorControls>
            <div {...blockProps}  >
                <iframe ref={iframeRef} style={{width:'100%'}} scrolling={"no"}
                        src={props.src}/>

            </div>

        </div>
    );
}

const attributes = {
    label: {
        type: 'string',
        default: "Send",
    },
    placeholder: {
        type: 'string',
        default: "Enter your email",
    },
    successMessage: {type: 'string', default: "Thanks for submitting"},
    failureMessage: {type: 'string', default: "Something didn't go well, please try again later"},
    list: {
        type: 'string',
        default: "",
    },
    tag: {
        type: 'string',
        default: "",
    },
    alignment: { type: 'string', default: 'center' },
    backgroundColor: { type: 'string' },
    customBackgroundColor: { type: 'string' },
};

const SaveComponent = (props) => {
    const {
        customBackgroundColor,
        backgroundColor,
        alignment,
        label,
        placeholder,
        successMessage,
        failureMessage,
        list,
        tag,
    } = props.attributes;

    const divClass = getColorClassName('background-color', backgroundColor);

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
    return (
        <div {...blockProps}>
            <div
                className={"viz-component"}
                data-component={"newsletter"}
                data-label={label}
                data-placeholder={placeholder}
                data-success-message={successMessage}
                data-failure-message={failureMessage}
                data-list={list}
                data-tag={tag}
            />
        </div>
    );
}

class EditWithSettings extends BlockEditWithFilters {
    render() {
        return <EditComponent
            iframeRef={this.iframe}
            src={this.state.react_ui_url + "/embeddable/newsletter"} {...this.props}></EditComponent>
    }
}

registerBlockType(BLOCKS_NS + '/newsletter',
    {
        title: __('Newsletter Form'),
        icon: GenericIcon,
        category: BLOCKS_CATEGORY,
        attributes,
        deprecated: [
            {
                attributes,
                save({attributes}) {
                    const {customBackgroundColor, backgroundColor, alignment} = attributes;
                    const divClass = getColorClassName('background-color', backgroundColor);
                    const divStyles = {
                        "background-color": customBackgroundColor,
                        "text-align": alignment,
                        "margin": 'auto'
                    };
                    const blockProps = useBlockProps.save({style: divStyles, className: divClass});
                    return (
                        <div {...blockProps}>
                            <div {...attributes} className={"viz-component"} data-component={"newsletter"}></div>
                        </div>
                    );
                }
            }
        ],
        edit: withColors('backgroundColor', {textColor: 'color'})(EditWithSettings),
        save: SaveComponent,
    }
)
;
