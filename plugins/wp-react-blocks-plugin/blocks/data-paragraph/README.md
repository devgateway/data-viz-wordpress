> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Data Paragraph (Gutenberg Block)

## Purpose
Renders a data-driven inline paragraph whose text is defined by a template string containing dynamic variables sourced from a Superset API dataset or a CSV snippet. The block supports rich-text authoring in the editor and an optional iframe preview of the live component.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"data-paragraph"` | Internal component type identifier. |
| `group` | `string` | `"default"` | Filter group name shared with sibling filter blocks. |
| `panelStatus` | `object` | `{}` | Tracks open/closed state of inspector panels. |
| `height` | `number` | `32` | Explicit iframe height (px); `0` triggers auto-height. |
| `app` | `string` | `"csv"` | Data source type (`"csv"` or a Superset API slug). |
| `csv` | `string` | `"Amount \n20000"` | Raw CSV string used when `app` is `"csv"`. |
| `params` | `object` | `{}` | Extra query parameters forwarded to the data API. |
| `format` | `object` | `{ style:"decimal", minimumFractionDigits:0, maximumFractionDigits:0, currency:"USD" }` | `Intl.NumberFormat` options for numeric formatting. |
| `measures` | `array` | `[]` | Selected measure field(s) from the dataset. |
| `filters` | `array` | `[]` | Active filter definitions applied to the data query. |
| `dvzProxyDatasetId` | `string` | `""` | Superset proxy dataset ID (used when `app` is a Superset source). |
| `numberFontSize` | `number` | `24` | Font size (px) applied to the rendered number/text. |
| `numberColor` | `string` | `"#5a5d68"` | CSS color for the rendered text. |
| `waitForFilters` | `boolean` | `false` | Delay data fetch until filter blocks have set values. |
| `noDataText` | `string` | `"-"` | Text displayed when no data is available. |
| `textTemplate` | `string` | `"{value}"` | Template string with variable placeholders (e.g. `{field}`, `#({field},2)`, `%({field},2)`). Supports HTML. |
| `showPreview` | `boolean` | `false` | Show a live iframe preview inside the block editor. |

### Template Variable Syntax
| Syntax | Description |
|--------|-------------|
| `{field}` | Raw field value |
| `#({field},2)` | Decimal number, 2 fraction digits |
| `%({field},2)` | Percentage (value treated as whole-number %) |
| `#C({field},2)` | Compact decimal (e.g. 1.2M) |

## Usage Example

1. Add the **Data Paragraph** block to a page.
2. In the editor, type your paragraph in the rich-text area, using `{value}` where the number should appear.
3. In the **Inspector → API & Source** panel, choose your data source (`csv` or a Superset dataset).
4. In the **Paragraph Template** panel, refine the template and preview available measure variables.
5. Optionally set **Number Font Size**, **Number Color**, and enable **Show Preview**.

Example template text:
```
There are currently <strong>#({total_projects},0)</strong> active projects worth <strong>#C({total_budget},1)</strong> USD.
```

## Related
- UI Component: `dataparagraph` (`data-viz-ui/packages/dvz-ui/src/embeddable/data-paragraph/`)
