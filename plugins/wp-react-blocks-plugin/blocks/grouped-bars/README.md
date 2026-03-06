> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Grouped Bars (WordPress Block)

## Purpose
A Gutenberg block that renders a horizontal grouped-bar chart by embedding the `grouped-bars` UI component in an iframe. It supports API-backed or CSV data sources, multiple measures, custom colours, sorting, and number formatting.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"grouped-bars"` | Chart type identifier passed to the UI component. |
| `group` | `String` | `"default"` | Shared key used to link this block to filter/measures blocks on the same page. |
| `height` | `Numeric` | `120` | Block height in pixels (resizable in editor). |
| `app` | `String` | `"csv"` | Data source identifier (`"csv"` or an API app slug). |
| `dimension1` | `String` | `"none"` | Primary dimension field used to group bars. |
| `csv` | `String` | `"Year,Amount \n2019,20000 \n2018,10000"` | Inline CSV data used when `app` is `"csv"`. |
| `measures` | `Array` | `[]` | List of measure fields to render as bars. |
| `filters` | `Array` | `[]` | Active filter values passed as query params to the data API. |
| `dvzProxyDatasetId` | `String` | `""` | Dataset ID for the DVZ proxy data source. |
| `format` | `Object` | `{ style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 0, currency: "USD" }` | `Intl.NumberFormat` options for formatting bar values. |
| `textColor` | `string` | `"#5a5d68"` | Colour of dimension labels. |
| `measureTextColor` | `string` | `"#ffffff"` | Colour of value text rendered inside bars. |
| `fontSize` | `Numeric` | `14` | Font size (px) for labels. |
| `mainValueFontSize` | `Numeric` | `24` | Font size (px) for the highlighted measure value. |
| `defaultBarColor` | `string` | `"#3182ce"` | Default fill colour for bars. |
| `barBackgroundColor` | `string` | `"#e0e0e0"` | Background track colour behind bars. |
| `labelPosition` | `string` | `"top"` | Position of the dimension label relative to the bar (`"top"` or `"left"`). |
| `labelWidth` | `Numeric` | `30` | Width percentage allocated to dimension labels when `labelPosition` is `"left"`. |
| `labelHeight` | `Numeric` | `32` | Height in pixels of the label area. |
| `valuePosition` | `string` | `"top"` | Where to display the formatted value (`"top"` or `"bar"`). |
| `labelFormat` | `string` | `"{value}"` | Template string for dimension labels; supports `{value}` and other dimension variables. |
| `showMeasureLabels` | `Boolean` | `false` | Whether to show measure name labels above each bar group. |
| `sorting` | `string` | `"none"` | Sorting strategy (`"none"`, `"dimension"`, or `"measure"`). |
| `sortDirection` | `string` | `"asc"` | Sort direction (`"asc"` or `"desc"`). |
| `sortMeasure` | `string` | `""` | Measure field to sort by when `sorting` is `"measure"`. |
| `topN` | `Numeric` | `null` | Limit displayed bars to the top N items after sorting. |
| `barSizeCriteria` | `string` | `"relative_max"` | How bar widths are calculated (`"relative_max"` or `"absolute"`). |
| `barSizeUseGroup` | `boolean` | `false` | Whether bar sizes are relative within each measure group. |
| `enableManualColors` | `Boolean` | `false` | Enable manual colour overrides per dimension or measure value. |
| `manualColors` | `string` | `"{}"` | JSON map of dimension/measure values to hex colour strings. |
| `manualColorsMode` | `string` | `"dimension"` | Whether manual colours apply per `"dimension"` or `"measure"`. |
| `enableCustomMeasureFormats` | `Boolean` | `false` | Allow each measure to carry its own number format. |
| `mainMeasure` | `string` | `""` | The primary measure to highlight when multiple measures are present. |
| `waitForFilters` | `Boolean` | `false` | Delay rendering until at least one filter value is selected. |
| `noDataText` | `string` | `"-"` | Text displayed when a data point is null or zero. |
| `showZeroNullMeasures` | `Boolean` | `false` | Whether to render bars for zero or null measure values. |
| `panelStatus` | `Object` | `{}` | Tracks open/closed state of inspector panel sections. |

## Usage Example
1. In the Gutenberg editor, insert the **Grouped Bars** block.
2. In the Inspector Controls sidebar, select the **App / data source**, configure **Dimension** and **Measures**, and adjust colours and formatting as needed.
3. Resize the block vertically using the drag handle at the bottom.

```js
// Programmatic block insertion (wp.blocks API)
wp.blocks.parse(`<!-- wp:dvz/groupedbars {"app":"csv","csv":"Country,Value\nKenya,45\nNigeria,30","dimension1":"Country","measures":["Value"],"height":300} /-->`);
```

## Related
- UI Component: `grouped-bars` (`data-viz-ui/packages/dvz-ui/src/embeddable/grouped-bars`)
