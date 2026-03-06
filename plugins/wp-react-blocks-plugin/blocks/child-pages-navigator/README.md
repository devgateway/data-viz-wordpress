> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Child Pages Menu (WP Block)

## Purpose
Renders an iframe-based, resizable Gutenberg block that embeds a hierarchical child-page navigation menu. The block auto-detects the current post ID as the parent and lets editors configure a title, icon/label visibility, and frame height from the Inspector Controls panel.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `String` | `""` | Heading displayed above the menu. |
| `parent` | `Numeric` | `null` | WordPress post ID of the parent page whose children are listed. Auto-populated from the URL `post` query parameter on mount. |
| `height` | `Numeric` | `500` | Height of the iframe/component in pixels. Resizable in the editor. |
| `showIcons` | `Boolean` | *(toggle)* | Whether to display page icons next to menu items. |
| `showLabels` | `Boolean` | *(toggle)* | Whether to display text labels next to menu items. |

## Usage Example
Insert the **Child Pages Menu** block from the Gutenberg inserter. Open the block settings panel:

1. Set a **Title** for the navigation heading.
2. Toggle **Show Icons** / **Show Labels** as needed.
3. Drag the bottom resize handle to adjust the frame height.

The block saves the following markup:

```html
<div class="viz-component"
     data-component="childPagesMenu"
     data-parent="42"
     data-title="Explore"
     data-show-icons="true"
     data-show-labels="true">
</div>
```

## Related
- UI Component: `child-page-menu` (`data-viz-ui/packages/dvz-ui/src/embeddable/child-page-menu`)
