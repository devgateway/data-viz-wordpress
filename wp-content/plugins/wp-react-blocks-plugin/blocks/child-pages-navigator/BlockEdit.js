import {***REMOVED***, useBlockProps} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, SelectControl, TextControl, ToggleControl, ResizableBox} from '@wordpress/components';

import {__} from '@wordpress/i18n';

import {BlockEditWithAPIMetadata, ComponentWithSettings} from '@devgateway/dvz-wp-commons'

const DEFAULT_VALUE_INPUT = 'DEFAULT_VALUE_INPUT'
const LOWEST_VALUE = 'LOWEST_VALUE'
const HIGHEST_VALUE = 'HIGHEST_VALUE'


class BlockEdit extends ComponentWithSettings {

    constructor(props) {
        super(props);
    }

    ***REMOVED***() {
        const {setAttributes,attributes: {name, showIcons, showLabels}} = this.props;
        super.***REMOVED***();
        const urlParams = new ***REMOVED***(window.location.search);
        const parent = urlParams.get('post');
        setAttributes({parent: parent})
    }

    render() {
        const {
            className,
            isSelected,
            ***REMOVED***,
            setAttributes,
            attributes: {
                height,
                title,
                showIcons,
                showLabels,
            }
        } = this.props;

        const iframeStyles = {height: height+'px', width:'100%'}

        return ([isSelected && (<***REMOVED***>
            <Panel header={__("Menu Configuration")}>
                <PanelBody>
                    <PanelRow>
                        <TextControl
                            label={__('Title')}
                            value={title}
                            onChange={(title) => setAttributes({title})}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Show Icons"
                            checked={showIcons}
                            onChange={() => setAttributes({showIcons: !showIcons})}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Show Labels"
                            checked={showLabels}
                            onChange={() => setAttributes({showLabels: !showLabels})}
                        />
                    </PanelRow>
                </PanelBody>
            </Panel>
        </***REMOVED***>),
            (<ResizableBox
                size={{height}}
                style={{"margin": "auto", width: "100%"}}
                minHeight="200"
                minWidth="100"
                enable={{
                    top: false,
                    right: false,
                    bottom: true,
                    left: false,
                    topRight: true,
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

                <div>

                    {this.state.react_ui_url &&
                        <iframe ref={this.iframe}
                                scrolling={"no"}
                                style={iframeStyles}
                                src={this.state.react_ui_url + "/embeddable/***REMOVED***"}/>}
                </div>
                </ResizableBox>
            )]);

    }
}


const Edit = (props) => {

    const blockProps = useBlockProps({className: 'wp-react-component'});
    return (<div {...blockProps}>
        <p className={"iframe container"}>
            <BlockEdit {...props}/>
        </p>

    </div>)


}
export default Edit;