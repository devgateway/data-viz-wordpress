> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Agree & Download Block

## Purpose
A Gutenberg block that renders a download button or link which, when clicked, presents the user with an agreement/terms modal (loaded from a WordPress post) before allowing the file download to proceed.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `post_id` | Numeric | `-1` | ID of the WordPress post containing the agreement text |
| `post_slug` | string | `null` | Slug of the agreement post |
| `media` | Object | `null` | WordPress media object for the downloadable file |
| `download_style` | string | `"link"` | Display style: `"link"` or `"button"` |
| `text` | string | `"Download File"` | Label shown on the download trigger |
| `agree` | string | `"Agree"` | Label for the modal's confirm/agree button |
| `cancel` | string | `"Cancel"` | Label for the modal's cancel button |
| `type` | string | `"posts"` | WordPress post type used to search for agreement posts |
| `taxonomy` | string | `"none"` | Taxonomy used to filter agreement posts |
| `categories` | array | `[]` | Category IDs used to filter agreement posts |

## Usage Example
In the Gutenberg editor, insert the **Agree & Download** block, then in the block Inspector Controls:

1. Upload or select a media file from the WordPress Media Library.
2. Choose a WordPress post that contains the agreement text.
3. Customise the `Download Text`, `Agree Text`, and `Cancel Text` labels.
4. Toggle between **Link Style** and **Button Style**.

The block serialises to a `div` with `data-component="agreeAndDownload"` data attributes that are hydrated by the React front-end.

## Related
- UI Component: `agree-and-download` (`data-viz-ui/packages/dvz-ui/src/embeddable/agree-and-download`)
