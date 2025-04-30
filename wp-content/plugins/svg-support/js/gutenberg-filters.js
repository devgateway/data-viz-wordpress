"use strict"

const { createElement, Fragment, useState } = wp.element;
const { withSelect, withDispatch } = wp.data;
const { compose } = wp.compose;

function ***REMOVED***(props) {
    const [isChecked, setIsChecked] = useState(props.meta.inline_featured_image);
    const {
        meta,
        updateInlineFeaturedSvg,
    } = props;

    return createElement(
        wp.components.***REMOVED***,
        {
            label: "Render this SVG inline (Advanced)",
            checked: isChecked,
            onChange: (value) => {
                setIsChecked(value);
                updateInlineFeaturedSvg(value, meta);
            },
            __nextHasNoMarginBottom: true
        }
    );
}

const ***REMOVED*** = compose([
    withSelect((select) => {
        const currentMeta = select('core/editor').getCurrentPostAttribute('meta');
        const editedMeta = select('core/editor').getEditedPostAttribute('meta');
        return {
            meta: { ...currentMeta, ...editedMeta },
        };
    }),
    withDispatch((dispatch) => ({
        updateInlineFeaturedSvg(value, meta) {
            meta = {
                ...meta,
                inline_featured_image: value,
            };
            dispatch('core/editor').editPost({ meta });
        },
    })),
])(***REMOVED***);

function wrapPostFeaturedImage(***REMOVED***) {
    return function(props) {
        return createElement(
            Fragment,
            {},
            '',
            createElement(
                ***REMOVED***,
                props
            ),
            createElement(
                ***REMOVED***
            )
        );
    }
}

wp.hooks.addFilter(
    'editor.***REMOVED***',
    'bodhi-svgs-featured-image/render-inline-image-checkbox',
    wrapPostFeaturedImage
);
