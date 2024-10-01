import React from 'react'
import { useParams } from 'react-router-dom';
import ***REMOVED*** from '../***REMOVED***';
import PostProvider from '@devgateway/wp-react-lib/dist/providers/PostProvider';
import PostConsumer from '@devgateway/wp-react-lib/dist/consumers/PostConsumer';
import Post from '@devgateway/wp-react-lib/dist/templates/Post';


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