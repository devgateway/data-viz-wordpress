import React, { useEffect, useState, useRef } from "react";
import { utils, ***REMOVED***, ***REMOVED*** } from "@devgateway/wp-react-lib";
import ***REMOVED*** from "./***REMOVED***";
import { createPortal } from "react-dom";
import { Icon } from "semantic-ui-react";
import { IntlProvider, injectIntl } from "react-intl";

// Utility function to highlight search terms
const ***REMOVED*** = (text, term) => {
  if (!term || !text) return text;
  const regex = new RegExp(`(${term})`, "gi");
  return text.replace(regex, "<b>$1</b>");
};

// ***REMOVED*** component with highlighting
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
  metadata: { redirect_url },
  intl: { locale },
  searchTerm, // Added searchTerm prop
}) => {
  let target = parent_link
    ? utils.replaceLink(parent_link, locale) + `#${slug}`
    : utils.replaceLink(link, locale);
  target = redirect_url ? redirect_url + `#${slug}` : target;

  return (
    <div
      className="search-results-wrapper searching-results"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        className={"has-standard-12-font-size"}
        onClick={(e) => (document.location.href = target)}
      >
        <h5
          className="breadcrumbs-search"
          dangerouslySetInnerHTML={{
            __html:
              bread_crumbs && bread_crumbs.length > 0
                ? ***REMOVED***(bread_crumbs.join(" / "), searchTerm)
                : "",
          }}
        />
        <div className={"has-standard-14-font-size"}>
          <h4
            className="search-title"
            dangerouslySetInnerHTML={{
              __html: ***REMOVED***(title, searchTerm),
            }}
          />
        </div>
        <div
          className="search-content"
          dangerouslySetInnerHTML={{
            __html: utils.***REMOVED***(
              ***REMOVED***(extract, searchTerm),
              locale
            ),
          }}
        />
      </div>
    </div>
  );
}
);

// ***REMOVED*** component with highlighting
const ***REMOVED*** = ({ results, meta, perPage, intl, searchTerm }) => {
  const total = meta ? meta["x-wp-total"] : 0;
  const totalPages = meta ? meta["x-wp-totalpages"] : 0;

  return (
    <div id="float-results-container">
      <span className="float-results-header">
        {intl.formatMessage(
          {
            id: "search.results.summary",
            ***REMOVED***: "{count} of {total} Results",
          },
          { count: total < perPage ? total : perPage, total: total }
        )}
      </span>
      {results.map((r) => (
        <***REMOVED*** key={r.ID} {...r} searchTerm={searchTerm} />
      ))}
    </div>
  );
};

// ***REMOVED*** component
const ***REMOVED*** = ({
  onSearch,
  perPage,
  loading,
  results,
  meta,
  intl,
}) => {
  const total = meta ? meta["x-wp-total"] : 0;
  const totalPages = meta ? meta["x-wp-totalpages"] : 0;

  return (
    <input
      placeholder={intl.formatMessage({
        id: "search.placeholder",
        ***REMOVED***: "Search...",
      })}
      type={"text"}
      className={"input search"}
      name={"search"}
      onChange={(e) => {
        onSearch(e.target.value);
      }}
    />
  );
};

// FloatingSearchController component
const FloatingSearchController = ({
  onSearch,
  onSetSelected,
  perPage,
  loading,
  results,
  meta,
  locale,
  intl,
  search, // Added search from ***REMOVED***
}) => {
  const [***REMOVED***, ***REMOVED***] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const newContainer = document.createElement("div");
    newContainer.setAttribute("id", "float-input-container");
    newContainer.setAttribute("class", "input container");
    newContainer.style.display = "none"; // Hide container by default
    const rootElement = document.***REMOVED***("root");
    if (rootElement) {
      rootElement.appendChild(newContainer);
      containerRef.current = newContainer;
    }
    return () => {
      if (containerRef.current && containerRef.current.parentNode) {
        containerRef.current.parentNode.removeChild(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.display = ***REMOVED*** ? "block" : "none";
    }
  }, [***REMOVED***]);

  const show = () => {
    onSetSelected(null);
    ***REMOVED***(true);
  };

  const hide = () => {
    ***REMOVED***(false);
  };

  return (
    <>
      <div
        id="ui-float-search"
        className="ui float-search"
        onMouseOver={show}
      >
        <Icon name="search" size="small" />
      </div>
      {containerRef.current &&
        createPortal(
          ***REMOVED*** ? (
            <div onMouseLeave={hide}>
              <div className="float-search-container">
                <***REMOVED***
                  onSearch={onSearch}
                  perPage={perPage}
                  loading={loading}
                  results={results}
                  meta={meta}
                  intl={intl}
                />
              </div>
              {results && results.length > 0 && (
                <IntlProvider locale={locale}>
                  <***REMOVED***
                    results={results}
                    meta={meta}
                    perPage={perPage}
                    intl={intl}
                    searchTerm={search} // Pass search term
                  />
                </IntlProvider>
              )}
            </div>
          ) : null,
          containerRef.current
        )}
    </>
  );
};

// SearchControl component
const SearchControl = ({ onSearch, perPage, loading, results, meta, intl }) => {
  const total = meta ? meta["x-wp-total"] : 0;
  const totalPages = meta ? meta["x-wp-totalpages"] : 0;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const ***REMOVED*** = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(***REMOVED***);
  }, [searchTerm]);

  const enhancedResultRenderer = (props) => (
    <***REMOVED*** {...props} searchTerm={searchTerm} />
  );

  return (
    <***REMOVED***
      value={searchTerm}
      loading={loading}
      placeholder={intl.formatMessage({
        id: "search.placeholder",
        ***REMOVED***: "Search...",
      })}
      ***REMOVED***={(e, data) => null}
      total={total}
      perPage={perPage}
      totalPages={totalPages}
      ***REMOVED***={(a, b) => {
        setSearchTerm(b.value);
      }}
      ***REMOVED***={enhancedResultRenderer} // Use wrapper to pass searchTerm
      results={results}
      showNoResults={false}
      intl={intl}
      searchTerm={searchTerm}
    />
  );
};

// Main ***REMOVED***
const ***REMOVED*** = injectIntl((props) => {
  const { intl, onSetSelected } = props;
  const [query, setQuery] = useState("");
  const [isSmallScreen, ***REMOVED***] = useState(false); // Track small screen

  useEffect(() => {
    const ***REMOVED*** = () => {
      ***REMOVED***(window.innerWidth <= 1365); // Check if width is 1365px or lower
    };
    ***REMOVED***();
    window.***REMOVED***("resize", ***REMOVED***);
    return () => window.***REMOVED***("resize", ***REMOVED***);
  }, []);

  const component =
    props.settings.react_search_type === "floating" || isSmallScreen ? (
      <FloatingSearchController
        onSetSelected={onSetSelected}
        onSearch={setQuery}
        perPage={5}
        {...props}
      />
    ) : (
      <SearchControl
        onSetSelected={onSetSelected}
        onSearch={setQuery}
        perPage={5}
        {...props}
      />
    );

  return (
    <***REMOVED*** search={query} perPage={5} locale={intl.locale}>
      <***REMOVED***>{component}</***REMOVED***>
    </***REMOVED***>
  );
});

export default ***REMOVED***;