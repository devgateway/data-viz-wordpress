> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Apply Button (WP Block)

## Purpose
A compact Gutenberg block that places an "Apply Filters" button on the page. When clicked (in the rendered front-end) it commits the current pending filter state for a named filter group and application source, triggering data re-fetches across connected visualisation blocks.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `group` | `String` | `"default"` | Filter group name. Must match the `group` set on the filter and visualisation blocks that should react to this button. |
| `app` | `String` | `"csv"` | Data source / API identifier (e.g. `"csv"`, or a named API key). Populated via a `SelectControl` listing available apps. |
| `label` | `String` | `"Apply"` | Button text displayed to the end-user. |

## Usage Example
Insert the **Apply Button** block from the Gutenberg inserter. In the Inspector Controls:

1. **Group** — enter the same name used by the filter and chart blocks on the page.
2. **API & Source** — select the data source these filters target.
3. **Labels** — customise the button label text.

The block saves:

```html
<div class="viz-component"
     data-component="dataFiltersApply"
     data-group="default"
     data-app="csv"
     data-label="Apply">
</div>
```

## Related
- UI Component: `filters-apply-button` (`data-viz-ui/packages/dvz-ui/src/embeddable/filters-apply-button`)
