import React, {useEffect, useState} from "react";
import {
    ***REMOVED***,
    ***REMOVED***
} from "@devgateway/wp-react-lib";
import {injectIntl} from "react-intl";
import {utils} from "@devgateway/wp-react-lib";
import ***REMOVED*** from "./***REMOVED***.jsx";


const ***REMOVED*** = injectIntl(({
                                       ID,
                                       title,
                                       slug,
                                       parent_title,
                                       parent_slug,
                                       parent_link,
                                       extract,
                                       type,
                                       link,
                                       terms,
                                       subtype,
                                       bread_crumbs = [],
                                       metadata: {redirect_url},
                                       intl: {locale}
                                   }) => {


    let target = parent_link ? utils.replaceLink(parent_link, locale) + `#${slug}` : utils.replaceLink(link, locale)
    target = redirect_url ? redirect_url + `#${slug}` : target



    return (
        <div className={"has-standard-12-font-size"} onClick={e => document.location.href = target}>
            <h5>{bread_crumbs && bread_crumbs.length > 0 ? `${bread_crumbs.join(' / ')}` : ''} </h5>
            <div className={"has-standard-14-font-size"}><h4>{title}</h4></div>
            <div className='search-content' dangerouslySetInnerHTML={{__html: utils.***REMOVED***(extract, locale)}}/>
            <br/>
        </div>
    )
})

const replaceString = (content, words) => {
    const regex = RegExp(words, 'gi')
    let newHTML = content
    const instances = [...(newHTML.matchAll(regex))]
    let shift = 0
    const ***REMOVED*** = newHTML.length
    instances.forEach(instance => {
        const replacement = '<b>' + newHTML.substring(instance.index + shift, instance.index + shift + words.length) + '</b>';
        newHTML = newHTML.substring(0, instance.index + shift) + replacement + newHTML.substring(instance.index + words.length + shift);
        shift = newHTML.length - ***REMOVED***;
    })

    return newHTML;
}

const ***REMOVED*** = (words) => {
    let searchedPara = document.querySelector('.results');
    const ***REMOVED*** = searchedPara = searchedPara = document.***REMOVED***('H5')
    const searchResult = searchedPara = searchedPara = document.***REMOVED***('.search-content')
    for (let i = 0; i < searchResult.length; i++) {
        if (searchResult[i]) {
            searchResult[i].innerHTML = replaceString(searchResult[i].textContent, words);
        }
    }

    for (let i = 0; i < ***REMOVED***.length; i++) {
       if (***REMOVED***[i]) {
            ***REMOVED***[i].innerHTML = replaceString(***REMOVED***[i].textContent, words);
      }
    }
}


const SearchControl = ({onSearch,perPage, loading, results, meta, locale}) => {
    const total = meta ? meta['x-wp-total'] : 0
    const totalPages = meta ? meta['x-wp-totalpages'] : 0

    const placeholder = locale === 'fr' ? 'Recherche...' : 'Search...';

    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        const ***REMOVED*** = setTimeout(() => {
            onSearch(searchTerm)
        }, 300)

        return () => clearTimeout(***REMOVED***)
    }, [searchTerm])


    useEffect(() => ***REMOVED***(searchTerm), [results])

    return (<***REMOVED***
            value={searchTerm}
            loading={loading}
            placeholder={placeholder}
            ***REMOVED***={(e, data) => null}
            total={total}
            perPage={perPage}
            totalPages={totalPages}
            ***REMOVED***={(a, b) => {
                setSearchTerm(b.value)
            }}
            ***REMOVED***={***REMOVED***}
            ***REMOVED***={***REMOVED***}
            results={results}
            showNoResults={false}

        />
    )
}

const ***REMOVED*** = injectIntl((props) => {
    const {intl} = props
    const [query, setQuery] = useState("")
    return (<***REMOVED*** search={query} perPage={5} locale={intl.locale}>
        <***REMOVED***>
            <SearchControl  onSearch={setQuery}  perPage={5}></SearchControl>
        </***REMOVED***>
    </***REMOVED***>)
})


export default ***REMOVED***
