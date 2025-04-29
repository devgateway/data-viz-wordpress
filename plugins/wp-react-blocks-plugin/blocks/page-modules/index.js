import {__} from '@wordpress/i18n';
import {***REMOVED***} from '@wordpress/blocks';
import {***REMOVED***, useBlockProps} from '@wordpress/block-editor';
import {Generic} from '../icons/index.js'
import {Panel, PanelBody, PanelRow, ResizableBox, TextControl} from '@wordpress/components';
import {ComponentWithSettings} from "../commons";


const SaveComponent = (props) => {
  const { navLabel, topTopLabel, previewMode } = props.attributes;
  return (
    <div
      className={"viz-component"}
      data-component={"pageModules"}
      data-nav-label={navLabel}
      data-to-top-label={topTopLabel}
      data-preview-mode={previewMode}
    />
  );
};

class Edit extends ComponentWithSettings {
    constructor(props) {
        super(props);
    }

    ***REMOVED***() {
        super.***REMOVED***();
    }

    ***REMOVED***() {
        if (this.unsubscribe) {
            this.unsubscribe()
        }
    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        const ***REMOVED*** = this.state?.previewMode ?? 'Desktop';
        if (***REMOVED*** !== prevState.previewMode) {
            this.props.setAttributes({previewMode: ***REMOVED***})
        }
    }

    render() {
        const {attributes: {width, height, navLabel, topTopLabel, previewMode}, ***REMOVED***, setAttributes} = this.props;
        const urlParams = new ***REMOVED***(window.location.search);
        const parent = urlParams.get('post');
        const queryString = `editing=true&parent=${parent}&data-nav-label=${navLabel}&data-to-top-label=${topTopLabel}&data-preview-mode=${previewMode}`;
        const divClass = ""
        const divStyles = {height: `${height}px`, width: '100%'}

        return (
            <div>

                <***REMOVED***>
                    <Panel header={__("Configuration","dg")}>
                        <PanelBody title={__("Labels","dg")}>
                            <PanelRow>
                                <TextControl
                                    label={__('Navigator Label',"dg")}
                                    value={navLabel}
                                    onChange={(navLabel) => setAttributes({navLabel})}
                                />

                            </PanelRow>

                            <PanelRow>
                                <TextControl
                                    label={__('To Top Label',"dg")}
                                    value={topTopLabel}
                                    onChange={(topTopLabel) => setAttributes({topTopLabel})}
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

                    <div>
                        {this.state.react_ui_url&&<iframe
                            style={{...divStyles}} className={divClass}
                            scrolling={"no"}
                            src={this.state.react_ui_url + "/embeddable/pagemodules?" + queryString}/>}
                    </div>


                </ResizableBox>
            </div>
        );


    }
}

***REMOVED***(`${process.env.BLOCKS_NS}/page-modules`,
    {
        title: __('Page Modules',"dg"),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            count: {
                type: 'Numeric',
                default: 3,
            },
            height: {
                type: "number",
                default: 400
            },
            width: {
                type: "number",
                default: 800
            },
            topTopLabel: {
                type: 'String',
                default: "TO THE TOP",
            },
            navLabel: {
                type: 'String',
                default: "Sections",
            },
            previewMode: {
                type: 'string',
                default: 'Desktop'
            }
        }
        ,
        edit: Edit,
        save: SaveComponent,
    }
)
;
