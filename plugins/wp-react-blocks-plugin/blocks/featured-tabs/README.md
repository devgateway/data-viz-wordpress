> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Featured Tabs (Gutenberg Block)

## Purpose
Displays a configurable set of featured WordPress posts in a tabbed layout. Each tab shows a cover image and post intro; clicking a tab expands the full post content. On mobile devices the block automatically switches to an accordion layout.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `3` | Number of tabs / featured posts to display. |
| `type` | `string` | `"posts"` | WordPress post type to query (e.g. `"posts"`, `"page"`, or a custom type). |
| `taxonomy` | `string` | `"none"` | Taxonomy slug used to filter posts. |
| `categories` | `array` | `[]` | Array of term IDs used to filter posts within the chosen taxonomy. |
| `height` | `number` | `500` | Component height in pixels; resizable in the editor. |
| `readMoreLabel` | `string` | `"READ More"` | Label on the expand button shown on each tab. |
| `closeLabel` | `string` | `"Close"` | Label on the collapse button shown in the expanded view. |
| `useScrolls` | `boolean` | `false` | Enable scrollable overflow on the tab container. |
| `colors` | `object` | `{ color_0: '#FFFF', color_1: '#FFFF', color_2: '#FFFF' }` | Background colour for each tab; keyed as `color_0`, `color_1`, … `color_N`. |
| `previewMode` | `string` | `"Desktop"` | Preview mode in the editor (`"Desktop"` or `"Mobile"`). |

## Usage Example

1. Add the **Featured Tabs** block to a page.
2. In **Inspector → Items & Labels**, set the number of items (2–10) and customise the read-more / close labels.
3. In **Inspector → Size**, set the display height with the range control or drag the resize handle.
4. In **Inspector → Colors**, assign a background colour to each tab.
5. Use the filter panels to restrict posts by taxonomy / category.

The block saves a `div[data-component="featuredTabs"]` element; the UI embeddable is responsible for fetching posts and rendering the interactive tabs.

## Related
- UI Component: `featuredtabs` (`data-viz-ui/packages/dvz-ui/src/embeddable/featuredtabs/`)
