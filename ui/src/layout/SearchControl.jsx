import React, { useEffect, useState } from "react";
import * as ReactDOM from 'react-dom/client';
import { utils, ***REMOVED***, ***REMOVED*** } from "@devgateway/wp-react-lib";
import ***REMOVED*** from "./***REMOVED***";
import { Icon } from "semantic-ui-react";
import { IntlProvider, injectIntl } from "react-intl";

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
  intl: { locale }
}) => {


  let target = parent_link ? utils.replaceLink(parent_link, locale) + `#${slug}` : utils.replaceLink(link, locale)
  // target = metadata?.redirect_url ? redirect_url + `#${slug}` : target


  return (
    <div className="search-results-wrapper searching-results" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={"has-standard-12-font-size"} onClick={e => document.location.href = target}>
        <h5 className="breadcrumbs-search">{bread_crumbs && bread_crumbs.length > 0 ? `${bread_crumbs.join(' / ')}` : ''} </h5>
        <div className={"has-standard-14-font-size"}><h4 className="search-title">{title}</h4></div>
        <div className='search-content'
          dangerouslySetInnerHTML={{ __html: utils.***REMOVED***(extract, locale) }} />

      </div>
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


const SearchControl = ({ onSearch, perPage, loading, results, meta, intl }) => {
  const total = meta ? meta['x-wp-total'] : 0
  const totalPages = meta ? meta['x-wp-totalpages'] : 0

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
    placeholder={intl.formatMessage({ id: 'search.placeholder', ***REMOVED***: 'Search...' })}
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
    intl={intl}
  />
  )
}

const ***REMOVED*** = ({ onSearch, perPage, loading, results, meta, intl }) => {
  const total = meta ? meta['x-wp-total'] : 0
  const totalPages = meta ? meta['x-wp-totalpages'] : 0

  return <input placeholder={intl.formatMessage({ id: 'search.placeholder', ***REMOVED***: 'Search...' })}
    type={"text"}
    className={"input search"}
    name={"search"}
    onChange={e => { onSearch(e.target.value) }}
  />
}

const ***REMOVED*** = ({ results, meta, perPage, intl }) => {
  const total = meta ? meta['x-wp-total'] : 0
  const totalPages = meta ? meta['x-wp-totalpages'] : 0

  useEffect(() => {
    const searchWords = document.querySelector(".input.search").value;
    ***REMOVED***(searchWords);
  }, [results]);


  return (
    <div>
      <span className="float-results-header">
        {intl.formatMessage({ id: 'search.results.summary', ***REMOVED***: "{count} of {total} Results" }, { count: total < perPage ? total : perPage, total: total })}
      </span>
      {results.map((r) => (
        <***REMOVED*** {...r} />
      ))}
    </div>
  );
};

const FloatingSearchController = ({ onSearch, onSetSelected, perPage, loading, results, meta, locale, intl }) => {
  const [***REMOVED***, ***REMOVED***] = useState(false)

  const show = () => {
    onSetSelected(null);
    ***REMOVED***(true)
  }
  const hidde = (e) => {

    ***REMOVED***(false)
  }

  const addListenerToHeaderElements = () => {
    const ***REMOVED*** = document.getElementsByClassName("has-child-items")
    if (***REMOVED***.length > 0) {
      const itemElement = ***REMOVED***[0]
      const spans = itemElement.***REMOVED***("span")
      if (spans.length > 0) {
        spans[0].***REMOVED***("mouseover", hidde);
      }
    }

  }
  const removeListenerToHeaderElements = () => {
    const ***REMOVED*** = document.getElementsByClassName("has-child-items")
    if (***REMOVED***.length > 0) {
      const itemElement = ***REMOVED***[0]
      const spans = itemElement.***REMOVED***("span")
      if (spans.length > 0) {
        spans[0].***REMOVED***("mouseover", hidde);
      }
    }
  }

  useEffect(() => {
    if (***REMOVED***) {
      addListenerToHeaderElements();
      let element = document.***REMOVED***("float-input-container")
      if (element) {
        element.style.display = "block"
      } else {
        element = document.***REMOVED***("root").appendChild(document.createElement('div'));
        element.setAttribute("id", "float-input-container")
        element.setAttribute("class", "input container")
        element.onmouseleave = () => { hidde() }

      }
      ReactDOM.createPortal(<***REMOVED***
        onSearch={onSearch}
        perPage={perPage}
        loading={loading}
        results={results}
        meta={meta}
        intl={intl}>
      </***REMOVED***>,
        document.***REMOVED***("float-input-container"))

    } else {
      if (document.***REMOVED***("float-input-container")) {
        removeListenerToHeaderElements()
        const ***REMOVED*** = document.***REMOVED***("float-input-container")
        ***REMOVED***.style.display = "none"
      }
    }
  }, [***REMOVED***])
  useEffect(() => {
    if (results && results.length > 0) {

      let element = document.***REMOVED***("float-results-container")

      if (!element) {
        element = document.***REMOVED***("float-input-container").appendChild(document.createElement('div'))
        element.setAttribute("id", "float-results-container")
        element.setAttribute("class", "results container")
        element.setAttribute("class", "results container")
        //element.onmouseleave = () => {hidde()}
      }
      const element2 = document.***REMOVED***("ui-float-search")
      element2.classList.add("ui-float-search-active")

      ReactDOM.createPortal((<IntlProvider locale={locale}>

        <***REMOVED*** results={results} meta={meta} perPage={perPage} intl={intl} />


      </IntlProvider>),
        document.***REMOVED***("float-results-container"))

    }

  }, [meta, results])


  useEffect(() => {
    if (***REMOVED***) {
      const element = document.***REMOVED***("ui-float-search")
      element.classList.add('ui-float-search-active')
    } else {
      const element = document.***REMOVED***("ui-float-search")
      element.classList.remove('ui-float-search-active')
    }
  }
  )

  return <div id={"ui-float-search"}
    className={"ui float-search"}
    onMouseOver={e => show()}>
    {/*{results?results.length:0}*/}
    <Icon name={"search"} size={"small"}></Icon>
  </div>

}


const ***REMOVED*** = injectIntl((props) => {
  const { intl, onSetSelected } = props
  const [query, setQuery] = useState("")

  const [isSmallScreen, ***REMOVED***] = useState(false); // State to track small screen
  useEffect(() => {
    // Function to update isSmallScreen state
    const ***REMOVED*** = () => {
      ***REMOVED***(window.innerWidth <= 1365); // Check if width is 1365px or lower
    };

    // Initial check
    ***REMOVED***();

    // Event listener for window resize
    window.***REMOVED***('resize', ***REMOVED***);

    // Cleanup
    return () => window.***REMOVED***('resize', ***REMOVED***);
  }, []);


  const component = (props.settings.react_search_type === 'floating' || isSmallScreen) ?
    <FloatingSearchController onSetSelected={onSetSelected} onSearch={setQuery} perPage={5} {...props} /> :
    <SearchControl onSetSelected={onSetSelected} onSearch={setQuery} perPage={5} {...props}></SearchControl>
  return (<***REMOVED*** search={query} perPage={5} locale={intl.locale}>
    <***REMOVED***>
      {component}
    </***REMOVED***>
  </***REMOVED***>)
})


export default ***REMOVED***