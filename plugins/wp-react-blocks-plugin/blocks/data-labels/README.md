> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Data Label (WP Block)

## Purpose
A resizable Gutenberg block that displays a single formatted numeric value (e.g. a percentage, currency amount, or plain number) derived from an API or CSV data source. Editors choose the data source, dimension, measure, number format, and aggregation type (first / total / min / max / avg) via the Inspector Controls panel.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `group` | `String` | `'default'` | Filter group name; links the label to shared filter state. |
| `app` | `String` | `"csv"` | Data source / API identifier. |
| `height` | `number` | `20` | Component height in pixels. Resizable in the editor. |
| `dimension1` | `String` | `'none'` | Primary dimension field from the selected API. |
| `measures` | `Array` | `[]` | Array of measure field names; the first element is used for display. |
| `format` | `Object` | `{ style:"percent", minimumFractionDigits:1, maximumFractionDigits:1, currency:"USD" }` | `Intl.NumberFormat`-compatible options object controlling number display. |
| `filters` | `Array` | `[]` | Array of `{ param, value }` filter objects pre-applied to the data request. |
| `valueType` | `String` | `'first'` | Aggregation strategy: `first`, `total`, `min`, `max`, or `avg`. |
| `panelStatus` | `Object` | `{}` | Tracks the open/closed state of each Inspector panel. |
| `params` | `Object` | `{}` | Computed from `filters`; passed as query parameters to the data API. |

## Usage Example
Insert the **Data Label** block from the Gutenberg inserter. In the Inspector Controls:

1. **Group** — enter the shared filter group name.
2. **API & Source** — select the data API.
3. **Dimension** — choose the dimension to slice the data by.
4. **Measure** — pick the numeric field to display and set its number format.
5. **Types** — choose the aggregation (`first`, `total`, `min`, `max`, `avg`).

The block saves:

```html
<div class="viz-component"
     data-component="datalabel"
     data-height="20"
     data-dimension1="year"
     data-app="myApi"
     data-measures="%5B%22value%22%5D"
     data-format="%7B%22style%22%3A%22percent%22%7D"
     data-group="default"
     data-filters="%5B%5D"
     data-value-type="first">
</div>
```

## Related
- UI Component: `datalabel` (`data-viz-ui/packages/dvz-ui/src/embeddable/datalabel`)
