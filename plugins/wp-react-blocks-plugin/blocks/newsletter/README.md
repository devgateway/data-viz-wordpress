> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Newsletter Form (Gutenberg Block)

## Purpose
A Gutenberg block that embeds a Mailchimp-powered newsletter subscription form, configurable with a list ID, country tag, placeholder text, submit label, and success/failure messages.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | `"Send"` | Text label for the submit button |
| `placeholder` | string | `"Enter your email"` | Placeholder text for the email input |
| `successMessage` | string | `"Thanks for submitting"` | Message shown on successful subscription |
| `failureMessage` | string | `"Something didn't go well, please try again later"` | Message shown on failed subscription |
| `list` | string | `""` | Mailchimp list/audience ID |
| `tag` | string | `""` | Mailchimp country tag to apply on subscription |
| `backgroundColor` | color | — | Background color (supports theme palette or custom hex) |
| `alignment` | string | — | Text alignment of the block wrapper |

## Usage Example
Insert the **Newsletter Form** block via the Gutenberg block inserter. Use Inspector Controls to set the Mailchimp list ID, country tag, button label, placeholder, and feedback messages.

```jsx
// Rendered save output (hydrated by the UI embeddable)
<div className="viz-component" data-component="newsletter" />
```

## Related
- UI Component: `newsletter` (`data-viz-ui/packages/dvz-ui/src/embeddable/newsletter`)
