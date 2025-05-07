import React from 'react';
import {useBlockProps} from '@wordpress/block-editor';
import {ComponentWithSettings, SearchResult, SearchResults} from "@devgateway/dvz-wp-commons";
import {useDispatch, useSelect} from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { Search} from "semantic-ui-react";
import {__} from '@wordpress/i18n';
import { RedirectBlockProps, RedirectBlockState } from './type';

const Metadata = ({url}) => {
    const {editPost} = useDispatch('core/editor');

    if (url) {
        editPost({meta: {redirect_url: url}})
    }
    const redirect_url = useSelect((select) => {
        // @ts-ignore
        const meta= select('core/editor').getEditedPostAttribute('meta')
        if (meta){
            return meta.redirect_url
        }
        return null;
    }, []);
    
    return <h4 style={{"color": "#c66061"}}> {__("This page redirects to:","dg")} {redirect_url} </h4>
}


class BlockEdit extends ComponentWithSettings<RedirectBlockProps, RedirectBlockState> {

    constructor(props: RedirectBlockProps) {
        super(props);
        this.state = {results: [], search: ""}
        this.search = this.search.bind(this)
    }

    search(e, search: SearchResult) {
        this.setState({search: search.value})
        apiFetch<SearchResults>({path: '/wp/v2/search?per_page=10&search=' + search.value}).then((posts) => {

            this.setState({results: posts});
        });
    }

    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        const {isSelected, setAttributes, attributes: {redirect_url}} = this.props;


        const resultRenderer = ({type, subtype, url, title}) => {
            return <div><span>{subtype} -&gt; </span><span dangerouslySetInnerHTML={{ __html: title }} ></span><br></br>
                <a onClick={(e) => false}>{url}</a></div>
        }


        return (
            <div className={"viz redirect"}>
                {isSelected ? <Search
                    fluid={true}
                    icon={false}
                    placeholder={redirect_url ? redirect_url : 'Search...'}
                    onResultSelect={(e, data) => {

                        setAttributes({"redirect_url": data.result.url})
                    }}
                    resultRenderer={(data) => resultRenderer(data as SearchResult)}
                    onSearchChange={(e, data) => this.search(e, data as SearchResult)}
                    results={this.state.results}

                /> : null}

                <Metadata url={redirect_url ?redirect_url : ''}></Metadata>
            </div>
        );
    }
}


const Edit = (props) => {
    const blockProps = useBlockProps();
    return <div {...blockProps}><BlockEdit {...props}/></div>;
}

export default Edit;