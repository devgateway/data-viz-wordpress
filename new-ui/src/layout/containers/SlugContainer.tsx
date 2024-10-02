import PageConsumer from '@devgateway/wp-react-lib/dist/consumers/PageConsumer';
import PageProvider from '@devgateway/wp-react-lib/dist/providers/PageProvider';
import React from 'react'
import { useParams } from 'react-router-dom';
import ***REMOVED*** from '../***REMOVED***';
import Page from '@devgateway/wp-react-lib/dist/templates/Page';
import Helmet from '@/Helmet';

const SlugContainer = () => {
    const { locale, slug } = useParams();
    return (
        <PageProvider
            locale={locale}
            slug={slug}
            store={slug}>
            <***REMOVED***>
                <PageConsumer>

                    {/* <Helmet locale={locale}></Helmet> */}
                    <Page></Page>
                </PageConsumer>
            </***REMOVED***>
        </PageProvider>
    )
}

export default SlugContainer