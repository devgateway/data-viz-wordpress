import React from "react";
import { TabbedPostsBlockAttributes } from "./types";

const SaveComponent = (props: { attributes: TabbedPostsBlockAttributes }) => {
    const {
        attributes: {
            count,
            type,
            taxonomy,
            categories,
            height,
            width,
            showLabels,
            showIcons,
            useScrolls,
            theme,
            previewMode
        },
    } = props;

    const divStyles = {}


    return (
        <div style={divStyles}>
            <div
                data-items={count}
                data-height={height}
                data-width={width}
                data-type={type}
                data-taxonomy={taxonomy}
                data-categories={categories.toString()}
                data-show-labels={showLabels}
                data-show-icons={showIcons}
                data-use-scrolls={useScrolls}
                data-theme={theme}
                data-preview-mode={previewMode}
                className={"viz-component"}
                data-component={"tabbedPosts"}>
            </div>
        </div>


    );
}


export default SaveComponent
