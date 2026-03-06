> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Inline List (WordPress Block)

## Purpose
A Gutenberg block that renders a scrollable, icon-optional list of WordPress posts by embedding the `inlinelist` UI component in an iframe. Posts can be filtered by taxonomy/category, and a collapsible content toggle can be enabled to show post body without navigating away.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `Numeric` | `3` | Number of posts to display (2–10, controlled via a range slider). |
| `type` | `string` | `"posts"` | WordPress post type to query (e.g. `"posts"`, `"page"`, or a custom post type slug). |
| `taxonomy` | `string` | `"none"` | Taxonomy used to filter posts (e.g. `"category"`, `"none"`). |
| `categories` | `array` | `[]` | Array of term IDs/slugs to filter by within the selected taxonomy. |
| `height` | `Numeric` | `500` | Block height in pixels (resizable via drag handle). |
| `showIcons` | `boolean` | `false` | Whether to display the post icon (image from custom `icon` meta field). |
| `colors` | `object` | `{ color_0: '#FFFF', color_1: '#FFFF', color_2: '#FFFF' }` | Colour palette passed to the UI component. |
| `showContentToggle` | `boolean` | `false` | Render an expandable "Read More / Read Less" toggle instead of a link. |
| `contentToggleHPosition` | `Numeric` | `50` | Horizontal position (0–100 %) of the toggle link within the post card. |
| `readMoreLabel` | `string` | `"Read More"` | Custom label for the "read more" action. |
| `readLessLabel` | `string` | `"Read less"` | Custom label for the "read less" / collapse action. |
| `panelStatus` | `Object` | `{}` | Tracks open/closed state of inspector panel sections in the editor. |

## Usage Example
1. Insert the **Inline List** block in the Gutenberg editor.
2. In Inspector Controls, set **Post Type**, **Taxonomy**, **Categories**, **Items** count, and toggle **Show Post Icon** or **Show Post Content in Same Page** as needed.
3. Drag the bottom resize handle to set the desired height.

The saved HTML looks like:

```html
<div
  class="viz-component"
  data-component="inlineList"
  data-type="posts"
  data-taxonomy="none"
  data-categories=""
  data-items="3"
  data-height="500"
  data-show-post-icons="false"
  data-show-content-toggle="false"
  data-content-toggle-h-position="50"
  data-read-more-label="Read More"
  data-read-less-label="Read less"
></div>
```

## Related
- UI Component: `inlinelist` (`data-viz-ui/packages/dvz-ui/src/embeddable/inlinelist`)
