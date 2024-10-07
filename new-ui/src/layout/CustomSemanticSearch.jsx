import { Search, Segment } from "semantic-ui-react";
import React from "react";
import clsx from "clsx";
import {
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***
} from 'semantic-ui-react/dist/commonjs/lib'

const CustomSearch = (props) => {
    const { results, ***REMOVED***, ***REMOVED***, value, showNoResults, ***REMOVED***, loading } = props;
    const [searchClasses, ***REMOVED***] = React.useState('');
    const [focus, setFocus] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const renderHeader = () => {
        const { perPage, total } = props;

        const classes = clsx(
            'results header',
            total === 1 && 'single'
        );

        return (
            <Segment color="blue" textAlign="left" className={classes}>
                <span>{total < perPage ? total : perPage} of {total} Results</span>
            </Segment>
        );
    };

    const renderResults = () => {
        return (
            <React.Fragment>
                {renderHeader()}
                <Search.Result key={index} {...result} />
            </React.Fragment>
        );
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

    const { aligned, category, className, fluid, size } = props;


    const classes = clsx(
        'ui',
        open && 'active visible',
        size,
        searchClasses,
        // ...category ? 'category',
        // ...focus && 'focus',
        // ...fluid && 'fluid',
        // ...loading && 'loading',
        // ...aligned && aligned,
        'search',
        className
    );


    const unhandled = ***REMOVED***(Search, props);
    // const ElementType = lib.***REMOVED***(Search, props);
    const [***REMOVED***, rest] = ***REMOVED***(unhandled, {
        htmlProps: ***REMOVED***,
    });

    return (
        <div>
            <Search
                className={classes}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onMouseDown={***REMOVED***}
                ***REMOVED***={***REMOVED***}
                ***REMOVED***={***REMOVED***}
                results={results}
                value={value}
                showNoResults={showNoResults}
                ***REMOVED***={***REMOVED***}
                loading={loading}

            />
            {/* <Search.Results>{renderResults()}</Search.Results> */}

        </div>

    );
};

export default CustomSearch;
