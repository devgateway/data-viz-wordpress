import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { useState, useEffect, useRef } from "react";
import { Container, Segment, Dropdown, Label, Input, Icon, Divider, Radio, Checkbox } from "semantic-ui-react";
import { C as ***REMOVED*** } from "./DataContext-BNxY-bMy.js";
import { e as connect_default, g as getCategories, s as ***REMOVED***, h as setFilter } from "./server-build-C_g_IF5C.js";
import { injectIntl } from "react-intl";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
import "prop-types";
import "react-compiler-runtime";
import "react-dom/client";
import "immutable";
import "papaparse";
import "@devgateway/customizer";
import "@reduxjs/toolkit";
import "@artsy/fresnel";
import "clsx";
import "semantic-ui-react/dist/commonjs/lib/index.js";
import "query-string";
const ***REMOVED*** = (props) => {
  return /* @__PURE__ */ jsx(***REMOVED***.Consumer, { children: (data) => {
    return data && /* @__PURE__ */ jsx(React__default.Fragment, { children: React__default.Children.map(props.children, (child) => {
      return React__default.cloneElement(child, { ...props, data });
    }) });
  } });
};
class DataProvider extends React__default.Component {
  ***REMOVED***() {
    const { categories } = this.props;
    if (!categories && !this.props.loading) {
      this.props.onLoadData(this.props);
    }
  }
  ***REMOVED***(prevProps, prevState, snapshot) {
    const { app, filters, source, store, params, csv, group, editing } = this.props;
    if (filters != prevProps.filters || JSON.stringify(params) != JSON.stringify(prevProps.params) || app != prevProps.app || prevProps.source != source || csv != prevProps.csv) {
      if (app === "csv") {
        this.props.onSetData({ app, csv, store, params, group });
      } else {
        if (editing) {
          params.v = (Math.random() + 1).toString(36).substring(7);
        }
        this.setState({ showLoading: false });
        this.props.onLoadData(this.props);
        setTimeout(this.***REMOVED***, 100);
      }
    }
  }
  render() {
    const { data, loading, error } = this.props;
    if (loading) {
      return /* @__PURE__ */ jsx(Container, {});
    }
    if (data) {
      return /* @__PURE__ */ jsx(***REMOVED***.Provider, { value: data.toJS(), children: this.props.children });
    } else if (error) {
      return /* @__PURE__ */ jsxs(Segment, { color: "red", children: [
        /* @__PURE__ */ jsx("h1", { children: "500" }),
        /* @__PURE__ */ jsx("p", { children: "Wasn't able to load data" })
      ] });
    } else {
      return /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Segment, { color: "red", children: [
        /* @__PURE__ */ jsx("h1", { children: "404" }),
        /* @__PURE__ */ jsx("p", { children: "Can't find this page" })
      ] }) });
    }
  }
}
const ***REMOVED***$1 = (state, ownProps) => {
  const { app } = ownProps;
  return {
    data: state.getIn(["data", "categories", app, "items"]),
    error: state.getIn(["data", "categories", app, "error"]),
    loading: state.getIn(["data", "categories", app, "loading"])
  };
};
const ***REMOVED***$1 = {
  onLoadData: getCategories
};
const ***REMOVED*** = connect_default(***REMOVED***$1, ***REMOVED***$1)(injectIntl(DataProvider));
const FILTER_TYPE_MULTI_SELECT = "multi-select";
const FILTER_TYPE_SINGLE_SELECT = "single-select";
const NO_DATA = "NO_DATA";
const DEFAULT_VALUE_INPUT = "DEFAULT_VALUE_INPUT";
const LOWEST_VALUE = "LOWEST_VALUE";
const HIGHEST_VALUE = "HIGHEST_VALUE";
const ***REMOVED*** = (val) => {
  if (val instanceof Boolean) {
    return val;
  } else {
    return val == "true";
  }
};
const toOptions = (items, locale) => items ? items.sort((a, b) => a.position - b.position).map((i) => {
  const text = locale && i.labels && i.labels[locale.toUpperCase()] ? i.labels[locale.toUpperCase()] : i.value;
  return {
    key: i.id,
    value: i.id,
    text,
    icon: i.value.***REMOVED***(),
    position: i.position ? i.position : i.value
  };
}) : [];
const decode = (value) => {
  return ***REMOVED***(value);
};
const parse = (value) => {
  try {
    return JSON.parse(decode(value));
  } catch (error) {
    throw new Error("error parsing value:" + error);
  }
  return null;
};
const ***REMOVED*** = (state, ownProps) => {
  const { app, group, param } = ownProps;
  return {
    current: state.getIn(["data", "filters", app, group, param])
  };
};
const ***REMOVED*** = {
  onInit: ***REMOVED***,
  onChange: setFilter
};
const ***REMOVED*** = (props) => {
  const { isRange, options, ***REMOVED***, ascOrder } = props;
  let sortedOptions = [];
  if (***REMOVED***(***REMOVED***)) {
    sortedOptions = options.sort(function(a, b) {
      const aText = a.text ? a.text.toLowerCase() : "";
      const bText = b.text ? b.text.toLowerCase() : "";
      if (***REMOVED***(ascOrder)) {
        return aText < bText ? -1 : aText > bText ? 1 : 0;
      } else {
        return aText < bText ? 1 : aText > bText ? -1 : 0;
      }
    });
  } else {
    sortedOptions = options.sort(function(a, b) {
      return ***REMOVED***(ascOrder) ? a.position - b.position : b.position - a.position;
    });
  }
  const filterProps = { ...props, options: sortedOptions };
  if (isRange) {
    return /* @__PURE__ */ jsx(***REMOVED***, { ...filterProps });
  } else {
    return /* @__PURE__ */ jsx(***REMOVED***, { ...filterProps });
  }
};
const ***REMOVED*** = connect_default(***REMOVED***, ***REMOVED***)((props) => {
  const {
    allLabel,
    noneLabel,
    placeholder,
    options,
    app,
    group,
    param,
    current,
    onChange,
    onInit,
    ***REMOVED***,
    ***REMOVED***,
    filterType,
    defaultValues,
    ***REMOVED***,
    ***REMOVED***,
    ***REMOVED***,
    closeOnSelect,
    hiddenFilters
  } = props;
  useState("");
  const changeFilter = (value) => {
    let newValue = [];
    if (filterType != FILTER_TYPE_SINGLE_SELECT && !closeOnSelect && current && current.indexOf(value) > -1) {
      newValue = current.filter((i) => i !== value);
    } else if (filterType != FILTER_TYPE_SINGLE_SELECT && current && !closeOnSelect) {
      newValue = [...current, value];
    } else {
      newValue = [value];
    }
    onChange({ app, group, param, value: newValue });
    if (closeOnSelect && refContainer.current) {
      refContainer.current.close();
    }
  };
  const all = (value) => {
    const matchingItems = options.filter((o) => {
      if (***REMOVED*** && searchText && searchText.trim().length > 0 && o.text) {
        return o.text.toLowerCase().includes(searchText.toLowerCase());
      }
      return true;
    });
    onChange({ app, group, param, value: matchingItems.map((v) => v.value) });
    if (closeOnSelect && refContainer.current) {
      refContainer.current.close();
    }
  };
  const none = () => {
    const matchingItems = options.filter((o) => {
      if (***REMOVED*** && searchText && searchText.trim().length > 0 && o.text) {
        return o.text.toLowerCase().includes(searchText.toLowerCase());
      }
      return true;
    });
    onChange({ app, group, param, value: ***REMOVED*** ? matchingItems.map((v) => v.value) : [] });
    if (closeOnSelect && refContainer.current) {
      refContainer.current.close();
    }
  };
  const ***REMOVED*** = (searchText2) => {
    setSearchText(searchText2);
    const matchingItems = options.filter((o) => {
      if (***REMOVED*** && searchText2 && searchText2.trim().length > 0 && o.text) {
        return o.text.toLowerCase().includes(searchText2.toLowerCase());
      }
      return true;
    });
    onChange({ app, group, param, value: matchingItems.map((v) => v.value) });
  };
  useEffect(() => {
    if (!current) {
      const filterItems = options.map((o) => o.value);
      if (filterType == FILTER_TYPE_MULTI_SELECT || filterType == "") {
        onInit({ app, group, param, value: filterItems });
      } else {
        if (app == "csv") {
          let filterValues = [];
          if (***REMOVED*** === DEFAULT_VALUE_INPUT) {
            filterValues = defaultValues ? defaultValues.split(",") : [];
          } else if (***REMOVED*** == LOWEST_VALUE) {
            filterValues = filterItems.length > 0 ? [filterItems[0]] : [];
          } else if (***REMOVED*** == HIGHEST_VALUE) {
            filterValues = filterItems.length > 0 ? [filterItems[filterItems.length - 1]] : [];
          }
          onInit({ app, group, param, value: filterValues });
        } else {
          onInit({ app, group, param, value: [filterItems[0]] });
        }
      }
    }
  }, []);
  const getSelected = () => {
    if (filterType == FILTER_TYPE_SINGLE_SELECT) {
      const selectedItem = current && current[0] ? options.filter((v) => v.value == current[0])[0] : null;
      return `${placeholder} ${selectedItem ? selectedItem.text : ""}`;
    } else {
      return `${placeholder} (${current ? current.filter((v) => {
        if (v == Number.MIN_SAFE_INTEGER) {
          return false;
        }
        if (hiddenFilters && hiddenFilters.length > 0) {
          return !(hiddenFilters.indexOf(v) != -1);
        }
        return true;
      }).length : 0}/${options.filter((f) => {
        if (hiddenFilters && hiddenFilters.length > 0) {
          return !(hiddenFilters.indexOf(f.id) != -1);
        }
        return true;
      }).length}) `;
    }
  };
  const refContainer = useRef(null);
  const [searchText, setSearchText] = useState("");
  return (
    // @ts-ignore
    /* @__PURE__ */ jsx(
      Dropdown,
      {
        ref: refContainer,
        fluid: true,
        text: getSelected(),
        scrolling: false,
        button: true,
        icon: "angle down",
        multiple: true,
        search: true,
        floating: false,
        className: `${current && current.length > 0 ? "applied " : ""}`,
        children: /* @__PURE__ */ jsxs(Dropdown.Menu, { children: [
          filterType != FILTER_TYPE_SINGLE_SELECT && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Segment, { children: /* @__PURE__ */ jsxs(Dropdown.Item, { children: [
              /* @__PURE__ */ jsx(Label, { basic: true, onClick: all, children: allLabel }),
              " | ",
              /* @__PURE__ */ jsx(
                Label,
                {
                  basic: true,
                  onClick: none,
                  children: noneLabel
                }
              )
            ] }) }),
            ***REMOVED*** && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Dropdown.Item, { children: /* @__PURE__ */ jsx("div", { className: "ui action input", children: /* @__PURE__ */ jsxs(Input, { placeholder: "Search...", children: [
                /* @__PURE__ */ jsx("input", { className: "filter-search", value: searchText, onChange: (e) => {
                  ***REMOVED***(e.target.value);
                } }),
                /* @__PURE__ */ jsx(Icon, { name: "remove", link: true, className: "clear-icon ignore", onClick: (e) => {
                  ***REMOVED***("");
                } })
              ] }) }) }) }),
              /* @__PURE__ */ jsx(Divider, {})
            ] })
          ] }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(Container, { className: ***REMOVED*** ? "dropdown-single-column" : "", children: options.filter((o) => {
            if (***REMOVED*** && searchText && searchText.trim().length > 0 && o.text) {
              return o.text.toLowerCase().includes(searchText.toLowerCase());
            }
            return true;
          }).map(({ value, text }, index2) => /* @__PURE__ */ jsxs(Dropdown.Item, { className: ***REMOVED*** ? "dropdown-item-single-column" : "", children: [
            filterType == FILTER_TYPE_SINGLE_SELECT && /* @__PURE__ */ jsx(
              Radio,
              {
                checked: current && current.indexOf(value) > -1 ? true : false,
                onChange: (e) => changeFilter(value),
                label: text
              }
            ),
            filterType == FILTER_TYPE_MULTI_SELECT && /* @__PURE__ */ jsx(
              Checkbox,
              {
                checked: current && current.indexOf(value) > -1 && !(options.length == current.length && ***REMOVED***) ? true : false,
                onChange: (e) => changeFilter(value),
                label: text
              }
            )
          ] }, index2)) })
        ] })
      }
    )
  );
});
const ***REMOVED*** = connect_default(***REMOVED***, ***REMOVED***)(({
  placeholder,
  startLabel,
  endLabel,
  options,
  onChange,
  app,
  group,
  param,
  current
}) => {
  const [start, setStart] = useState(options[0].position);
  const [end, setEnd] = useState(options[options.length - 1].position);
  useEffect(() => {
    const current2 = options.filter((v) => (v.position > start || v.position === start) && (v.position < end || v.position === end)).map((o) => o.value);
    onChange({ app, group, param, value: current2 });
  }, [start, end]);
  const refContainer = useRef(null);
  return /* @__PURE__ */ jsx(
    Dropdown,
    {
      ref: refContainer,
      fluid: true,
      text: `${placeholder} (${current ? current.filter((v) => v != Number.MIN_SAFE_INTEGER).length : 0}/${options.length})`,
      scrolling: false,
      button: true,
      multiple: true,
      search: true,
      floating: false,
      icon: "angle down",
      className: `${current && current.length > 0 ? "applied " : ""} range`,
      children: /* @__PURE__ */ jsxs(Dropdown.Menu, { children: [
        /* @__PURE__ */ jsx(Segment, { children: /* @__PURE__ */ jsxs(Dropdown.Item, { children: [
          " ",
          /* @__PURE__ */ jsx(Label, { basic: true, children: startLabel })
        ] }) }),
        /* @__PURE__ */ jsx(Container, { children: options.map(({ value, text, position }) => /* @__PURE__ */ jsx(Dropdown.Item, { children: /* @__PURE__ */ jsx(
          Radio,
          {
            disabled: position > end,
            checked: start === position,
            onChange: (e) => setStart(position),
            label: text
          }
        ) })) }),
        /* @__PURE__ */ jsx(Segment, { children: /* @__PURE__ */ jsxs(Dropdown.Item, { children: [
          " ",
          /* @__PURE__ */ jsx(Label, { basic: true, children: endLabel })
        ] }) }),
        /* @__PURE__ */ jsx(Container, { children: options.map(({ value, text, position }) => /* @__PURE__ */ jsx(Dropdown.Item, { children: /* @__PURE__ */ jsx(
          Radio,
          {
            disabled: position < start,
            checked: end === position,
            onChange: (e) => setEnd(position),
            label: text
          }
        ) })) })
      ] })
    }
  );
});
const ***REMOVED*** = (props) => {
  const { data, type, ***REMOVED*** } = props;
  const cat = data.filter((d) => d.type === type)[0];
  const ***REMOVED*** = cat ? cat.items.filter((f) => {
    if (!***REMOVED*** && f.code == NO_DATA) {
      return false;
    }
    if (props.hiddenFilters && props.hiddenFilters.length > 0) {
      return !(props.hiddenFilters.indexOf(f.id) != -1);
    }
    return true;
  }) : [];
  const options = ***REMOVED*** ? toOptions(***REMOVED***, props.locale) : [];
  return /* @__PURE__ */ jsx(Container, { fluid: true, className: `filter`, children: /* @__PURE__ */ jsx(***REMOVED***, { ...props, options }) });
};
const BooleanFilter = connect_default(***REMOVED***, ***REMOVED***)((props) => {
  let idx = 0;
  const options = [{
    key: "Yes",
    value: true,
    text: "Yes",
    position: idx++
  }, {
    key: "No",
    value: false,
    text: "No",
    position: idx++
  }];
  return /* @__PURE__ */ jsx(Container, { fluid: true, className: `filter`, children: /* @__PURE__ */ jsx(***REMOVED***, { options, ...props }) });
});
const CSVFilter = (props) => {
  const { csvValue } = props;
  let idx = 0;
  const options = csvValue.split(",").map((o) => {
    return {
      key: o,
      value: o,
      text: o,
      icon: o.***REMOVED***(),
      position: idx++
    };
  });
  return /* @__PURE__ */ jsx(Container, { fluid: true, className: `filter`, children: /* @__PURE__ */ jsx(***REMOVED***, { options, ...props, children: " " }) });
};
const Filter = ({
  "data-group": group,
  "data-app": app,
  "data-param": param,
  "data-icon": icon,
  "data-type": type,
  "data-place-holder": placeholder,
  "data-is-range": isRange = "false",
  "data-all-label": allLabel,
  "data-none-label": noneLabel,
  "data-start-label": startLabel,
  "data-end-label": endLabel,
  "data-csv-value": csvValue,
  "data-filters": filters = [],
  "data-use-single-column": ***REMOVED*** = "false",
  "data-enable-text-search": ***REMOVED*** = "false",
  "data-filter-type": filterType,
  "data-default-values": defaultValues,
  "data-show-no-data-option": ***REMOVED*** = "true",
  "data-default-value-criteria": ***REMOVED*** = "DEFAULT_VALUE_INPUT",
  "data-hidden-filters": hiddenFilters = "[]",
  "data-all-none-same-behaviour": ***REMOVED*** = "false",
  "data-close-on-select": closeOnSelect = "false",
  "data-alphabetical-sort": ***REMOVED*** = "true",
  "data-asc-order": ascOrder = "true",
  intl
}) => {
  const params = {};
  const ff = parse(filters) || {};
  if (ff && ff.forEach) {
    ff.forEach((f) => {
      if (f.value != null && f.value.filter((v) => v != null && v.toString().trim() != "").length > 0)
        params[f.param] = f.value;
    });
  }
  const ***REMOVED*** = parse(hiddenFilters);
  let ***REMOVED***;
  if (filterType == null || filterType == "") {
    ***REMOVED*** = isRange === "true" ? "range" : "multi-select";
  } else {
    ***REMOVED*** = filterType;
  }
  if (app === "csv") {
    return /* @__PURE__ */ jsx(
      CSVFilter,
      {
        allLabel,
        noneLabel,
        isRange: isRange === "true",
        csvValue,
        app,
        group,
        icon,
        placeholder,
        startLabel,
        endLabel,
        param,
        ***REMOVED***: ***REMOVED*** === "true",
        ***REMOVED***: ***REMOVED*** === "true",
        filterType: ***REMOVED***,
        defaultValues,
        ***REMOVED***,
        ***REMOVED***: ***REMOVED*** === "true",
        closeOnSelect: closeOnSelect === "true",
        locale: intl.locale
      }
    );
  } else {
    if (app) {
      return /* @__PURE__ */ jsx(
        ***REMOVED***,
        {
          params,
          app,
          hiddenFilters: ***REMOVED*** || [],
          children: /* @__PURE__ */ jsx(***REMOVED***, { children: /* @__PURE__ */ jsxs(Container, { fluid: true, children: [
            type === "Boolean" && /* @__PURE__ */ jsx(
              BooleanFilter,
              {
                startLabel,
                endLabel,
                allLabel,
                noneLabel,
                isRange: ***REMOVED***(isRange),
                app,
                group,
                icon,
                placeholder,
                param,
                filterType: ***REMOVED***,
                defaultValues,
                locale: intl.locale
              }
            ),
            type !== "Boolean" && /* @__PURE__ */ jsx(***REMOVED***, { type, children: /* @__PURE__ */ jsx(
              ***REMOVED***,
              {
                startLabel,
                endLabel,
                allLabel,
                noneLabel,
                isRange: ***REMOVED***(isRange),
                app,
                group,
                icon,
                placeholder,
                param,
                ***REMOVED***,
                ascOrder,
                ***REMOVED***: ***REMOVED***(***REMOVED***),
                ***REMOVED***: ***REMOVED***(***REMOVED***),
                ***REMOVED***: ***REMOVED***(***REMOVED***),
                filterType: ***REMOVED***,
                defaultValues,
                ***REMOVED***,
                hiddenFilters: ***REMOVED*** || [],
                ***REMOVED***: ***REMOVED*** == "true",
                closeOnSelect: ***REMOVED***(closeOnSelect),
                locale: intl.locale
              }
            ) })
          ] }) })
        }
      );
    } else {
      return null;
    }
  }
};
const index = injectIntl(Filter);
export {
  index as default
};
