import React from 'react'
import ***REMOVED*** from '../***REMOVED***'
import {
    PostProvider,
    PostConsumer,
    Post
} from "@devgateway/wp-react-lib"
import { useParams, useLocation } from 'react-router-dom'

const ***REMOVED*** = () => {
    const location = useLocation();
    const props = useParams();

    const searchParams = new ***REMOVED***(location.search)
    const preview = searchParams.get("preview")
    const type = props.type == 'post' ? 'posts' : props.type;
    const previewNonce = searchParams.get("_wpnonce");

    return (
        <***REMOVED***>
            <PostProvider type={type}
                store={"preview"}
                perPage={1}
                view={preview}
                locale={props.lan}
                previewNonce={previewNonce}
                previewId={props.id}>
                <PostConsumer>
                    <Post preview={true} showIntro={true} />
                </PostConsumer>
            </PostProvider>
        </***REMOVED***>
    )
}

export default ***REMOVED***
