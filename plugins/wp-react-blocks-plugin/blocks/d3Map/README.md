> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# D3 Map (WP Block)

## Purpose
A fully-featured, resizable Gutenberg block that embeds an interactive D3-powered choropleth / data map. Editors can compose multiple layers (base, data, flow, lat/long data-points), choose a map projection, configure zoom/rotation, set a background colour, and pin the initial map position — all without leaving the editor.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `identifier` | `Numeric` | `0` | Random integer assigned on mount; uniquely identifies this map instance for postMessage communication. |
| `height` | `Numeric` | `500` | Frame height in pixels. Resizable in the editor. |
| `width` | `Numeric` | `1024` | Logical map width used for aspect-ratio calculations. |
| `group` | `string` | `'default'` | Filter group name; links this map to shared filter state. |
| `projection` | `string` | `'geoMercator'` | D3 geo-projection. Options: `geoMercator`, `geoEqualEarth`, `geoNaturalEarth1`, `geoAzimuthalEqualArea`, `geoOrthographic`. |
| `layers` | `Array` | `[]` | Ordered array of layer configuration objects (type: `base` \| `data` \| `flow` \| `dataPoints`). |
| `backGroundColor` | `string` | `'#347ba2'` | URI-encoded hex/rgba background colour of the map canvas. |
| `mapPosition` | `Object` | `{}` | Serialised `{k, x, y}` zoom/pan state; synced back from the iframe via `postMessage`. |
| `zoomEnabled` | `Boolean` | `true` | Show zoom-in/out controls. |
| `rotationEnabled` | `Boolean` | `false` | Allow globe-rotation drag interaction. |
| `waitForFilters` | `Boolean` | `false` | Hold data requests until the filter group has an active selection. |
| `dvzProxyDatasetId` | `String` | `""` | Optional dataset proxy identifier. |
| `panelStatus` | `Object` | `{}` | Tracks open/closed state of each inspector panel. |
| `k` / `x` / `y` | `Numeric` | `1` | Legacy zoom-transform values. |

## Usage Example
Insert the **D3 Map** block from the Gutenberg inserter. In the Inspector Controls:

1. **Group** — set a name to share filter state with filter blocks on the same page.
2. **Size and Position** — adjust height; paste a JSON position object to restore a saved viewport.
3. **Projection** — pick the desired map projection.
4. **Colors** — choose a background colour.
5. **Layers** — click **Add New Layer** to add base or data layers.

The saved markup looks like:

```html
<div class="viz-component"
     data-component="newMap"
     data-identifier="83729102"
     data-height="500"
     data-projection="geoMercator"
     data-group="default"
     data-layers="[...]"
     data-back-ground-color="%23347ba2"
     data-zoom-enabled="true"
     data-rotation-enabled="false"
     data-wait-for-filters="false">
</div>
```

## Related
- UI Component: `d3Map` (`data-viz-ui/packages/dvz-ui/src/embeddable/d3Map`)
