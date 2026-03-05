> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Big Number Trend Block

## Purpose
A Gutenberg block that displays a KPI's most-recent value alongside a percentage change trend indicator (arrow up/down). Supports two visual layouts — **Classic** and **Alternative** — and an optional tooltip explaining the percentage change calculation.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | `"big-number"` | Internal type identifier |
| `group` | String | `"default"` | Filter group key |
| `height` | number | `120` | Block height in pixels (resizable in editor) |
| `app` | String | `"csv"` | Data source / API identifier |
| `csv` | String | `"Year,Amount \n2019,20000 \n2018,10000"` | Inline CSV with at least two rows (current + previous period) |
| `dimension1` | String | `"none"` | Dimension used to identify the time / period column |
| `dvzProxyDatasetId` | String | `""` | Superset/proxy dataset ID |
| `measures` | Array | `[]` | Selected measure definitions |
| `filters` | Array | `[]` | Pre-applied filter definitions |
| `format` | Object | `{ style:"decimal", minimumFractionDigits:0, … }` | `Intl.NumberFormat` options |
| `label` | String | `"# of animals"` | Descriptive label shown below the number |
| `textColor` | string | `"#5a5d68"` | General text colour |
| `numberColor` | string | `"#5a5d68"` | Colour of the main KPI number |
| `percentColor` | string | `"#5a5d68"` | Colour of the percentage-change value |
| `backGroundColor` | string | `"none"` | Background colour of the component container |
| `bigNumberFontSize` | Numeric | `24` | Font size (px) for the main number |
| `labelFontSize` | Numeric | `14` | Font size (px) for the label |
| `percentFontSize` | Numeric | `14` | Font size (px) for the percentage change |
| `showPercentageChange` | Boolean | `false` | Show/hide the trend percentage change indicator |
| `waitForFilters` | Boolean | `false` | Delay fetch until upstream filters are applied |
| `noDataText` | string | `"-"` | Text shown when no data is available |
| `showTooltip` | Boolean | `false` | Show an info tooltip on hover |
| `tooltipText` | String | `"Percent change compares {previous_year} to {current_year}"` | Tooltip template (supports `{previous_year}` / `{current_year}` tokens) |
| `tooltipStyle` | String | `"light"` | Tooltip style: `"light"` or `"dark"` |
| `styleOption` | string | `"classic"` | Visual layout: `"classic"` or `"alternative"` |
| `iconImage` | string | `""` | URL of a static icon image displayed in the alternative layout |
| `iconUp` | string | `""` | URL of the "trend up" icon |
| `iconDown` | string | `""` | URL of the "trend down" icon |
| `panelStatus` | Object | `{}` | Tracks open/closed state of each Inspector panel |

## Usage Example
Insert the **Big Number Trend** block in the Gutenberg editor. In the Inspector Controls:

1. Select an **API** source and configure a **Measure** and optional time **Dimension**.
2. Enable **Show Percentage Change** to show the trend arrow.
3. Choose a **Style** (`classic` / `alternative`).
4. Optionally upload custom up/down arrow icons.
5. Customise colours, font sizes, and the tooltip template text.

## Related
- UI Component: `big-number-trend` (`data-viz-ui/packages/dvz-ui/src/embeddable/big-number-trend`)
