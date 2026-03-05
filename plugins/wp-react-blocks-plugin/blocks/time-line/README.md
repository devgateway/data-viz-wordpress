> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Time Line

## Purpose
A Gutenberg block that embeds an interactive D3-powered timeline of WordPress posts via an iframe. Each post becomes a node on the timeline; per-series colours, sizes, and connector heights are configurable from the block inspector.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `numeric` | `7` | Number of posts/items to show on the timeline. |
| `position` | `string` | `"middle"` | Starting label position: `"middle"`, `"top"`, or `"bottom"`. |
| `lineWidth` | `Numeric` | `2` | Stroke width of the horizontal axis line (px). |
| `type` | `string` | `"posts"` | WordPress post type to query. |
| `taxonomy` | `string` | `"none"` | Taxonomy slug for filtering. |
| `categories` | `array` | `[]` | Category IDs/slugs to filter. |
| `height` | `Numeric` | `500` | Block/iframe height in pixels. |
| `lineColor` | `string` | `"#a7a9ac"` | Colour of the horizontal axis line. |
| `marginLeft` | `Numeric` | `50` | Left margin inside the SVG canvas (px). |
| `marginRight` | `Numeric` | `50` | Right margin inside the SVG canvas (px). |
| `marginTop` | `Numeric` | `25` | Top margin inside the SVG canvas (px). |
| `marginBottom` | `Numeric` | `25` | Bottom margin inside the SVG canvas (px). |
| `titleWidth` | `Numeric` | `120` | Width allocated for each node title label (px). |
| `titleHeight` | `Numeric` | `50` | Height allocated for each node title label (px). |
| `subtitleWidth` | `Numeric` | `120` | Width allocated for each node subtitle (px). |
| `subtitleHeight` | `Numeric` | `20` | Height allocated for each node subtitle (px). |
| `fontSize` | `Numeric` | `14` | Base font size for timeline labels (px). |
| `panelStatus` | `Object` | `{}` | Open/closed state of inspector panels. |
| `config` | `array` | *(see below)* | Per-series config objects: `circleColor`, `lineColor`, `titleColor`, `labelColor`, `size`, `subtitleOffset`, `titleOffset`, `connectorLineHeight`, `position`, `readMoreLabel`, `tooltipFontColor`. |

## Usage Example
Insert the block from the **Data Viz** category. Use the inspector to select post type, apply category filters, and adjust visual configuration per series.

```js
// Rendered save markup (hydrated on the front end)
<div data-component="timeLine"
     data-count="7"
     data-height="500"
     data-line-color="#a7a9ac"
     class="viz-component" />
```

## Related
- UI Component: `time-line` (`data-viz-ui/packages/dvz-ui/src/embeddable/time-line`)
