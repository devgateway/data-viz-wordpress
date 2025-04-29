import _ from 'lodash';
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
  data?.forEach((item) => {
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

export function getSelectedItemsForApp(config, appName) {
  const appConfig = config[appName];
  if (!appConfig) return {};

  const ***REMOVED*** = {};

  for (const key in appConfig) {
    const value = appConfig[key];
    if (value && typeof value === 'object' && value.selected === true) {
      ***REMOVED***[key] = value;
    }
  }

  return ***REMOVED***;
}


export function getSelectedLabelsForApp(data, appName) {
  const appData = data;
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
  apiMeasures?.forEach((apiMeasure) => {
    const measure = measures[app][apiMeasure.value];
    if (measure) {
      measure.label = apiMeasure.label;
    }
  });
};


export function ***REMOVED***(key, fallback, overwrite=false) {
  const fallbackValue = fallback || [];
  if (overwrite && !_.isEmpty(fallbackValue)) {
    ***REMOVED***
      .setItem(key, JSON.stringify(fallbackValue));
    return fallbackValue;
  }
  const stored = JSON.parse(***REMOVED***.getItem(key));
  if (!stored) {
    ***REMOVED***.setItem(key, JSON.stringify(fallbackValue));
    return fallbackValue;
  }
  return stored;
}
