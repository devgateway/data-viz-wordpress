import React from 'react';
import {***REMOVED***, ***REMOVED***, useBlockProps} from '@wordpress/block-editor';
import {
    Button,
    ***REMOVED***,
    FormToggle,
    Panel,
    PanelBody,
    PanelRow, RadioControl,
    RangeControl,
    ResizableBox,
    TextControl, ToggleControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import { ***REMOVED***, BlockEditWithFiltersProps, BlockEditWithFiltersState} from '@dg-data-viz/wp-commons';
import {MediaUpload} from "@wordpress/media-utils";
import apiFetch from '@wordpress/api-fetch';

interface AgreeAndDownloadProps extends BlockEditWithFiltersProps {
    text: string;
    agree: string;
    cancel: string;
    download_style: string;
    media: string;
}

interface AgreeAndDownloadState extends BlockEditWithFiltersState {
    posts: any[];
}

class BlockEdit extends ***REMOVED***<AgreeAndDownloadProps, AgreeAndDownloadState> {

    constructor(props: AgreeAndDownloadProps) {
        super(props);
        this.getPosts = this.getPosts.bind(this)
    }

    getPosts() {

        const {attributes: {type, taxonomy, categories}} = this.props

        apiFetch({
            path: `/wp/v2/${type}?per_page=10&${taxonomy != 'none' && categories && categories.length > 0 ? taxonomy + '=' + categories.join(',') : ''}=${categories}`,
        }).then(data => {

            const types = data
            this.setState({
                ...this.state,
                posts: data as any[]

            });
        });

    }

    ***REMOVED***() {
        super.***REMOVED***();
        this.getPosts()
    }

    ***REMOVED***(prevProps, prevState, snapshot) {
        const {
            setAttributes,
            attributes: {
                type,
                taxonomy,
                categories,
                count
            },
        } = this.props;

        super.***REMOVED***(prevProps, prevState, snapshot)

        if (prevProps.attributes) {
            if (type != prevProps.attributes.type ||
                taxonomy != prevProps.attributes.taxonomy ||
                categories != prevProps.attributes.categories) {
                this.getPosts()
            }

        }

    }

    render() {
        const {
            setAttributes,
            attributes: {
                type,
                agree,
                cancel,
                taxonomy,
                categories,
                post_id,
                post_slug,
                download_style,
                media,
                text

            },
        } = this.props;
        const ***REMOVED*** = () => (


            <MediaUpload
                onSelect={(media) => {
                    setAttributes({media})
                }
                }
                allowedTypes={""}
                value={media ? media.id : null}
                render={({open}) => {

                    if (download_style == 'link') {
                        return (<a className={"agree-and-download link"} onClick={open}>{media ? text : __("Open Media Library")}</a>)
                    } else {
                        return (<Button className={"ui button agree-and-download"} onClick={open}>{media ? text : __("Open Media Library")}</Button>)
                    }
                }
                }
            />

        );

        return (
            <div>
                <***REMOVED***>
                    <Panel header={__("Tabs Configuration")}>

                        <PanelBody title={__("Style")}>
                            <PanelRow>
                                <TextControl
                                    value={text}
                                    label={__("Download Text")}
                                    onChange={text => setAttributes({text})}
                                />

                            </PanelRow>
                            <PanelRow>
                                <TextControl
                                    value={agree}
                                    label={__("Agree Text")}
                                    onChange={agree => setAttributes({agree})}
                                />

                            </PanelRow>
                            <PanelRow>
                                <TextControl
                                    value={cancel}
                                    label={__("Cancel Text")}
                                    onChange={cancel => setAttributes({cancel})}
                                />

                            </PanelRow>
                            <PanelRow>
                                    <ToggleControl
                                    label={__("Link Style")}
                                    checked={download_style == 'link'}
                                    onChange={e => setAttributes({download_style: 'link'})}
                                    />

                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    label={__("Button Style")}
                                    checked={download_style == 'button'}
                                    onChange={e => setAttributes({download_style: 'button'})}
                                    />
                            </PanelRow>
                        </PanelBody>
                        {this.renderFilters()}
                        <PanelBody title={__("Agreement Post")}>


                            {this.state.posts && this.state.posts.map(o =>
                                <PanelRow>
                                    <ToggleControl
                                        label={o.title.rendered}
                                        checked={post_id == o.id}
                                        onChange={(e) => {
                                            setAttributes({post_id: o.id, post_slug: o.slug})
                                        }
                                        }
                                    /></PanelRow>)}
                        </PanelBody>

                    </Panel>
                </***REMOVED***>
                <***REMOVED***></***REMOVED***>
            </div>
        );

    }
}


const Edit = (props) => {
    const blockProps = useBlockProps({className: 'wp-react-component'});
    return <div {...blockProps}><BlockEdit {...props}/></div>;

}
export default Edit;
