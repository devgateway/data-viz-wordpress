> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Page Modules (Gutenberg Block)

## Purpose
A Gutenberg block that renders child pages as scrollable, in-view-tracked page sections with a floating side navigator and a "back to top" button, making it easy to build long-form modular page layouts.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `navLabel` | String | `"Sections"` | Label shown as the heading of the floating side navigator |
| `topTopLabel` | String | `"TO THE TOP"` | Label for the "scroll to top" button in the navigator |
| `height` | number | `400` | Height of the block preview iframe in pixels (resizable in editor) |
| `width` | number | `800` | Width hint for the block iframe (display only) |
| `count` | Numeric | `3` | Reserved — number hint for child page count |
| `previewMode` | string | `"Desktop"` | Preview viewport mode synced from editor settings |

> **Note:** The `parent` page ID is derived at runtime from the editor URL (`?post=`) and is not stored as a block attribute.

## Usage Example
Insert the **Page Modules** block via the Gutenberg block inserter. Configure navigator and "to top" labels in the Inspector Controls sidebar. Resize the preview by dragging the bottom handle.

```jsx
// Rendered save output (hydrated by the UI embeddable)
<div
  className="viz-component"
  data-component="pageModules"
  data-nav-label="Sections"
  data-to-top-label="TO THE TOP"
  data-preview-mode="Desktop"
/>
```

## Related
- UI Component: `pagemodules` (`data-viz-ui/packages/dvz-ui/src/embeddable/pagemodules`)
