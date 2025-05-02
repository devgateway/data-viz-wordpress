import React from 'react';
import { __ } from '@wordpress/i18n';
import {
    ***REMOVED***,
    ***REMOVED***,
    useBlockProps,
} from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { ShowcaseFormBlockProps } from './types';
import { BlockEditWithFiltersState, ***REMOVED*** } from '@dg-data-viz/wp-commons';


class EditComponent extends ***REMOVED***<ShowcaseFormBlockProps, BlockEditWithFiltersState> {
    constructor(props: ShowcaseFormBlockProps) {
        super(props);
    }

    render() {
        const {
            src,
            ***REMOVED***,
            ***REMOVED***,
            ***REMOVED***,
            setAttributes,
            attributes: {
                organization,
                name,
                email,
                country,
                message,
                submitLabel,
                resetLabel,
                ***REMOVED***,
                ***REMOVED***,
                width,
                height,
                alignment
            },
        } = this.props;
        let divClass;
        let divStyles = { textAlign: alignment, margin: 'auto' };
        if (***REMOVED*** != undefined) {
            if (***REMOVED***.class != undefined) {
                divClass = ***REMOVED***.class;
            } else {
                divStyles['background-color'] = ***REMOVED***.color;
            }
        }

        const queryString = `editing=true&organization=${organization}&name=${name}&email=${email}&country=${country}&message=${message}&submitlabel=${submitLabel}&resetlabel=${resetLabel}&***REMOVED***=${***REMOVED***}&***REMOVED***=${***REMOVED***}&width=${width}&height=${height}&alignment=${alignment}`;


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

                        <PanelRow>
                            <PanelBody>
                                <TextControl
                                    value={organization}
                                    onChange={(organization) => this.props.setAttributes({ organization: organization })}
                                    label={__("Organization Place Holder","dg")} />
                            </PanelBody>
                        </PanelRow>

                        <PanelRow>
                            <PanelBody>
                                <TextControl

                                    value={name}
                                    onChange={(name) => this.props.setAttributes({ name: name })}
                                    label={"Name Place Holder"} />
                            </PanelBody>
                        </PanelRow>

                        <PanelRow>
                            <PanelBody>
                                <TextControl

                                    value={email}
                                    onChange={(email) => this.props.setAttributes({ email: email })}
                                    label={"Email Place Holder"} />
                            </PanelBody>
                        </PanelRow>

                        <PanelRow>
                            <PanelBody>
                                <TextControl
                                    value={country}
                                    onChange={(country) => this.props.setAttributes({ country: country })}
                                    label={"Country Place Holder"} />
                            </PanelBody>
                        </PanelRow>

                        <PanelRow>
                            <PanelBody>
                                <TextControl

                                    value={message}
                                    onChange={(message) => this.props.setAttributes({ message: message })}
                                    label={"Message Place Holder"} />
                            </PanelBody>
                        </PanelRow>
                        <PanelRow>
                            <PanelBody>
                                <TextControl
                                    value={submitLabel}
                                    onChange={(submitLabel) => this.props.setAttributes({ submitLabel: submitLabel })}
                                    label={"Submit Label "} />
                            </PanelBody>
                        </PanelRow>
                        <PanelRow>
                            <PanelBody>
                                <TextControl
                                    value={resetLabel}
                                    onChange={(resetLabel) => this.props.setAttributes({ resetLabel: resetLabel })}
                                    label={"Reset Label "} />
                            </PanelBody>
                        </PanelRow>
                        <PanelRow>
                            <PanelBody>
                                <TextControl

                                    value={***REMOVED***}
                                    onChange={(***REMOVED***) => this.props.setAttributes({ ***REMOVED***: ***REMOVED*** })}
                                    label={"Success Message"} />
                            </PanelBody>
                        </PanelRow>
                        <PanelRow>
                            <PanelBody>
                                <TextControl
                                    value={***REMOVED***}
                                    onChange={(***REMOVED***) => this.props.setAttributes({ ***REMOVED***: ***REMOVED*** })}
                                    label={"Failure Message "} />
                            </PanelBody>
                        </PanelRow>
                    </Panel>
                </***REMOVED***>
                {/* @ts-ignore */}
                <div className={divClass} style={{ ...divStyles, width, height }}>
                    {this.state.react_ui_url && <iframe scrolling={"no"} style={{ width, height }}
                        src={this.state.react_ui_url + "/embeddable/showcaseForm?" + queryString} />}
                </div>

            </div>


        );
    }
}


const Edit = (props: ShowcaseFormBlockProps) => {
    const blockProps = useBlockProps({ className: 'wp-react-component' });
    return <div {...blockProps}><EditComponent {...props} /></div>;

}
export default Edit;