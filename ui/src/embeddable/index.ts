import React, { lazy } from 'react'
import data from './reducers/data'
import embeddable from './reducers/embeddable'
import { injectIntl } from "react-intl";
import * as customizer from "@devgateway/customizer";

// components
const PageGallery = lazy(() => import("./pagegallery"));
const Download = lazy(() => import("./download"));
const PostsCarousel = lazy(() => import("./postscarousel"));
const Chart = lazy(() => import("./chart"));
const Filter = lazy(() => import("./filter"));
const ShowcaseForm = lazy(() => import("./showcase"));
const NewsLetter = lazy(() => import("./newsletter"));
const TabbedPosts = lazy(() => import("./tabbedposts"));
const PageModules = lazy(() => import("./pagemodules"));
const FeaturedTabs = lazy(() => import("./featuredtabs"));
const ***REMOVED*** = lazy(() => import("./vertical-featuredtabs"));
const InlineList = lazy(() => import("./inlinelist"));
const DownloadPdf = lazy(() => import("./downloadPDF"));
const Map = lazy(() => import("./map"));
const ***REMOVED*** = lazy(() => import("./***REMOVED***"));
const Tooltip = lazy(() => import("./tooltip"));
const ***REMOVED*** = lazy(() => import("./references/***REMOVED***"));
const Reference = lazy(() => import("./references/Reference"));
const TimeLine = lazy(() => import("./time-line"));
const NewTimeLine = lazy(() => import("./new-time-line"));
const Measures = lazy(() => import("./measures"));
const Menu = lazy(() => import("./menu"));
const ***REMOVED*** = lazy(() => import("./child-page-menu"));
const NewMap = lazy(() => import("./d3Map"));
const ***REMOVED*** = lazy(() => import("./parallax"));
const Wrapped = lazy(() => import("./wrapped"));
const SankeyChart = lazy(() => import("./sankeychart"));
const DataLabel = lazy(() => import("./datalabel"));
const Body = lazy(() => import("./body"));

let reducerList = { data, embeddable };

if (customizer.Reducers) {
    reducerList = { ...reducerList, ...customizer.Reducers }
}

export const reducers = reducerList;

const components = {
    pageGallery: PageGallery,
    postsCarousel: PostsCarousel,
    chart: Chart,
    filter: Filter,
    showCaseForm: ShowcaseForm,
    newsLetter: NewsLetter,
    tabbedPosts: TabbedPosts,
    pageModules: PageModules,
    featuredTabs: FeaturedTabs,
    verticalTabs: ***REMOVED***,
    inlineList: InlineList,
    download: Download,
    downloadPdf: DownloadPdf,
    map: Map,
    ***REMOVED***: ***REMOVED***,
    tooltip: Tooltip,
    references: ***REMOVED***,
    reference: Reference,
    timeLine: TimeLine,
    newTimeLine: NewTimeLine,
    measures: Measures,
    menu: Menu,
    ***REMOVED***: ***REMOVED***,
    newMap: NewMap,
    ***REMOVED***: ***REMOVED***,
    wrapped: Wrapped,
    sankeyChart: SankeyChart,
    dataLabel: DataLabel,
    redirect: () => null
}

export const getComponentByNameIgnoreCase = (name: string) => {

    const k = Object.keys(components).find(value => value.toLowerCase() === name.toLowerCase())
    if (k) {
        return injectIntl(components[k])
    }
    else {
        const ***REMOVED*** = customizer.getComponentByNameIgnoreCase(name)
        if (***REMOVED***) {
            return injectIntl(***REMOVED***)
        }
    }
}
