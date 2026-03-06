> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Data Filters Reset (WP Block)

## Purpose
A compact Gutenberg block that places a "Reset All Filters" button on the page. When clicked it clears the active filter selection back to its initial state and re-applies it, causing connected visualisation blocks to reload with the default data view.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `group` | `String` | `"default"` | Filter group name. Must match the `group` set on the filter and visualisation blocks that should react to this button. |
| `app` | `String` | `"csv"` | Data source / API identifier. Populated via a `SelectControl` listing available apps. |
| `resetLabel` | `String` | `"Reset All Filters"` | Button text displayed to the end-user. |

## Usage Example
Insert the **Data Filters Reset** block from the Gutenberg inserter. In the Inspector Controls:

1. **Group** — enter the same name used by the filter and chart blocks on the page.
2. **API & Source** — select the data source these filters target.
3. **Labels** — customise the reset label text.

The block saves:

```html
<div class="viz-component"
     data-component="dataFiltersReset"
     data-group="default"
     data-app="csv"
     data-reset-label="Reset All Filters">
</div>
```

## Related
- UI Component: `filter-reset-button` (`data-viz-ui/packages/dvz-ui/src/embeddable/filter-reset-button`)
