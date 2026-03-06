> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Posts Pagination (Gutenberg Block)

## Purpose
Adds a pagination control to a post-listing page that lets visitors navigate between pages of results. It coordinates with other post blocks via a shared group name and controls how many posts are shown per page.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `group` | String | `"default"` | Shared key that links this pagination control to other post blocks (filter, carousel, reset button) on the same page. |
| `numberOfItemsPerPage` | number | `10` | How many posts to display per page. Configurable with a range slider (min: 1). |

## Usage Example
Insert the **Posts Pagination** block on the same page as a **Posts Carousel** or post-list block. In the **Inspector Controls** sidebar:

1. Set **Group** to match the group name of the post blocks it should control (e.g. `"news"`).
2. Adjust **Number of items** with the slider.

The saved markup renders a `<div data-component="postsPagination" …>` placeholder hydrated by the front-end bundle.

```html
<!-- Saved block output -->
<div
  class="viz-component"
  data-component="postsPagination"
  data-group="news"
  data-number-of-items-per-page="10"
></div>
```

## Related
- UI Component: `posts-pagination` (`data-viz-ui/packages/dvz-ui/src/embeddable/posts-pagination`)
