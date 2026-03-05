> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Showcase Form

## Purpose
A Gutenberg block that embeds a customisable contact/showcase form via an iframe. Editors can configure placeholder text for every form field, button labels, and success/failure messages directly from the block inspector.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `string` | `"100%"` | Width of the embedded iframe. |
| `height` | `string` | `"1200px"` | Height of the embedded iframe. |
| `backgroundColor` | `string` | — | Block background colour (WordPress colour palette). |
| `alignment` | `string` | `"center"` | Text alignment of the block wrapper. |
| `organization` | `string` | `"Organization"` | Placeholder text for the Organisation field. |
| `name` | `string` | `"Name"` | Placeholder text for the Name field. |
| `email` | `string` | `"Email"` | Placeholder text for the Email field. |
| `country` | `string` | `"Country"` | Placeholder text for the Country dropdown. |
| `message` | `string` | `"Please write a message"` | Placeholder text for the Message field. |
| `submitLabel` | `string` | `"Send"` | Label for the submit button. |
| `resetLabel` | `string` | `"Reset"` | Label for the reset button. |
| `successMessage` | `string` | `"Thanks for submitting"` | Message shown after a successful submission. |
| `failureMessage` | `string` | `"Something didn't go well, please try again later"` | Message shown after a failed submission. |

## Usage Example
Add the block via the Gutenberg inserter under the **Data Viz** category. Customise field placeholders and messages in the **Block Settings** sidebar panel.

```js
// Rendered save markup (hydrated on the front end)
<div data-component="showCaseForm"
     organization="Your Org"
     name="Your Name"
     email="your@email.com"
     submitlabel="Submit"
     class="viz-component" />
```

## Related
- UI Component: `showcase` (`data-viz-ui/packages/dvz-ui/src/embeddable/showcase`)
