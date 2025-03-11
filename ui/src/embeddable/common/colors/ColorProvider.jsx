import React from "react";
import SystemColors from "./SystemColors";
import PlainColor from "./PlainColor";
import ManualColors from "./ManualColors";
import {isCategoricalColorScheme, isSequentialColorScheme} from "@nivo/colors";
import ***REMOVED*** from "./***REMOVED***";
import ***REMOVED*** from "./***REMOVED***";

const COLOR_VARIABLE = "_Color"

const ColorProvider = ({
    app,
    type,
    colorBy,
    scheme,
    barColor,
    manualColors,
    locale,
    overallLabel,
    customLabels,
    options: {data, keys, indexBy, ***REMOVED***, ***REMOVED***},
    children
}) => {
    let colorManager;

    if (data) {
        if (scheme === "system") {
            colorManager = new SystemColors(app, type, colorBy, scheme, data, keys, indexBy, ***REMOVED***, ***REMOVED***, locale);
        } else if (scheme === "plain_color") {
            colorManager = new PlainColor(barColor);
        } else if (scheme === "manual") {
            colorManager = new ManualColors(app, type, colorBy, scheme, data, ***REMOVED***, ***REMOVED***, keys, indexBy, manualColors, locale, overallLabel, customLabels);
        } else {
            if (isSequentialColorScheme(scheme)) {
                colorManager = new ***REMOVED***(colorBy, scheme, data, keys, indexBy);
            }
            if (isCategoricalColorScheme(scheme)) {
                colorManager = new ***REMOVED***(colorBy, scheme, data, keys, indexBy);
            }
        }

        return (
            <div>
                {React.Children.map(children, (child) => {
                    if (React.***REMOVED***(child)) {
                        return React.cloneElement(child, {
                            ***REMOVED***: colorManager
                        });
                    }
                    return child;
                })}
            </div>
        );
    } else {
        return null;
    }
}

export default ColorProvider;