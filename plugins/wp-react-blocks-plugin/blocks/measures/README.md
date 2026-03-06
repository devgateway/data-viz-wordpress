> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Measures (WordPress Block)

## Purpose
A Gutenberg block that renders a radio-button group allowing users to switch between pre-configured measure groups (e.g. different indicators or metrics). It communicates the selected group to other visualisation blocks on the page via a shared `group` key and a Redux store.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `app` | `String` | `"csv"` | Data source identifier (`"csv"` or an API app slug) that scopes which measure groups are applicable. |
| `label` | `String` | `"My Measures"` | Heading label displayed above the radio group. |
| `group` | `String` | `""` | Shared key (UUID recommended) that links this block to chart blocks listening for measure changes. Use the **Name** field in Inspector Controls to set this. |
| `measuresGroups` | `object` | `{}` | Nested object keyed by `app` containing arrays of measure group definitions. Each group has: `label`, `measures` (field map), `format`, `defaultSelected`, `leftTitle`, `rightTitle`, `customTooltip`. |

### `measuresGroups[app][n]` group object shape
| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Display label for the radio button. |
| `measures` | `object` | Map of measure field names to `{ selected: boolean }`. |
| `format` | `object` | `Intl.NumberFormat` options for this group's values. |
| `defaultSelected` | `boolean` | Pre-select this group on page load. |
| `leftTitle` | `string` | Y-axis left title passed to linked chart blocks. |
| `rightTitle` | `string` | Y-axis right title passed to linked chart blocks. |
| `customTooltip` | `string` | Tooltip template override for linked charts. |

## Usage Example
1. Insert the **Measures** block in the Gutenberg editor near the chart block it should control.
2. In Inspector Controls, set **Group** to a UUID that matches the `group` attribute of the associated chart block.
3. Select the **API & Source**, then use **Add / Remove** in the **Groups** panel to define measure groups.
4. Mark one group as **Default Selected** so a measure is active on page load.

The saved HTML looks like:

```html
<div
  class="viz-component"
  data-component="measures"
  data-app="csv"
  data-label="Select Indicator"
  data-group="550e8400-e29b-41d4-a716-446655440000"
  data-measures-groups="%7B%22csv%22%3A%5B%7B%22label%22%3A%22GDP%22%2C%22measures%22%3A%7B%22gdp%22%3A%7B%22selected%22%3Atrue%7D%7D%2C%22defaultSelected%22%3Atrue%7D%5D%7D"
></div>
```

## Related
- UI Component: `measures` (`data-viz-ui/packages/dvz-ui/src/embeddable/measures`)
