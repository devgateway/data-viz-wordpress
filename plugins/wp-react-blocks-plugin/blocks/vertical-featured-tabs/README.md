> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Vertical Tabs

## Purpose
A Gutenberg block that embeds a vertically-stacked expandable tabs component via an iframe. Each tab shows a WordPress post with a full-bleed cover image; clicking expands the post content. On mobile it falls back to an accordion layout.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `Numeric` | `3` | Number of posts (tabs) to display. |
| `coverWidth` | `Numeric` | `50` | Width of each collapsed cover panel in pixels. |
| `type` | `string` | `"posts"` | WordPress post type to query. |
| `taxonomy` | `string` | `"none"` | Taxonomy slug for filtering. |
| `categories` | `array` | `[]` | Category IDs/slugs to filter posts. |
| `height` | `Numeric` | `500` | Block/iframe height in pixels. |
| `readMoreLabel` | `String` | `"READ More"` | Label for the read-more link inside expanded content. |
| `clickToExpandLabel` | `String` | `"CLICK TO EXPAND"` | Overlay label shown on hovered collapsed tabs. |
| `colors` | `object` | `{color_0: '#FFFF', color_1: '#FFFF', color_2: '#FFFF'}` | Per-tab background colours keyed as `color_0`, `color_1`, etc. |
| `previewMode` | `string` | `"Desktop"` | Editor preview mode: `"Desktop"` or `"Mobile"`. |

## Usage Example
Insert the block from the **Data Viz** category. Use the **Items & Labels** inspector panel to configure count, cover size, and labels. Use the **Colors** panel to assign a background colour per tab.

```js
// Rendered save markup (hydrated on the front end)
<div data-component="verticalTabs"
     data-count="3"
     data-height="500"
     data-cover-width="50"
     data-colors="%7B%22color_0%22%3A%22%236acbd5%22%7D"
     data-click-to-expand-label="CLICK TO EXPAND"
     class="viz-component" />
```

## Related
- UI Component: `vertical-featuredtabs` (`data-viz-ui/packages/dvz-ui/src/embeddable/vertical-featuredtabs`)
