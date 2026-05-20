> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Data Chart Block

## Purpose
A Gutenberg block that embeds a configurable data visualisation chart (Bar, Line, Pie, Radar, Bump, Scatter, Heatmap, Interval Plot, Diverging, Sunburst, and more) powered by the Nivo charting library plus focused custom rendering where needed. Data can come from an external API or inline CSV. The block supports dual-mode toggling between a chart view and an info-graphic, legends, axis configuration, colour schemes, tooltips, confidence intervals, and mobile-specific customisation.

## Props / Attributes

### Core
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | `"bar"` | Chart type: `"bar"`, `"line"`, `"pie"`, `"radar"`, `"bump"`, `"scatter"`, `"heatmap"`, `"intervalPlot"`, `"diverging"`, `"sunburst"` |
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
| `showLegendsInColumns` | boolean | `false` | Arrange legend items in columns |
| `numberOfLegendColumns` | Numeric | `4` | Number of legend columns (when `showLegendsInColumns` is true) |
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

### Scatter / Bubble / Frontier / Quadrant
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `scatterMinSize` | Numeric | `10` | Minimum point radius/size used by scatter and bubble charts |
| `scatterMaxSize` | Numeric | `30` | Maximum point radius/size used when a size measure is present |
| `scatterShowLabels` | Boolean | `false` | Draw direct labels next to points |
| `scatterConnectPoints` | Boolean | `false` | Connect points within each series to create a frontier/trajectory |
| `scatterPointOpacity` | Numeric | `0.85` | Point opacity |
| `scatterReferenceX` / `scatterReferenceY` | String | `""` | Numeric reference lines used for quadrants/thresholds |
| `scatterReferenceXLabel` / `scatterReferenceYLabel` | String | `""` | Labels for the reference lines |
| `scatterQuadrantTopLeftLabel` etc. | String | `""` | Optional quadrant labels |

### Scatter tooltip variables
- `{label}`: point label
- `{series}` / `{seriesDisplay}`: series/group name
- `{x}`, `{y}`, `{size}`: raw numeric values
- `{xLabel}`, `{yLabel}`, `{sizeLabel}`: measure labels
- use `#(x)`, `#(y)`, `#(size)` for formatted numbers

### Heatmap tooltip variables
- `{rowLabel}`: row/category label
- `{columnLabel}`: column/category label
- `{value}`: cell value
- `{measureLabel}`: selected measure label

### Interval plot tooltip variables
- `{label}`: interval label
- `{value}` / `{center}`: center / expected value
- `{low}`, `{high}`: lower and upper bounds
- `{centerLabel}`, `{lowLabel}`, `{highLabel}`: measure labels

### Sunburst tooltip variables
- `{label}` / `{name}`: current segment label
- `{value}`: current segment value
- `{path}`: current hierarchy path
- `{depth}`: node depth

## Usage Example
Insert the **Data Chart** block in the Gutenberg editor. In the Inspector Controls:

1. Choose a **Chart Type** (Bar, Line, Pie, Radar, Scatter, etc.).
2. Select an **API** and configure **Dimensions** and **Measures**.
3. Adjust axis legends, margins, colour scheme, and tick formatting.
4. Optionally enable **Dual Mode** to add an info-graphic toggle.

## Scatter recipes

### Scatter / Quadrant
- Measures: first = X, second = Y
- Dimensions: first dimension = point label, optional second dimension = series
- Set `scatterReferenceX` and `scatterReferenceY` to draw quadrant guides

### Bubble
- Measures: X, Y, Size
- Same dimensions as scatter
- Increase `scatterMaxSize` if bubble sizes look too similar

### Frontier
- Measures: X, Y, optional Size
- Enable `scatterConnectPoints`
- Use a second dimension when you need multiple frontiers/trajectories

### CSV example
```csv
label,x,y,size,series
County A,12,48,120,Scenario 1
County B,18,52,180,Scenario 1
County C,9,37,90,Scenario 2
```

### Default scatter tooltip
```html
<strong>{label}</strong><br/>{xLabel}: #(x)<br/>{yLabel}: #(y)<br/>Series: {seriesDisplay}
```

### Bubble tooltip example
```html
<strong>{label}</strong><br/>{xLabel}: #(x)<br/>{yLabel}: #(y)<br/>{sizeLabel}: #(size)
```

## Heatmap recipe
- Dimensions: first = rows, second = columns
- Measures: first selected measure = cell intensity/value
- CSV: `row,column,value`

## Interval plot recipe
- Dimension: first dimension = label
- Measures: first = center, second = low, third = high
- CSV: `label,center,low,high`

## Related
- UI Component: `chart` (`data-viz-ui/packages/dvz-ui/src/embeddable/chart`)
