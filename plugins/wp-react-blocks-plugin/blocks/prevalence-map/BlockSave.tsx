import React from "react";
import { PrevalenceMapAttributes } from "./types";
import { getColorClassName } from "@wordpress/block-editor";

const SaveComponent = (props: { attributes: PrevalenceMapAttributes }) => {
    const {
        width,
        height,
        customBackgroundColor,
        backgroundColor,
    } = props.attributes;

    const divClass = getColorClassName('background-color', backgroundColor);
    const divStyles = {width, height, "background-color": customBackgroundColor};

    return (
    <div className={divClass} style={divStyles}>
            <div data-width={width} data-height={height} className={"viz-component"} data-component={"map"}></div>
        </div>


    );
}