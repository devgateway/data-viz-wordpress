> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Data Filter (Gutenberg Block)

## Purpose
Adds an interactive filter widget to a page that lets visitors filter connected data-visualisation charts (identified by a shared `group` value). Supports multi-select, single-select, and range filter modes with optional text search, default values, parent/child filter chaining, and Superset API or CSV data sources.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `placeHolder` | `string` | `""` | Placeholder text shown when no value is selected. |
| `type` | `string` | `""` | WordPress taxonomy type or API dimension name to filter on. |
| `param` | `string` | `""` | URL / Redux store parameter key this filter writes to. |
| `app` | `string` | `"csv"` | Data source type (`"csv"` or Superset API slug). |
| `group` | `string` | `"default"` | Filter group; all blocks sharing this group react to each other. |
| `icon` | `string` | `"filter"` | Icon name shown in the filter UI. |
| `filters` | `array` | `[]` | Additional filter constraints applied when loading filter options. |
| `csvField` | `string` | `""` | CSV column name to use as filter option source. |
| `csvValue` | `string` | `""` | CSV column name to use as the option value. |
| `isRange` | `boolean` | `false` | Render as a range selector instead of a checkbox list. |
| `allLabel` | `string` | `"Select All"` | Label for the "select all" option. |
| `noneLabel` | `string` | `"Select None"` | Label for the "select none" option. |
| `startLabel` | `string` | `"Start"` | Start label for range filters. |
| `endLabel` | `string` | `"End"` | End label for range filters. |
| `useSingleColumn` | `boolean` | `false` | Render options in a single column. |
| `enableTextSearch` | `boolean` | `false` | Show a search box to filter the options list. |
| `showNoDataOption` | `boolean` | `true` | Include a "No Data" option in the list. |
| `filterType` | `string` | `"multi-select"` | `"multi-select"` or `"single-select"`. |
| `defaultValues` | `string` | `""` | Comma-separated default selected values. |
| `defaultValueCriteria` | `string` | `"DEFAULT_VALUE_INPUT"` | How to interpret `defaultValues`: `DEFAULT_VALUE_INPUT`, `LOWEST_VALUE`, `HIGHEST_VALUE`, or `NO_DATA`. |
| `booleanTrueLabel` | `string` | `"Yes"` | Label for boolean true value. |
| `booleanFalseLabel` | `string` | `"No"` | Label for boolean false value. |
| `hiddenFilters` | `array` | `[]` | Filter values that are applied silently (not shown to users). |
| `allNoneSameBehaviour` | `boolean` | `false` | Treat "All" and "None" selections identically. |
| `alphabeticalSort` | `boolean` | `true` | Sort options alphabetically. |
| `ascOrder` | `boolean` | `true` | Sort in ascending order. |
| `closeOnSelect` | `boolean` | `false` | Close the dropdown after a single selection (single-select shortcut). |
| `useFilterItems` | `boolean` | `true` | Load options from the API. |
| `dvzProxyDatasetId` | `string` | `""` | Superset proxy dataset ID. |
| `autoApply` | `boolean` | `true` | Apply filter changes immediately without a confirm button. |
| `childFilter` | `string` | `""` | Component ID of a child filter that depends on this one. |
| `childFilterParam` | `string` | `""` | Param key of the child filter. |
| `parentFilter` | `string` | `""` | Component ID of the parent filter this filter depends on. |
| `parentFilterParam` | `string` | `""` | Param key of the parent filter. |
| `defaultTopNEnabled` | `boolean` | `undefined` | Pre-select the top N values by default. |
| `defaultTopNCount` | `number` | `undefined` | How many top values to pre-select when `defaultTopNEnabled` is `true`. |

## Usage Example

1. Add the **Data Filter** block to the same page as a chart block.
2. Set **Group** to match the chart block's group (e.g. `"dashboard-1"`).
3. In **Inspector → API & Source**, choose your data source and dataset.
4. Set **Parameter** to the field name / taxonomy the chart reacts to.
5. Choose **Filter Type** (`multi-select` / `single-select`), configure labels and default values.

## Related
- UI Component: `filter` (`data-viz-ui/packages/dvz-ui/src/embeddable/filter/`)
