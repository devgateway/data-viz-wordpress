import React from 'react';
import {
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    RichText,
    useBlockProps,
    InnerBlocks,
    // @ts-ignore
    useSetting
} from '@wordpress/block-editor';
import {
    ***REMOVED***,
    ***REMOVED***,
    Panel,
    PanelBody,
    PanelRow,
    RangeControl,
    ***REMOVED***,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {ComponentWithSettings, ComponentWithSettingsState} from "@dg-data-viz/wp-commons";
import {***REMOVED***} from './types';

class BlockEdit extends ComponentWithSettings<***REMOVED***, ComponentWithSettingsState> {

    constructor(props: ***REMOVED***) {
        super(props);
        this.iframe = React.createRef();
    }

    render() {
        const {
            className,
            setAttributes,
            fontSizes,
            attributes: {
                color,
                type,
                height,
                checkPng,
                checkJpg,
                buttonLabel,
                defaultFormat,
                pngLabel,
                jpgLabel,
                pngText,
                jpgText,
                title,
                useTitle,
                sectionTitle,
                style,
                fontSize,
                fontClass,
                tooltip,
                ***REMOVED***,
                ***REMOVED***,
                ***REMOVED***,
                ***REMOVED***,
                ***REMOVED***
            },
        } = this.props;

        const titleStyle = {
            fontSize: (!fontClass) ? fontSize : 'auto',
            color: color ?? undefined
        }
        ;
        //migration code
        if (tooltip != '') {
            ;
            setAttributes({***REMOVED***: tooltip, tooltip: ''})
            return null;
        }

        return (

            <div>
                <***REMOVED***>
                    <Panel>
                        <PanelBody title={__("Default Format")}>
                            <PanelRow>
                                <div>
                                    <input type="radio" id="png" name="png" checked={defaultFormat === 'PNG'}
                                           value='PNG'
                                           onChange={(e) => setAttributes({
                                               defaultFormat: e.target.value,
                                               checkPng: true,
                                           })}/>
                                    <label htmlFor="PNG">PNG</label></div>
                                <div>
                                    <input type="radio" id="jpg" name="jpg" checked={defaultFormat === 'JPG'}
                                           value='JPG'
                                           onChange={(e) => setAttributes({
                                               defaultFormat: e.target.value,
                                               checkJpg: true
                                           })}/>

                                    <label htmlFor="JPG">JPG</label></div>
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Allowed Format")}>
                            <PanelRow>
                                <***REMOVED***
                                    label="PNG"
                                    checked={checkPng}
                                    onChange={(value) => {
                                        setAttributes({
                                            checkPng: value,
                                            checkJpg: value == false ? true : checkJpg,
                                            defaultFormat: value == false && defaultFormat === 'PNG' ? 'JPG' : defaultFormat
                                        })
                                    }}/>
                            </PanelRow>
                            <PanelRow>
                                <***REMOVED***
                                    label="JPG"
                                    checked={checkJpg}
                                    onChange={(value) =>
                                        setAttributes({
                                            checkJpg: value,
                                            checkPng: value == false ? true : checkPng,
                                            defaultFormat: value == false && defaultFormat === 'JPG' ? 'PNG' : defaultFormat
                                        })}/>
                            </PanelRow>
                        </PanelBody>

                        <PanelBody>
                            <PanelRow>
                                <ToggleControl
                                    label={__("Use Title")}
                                    checked={useTitle}
                                    onChange={() => setAttributes({useTitle: !useTitle})}/>

                            </PanelRow>
                            {useTitle && <PanelBody>
                                <PanelRow>
                                    <***REMOVED***
                                        fontSizes={fontSizes}
                                        withSlider={true}
                                        ***REMOVED***={14}
                                        value={fontSize}
                                        onChange={(fontSize) => {
                                            const current = fontSizes.filter(f => f.size === fontSize).shift()
                                            if (current) {
                                                setAttributes({
                                                    fontClass: ***REMOVED***(current.slug),
                                                    fontSize: fontSize?.toString()
                                                })
                                            } else {
                                                setAttributes({fontClass: '', fontSize: fontSize?.toString()})
                                            }
                                        }}>
                                    </***REMOVED***>
                                </PanelRow>
                                <PanelRow>
                                    <***REMOVED***
                                        colorSettings={[
                                            {
                                                value: color ?? undefined,
                                                onChange: (color) => {
                                                    if (color) {
                                                        setAttributes({color})
                                                    } else {
                                                        setAttributes({color: null})
                                                    }
                                                },
                                                label: __('Text color')
                                            }
                                        ]}
                                    />
                                </PanelRow>
                            </PanelBody>}
                            <PanelRow>
                                <ToggleControl
                                    label={__("Use Light Style")}
                                    checked={style === 'light'}
                                    onChange={() => setAttributes({style: style === 'light' ? 'heavy' : 'light'})}/>

                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Button Label")}>
                            <PanelRow>

                                <TextControl
                                    value={buttonLabel}
                                    onChange={(buttonLabel) => setAttributes({buttonLabel})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Drop Down Label")}>
                            <PanelRow>

                                <TextControl
                                    value={title}
                                    onChange={(title) => setAttributes({title})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("PNG File Name")}>
                            <PanelRow>

                                <TextControl
                                    value={pngLabel}
                                    onChange={(pngLabel) => setAttributes({pngLabel})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("JPG File Name")}>
                            <PanelRow>

                                <TextControl
                                    value={jpgLabel}
                                    onChange={(jpgLabel) => setAttributes({jpgLabel})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("PNG Text")}>
                            <PanelRow>

                                <TextControl
                                    value={pngText}
                                    onChange={(pngText) => setAttributes({pngText})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("JPG Text")}>
                            <PanelRow>

                                <TextControl
                                    value={jpgText}
                                    onChange={(jpgText) => setAttributes({jpgText})}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Tooltip")}>
                            <PanelRow>
                                <***REMOVED***
                                    value={***REMOVED***}
                                    onChange={(***REMOVED***) => setAttributes({***REMOVED***})}/>
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Source URL")}>
                            <PanelRow>
                                <ToggleControl
                                    label={__("Include Source URL")}
                                    checked={***REMOVED***}
                                    onChange={() => setAttributes({***REMOVED***: !***REMOVED***})}/>
                            </PanelRow>
                            {***REMOVED*** &&
                                <>
                                    <RangeControl
                                        label={__('Margin Left')}
                                        value={***REMOVED***}
                                        onChange={(***REMOVED***) => setAttributes({***REMOVED***})}
                                        min={0}
                                        max={300}
                                    />

                                    <RangeControl
                                        label={__('Margin Top')}
                                        value={***REMOVED***}
                                        onChange={(***REMOVED***) => setAttributes({***REMOVED***})}
                                        min={0}
                                        max={50}
                                    />
                                    <RangeControl
                                        label={__('Font Size')}
                                        value={***REMOVED***}
                                        onChange={(***REMOVED***) => setAttributes({***REMOVED***})}
                                        min={8}
                                        max={24}
                                    />
                                </>
                            }
                        </PanelBody>
                    </Panel>
                </***REMOVED***>

                <div className={`${className} ${className.split('-').join(' ')}`} >

                    <div style={{"display": "flex"}}>
                        {useTitle && <div style={{flexGrow: "1"}}>
                            <RichText
                                tagName="p"
                                style={titleStyle}
                                className={`download title ${fontClass ? fontClass : ''}`}
                                value={sectionTitle}
                                onChange={(sectionTitle) => setAttributes({sectionTitle})}
                                placeholder={__('Title...')}
                            />
                        </div>}
                        <div style={!useTitle ? {flexGrow: "1"} : {}}>

                            {this.state.react_ui_url && <iframe width={"100%"} ref={this.iframe} scrolling={"no"}
                                                                src={this.state.react_ui_url + "/embeddable/download?"}></iframe>
                            }
                        </div>

                    </div>


                    <InnerBlocks/>

                </div>
            </div>
        );

    }
}


const Edit = (props) => {
    const blockProps = useBlockProps();
    const fontSizes = useSetting('typography.fontSizes') ?? [];
    return <div {...blockProps}><BlockEdit fontSizes={fontSizes} {...props} /></div>;

}
export default Edit;
