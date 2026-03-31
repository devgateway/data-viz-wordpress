> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Data Chart Block

## Purpose
A Gutenberg block that embeds a configurable data visualisation chart (Bar, Line, Pie, Radar, Bump, Diverging, and more) powered by the Nivo charting library. Data can come from an external API or inline CSV. The block supports dual-mode toggling between a chart view and an info-graphic, legends, axis configuration, colour schemes, tooltips, confidence intervals, and mobile-specific customisation.

## Props / Attributes

### Core
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | `"bar"` | Chart type: `"bar"`, `"line"`, `"pie"`, `"radar"`, `"bump"`, `"diverging"` |
| `height` | number | `500` | Block height in pixels (resizable in editor) |
| `group` | String | `"default"` | Filter group; block re-fetches when this group's filters change |
| `app` | String | `"csv"` | Data source / API identifier |
| `csv` | String | `""` | Inline CSV data |
| `dvzProxyDatasetId` | String | `""` | Superset/proxy dataset ID |
| `dimension1` / `dimension2` / `dimension3` | String | `"none"` | Dimensions used to slice data |
| `measures` | Object | `{}` | Measure definitions per app |
| `filters` | Array | `[]` | Pre-applied filter definitions |
| `format` | Object | `{ style:"percent", … }` | `Intl.NumberFormat` options for axis/tooltip values |

### Layout & Legends
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `bottomLegend` | string | `""` | X-axis legend label |
| `leftLegend` | string | `"Left Legends"` | Y-axis legend label |
| `legendPosition` | String | `"top"` | Legend placement: `"top"`, `"right"`, `"bottom"`, `"left"` |
| `showLegends` | boolean | `true` | Show/hide chart legend |
| `legendLabel` | String | `""` | Legend section header label |
| `marginLeft/Top/Right/Bottom` | Numeric | `50/25/25/25` | Chart margin in pixels |

### Bar / Group options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `groupMode` | String | `"grouped"` | Bar group mode: `"grouped"` or `"stacked"` |
| `layout` | string | `"vertical"` | Bar orientation: `"vertical"` or `"horizontal"` |
| `barPadding` | Numeric | `0.15` | Outer padding between bar groups |
| `barInnerPadding` | Numeric | `0.7` | Inner padding between bars in a group |
| `barLabelPosition` | string | `"middle"` | Label position on bar: `"middle"`, `"top"`, `"none"` |
| `barLabelColor` | string | `"#000"` | Bar label text colour |
| `showGroupTotal` | string | `"true"` | Show aggregate total above grouped bars |
| `groupTotalMeasure` | string | `""` | Measure field used for the group total |
| `groupTotalLabel` | string | `""` | Label for the group total |

### Colours & Style
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `scheme` | string | `"nivo"` | Colour scheme name |
| `colorBy` | String | `"index"` | Colour assignment strategy: `"index"` or `"id"` |
| `manualColors` | Object | `{}` | Per-series manual colour overrides |
| `tickColor` | String | `encodeURIComponent("#FFFFFF")` | Axis tick label colour (URL-encoded) |
| `xLabelColor` | string | `"#000"` | X-axis tick label colour |

### Dual Mode / Info
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dualMode` | Boolean | `false` | Enable toggling between chart and info-graphic views |
| `toggleInfoLabel` | String | `"Info Graphic"` | Button label for info view |
| `toggleChartLabel` | String | `"Chart"` | Button label for chart view |
| `dataSource` | String | `"NIDS"` | Data source attribution text |
| `dataSourceLabel` | String | `"Source"` | Label preceding the data source text |

### Pie / Radar (selected)
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `startAngle` / `endAngle` | Numeric | `0` / `360` | Pie arc start/end angles |
| `showArcLabels` | Boolean | `true` | Show labels on pie arc slices |
| `centerLabel` | string | `""` | Text rendered at the centre of a donut/pie chart |
| `radarCurve` | string | `"linearClosed"` | Radar line interpolation curve |
| `radarGridLevels` | Numeric | `3` | Number of concentric grid rings |

## Usage Example
Insert the **Data Chart** block in the Gutenberg editor. In the Inspector Controls:

1. Choose a **Chart Type** (Bar, Line, Pie, Radar, etc.).
2. Select an **API** and configure **Dimensions** and **Measures**.
3. Adjust axis legends, margins, colour scheme, and tick formatting.
4. Optionally enable **Dual Mode** to add an info-graphic toggle.

## Related
- UI Component: `chart` (`data-viz-ui/packages/dvz-ui/src/embeddable/chart`)
