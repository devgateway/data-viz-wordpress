import React from 'react'
import ***REMOVED*** from "../***REMOVED***";
import data from './reducers/data'
import embeddable from './reducers/embeddable'
import {injectIntl} from "react-intl";
import * as customizer from "@devgateway/customizer";
const TabbedPosts = ***REMOVED***(() => import("./tabbedposts/"));
const PostsCarousel = ***REMOVED***(() => import("./postscarousel/"));
const PageGallery = ***REMOVED***(() => import("./pagegallery/"));
const PageModules = ***REMOVED***(() => import("./pagemodules/"));
const FeaturedTabs = ***REMOVED***(() => import("./featuredtabs/"));
const ***REMOVED*** = ***REMOVED***(() => import("./vertical-featuredtabs/"));
const InlineList = ***REMOVED***(() => import("./inlinelist/"));
const Chart = ***REMOVED***(() => import("./chart/"));
const NewsLetter = ***REMOVED***(() => import("./newsletter/"));
const ShowcaseForm = ***REMOVED***(() => import("./showcase/"));
const Filter = ***REMOVED***(() => import("./filter/"));
const Download = ***REMOVED***(() => import("./download/"));
const DownloadPdf = ***REMOVED***(() => import('./downloadPDF/'))
const Map = ***REMOVED***(() => import('./map/'))
const ***REMOVED*** = ***REMOVED***(() => import('./***REMOVED***/'))
const Tooltip = ***REMOVED***(() => import('./tooltip/'))
const ***REMOVED*** = ***REMOVED***(() => import('./references/***REMOVED***'))
const Reference = ***REMOVED***(() => import('./references/Reference'))
const TimeLine = ***REMOVED***(() => import('./time-line'))
const NewTimeLine = ***REMOVED***(() => import('./new-time-line'))
const Measures = ***REMOVED***(() => import('./measures'))
const Menu = ***REMOVED***(() => import('./menu'))
const ***REMOVED*** = ***REMOVED***(() => import('./child-page-menu'))
const NewMap = ***REMOVED***(() => import('./d3Map'))
const ***REMOVED*** = ***REMOVED***(() => import('./parallax/'))
const Wrapped = ***REMOVED***(() => import('./wrapped/'))
const SankeyChart = ***REMOVED***(() => import('./sankeychart/'))
const DataLabel = ***REMOVED***(() => import('./datalabel/'))
let reducerList = {data, embeddable}
if (customizer.Reducers) {
    reducerList = {...reducerList, ...customizer.Reducers}
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

export const getComponentByNameIgnoreCase = (name) => {

    const k = Object.keys(components).filter(value => value.toLowerCase() == name.toLowerCase())
    if (k.length > 0) {
        return injectIntl(components[k])
    } else {
        const ***REMOVED*** = customizer.getComponentByNameIgnoreCase(name)
        if (***REMOVED***) {
            return injectIntl(***REMOVED***)
        }
    }
}
