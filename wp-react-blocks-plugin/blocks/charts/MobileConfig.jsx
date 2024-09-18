import {
  ***REMOVED***,
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState } from "react";
import { ***REMOVED*** } from ".././commons/APIutils";

function ***REMOVED***(csvData) {
  const lines = csvData.split("\n");
  const ***REMOVED*** = lines?.slice(1)?.map((row) => {
    return row.split(",")[0];
  });
  return ***REMOVED***;
}

function transformDataToAppObject(data, appName, ***REMOVED*** = {}) {
  if(***REMOVED***[appName] !== undefined) {
    return ***REMOVED***;
  }
  ***REMOVED***[appName] = {};
  data.forEach(item => {
      const key = item.value;
      ***REMOVED***[appName][key] = {
          selected: false,
          format: {
              style: "percent",
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
              currency: "USD"
          },
          ***REMOVED***: false,
          customLabel: item.label || key
      };
  });

  return ***REMOVED***;
}


function getSelectedLabelsForApp(data, appName) {
  const appData = data[appName];
  if (!appData) {
    return [];
  }
  return Object.keys(appData)
    .filter((key) => appData[key].selected) // Filter out the selected items
    .map((key) => {
      return appData[key].***REMOVED*** ? appData[key].customLabel : appData[key].label;
    });
}

const ***REMOVED*** = (data, measures, app) => {
  transformDataToAppObject(data, app, measures);
  const apiMeasures = ***REMOVED***(data);
  // for each api measure, find the corresponding measure in the measures array
  // and add a label property to the measure in the measures array
  apiMeasures.forEach((apiMeasure) => {
    const measure = measures[app][apiMeasure.value];
    if (measure) {
      measure.label = apiMeasure.label;
    }
  });
}

const MobileConfig = (props) => {
  const {
    setAttributes,
    attributes: { type, ***REMOVED***, csv, app, measures, dimension1 },
  } = props;
  let xAxisLabels = ***REMOVED***(csv);
  if (app !== "csv") {
    if (dimension1 !== "none") {
      const ***REMOVED*** = JSON.parse(***REMOVED***.getItem(`categories_${app}`));
      const categories =
        ***REMOVED*** ??
        fetch(`/api/${app}/categories`)
          .then((response) => response.json())
          .then((data) => ***REMOVED***(data));
      xAxisLabels = categories
        .filter(
          (category) =>
            category.type?.toLowerCase() === dimension1?.toLowerCase()
        )[0]
        .items?.map((item) => item.value);
    } else {
      const ***REMOVED*** = JSON.parse(***REMOVED***.getItem(`measures_${app}`));
      // if measures are not present in session storage, fetch them from the API
      if (!***REMOVED***) {
        fetch(`/api/${app}/measures`)
          .then((response) => response.json())
          .then((data) => {
            ***REMOVED***.setItem(`measures_${app}`, JSON.stringify(data));
            ***REMOVED***(data, measures, app);
          });
      } else {
        ***REMOVED***(***REMOVED***, measures, app);
      }
      xAxisLabels = getSelectedLabelsForApp(measures, app);
    }
  }

  const ***REMOVED*** = (label, value) => {
    const newObject = Object.assign({}, ***REMOVED***);
    if (newObject && newObject.labels && newObject.labels.xAxis) {
      newObject.labels.xAxis[label] = value;
    }
    setAttributes({ ***REMOVED***: newObject });
  };

  const ***REMOVED*** = (***REMOVED***, label, axis) => {
    // initial toggle state is false
    if (!***REMOVED***) {
      return ***REMOVED***.labels[axis][label];
    }
    // initial toggle state is true but customization is already present
    if (***REMOVED***?.labels.***REMOVED***(axis)) {
      if (***REMOVED***.labels[axis].***REMOVED***(label)) {
        return ***REMOVED***.labels[axis][label];
      }
      return true;
    }
    // initial toggle state is true and customization is not present
    return true;
  };

  const isBarOrLine = ["bar", "line"].includes(type);

  return (
    <PanelBody initialOpen={false} title={__("Mobile Customization Settings")}>
      {isBarOrLine && (
        <>
          <PanelRow>
            <ToggleControl
              label={__("Disable X Axis Labels")}
              checked={***REMOVED***.xAxisDisabled}
              onChange={(***REMOVED***) =>
                setAttributes({
                  ***REMOVED***: {
                    ...***REMOVED***,
                    xAxisDisabled: ***REMOVED***,
                  },
                })
              }
            />
          </PanelRow>

          <PanelRow>
            <***REMOVED***
              label={__("X Axis Text Rotation")}
              value={***REMOVED***.tickRotation}
              onChange={(value) =>
                setAttributes({
                  ***REMOVED***: {
                    ...***REMOVED***,
                    tickRotation: value,
                  },
                })
              }
            />
          </PanelRow>

          <PanelBody initialOpen={false} title={__("All Labels")}>
            {xAxisLabels.map((label, index) => (
              <PanelRow key={`____${index}${label}`}>
                <ToggleControl
                  key={`_____${index}${label}`}
                  label={__(label)}
                  checked={***REMOVED***(true, label, "xAxis")}
                  onChange={(value) => {
                    ***REMOVED***(label, value);
                  }}
                />
              </PanelRow>
            ))}
          </PanelBody>

          <PanelRow>
            <RangeControl
              label={__("Number of Intervals")}
              value={***REMOVED***.***REMOVED*** || 10}
              onChange={(***REMOVED***) =>
                setAttributes({
                  ***REMOVED***: {
                    ...***REMOVED***,
                    ***REMOVED***: ***REMOVED***,
                  },
                })
              }
              min={0}
              max={50}
            />
          </PanelRow>

          <PanelRow>
            <ToggleControl
              label={__("Override Chart Layout")}
              checked={***REMOVED***.***REMOVED***}
              onChange={(***REMOVED***) =>
                setAttributes({
                  ***REMOVED***: {
                    ...***REMOVED***,
                    ***REMOVED***: ***REMOVED***,
                  },
                })
              }
            />
          </PanelRow>
        </>
      )}
    </PanelBody>
  );
};
export default MobileConfig;
