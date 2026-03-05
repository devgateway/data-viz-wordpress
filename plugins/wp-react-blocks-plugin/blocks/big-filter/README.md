> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Big Filter Block

## Purpose
A Gutenberg block that renders an interactive set of big-number "filter chips" sourced from an API or CSV. Users can click chips to apply dimension filters that update linked charts and big-number blocks on the same page.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | `"big-filter"` | Internal type identifier |
| `group` | String | `"default"` | Filter group key — linked blocks that share the same group receive this block's filter state |
| `parent` | String | `""` | Parent block name; when set, this block inherits filters from the named parent |
| `blockName` | String | `"New Big Number"` | Unique identifier for this block's own filter store |
| `height` | number | `120` | Block height in pixels |
| `app` | String | `"csv"` | Data source / API identifier |
| `csv` | String | `"Amount \n20000"` | Inline CSV data (used when `app` is `"csv"`) |
| `dimension1` | String | `"none"` | Primary dimension to slice data by |
| `dimension2` | String | `"none"` | Secondary dimension |
| `measures` | Object | (see below) | Per-app measure/format configuration |
| `filters` | Array | `[]` | Pre-applied API filter definitions |
| `dvzProxyDatasetId` | String | `""` | Superset/proxy dataset ID |
| `nColumns` | Numeric | `5` | Number of columns in the filter chip grid |
| `numberFontSize` | Numeric | `24` | Font size (px) for the selected-state number |
| `numberColor` | string | `"#aaaf23ff"` | Text colour for the selected-state number |
| `labelColor` | string | `"#3a62f0ff"` | Text colour for the selected-state label |
| `backgroundColor` | string | `"#ebecefff"` | Background colour for selected chips |
| `unselectedNumberColor` | string | `"#5a5d68"` | Number colour for unselected chips |
| `unselectedLabelColor` | string | `"#5a5d68"` | Label colour for unselected chips |
| `unselectedBackgroundColor` | string | `"#ebecefff"` | Background colour for unselected chips |
| `labelFontSize` | Numeric | `14` | Font size (px) for labels |
| `sort` | string | `"alpha"` | Sort mode: `"alpha"` or `"value"` |
| `order` | string | `"asc"` | Sort order: `"asc"` or `"desc"` |
| `waitForFilters` | Boolean | `false` | Delay data fetch until upstream filters are applied |
| `showZeroValues` | Boolean | `false` | Show chips whose count is zero |
| `disabledNumberColor` | string | `"#5a5d68"` | Number colour for disabled chips |
| `disabledLabelColor` | string | `"#5a5d68"` | Label colour for disabled chips |
| `panelStatus` | Object | `{}` | Tracks open/closed state of each Inspector panel |

## Usage Example
Insert the **Big Filter** block in the Gutenberg editor. In the Inspector Controls:

1. Set the **API** source and optionally a **Dataset**.
2. Choose a **Dimension** to slice by (e.g. `gender`, `region`).
3. Adjust column count, colours, and font sizes as needed.
4. Set the **Group** to match the group name of the charts or big-number blocks that should react to this filter.

## Related
- UI Component: `big-filter` (`data-viz-ui/packages/dvz-ui/src/embeddable/big-filter`)
