import React from 'react'
import ***REMOVED*** from "../***REMOVED***";

import data from './reducers/data'
import embeddable from './reducers/embeddable'
import {injectIntl} from "react-intl";

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
const Body = ***REMOVED***(() => import("./body/"));
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

export const reducers = {
    data,
    embeddable
}


const components = {
    pageGallery: PageGallery,
    postsCarousel: PostsCarousel,
    chart: Chart,
    filter: Filter,
    showCaseForm: ShowcaseForm,
    newsLetter: NewsLetter,
    body: Body,
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
    newTimeLine:NewTimeLine,
    measures: Measures

}

export const getComponentByNameIgnoreCase = (name) => {
    const k = Object.keys(components).filter(value => value.toLowerCase() == name.toLowerCase())
    return injectIntl(components[k])
}
