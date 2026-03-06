> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Posts Filter (Gutenberg Block)

## Purpose
Provides a configurable dropdown filter (single-select or multi-select) that filters a list of posts by taxonomy, category, year, or country. Multiple filter blocks can be coordinated via a shared group name.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `group` | String | `"default"` | Shared key that links this filter to other post-related blocks (carousel, pagination, reset button) on the same page. |
| `filterType` | String | `"single-select"` | `"single-select"` or `"multi-select"`. |
| `taxonomy` | string | `null` | Taxonomy to pull filter options from. |
| `categories` | array | `[]` | Category IDs to restrict the option list. |
| `type` | string | `null` | Post type to query for filter options. |
| `isCountryFilter` | boolean | `false` | When `true`, renders a country-specific filter variant. Mutually exclusive with `isYearFilter`. |
| `isYearFilter` | boolean | `false` | When `true`, renders a year-range filter. Mutually exclusive with `isCountryFilter`. |
| `selectedYear` | number | `null` | Pre-selected year (relevant when `isYearFilter` is `true`). |
| `placeholder` | String | `"All Options"` | Dropdown placeholder text. |
| `allLabel` | String | `"Select All"` | Label for the "select all" option (multi-select). |
| `noneLabel` | String | `"Select None"` | Label for the "select none" option (multi-select). |
| `alphabeticalSort` | Boolean | `true` | Sort options alphabetically. |
| `ascOrder` | Boolean | `true` | Sort options in ascending order. |
| `useSingleColumn` | Boolean | `false` | Display dropdown items in a single column. |
| `enableTextSearch` | Boolean | `false` | Show a text search box inside the dropdown. |
| `showNoDataOption` | Boolean | `true` | Include a "No Data" option when available. |
| `closeOnSelect` | Boolean | `true` | Close the dropdown after each selection (multi-select only). |
| `allNoneSameBehaviour` | Boolean | `false` | Treat "All" and "None" identically (multi-select only). |
| `autoApply` | Boolean | `true` | Apply filter changes immediately without an explicit apply button. |
| `defaultValues` | array | `[]` | Pre-selected filter values. |

## Usage Example
Insert the **Posts Filter** block on the same page as a **Posts Carousel** or other post-listing block. In the **Inspector Controls** sidebar:

1. Set **Group** to a shared name (e.g. `"news"`).
2. Choose **Filter Type** (`single-select` / `multi-select`).
3. Configure the taxonomy and labels.

```html
<!-- Saved block output (simplified) -->
<div
  class="viz-component"
  data-component="postsFilter"
  data-group="news"
  data-filter-type="multi-select"
  data-taxonomy="category"
  data-categories=""
  data-placeholder="All Categories"
  data-all-label="Select All"
  data-none-label="Select None"
  data-alphabetical-sort="true"
  data-asc-order="true"
  data-auto-apply="true"
></div>
```

## Related
- UI Component: `posts-filter` (`data-viz-ui/packages/dvz-ui/src/embeddable/posts-filter`)
