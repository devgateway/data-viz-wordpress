import React from 'react'
import ***REMOVED*** from '@/layout/***REMOVED***';
import {
    PageProvider,
    PageConsumer,
    Page
} from "@devgateway/wp-react-lib"
import { useLocation, useParams } from 'react-router-dom'

const ***REMOVED*** = () => {
    const location = useLocation();
    const { id } = useParams();

    const searchParams = new ***REMOVED***(location.search)
    const preview = searchParams.get("preview")
    const previewNonce = searchParams.get("_wpnonce")
    return (
        <***REMOVED***>
            <PageProvider store={"preview"} perPage={1} view={preview}
                previewNonce={previewNonce} previewId={id}>
                <PageConsumer>
                    <Page preview={true} />
                </PageConsumer>

            </PageProvider>
        </***REMOVED***>

    )
}

export default ***REMOVED***
