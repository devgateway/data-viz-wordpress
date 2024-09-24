import {
  ***REMOVED***,
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "react";
import { ***REMOVED*** } from ".././commons/APIutils";

const MarginSection = ({
  setAttributes,
  attributes: { ***REMOVED*** },
}) => {
  const { marginBottom, marginLeft, marginRight, marginTop } =
    ***REMOVED***;
  return (
    <PanelBody initialOpen={false} title={__("Margins")}>
      <PanelRow>
        <RangeControl
          label={__(
            "Margin Bottom (Space between chart area and bottom border)"
          )}
          value={marginBottom}
          onChange={(marginBottom) =>
            setAttributes({
              ***REMOVED***: {
                ...***REMOVED***,
                marginBottom: marginBottom,
                yAxisIntervalUserModified: true,
              },
            })
          }
          min={0}
          max={500}
        />
      </PanelRow>

      <PanelRow>
        <RangeControl
          label={__("Margin Left (Space between chart area and left border)")}
          value={marginLeft}
          ***REMOVED***={0}
          onChange={(marginLeft) =>
            setAttributes({
              ***REMOVED***: {
                ...***REMOVED***,
                marginLeft: marginLeft,
              },
            })
          }
          step={1}
          min={0}
          max={500}
        />
      </PanelRow>
      <PanelRow>
        <RangeControl
          label={__("Margin Right")}
          value={marginRight}
          onChange={(marginRight) =>
            setAttributes({
              ***REMOVED***: {
                ...***REMOVED***,
                marginRight: marginRight,
              },
            })
          }
          min={0}
          max={500}
        />
      </PanelRow>
      <PanelRow>
        <RangeControl
          label={__("Margin Top")}
          value={marginTop}
          onChange={(marginTop) =>
            setAttributes({
              ***REMOVED***: {
                ...***REMOVED***,
                marginTop: marginTop,
              },
            })
          }
          min={0}
          max={500}
        />
      </PanelRow>
    </PanelBody>
  );
};

function ***REMOVED***(csvData) {
  const lines = csvData.split("\n");
  const ***REMOVED*** = lines?.slice(1)?.map((row) => {
    return row.split(",")[0];
  });
  return ***REMOVED***;
}

function transformDataToAppObject(data, appName, ***REMOVED*** = {}) {
  if (***REMOVED***[appName] !== undefined) {
    return ***REMOVED***;
  }
  ***REMOVED***[appName] = {};
  data.forEach((item) => {
    const key = item.value;
    ***REMOVED***[appName][key] = {
      selected: false,
      format: {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        currency: "USD",
      },
      ***REMOVED***: false,
      customLabel: item.label || key,
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
      return appData[key].***REMOVED***
        ? appData[key].customLabel
        : appData[key].label;
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
};

const MobileConfig = (props) => {
  const {
    setAttributes,
    attributes: {
      type,
      ***REMOVED***,
      csv,
      app,
      measures,
      dimension1,
      ***REMOVED***,
    },
  } = props;

  useEffect(() => {
    if(!***REMOVED***.yAxisIntervalUserModified) {
      setAttributes({
        ***REMOVED***: {
          ...***REMOVED***,
          ***REMOVED***: ***REMOVED***,
        },
      });
    }
  }, [***REMOVED***]);

  let xAxisLabels = ***REMOVED***(csv);
  if (app !== "csv") {
    if (dimension1 !== "none") {
      const ***REMOVED*** = JSON.parse(
        ***REMOVED***.getItem(`categories_${app}`)
      );
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
      const ***REMOVED*** = JSON.parse(
        ***REMOVED***.getItem(`measures_${app}`)
      );
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

  const onShowMobileCustomizationChange = (value) => {
    setAttributes({
      ***REMOVED***: {
        ...***REMOVED***,
        ***REMOVED***: value,
      },
    });
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

  const ***REMOVED*** = (value) => {
    const newObject = Object.assign({}, ***REMOVED***);
    if (newObject) {
      newObject.***REMOVED*** = value;
      newObject.yAxisIntervalUserModified = true;
    }
    setAttributes({ ***REMOVED***: newObject });
  };

  const ***REMOVED*** = ["bar", "line", "pie"].includes(type);

  const isBarOrLine = ["bar", "line"].includes(type);
  return (
    <PanelBody initialOpen={false} title={__("Mobile Customization Settings")}>
      <PanelRow>
        <ToggleControl
          label={__("Show Mobile Customization Settings")}
          checked={***REMOVED***?.***REMOVED***}
          onChange={(isShowMobileCustomization) =>
            onShowMobileCustomizationChange(isShowMobileCustomization)
          }
        />
      </PanelRow>
      {***REMOVED*** && ***REMOVED***?.***REMOVED*** && (
        <>
          {
            isBarOrLine && <>
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

          {/** the number of intervals should default to the value set by ***REMOVED*** */}
          <PanelRow>
            <RangeControl
              label={__("Number of Intervals")}
              value={
                !***REMOVED***?.yAxisIntervalUserModified
                  ? ***REMOVED***
                  : ***REMOVED***.***REMOVED***
              }
              onChange={(***REMOVED***) =>
                ***REMOVED***(***REMOVED***)
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
          }
          <MarginSection {...props} />
        </>
      )}
    </PanelBody>
  );
};
export default MobileConfig;
