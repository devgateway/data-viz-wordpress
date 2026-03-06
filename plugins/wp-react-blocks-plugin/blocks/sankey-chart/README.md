> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Sankey Chart (Gutenberg Block)

## Purpose
Embeds an interactive Sankey flow diagram inside the Gutenberg editor via an iframe, powered by the Nivo `ResponsiveSankey` component. Data can come from an API app with up to three dimensions, or from an inline CSV string.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `group` | String | `"default"` | Links the chart to shared filter state. |
| `height` | number | `500` | Chart height in pixels. |
| `app` | String | `"csv"` | Data source identifier. Use `"csv"` for inline CSV data or an API app key. |
| `csv` | String | sample CSV | Inline CSV data used when `app` is `"csv"`. |
| `dimension1` | String | `"none"` | First data dimension. |
| `dimension2` | String | `"none"` | Second data dimension. |
| `dimension3` | String | `"none"` | Third data dimension. |
| `measures` | Array | `[]` | Array of measure keys to visualise. |
| `filters` | Array | `[]` | Pre-applied data filters. |
| `scheme` | string | `"nivo"` | Nivo color scheme name. |
| `layout` | String | `"horizontal"` | `"horizontal"` or `"vertical"`. |
| `showLegends` | boolean | `true` | Whether to render the legend. |
| `legendLabel` | String | `""` | Legend title text. |
| `legendPosition` | String | `"top"` | `"top"`, `"bottom"`, `"left"`, or `"right"`. |
| `marginLeft` | Numeric | `50` | Left margin in pixels. |
| `marginTop` | Numeric | `25` | Top margin in pixels. |
| `marginRight` | Numeric | `25` | Right margin in pixels. |
| `marginBottom` | Numeric | `25` | Bottom margin in pixels. |
| `tooltipHTML` | String | `"{value}"` | Handlebars-style tooltip HTML template. |
| `tooltipEnableMarkdown` | Boolean | `false` | Parse tooltip content as Markdown. |
| `format` | Object | `{ style: "percent", minimumFractionDigits: 1, … }` | Number format options (Intl.NumberFormat style). |
| `nodeThickness` | Numeric | — | Sankey node width in pixels. |
| `nodeOpacity` | Numeric | — | Default node opacity (0–1). |
| `nodeHoverOpacity` | Numeric | — | Node opacity on hover. |
| `nodeHoverOthersOpacity` | Numeric | — | Opacity of non-hovered nodes. |
| `nodeInnerPadding` | Numeric | — | Inner padding inside nodes. |
| `nodeSpacing` | Numeric | — | Vertical spacing between nodes. |
| `nodeBorderWidth` | Numeric | — | Node border stroke width. |
| `nodeBorderRadius` | Numeric | — | Node border radius. |
| `linkOpacity` | Numeric | — | Default link opacity. |
| `linkHoverOpacity` | Numeric | — | Link opacity on hover. |
| `linkHoverOthersOpacity` | Numeric | — | Opacity of non-hovered links. |
| `linkContract` | Numeric | — | Amount by which links contract at both ends. |
| `enableLinkGradient` | Boolean | — | Render links with a color gradient. |
| `enableLabels` | Boolean | — | Show labels on nodes. |
| `labelPosition` | String | — | `"inside"` or `"outside"`. |
| `labelPadding` | Numeric | — | Padding between node and label. |
| `labelOrientation` | String | — | `"horizontal"` or `"vertical"`. |
| `useCustomLabelColor` | Boolean | — | Use `labelTextColor` instead of the node color for labels. |
| `labelTextColor` | String | — | Custom label text color (hex/rgba). |
| `panelStatus` | Object | `{}` | Tracks inspector panel open/closed state. |

## Usage Example
Insert the **Sankey Chart** block via the block inserter. In the **Inspector Controls**:

1. Choose the **App** (data source) or paste inline **CSV** data.
2. Configure up to three dimensions and select a measure.
3. Adjust margins, colors, node/link styling, and tooltip as needed.

```html
<!-- Saved block output (simplified) -->
<div
  class="viz-component"
  data-component="sankeyChart"
  data-app="csv"
  data-csv="dimension%2CKey1%2CKey2%0AIndex1%2C12%2C13"
  data-height="500"
  data-layout="horizontal"
  data-scheme="nivo"
  data-show-legends="true"
  data-group="default"
></div>
```

## Related
- UI Component: `sankeychart` (`data-viz-ui/packages/dvz-ui/src/embeddable/sankeychart`)
