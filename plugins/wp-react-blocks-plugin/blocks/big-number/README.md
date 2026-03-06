> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Big Number Block

## Purpose
A Gutenberg block that displays one or more large, animated numeric KPI values fetched from an API or inline CSV. Numbers are rendered with customisable fonts, colours, and Intl number formatting and can optionally be broken down by a dimension.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | `"big-number"` | Internal type identifier |
| `group` | String | `"default"` | Filter group; the block re-fetches when filters in this group change |
| `height` | number | `120` | Block height in pixels (resizable in the editor) |
| `app` | String | `"none"` | Data source / API identifier |
| `csv` | String | `"Amount \n20000"` | Inline CSV data (used when no API is selected) |
| `dimension1` | String | `"none"` | Dimension used to split numbers into rows/groups |
| `dvzProxyDatasetId` | String | `""` | Superset/proxy dataset ID |
| `measures` | Array | `[]` | Selected measure definitions per API |
| `filters` | Array | `[]` | Pre-applied filter definitions |
| `format` | Object | `{ style:"decimal", minimumFractionDigits:0, … }` | Default `Intl.NumberFormat` options (overridden per-measure) |
| `groupLabel` | String | `""` | Text displayed above the number group |
| `groupLabelFontSize` | Numeric | `14` | Font size (px) for the group label |
| `groupLabelColor` | string | `"#5a5d68"` | Colour of the group label |
| `numberFontSize` | Numeric | `24` | Font size (px) for the number value |
| `numberColor` | string | `"#5a5d68"` | Colour of the number value |
| `label` | String | `""` | Static label text shown below each number |
| `labelFontSize` | Numeric | `14` | Font size (px) for the measure label |
| `labelColor` | string | `"#5a5d68"` | Colour of the measure label |
| `waitForFilters` | Boolean | `false` | Delay data fetch until upstream filters are applied |
| `noDataText` | string | `"-"` | Text displayed when no data is available |
| `panelStatus` | Object | `{}` | Tracks open/closed state of each Inspector panel |

## Usage Example
Insert the **Big Number** block in the Gutenberg editor. In the Inspector Controls:

1. Select an **API** source and optionally a **Dataset**.
2. Choose one or more **Measures** to display.
3. Optionally pick a **Dimension** to break the number into groups.
4. Customise label text, font sizes, and colours.

The block renders an `iframe` preview in the editor pointing to the embeddable React UI URL.

## Related
- UI Component: `big-number` (`data-viz-ui/packages/dvz-ui/src/embeddable/big-number`)
