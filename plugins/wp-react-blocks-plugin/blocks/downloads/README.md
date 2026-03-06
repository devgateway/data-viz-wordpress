> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Download (Gutenberg Block)

## Purpose
Provides an image-export download button (PNG and/or JPG) for any visual content nested inside it as inner blocks. Editors can configure the default format, allowed formats, button labels, an optional section title, a source-URL watermark, and whether active filter state should be included in the exported image.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `defaultFormat` | `string` | `"PNG"` | The pre-selected export format (`"PNG"` or `"JPG"`). |
| `checkPng` | `boolean` | `true` | Allow PNG as a download option. |
| `checkJpg` | `boolean` | `false` | Allow JPG as a download option. |
| `buttonLabel` | `string` | `"Download"` | Label displayed on the primary download button. |
| `title` | `string` | `"Set your chart download file type"` | Dropdown menu header / aria label. |
| `useTitle` | `boolean` | `false` | Show an editable rich-text section title above the button. |
| `sectionTitle` | `string` | `""` | HTML content of the section title (editable inline). |
| `style` | `string` | `"heavy"` | Visual style of the button; `"light"` or `"heavy"`. |
| `fontSize` | `string` | `"24px"` | Font size for the section title (when `useTitle` is `true`). |
| `fontClass` | `string` | `"24px"` | WordPress font-size class applied to the section title. |
| `color` | `string` | `"24px"` | Text color for the section title. |
| `pngLabel` | `string` | `"export.png"` | Filename used when saving a PNG. |
| `jpgLabel` | `string` | `"export.jpg"` | Filename used when saving a JPG. |
| `pngText` | `string` | `"Download PNG"` | Dropdown item label for PNG. |
| `jpgText` | `string` | `"Download JPG"` | Dropdown item label for JPG. |
| `downloadTooltip` | `string` | `"Click to select download format"` | Tooltip shown on the format-selector dropdown. |
| `includeSourceURL` | `boolean` | `false` | Append the current page URL as a watermark in the exported image. |
| `sourceURLMarginLeft` | `number` | `70` | Left margin (px) of the source URL watermark. |
| `sourceURLMarginTop` | `number` | `10` | Top margin (px) of the source URL watermark. |
| `sourceURLFontSize` | `number` | `18` | Font size (px) of the source URL watermark. |
| `includeFilters` | `boolean` | `false` | Include filter UI elements in the exported image. |

## Usage Example

1. Add the **Download** block to a page.
2. Nest chart or content blocks inside it as inner blocks.
3. In the **Inspector → Default Format** panel, choose `PNG` or `JPG`.
4. Optionally toggle **Use Title** to add a heading above the download button.
5. Enable **Include Source URL** to watermark exports with the page URL.

The block renders as a `div.viz-component[data-component="download"]` on the frontend, and the UI embeddable mounts the interactive download button.

## Related
- UI Component: `download` (`data-viz-ui/packages/dvz-ui/src/embeddable/download/`)
