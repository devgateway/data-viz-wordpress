import React from 'react';
import { ***REMOVED***, useBlockProps } from '@wordpress/block-editor';
import { ***REMOVED***, Panel, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ComponentWithSettings, SearchResult, SearchResults, Wp_Types } from "@devgateway/dvz-wp-commons";
import apiFetch from '@wordpress/api-fetch';
import { Label, Search } from "semantic-ui-react";
import { PdfBlockProps, PdfBlockState } from './type';


const ***REMOVED*** = ({ url, type, subtype, title }: SearchResult) => {
    return (<div className={"search result item"}>
        <div className={"subtype"}>{subtype}</div>
        <div><Label content={title} /></div>
        <div><a href={url}>{url}</a></div>
    </div>)
}

class BlockEdit extends ComponentWithSettings<PdfBlockProps, PdfBlockState> {
    constructor(props: PdfBlockProps) {
        super(props);
        this.search = this.search.bind(this)
    }

    search(e, data: SearchResult) {
        const types: string[] = []
        Object.keys(this.state.types).map(k => {
            const slug = this.state.types[k].slug
            if (this.props.attributes[slug] === true) {
                types.push(slug)
            }
        })

        apiFetch<SearchResults>({ path: '/wp/v2/search?per_page=5&search=' + data.value + '&subtype=' + types.join(',') }).then((data) => {
            this.setState({ results: data })
        });

    }

    ***REMOVED***() {
        super.***REMOVED***();
        apiFetch<Wp_Types[]>({ path: '/wp/v2/types' }).then((data) => {
            this.setState({ types: data })
        });
    }

    render() {
        const {
            className, isSelected,
            ***REMOVED***,
            setAttributes,
            attributes: {
                url,
                type,
                buttonLabel,
                height,
                fileName

            },
        } = this.props;


        const queryString = `editing=true&data-type=${type}&data-button-label=${buttonLabel}&data-file-name=${fileName}`
        const divStyles = { height: "60px" }
        return (

            <div>
                <***REMOVED***>
                    <Panel>
                        <PanelBody title={__("Button Label", "dg")}>
                            <PanelRow>
                                <TextControl
                                    value={buttonLabel}
                                    onChange={(buttonLabel) => setAttributes({ buttonLabel })}
                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Page or Post", "dg")}>
                            <PanelRow>
                                <Search fluid size={"mini"}
                                    loading={false}
                                    ***REMOVED***={(e, data) => {
                                        setAttributes({ url: data.result.url, title: data.result.title })
                                    }}
                                    ***REMOVED***={(data) => ***REMOVED***(data as SearchResult)}
                                    ***REMOVED***={(e, data) => this.search(e, data as SearchResult)}
                                    results={this.state.results}

                                />
                            </PanelRow>
                        </PanelBody>
                        <PanelBody title={__("Search Options", "dg")}>
                            {this.state.types && Object.keys(this.state.types).map(k => {
                                const f = this.state.types[k]
                                if (["media", "blocks"].indexOf(f.rest_base) > -1) {
                                    return null
                                }
                                return (<PanelRow>
                                    <***REMOVED***
                                        label={f.name}
                                        checked={this.props.attributes[f.slug] ? this.props.attributes[f.slug] : false}
                                        onChange={(value) => {
                                            const attr = {}
                                            attr[f.slug] = value
                                            setAttributes(attr)
                                        }}
                                    />
                                </PanelRow>)
                            })}


                        </PanelBody>
                        <PanelBody title={__("PDF File Name", "dg")}>
                            <PanelRow>
                                <TextControl
                                    value={fileName}
                                    onChange={(fileName) => setAttributes({ fileName })}
                                />
                            </PanelRow>
                        </PanelBody>
                    </Panel>


                </***REMOVED***>

                <div style={divStyles}>
                    <iframe style={divStyles} scrolling={"no"}
                        src={this.state.react_ui_url + "/embeddable/downloadpdf?" + queryString} />
                </div>

            </div>
        );

    }
}


const Edit = (props: PdfBlockProps) => {
    const blockProps = useBlockProps();
    return <div {...blockProps}><BlockEdit {...props} /></div>;

}
export default Edit;
