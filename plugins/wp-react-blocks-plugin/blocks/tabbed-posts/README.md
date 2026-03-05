> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Tabbed Posts

## Purpose
A Gutenberg block that embeds a tabbed WordPress posts viewer via an iframe. Editors can filter posts by taxonomy/category, choose between a light (single-tab) or grid (button-grid) theme, and control icon/label visibility and scrolling behaviour.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `Numeric` | `3` | Number of posts to display per tab set. |
| `type` | `string` | `"posts"` | WordPress post type to query. |
| `taxonomy` | `string` | `"none"` | Taxonomy used for filtering (e.g. `"category"`). |
| `categories` | `array` | `[]` | Array of category IDs/slugs to filter by. |
| `height` | `Numeric` | `700` | Height of the iframe / block in pixels. |
| `theme` | `string` | `"buttons"` | Tab navigation theme: `"buttons"` (grid) or `"light"` (menu). |
| `useLabels` | `boolean` | `false` | Show post label underneath the tab button. |
| `showIcons` | `boolean` | `false` | Show the post icon inside each tab button. |
| `useScrolls` | `boolean` | `false` | Allow the content area to scroll rather than being fixed-height. |
| `panelStatus` | `Object` | `{}` | Stores open/closed state of inspector panels. |
| `previewMode` | `string` | `"Desktop"` | Editor preview mode: `"Desktop"` or `"Mobile"`. |

## Usage Example
Insert the block via the Gutenberg inserter under the **Data Viz** category. Use the **Visibility** inspector panel to toggle labels, icons, and scroll behaviour, and the **Size Config** panel to adjust height.

```js
// Rendered save markup (hydrated on the front end)
<div data-component="tabbedPosts"
     data-type="posts"
     data-items="3"
     data-theme="light"
     data-show-labels="true"
     data-height="700"
     class="viz-component" />
```

## Related
- UI Component: `tabbedposts` (`data-viz-ui/packages/dvz-ui/src/embeddable/tabbedposts`)
