> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Wrapped Component

## Purpose
A Gutenberg block that dynamically embeds any registered UI embeddable component by name via an iframe. The editor can specify the target component name and pass arbitrary key-value parameters through the block inspector without needing a dedicated block per component.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `"none"` | Name of the target embeddable component to load (e.g. `"showcase"`, `"tabbedposts"`). |
| `attr` | `array` | `[]` | Array of `{name, value}` parameter objects forwarded to the wrapped component. |
| `height` | `Numeric` | `500` | Block/iframe height in pixels. |
| `panelStatus` | `Object` | `{}` | Open/closed state of inspector panels. |

## Usage Example
Insert the **Wrapped Component** block from the **Data Viz** category. In the **Wrapped Settings** inspector panel, set **Name** to the target component identifier, then use **Add Param** to append any additional parameters the target component requires.

```js
// Rendered save markup (hydrated on the front end)
<div data-component="wrapped"
     data-name="tabbedposts"
     data-height="500"
     data-params="%5B%7B%22name%22%3A%22data-items%22%2C%22value%22%3A%225%22%7D%5D"
     class="viz-component" />
```

## Related
- UI Component: `wrapped` (`data-viz-ui/packages/dvz-ui/src/embeddable/wrapped`)
