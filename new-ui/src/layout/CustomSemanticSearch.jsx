import { Search, Segment } from "semantic-ui-react";
import React from "react";
import clsx from "clsx";
import * as lib from 'semantic-ui-react/dist/commonjs/lib';

const CustomSearch = (props) => {
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
        const { results } = props;
        return (
            <React.Fragment>
                {renderHeader()}
                {results && (
                    <div>
                        {results.map((result, index) => (
                            <Search.Result key={index} {...result} />
                        ))}
                    </div>
                )}
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

    const { aligned, category, className, fluid, loading, size } = props;

    const classes = clsx(
        'ui',
        open && 'active visible',
        size,
        searchClasses,
        lib.useKeyOnly(category, 'category'),
        lib.useKeyOnly(focus, 'focus'),
        lib.useKeyOnly(fluid, 'fluid'),
        lib.useKeyOnly(loading, 'loading'),
        lib.***REMOVED***(aligned, 'aligned'),
        'search',
        className
    );

    const unhandled = lib.***REMOVED***(Search, props);
    const ElementType = lib.***REMOVED***(Search, props);
    const [***REMOVED***, rest] = lib.***REMOVED***(unhandled, {
        htmlProps: lib.***REMOVED***,
    });

    return (
        <ElementType
            className={classes}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onMouseDown={***REMOVED***}
        >
            <Search.Input {...***REMOVED***} />
            <Search.Results>{renderResults()}</Search.Results>
        </ElementType>
    );
};

export default CustomSearch;
