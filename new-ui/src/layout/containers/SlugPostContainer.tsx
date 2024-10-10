import React from 'react'
import { useParams } from 'react-router-dom';
import ***REMOVED*** from '../***REMOVED***';
import {
    PostProvider,
    PostConsumer,
    Post
} from "@devgateway/wp-react-lib"


const ***REMOVED*** = () => {
    const { locale, slug } = useParams();
    return (
        <***REMOVED***>
            <PostProvider
                slug={slug}
                store={slug}
                locale={locale}
            >
                <PostConsumer>
                    <Post></Post>
                </PostConsumer>
            </PostProvider>
        </***REMOVED***>
    )
}

export default ***REMOVED***
