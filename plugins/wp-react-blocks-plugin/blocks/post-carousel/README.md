> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Posts Carousel (Gutenberg Block)

## Purpose
Displays a scrollable/auto-switching carousel of WordPress posts inside the block editor via an embedded iframe. Editors can filter posts by taxonomy/category and control the number of items, height, and slide interval.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `count` | Numeric | `3` | Number of posts to show in the carousel. |
| `type` | string | `"posts"` | Post type to query (e.g. `"posts"`, `"pages"`). |
| `taxonomy` | string | `"none"` | Taxonomy used to filter posts. |
| `categories` | array | `[]` | Array of category IDs/slugs to filter by. |
| `height` | Numeric | `500` | Height of the carousel block in pixels. Resizable in the editor. |
| `autoSwitch` | Boolean | `false` | Whether to automatically advance slides. |
| `interval` | Numeric | `10000` | Auto-switch interval in milliseconds (only relevant when `autoSwitch` is `true`). |
| `panelStatus` | Object | `{}` | Tracks open/closed state of inspector control panels. |

## Usage Example
Insert the **Posts Carousel** block via the block inserter. Configure it in the **Inspector Controls** sidebar:

1. Set **Items** to the desired number of posts.
2. Toggle **Automatically switch slides** and set an **Interval** if desired.
3. Optionally filter posts by taxonomy/category.
4. Drag the bottom resize handle to adjust the carousel height.

The saved markup renders a `<div data-component="postsCarousel" …>` placeholder that the front-end React bundle hydrates.

```html
<!-- Saved block output (simplified) -->
<div>
  <div
    data-component="postsCarousel"
    data-items="3"
    data-type="posts"
    data-taxonomy="none"
    data-categories=""
    data-height="500"
    data-auto-switch="false"
    data-interval="10000"
    class="viz-component"
  ></div>
</div>
```

## Related
- UI Component: `postscarousel` (`data-viz-ui/packages/dvz-ui/src/embeddable/postscarousel`)
