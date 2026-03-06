> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Child Pages Gallery (Gutenberg Block)

## Purpose
A Gutenberg block that renders a responsive grid gallery of child pages for the current WordPress post/page, with configurable column count and resizable height.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | Numeric | `2` | Number of columns in the gallery grid (1–10) |
| `height` | number | `400` | Height of the block preview iframe in pixels (resizable in editor) |

> **Note:** The `data-parent` value is automatically derived from the current page URL (`?post=`) in the editor and is not stored as a block attribute.

## Usage Example
Insert the **Child Pages Gallery** block via the Gutenberg block inserter. Use the Inspector Controls slider to set the number of columns. Drag the bottom handle to resize the preview height.

```jsx
// Rendered save output (hydrated by the UI embeddable)
<div
  className="viz-component"
  data-component="pageGallery"
  data-parent={parent}
  data-columns={columns}
  data-height={height}
/>
```

## Related
- UI Component: `pagegallery` (`data-viz-ui/packages/dvz-ui/src/embeddable/pagegallery`)
