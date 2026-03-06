> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Posts Filters Reset Button (Gutenberg Block)

## Purpose
Inserts a reset button that clears all applied post filters for a named filter group back to their initial values. Editors can configure the group name and the visible button label.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `group` | string | `"default"` | Identifies which filter group this reset button targets. Must match the `group` value used on the associated `posts-filter` blocks. |
| `resetLabel` | string | `"Reset Filters"` | Text displayed on the reset button. |

## Usage Example
Insert the **Posts Filters Reset Button** block on the same page as one or more **Posts Filter** blocks. In the **Inspector Controls** sidebar:

1. Set **Group** to the same value used on the paired filter blocks (e.g. `"news"`).
2. Optionally customise **Reset label**.

The saved markup renders a `<div data-component="postsFiltersReset" …>` placeholder hydrated by the front-end bundle.

```html
<!-- Saved block output -->
<div
  class="viz-component"
  data-component="postsFiltersReset"
  data-group="news"
  data-reset-label="Clear Filters"
></div>
```

## Related
- UI Component: `posts-filters-reset-button` (`data-viz-ui/packages/dvz-ui/src/embeddable/posts-filters-reset-button`)
