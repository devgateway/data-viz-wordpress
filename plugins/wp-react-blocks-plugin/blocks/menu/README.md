> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Inline Menu (WordPress Block)

## Purpose
A Gutenberg block that renders an inline horizontal navigation menu pulled from a registered WordPress menu, with an optional icon and heading label. The menu is embedded via the `menu` UI component.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `String` | `""` | Slug/name of the WordPress menu to render (selected from a dropdown populated via the `/menus/v1/menus` REST endpoint). |
| `label` | `String` | `""` | Heading label displayed before the menu items. |
| `icon` | `String` | `""` | URL of the icon image displayed at the start of the menu bar. |
| `icon_media_id` | `Numeric` | `null` | WordPress media attachment ID for the icon (used for media management). |
| `showIcons` | `Boolean` | `true` | Whether to display item icons (requires a custom `icon` meta field on menu items). |
| `showLabels` | `Boolean` | `true` | Whether to display item text labels. |
| `height` | `Numeric` | `80` | Block height in pixels (resizable via drag handle). |

## Usage Example
1. Insert the **Inline Menu** block in the Gutenberg editor.
2. In Inspector Controls, pick a **Menu Name** from the dropdown (lists all registered WordPress menus).
3. Optionally set a **Heading Label** and upload an **Icon** image.
4. Toggle **Show Icons** as needed.
5. Drag the bottom resize handle to adjust height.

The saved HTML looks like:

```html
<div
  class="viz-component"
  data-component="menu"
  data-name="main-nav"
  data-label="Navigation"
  data-icon="https://example.com/icon.png"
  data-icon-media-id="42"
  data-show-icons="true"
  data-show-labels="true"
></div>
```

## Related
- UI Component: `menu` (`data-viz-ui/packages/dvz-ui/src/embeddable/menu`)
