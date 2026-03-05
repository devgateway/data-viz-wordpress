> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Parallaxed Post List (Gutenberg Block)

## Purpose
A Gutenberg block that renders a parallax-scrolling list of WordPress posts, with per-post speed, offset, and sticky configuration. Supports horizontal scrolling and post filtering by taxonomy and category.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | `"posts"` | WordPress post type to query (e.g. `"posts"`, `"pages"`) |
| `taxonomy` | string | `"none"` | Taxonomy slug used for category filtering |
| `categories` | array | `[]` | Array of category/term IDs to filter posts |
| `count` | numeric | `7` | Number of posts to fetch |
| `scrolls` | numeric | `7` | Total number of parallax scroll pages |
| `horizontal` | boolean | `false` | When `true`, switches parallax to horizontal scroll direction |
| `height` | Numeric | `500` | Block height in pixels (resizable in editor) |
| `position` | string | `"middle"` | Vertical anchor position of the content |
| `configuration` | array | `[]` | Per-post parallax config objects: `{ title, offset, speed, sticky, stickyStart, stickyEnd }` |
| `panelStatus` | Object | `{}` | Tracks Inspector panel open/closed state |

## Usage Example
Insert the **Parallaxed Post List** block via the Gutenberg block inserter. Use the Inspector Controls to configure post type, taxonomy, number of scrolls, horizontal mode, and per-post parallax settings (offset, speed, sticky range).

```jsx
// Rendered save output (hydrated by the UI embeddable)
<div
  className="viz-component"
  data-component="parallaxContainer"
  data-type="posts"
  data-count={count}
  data-scrolls={scrolls}
  data-horizontal={horizontal}
  data-taxonomy={taxonomy}
  data-categories={categories.toString()}
  data-height={height}
  data-configuration={encodeURIComponent(JSON.stringify(configuration))}
/>
```

## Related
- UI Component: `parallax` (`data-viz-ui/packages/dvz-ui/src/embeddable/parallax`)
