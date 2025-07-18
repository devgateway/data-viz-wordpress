import React from 'react';
import _ from 'lodash';
import {
  ***REMOVED***,
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useEffect, useState} from "react";
import {
  ***REMOVED***,
  ***REMOVED***,
  getSelectedItemsForApp,
  getSelectedLabelsForApp,
  ***REMOVED***
} from "@devgateway/dvz-wp-commons";
import { IntervalsSectionProps, ***REMOVED***, ***REMOVED***, ***REMOVED***, ***REMOVED*** } from "./types";

// TODO: Find the types for the props


const MarginSection = ({
  setAttributes,
  attributes: { ***REMOVED*** },
}: ***REMOVED***) => {
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
          min={-500}
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
          min={-500}
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
          min={-500}
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
          min={-500}
          max={500}
        />
      </PanelRow>
    </PanelBody>
  );
};

const ***REMOVED*** = ({
  setAttributes,
  attributes: { ***REMOVED*** },
}) => {
  const {
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***
  } = ***REMOVED***;

  return (
    <>
      <PanelBody initialOpen={false} title={__("Mobile Margins")}>
        <PanelRow>
          <RangeControl
            label={__(
              "Mobile Margin Bottom (space between chart area and bottom border)"
            )}
            value={***REMOVED***}
            onChange={(marginBottom) =>
              setAttributes({
                ***REMOVED***: {
                  ...***REMOVED***,
                  ***REMOVED***: marginBottom,
                },
              })
            }
            min={-500}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__(
              "Mobile Margin Left (space between chart area and left border)"
            )}
            value={***REMOVED***}
            onChange={(marginLeft) =>
              setAttributes({
                ***REMOVED***: {
                  ...***REMOVED***,
                  ***REMOVED***: marginLeft
                },
              })
            }
            step={1}
            min={-500}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__("Mobile Margin Right")}
            value={***REMOVED***}
            onChange={(marginRight) =>
              setAttributes({
                ***REMOVED***: {
                  ...***REMOVED***,
                  ***REMOVED***: marginRight,
                },
              })
            }
            min={-500}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__("Mobile Margin Top")}
            value={***REMOVED***}
            onChange={(marginTop) =>
              setAttributes({
                ***REMOVED***: {
                  ...***REMOVED***,
                  ***REMOVED***: marginTop,
                },
              })
            }
            min={-500}
            max={500}
          />
        </PanelRow>
      </PanelBody>

      <PanelBody initialOpen={false} title={__("Tablet Margins")}>
        <PanelRow>
          <RangeControl
            label={__(
              "Tablet Margin Bottom (space between chart area and bottom border)"
            )}
            value={***REMOVED***}
            onChange={(marginBottom) =>
              setAttributes({
                ***REMOVED***: {
                  ...***REMOVED***,
                  ***REMOVED***: marginBottom,
                },
              })
            }
            min={-500}
            max={500}
          />
        </PanelRow>
      </PanelBody>
    </>
  );
};

const ***REMOVED*** = ({
  setAttributes,
  attributes: { ***REMOVED***, barPadding, ***REMOVED*** },
}: ***REMOVED***) => {
  return (
    <PanelBody initialOpen={false} title={__("Padding")}>
      <PanelRow>
        <RangeControl
          label={__(
            "Bar Padding (Space between bars that are not in the same group)"
          )}
          value={***REMOVED***?.barPadding ?? barPadding}
          ***REMOVED***={0.15}
          onChange={(newBarPadding) =>
            setAttributes({
              ***REMOVED***: {
                ...***REMOVED***,
                barPadding: newBarPadding,
              },
            })
          }
          step={0.05}
          min={0}
          max={1}
        />
      </PanelRow>

      <PanelRow>
        <RangeControl
          label={__("Bar Inner Padding (Space between bars in the same group)")}
          value={***REMOVED***?.***REMOVED*** ?? ***REMOVED***}
          ***REMOVED***={0.75}
          onChange={(***REMOVED***) =>
            setAttributes({
              ***REMOVED***: {
                ...***REMOVED***,
                ***REMOVED***: ***REMOVED***,
              },
            })
          }
          step={0.25}
          min={0}
          max={50}
        />
      </PanelRow>
    </PanelBody>
  );
};

const TitleSection = ({
  setAttributes,
  attributes: { ***REMOVED*** },
}: ***REMOVED***) => {
  return (
    <PanelBody initialOpen={false} title={__("Axis Titles")}>
      <PanelRow>
        <ToggleControl
          label={__("Show X Axis Title")}
          checked={***REMOVED***?.***REMOVED*** ?? true}
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
      <PanelRow>
        <ToggleControl
          label={__("Show Y Axis Title")}
          checked={***REMOVED***?.***REMOVED*** ?? true}
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

      <PanelRow>
        <ToggleControl
          label={__("Show Right Axis Title")}
          checked={***REMOVED***?.***REMOVED*** ?? true}
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
    </PanelBody>
  );
};

const ***REMOVED*** = ({
  setAttributes,
  attributes: { ***REMOVED***, ***REMOVED***, ***REMOVED***, layout },
}: IntervalsSectionProps) => {
  const isHorizontal =
    (layout === "horizontal" &&
      ***REMOVED***.***REMOVED*** === false) ||
    (layout === "vertical" && ***REMOVED***.***REMOVED*** === true);

  const isVertical =
    (layout === "vertical" &&
      ***REMOVED***.***REMOVED*** === false) ||
    (layout === "horizontal" &&
      ***REMOVED***.***REMOVED*** === true);

  const ***REMOVED*** = (value, prop, intervalProp) => {
    const newObject = Object.assign({}, ***REMOVED***);
    if (newObject) {
      newObject[prop] = value;
      newObject[intervalProp] = true;
    }
    setAttributes({ ***REMOVED***: newObject });
  };

  return (
    <PanelBody initialOpen={false} title={__("Intervals")}>
      {
        /**
         * the number of intervals should default to the value set by ***REMOVED***
         * this should only be displayed when the layout is vertical and the ***REMOVED***.***REMOVED*** is false
         */
        isVertical && (
          <PanelRow>
            <RangeControl
              label={__("Number of Y Axis Intervals")}
              // @ts-ignore
              value={
                !***REMOVED***?.yAxisIntervalUserModified
                  ? ***REMOVED***
                  : ***REMOVED***.***REMOVED*** ?? ***REMOVED***
              }
              onChange={(***REMOVED***) =>
                ***REMOVED***(
                  ***REMOVED***,
                  "***REMOVED***",
                  "yAxisIntervalUserModified"
                )
              }
              min={0}
              max={50}
            />
          </PanelRow>
        )
      }

      {
        /**
         * the number of intervals should default to the value set by ***REMOVED***
         * this should only be displayed when the layout is horizontal and the ***REMOVED***.***REMOVED*** is false
         * */
        isHorizontal && (
          <PanelRow>
            <RangeControl
              label={__("Number of X Axis Intervals")}
              // @ts-ignore
              value={
                !***REMOVED***?.xAxisIntervalUserModified
                  ? ***REMOVED***
                  : ***REMOVED***.***REMOVED*** ?? ***REMOVED***
              }
              onChange={(***REMOVED***) =>
                ***REMOVED***(
                  ***REMOVED***,
                  "***REMOVED***",
                  "xAxisIntervalUserModified"
                )
              }
              min={0}
              max={50}
            />
          </PanelRow>
        )
      }
    </PanelBody>
  );
};

const RadarSection = (props) => {
  const {
    setAttributes,
    attributes: { ***REMOVED*** },
  } = props;
  return (
    <PanelBody initialOpen={false} title={__("Radar Settings")}>
      <PanelBody initialOpen={false} title={__("Tablet")}>
        <PanelRow>
          <RangeControl
            label={__("Tablet Y Axis Line Height")}
            value={
              !***REMOVED***?.tabletYAxisLineHeight
                ? 12
                : ***REMOVED***.tabletYAxisLineHeight
            }
            onChange={(value) =>
              setAttributes({
                ***REMOVED***: {
                  ...***REMOVED***,
                  tabletYAxisLineHeight: value,
                },
              })
            }
            min={0}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__("Tablet Max Tick Word Length")}
            value={
              !***REMOVED***?.***REMOVED***
                ? 25
                : ***REMOVED***.***REMOVED***
            }
            onChange={(value) =>
              setAttributes({
                ***REMOVED***: {
                  ...***REMOVED***,
                  ***REMOVED***: value,
                },
              })
            }
            min={0}
            max={500}
          />
        </PanelRow>

      </PanelBody>
      <PanelBody initialOpen={false} title={__("Mobile")}>
        <PanelRow>
          <RangeControl
            label={__("Mobile Y Axis Line Height")}
            value={
              !***REMOVED***?.mobileYAxisLineHeight
                ? 12
                : ***REMOVED***.mobileYAxisLineHeight
            }
            onChange={(value) =>
              setAttributes({
                ***REMOVED***: {
                  ...***REMOVED***,
                  mobileYAxisLineHeight: value,
                },
              })
            }
            min={0}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__("Mobile Max Tick Word Length.")}
            value={
              !***REMOVED***?.***REMOVED***
                ? 25
                : ***REMOVED***.***REMOVED***
            }
            onChange={(value) =>
              setAttributes({
                ***REMOVED***: {
                  ...***REMOVED***,
                  ***REMOVED***: value,
                },
              })
            }
            min={0}
            max={500}
          />
        </PanelRow>
      </PanelBody>
      <PanelBody initialOpen={false} title={__("Margins")}>
        <***REMOVED*** {...props} />
      </PanelBody>
    </PanelBody>
  );
};

const MobileConfig = (props: ***REMOVED***) => {
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
      ***REMOVED***,
      tickRotation
    },
    allMeasures,
    allCategories,
    allDimensions,
  } = props;

  const [xAxisLabels, ***REMOVED***] = useState<string[]>([]);

  const ***REMOVED*** = (value: number, prop: string, intervalProp: string, mobileCustomizationObject: any) => {
    const newObject = Object.assign({}, mobileCustomizationObject);
    if (newObject) {
      newObject[prop] = value;
      newObject[intervalProp] = true;
    }
    setAttributes({ ***REMOVED***: newObject });
  };

  useEffect(() => {
    const updatedMobileCustomization = { ...***REMOVED*** };

    // Type guard to check if the property exists on the object
    if ('yAxisIntervalUserModified' in ***REMOVED*** &&
        !***REMOVED***.yAxisIntervalUserModified) {
      // Type guard to ensure we can assign to this property
      if ('***REMOVED***' in updatedMobileCustomization) {
        updatedMobileCustomization.***REMOVED*** = ***REMOVED***;
      }
    }

    if ('xAxisIntervalUserModified' in ***REMOVED*** &&
        !***REMOVED***.xAxisIntervalUserModified) {
      // Type guard to ensure we can assign to this property
      if ('***REMOVED***' in updatedMobileCustomization) {
        updatedMobileCustomization.***REMOVED*** = ***REMOVED***;
      }
    }

    if ('mobileXAxisTextRotationModified' in ***REMOVED*** &&
        !***REMOVED***.mobileXAxisTextRotationModified) {
      // Type guard to ensure we can assign to this property
      if ('mobileXAxisTextRotation' in updatedMobileCustomization) {
        updatedMobileCustomization.mobileXAxisTextRotation = tickRotation;
      }
    }

    if ('tabletXAxisTextRotationModified' in ***REMOVED*** &&
        !***REMOVED***.tabletXAxisTextRotationModified) {
      // Type guard to ensure we can assign to this property
      if ('tabletXAxisTextRotation' in updatedMobileCustomization) {
        updatedMobileCustomization.tabletXAxisTextRotation = tickRotation;
      }
    }

    setAttributes({ ***REMOVED***: updatedMobileCustomization });
  }, [***REMOVED***, ***REMOVED***, tickRotation]);


useEffect(() => {
  let labels: string[] = [];
  const categoryKey = `_categories_${app}`;
  if (app === "csv") {
    labels = ***REMOVED***(csv);
  } else {
    if (dimension1 !== "none") {
      const dimensionKey = `_dimensions_${app}`;
      const dimensions = ***REMOVED***(dimensionKey, allDimensions, true);
      const categories = ***REMOVED***(categoryKey, allCategories, true);
      const dimType = dimensions.filter((dim) => dim.value === dimension1)?.[0]?.type;
      const ***REMOVED*** = categories.filter((a) => a.type === dimType);
      labels = ***REMOVED***[0]?.items?.map((item) => item.value) || [];
    } else {
      if(allMeasures && measures) {
        ***REMOVED***(allMeasures, measures, app);
        const ***REMOVED*** = getSelectedItemsForApp(measures, app);
        labels = _.isEmpty(***REMOVED***) ? [] : getSelectedLabelsForApp(***REMOVED***, app);
      } else {
        labels = [];
      }
    }
  }
  ***REMOVED***(labels);
}, [app, dimension1, csv, allDimensions, allCategories, allMeasures, measures]);


  const ***REMOVED*** = (label, value) => {
    const newObject = Object.assign({}, ***REMOVED***);
    if ('labels' in newObject && newObject.labels?.xAxis) {
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


  const ***REMOVED*** = (***REMOVED***: boolean, label: string, axis: string) => {
    // initial toggle state is false
    if (!***REMOVED*** && 'labels' in ***REMOVED***) {
      return ***REMOVED***.labels[axis][label];
    }
    // initial toggle state is true but customization is already present
    if ('labels' in ***REMOVED*** && ***REMOVED***.labels?.***REMOVED***(axis)) {
    if (***REMOVED***?.labels.***REMOVED***(axis)) {
      if (***REMOVED***.labels[axis].***REMOVED***(label)) {
        return ***REMOVED***.labels[axis][label];
      }
      return true;
    }
  }
    // initial toggle state is true and customization is not present
    return true;
  };

  const isBarOrLineOrPieOrRadar = ["bar", "line", "pie", "radar"].includes(type);
  const ***REMOVED*** = ["bar", "line", "pie"].includes(type);

  const isRadar = type === "radar";
  const isBarOrLine = ["bar", "line"].includes(type);
  return (
    <PanelBody
      initialOpen={false}
      title={__("Mobile & Tablet Customization Settings")}
    >
      <PanelRow>
        <ToggleControl
          label={__("Show Mobile & Tablet Customization Settings")}
          // @ts-ignore
          checked={***REMOVED***?.***REMOVED***}
          onChange={(isShowMobileCustomization) =>
            onShowMobileCustomizationChange(isShowMobileCustomization)
          }
        />
      </PanelRow>
      {/* @ts-ignore */}
      {isBarOrLineOrPieOrRadar && ***REMOVED***?.***REMOVED*** && (
        <>
          {isBarOrLine && (
            <>
              <PanelRow>
                <ToggleControl
                  label={__("Disable X Axis Labels")}
                  // @ts-ignore
                  checked={***REMOVED***.xAxisDisabled}
                  onChange={(***REMOVED***) =>
                    setAttributes({
                      ***REMOVED***: {
                        ...***REMOVED***,
                        // @ts-ignore
                        xAxisDisabled: ***REMOVED***,
                      },
                    })
                  }
                />
              </PanelRow>
              <PanelRow>
                <ToggleControl
                  label={__("Override Chart Layout")}
                  // @ts-ignore
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

              <PanelBody initialOpen={false} title={__("Tablet Settings")}>
                <PanelRow>
                  <RangeControl
                    label={__("Tablet Y Axis Line Height")}
                    value={
                      // @ts-ignore
                      !***REMOVED***?.tabletYAxisLineHeight
                        ? 12
                        // @ts-ignore
                        : ***REMOVED***.tabletYAxisLineHeight
                    }
                    onChange={(value) =>
                      setAttributes({
                        ***REMOVED***: {
                          ...***REMOVED***,
                          // @ts-ignore
                          tabletYAxisLineHeight: value,
                        },
                      })
                    }
                    min={0}
                    max={500}
                  />
                </PanelRow>
                <PanelRow>
                  <RangeControl
                    label={__("Tablet Max Tick Word Length")}
                    value={
                      // @ts-ignore
                      !***REMOVED***?.***REMOVED***
                        ? 25
                        // @ts-ignore
                        : ***REMOVED***.***REMOVED***
                    }
                    onChange={(value) =>
                      setAttributes({
                        ***REMOVED***: {
                          ...***REMOVED***,
                          // @ts-ignore
                          ***REMOVED***: value,
                        },
                      })
                    }
                    min={0}
                    max={500}
                  />
                </PanelRow>
                <PanelRow>
                  <***REMOVED***
                    label={__("X Axis Text Rotation")}
                    value={
                      // @ts-ignore
                      !***REMOVED***?.tabletXAxisTextRotationModified
                        ? tickRotation
                        // @ts-ignore
                        : ***REMOVED***.tabletXAxisTextRotation
                    }
                    onChange={(value) =>
                      ***REMOVED***(
                        value,
                        "tabletXAxisTextRotation",
                        "tabletXAxisTextRotationModified",
                        ***REMOVED***
                      )
                    }
                  />
                </PanelRow>
              </PanelBody>
              <PanelBody initialOpen={false} title={__("Mobile Settings")}>
                <PanelRow>
                  <RangeControl
                    label={__("Mobile Y Axis Line Height")}
                    value={
                      // @ts-ignore
                      !***REMOVED***?.mobileYAxisLineHeight
                        ? 12
                        // @ts-ignore
                        : ***REMOVED***.mobileYAxisLineHeight
                    }
                    onChange={(value) =>
                      setAttributes({
                        ***REMOVED***: {
                          ...***REMOVED***,
                          // @ts-ignore
                          mobileYAxisLineHeight: value,
                        },
                      })
                    }
                    min={0}
                    max={500}
                  />
                </PanelRow>
                <PanelRow>
                  <RangeControl
                    label={__("Mobile Max Tick Word Length.")}
                    value={
                      // @ts-ignore
                      !***REMOVED***?.***REMOVED***
                        ? 25
                        // @ts-ignore
                        : ***REMOVED***.***REMOVED***
                    }
                    onChange={(value) =>
                      setAttributes({
                        ***REMOVED***: {
                          ...***REMOVED***,
                          // @ts-ignore
                          ***REMOVED***: value,
                        },
                      })
                    }
                    min={0}
                    max={500}
                  />
                </PanelRow>
                <PanelRow>
                  <***REMOVED***
                    label={__("X Axis Text Rotation")}
                    value={
                      // @ts-ignore
                      !***REMOVED***?.mobileXAxisTextRotationModified
                        ? tickRotation
                        // @ts-ignore
                        : ***REMOVED***.mobileXAxisTextRotation
                    }
                    onChange={(value) =>
                      ***REMOVED***(
                        value,
                        "mobileXAxisTextRotation",
                        "mobileXAxisTextRotationModified",
                        ***REMOVED***
                      )
                    }
                  />
                </PanelRow>
              </PanelBody>
              {/* @ts-ignore */}
              <***REMOVED*** {...props} />
              <PanelBody initialOpen={false} title={__("All Labels")}>
                {xAxisLabels?.map((label, index) => (
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
              {/* @ts-ignore */}
              <TitleSection {...props} />
            </>
          )}
          {/* @ts-ignore */}
          { isRadar && <RadarSection {...props} />}
          {/* @ts-ignore */}
          { ***REMOVED***  && <MarginSection {...props} />}
          {/* @ts-ignore */}
          {type === "bar" && <***REMOVED*** {...props} />}
        </>
      )}
    </PanelBody>
  );
};

export default MobileConfig;
