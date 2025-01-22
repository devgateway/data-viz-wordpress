import { ***REMOVED*** } from "./APIutils";


export function ***REMOVED***(csvData) {
  const lines = csvData.split("\n");
  const ***REMOVED*** = lines?.slice(1)?.map((row) => {
    return row.split(",")[0];
  });
  return ***REMOVED***;
}

export function transformDataToAppObject(data, appName, ***REMOVED*** = {}) {
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

export function getSelectedLabelsForApp(data, appName) {
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

export function ***REMOVED***(data, measures, app) {
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
