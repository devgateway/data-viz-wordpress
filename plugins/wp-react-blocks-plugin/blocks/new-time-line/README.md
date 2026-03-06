> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# New Time Line (Gutenberg Block)

## Purpose
A Gutenberg block that renders an interactive horizontal timeline paired with a post carousel, fetching WordPress posts by type/taxonomy and displaying them as navigable timeline entries.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `count` | numeric | `7` | Number of posts to fetch and display |
| `position` | string | `"middle"` | Vertical position of the timeline line: `"top"`, `"middle"`, or `"bottom"` |
| `lineWidth` | Numeric | `2` | Stroke width of the horizontal timeline line |
| `type` | string | `"posts"` | WordPress post type to query (e.g. `"posts"`, `"pages"`) |
| `taxonomy` | string | `"none"` | Taxonomy slug used for filtering |
| `categories` | array | `[]` | Array of category/term IDs to filter posts by |
| `height` | Numeric | `500` | Total height of the block in pixels |
| `lineColor` | string | `"#a7a9ac"` | Color of the horizontal timeline line |
| `marginLeft` | Numeric | `50` | Left margin in pixels |
| `marginRight` | Numeric | `50` | Right margin in pixels |
| `marginTop` | Numeric | `25` | Top margin in pixels |
| `marginBottom` | Numeric | `25` | Bottom margin in pixels |
| `titleWidth` | Numeric | `120` | Width in pixels of each post title label |
| `subtitleWidth` | Numeric | `120` | Width in pixels of each post subtitle label |
| `fontSize` | Numeric | `14` | Base font size in pixels for timeline labels |
| `panelStatus` | Object | `{}` | Tracks open/closed state of Inspector panels |
| `config` | array | `[…]` | Per-post configuration array (circleColor, titleColor, offset, speed, sticky, etc.) |

## Usage Example
Insert the **New Time Line** block via the Gutenberg block inserter. Configure post type, taxonomy, and per-entry visual options in the block's Inspector Controls sidebar.

```jsx
// Rendered save output (hydrated by the UI embeddable)
<div className="viz-component" data-component="newTimeLine" data-type="posts" data-count="7" data-height="500" />
```

## Related
- UI Component: `new-time-line` (`data-viz-ui/packages/dvz-ui/src/embeddable/new-time-line`)
