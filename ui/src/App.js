import React, {Component, createRef, useEffect, useRef, useState} from 'react';
import {Provider} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router' // react-router v4/v5
import {***REMOVED***} from 'connected-react-router/immutable'
import getStore, {history} from './redux/store'
import messages_en from "./translations/en.json";
import {updateIntl} from 'react-intl-redux'
import {injectIntl, IntlProvider} from "react-intl";
import smoothscroll from 'smoothscroll-polyfill';
import ***REMOVED*** from './layout'
import {getComponentByNameIgnoreCase} from "./embeddable";
import Helmet from './Helmet'
import WithTracker from "./withTracker";
import {
    ***REMOVED***,
    Category,
    Page,
    PageConsumer,
    PageProvider,
    Post,
    PostConsumer,
    PostProvider,
    ***REMOVED***,
    ***REMOVED***
} from "@devgateway/wp-react-lib";
import queryString from "query-string";
import ScrollToTop from "./ScrollTop";
import {Container, Segment} from "semantic-ui-react";
import ***REMOVED*** from "./layout/Customizer";

const store = getStore();

// kick off the polyfill!
smoothscroll.polyfill();

const messages = {
    'en': messages_en
};


const PreviewComponentParameterParser = (props) => {


    const componentRef = useRef(getComponentByNameIgnoreCase(props.match.params.name))

    const UIComponent = componentRef.current


    const [params, setParams] = useState(queryString.parse(props.location.search))
    const readMessage = (event) => {
        console.log("-------------------------------reading message ----------------------------------------")
        const data = event.data
        if (data.messageType && data.messageType == 'component-attributes') {

            const newPrams = {...params}
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
            window.parent.postMessage({type: "***REMOVED***", value: true}, "*")
        }
        return () => {
            window.***REMOVED***('message', readMessage);
        };


    }, [])


    return (<Container fluid={true} className={"editing"}>
        {UIComponent ? <UIComponent  {...params} editing={true}></UIComponent> :
            <Segment color={"red"} textAlign={"center"}><h1>Wrong Component Name</h1></Segment>}
    </Container>)

}

const InjectTitle = injectIntl((props) => {

    //description
    document.title = props.settings.description
    console.log(props.settings)
    return <></>
})

class IntlRoutes extends Component {

    constructor(props) {
        super(props);
    }

    ***REMOVED***() {
        console.log("----------.env-----------")
        console.log(process.env)
        console.log("----------.env-----------")
        window.setTimeout(() => {
                if (window.location.hash) {
                    const element = document.***REMOVED***(window.location.hash.substr(1));
                    if (element) {
                        element.***REMOVED***({behavior: "auto", block: "start"});
                    }
                }
            }, 2000
        )

        const locale = this.props.match.params.lan
        store.dispatch(updateIntl({locale, messages: messages[this.props.match.params.lan]}))

    }

    ***REMOVED***() {
        const locale = this.props.match.params.lan
        store.dispatch(updateIntl({locale, messages: messages[locale]}))
    }

    render() {
        const self = this;
        const props = this.props;
        const locale = this.props.match.params.lan

        const urlParams = new ***REMOVED***(window.location.search);
        const customize_changeset_uuid = urlParams.get('customize_changeset_uuid');
        window.***REMOVED*** = customize_changeset_uuid != null
        return (
            <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
                <***REMOVED*** getComponent={getComponentByNameIgnoreCase} store={store} locale={locale}>
                    <***REMOVED*** locale={locale} changeUUID={customize_changeset_uuid}>
                        <ScrollToTop/>
                        <***REMOVED***>
                            <***REMOVED***>
                                <InjectTitle/>
                            </***REMOVED***>
                        </***REMOVED***>
                        <Switch>
                            {
                                //Category Route
                            }
                            <Route path="/:lan/category/:slug/">
                                <***REMOVED***>
                                    <Category/>
                                </***REMOVED***>
                            </Route>
                            {
                                //default route (home)
                            }
                            <Route path="/:lan" exact render={props => (
                                <PageProvider
                                    slug={"home"}
                                    locale={locale}
                                    store={"home"}>
                                    <PageConsumer>
                                        <***REMOVED***>
                                            <PageConsumer>
                                                <Helmet></Helmet>
                                                <Page></Page>
                                            </PageConsumer>
                                        </***REMOVED***>
                                    </PageConsumer>
                                </PageProvider>

                            )}>
                            </Route>
                            <Route exact={true} path="/:lan/embeddable/:name" render={(props) =>
                                <***REMOVED***>
                                  <PreviewComponentParameterParser  {...props}></PreviewComponentParameterParser>
                                </***REMOVED***>}>
                            </Route>


                            <Route path={"/:lan/preview/page/:id"} exact render={props => {

                                const searchParams = new ***REMOVED***(props.location.search)
                                const preview = searchParams.get("preview")
                                const previewNonce = searchParams.get("_wpnonce")
                                return (
                                    <***REMOVED***>
                                        <PageProvider store={"preview"} perPage={1} view={preview}
                                                      previewNonce={previewNonce} previewId={props.match.params.id}>
                                            <PageConsumer>

                                                <Page preview={true}/>
                                            </PageConsumer>

                                        </PageProvider>
                                    </***REMOVED***>
                                )
                            }}>
                            </Route>

                            <Route path={"/:lan/preview/:type/:id"} exact render={props => {

                                const searchParams = new ***REMOVED***(props.location.search)
                                const preview = searchParams.get("preview")
                                const type = props.match.params.type == 'post' ? 'posts' : props.match.params.type
                                const previewNonce = searchParams.get("_wpnonce")
                                return (
                                    <***REMOVED***>
                                        <PostProvider type={type}
                                                      store={"preview"}
                                                      perPage={1}
                                                      view={preview}
                                                      locale={props.match.params.lan}
                                                      previewNonce={previewNonce}
                                                      previewId={props.match.params.id}>
                                            <PostConsumer>
                                                <Post preview={true} showIntro={true}/>
                                            </PostConsumer>

                                        </PostProvider>
                                    </***REMOVED***>
                                )
                            }}>
                            </Route>
                            {
                                //page route
                            }
                            <Route path="/:lan/:slug/" exact render={props => {

                                return (

                                    <PageProvider
                                        locale={locale}
                                        slug={props.match.params.slug}
                                        store={props.match.params.slug}>
                                        <***REMOVED***>
                                            <PageConsumer>
                                                <Helmet></Helmet>
                                                <Page></Page>
                                            </PageConsumer>
                                        </***REMOVED***>
                                    </PageProvider>
                                )
                            }}>
                            </Route>
                            {
                                //child route
                            }
                            <Route path="/:lan/:parent/:slug/" exact render={props => (
                                <PageProvider
                                    locale={locale}
                                    slug={props.match.params.slug}
                                    store={props.match.params.slug}>
                                    <***REMOVED***>
                                        <PageConsumer>

                                            <Helmet></Helmet>
                                            <Page></Page>
                                        </PageConsumer>
                                    </***REMOVED***>
                                </PageProvider>

                            )}>


                            </Route>


                            <Route path="/:lan/:year/:month/:day/:slug/" exact render={props => (
                                <***REMOVED***>
                                    <PostProvider
                                        slug={props.match.params.slug}
                                        store={props.match.params.slug}
                                        locale={locale}
                                    >
                                        <PostConsumer>
                                            <Post></Post>
                                        </PostConsumer>
                                    </PostProvider>
                                </***REMOVED***>
                            )}>
                            </Route>
                            <Route path="/:lan/:parent/:year/:month/:day/:slug/" exact render={props => (

                                <***REMOVED***>

                                    <PostProvider
                                        type={props.match.params.parent}
                                        slug={props.match.params.slug}
                                        store={props.match.params.slug}
                                        locale={locale}>
                                        <PostConsumer>
                                            <Post></Post>
                                        </PostConsumer>
                                    </PostProvider>
                                </***REMOVED***>
                            )}>
                            </Route>

                        </Switch>
                    </***REMOVED***>
                </***REMOVED***>

            </IntlProvider>)
    }
}


const ***REMOVED*** = WithTracker(IntlRoutes)


const MainRoutes = (props) => {
    return (<***REMOVED*** history={history}>

        <Switch>
            <Route path="/:lan" render={(props) => <***REMOVED*** {...props}/>}/>
            <Route path={"/"}>
                <Redirect
                    to={process.env.REACT_APP_DEFAULT_LOCALE ? process.env.REACT_APP_DEFAULT_LOCALE : "en"}></Redirect>
            </Route>

        </Switch>

    </***REMOVED***>)
}

class AppWrapper
    extends Component {
    render() {
        return (<Provider store={store}>
            <MainRoutes/>
        </Provider>);
    }
}

export default AppWrapper;
