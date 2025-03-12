import { Search, Segment, Input } from "semantic-ui-react";
import React from "react";
import clsx from "clsx";
import {
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    useKeyOnly,
    ***REMOVED***,
    ***REMOVED***
} from 'semantic-ui-react/dist/commonjs/lib'
import { injectIntl, useIntl } from "react-intl";
import { utils } from "@devgateway/wp-react-lib";


// type SearchProps = typeof Search;

// type ***REMOVED*** = SearchProps & React.HTMLProps<***REMOVED***>;

// interface ***REMOVED*** extends ***REMOVED*** {
//     ***REMOVED*** : React.ComponentType<any> | React.ReactNode | JSX.Element;
//     ***REMOVED*** : (event: React.***REMOVED***, data: any) => void;
//     value : string;
//     showNoResults : boolean;
//     ***REMOVED*** : (event: React.***REMOVED***, data: any) => void;
//     loading : boolean;
//     perPage : number;
//     total : number;
// }

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

    


    const target = parent_link ? utils.replaceLink(parent_link, locale) + `#${slug}` : utils.replaceLink(link, locale)
    // target = metadata?.redirect_url ? redirect_url + `#${slug}` : target


    return (
        <div className="search-results-wrapper searching-results" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={"has-standard-12-font-size"} onClick={e => document.location.href = target}>
                <h5 className="breadcrumbs-search">{Array.isArray(bread_crumbs) && bread_crumbs.length > 0 ? bread_crumbs.join(' / ') : ''}</h5>
                <div className={"has-standard-14-font-size"}><h4 className="search-title">{String(title)}</h4></div>
                <div className='search-content'
                    dangerouslySetInnerHTML={{ __html: utils.***REMOVED***(extract, locale) }} />
            </div>
        </div>
    )
})

const CustomSearch = (props) => {
    const { results, ***REMOVED***, ***REMOVED***, value, showNoResults, ***REMOVED***, loading, placeholder, perPage, total } = props;
    const intl = useIntl()
    const [searchClasses, ***REMOVED***] = React.useState('');
    const [focus, setFocus] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const ***REMOVED*** = results && results.length > 0
        ? [{
            isHeader: true, headerText: intl.formatMessage({
                id: 'search.results.summary',
                ***REMOVED***: '{count} of {} Results'
            }, {
                count: total < perPage ? total : perPage, total: total
            })
        }, ...results]
        : [];


    const renderHeader = () => {
        const { perPage, total } = props;

        const classes = clsx(
            'results header',
            total === 1 && 'single'
        );

        return (
            <Segment basic textAlign="left" className={classes}>
                {intl.formatMessage({
                    id: 'search.results.summary',
                    ***REMOVED***: '{count} of {} Results'
                }, {
                    count: total < perPage ? total : perPage, total: total
                })}
            </Segment>
        );
    };

    const renderResults = (res) => {
        console.log('res', res);

        if (res.isHeader) {
            return renderHeader();
        }

        return (
            <React.Fragment>
                <***REMOVED*** {...res} />
            </React.Fragment>
        );
    };

    const ***REMOVED*** = (***REMOVED***) => {
        // Assuming there is an existing ***REMOVED*** logic
        return <Input {...***REMOVED***} />;
    };

    const handleBlur = (e, data) => {
        setFocus(false);
        if (props.onBlur) {
            props.onBlur(e, data);
        }
    };

    const handleFocus = (e, data) => {
        setFocus(true);
        if (props.onFocus) {
            props.onFocus(e, data);
        }
    };

    const ***REMOVED*** = (e) => {
        setOpen(true);
        if (props.onMouseDown) {
            props.onMouseDown(e);
        }
    };

    const { aligned, category, className, fluid, size, ***REMOVED*** } = props;


    const classes = clsx(
        'ui',
        open && 'active visible',
        size,
        searchClasses,
        useKeyOnly(category, 'category'),
        useKeyOnly(focus, 'focus'),
        useKeyOnly(fluid, 'fluid'),
        useKeyOnly(loading, 'loading'),
        ***REMOVED***(aligned, 'aligned'),
        'search',
        className
    );


    const unhandled = ***REMOVED***(Search, props);
    const ElementType = ***REMOVED***(Search, props);
    const [***REMOVED***, rest] = ***REMOVED***(unhandled, {
        htmlProps: ***REMOVED***,
    });


    return (
        <>

            <Search
                {...rest}
                as={Input}
                className={classes}
                onBlur={handleBlur}
                size="mini"
                aligned="left"
                placeholder={placeholder}
                onFocus={handleFocus}
                onMouseDown={***REMOVED***}
                ***REMOVED***={(res) => renderResults(res)}
                ***REMOVED***={***REMOVED***}
                results={***REMOVED***}
                input={***REMOVED***(***REMOVED***)}
                value={value}
                showNoResults={showNoResults}
                ***REMOVED***={***REMOVED***}
                loading={loading}
                header={renderHeader()}

            >
            </Search>
        </>

    );
};

export default CustomSearch;
