import React, { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux'
import { Route, Routes, BrowserRouter, Navigate, useLocation, useParams, ***REMOVED***, createRoutesFromElements, ***REMOVED*** } from 'react-router-dom';
import { store } from './redux/store'
import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";
import messages_am from './translations/af.json';
import { updateIntl } from '@/lib/react-intl-redux'
import { injectIntl, IntlProvider, useIntl } from "react-intl";
import ***REMOVED*** from './layout'
import { getComponentByNameIgnoreCase } from "./embeddable";
import Helmet from './Helmet'
// import WithTracker from "./withTracker";
import {
    ***REMOVED***,
    Category,
    Page,
    PageConsumer,
    PageProvider,
    ***REMOVED***,
    ***REMOVED***
} from "@devgateway/wp-react-lib";
import queryString from "query-string";
import ScrollToTop from "./ScrollTop";
import { Container, Segment } from "semantic-ui-react";
import ***REMOVED*** from "./layout/Customizer";
import ***REMOVED*** from './layout/containers/***REMOVED***';
import ***REMOVED*** from './layout/containers/***REMOVED***';
import SlugContainer from './layout/containers/SlugContainer';
import ***REMOVED*** from './layout/containers/***REMOVED***';
import withTracker from './withTracker';
import { Config } from './conf';

const messages = {
    'en': messages_en,
    'fr': messages_fr,
    'am': messages_am
};

const PreviewComponentParameterParser = () => {
    const urlParams = useParams();
    const location = useLocation();

    const [UIComponent] = useState(() => getComponentByNameIgnoreCase(urlParams.name ? urlParams.name : ''));


    const [params, setParams] = useState(queryString.parse(location.search))
    const readMessage = (event) => {
        console.log("-------------------------------reading message ----------------------------------------")
        const data = event.data
        if (data.messageType && data.messageType == 'component-attributes') {

            const newPrams = { ...params }
            Object.keys(data).forEach(k => {
                newPrams["data-" + k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()] = typeof data[k] == 'object' ? JSON.stringify(data[k]) : data[k]
            })
            console.log(newPrams)
            setParams(newPrams)
        }
    };


    useEffect(() => {
        window.***REMOVED***("message", readMessage, false);
        if (window.parent) {
            window.parent.postMessage({ type: "***REMOVED***", value: true }, "*")
        }
        if (window.top) {
            window.top.postMessage({ type: "***REMOVED***", value: true }, "*")
        }
        return () => {
            window.***REMOVED***('message', readMessage);
        };
    }, []);

    return (
        <div>
            <Container fluid={true} className={"editing"}>
                {/* @ts-ignore */}
                {UIComponent ? <UIComponent  {...params} editing={true} /> :
                    <Segment.Group color={"red"} textAlign={"center"}><h1>Wrong Component Name</h1></Segment.Group>}
            </Container>

        </div>

    )

}

const InjectTitle = injectIntl((props) => {

    // @ts-expect-error description
    document.title = props.settings.description
    console.log(props)
    return <></>
});


const TrackedRoutes = withTracker(({ children, locale }: { children: any, locale: string }) => {
    return (
        <>
            <ScrollToTop />
            <***REMOVED***>
                <InjectTitle />
            </***REMOVED***>
            <Routes>
                {/* <Route path="/" element={<Outlet />} /> */}
                {
                    //Category Route
                }
                <Route path="/category/:slug/" element={
                    <***REMOVED***>
                        <Category />
                    </***REMOVED***>
                }>
                </Route>
                {
                    //default route (home)
                }

                <Route path="/" element={(
                    <PageProvider
                        slug={"home"}
                        locale={locale}
                        store={"home"}>
                        <PageConsumer>
                            <***REMOVED*** locale={locale}>
                                <PageConsumer>
                                    <Page />
                                    <Helmet locale={locale} />
                                </PageConsumer>
                            </***REMOVED***>
                        </PageConsumer>
                    </PageProvider>
                )}>
                </Route>
                <Route path="embeddable/:name" element={
                    <***REMOVED***>
                        <PreviewComponentParameterParser />
                    </***REMOVED***>}>
                </Route>

                <Route path={"preview/page/:id"} element={<***REMOVED*** />} />
                <Route path={"preview/:type/:id"} element={<***REMOVED*** />} />
                <Route path=":slug" element={<SlugContainer />} />
                <Route path=":parent/:slug" element={<SlugContainer />} />
                <Route path=":year/:month/:day/:slug" element={<***REMOVED*** />} />
                <Route path=":parent/:year/:month/:day/:slug" element={<***REMOVED*** />} />
            </Routes>
        </>
    )
});

const IntlRoutes = () => {
    const pathParams = useParams();
    const defaultLocale = Config.DEFAULT_LOCALE;
    const locale = pathParams.lan;

    useEffect(() => {
        if (process.env) {
            console.log("----------.env-----------");
            console.log(process.env);
            console.log("----------.env-----------");
        }


        window.setTimeout(() => {
            if (window.location.hash) {
                const element = document.***REMOVED***(window.location.hash.substr(1));
                if (element) {
                    element.***REMOVED***({ behavior: "auto", block: "start" });
                }
            }
        }, 2000);
    }, []);

    useEffect(() => {
        // This effect runs on every update, equivalent to ***REMOVED***
        store.dispatch(updateIntl({ locale, formats: {}, messages: messages[locale ? locale : 'en'] }));
    }, []);

    const urlParams = new ***REMOVED***(window.location.search);
    const customize_changeset_uuid = urlParams.get('customize_changeset_uuid');


    useEffect(() => {
        // @ts-ignore
        window.***REMOVED*** = customize_changeset_uuid != null;
    }, [customize_changeset_uuid]);


    if (!locale) {
        return <Navigate to={defaultLocale}></Navigate>
    }

    return (
        <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
            <***REMOVED*** getComponent={getComponentByNameIgnoreCase} store={store} locale={locale}>
                <***REMOVED*** locale={locale} changeUUID={customize_changeset_uuid}>
                    <***REMOVED***>
                        <TrackedRoutes locale={locale} />
                    </***REMOVED***>
                </***REMOVED***>
            </***REMOVED***>
        </IntlProvider>
    );
};


const router = ***REMOVED***(
    createRoutesFromElements(
        <Route>
            <Route path="/:lan/*" element={<IntlRoutes />} />
            <Route path={"/"} element={<IntlRoutes />} />
        </Route>
    )
)

const MainRoutes = () => {

    return (
        <***REMOVED*** router={router} />
    )
}

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <MainRoutes />
        </Provider>
    );
};

export default AppWrapper;
