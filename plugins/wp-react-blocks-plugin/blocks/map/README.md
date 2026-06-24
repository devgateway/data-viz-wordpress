> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Data Map (WordPress Block)

## Purpose
A Gutenberg block that renders an interactive choropleth/symbol map by embedding the `map` UI component in an iframe. It supports API-backed or CSV data, configurable legend breaks, multiple layers, tooltips, zoom, and extensive label and colour styling options.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `Numeric` | `500` | Block height in pixels. |
| `app` | `String` | `"csv"` | Data source identifier (`"csv"` or an API app slug). |
| `csv` | `String` | `""` | Inline CSV data used when `app` is `"csv"`. |
| `dimension1` | `String` | `"zone"` | Primary geographic dimension field. |
| `dimension2` | `String` | `"gender"` | Secondary dimension field (e.g. for disaggregation). |
| `measures` | `Array` | `[]` | Measure fields to visualise on the map. Must be configured; no measure is pre-selected by default. |
| `filters` | `Array` | `[]` | Active filter values passed as query params to the data API. |
| `mapFile` | `String` | `""` | Path (relative to the UI app) to the TopoJSON map file. |
| `mapCenter` | `String` | `"NGA"` | Country/region key that determines the initial map centre and zoom scale (e.g. `"NGA"`, `"KEN"`, `"Africa"`). |
| `mappingField` | `String` | `"zone"` | Field in the data that matches feature IDs in the TopoJSON. |
| `mapLabelField` | `String` | `"zone"` | TopoJSON feature property used as the display label. |
| `group` | `String` | `"default"` | Shared key linking this block to filter/measures blocks on the page. |
| `legendTitle` | `String` | `"Tobacco Prevalence Rate"` | Title shown above the map legend. |
| `legendBreaks` | `Array` | `[{min:0,max:2.99,color:'#66A3D9'}, ...]` | Array of legend break objects (`{min, max, color, label, filters}`). |
| `showLegendLabels` | `Boolean` | `false` | Show text labels alongside legend colour swatches. |
| `showNoDataLegendItem` | `Boolean` | `false` | Add a "No Data" entry at the bottom of the legend. |
| `autoGenerateBreaks` | `Boolean` | `false` | Automatically calculate breaks from the data using Jenks/equal-interval. |
| `numberOfBreaks` | `Numeric` | `5` | Number of breaks when `autoGenerateBreaks` is `true`. |
| `colorScheme` | `string` | `"reds"` | Named d3/ColorBrewer colour scheme used for auto-generated breaks. |
| `hasMultipleMeasures` | `Boolean` | `false` | Enable a measure selector UI inside the map. |
| `measureSelectorLabel` | `String` | `""` | Label shown above the measure selector. |
| `zoomEnabled` | `Boolean` | `false` | Allow users to zoom and pan the map. |
| `showTooltip` | `Boolean` | `true` | Show a tooltip on hover. |
| `tooltipTheme` | `String` | `"map-tooltip-dark"` | CSS class applied to the tooltip container. |
| `tooltipFontSize` | `Numeric` | `14` | Font size (px) for tooltip text. |
| `customTooltips` | `Array` | `[]` | Per-measure custom tooltip templates. |
| `showOverallValue` | `Boolean` | `false` | Display an overall/national average value on the map. |
| `nationalAverageLabel` | `String` | `"National Prevalence Avg"` | Label for the national average annotation. |
| `dataSourceLabel` | `String` | `"Source"` | Label prefix for the data source credit. |
| `dataSourceText` | `String` | `"Source"` | Data source credit text. |
| `labelFontSize` | `Numeric` | `12` | Font size (px) for admin unit labels on the map. |
| `labelFontWeight` | `String` | `"normal"` | Font weight for admin unit labels. |
| `labelFontColor` | `String` | `"%23595959"` (URL-encoded `#595959`) | Colour for admin unit labels. |
| `legendFontSize` | `Numeric` | `12` | Font size (px) for legend text. |
| `legendFontWeight` | `String` | `"normal"` | Font weight for legend text. |
| `showAdminUnitLabel` | `String` | `"showAll"` | When to render admin unit labels: `"showAll"`, `"ifUnitHasData"`, or `"none"`. |
| `mapLabelShowValue` | `Boolean` | `false` | Append the data value to the admin unit label. |
| `valueFormat` | `String` | `"%({value},2)"` | Format template for values displayed on the map. |
| `decimals` | `Numeric` | `2` | Decimal places for number formatting. |
| `currency` | `String` | `"USD"` | Currency code used when format style is `"currency"`. |
| `enabledLayers` | `Array` | `[]` | Additional map layers (symbol/point layers) shown on top of the choropleth. |
| `mainLayerId` | `String` | `""` | ID of the primary data layer. |
| `mapSymbols` | `Array` | `[]` | Symbol definitions for point/symbol layers. |
| `mapNoDataColor` | `String` | `"#f8f8f8"` | Fill colour for features with no data. |
| `mapBoundaryColor` | `String` | `"#000"` | Stroke colour for map boundaries. |
| `mapFocusBoundaryColor` | `String` | `"#000"` | Stroke colour for the focused/highlighted boundary. |
| `highlightedLocation` | `String` | `""` | Feature ID/code to highlight on load. |
| `showNoDataLabel` | `Boolean` | `false` | Display a "No Data" label on features with no data. |
| `mapType` | `String` | `"DEFAULT"` | Map rendering mode (e.g. `"DEFAULT"`, point-cluster modes). |
| `dvzProxyDatasetId` | `String` | — | Dataset ID for the DVZ proxy data source. |

## Usage Example
1. Insert the **Data Map** block in the Gutenberg editor.
2. In Inspector Controls, choose **App**, upload or select a **Map File** (TopoJSON), set the **Map Center**, configure **Legend Breaks**, and select the **Measures** to display.
3. Use the **Layers** panel to add additional symbol layers if needed.

The saved HTML looks like:

```html
<div
  class="viz-component"
  data-component="map"
  data-app="csv"
  data-map-file="/maps/nigeria.json"
  data-map-center="NGA"
  data-measures='["prevalence"]'
  data-dimension1="zone"
  data-height="500"
></div>
```

## Related
- UI Component: `map` (`data-viz-ui/packages/dvz-ui/src/embeddable/map`)
