> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Filtered Posts (Gutenberg Block)

## Purpose
Displays a paginated, filterable grid of WordPress posts. The grid layout (columns, card dimensions, items per page) is configurable in the block editor, and the component reacts to `filter` blocks that share the same `group` value to dynamically narrow the displayed posts.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `group` | `string` | `"default"` | Filter group name; shared with `filter` blocks to receive filter state. |
| `numberOfColumns` | `number` | `3` | Number of columns in the post grid. |
| `type` | `string` | `null` | WordPress post type to query (e.g. `"posts"`, `"resource"`). |
| `taxonomy` | `string` | `null` | Taxonomy slug used as the default category filter taxonomy. |
| `categories` | `array` | `[]` | Array of default term IDs to restrict posts to. |
| `height` | `number` | `300` | Height (px) of the iframe preview in the editor; resizable. |
| `postHeight` | `number` | `240` | Height (px) of each post card in the grid. |
| `postWidth` | `number` | `420` | Width (px) of each post card in the grid. |
| `numberOfItemsPerPage` | `number` | `10` | Maximum posts fetched and displayed per page. |
| `enableSorting` | `boolean` | `false` | Enable the sorting controls. |
| `sortingTaxonomy` | `string` | `null` | Taxonomy slug used to determine the sort-first category. |
| `sortFirstBy` | `string` | `"none"` | Term ID of the category whose posts should appear first. |

## Usage Example

1. Add the **Filtered Posts** block to a page.
2. In **Inspector → Group**, set a group name matching your `filter` blocks (e.g. `"resources"`).
3. In **Inspector → Filtered Posts Configuration**, set the number of columns and card dimensions.
4. Use the filter panels to set the default taxonomy and category scope.
5. Enable **Sorting** if posts from a specific term should be pinned to the top.
6. Set **Number of items per page** in the Pagination panel.

The block saves a `div[data-component="filteredPosts"]` element; the UI embeddable is responsible for fetching and rendering posts.

## Related
- UI Component: `filtered-posts` (`data-viz-ui/packages/dvz-ui/src/embeddable/filtered-posts/`)
